---
title: Launch Runbook
category: ops
owner: engineering-lead
status: approved
related: [production-setup.md, ../engineering/deployment.md, m9-checklist.md]
last_updated: 2026-08-03
---

# Launch Runbook

Step-by-step go-live and rollback procedures for production. Assumes [production-setup.md](production-setup.md) is complete. The topology and release model live in [deployment.md](../engineering/deployment.md); this document is the operational script.

## Go-live (release-tag deploy)

1. Confirm CI is green on the `main` commit being released.
2. Tag it: `git tag v1.0.0 && git push origin v1.0.0` (semver; pilot starts at v1.0.0).
3. Railway builds from the tag. Pre-deploy runs `npm run db:migrate && npm run db:seed` against the production database (seed is hash-idempotent; a no-change publish is a no-op).
4. Deploy gates on `/api/health` returning `{"status":"ok"}`. If the health check fails, traffic never switches; investigate before retrying.
5. Post-deploy smoke (5 minutes, any operator):
   - `curl -s https://<prod-domain>/api/health` returns ok with a sane `db_ms`.
   - Home, pathway, and lesson routes return 200 and render.
   - One full guest run: lesson stage advance, one activity scenario, assessment start.
   - Security headers present: `curl -sI https://<prod-domain>/ | grep -i content-security`.
   - PostHog live events show `page_viewed` from the smoke run (production key, not staging).
6. Record deploy time and version in the ops log (bottom of this file).

## Rollback

Two independent levers; pick the smallest one that fixes the problem.

### Code rollback (bad release)
Railway dashboard → service → Deployments → previous successful deployment → Redeploy. Do not roll back the database: migrations are forward-only and must stay backward-compatible one release (expand, migrate, contract), so the previous image runs on the current schema.

### Content rollback (bad content publish)
Fix or revert the seed source and republish (`npm run db:seed` via a Railway job run). Content versions flip transactionally; no code deploy involved.

### When neither applies
Database emergencies (bad migration reaching production) use Supabase point-in-time recovery; that is a data-loss decision requiring the product owner. Never rehearsed casually; documented here so it is not invented under pressure.

## Rollback rehearsal record

Performed 2026-08-03 against commit history 2ab4154 (current) and b11174c (previous release candidate):

- Built b11174c from a clean checkout and ran it against the **current** migrated and seeded schema.
- `/api/health` returned `{"status":"ok"}`; home and lesson routes returned 200.
- Conclusion: image revert is safe without touching the database, as the release model requires.
- Content rollback path (hash-idempotent republish) is exercised on every CI run and every deploy's pre-deploy step.
- Platform-side click-through (Railway "Redeploy" on a previous deployment) is a user-performed step; rehearse once on staging before the production go-live and initial it on the [m9-checklist.md](m9-checklist.md).

## Monitoring during the pilot

- `/api/health` external uptime check (add the prod domain to the uptime monitor; 1 minute interval).
- PostHog: `error_event` rate over 1% of sessions is the alert line ([analytics.md](../engineering/analytics.md)).
- Exit criterion: production healthy for 5 consecutive days; log daily checks in the ops log.

## Ops log

| Date | Version | Event | Operator | Notes |
|---|---|---|---|---|
| | | | | |

## Related Documents
- [production-setup.md](production-setup.md) - one-time provisioning before this runbook applies
- [m9-checklist.md](m9-checklist.md) - the sign-off this runbook feeds
