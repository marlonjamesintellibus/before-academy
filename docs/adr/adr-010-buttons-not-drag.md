---
title: "ADR-010: Button-based interactions; no drag-and-drop"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-008-accessibility-release-gate.md]
last_updated: 2026-07-31
---

# ADR-010 - Button-based interactions; no drag-and-drop

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
Classification and sorting invite drag-and-drop, which is costly to make accessible and touch-reliable, and Phase 1 already prefers buttons unless drag adds educational value (Phase 1 §15).

## Decision
All classification, sorting, and matching use button/selection interactions as the only implementation.

## Alternatives considered
Drag with keyboard fallback (rejected: two interaction models to build, test, and QA for zero learning gain); drag-only (rejected: fails accessibility outright).

## Consequences
- **Positive:** Keyboard/touch parity by construction; roughly half the interaction build and QA cost.
- **Negative:** Marginally less tactile delight - irrelevant to the measured objectives.

## Related Documents
- [ADR-008](adr-008-accessibility-release-gate.md)
- Specifications: UX §S04/Decision Register, Content §6
