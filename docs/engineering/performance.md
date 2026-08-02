---
title: Performance Standards
category: engineering
owner: engineering-lead
status: approved
used_by: [architecture.md, frontend.md, analytics.md, testing.md]
last_updated: 2026-07-31
---

# Performance

Budgets are release gates, checked in CI and monitored per route.

| Metric | Budget | Where |
|---|---|---|
| LCP | < 2.5s p75 (mobile mid-tier) | all learner routes |
| INP | < 200ms p75 | players |
| CLS | < 0.1 | all routes (skeletons match layout) |
| First-load JS | < 180KB gzipped/route | CI bundle check fails the build |
| Server Action latency | < 300ms p95 (submitAttempt < 500ms) | server timing events |

**Rendering & caching:** content routes static + ISR invalidated only by publish; dashboard/auth dynamic no-store; no custom cache layers until metrics demand. Islands lazy-load below the fold (the assessment player never loads on the lesson route). System font stack = zero font transfer; icons tree-shaken.
**Assets:** SVG-first diagrams, content-hashed immutable URLs; PNG fallback via next/image with explicit dimensions.
**Database:** indexes per [database.md](database.md); one composed query per screen (no N+1); pooled connections; prepared statements on createAttempt/submitAttempt.

## Related Documents
- [testing.md](testing.md) - Lighthouse CI wiring
