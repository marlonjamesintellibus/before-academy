---
title: "ADR-030: 80% threshold and attempt size are provisional configuration; retakes are unlimited with combination exclusion"
category: adr
status: Accepted (provisional values)
date: 2026-07-31
decision_category: Assessment
related: [adr-028-blueprint-metadata.md, adr-003-competency-progression.md]
last_updated: 2026-07-31
---

# ADR-030 — 80% threshold and attempt size are provisional configuration; retakes are unlimited with combination exclusion

**Status:** Accepted (provisional values) · **Date:** 2026-07-31 · **Category:** Assessment

## Context
Phase 1 mandates testing — not asserting — the pass threshold, attempt size, and feedback timing.

## Decision
Threshold (80%) and attempt size (6–7) are configuration, not code; retakes are unlimited, exclude the previous exact combination, rotate answers, and preserve category coverage; failure copy is a study plan.

## Alternatives considered
Hard-coded values (rejected: pilot findings would require deploys to act on); attempt cooldowns (rejected: punishes the remediation loop the model depends on).

## Consequences
- **Positive:** Pilot evidence changes data, not code; retake integrity without hostility.
- **Negative:** Config drift risk across environments — mitigated by config-in-repo with review.

## Related Documents
- [ADR-028](adr-028-blueprint-metadata.md)
- [ADR-003](adr-003-competency-progression.md)
- Specifications: Phase 1 §17, Roadmap §1.2
