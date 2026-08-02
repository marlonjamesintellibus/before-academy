---
title: Deployment & Operations
category: engineering
owner: engineering-lead
status: approved
related: [../adr/adr-033-trunk-based-delivery.md, ../adr/adr-034-isr-dual-rollback.md]
last_updated: 2026-07-31
---

# Deployment & Operations

## Topology & environments
Railway runs the Next.js service per environment; one Supabase project per environment; separate PostHog keys.

| Env | Trigger | Data | Purpose |
|---|---|---|---|
| development | local | local/dev Supabase | day-to-day; seeds |
| preview | PR deploys | shared reseedable (one Supabase project shared by all previews - the per-environment rule applies to dev/staging/prod) | review UI + content PRs; may render in_review |
| staging | main | staging Supabase | milestone verification, pilot prep |
| production | release tag | production Supabase | public |

## Release & rollback
Tag → build → migrations (DIRECT_DATABASE_URL) → health check must pass → traffic. **Code rollback:** Railway image revert (migrations are backward-compatible one release - expand→migrate→contract). **Content rollback:** version flip via republish - independent of deploys. Both rehearsed before pilot.

## Monitoring
`/api/health` (db round-trip + version); external uptime check on `/` and health. Alerts: error_event rate > 1% of sessions, Server Action p95 breach, deploy health failure. Seed/publish runs as a Railway job with explicit production confirmation.

## Related Documents
- [../roadmap/delivery-process.md](../roadmap/delivery-process.md) - release ladder incl. beta/pilot
