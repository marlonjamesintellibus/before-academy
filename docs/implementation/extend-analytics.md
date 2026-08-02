---
title: "Workflow: Extend Analytics"
category: implementation
owner: product-owner
status: approved
last_updated: 2026-07-31
---

# Extend Analytics

**Load:** [../product/analytics-events.md](../product/analytics-events.md) (taxonomy) · [../engineering/analytics.md](../engineering/analytics.md) (implementation).

**Rules:** a new event requires a named decision it informs + an owner (ADR-032) — add the taxonomy row in the same PR · define the constant in `lib/analytics/events.ts` (both sides import it) · attach common properties via `enrich()` · no PII pre-consent · naming `object_action` snake_case · verify once in preview/staging before Done · orphan events get removed, not kept.

**Done when** the event appears in the taxonomy doc, fires with correct properties in staging, and its funnel/dashboard home is updated if relevant.

## Related Documents
- [../adr/adr-032-metric-decision-rule.md](../adr/adr-032-metric-decision-rule.md) — the rule behind the process
- [../engineering/error-handling.md](../engineering/error-handling.md) — error_event source
