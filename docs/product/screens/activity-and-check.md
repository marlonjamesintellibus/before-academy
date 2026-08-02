---
title: "Screens: Sort the System & Knowledge Check (S04–S05)"
category: product
owner: product-designer
status: approved
depends_on: [../../content/lessons/ai-automation-software.md]
related: [../../content/feedback.md]
last_updated: 2026-07-31
---

# S04 Sort the System · S05 Knowledge Check

## S04 activity (`…/activity`)
One scenario card at a time (Duolingo single-focus). Card: scenario text + five answer **buttons** (radiogroup; stacked mobile, two columns desktop): Traditional software · Automation · AI-assisted · Combination · Not enough information. Progress dots ("3 of 10"). Two-step interaction: select → **Check** (allows revision) → feedback panel slides in below (focus moves to it; `aria-live="polite"`): status (icon + text, never colour alone), explanation, the clue, honest ambiguity where present, and on wrong answers a **Review this concept** link to the exact lesson block (back returns to the same scenario). **Continue** advances. No timer; speed never scored. Buttons only - no drag-and-drop (ADR-010).
States: in progress · feedback correct/incorrect · summary (per-category tallies, followed by the optional ungraded reflection prompt per the lesson spec - skippable, never blocks Continue) · resumed mid-activity (survives refresh).
Events: `activity_started`, `scenario_answered(scenario_id, chosen, correct, attempt)`, `feedback_review_link_clicked`, `activity_completed(score, per-category)`.
Scenario content (10 items incl. the 6/7 chatbot minimal pair, fixed order): [content/lessons](../../content/lessons/ai-automation-software.md).

## S05 knowledge check (`…/check`)
Same single-question pattern. Header label: **"Knowledge check - practice, not graded."** 4 questions (multiple choice / multiple select only). Immediate feedback per the formula; weak concept → inline remediation chip ("Shaky on probabilistic outputs? 90-second review") linking into S03 with the block expanded. Check questions are `kind=check` and never appear in graded attempts.
Events: `check_started`, `check_question_answered`, `check_completed`, `remediation_chip_clicked`.

## Related Documents
- [../../content/feedback.md](../../content/feedback.md) - feedback formula the panels render
- [../../engineering/assessment-engine.md](../../engineering/assessment-engine.md) - practice vs graded scoring split (ADR-029)
