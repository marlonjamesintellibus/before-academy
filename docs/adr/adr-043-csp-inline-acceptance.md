---
title: "ADR-043: Accept CSP 'unsafe-inline' scripts for the pilot instead of nonce-based CSP"
category: adr
status: Accepted
date: 2026-08-03
decision_category: Engineering
related: [adr-026-secrets-and-rate-limiting.md, adr-033-trunk-based-delivery.md]
last_updated: 2026-08-03
---

# ADR-043 - Accept CSP 'unsafe-inline' scripts for the pilot instead of nonce-based CSP

**Status:** Accepted · **Date:** 2026-08-03 · **Category:** Engineering

## Context

The M8 gate record carried a residual: `script-src` allows `'unsafe-inline'` because Next.js hydration emits inline scripts. The strict alternative is nonce-based CSP, which in Next.js requires middleware minting a per-request nonce - and that forces every route to render dynamically. The app's performance budgets (LCP under 2.5s on the pilot audience's devices) rest on static rendering of the content routes.

## Decision

Keep `'unsafe-inline'` in `script-src` for the pilot, and record it as an accepted risk rather than a pending fix.

## Rationale

- The primary threat CSP script restrictions mitigate is injected markup executing. This app renders no user-generated HTML anywhere: all content comes from reviewed, linted seeds; all user input is either device-local or validated through the closed server-action taxonomy and never re-rendered as markup.
- The rest of the policy stays strict: `default-src 'self'`, no remote script hosts beyond the PostHog ingest origin, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`.
- Trading the static-rendering performance budget for a nonce defends against a vector the app does not currently have.

## Revisit when

M6 introduces authenticated, user-attributed data, or any feature renders user-supplied rich content. At that point the calculus flips and nonce or hash-based CSP should be implemented even at the cost of dynamic rendering on affected routes.

## Related Documents
- [../ops/m9-checklist.md](../ops/m9-checklist.md) - security review record referencing this decision
