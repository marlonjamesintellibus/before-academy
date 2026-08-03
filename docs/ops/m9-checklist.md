---
title: M9 Completion Checklist
category: ops
owner: product-owner
status: in_review
related: [launch-runbook.md, production-setup.md, pilot-plan.md, ../roadmap/milestones.md]
last_updated: 2026-08-03
---

# M9 Completion Checklist

The Phase 1 sign-off from [milestones.md](../roadmap/milestones.md), expanded into checkable items with owners and current status. Sign-off requires product owner, education lead, and engineering lead initials at the bottom.

## Engineering (status as of 2026-08-03)

- [x] Full regression green: lint, typecheck, prettier, content lint, 49 unit tests, production build, 78 e2e tests (desktop + mobile), run 2026-08-03 on top of 2ab4154.
- [x] CI green on `main` including Lighthouse budgets (accessibility 0.95+, best practices 0.9+, LCP under 2.5s, CLS under 0.1).
- [x] Security review performed (record below).
- [x] Rollback rehearsed: previous release verified healthy against current schema; record in [launch-runbook.md](launch-runbook.md).
- [ ] Railway click-through rehearsal: redeploy a previous staging deployment once from the dashboard. **Owner: product owner.**
- [ ] Production provisioned per [production-setup.md](production-setup.md). **Owner: product owner.**
- [ ] `v1.0.0` deployed; go-live smoke passed per [launch-runbook.md](launch-runbook.md).
- [ ] Production healthy 5 consecutive days (ops log).

## Security review record (2026-08-03)

- Dependency audit: no fixable production vulnerabilities. Remaining `npm audit` findings are in Next 16.2.12's bundled sharp/postcss (no upstream fix; we are on latest) and drizzle-kit's bundled esbuild (dev-only, never deployed). Sharp's only runtime surface, the `/_next/image` optimizer, is now disabled (`images.unoptimized`) since `next/image` is unused. Postcss finding is build-time only. Re-run `npm audit` before tagging each release.
- Secrets: no `.env*` tracked; no hardcoded credentials in source; guest tokens HMAC-signed with timing-safe comparison and TTL.
- Headers verified live on staging: CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options DENY.
- CSP `'unsafe-inline'` script allowance: accepted for pilot with rationale in [ADR-043](../adr/adr-043-csp-inline-acceptance.md).
- Server actions: closed error taxonomy, zod input bounds, IP + actor rate limiting, no internal errors reach clients; RLS deny-all backstop migration in place.

## Content

- [ ] All Section 1 content published with owners and versions; provisional flags documented. **Owner: education lead.**
- [ ] LO matrix verified against the assessment blueprint. **Owner: education lead.**

## Accessibility

- [x] Automated AA gate green; evidence archived in [aa-gate-record.md](../product/aa-gate-record.md).
- [ ] Manual screen-reader passes: VoiceOver and NVDA through J1-J4. **Owner: product owner or SR-fluent tester.** The one human a11y task left.

## Analytics

- [ ] Production PostHog project live; every taxonomy event verified once in production. **Owner: product owner (setup), engineering (verification).**
- [ ] Funnels F1-F3 and dashboards recreated in the production project with owners.

## Validation

- [ ] Pilot run per [pilot-plan.md](pilot-plan.md); pre/post and confidence deltas analyzed.
- [ ] One revision cycle merged and redeployed.
- [ ] Decision package delivered to leadership.

## Sign-off

| Role | Name | Date | Initials |
|---|---|---|---|
| Product owner | | | |
| Education lead | | | |
| Engineering lead | | | |

## Related Documents
- [launch-runbook.md](launch-runbook.md) · [production-setup.md](production-setup.md) · [pilot-plan.md](pilot-plan.md)
