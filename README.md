# Before Academy

Learn to tell AI, automation, and traditional software apart. Phase 1 is one vertical slice — the AI Awareness lesson _AI, Automation and Traditional Software_ — built per the canonical knowledge base in [docs/](docs/README.md).

## Stack

Next.js (App Router, RSC + Server Actions) · strict TypeScript · Tailwind (design tokens) · Drizzle ORM · Supabase Postgres · BetterAuth · Railway · PostHog. Every choice traces to an ADR in [docs/adr/](docs/adr/README.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL etc.
npm run db:migrate           # apply migrations (DIRECT_DATABASE_URL)
npm run dev
```

## Commands

| Command                                 | Purpose                                                |
| --------------------------------------- | ------------------------------------------------------ |
| `npm run dev`                           | local dev server                                       |
| `npm run typecheck` / `lint` / `format` | static gates (CI order)                                |
| `npm test`                              | unit tests (Vitest)                                    |
| `npm run e2e`                           | Playwright smoke/journeys                              |
| `npm run build`                         | production build                                       |
| `npm run db:generate`                   | generate migration from schema (forward-only, ADR-023) |
| `npm run db:migrate`                    | apply migrations                                       |

## Repository layout

`src/app` routing only · `src/features/*` feature modules (import via `index.ts` only) · `src/components/ui` wrapped primitives · `src/lib` shared core (result, withAction, events, rate-limit, logger, db) · `src/db` schema + migrations + seeds · `e2e` Playwright · [docs/](docs/README.md) the knowledge base · [phase1-content/](phase1-content/README.md) the learner content package.

Import layering is lint-enforced: app → features → lib.

## Environments & deploy

Railway runs the single deployable (ADR-017); one Supabase project per env (previews share one). Deploys run migrations, then gate on `/api/health` before traffic. See [docs/engineering/deployment.md](docs/engineering/deployment.md) and [SETUP.md](SETUP.md) for one-time provisioning.
