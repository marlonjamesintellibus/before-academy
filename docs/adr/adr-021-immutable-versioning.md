---
title: "ADR-021: Immutable snapshot versioning; published content is never edited in place"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Data/Content
related: [adr-020-canonical-content-records.md, adr-034-isr-dual-rollback.md]
last_updated: 2026-07-31
---

# ADR-021 — Immutable snapshot versioning; published content is never edited in place

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Data/Content

## Context
Learner results must stay interpretable after content changes, and content rollback must be instant and code-free.

## Decision
Publishing writes an immutable content_versions snapshot and bumps the version; learner records store the version they experienced; rollback is a version flip.

## Alternatives considered
Mutable rows with updated_at (rejected: results become uninterpretable, rollback impossible); full event sourcing (rejected: heavy machinery for a pilot's needs).

## Consequences
- **Positive:** Auditable history satisfies governance; 'lesson updated' UX and result integrity come free.
- **Negative:** Storage grows with versions — negligible at this scale.

## Related Documents
- [ADR-020](adr-020-canonical-content-records.md)
- [ADR-034](adr-034-isr-dual-rollback.md)
- Specifications: Eng §5.2/§8.4
