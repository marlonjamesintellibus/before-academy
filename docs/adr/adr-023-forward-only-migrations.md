---
title: "ADR-023: Forward-only migrations with expand–migrate–contract"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Data/Content
related: [adr-017-railway-single-deployable.md, adr-034-isr-dual-rollback.md]
last_updated: 2026-07-31
---

# ADR-023 — Forward-only migrations with expand–migrate–contract

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Data/Content

## Context
Instant image rollback (ADR-017) only works if the previous release runs against the current schema.

## Decision
Drizzle migrations are forward-only and backward-compatible for one release; destructive steps ship one release later.

## Alternatives considered
Down-migrations (rejected: rarely tested, dangerous under data); blue-green databases (rejected: pilot-scale overkill).

## Consequences
- **Positive:** Code rollback is always safe; schema changes are reviewable diffs from one source.
- **Negative:** Contract steps require release discipline — enforced in review checklist.

## Related Documents
- [ADR-017](adr-017-railway-single-deployable.md)
- [ADR-034](adr-034-isr-dual-rollback.md)
- Specifications: Eng §5.2/§15.3
