---
title: "ADR-004: Guest-first access with account conversion after value"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Product
related: [adr-025-device-only-guests.md, adr-016-betterauth-in-app.md]
last_updated: 2026-07-31
---

# ADR-004 — Guest-first access with account conversion after value

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Product

## Context
Beginners abandon at registration walls; the product must prove value before asking for identity (Phase 0 §10.3).

## Decision
The entire vertical slice — lesson, activity, check, assessment — works without an account. Accounts are offered at earned-value moments and add continuity, never access.

## Alternatives considered
Account-gated learning (rejected: kills top-of-funnel and contradicts the accessibility principle); freemium content split (rejected: nothing to split in one section, and it reintroduces the wall).

## Consequences
- **Positive:** Lowest possible entry friction; conversion prompt carries a truthful, testable benefit.
- **Negative:** Guest state must live somewhere without a server identity — solved at the cost of ADR-025's constraints.

## Related Documents
- [ADR-025](adr-025-device-only-guests.md)
- [ADR-016](adr-016-betterauth-in-app.md)
- Specifications: UX §1.2/J3, Eng §6.2
