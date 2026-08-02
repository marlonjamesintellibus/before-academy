---
title: Learning Experience Improvement Plan
category: roadmap
owner: product-owner
status: approved
depends_on: [milestones.md]
related: [../adr/README.md, ../content/learning-framework.md]
last_updated: 2026-08-02
---

# Learning Experience Improvement Plan

Synthesis of three reviews (2026-08-02): the four-agent engineering review (correctness, security, spec fidelity, accessibility), the internal product critique, and an external pedagogical review benchmarked against Brilliant and Uxcel. External scores: conceptual accuracy 9/10, explanations 9/10, active learning 6/10, retention 4/10, motivation to return 3/10.

**Diagnosis in one line:** the content teaches, but the learner consumes more than they decide, and the product ends instead of continuing.

**Plan principle:** every change must serve the Phase 1 goal - prove the slice teaches, with pilot evidence - while honoring the standing decisions: competency over consumption (ADR-003), guest-first (ADR-004), learning before gamification (ADR-009), calm failure, buttons not drag (ADR-010). The unlock: most of what the reviews demand is already authored in phase1-content and unshipped (diagnostic A1, remediation modules P1-REM, completion states P1-COM, reflection prompts A5, extended bank A3).

## Phase A - Stabilize (prerequisite, ~1-2 days)

The engineering review's P0/P1. No experience work lands on a foundation that corrupts state.

1. Remediation-link progress wipe (hash navigation skips load, then overwrites store).
2. Assessment start bricking under blocked storage; raw localStorage → device-store.
3. Attempt survives refresh (sessionStorage mirror per assessment-engine.md; unmet M5 criterion).
4. Republish mid-attempt → CONFLICT, not silent 0/6 (bind option ids or version-check).
5. Broken misconception anchor (missing HASH_TO_STAGE entry + missing element id).
6. Security: headers middleware per security.md; IP component in rate-limit key + window sweep; gate /api/auth behind AUTH_ENABLED until M6; bind guest token to anonymousId; zod .max() bounds; lint the assessment bank at publish.

Exit: all four review agents' high findings closed; suites green.

## Phase B - Teach harder (the core, ~3-5 days)

Flip the pattern from explain → interact to **predict → commit → observe → explain**. Target per external review: 6-10 meaningful decisions, 3-4 misconception checks, 2 novel scenarios per lesson unit.

1. **Predict-first diagrams.** Each interactive diagram gains a commitment step before it runs: rules (predict the second-run total before re-running), automation (predict what happens to the odd data before triggering), AI (learner classifies the message and states confidence before the model answers), layer trace (predict which layer decides before tracing). The learner's answer changes the reveal copy - a wrong prediction routes to its misconception explanation. Interactions become consequential, not confirmatory.
2. **Interaction density.** 2-3 inline checks per stage drawn from the authored check-suitable extended-bank items (use tags exist). Prose beats split so a decision lands every 1-2 minutes.
3. **Reason-based second step.** After classification answers (activity + checks): "Which evidence most supports that?" with the authored clue as the keyed option. Tests judgment, not recognition.
4. **Opening diagnostic (ship A1, authored).** 5 predict-first items before the lesson, feedback deferred. Stored on device.
5. **Pre-lesson confidence prompt** (spec'd, missing) to complete the pre/post pair.
6. **Evidence of improvement.** Results screen shows the deltas: diagnostic vs assessment accuracy, pre vs post confidence - "here is how your judgment changed." This is simultaneously the pilot's headline evidence (M9) and the learner's proof of progress.
7. **Misconception-routed remediation.** Ship the authored P1-REM modules; wrong answers route by misconception tag (complexity, autonomy, interface, variability, brand, certainty) to the targeted module + one related fresh scenario. Rebuild S09 as the spec'd filtered review.

## Phase C - Structure for momentum (~2-3 days)

1. **Four completion units.** Promote the lesson stages to separately completable units on the pathway (Rules → Automation → Patterns and confidence → Combined systems and oversight), each 5-7 minutes ending in a decision; Sort the System becomes the section challenge. Real units, not styling. (ADR-042: staged unit model - documents the journey evolution too.)
2. **Skill map.** Persistent category-mastery view on the pathway fed by assessment breakdowns (the Uxcel idea, minus gamification): terminology, system recognition, evidence evaluation, oversight judgment. Frames the professional promise: "evaluate AI claims, identify risk, know where human review belongs."
3. **Completion experience.** Ship P1-COM: capability statements ("You can now spot a combined system"), the observation activity, next-step framing.
4. **Landing proof.** One live classification scenario embedded on the home page; outcome-focused promise copy.
5. Overall progress indicator across units + challenge + assessment.

## Phase D - Return loop (~2-3 days, device-only honest version)

Within guest-first limits (no email without M6):

1. **Spaced retrieval sessions.** "2-minute review" offered next-day and next-week (device-timestamp gated), drawing unseen items from the extended bank (A3 - seed it). Mixed categories, retrieval not rereading.
2. **Rusty states.** Pathway skill map decays visually with time-since-retrieval ("worth a refresh" wording, never streak-shaming).
3. **Delayed evidence.** Day-7 review accuracy captured - the durable-retention datum the pilot currently cannot produce.
4. Honest note: the full return loop (reminders, cross-device) requires M6 accounts + notify; this phase builds the in-product half and the pilot measures whether it is used.

## Phase E - Transfer (capstone, ~1-2 days + a decision)

1. **"Audit an AI claim" workplace task.** Post-assessment optional capstone: pick a product you use; identify the feature, inputs/outputs, mechanism, what is automated, missing evidence, where a human should review. Structured prompts, device-saved, self-assessed against a model answer (no free-text leaves the device - privacy stance intact). Uses the authored reflection-prompt pool (A5).
2. **Decisions for the product owner:** certificates (revisit ADR-039 - retention and distribution lever), and Section 2 commissioning (no loop fixes "nothing else to do").

## Sequencing against the roadmap

- Phase A now; it is release-gating.
- Phases B-C before pilot: they change what the pilot measures (decision density, pre/post deltas) - piloting the current version would measure the weaker product.
- M8 (a11y/polish) runs after C, absorbing the review's focus-management/live-region/reduced-motion findings; the manual-audit half is effectively pre-done.
- Phase D lands before pilot start so day-2/day-7 return is measurable during the pilot window.
- Phase E optional for pilot; the capstone doubles as a qualitative evidence source.
- M9 pilot proceeds with the enriched metric set; M6 (auth) stays post-pilot, now additionally informed by whether guests hit the return-loop ceiling.

## New metrics (taxonomy rows to add with their features)

diagnostic_item_answered, prediction_committed (diagram, correct), evidence_selected (correct), review_session_started/completed (day_offset), capstone_started/completed, skill_map_viewed. Existing pre/post confidence and category breakdowns become learner-visible, not just analytics.

## What we deliberately do not do

Streaks/XP/leagues (ADR-009 stands; momentum comes from units, skill map, and rusty states), drag-and-drop (ADR-010 stands), paywalls, and more prose - the reviews agree the content is already the strength.

## Related Documents
- [milestones.md](milestones.md) - the delivery frame this plan slots into
- [../content/learning-framework.md](../content/learning-framework.md) - the pedagogy this operationalizes
