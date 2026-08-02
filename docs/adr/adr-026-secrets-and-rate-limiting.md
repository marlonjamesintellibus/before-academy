---
title: "ADR-026: Secrets in platform env config; Postgres-backed rate limiting"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Security
related: [adr-017-railway-single-deployable.md]
last_updated: 2026-07-31
---

# ADR-026 - Secrets in platform env config; Postgres-backed rate limiting

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Security

## Context
The pilot needs abuse protection and secret hygiene without adding infrastructure.

## Decision
Secrets exist only in Railway environment config (service keys server-only); rate limits use an unlogged Postgres counter table on auth, feedback, and attempt submission.

## Alternatives considered
Redis/Upstash limiter (rejected: a second datastore for pilot-scale counters; swap is one file later); secrets in repo-encrypted files (rejected: rotation and audit burden).

## Consequences
- **Positive:** One datastore; limits testable in CI; secret scanning enforceable.
- **Negative:** Counter table is coarse under extreme load - a measured trigger for the Redis swap.

## Related Documents
- [ADR-017](adr-017-railway-single-deployable.md)
- Specifications: Eng §7.4–7.5
