# Assessment blueprint

```yaml
content_id: P1-FND-006
content_type: assessment-blueprint
title: Assessment blueprint — AI, Automation and Traditional Software
phase: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §6.2 (knowledge check), §7 (assessment specification); delivery Eng §9; learner-facing behaviour UX §S05–S08
```

## Purpose and philosophy

Assessments measure whether a learner can **use** the distinction, not whether they memorized wording. Every question presents a decision a real person could face. Recall-only questions ("Which of these is the definition of...") are capped at two per bank. Passing must be achievable from Quick layers alone — the standalone test (CS §3.2, verified in Appendix B mapping). Failure output is diagnostic by design: every question's category tag converts a failed attempt into a targeted study plan.

## Instrument structure

| Instrument | Role | Size | Grading |
|---|---|---|---|
| **Assessment** (P1-ASM-001) | The only completion condition, on any route | 6–7 questions drawn per attempt from the core bank (10–13 items) | Graded; 80% provisional threshold |
| **Knowledge check** (P1-KC-001) | In-lesson practice, "practice, not graded" framing | 4 questions: one definition (LO1–LO3), one automation-vs-AI comparison (LO4/LO5), one real-world classification (LO7), one misconception rejection (LO8 or LO10) | Never graded; wrong answers surface the category's remediation chip |
| **Opening diagnostic** (P1-DIAG-001, addition A1 — approval pending) | Ungraded pre-lesson probe; pre/post comparison | 5 items tagged `kind=diagnostic` | Never graded, never gating; feedback deferred until after the lesson so answers aren't taught in advance |

Knowledge-check and diagnostic items live in the same bank as assessment items but are tagged by kind and never appear in graded attempts (CS §6.2, Eng §9.1).

## Category blueprint (per CS §7.2)

| Category | Measures | Core bank (10–13 total) | Per attempt (6–7) |
|---|---|---|---|
| Traditional software | Rules + predictable outputs (LO1, LO6) | 1–2 | ≥1 of these two |
| Automation | Process vs intelligence (LO2, LO4, LO5) | 1–2 | ≥1 of these two |
| AI characteristics | Pattern/probabilistic behaviour (LO3, LO6, LO10) | 2 | 1 |
| Combined systems | Multiple technologies in one product (LO4, LO5, LO7) | 2 | 1 |
| Classification | Applied real-world sorting (LO7) | 2 | 1 |
| Ambiguity | Insufficient-information recognition (LO9) | 1 | 1 |
| Misconceptions | Rejecting inaccurate claims (LO8, LO10) | 1–2 | 1 |

Every attempt covers at least five distinct categories.

## Question types

Multiple choice · multiple select · matching · sorting · scenario decision (per Phase 1 §17). "All of the above" options are banned (rotation integrity). The brief's additional formats (true/false with explanation, best-explanation selection, short applied reasoning) are permitted only where they reduce to these five delivery types; best-explanation selection implements as multiple choice.

## Difficulty distribution (per CS §7.3)

| Level | Definition | Bank share |
|---|---|---|
| Foundational | Answerable directly from a Quick layer; single concept | ~40% |
| Applied | Requires transferring a concept to an unseen scenario | ~45% |
| Challenging | Requires combining concepts or spotting insufficient evidence | ~15% |

## Passing threshold

80%, explicitly provisional. Review uses question-level analytics after pilot, not intuition.

## Retake strategy

Unlimited retakes. Each retake draws a different question combination, rotates answer order, and preserves category coverage (Eng §9.2). Retake messaging is never punitive: fresh questions and readiness framing; no streaks, timers, or attempt counts in learner copy (CS §9.4).

## Randomization strategy

- Per-attempt draw satisfies the category minimums above; order shuffled within the fixed constraint set.
- Answer-option order rotates between attempts; items with logically ordered options (e.g., sorted sequences) are marked `randomization: fixed-order`.
- Scenario variation: classification and combined-system questions each maintain two industry variants (e.g., banking and retail) so retakes change surface context without changing the measured skill.
- The chatbot minimal pair (activity scenarios 6/7) keeps fixed order 6 → 7 wherever both appear; the contrast is the lesson.

