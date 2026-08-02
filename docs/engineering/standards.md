---
title: Engineering Standards
category: engineering
owner: engineering-lead
status: approved
related: [../shared/naming-conventions.md]
last_updated: 2026-07-31
---

# Engineering Standards

## TypeScript & React
`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`; no `any` (lint); `unknown` + narrowing at boundaries. Function-declaration components, `{Component}Props`, one component per file, default exports only where App Router requires. Hooks: no conditional hooks; storage access only inside `useDeviceStore`/`useAttempt`. Shared domain types (Actor, ProgressSnapshot, Result) in `lib`.

## Files, docs, ADRs
Naming per [../shared/naming-conventions.md](../shared/naming-conventions.md). Each feature carries a ≤1-page README: purpose, public API, pointers — no duplicated rules. Deviations and new architectural decisions create ADRs in [../adr/](../adr/README.md) (numbered from 042; superseded records marked, never rewritten).

## Pull requests & review
Small, single-purpose; description links the story + the docs sections implemented. Content PRs tag SME + education reviewers. Checklist: contract change reflected in [api-contracts.md](api-contracts.md)? new env var in `.env.example`? authorization via withAction? events from `events.ts`? a11y states per [../product/interaction-patterns.md](../product/interaction-patterns.md)? tests at the right layer? `main` is always releasable; feature flags via APP_ENV only.

## Related Documents
- [../roadmap/delivery-process.md](../roadmap/delivery-process.md) — branch flow, DoR/DoD
