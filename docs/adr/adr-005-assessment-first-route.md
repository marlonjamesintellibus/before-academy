---
title: "ADR-005: Assessment-first entry is a supported route"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Product
related: [adr-003-competency-progression.md, adr-028-blueprint-metadata.md, adr-011-step-per-url.md]
last_updated: 2026-07-31
---

# ADR-005 - Assessment-first entry is a supported route

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Product

## Context
Learners with prior knowledge should not be forced through beginner content (Phase 0 §11.3); competency-based progression makes this coherent.

## Decision
The assessment is directly reachable, with identical rules and no penalty framing; passing completes the section.

## Alternatives considered
Content-first only (rejected: contradicts ADR-003); a separate placement test (rejected: duplicate question bank and flow for no added signal in one section).

## Consequences
- **Positive:** Respects prior knowledge; produces a clean cohort for validating assessment fairness.
- **Negative:** Question bank must stand alone without lesson context (enforced by Content §7 review).

## Related Documents
- [ADR-003](adr-003-competency-progression.md)
- [ADR-028](adr-028-blueprint-metadata.md)
- [ADR-011](adr-011-step-per-url.md)
- Specifications: UX §J2, Eng §9.5
