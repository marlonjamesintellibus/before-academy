---
title: "ADR-017: Railway hosts a single deployable"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Backend
related: [adr-033-trunk-based-delivery.md, adr-034-isr-dual-rollback.md]
last_updated: 2026-07-31
---

# ADR-017 - Railway hosts a single deployable

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Backend

## Context
One team, one vertical slice; operational surface should be as small as validation allows.

## Decision
One Next.js service on Railway per environment, deploy-on-main to staging, tag-to-production, health-checked, with instant image rollback.

## Alternatives considered
Vercel (rejected: stack mandates Railway; serverless function limits complicate long transactions like migration); Kubernetes/containers on cloud (rejected: enterprise ops for a pilot).

## Consequences
- **Positive:** Minutes-level deploys and rollbacks; environment parity; no orchestration tax.
- **Negative:** Less edge/CDN sophistication than Vercel for Next.js - acceptable at pilot scale, revisit with traffic data.

## Related Documents
- [ADR-033](adr-033-trunk-based-delivery.md)
- [ADR-034](adr-034-isr-dual-rollback.md)
- Specifications: Eng §15
