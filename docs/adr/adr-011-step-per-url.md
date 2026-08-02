---
title: "ADR-011: One focused step per URL and one question per view"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-005-assessment-first-route.md]
last_updated: 2026-07-31
---

# ADR-011 - One focused step per URL and one question per view

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
The lesson, activity, check, and assessment could live on one long page or as separate addressable steps; remediation and the assessment-first route need direct entry points.

## Decision
Activity, check, and assessment are nested routes; players present one item per view with a progress indicator.

## Alternatives considered
Single long page (rejected: unshareable steps, unpredictable back button, muddy funnels); all questions on one page (rejected: higher cognitive load for beginners, weaker per-item analytics).

## Consequences
- **Positive:** Deep-linkable remediation and assessment-first entry; clean funnel analytics; predictable navigation.
- **Negative:** More route plumbing; mid-step refresh handling required (solved via session state, Eng §3.3).

## Related Documents
- [ADR-005](adr-005-assessment-first-route.md)
- Specifications: UX §2.2/Decision Register, Eng §3.1
