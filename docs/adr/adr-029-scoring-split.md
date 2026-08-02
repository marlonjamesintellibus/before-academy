---
title: "ADR-029: Server-scored assessment; client-scored practice"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Assessment
related: [adr-025-device-only-guests.md, adr-011-step-per-url.md]
last_updated: 2026-07-31
---

# ADR-029 - Server-scored assessment; client-scored practice

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Assessment

## Context
Practice needs instant feedback; the graded assessment gates progression and must resist inspection.

## Decision
Knowledge check and activity ship correctness and rationales to the client for immediate teaching feedback; assessment correctness never leaves the server and scoring is a pure server function.

## Alternatives considered
Server round-trips for practice (rejected: 10–15 latency-sensitive calls for ungraded items); client scoring everywhere (rejected: graded integrity gone).

## Consequences
- **Positive:** Stakes-appropriate integrity and speed; offline-tolerant practice.
- **Negative:** A motivated guest can read practice answers in devtools - affects nothing graded, accepted.

## Related Documents
- [ADR-025](adr-025-device-only-guests.md)
- [ADR-011](adr-011-step-per-url.md)
- Specifications: Eng §9.4
