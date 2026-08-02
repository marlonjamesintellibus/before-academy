---
title: "Screens: Assessment Flow (S06–S09)"
category: product
owner: product-designer
status: approved
depends_on: [../../content/assessments.md]
related: [../../engineering/assessment-engine.md]
last_updated: 2026-07-31
---

# S06 Intro · S07 Attempt · S08 Results · S09 Remediation

## S06 intro (`…/assessment`)
Centered panel setting fair expectations: 6–7 questions · pass at 80% (provisional) · retake any time with different questions · failing produces a study plan. Primary **Start assessment**, secondary **Review the lesson first**. Assessment-first arrivals get: "You can take this without reading the lesson." Events: `assessment_intro_viewed(route)`, `assessment_started(attempt_number, route)`.

## S07 attempt
Minimal chrome: wordmark + **Exit assessment** + attempt progress bar. One question per view; formats: multiple choice, multiple select, matching, sorting, scenario decision (sorting/matching are button-based). Answer order rotates. No per-question feedback during the attempt (provisional - feedback at results). Back allowed until submit; final question shows **Submit assessment**. Exit opens S13c confirm; refresh restores the attempt. Focus moves to the question heading on advance; progress announced ("Question 3 of 6").
Events: `assessment_question_answered(question_id, category, difficulty, chosen, time_to_answer)`, `assessment_abandoned(question_index)`, `assessment_submitted`.

## S08 results (`…/assessment/results`)
**Pass:** score, completion confirmation, category strengths, one-tap confidence question (1–5, labelled endpoints), next-step CTA, primary conversion moment for guests. Celebration = brief reduced-motion-safe check - no confetti storms.
**Fail:** headline **"Not this time - here's what to review"** (never "You failed"). Score + pass rule, category breakdown (strong / needs review) with per-category **Review** links into S09, prominent **Retake with new questions**. Per-question review with explanations below the fold.
Events: `assessment_result_viewed(passed, score, categories_failed)`, `confidence_submitted`, `retake_clicked`, `review_category_clicked`.

## S09 remediation (`…/review?categories=`)
Filtered lesson view: only blocks matching failed categories. Persistent header "Reviewing: {categories}", pinned bottom **Retake assessment** bar. Each block ends with an optional one-question mini-confirm. States: one category / several (worst first) / no categories (full lesson + note).
Events: `remediation_viewed(categories)`, `remediation_block_completed`, `remediation_retake_clicked`.

## Related Documents
- [../../content/assessments.md](../../content/assessments.md) - blueprint, difficulty, retake rules
- [../../content/misconceptions.md](../../content/misconceptions.md) - remediation principles
