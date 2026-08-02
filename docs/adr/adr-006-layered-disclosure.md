---
title: "ADR-006: Layered depth via inline progressive disclosure"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-003-competency-progression.md]
last_updated: 2026-07-31
---

# ADR-006 — Layered depth via inline progressive disclosure

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
Beginners need simplicity; curious learners need depth; both in one lesson risks either overwhelm or shallowness (Phase 0 §10.4).

## Decision
Quick Explanation is the always-visible spine; Explore Further and Go Deeper expand inline beneath each concept, voluntary and labelled with reading time.

## Alternatives considered
Tabs per layer (rejected: hides depth's existence, resets scroll); separate pages per layer (rejected: fragments one concept across navigation); single mixed-depth text (rejected: recreates the overwhelm).

## Consequences
- **Positive:** Depth is discoverable exactly where relevant; the Quick layer stays a complete standalone lesson (Content §3.2 standalone test).
- **Negative:** Writers must satisfy a hard constraint — Quick layers alone must be pass-sufficient.

## Related Documents
- [ADR-003](adr-003-competency-progression.md)
- Specifications: UX §S03, Content §3.2
