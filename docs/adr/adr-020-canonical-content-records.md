---
title: "ADR-020: Canonical content records are the single source of truth"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Data/Content
related: [adr-021-immutable-versioning.md, adr-027-pr-seed-publishing.md]
last_updated: 2026-07-31
---

# ADR-020 - Canonical content records are the single source of truth

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Data/Content

## Context
The same concept appears in lessons, questions, diagrams, presentations, and future workshops; separately written copies drift into contradiction (Phase 0 §17).

## Decision
Every concept is one canonical record; lessons, assessments, glossary, diagram text, and the presentation export reference it. A fact lives in exactly one record.

## Alternatives considered
Content authored per surface (rejected: the drift problem this platform exists to prevent); external headless CMS as truth (rejected: second system of record outside the model).

## Consequences
- **Positive:** Lesson and presentation provably share definitions; future pathways inherit approved meaning.
- **Negative:** Writers work through record structure rather than free-form pages - the cost of consistency.

## Related Documents
- [ADR-021](adr-021-immutable-versioning.md)
- [ADR-027](adr-027-pr-seed-publishing.md)
- Specifications: Eng §8.1, Content §4
