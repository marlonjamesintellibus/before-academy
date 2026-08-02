---
title: "ADR-028: Blueprint-based assessment with category and difficulty metadata"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Assessment
related: [adr-003-competency-progression.md, adr-030-provisional-threshold.md]
last_updated: 2026-07-31
---

# ADR-028 — Blueprint-based assessment with category and difficulty metadata

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Assessment

## Context
Random selection from one list can produce attempts that skip whole competencies; failure must convert into targeted review (Phase 0 §23).

## Decision
Every question carries category (blueprint dimension), difficulty, objective mapping, and a remediation target; attempts are selected to cover categories; category results drive the fail-state study plan.

## Alternatives considered
Undifferentiated random selection (rejected: unbalanced attempts, undiagnosable failures); adaptive testing now (rejected: needs calibration data Phase 1 exists to gather — metadata already supports it later).

## Consequences
- **Positive:** Fair coverage per attempt; remediation is precise; question analytics map to competencies.
- **Negative:** Higher authoring cost per question — the price of diagnostic value.

## Related Documents
- [ADR-003](adr-003-competency-progression.md)
- [ADR-030](adr-030-provisional-threshold.md)
- Specifications: Content §7, Eng §9
