---
title: "Workflow: Auth, Guest Progress & Migration"
category: implementation
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Work with Auth, Guest Progress & Migration

**Load:** [../engineering/auth.md](../engineering/auth.md) (canonical) · [../engineering/security.md](../engineering/security.md) · [../engineering/api-contracts.md](../engineering/api-contracts.md) · for UI: [../product/screens/auth-and-dashboard.md](../product/screens/auth-and-dashboard.md) + [../product/screens/modals.md](../product/screens/modals.md).

**Invariants (violating any is a defect):** actor identity only from the session — never from client input · persistence actions require registered → AUTH_REQUIRED otherwise · guest state device-only under `ba.v1.*`; storage access only via `useDeviceStore` · ProgressSnapshot is frozen — changes are versioned schema migrations in the hook · migration is transactional, clamped, idempotent, and aliases analytics identity · conversion prompts: 1/milestone, 2/session, equal-weight guest escape.

**Test obligations:** cross-actor FORBIDDEN probes, RLS deny-all probe, migration replay no-op, abandon-path intactness (see [../engineering/testing.md](../engineering/testing.md) integration row).

## Related Documents
- [../product/personas-and-journeys.md](../product/personas-and-journeys.md) — J3/J4 flows these systems serve
- [../adr/adr-025-device-only-guests.md](../adr/adr-025-device-only-guests.md) — why guests are device-only
