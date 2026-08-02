"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import type { EventName, EventProperties } from "@/lib/events";

/**
 * Client analytics (ADR-031: explicit events only; docs/engineering/analytics.md).
 * Initializes only when a key is configured - dev without PostHog logs to console.
 * autocapture stays off: every event is an explicit taxonomy row (ADR-032).
 */
let initialized = false;

export function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      autocapture: false,
      capture_pageview: false,
      persistence: "localStorage",
    });
    initialized = true;
  }, []);
  return null;
}

export function track(name: EventName, properties: EventProperties = {}): void {
  if (initialized) {
    posthog.capture(name, properties);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, properties);
  }
}
