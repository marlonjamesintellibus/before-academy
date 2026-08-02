---
title: "ADR-042: Staged lesson units with predict-first interactions replace the single-scroll lesson"
category: adr
status: Accepted
date: 2026-08-02
decision_category: Product
related: [adr-003-competency-progression.md, adr-011-step-per-url.md, adr-009-learning-before-gamification.md]
last_updated: 2026-08-02
---

# ADR-042 - Staged lesson units with predict-first interactions replace the single-scroll lesson

**Status:** Accepted · **Date:** 2026-08-02 · **Category:** Product

## Context
Three converging reviews (engineering, internal product, external pedagogical benchmarked against Brilliant/Uxcel) found the single-scroll lesson taught well but passively: learners consumed explanations rather than making decisions, and the 20-minute block undercut completion momentum. The external review scored active learning 6/10 and motivation to return 3/10 against 9/10 content.

## Decision
The lesson renders as five focused stages (Start Here + four concept units) with per-stage objectives, completion, and device resume; the pathway presents the four concept units plus challenge, practice, and assessment as separately completable, deep-linkable rows (5-7 minutes each). Every interactive diagram sits behind a prediction commitment (predict → commit → observe → explain); inline checks appear every 1-2 minutes from the authored check-tagged bank; remediation routes by misconception tag to the authored P1-REM modules. The route structure is unchanged (ADR-011): units are stage anchors within the lesson route, not new pages.

## Alternatives considered
Separate routes per unit (rejected: multiplies navigation chrome and breaks the lesson's narrative arc for no deep-linking gain the hash mapping doesn't already provide); shortening via styling alone (rejected: perceived length was not the problem - passive consumption was); gamified momentum mechanics (rejected: ADR-009 stands; momentum comes from structure, visible skill state, and completion units).

## Consequences
- **Positive:** every learning claim is now exercised by a decision before it is explained; lesson pacing produces 6-10 decisions per unit; stage completion feeds honest pathway progress; the pilot can measure decision density and pre/post deltas.
- **Negative:** lesson.md's original block-order spec is superseded (updated alongside this ADR); stage completion tracking couples the pathway to the journey's stage count, recorded in one constant.

## Related Documents
- [ADR-003](adr-003-competency-progression.md) · [ADR-009](adr-009-learning-before-gamification.md) · [ADR-011](adr-011-step-per-url.md)
- [../roadmap/experience-plan.md](../roadmap/experience-plan.md) - the review synthesis this implements
