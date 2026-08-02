---
title: "ADR-034: ISR with publish-time revalidation; dual-track rollback (image revert + content version flip)"
category: adr
status: Accepted
date: 2026-07-31
decision_category: DevOps
related: [adr-021-immutable-versioning.md, adr-023-forward-only-migrations.md]
last_updated: 2026-07-31
---

# ADR-034 — ISR with publish-time revalidation; dual-track rollback (image revert + content version flip)

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** DevOps

## Context
Content changes only at publish; code and content need independent, fast rollback paths.

## Decision
Content routes are static with ISR invalidated by the publish script; code rolls back via Railway image revert; content rolls back via version flip — two rehearsed, independent levers.

## Alternatives considered
Fully dynamic rendering (rejected: pays per-request cost for content that changes at publish only); build-time-only SSG (rejected: content publish would require deploys, coupling the two rollback tracks).

## Consequences
- **Positive:** Static speed for the guest funnel; content corrections never wait on a deploy.
- **Negative:** Revalidation fan-out is a future scaling watch item (Eng App. E).

## Related Documents
- [ADR-021](adr-021-immutable-versioning.md)
- [ADR-023](adr-023-forward-only-migrations.md)
- Specifications: Eng §8.4/§12.2/§15.3
