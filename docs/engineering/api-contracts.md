---
title: API Contracts (Server Actions)
category: engineering
owner: engineering-lead
status: approved
depends_on: [backend.md, error-handling.md]
last_updated: 2026-07-31
---

# API Contracts

All contracts are Server Actions returning `Result<T>` ([error-handling.md](error-handling.md)). Zod schemas in each feature's `schemas.ts` are the source of truth; this is the human index. Common error codes apply everywhere.

| Action | Input (validated) | Success payload | Notes |
|---|---|---|---|
| createAttempt | sectionSlug, actor ctx, route | attemptId \| guestToken, sanitized questions[], number | blueprint + previous-combination exclusion |
| submitAttempt | attemptId \| guestToken, answers[], idempotencyKey | score, passed, categoriesFailed[], perQuestion review, attemptNumber | server-scored; idempotent replay |
| saveProgress | sectionSlug, steps patch | ProgressSnapshot | registered only; guests write device storage |
| migrateGuestProgress | device payload, anonymousId, idempotencyKey | migrated summary | transactional; clamps; aliases analytics |
| submitConfidence | stage, value 1–5, context | ack | guest values ride the device payload |
| submitFeedback | type, message, route, contentVersion, email? | ack | rate-limited 5/min |
| requestNotify | target, email \| session | ack | guest email path = conversion moment |
| deleteAccount | confirmation literal, idempotencyKey | ack | registered only; transactional hard delete + auth rows + analytics deletion request ([auth.md](auth.md), ADR-022) |
| /api/auth/* | BetterAuth-defined | - | configured in [auth.md](auth.md) |
| GET /api/health | - | status, db ms, version | Railway health check |

**Contract rules:** inputs never include learner_id (actor from session); outputs never include is_correct outside submitAttempt review; retried mutations accept idempotencyKey; changing a contract updates schema + this index in one PR.

## Related Documents
- [assessment-engine.md](assessment-engine.md) · [auth.md](auth.md)
