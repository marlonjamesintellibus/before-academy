---
title: "ADR-019: Drizzle ORM for data access; supabase-js only for Storage"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Backend
related: [adr-015-supabase-scope.md, adr-023-forward-only-migrations.md]
last_updated: 2026-07-31
---

# ADR-019 — Drizzle ORM for data access; supabase-js only for Storage

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Backend

## Context
With BetterAuth replacing Supabase Auth (ADR-016), per-user JWT context for PostgREST never exists, removing supabase-js's main data-access advantage.

## Decision
All database access goes through Drizzle (typed schema doubling as migration source); supabase-js is imported server-side solely for Storage.

## Alternatives considered
supabase-js/PostgREST (rejected: its authorization model is unusable here); Prisma (rejected: engine binary cold-start cost, less SQL-transparent for agents); raw SQL (rejected: forfeits type safety for no gain).

## Consequences
- **Positive:** Schema, types, and migrations from one source; queries readable as SQL; no runtime engine.
- **Negative:** Team owns query performance discipline (indexes, N+1 review — Eng §12.4).

## Related Documents
- [ADR-015](adr-015-supabase-scope.md)
- [ADR-023](adr-023-forward-only-migrations.md)
- Specifications: Eng §4.1, §5
