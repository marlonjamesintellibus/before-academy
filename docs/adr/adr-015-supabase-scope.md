---
title: "ADR-015: Supabase as hosted PostgreSQL and Storage only"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Backend
related: [adr-016-betterauth-in-app.md, adr-019-drizzle-orm.md, adr-024-app-layer-authorization.md]
last_updated: 2026-07-31
---

# ADR-015 — Supabase as hosted PostgreSQL and Storage only

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Backend

## Context
The stack mandates Supabase, but its bundled Auth/Realtime/Edge offerings overlap with other mandated choices (BetterAuth) and Phase 1 needs.

## Decision
Use Supabase for managed Postgres and file Storage; do not use Supabase Auth, Realtime, PostgREST, or Edge Functions in Phase 1.

## Alternatives considered
Full Supabase platform incl. Auth (rejected: BetterAuth is mandated and dual identity systems are a known failure mode); plain RDS/Neon + S3 (rejected: loses the mandated platform's storage and dashboard conveniences without gain).

## Consequences
- **Positive:** One database vendor, clear responsibility boundary, no unused surface pretending to be load-bearing.
- **Negative:** Foregoes PostgREST/RLS-per-user conveniences — consequence accepted and handled in ADR-024.

## Related Documents
- [ADR-016](adr-016-betterauth-in-app.md)
- [ADR-019](adr-019-drizzle-orm.md)
- [ADR-024](adr-024-app-layer-authorization.md)
- Specifications: Eng §4.1
