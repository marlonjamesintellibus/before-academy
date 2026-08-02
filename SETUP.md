# One-time environment provisioning (M0)

The repo carries all deploy configuration; these steps need account access and are done once per environment (docs/engineering/deployment.md - dev, staging, production each get their own Supabase project and PostHog key; previews share one reseedable project).

## Supabase (per environment)

1. Create a project (region close to Railway's). Note the **pooled** connection string (port 6543) → `DATABASE_URL`, and the **direct** string (5432) → `DIRECT_DATABASE_URL`.
2. Copy `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only - never exposed to the client).
3. RLS backstop (docs/engineering/security.md): enable RLS deny-all on learner tables; the app connects with the service role and authorizes in `withAction()` (ADR-024).

## Railway

1. Create a project; add a service from this GitHub repo. `railway.json` supplies build, migration pre-deploy, start, and the `/api/health` gate.
2. Environments: `staging` auto-deploys from `main`; `production` deploys on release tags (ADR-033). Enable PR preview deploys pointed at the shared preview Supabase project.
3. Set variables per environment from `.env.example` (generate `BETTER_AUTH_SECRET` and `GUEST_TOKEN_SECRET` with `openssl rand -base64 32`; set `APP_ENV` accordingly).

## GitHub

1. Push this repo; enable branch protection on `main`: require the CI checks (static, unit, build, e2e) + one review (ADR-033).

## PostHog (per environment)

Create a project per environment; set `NEXT_PUBLIC_POSTHOG_KEY/HOST`. Event wiring lands at the analytics milestone - the key can wait until then.

## Google OAuth (deferred to M6)

Create OAuth credentials with the Railway callback URL when auth lands; until then `GOOGLE_CLIENT_ID/SECRET` stay empty and email+password is the only method.
