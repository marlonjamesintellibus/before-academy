---
title: Milestones M0–M9
category: roadmap
owner: product-owner
status: approved
related: [dependencies.md, delivery-process.md]
last_updated: 2026-07-31
---

# Milestones

Each ends deployed and demonstrable on staging. Global DoD ([delivery-process.md](delivery-process.md)) applies to every story; only deltas are listed. Timeline ≈ 13 weeks mapping to Phase 1's 90-day plan (build by day 60, test/refine by day 90).

| M | Objective | Key deliverables | Exit criterion |
|---|---|---|---|
| M0 | Foundation | repo + CI (full pipeline), Railway/Supabase envs, schema v0 + migrations, tokens + 6 wrapped primitives, lib core (result, withAction shell, events stub, rate-limit, logging) | CI green; staging serves via real pipeline |
| M1 | App shell | layouts, header/footer/skip/breadcrumbs, S01 + S02 (static) + lesson shell + 404/errors, responsive + reduced-motion plumbing, PostHog init | shell navigable keyboard-only; Lighthouse baseline |
| M2 | Lesson | content engine (12 block renderers, rich text, record resolution), seed/publish pipeline + content-lint v1, S03 complete (depth panels, interactive diagram + text alt, glossary chips), lesson events | full lesson readable from versioned seeds; standalone-test mapping reviewed |
| M3 | Interaction | S04 activity (player, 5-category buttons, feedback formula rendering, summary, mid-activity resume), S05 check + remediation chips | J1 through check completable keyboard + touch; 6/7 pair fixed order with cross-referencing feedback |
| M4 | Assessment | createAttempt/submitAttempt (blueprint, exclusion, sanitized payloads, server scoring, idempotency), S06–S08 (5 formats, exit confirm, pass/fail + confidence), S09 remediation + retake; threshold/size as config | J2 demonstrable: pass, fail w/ correct breakdown, different-combination retake; scoring parity integration-tested |
| M5 | Guest progress | useDeviceStore (ba.v1.*, schema-versioned, degradation + S13d), resume banners + route/scroll restore, signed guest attempt tokens, completion states, anonymous_id; **ProgressSnapshot frozen at exit** | close/reopen resumes at every step; private-browsing full run works; payload privacy inspected |
| M6 | Auth & migration | BetterAuth (email+pw, Google, middleware), S10 + contextual benefits + guest escape, S13a with caps, migrateGuestProgress (transactional, clamped, idempotent, alias), saveProgress, S11 dashboard | J3 end-to-end; abandon path intact; cross-actor probes FORBIDDEN |
| M7 | Analytics | server capture, event-by-event audit vs the taxonomy, funnels F1–F3 + dashboards + owners, error events + alerts, web-vitals baseline | every event verified in staging; synthetic error fires alert |
| M8 | A11y & polish | full AA audit + fixes (scan, keyboard J1–J4, SR ×2, contrast, zoom, motion), performance budgets green, responsive sweep, copy-consistency pass | AA gate recorded; budgets in CI; zero sev-1/2 open |
| M9 | Launch & pilot | full regression + security checks, rollback rehearsal, docs complete, production deploy, pilot to beginner cohort, one revision cycle, completion report | production healthy ≥5 days; pilot analytics collected; checklist signed by product owner + education lead + eng lead |

**Sequencing notes:** content track runs from M0 (drafting/review is the long pole — see D4). Guest progress (M5) deliberately precedes auth (M6): the account's value is "keep what you have", which can't exist first.

## Phase 1 completion checklist (M9 sign-off)
Product: S01–S13 live matching spec, journeys demonstrable, no scope creep · Engineering: acceptance criteria green incl. isolation + RLS probes, rollback rehearsed · Content: all published w/ owners + versions, LO matrix verified, provisional flags documented · QA: regression green, zero sev-1/2 · Analytics: events verified in prod, funnels populated · A11y: gate evidence archived · Deployment: healthy ≥5 days · Docs: current · Validation: pilot with genuine beginners, pre/post + confidence analyzed, revision merged, leadership decision package.

## Related Documents
- [backlog.md](backlog.md) — the epic/feature breakdown per milestone
