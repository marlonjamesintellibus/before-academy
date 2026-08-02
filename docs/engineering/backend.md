---
title: Backend Architecture
category: engineering
owner: engineering-lead
status: approved
related: [../adr/adr-015-supabase-scope.md, ../adr/adr-019-drizzle-orm.md]
last_updated: 2026-07-31
---

# Backend Architecture

## Supabase responsibilities
Managed PostgreSQL (pooled pgBouncer connection) and Storage (diagram assets) — nothing else. Supabase Auth/Realtime/PostgREST/Edge Functions are unused (ADR-015). Database access is exclusively Drizzle (ADR-019: with BetterAuth replacing Supabase Auth, per-user JWT context for PostgREST never exists); supabase-js is imported server-only for Storage.

## Server Actions — the only mutation path
No REST/GraphQL beyond the BetterAuth handler and `/api/health`. Every action runs one enforced shape via the `withAction()` wrapper: **validate (Zod) → resolve Actor → authorize → Drizzle transaction → server analytics → Result**. Business rules (scoring, blueprint, progression, migration) are pure functions in feature files (`assessment/scoring.ts`, `progress/rules.ts`) — unit-testable without a database. Server Component reads live in each feature's `queries.ts`; components never touch the db client.

## Background work & retries
No queue/cron (ADR: boring by default). Deferred work = client retry queue (×3, 1s/4s/10s backoff, then error toast). Actions are fast (<300ms p95; submitAttempt <500ms) and idempotent where retried: mutations accept a client `idempotencyKey`; replays return the stored result. Abandoned attempts resolve lazily (marked on next read after 24h). The only "event" is publish → `revalidatePath`.

## Related Documents
- [api-contracts.md](api-contracts.md) · [error-handling.md](error-handling.md) · [security.md](security.md)
