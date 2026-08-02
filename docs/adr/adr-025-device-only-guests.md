---
title: "ADR-025: Guests are device-only: anonymous ID locally, signed tokens for attempts, no server profiles"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Security
related: [adr-004-guest-first-access.md, adr-016-betterauth-in-app.md, adr-029-scoring-split.md]
last_updated: 2026-07-31
---

# ADR-025 — Guests are device-only: anonymous ID locally, signed tokens for attempts, no server profiles

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Security

## Context
Guest access (ADR-004) needs continuity and server-side scoring without collecting pre-consent identity, and Phase 1 flags anonymous server storage for privacy review.

## Decision
Guest state lives in device storage under a client-generated anonymous ID; guest assessment attempts round-trip via short-lived signed tokens so scoring stays server-side while the server stays guest-stateless; everything migrates transactionally at sign-up.

## Alternatives considered
Anonymous server profiles (rejected: stores behavioural records pre-consent and makes 'clearing data removes it' false); client-side scoring for guests (rejected: breaks assessment integrity).

## Consequences
- **Positive:** Zero PII before consent; truthful messaging; migration reduces to one validated upload.
- **Negative:** No cross-device guest resume — which is precisely the account's honest value proposition.

## Related Documents
- [ADR-004](adr-004-guest-first-access.md)
- [ADR-016](adr-016-betterauth-in-app.md)
- [ADR-029](adr-029-scoring-split.md)
- Specifications: Eng §6.2/§9.5, UX §J3
