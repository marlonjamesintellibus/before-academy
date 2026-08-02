---
title: Analytics Implementation
category: engineering
owner: engineering-lead
status: approved
depends_on: [../product/analytics-events.md]
related: [../adr/adr-031-posthog-explicit-events.md]
last_updated: 2026-07-31
---

# Analytics

Event taxonomy is canonical in [../product/analytics-events.md](../product/analytics-events.md); this defines implementation.

- PostHog JS client-side with **autocapture off** — explicit events only; posthog-node server-side for scoring, migration, and error events. Session recording off (ADR-031).
- Event names + properties are typed constants in `lib/analytics/events.ts`, imported by both sides — drift-proof. A shared `enrich()` attaches common properties.
- Identity: guest anonymous_id is the distinct_id; `posthog.alias(userId)` at conversion so funnels F1–F3 survive sign-up.
- Funnel definitions live in [../product/analytics-events.md](../product/analytics-events.md); dashboard notes carry an owner + review cadence — every metric maps to a documented decision (ADR-032); orphan events are removed.
- Privacy: no PII in properties pre-consent; respect DNT; consent posture is a privacy-review outcome.
- `error_event(code, route, severity)` fires from boundaries and withAction failures; web-vitals (LCP/CLS/INP) report per route for the [performance.md](performance.md) budgets.

## Related Documents
- [../implementation/extend-analytics.md](../implementation/extend-analytics.md)
