---
title: "ADR-003: Progression is competency-based, not consumption-based"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Product
related: [adr-005-assessment-first-route.md, adr-028-blueprint-metadata.md]
last_updated: 2026-07-31
---

# ADR-003 - Progression is competency-based, not consumption-based

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Product

## Context
Completion-by-scrolling produces certificates without understanding and forces knowledgeable learners through redundant content (Phase 0 §10.5).

## Decision
Passing the section assessment is the only completion condition; content consumption, time, and depth usage are analytics signals, never gates.

## Alternatives considered
Page-completion tracking (rejected: measures attendance, not ability); hybrid consumption + quiz (rejected: keeps the forced-reading problem it claims to solve).

## Consequences
- **Positive:** Honest completion signal; respects prior knowledge; makes remediation meaningful.
- **Negative:** Assessment quality becomes load-bearing - weak questions corrupt the whole model (mitigated by ADR-028/030 and pilot analytics).

## Related Documents
- [ADR-005](adr-005-assessment-first-route.md)
- [ADR-028](adr-028-blueprint-metadata.md)
- Specifications: Phase 1 §18, Content §3
