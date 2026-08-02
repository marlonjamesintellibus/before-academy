---
title: Error Handling
category: engineering
owner: engineering-lead
status: approved
used_by: [api-contracts.md, frontend.md]
last_updated: 2026-07-31
---

# Error Handling

## Taxonomy
Expected domain outcomes (assessment not passed, storage unavailable) are **not errors** — they're modeled in success payloads and UX states. Errors: VALIDATION (field map → inline messages) · AUTH_REQUIRED / FORBIDDEN · NOT_FOUND · CONFLICT (idempotency replay with different payload) · RATE_LIMITED · INTERNAL. Closed enum in `lib/result.ts`; additions are reviewed changes.

## Result type
```ts
type Result<T> =
  | { ok: true;  data: T }
  | { ok: false; error: { code: ErrorCode; message: string;
      fields?: Record<string,string>; retryable: boolean } }
```
Server Actions never throw to the client; `withAction()` catches, classifies, logs, returns Result. Components branch on `ok` — no try/catch in UI. `message` is learner-safe copy ([../product/ux-copy.md](../product/ux-copy.md)); internals go to logs.

## Retries, logging, monitoring
Client retry queue ×3 (1s/4s/10s) for non-blocking saves, then error toast. Structured pino JSON → Railway logs: level, code, action, actor kind (no raw ids at info), duration_ms, request_id; never payload bodies, tokens, or answers. `captureException` wrapper sends classified errors to PostHog with request_id linking log ↔ event. Alert thresholds in [deployment.md](deployment.md).

## Related Documents
- [analytics.md](analytics.md) — error_event schema
