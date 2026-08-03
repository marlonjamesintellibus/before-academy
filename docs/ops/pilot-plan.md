---
title: Pilot Plan
category: ops
owner: education-lead
status: approved
related: [m9-checklist.md, ../product/personas-and-journeys.md, ../engineering/analytics.md]
last_updated: 2026-08-03
---

# Pilot Plan

The validation step M9 exists for: genuine beginners using the real product on their own devices, with the pre/post instruments the app already carries. The goal is a decision package, not a demo.

## Cohort

- 8 to 15 adults who match the primary persona: professionally capable, no technical background, self-described unsure about what AI is.
- Recruit from outside the build team; anyone who reviewed screens or content is excluded.
- No accounts exist (M6 deferred), so each participant must complete on **one device and one browser**; say this plainly in the invitation.

## Protocol

**Day 1 (about 30 minutes, unfacilitated):** participants receive the production URL and a two-line brief: "Work through the AI awareness section at your own pace. Answer honestly; the point is to measure the product, not you." No walkthrough, no hints - the product must carry them.

**Day 2 or 3 (5 minutes):** a reminder nudge to reopen the app on the same device. The return loop (two-minute review) is the measure; whether they come back at all is data.

**Debrief (15 minutes, per participant or small group):** four questions -
1. Explain, in your own words, the difference between AI and automation. (Scored against the lesson's distinction; this is the transfer check.)
2. Where did you feel lost or bored? Point at the screen.
3. Did anything feel like it was testing you unfairly?
4. Would you send this to a colleague? Who?

## Measures (all already instrumented)

| Question | Instrument |
|---|---|
| Did judgment improve? | Diagnostic probe (pre) vs assessment category results (post); judgment-change panel data |
| Did confidence move honestly? | `confidence_submitted` pre/post delta; watch for confidence up while score flat (miscalibration) |
| Do they finish? | Funnels F1-F3: landing to lesson, lesson to assessment, fail to remediation to retake |
| Does anything stick? | `review_session_started/completed` with `day_offset`; day 2+ correct rate |
| Where do they struggle? | Per-question miss rates and misconception categories from attempts |
| Does it break? | `error_event` rate; health uptime |

## Revision cycle

One cycle is budgeted. Rank findings by severity (blocks learning > confuses > annoys), fix the top band, redeploy with a new tag, and note in the completion report which findings were deferred and why.

## Decision package (pilot output)

One document for leadership: cohort size and completion rate, judgment and confidence deltas, retention signal, the three most damaging qualitative findings and what the revision changed, plus the recommendation: proceed to M6 and Section 2 content, pivot, or stop.

## Related Documents
- [m9-checklist.md](m9-checklist.md) - where the pilot evidence lands
- [../engineering/analytics.md](../engineering/analytics.md) - funnel and event definitions
