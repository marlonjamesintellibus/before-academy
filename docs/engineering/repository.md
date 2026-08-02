---
title: Repository Structure
category: engineering
owner: engineering-lead
status: approved
related: [standards.md, ../shared/naming-conventions.md]
last_updated: 2026-07-31
---

# Repository Structure

Feature-first under `src/features`; framework wiring thin in `src/app`; two-plus consumers → `src/lib` or `components/ui`.

```text
before-academy/
├─ src/
│  ├─ app/                       # routing + layouts only
│  │  ├─ (marketing)/page.tsx    # /            S01
│  │  ├─ learn/page.tsx          # /learn       S02
│  │  ├─ learn/[pathway]/[section]/
│  │  │  ├─ page.tsx             # lesson       S03
│  │  │  ├─ activity/page.tsx    # S04
│  │  │  ├─ check/page.tsx       # S05
│  │  │  ├─ assessment/{page,results/page}.tsx  # S06–S08
│  │  │  └─ review/page.tsx      # S09
│  │  ├─ auth/                   # S10
│  │  ├─ dashboard/page.tsx      # S11 (protected)
│  │  └─ api/{auth/[...all],health}/route.ts
│  ├─ features/                  # content · activity · assessment ·
│  │  │                          # progress · auth · feedback
│  │  └─ <feature>/{components/,actions.ts,queries.ts,schemas.ts,types.ts,index.ts}
│  ├─ components/ui/             # wrapped shadcn + primitives
│  ├─ lib/                       # db, analytics, auth-server, result,
│  │                             # rate-limit, storage, ai/ (reserved)
│  ├─ db/{schema/,migrations/,seed/}
│  └─ styles/
├─ e2e/                          # Playwright J1–J4
├─ docs/                         # this knowledge base
└─ drizzle.config.ts · next.config.ts · .env.example
```

**Import layering (lint-enforced):** app → features → lib; features never import another feature's internals — only its `index.ts`.

## Environment variables
`DATABASE_URL` (pooled) · `DIRECT_DATABASE_URL` (migrations) · `BETTER_AUTH_SECRET/URL` · `GOOGLE_CLIENT_ID/SECRET` · `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (server-only, Storage) · `GUEST_TOKEN_SECRET` (guest attempt HMAC, [assessment-engine.md](assessment-engine.md)) · `NEXT_PUBLIC_POSTHOG_KEY/HOST` · `OPENROUTER_API_KEY` (reserved) · `APP_ENV`. `.env.example` is the canonical inventory, updated in the same PR as any new variable.

## Related Documents
- [standards.md](standards.md) · [deployment.md](deployment.md)
