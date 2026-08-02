import { PostHog } from "posthog-node";
import type { Actor } from "@/lib/actor";
import type { EventName, EventProperties } from "@/lib/events";
import { logger } from "@/lib/logger";

/**
 * Server-side capture (docs/engineering/analytics.md, ADR-031): posthog-node
 * for scoring and error events - the events where the server is the source of
 * truth. No-op without a key so every environment works unconfigured.
 * distinct_id is the guest anonymous_id (aliased to userId at M6 conversion).
 */
let client: PostHog | null | undefined;

function getClient(): PostHog | null {
  if (client !== undefined) return client;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    client = null;
    return client;
  }
  client = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

export function distinctIdFor(actor: Actor): string {
  return actor.kind === "registered" ? actor.userId : actor.anonymousId;
}

export function captureServer(
  actor: Actor,
  event: EventName,
  properties: EventProperties = {},
): void {
  const posthog = getClient();
  const enriched = {
    ...properties,
    guest_or_registered: actor.kind,
    captured: "server",
  };
  if (!posthog) {
    if (process.env.APP_ENV !== "production") {
      logger.debug({ event, ...enriched }, "analytics.server_event");
    }
    return;
  }
  posthog.capture({ distinctId: distinctIdFor(actor), event, properties: enriched });
}
