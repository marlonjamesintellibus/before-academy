---
title: "ADR-009: Learning interactions before engagement mechanics"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-001-vertical-slice-first.md]
last_updated: 2026-07-31
---

# ADR-009 — Learning interactions before engagement mechanics

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
Badges, streaks, and leaderboards drive return visits but can mask weak learning value and add build cost before the core loop is proven (Phase 0 §11.5).

## Decision
Phase 1 ships only interactions that serve learning objectives; all engagement mechanics are excluded until the learning loop validates.

## Alternatives considered
Light gamification at launch (rejected: confounds pilot signals — is completion learning or streak-chasing?); full engagement system (rejected: the general-purpose engine Phase 1 explicitly forbids).

## Consequences
- **Positive:** Pilot data measures learning, not compulsion; no throwaway engagement code.
- **Negative:** Return-visit rates will look weaker than a gamified baseline — acceptable and known.

## Related Documents
- [ADR-001](adr-001-vertical-slice-first.md)
- Specifications: Phase 0 §24, UX §1.4
