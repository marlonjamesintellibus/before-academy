---
title: Testing Strategy
category: engineering
owner: qa
status: approved
used_by: [../roadmap/delivery-process.md]
last_updated: 2026-07-31
---

# Testing

CI order = fastest feedback first; merge requires all green + one review.

| Layer | Tooling | Scope & gates |
|---|---|---|
| Static | TS strict, ESLint (import-boundary), Prettier | zero errors; no-explicit-any |
| Unit | Vitest | pure logic: scoring (100% branch), blueprint, progression, storage migrations, schemas. No DB |
| Integration | Vitest + Docker Postgres | Server Action contracts end-to-end: idempotency, migration transaction, rate limits, cross-actor FORBIDDEN probes, RLS deny-all probe |
| E2E | Playwright | journeys J1–J4, mobile + desktop; guest refresh-resume; conversion + migration |
| Accessibility | axe in Playwright + manual gate | zero critical/serious per screen; scripted keyboard-only J1; manual SR passes pre-release |
| Performance | Lighthouse CI + bundle check | budgets on lesson + assessment routes; fails PR on regression |

**Content QA is a test layer:** content-lint (automated) + human gates (standalone test, feedback formula, terminology) gate the seed pipeline exactly as code tests gate merges — see [../content/governance.md](../content/governance.md). Content seed PRs run content-lint in CI.
Cumulative regression: each milestone's journeys join the permanent suite.

## Related Documents
- [../roadmap/delivery-process.md](../roadmap/delivery-process.md) — QA inside milestones, Definition of Done
