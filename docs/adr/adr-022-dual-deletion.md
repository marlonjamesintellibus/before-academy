---
title: "ADR-022: Two deletion mechanisms: archive content, hard-delete learner data"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Data/Content
related: [adr-021-immutable-versioning.md]
last_updated: 2026-07-31
---

# ADR-022 — Two deletion mechanisms: archive content, hard-delete learner data

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Data/Content

## Context
Content must be recoverable and referenced by history; learner data must be genuinely removable for privacy.

## Decision
Content uses status='archived' (soft, with replacement noted); learner data is hard-deleted on account deletion. deleted_at exists nowhere else.

## Alternatives considered
Universal soft delete (rejected: privacy deletion becomes a lie); universal hard delete (rejected: destroys content history governance requires).

## Consequences
- **Positive:** Each domain gets the semantics it actually needs; no ambiguous zombie rows.
- **Negative:** Two rules to remember — mitigated by keeping them exactly two.

## Related Documents
- [ADR-021](adr-021-immutable-versioning.md)
- Specifications: Eng §5.2
