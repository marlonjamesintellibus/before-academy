---
title: "ADR-012: Next.js App Router with RSC and Server Actions as the only mutation path"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Frontend
related: [adr-017-railway-single-deployable.md, adr-024-app-layer-authorization.md]
last_updated: 2026-07-31
---

# ADR-012 - Next.js App Router with RSC and Server Actions as the only mutation path

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Frontend

## Context
The product is content-heavy, guest-first, and needs server-held assessment integrity with minimal API surface.

## Decision
Server Components render published content; client islands handle interactivity; Server Actions are the sole mutation path - no REST/GraphQL layer in Phase 1.

## Alternatives considered
SPA + separate API service (rejected: a second deployable and contract layer for one team, and shipping question data to a client-heavy app fights assessment integrity); Remix/SvelteKit (rejected: comparable fit, smaller ecosystem overlap with the mandated stack and agent familiarity).

## Consequences
- **Positive:** One deployable; typed end-to-end; content stays server-rendered and fast; minimal attack surface.
- **Negative:** Framework coupling to Next.js conventions; Server Action semantics must be learned once (documented Eng §4.2).

## Related Documents
- [ADR-017](adr-017-railway-single-deployable.md)
- [ADR-024](adr-024-app-layer-authorization.md)
- Specifications: Eng §1, §3–4
