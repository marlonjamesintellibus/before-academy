---
title: Security Standards
category: engineering
owner: engineering-lead
status: approved
related: [auth.md, ../adr/adr-026-secrets-and-rate-limiting.md]
last_updated: 2026-07-31
---

# Security

Canonical; deviations require an ADR.

- **Authorization:** app-layer via `withAction()` ([auth.md](auth.md)). **RLS:** enabled on every table with no permissive policies for anon/authenticated roles - deny-all backstop; a leaked anon key reads nothing; probes are CI tests (ADR-024).
- **Input:** every boundary parses with Zod first (unknown keys stripped, strings capped, enums exact); guest payloads additionally clamped. **SQL:** Drizzle parameterized only; `sql``` fragments reviewed, `queries.ts` only. **XSS:** React escaping; no `dangerouslySetInnerHTML` in learner paths; content renders from structured fields - the content model is the defense; user text (feedback) renders nowhere in Phase 1.
- **CSRF:** Next.js origin checks + SameSite=Lax; BetterAuth handler self-protects; no cross-origin API exists.
- **Rate limiting:** Postgres unlogged counter table (auth 10/min/IP · feedback 5/min/actor · attempt submit 10/min/actor) → RATE_LIMITED; Redis swap is a one-file change on evidence (ADR-026).
- **Secrets:** Railway env config only; service-role key imported solely in `lib/storage.ts` (`server-only`); `.env.example` names, never values; CI secret scan.
- **Headers (middleware):** CSP (self + PostHog; hashed inline only), HSTS, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, minimal Permissions-Policy.
- **Audit & PII:** content fully audited via content_versions; auth events logged structurally without secrets; PII = email + optional display name post-consent, feedback email optional; analytics carry no PII pre-consent. Privacy review of guest analytics + migration payload is a release dependency (roadmap D8).

## Related Documents
- [error-handling.md](error-handling.md) - logging rules
