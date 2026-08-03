---
title: Production Environment Setup
category: ops
owner: product-owner
status: approved
related: [launch-runbook.md, ../engineering/deployment.md, ../adr/adr-026-secrets-and-rate-limiting.md]
last_updated: 2026-08-03
---

# Production Environment Setup

One-time provisioning checklist. Everything here needs account access only the product owner has; each item is a checkbox so nothing is skipped. Staging stays exactly as it is - production is a **separate** Supabase project, Railway environment, and PostHog project.

## 1. Supabase (production project)

- [ ] Create a new Supabase project (separate from staging), same region (us-east-2) for latency parity.
- [ ] Copy the pooled connection string (port 6543) as `DATABASE_URL` and the session-pooler string (port 5432) as `DIRECT_DATABASE_URL`. The direct string must use the session pooler host (`aws-0-us-east-2.pooler.supabase.com`), not the db host - Railway is IPv4-only.
- [ ] Do not run migrations by hand; the first deploy's pre-deploy step migrates and seeds.
- [ ] Enable point-in-time recovery if the plan allows it (rollback of last resort).

## 2. Railway (production environment)

- [ ] Create a `production` environment on the existing Railway project (staging keeps deploying from `main`).
- [ ] Set the production service to deploy from **release tags** (`v*`), not branch pushes.
- [ ] Set variables - fresh values, never copied from staging:
  - `DATABASE_URL`, `DIRECT_DATABASE_URL` - from step 1
  - `GUEST_TOKEN_SECRET` - newly generated 32+ char secret (`openssl rand -base64 32`)
  - `BETTER_AUTH_SECRET` - newly generated (unused until M6, still set fresh)
  - `NEXT_PUBLIC_POSTHOG_KEY` - from step 3
  - `NEXT_PUBLIC_POSTHOG_HOST` - `https://us.i.posthog.com`
  - `APP_ENV=production` (hides the version field in `/api/health`)
  - `PORT=3000` and domain target port 3000
- [ ] **Do not set `NEXT_PUBLIC_PREVIEW_AUTH`.** It enables the simulated sign-in used to build S10/S11 before BetterAuth. `APP_ENV=production` blocks it server-side regardless, but the flag must be absent so it never reaches the client bundle either.
- [ ] Attach the production domain.
- [ ] Confirm Node 24 is picked up (`.node-version` in repo).

## 3. PostHog (production project)

- [ ] Create a separate PostHog project for production; staging events must not mix with pilot data.
- [ ] Put its key into Railway (step 2).
- [ ] Recreate funnels F1-F3 and the dashboards from [analytics.md](../engineering/analytics.md) in the production project, with owners.
- [ ] Set the alert: `error_event` rate over 1% of sessions.

## 4. GitHub

- [ ] Branch protection on `main`: require the five CI checks (static, unit, build-migrate, e2e, lighthouse) and one review.
- [ ] Protect tags `v*` so only maintainers can push release tags.

## 5. Secret hygiene

- [ ] Rotate staging `GUEST_TOKEN_SECRET` and any secret that was ever pasted into a chat, ticket, or terminal during development.
- [ ] Verify no `.env*` file is tracked (`git ls-files | grep .env` returns nothing; verified 2026-08-03).

## 6. First deploy

Follow [launch-runbook.md](launch-runbook.md) go-live with tag `v1.0.0`.

## Related Documents
- [launch-runbook.md](launch-runbook.md) - what happens after this checklist
- [../engineering/deployment.md](../engineering/deployment.md) - the environment model this implements
