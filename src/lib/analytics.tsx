"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { readDevice, writeDevice } from "@/lib/device-store";
import type { EventName, EventProperties } from "@/lib/events";

/**
 * Client analytics (ADR-031: explicit events only; docs/engineering/analytics.md).
 * Initializes only when a key is configured - dev without PostHog logs to console.
 * autocapture and session recording stay off: every event is an explicit
 * taxonomy row (ADR-032). distinct_id = ba.v1.anonymous_id so funnels survive
 * sign-up via alias at M6 conversion. DNT is respected.
 */
let initialized = false;

const ANONYMOUS_ID_KEY = "ba.v1.anonymous_id";

function anonymousId(): string | null {
  const existing = readDevice<string | null>(ANONYMOUS_ID_KEY, null);
  if (typeof existing === "string" && existing.length >= 8) return existing;
  try {
    const raw = window.localStorage.getItem(ANONYMOUS_ID_KEY);
    if (raw && raw.length >= 8) return raw;
  } catch {
    // fall through to generate
  }
  const generated = crypto.randomUUID();
  writeDevice(ANONYMOUS_ID_KEY, generated);
  return generated;
}

/** Common properties attached to every client event (analytics.md enrich rule). */
function enrich(properties: EventProperties): EventProperties {
  return {
    ...properties,
    route: window.location.pathname,
    guest_or_registered: "guest",
  };
}

export function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    if (navigator.doNotTrack === "1") return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      autocapture: false,
      capture_pageview: false,
      disable_session_recording: true,
      persistence: "localStorage",
    });
    const id = anonymousId();
    if (id) posthog.identify(id);
    initialized = true;
  }, []);

  // Web-vitals baseline (analytics.md): LCP/CLS/INP per route for the performance budgets.
  useReportWebVitals((metric) => {
    if (["LCP", "CLS", "INP"].includes(metric.name)) {
      track("web_vital", {
        metric: metric.name,
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        rating: (metric as { rating?: string }).rating,
      });
    }
  });

  return null;
}

export function track(name: EventName, properties: EventProperties = {}): void {
  const enriched = enrich(properties);
  if (initialized) {
    posthog.capture(name, enriched);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, enriched);
  }
}
