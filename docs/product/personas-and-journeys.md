---
title: Personas & User Journeys
category: product
owner: product-designer
status: approved
related: [screens/README.md, ../content/learning-framework.md]
last_updated: 2026-07-31
---

# Personas & Journeys

Phase 1 designs for two personas + one variant. Admin/enterprise personas are deferred (ADR-035); content ops runs outside the product UI (ADR-027).

## P1 - Curious Guest (primary)
AI beginner; used ChatGPT casually; can't reliably distinguish AI from automation; jargon-wary; abandons at registration walls; mostly mobile. Assume the full accessibility range within P1. Success: completes the section as a guest and can explain the three concepts.

## P1b - Confident Skipper
Believes they know the material → assessment-first route. UI offers "Already know this? Take the assessment" without pushing it. Failure must feel like efficient targeting.

## P2 - Registered Learner
Converted P1; wants permanent progress, cross-device resume, visible status, a clear next step. Success: guest progress migrates on sign-up; dashboard shows completion + next step.

## J1 - First-time guest, standard route
Land (S01 or shared link to S03) → hook question → Quick Explanation (+ optional layers) → diagram → Sort the System → knowledge check → assessment intro → attempt → results. Pass: confidence question, next-step preview, primary conversion moment ("Save this progress"). Recovery: content cached after first load; submissions queue + retry; same-device return shows resume banner; private browsing shows storage notice but everything works.

## J2 - Assessment-first
Direct to S06 (identical rules, no penalty framing) → pass = complete (+ optional Go Deeper suggestion) | fail = category breakdown → S09 filtered review → retake with different combination. Unlimited retakes, no cooldown; attempts tracked for analytics.

## J3 - Guest → registered conversion
Trigger moments (tested): post-activity, post-pass (primary), "Save progress", locked-preview tap. Dismissible modal, one prompt per milestone, two per session hard cap, equal-weight "Continue as guest". Sign-up = 2 fields max or one OAuth. Success → transactional migration → "Progress saved to your account" toast → return to prior route. Abandon → return intact.

## J4 - Returning
Same-device guest: resume banner restores route + scroll. New-device guest: no progress; no blame; explains accounts prevent this. Registered: "Continue where you left off" on Home; Dashboard is the hub.

## Related Documents
- [screens/assessment.md](screens/assessment.md) · [screens/auth-and-dashboard.md](screens/auth-and-dashboard.md)
- [../engineering/auth.md](../engineering/auth.md) - migration mechanics