## Diagnostic strategy

Pre-lesson: the hook's one-tap classification tease plus (pending A1) the 5-item ungraded diagnostic. Post: assessment category results. The pre/post pair gives learner-testing a view of belief change; the post-assessment confidence prompt (CS §5.6) captures calibration.

## Learning-outcome coverage

Every LO is assessed via its category (see `learning-outcomes.md`, assessment-methods table). Coverage is enforced by the Learning Objective Matrix pattern (CS Appendix B): every question maps to ≥1 LO and exactly one blueprint category; the Phase 4 `assessment-mapping.md` file is the enforcement artifact and must show no LO with zero graded coverage.

## Misconception coverage

Each of M1–M14 must be tested by at least one bank item (core or extended) via distractors or misconception-rejection stems, and each must have a resolving remediation link. M1, M2, M3, M5, and M9 (highest-frequency in beginner populations) must be testable within a single attempt draw. M5 coverage note: no core item carries M5; it enters draws via extended items QB-019 and QB-038 (the QB-009 ambiguity swap) in graded rotation — this depends on A3 approval (granted 2026-08-02, see `canonical-reconciliation.md`) and means a learner's first attempt tests M5 only when the rotation selects it; flag for pilot review whether M5 warrants a core item.

## Remediation mapping (per CS §7.4)

| Category | Remediation destination |
|---|---|
| Traditional software | Traditional software concept block |
| Automation | Automation + combined-systems blocks |
| AI characteristics | AI block (probabilistic passage) |
| Combined systems | Combined block + diagram |
| Classification | Activity summary + relevant concept block |
| Ambiguity | Scenario-10 explanation + LO9 passage |
| Misconceptions | Misconception callout + register corrective |

Every question's `remediation_block_id` must resolve — content-lint rule (Eng §14).

## Rules for avoiding trick questions

- The correct answer must be derivable from taught content and the evidence in the stem; never from outside knowledge, brand familiarity, or wording traps.
- Distractors represent genuine misconceptions (tagged by M-ID), never near-synonyms of the key or grammar games.
- No negatively worded stems ("Which is NOT...") unless the skill being measured is rejection itself (misconception-rejection items), and then the negation is visually emphasized.
- No two options that are both defensibly correct unless the item is multiple select and both are keyed.
- Reading burden stays within Grade 8–10; a question is testing classification, not reading stamina.
- Answer-position patterns audited in Phase 6 (`assessment-audit.md`).

## Rules for "Not enough information" scenarios

- "Not enough information" appears as an option only where it is sometimes the keyed answer across the bank — it must never be a throwaway distractor that is always wrong.
- When keyed, the stem must genuinely describe interface or marketing language without mechanism evidence, and the feedback must name what would settle the classification.
- When not keyed, the stem must contain a decisive clue, and feedback for learners who chose it names that clue ("Not enough information" overuse is a monitored analytics signal, CS §6.3).
- Genuinely debatable items say so in feedback and name what would settle it (honest-ambiguity principle, CS §9.1).

## Extended bank (addition A3 — approval pending)

Target 30 items beyond the core bank, following this same blueprint, difficulty model, and review lifecycle, distributed across: definitions (capped), basic recognition, comparison, everyday classification, workplace classification, combined systems, marketing claims, rules-vs-patterns, AI limitations, applied reasoning, not-enough-information, misconception correction, and vendor-evaluation questions. Tags: `check`, `diagnostic`, `remediation` (mini-confirms), `retake-rotation`. No near-duplicate wordings; industry variants are the approved way to multiply an item.

## Validation assumptions

1. 80% threshold; 6–7 per attempt; 10–13 core bank; 4-question knowledge check.
2. Difficulty split ~40/45/15.
3. Diagnostic size (5 items) and its deferred-feedback design (A1).
4. Extended-bank size of 30 (A3).
5. Analytics review thresholds: items with first-attempt accuracy <40% or >95% reviewed for ambiguity or triviality; the 6/7 pair monitored for order effects; "Not enough information" overuse triggers instruction-wording review (CS §6.3 — content QA rules, not engineering rules).
