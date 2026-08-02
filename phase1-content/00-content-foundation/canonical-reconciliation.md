# Canonical reconciliation record

```yaml
content_id: P1-FND-001
content_type: internal-change-record
title: Canonical reconciliation record
phase: 1
section: content-foundation
content_status: draft-for-validation
```

This file documents every point where the learner-content generation brief and the approved Content Specification v1.0 (CS) disagreed, and how each conflict was resolved. Per the continuation rules, the most recently approved canonical source wins; no conflict was resolved silently. Items marked **approval required** need an explicit decision from the education lead (Marlon) before Phase 2 relies on them.

## Resolved conflicts (canon wins)

| # | Generation brief | Content Specification | Resolution |
|---|---|---|---|
| R1 | 15 required learning outcomes | LO1–LO10 canonical (CS §5.1) | LO1–LO10 kept unchanged. The brief's 15 outcomes are mapped as supporting objectives under the LOs in `learning-outcomes.md`. No new LO numbers created. |
| R2 | Own misconception list (12 items, unnumbered) | Register M1–M6 canonical (CS §8.1); M-numbers may continue (CS §14) | M1–M6 kept verbatim. Eight new entries M7–M14 added to cover the brief's items not already in the register. Mapping table in `misconception-map.md`. |
| R3 | "Knowledge check" = the scored assessment, 8–12 questions | Knowledge check = 4 practice questions (CS §6.2); **assessment** = graded, bank 8–12, 5–7 drawn per attempt (CS §7.2); "test/exam/quiz" banned (CS §11) | Spec terminology adopted throughout the package. The brief's Phase 4 "knowledge check" deliverable is renamed the **assessment**; the 4-question practice knowledge check is specified separately. |
| R4 | Classification categories: Traditional software / Automation / **Artificial intelligence** / A combination of approaches / Not enough information | Category labels: Traditional software / Automation / **AI-assisted** / Combination / Not enough information (CS §5.1 LO7, §6.1) | Spec labels are the fixed learner-facing set. "Artificial intelligence" remains the concept name; "AI-assisted" is the classification label. |
| R5 | "Hybrid systems" as the learner-facing term | Concept block is "Combined systems" (CS §5.2); glossary term "AI-assisted system" (CS §10.2) | Learner-facing term is **combined system**. "Hybrid system" is recorded as an internal synonym/alias only (see `terminology-guide.md`). |
| R6 | 12–18 activity scenarios, count flagged for validation | Sort the System = 10 canonical, technically reviewed scenarios (CS §6.1) | The 10 canonical scenarios ship. The 12–18 range is superseded; scenario count remains monitored via CS §6.3 analytics thresholds. |
| R7 | 80% threshold "a current Phase 1 assumption" | Same: 80%, explicitly provisional, reviewed via question-level analytics after pilot (CS §7.4) | No conflict in substance; CS wording and review mechanism adopted. |
| R8 | Voice/tone rules defined in the brief | CS §11–12 + Appendix D define voice, banned words, inclusive language, anthropomorphism ban | Merged: CS rules are binding; brief rules that add restrictions without contradicting CS (e.g., no "easy/obvious") are kept — CS Appendix D already bans "simply/just/easy". |
| R9 | Diagram set open ("at least two") | One canonical diagram fully specified: "How Rules, Automation and AI Work Together" (CS §5.5) | P1-DGM-001 is the canonical diagram, spec unchanged. A second diagram is proposed as an addition — see A2 below. |
| R10 | — (defect found in review, 2026-08-02) | CS §7.2 states bank 8–12, 5–7 drawn per attempt | The blueprint's own category table makes those ranges unsatisfiable: bank minimums sum to 10 (max 13) and per-attempt minimums sum to 6 (max 7). The table and the shipped 10-item core bank are treated as authoritative; canonical sizing is now **bank 10–13, 6–7 per attempt, ≥6 categories**. Headers corrected in `assessment-blueprint.md`, `section-metadata.md`, `learner-journey.md`, `content-id-registry.md`, `03-assessment/assessment.md`, and the docs tree (assessments.md, ADR-030, vision-and-scope, ux-copy, screens/assessment, assessment-engine). R3/A3 above retain the historical CS wording. Flagged for the next CS revision. |

## Additions requiring education-lead approval

CS §5 states additions to the Phase 1 lesson require the education lead's approval. The generation brief requires the following items that the CS does not specify. Recommended decisions are provided so later phases are not blocked; each carries a validation note until approved.

| # | Addition | Recommendation | Status |
|---|---|---|---|
| A1 | **Opening diagnostic** (brief: 5–8 ungraded scenarios before the lesson) | Implement as an ungraded, skippable pre-lesson probe of 5 items reusing bank items tagged `kind=diagnostic`, positioned after the CS hook, feeding pre/post comparison analytics. It must not teach the answers (feedback deferred until after the lesson) and must not gate progression. | **Approval required** |
| A2 | **Second diagram** — "How traditional software, automation and AI differ" (side-by-side comparison) | Approve as P1-DGM-002 with a single teaching claim ("the three approaches differ in how decisions are made, not in how impressive they look"), meeting all CS §12.4 standards. Supports LO1–LO6 and the compare block. | **Approval required** |
| A3 | **Extended question bank** (brief: 30+ additional bank questions; CS bank is 8–12) | Keep the graded assessment drawing 5–7 per attempt from the 8–12 core bank per blueprint. Add an extended bank (target 30 items) tagged by use (`check`, `diagnostic`, `remediation`, `retake-rotation`) to support unlimited retakes with fresh combinations (CS §7.4) and the diagnostic (A1). Extended items follow the same blueprint, difficulty model, and review lifecycle. | **Approved 2026-08-02** (education-lead direction during project review; also closes the M5 draw-coverage gap via QB-019/QB-038 — see blueprint misconception note. Sizing figures in this row are historical; see R10) |
| A4 | **Guest/registered messaging, progress states, and full interface copy set** (brief Phases 5–6) | Draft in this package for completeness, clearly labelled as *proposed strings*; UX §7 remains canonical. Before implementation, strings are reconciled into the UX spec's strings file (Eng §8.6) and the UX spec version is bumped — a string that exists in both places with different wording is a defect. | **Approval required** |
| A5 | **Reflection prompt set** (brief: 7 prompts placed through the section) | CS §5.6 specifies one optional written reflection plus two confidence prompts. Recommendation: keep the CS set as required; the brief's additional prompts become an optional pool (max one surfaced per block) pending cognitive-load review. | **Approval required** |

## Known canon-internal note

CS §1.2 references "false certainty (misconception M5)" while §8.1 defines M5 as "you can tell from the interface whether it's AI." The register (§8.1) is treated as authoritative; false certainty about AI outputs is covered by M4 and the new M7. Flagged for correction in the next CS revision.

## Change log

| Date | Change | Files affected |
|---|---|---|
| 2026-08-01 | Initial reconciliation at Content Foundation generation | all foundation files |
| 2026-08-02 | R10 assessment-sizing correction (bank 10–13, attempt 6–7, ≥6 categories); learner pass copy drops the "(80%)" parenthetical (5/6 = 83.3%) | assessment-blueprint.md, section-metadata.md, learner-journey.md, content-id-registry.md, 03-assessment/assessment.md, docs tree |
