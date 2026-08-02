---
title: "ADR-018: OpenRouter is a reserved seam with zero Phase 1 runtime use"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Backend
related: [adr-038-defer-personalization.md, adr-036-defer-ai-tutor.md]
last_updated: 2026-07-31
---

# ADR-018 - OpenRouter is a reserved seam with zero Phase 1 runtime use

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Backend

## Context
The stack lists OpenRouter, but Phase 1 ships no AI features (tutor and generation are out of scope).

## Decision
A single typed adapter file exists with no call sites; no key is loaded at runtime; future AI features integrate through this seam.

## Alternatives considered
Integrate behind a feature flag now (rejected: latency/cost/review burden with no learner value); omit entirely (rejected: loses the agreed integration point and stack conformance).

## Consequences
- **Positive:** Zero runtime cost or risk; future activation touches one seam, not the architecture.
- **Negative:** The adapter is untested against real traffic until activated - accepted; activation gets its own ADR.

## Related Documents
- [ADR-038](adr-038-defer-personalization.md)
- Specifications: Eng §1.5
