---
title: "ADR-016: BetterAuth runs in-app with its tables in the application database"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Backend
related: [adr-015-supabase-scope.md, adr-024-app-layer-authorization.md, adr-025-device-only-guests.md]
last_updated: 2026-07-31
---

# ADR-016 — BetterAuth runs in-app with its tables in the application database

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Backend

## Context
Identity must support email+password and one OAuth provider, cheap sessions, and a transactional guest-progress migration at sign-up.

## Decision
BetterAuth with the Drizzle adapter, auth tables in the same Postgres database, sessions as httpOnly cookies resolved once in middleware.

## Alternatives considered
Supabase Auth (rejected per ADR-015); Clerk/Auth0 (rejected: external identity store makes migration non-transactional and adds a vendor); custom auth (rejected: highest-risk wheel to reinvent).

## Consequences
- **Positive:** Sign-up and progress migration commit in one transaction; one fewer external system.
- **Negative:** No hosted-auth dashboard conveniences; per-user Postgres JWTs never exist (drives ADR-024).

## Related Documents
- [ADR-015](adr-015-supabase-scope.md)
- [ADR-024](adr-024-app-layer-authorization.md)
- [ADR-025](adr-025-device-only-guests.md)
- Specifications: Eng §6
