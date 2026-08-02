---
title: Decision Register
category: shared
owner: product-owner
status: approved
related: [../adr/README.md]
last_updated: 2026-07-31
---

# Decision Register

Master index: every major decision has an ADR; each ADR names its owning spec doc. Full reasoning lives in [../adr/](../adr/README.md) - this table is for lookup.

| Area | Decisions | ADRs |
|---|---|---|
| Product shape | Vertical slice first; AI Awareness first; competency progression; guest-first; assessment-first | 001–005 |
| UX | Inline layered disclosure; custom app not LMS; a11y as release gate; learning before gamification; buttons not drag; step-per-URL | 006–011 |
| Frontend | Next.js RSC + Server Actions only; strict TS + tokens + wrapped shadcn; no state library | 012–014 |
| Backend | Supabase = Postgres+Storage only; BetterAuth in-app; Railway single deployable; OpenRouter reserved; Drizzle | 015–019 |
| Data & content | Canonical records; immutable versioning; dual deletion; forward-only migrations; PR-seed publishing | 020–023, 027 |
| Security | App-layer authz + RLS deny-all; device-only guests + signed tokens; Railway secrets + PG rate limiting | 024–026 |
| Assessment | Blueprint metadata; server-scored graded / client-scored practice; provisional 80% config, unlimited retakes | 028–030 |
| Analytics | PostHog explicit events, alias at conversion; metric↔decision rule | 031–032 |
| DevOps | Trunk-based milestones; ISR + dual-track rollback | 033–034 |
| Deferrals | Multi-tenancy, AI tutor, mobile, personalization, certificates, offline, CMS | 035–041 |

## Related Documents
- [../adr/README.md](../adr/README.md) - full records
