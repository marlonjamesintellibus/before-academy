# Automation

```yaml
content_id: P1-LESSON-003
content_type: lesson-concept
title: Automation
phase: 2
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO2, LO4, LO5]
estimated_time: 3 minutes core; +4 with optional layers
required_or_optional: Quick layer required surface; Explore/Deeper optional
prerequisites: P1-LESSON-002
concept_tags: [automation, trigger, workflow]
misconception_tags: [M2]
assessment_links: [P1-ASM-001 automation category, P1-KC-001]
remediation_links: [P1-REM-002]
accessibility_requirements: layers as labelled disclosures with reading time; feedback announced; CS §12
content_status: draft-for-validation
```

Glossary chips in this lesson: automation · trigger · workflow.

---

## Quick Explanation *(always visible)*

Automation means using technology to run or connect repeatable tasks with less manual effort. Something happens — a form gets submitted, a date arrives — and the next steps run on their own.

Picture a row of dominoes. One event tips the first piece, and the whole chain follows without anyone pushing each one. That's what happens when you buy something online and a receipt lands in your inbox seconds later. Nobody typed that email. A trigger fired, an action ran.

Notice what automation describes: how the work flows. It says nothing about how smart any step is — and that gap is where most AI confusion lives.

## Explore Further *(optional · about 1 minute)*

An automated process has three parts. A **trigger** — the event that starts things (a submission, a schedule, a threshold crossed). A **condition** — an optional check along the way (only if the amount is over $500). And **actions** — the steps that run. Chain a few together and you have a **workflow**.

You're surrounded by these. A recurring report that generates itself every Monday. A support ticket that routes to the right team based on which category the customer picked. An alert that fires when server storage passes 90%. Payroll running on the 25th of every month.

Automation feels intelligent because things happen without you. But look at those dominoes again: they don't decide anything. The setup was decided in advance — the chain reacts, it doesn't judge. Here's the sentence to keep: automation is not the same thing as AI, and automation may contain AI. Those two facts sit together comfortably.

## Go Deeper *(optional · about 2 minutes)*

So when does automation involve AI? When one of the steps in the chain makes a pattern-based judgment rather than following a written rule.

Compare two versions of the same workflow. Version one: applications route to a reviewer based on which checkbox the applicant ticked. Trigger, rule, action — pure automation, no AI anywhere. Version two: applications route based on a system that reads the free-text description and predicts which team fits best. Same trigger, same action at the end — but the middle step now involves a learned judgment. The dominoes are still dominoes; a person or an AI can set them up, and one of the pieces can itself be an AI step.

That's why "is it automated?" and "does it use AI?" are two separate questions, and why answering the first tells you nothing about the second. To recognize automation in the wild, listen for repetition and triggers: "every month", "whenever a form comes in", "as soon as payment clears". Then ask the second question separately: is any step in that chain making a learned judgment — and does the description actually say?

## Apply It — micro-check

**Payroll runs on the 25th of every month, calculating salaries from timesheets and sending payments. What's the best label?**

- A) Automation *(correct)*
- B) AI-assisted
- C) Not enough information to tell

**Feedback — A (correct):** Correct. The clue is "the 25th of every month" — a scheduled, repeated process is automation. The calculations underneath are written rules; nothing in the description involves a learned judgment.

**Feedback — B:** Not quite — here's the clue: "runs on the 25th of every month." A schedule firing a fixed process is a trigger and a chain, and salary math is written rules. Nothing here is learned from patterns. Review: Automation.

**Feedback — C:** Not quite — the description gives you the mechanism: a schedule, timesheets, salary calculation. That's a trigger running written rules, which is automation. Save "Not enough information" for descriptions that hide how the system works. Review: Automation.

## Reflection prompt

P1-REF-003 may surface here: "Think of one process in your life that runs without you — a bill, a backup, a reminder. What's the trigger?"

## Transition to the next lesson

Rules, and now chains of rules. Time for the third piece — the one everything else gets compared to.

---

## Accessibility descriptions

- Layer disclosures and micro-check behaviour as in P1-LESSON-002.
- The dominoes example is textual. If illustrated later, alt text: "A row of dominoes mid-fall: one trigger, then the chain runs on its own." (≤125 characters.)
- The two-version routing comparison is written as sequential prose, not a side-by-side visual, so reading order is linear for screen readers.

---

## Presentation reuse (internal — not learner-facing)

- **Slide title:** Automation: how work flows
- **One-sentence takeaway:** Automation runs repeatable tasks with less manual effort — it describes how work flows, not how smart any step is.
- **Supporting points:** trigger → condition → action → workflow · everyday cases: receipts, ticket routing, payroll, threshold alerts · automation ≠ AI, and automation may contain AI · the two routing versions: checkbox rule vs learned prediction
- **Suggested visual:** row of dominoes; one piece highlighted with a label "this step can be a rule — or an AI"
- **Speaker note:** Poll the room: "Who thinks their auto-generated receipt email involves AI?" Use the dominoes to separate the flow from the judgment, then plant the two-questions habit.

> INTERNAL VALIDATION NOTE:
> Quick 108 words, Explore 174, Deeper 231 — within CS §3.2 budgets. The application-routing pair (rule vs learned) is the held-back example for M2 remediation; Phase 5 must lead with a different fresh example (email sorting pair) to preserve the reteach-differently rule.
