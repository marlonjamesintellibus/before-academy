---
title: Vision & Phase 1 Scope
category: product
owner: product-owner
status: approved
related: [../adr/adr-001-vertical-slice-first.md, ../roadmap/milestones.md]
last_updated: 2026-07-31
---

# Vision & Phase 1 Scope

Before Academy teaches AI concepts through clear, layered, interactive, accessible learning. Long-term: a competency-based ecosystem across seven levels. Phase 1: one tested vertical slice - *AI, Automation and Traditional Software* (AI Awareness pathway).

## Design principles
1. **Value before identity** - the full lesson works for guests; accounts add continuity, never access (ADR-004).
2. **Progressive disclosure** - Quick Explanation is the spine; deeper layers are voluntary (ADR-006).
3. **Competency over consumption** - assessment passing is the only completion condition (ADR-003).
4. **Immediate, explanatory feedback** - every response explains why and names the clue.
5. **Accessible by default** - AA behaviours are per-story requirements, audited at M8 (ADR-008).
6. **One canonical source** - all learner copy renders from versioned records (ADR-020).
7. **Calm failure** - a failed assessment is a study plan; the word "fail" never appears.
8. **Mobile-first** - designed at 360px, scaled up.

## In scope (Phase 1)
Screens S01–S13; layered lesson; custom diagram; Sort the System; knowledge check; 10–13 question bank / 6–7 per attempt; remediation; guest device progress; account conversion + migration; analytics; WCAG 2.1 AA; feedback reporting.

## Out of scope
Full pathway, other pathways, certificates, leaderboards, cohorts, community, AI tutor, native apps, CMS UI, presentation automation, complex personalization. Architecture must not preclude these; no screen may depend on them. Deferral reasoning: ADR-035–041.

## Benchmarks (patterns, not visual targets)
Brilliant (guest preview, earned-value conversion, button answering) · Coursera (course home, resume CTA, graded/practice split) · Frontend Masters (ToC rail, minimal chrome) · Khan Academy (mastery progression, calm failure) · Duolingo (one-question flow, feedback panel) · Codecademy (inline checks). Gamification mechanics from these products are explicitly excluded (ADR-009).

## Related Documents
- [information-architecture.md](information-architecture.md)
- [../roadmap/milestones.md](../roadmap/milestones.md)
