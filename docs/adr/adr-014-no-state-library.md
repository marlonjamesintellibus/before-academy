---
title: "ADR-014: No global state library; device and session storage behind two hooks"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Frontend
related: [adr-025-device-only-guests.md]
last_updated: 2026-07-31
---

# ADR-014 — No global state library; device and session storage behind two hooks

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Frontend

## Context
Phase 1's only cross-page client state is guest progress and the in-flight attempt — both are storage-backed, not shared UI state.

## Decision
Local component state plus useDeviceStore (schema-versioned localStorage) and useAttempt (reducer mirrored to sessionStorage); no Zustand/Redux.

## Alternatives considered
Global store (rejected: duplicates the database and device storage as a third source of truth); server state only (rejected: guests have no server state by ADR-025).

## Consequences
- **Positive:** Fewer moving parts; storage semantics live in exactly two audited files.
- **Negative:** A future realtime or tutor feature will need a store — deliberately deferred until that evidence exists.

## Related Documents
- [ADR-025](adr-025-device-only-guests.md)
- Specifications: Eng §3.3
