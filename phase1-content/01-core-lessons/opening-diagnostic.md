# Opening diagnostic

```yaml
content_id: P1-DIAG-001
content_type: diagnostic
title: Opening diagnostic — What's your read right now?
phase: 2
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO7, LO8, LO9 — probed, not taught]
estimated_time: 2 minutes
required_or_optional: optional (skippable; never graded; never gating)
prerequisites: none
concept_tags: [diagnostic, pre-post-comparison]
misconception_tags: [M1, M2, M8, M9]
assessment_links: []
remediation_links: []
accessibility_requirements: standard selection controls; no drag; no time limit; skip is a first-class labelled action
content_status: draft-for-validation (addition A1)
```

Design rule (per reconciliation A1): the diagnostic never affects any score, is skippable, and **defers correctness feedback until after the lesson** so it can't teach the answers in advance. Each item gets a neutral acknowledgment now and a full reveal later.

## Introductory copy (learner-facing)

**Before we start — what's your read right now?**

Five quick situations. Pick whatever seems right; guessing is welcome, and nothing here counts toward anything. At the end of the section we'll show you how your answers compare — most people are surprised by at least one.

## Instructions

For each situation, pick the option that matches your current read. There are no trick items, and you can skip this entirely.

*(Controls: five items, one selection each · Skip this — labelled button, always visible)*

## Diagnostic items

Every item uses the same three options: **AI is involved** · **No AI involved** · **Can't tell from this**

### P1-DIAG-001-S01
**Scenario:** A spreadsheet formula adds up your monthly expenses.
**Accepted answer (recorded, not revealed):** No AI involved.
**What it probes:** whether calculation reads as intelligence (M1 baseline).

### P1-DIAG-001-S02
**Scenario:** Your email app moves a message into the spam folder.
**Accepted answer:** Can't tell from this.
**What it probes:** whether learners assume a mechanism from an outcome — the move could be a learned filter or a written "block this sender" rule (M9/LO9 baseline).

### P1-DIAG-001-S03
**Scenario:** A thermostat turns the heat on whenever the temperature drops below 20°C.
**Accepted answer:** No AI involved.
**What it probes:** whether a trigger-and-action system reads as AI (M2 baseline).

### P1-DIAG-001-S04
**Scenario:** A music app builds you a weekly playlist labelled "made for you."
**Accepted answer:** Can't tell from this.
**What it probes:** whether personalization language is taken as proof of AI (M8 baseline). Learned ranking is common here, but the description only reports the label.

### P1-DIAG-001-S05
**Scenario:** An ad says a toothbrush is "AI-powered." Does that tell you how it works?
**Options for this item:** Yes, that tells me how it works · No, that's a label, not an explanation · Not sure
**Accepted answer:** No, that's a label, not an explanation.
**What it probes:** trust in marketing language as mechanism evidence (M9 baseline).

## Per-item acknowledgment (shown immediately, all items)

Noted. We'll come back to this one at the end of the section.

*(No correctness indicator, no colour state tied to rightness. Screen-reader announcement: "Answer recorded. Feedback comes after the lesson.")*

## Post-lesson reveal (shown in the activity summary / completion area)

**Remember your first-read answers? Here's how they landed.**

- **The spreadsheet formula** — no AI. Arithmetic is written rules; the same numbers produce the same total every time.
- **The spam move** — can't tell from that description alone. It could be a learned filter or a written "block this sender" rule. You've now got the habit of asking which.
- **The thermostat** — automation with no AI. A trigger (below 20°C) fires an action (heat on). Nothing is learned; nothing varies.
- **The "made for you" playlist** — the label alone doesn't say. Learned ranking is common in music apps, but "made for you" describes the promise, not the mechanism.
- **The AI-powered toothbrush** — the ad tells you what the marketing team chose, not how the product works. That's exactly the evidence habit this section is about.

If your read changed on any of these, that's the section working.

## Data to record

Per item: item ID, selected option, timestamp, skipped flag. Session-level: diagnostic_completed or diagnostic_skipped, route. Used for pre/post comparison and learner-testing readouts only; never surfaced as a score.

## Accessibility alternative

Items are standard radio-button groups reachable by keyboard in reading order; no dragging, hovering, or colour-coded meaning anywhere. The skip control is a labelled button, not a link buried in text. No time limits. The acknowledgment is announced by screen readers on selection.

## Completion transition (learner-facing)

That's the last one. Now let's build the distinctions — starting with the software you already know.

*(CTA: Continue to the lesson)*

---

> INTERNAL VALIDATION NOTE:
> Five items and the deferred-reveal design are A1 assumptions. Validate in pilot: completion rate, skip rate, and whether the end-of-section reveal is actually viewed. If reveal viewership is low, move the reveal to the activity summary screen.
