---
title: Architecture Decision Records
category: adr
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Architecture Decision Records

Why the system is the way it is. Each record is self-contained. Full records (001–034) carry context, decision, alternatives with rejection reasons, consequences, references. Deferral records (035–041) use a lighter template - merged context-and-decision plus a revisit trigger - because the decision is "not yet", not a choice among alternatives. Implementation mechanics live in the specs - ADRs answer only "why".

## Practice
New decisions and deviations create new records numbered from **ADR-043** (`adr-{nnn}-{slug}.md`, template = any existing record). Superseding sets the old record's status to *Superseded* with a forward reference - records are never rewritten. Provisional values inside accepted decisions are marked. Reference format elsewhere in the docs: link the ADR by number.

## Register

| ADR | Title | Status | Category |
|---|---|---|---|
| [ADR-001](adr-001-vertical-slice-first.md) | Build one vertical slice before the full pathway | Accepted | Product |
| [ADR-002](adr-002-ai-awareness-first.md) | AI Awareness is the first pathway | Accepted | Product |
| [ADR-003](adr-003-competency-progression.md) | Progression is competency-based, not consumption-based | Accepted | Product |
| [ADR-004](adr-004-guest-first-access.md) | Guest-first access with account conversion after value | Accepted | Product |
| [ADR-005](adr-005-assessment-first-route.md) | Assessment-first entry is a supported route | Accepted | Product |
| [ADR-006](adr-006-layered-disclosure.md) | Layered depth via inline progressive disclosure | Accepted | UX |
| [ADR-007](adr-007-custom-app-not-lms.md) | Custom web application, not an LMS platform | Accepted | UX |
| [ADR-008](adr-008-accessibility-release-gate.md) | Accessibility is a release gate, not a polish task | Accepted | UX |
| [ADR-009](adr-009-learning-before-gamification.md) | Learning interactions before engagement mechanics | Accepted | UX |
| [ADR-010](adr-010-buttons-not-drag.md) | Button-based interactions; no drag-and-drop | Accepted | UX |
| [ADR-011](adr-011-step-per-url.md) | One focused step per URL and one question per view | Accepted | UX |
| [ADR-012](adr-012-nextjs-rsc-server-actions.md) | Next.js App Router with RSC and Server Actions as the only mutation path | Accepted | Frontend |
| [ADR-013](adr-013-strict-ts-tokens-shadcn.md) | Strict TypeScript, Tailwind tokens, and wrapped shadcn/ui primitives | Accepted | Frontend |
| [ADR-014](adr-014-no-state-library.md) | No global state library; device and session storage behind two hooks | Accepted | Frontend |
| [ADR-015](adr-015-supabase-scope.md) | Supabase as hosted PostgreSQL and Storage only | Accepted | Backend |
| [ADR-016](adr-016-betterauth-in-app.md) | BetterAuth runs in-app with its tables in the application database | Accepted | Backend |
| [ADR-017](adr-017-railway-single-deployable.md) | Railway hosts a single deployable | Accepted | Backend |
| [ADR-018](adr-018-openrouter-reserved.md) | OpenRouter is a reserved seam with zero Phase 1 runtime use | Accepted | Backend |
| [ADR-019](adr-019-drizzle-orm.md) | Drizzle ORM for data access; supabase-js only for Storage | Accepted | Backend |
| [ADR-020](adr-020-canonical-content-records.md) | Canonical content records are the single source of truth | Accepted | Data/Content |
| [ADR-021](adr-021-immutable-versioning.md) | Immutable snapshot versioning; published content is never edited in place | Accepted | Data/Content |
| [ADR-022](adr-022-dual-deletion.md) | Two deletion mechanisms: archive content, hard-delete learner data | Accepted | Data/Content |
| [ADR-023](adr-023-forward-only-migrations.md) | Forward-only migrations with expand–migrate–contract | Accepted | Data/Content |
| [ADR-024](adr-024-app-layer-authorization.md) | Application-layer authorization with RLS as a deny-all backstop | Accepted | Security |
| [ADR-025](adr-025-device-only-guests.md) | Guests are device-only: anonymous ID locally, signed tokens for attempts, no server profiles | Accepted | Security |
| [ADR-026](adr-026-secrets-and-rate-limiting.md) | Secrets in platform env config; Postgres-backed rate limiting | Accepted | Security |
| [ADR-027](adr-027-pr-seed-publishing.md) | PR-reviewed JSON seed files are the Phase 1 authoring and publishing system | Accepted | Data/Content |
| [ADR-028](adr-028-blueprint-metadata.md) | Blueprint-based assessment with category and difficulty metadata | Accepted | Assessment |
| [ADR-029](adr-029-scoring-split.md) | Server-scored assessment; client-scored practice | Accepted | Assessment |
| [ADR-030](adr-030-provisional-threshold.md) | 80% threshold and attempt size are provisional configuration; retakes are unlimited with combination exclusion | Accepted (provisional values) | Assessment |
| [ADR-031](adr-031-posthog-explicit-events.md) | PostHog with explicit typed events only; identity aliased at conversion | Accepted | Analytics |
| [ADR-032](adr-032-metric-decision-rule.md) | Every metric maps to a documented decision | Accepted | Analytics |
| [ADR-033](adr-033-trunk-based-delivery.md) | Trunk-based development delivering milestone increments to a continuous staging | Accepted | DevOps |
| [ADR-034](adr-034-isr-dual-rollback.md) | ISR with publish-time revalidation; dual-track rollback (image revert + content version flip) | Accepted | DevOps |
| [ADR-035](adr-035-defer-multi-tenancy.md) | Multi-tenancy & organizations deferred | Accepted (deferral) | Future |
| [ADR-036](adr-036-defer-ai-tutor.md) | AI tutor deferred | Accepted (deferral) | Future |
| [ADR-037](adr-037-defer-native-mobile.md) | Native mobile apps deferred | Accepted (deferral) | Future |
| [ADR-038](adr-038-defer-personalization.md) | Personalization & adaptive difficulty deferred | Accepted (deferral) | Future |
| [ADR-039](adr-039-defer-certificates.md) | Certificates & credentials deferred | Accepted (deferral) | Future |
| [ADR-040](adr-040-defer-offline.md) | Offline support deferred | Accepted (deferral) | Future |
| [ADR-041](adr-041-defer-cms-ui.md) | CMS UI deferred | Accepted (deferral) | Future |

## Timeline
**Foundational (Phase 0 approvals):** 001–005 product shape · 006–011 learning UX. **Phase 1 build:** 012–019 stack composition · 020–023 content & data model · 024–026 security posture · 027–030 content ops & assessment · 031–034 analytics & delivery. **Future (evidence-gated):** 035–041 deferrals; 042+ opened by Phase 2, enterprise, tutor, mobile.

## Future decision backlog
Phase 2 authoring at volume (reopens 027/041) · adaptive selection on calibration data (028/038) · AI Literacy localization runtime · enterprise org model + authorization revisit (024/035) · AI tutor activation via the reserved seam (018/036) · mobile/offline (037/040) · scale items: rate-limiter swap, revalidation fan-out, queue introduction · credentials once validity is proven (039).

## Related Documents
- [../shared/decision-register.md](../shared/decision-register.md) - one-table lookup by area
