---
title: Authentication, Authorization & Guest Identity
category: engineering
owner: engineering-lead
status: approved
related: [../adr/adr-016-betterauth-in-app.md, ../adr/adr-024-app-layer-authorization.md, ../adr/adr-025-device-only-guests.md]
last_updated: 2026-07-31
---

# Auth

Canonical reference - other docs cite, never restate.

## BetterAuth
Runs in-app at `/api/auth/[...all]`; Drizzle adapter stores auth tables in the application database (single transactional boundary for migration - ADR-016). Methods: email+password and Google OAuth only. Email verification enabled, non-blocking for learning (gates only notify emails). Sessions: httpOnly Secure SameSite=Lax cookie, 30-day sliding; resolved once in middleware and passed via headers.

## Guest identity (ADR-025)
A guest is a client-generated `anonymous_id` (uuid v4) at `ba.v1.anonymous_id`. Guest learning state is **device-only**; the server stores nothing per-guest except anonymized analytics. The anonymous_id doubles as the PostHog distinct_id, aliased to userId at conversion.

## Actor resolution & authorization (ADR-024)
Every action resolves `Actor = {kind:'registered', userId} | {kind:'guest', anonymousId}`. Persistence actions require registered and return AUTH_REQUIRED otherwise. Ownership rule enforced centrally in `withAction()`: a registered actor touches only rows where `learner_id = session.userId`; no cross-user read exists in any contract; `learner_id` never comes from client input. Roles: learner only in Phase 1 (enum reserves content_admin/org_admin). Protected routes: `/dashboard` (middleware redirect with return_to).

## Guest → registered migration
1. Client detects auth success with local guest state present.
2. Calls `migrateGuestProgress` with the full device payload + anonymous_id + idempotencyKey.
3. Action validates + range-clamps (client data untrusted; marked source='guest_device'), upserts in one transaction, aliases analytics identity, returns summary.
4. Client clears migrated keys, shows success toast, redirects to return_to.
5. Same-key replay is a no-op returning the prior result.

ProgressSnapshot type is frozen at milestone M5 exit (roadmap dependency D5) so migration integrates against a stable shape.

## Account deletion (ADR-022)
Self-serve from the S11 account menu (S13e confirm modal). `deleteAccount` (registered only, ownership rule applies) runs one transaction: hard-delete all learner rows keyed by `learner_id` (progress, attempts, responses, confidence, feedback authorship is anonymized not deleted), then the BetterAuth `user`/`session`/`account`/`verification` rows. After commit, a PostHog person-deletion request is enqueued for the distinct_id (best-effort, retried; analytics events are already anonymized-by-design). All sessions are revoked; the action returns an ack consumed after sign-out. `deleted_at` exists nowhere - deletion is actual row removal.

## Related Documents
- [security.md](security.md) - RLS backstop, headers, rate limits
- [../product/screens/auth-and-dashboard.md](../product/screens/auth-and-dashboard.md) - S10/S11 behaviour
