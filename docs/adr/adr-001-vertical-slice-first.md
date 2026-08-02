---
title: "ADR-001: Build one vertical slice before the full pathway"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Product
related: [adr-002-ai-awareness-first.md, adr-003-competency-progression.md]
last_updated: 2026-07-31
---

# ADR-001 — Build one vertical slice before the full pathway

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Product

## Context
The platform vision spans seven competency levels and many pathways. Building broadly first risks scaling untested assumptions about learning, content operations, and product experience (Phase 0 §10.2).

## Decision
Phase 1 delivers one complete, tested section — AI, Automation and Traditional Software — exercising every subsystem end to end before any second section is produced.

## Alternatives considered
Full AI Awareness MVP first (rejected: multiplies content cost before the lesson model is validated); clickable prototype only (rejected: cannot reveal assessment, progression, or content-ops problems).

## Consequences
- **Positive:** Every framework is validated against real beginners; Phase 2 estimates come from measured data.
- **Negative:** Public offering is initially thin; a single lesson must carry first impressions.

## Related Documents
- [ADR-002](adr-002-ai-awareness-first.md)
- [ADR-003](adr-003-competency-progression.md)
- Specifications: Phase 1 §1, Roadmap §1
