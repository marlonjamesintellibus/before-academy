---
title: "ADR-032: Every metric maps to a documented decision"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Analytics
related: [adr-031-posthog-explicit-events.md]
last_updated: 2026-07-31
---

# ADR-032 — Every metric maps to a documented decision

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Analytics

## Context
Phase 0 names 'data collection without decisions' a risk: privacy cost and noise with no payoff.

## Decision
An event or metric ships only with a named decision it informs, an owner, and a review cadence, recorded in the analytics doc; orphan events are removed.

## Alternatives considered
Collect-everything-decide-later (rejected: the named anti-pattern); dashboards-on-request only (rejected: loses the standing funnels the phase questions need).

## Consequences
- **Positive:** Small, legible event surface; privacy review is tractable; pilot readouts are pre-designed.
- **Negative:** Adding a question later may require shipping an event first — deliberate friction.

## Related Documents
- [ADR-031](adr-031-posthog-explicit-events.md)
- Specifications: Phase 0 §28, Eng §11.2
