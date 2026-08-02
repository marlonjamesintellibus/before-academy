---
title: "ADR-024: Application-layer authorization with RLS as a deny-all backstop"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Security
related: [adr-016-betterauth-in-app.md, adr-012-nextjs-rsc-server-actions.md]
last_updated: 2026-07-31
---

# ADR-024 - Application-layer authorization with RLS as a deny-all backstop

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Security

## Context
BetterAuth sessions never become Postgres JWTs (ADR-016), so per-user RLS policies would require a parallel authorization layer that can drift from application rules.

## Decision
Authorization is enforced centrally in the Server Action wrapper (actor from session; ownership rule); RLS is enabled on every table with no permissive policies for anon/authenticated roles.

## Alternatives considered
Full per-user RLS (rejected: two sources of authorization truth); no RLS (rejected: a leaked anon key would read data).

## Consequences
- **Positive:** One audited authorization path; leaked public keys read nothing; probes are testable (Eng §17).
- **Negative:** Database is not independently self-protecting for the app role - accepted with the single-write-path design.

## Related Documents
- [ADR-016](adr-016-betterauth-in-app.md)
- [ADR-012](adr-012-nextjs-rsc-server-actions.md)
- Specifications: Eng §6.4/§7.3
