---
title: "ADR-008: Accessibility is a release gate, not a polish task"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-010-buttons-not-drag.md]
last_updated: 2026-07-31
---

# ADR-008 - Accessibility is a release gate, not a polish task

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
Retrofitted accessibility is expensive and excludes pilot participants; Phase 0 names deferral as a top risk (Phase 0 §38).

## Decision
WCAG 2.1 AA behaviours are part of every story's Definition of Done; M8 audits a surface that was built accessible; severity-1 findings stop ship regardless of date.

## Alternatives considered
Audit-and-fix at the end (rejected: structural issues surface too late); AAA target (rejected: disproportionate for the pilot; AA is the recognized baseline).

## Consequences
- **Positive:** No exclusionary launch; accessibility findings stay small and local.
- **Negative:** Per-story cost is slightly higher; button-based interaction choices (ADR-010) follow partly from this bar.

## Related Documents
- [ADR-010](adr-010-buttons-not-drag.md)
- Specifications: UX §6, Roadmap §8/M8
