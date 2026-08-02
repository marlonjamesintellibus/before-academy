---
title: "ADR-033: Trunk-based development delivering milestone increments to a continuous staging"
category: adr
status: Accepted
date: 2026-07-31
decision_category: DevOps
related: [adr-017-railway-single-deployable.md, adr-023-forward-only-migrations.md]
last_updated: 2026-07-31
---

# ADR-033 — Trunk-based development delivering milestone increments to a continuous staging

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** DevOps

## Context
Frequent integration and always-releasable main are roadmap principles; long-lived branches are the named anti-pattern.

## Decision
Short-lived story branches, one-story PRs, squash to main, auto-deploy staging, tag-to-production; milestones are planning increments, never branches.

## Alternatives considered
Milestone branches (rejected: big-bang merges, drift); release trains (rejected: ceremony without benefit at this size).

## Consequences
- **Positive:** Integration problems surface within days; staging always demonstrates current truth.
- **Negative:** Demands small-slice discipline — enforced by story sizing (Roadmap §7).

## Related Documents
- [ADR-017](adr-017-railway-single-deployable.md)
- [ADR-023](adr-023-forward-only-migrations.md)
- Specifications: Roadmap §2, Eng §16.4
