---
title: Frontend Architecture
category: engineering
owner: engineering-lead
status: approved
depends_on: [../product/information-architecture.md, ../product/design-system.md]
related: [../adr/adr-014-no-state-library.md]
last_updated: 2026-07-31
---

# Frontend Architecture

Component behaviour/states/copy are canonical in [../product/](../product/README.md); this defines implementation only.

## Rendering strategy
| Routes | Strategy |
|---|---|
| `/`, `/learn`, lesson + step shells | Static + ISR, revalidated on publish |
| `/dashboard`, `/auth` | Dynamic (session-dependent) |
| Assessment attempt state | Client island over server-selected question set |

## Server vs client
Default Server Component. The complete client-island list: depth panels, diagram layers, activity player, check player, assessment player, confidence scale, conversion/feedback/exit modals, resume banner, toasts, auth forms. Islands receive serialized, authorized data as props — no fetching on mount except the analytics client. shadcn primitives are wrapped once in `components/ui` with tokens ([../product/design-system.md](../product/design-system.md)); features consume wrappers only.

## State (ADR-014: no global store)
Local state + two hooks:
- `useDeviceStore` — namespaced `ba.v1.*` localStorage, schema-versioned payloads (readers migrate or discard mismatches); powers guest progress, resume, depth persistence; single `canWriteStorage()` check drives the private-browsing degradation.
- `useAttempt` — reducer for the in-flight attempt, mirrored to sessionStorage for refresh-resume.
Components never touch storage APIs directly.

## Forms, validation, boundaries
react-hook-form + zodResolver for auth/feedback; players use reducer state. Zod schemas in each feature's `schemas.ts`, shared verbatim between client and Server Action re-validation. Per-segment `error.tsx` renders the retry panel and reports via the captureException wrapper; Suspense fallbacks are the skeleton components matching final layout (CLS).

## Related Documents
- [../product/components.md](../product/components.md) · [performance.md](performance.md)
