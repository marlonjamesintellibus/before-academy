---
title: Assessment & Progress Engine
category: engineering
owner: engineering-lead
status: approved
depends_on: [database.md, ../content/assessments.md]
related: [../adr/adr-028-blueprint-metadata.md, ../adr/adr-029-scoring-split.md, ../adr/adr-030-provisional-threshold.md]
last_updated: 2026-07-31
---

# Assessment & Progress Engine

## Question architecture
`questions.kind` separates check (practice) from assessment (graded); shared formats (multiple_choice, multiple_select, matching, sorting, scenario_decision), blueprint `category`, `difficulty`, explanation, `remediation_block_id`. Scenarios are a parallel table with the five fixed categories.

## Attempt lifecycle
1. **createAttempt** - server selects 6–7 questions via blueprint (≥1 per required category, difficulty-balanced, excluding the actor's previous exact combination); persists an attempts row (registered) or returns a signed guest token; returns questions **stripped of is_correct/rationale**.
2. Client renders one question per view; answers accumulate in `useAttempt`, mirrored to sessionStorage.
3. **submitAttempt** - attempt id/token + answers + idempotencyKey; server rescores from the bank (client sends choices, never scores); computes category results vs the configured threshold (80% provisional - config, not code, ADR-030); persists; returns result.
4. Abandon needs no call; registered rows mark abandoned lazily after 24h on next read.

## Scoring
Pure `score(questions, answers)` in `assessment/scoring.ts`: exact match (MC), all-correct-no-extra (MS), full order (sorting), pair-complete (matching), exact match on the chosen option (scenario decision - one keyed decision per scenario, distractors carry rationale only). No partial credit in Phase 1 (flagged for validation). `categories_failed` = categories under 100% in the attempt → drives `?categories=` remediation links. Idempotency: unique key per submission; replays return the stored result.

## Practice split (ADR-029)
Check + activity ship correctness and rationales to the client (instant, offline-tolerant feedback for ungraded items); assessment correctness never leaves the server. Accepted risk: devtools can read practice answers - nothing graded is affected.

## Progress & resume
Registered: `section_progress.steps` jsonb via the single `saveProgress` action; completion = assessment passed → status complete. Guest: identical `ProgressSnapshot` shape at `ba.v1.progress` - UI logic is storage-agnostic. Guest attempts round-trip via signed HMAC token (question_ids + issued_at, 2h TTL; signed with `GUEST_TOKEN_SECRET`, [repository.md](repository.md)) so the server stays guest-stateless while scoring server-side; the scored summary persists at migration. Assessment-first is the same lifecycle with `route='assessment_first'`.

## Related Documents
- [../content/assessments.md](../content/assessments.md) - blueprint, difficulty distribution, retake philosophy
- [../product/screens/assessment.md](../product/screens/assessment.md) - S06–S09 behaviour
