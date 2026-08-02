---
title: "ADR-007: Custom web application, not an LMS platform"
category: adr
status: Accepted
date: 2026-07-31
decision_category: UX
related: [adr-020-canonical-content-records.md, adr-012-nextjs-rsc-server-actions.md]
last_updated: 2026-07-31
---

# ADR-007 — Custom web application, not an LMS platform

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** UX

## Context
Off-the-shelf LMSs (Moodle, Teachable, LearnDash) ship courses fast but impose their content models, interaction limits, and account-first assumptions.

## Decision
Before Academy is a purpose-built Next.js application over its own canonical content model.

## Alternatives considered
Hosted LMS (rejected: guest-first flows, layered content, custom classification activity, and canonical reuse are all poor fits); headless LMS + custom front end (rejected: pays LMS complexity while still building the hard parts).

## Consequences
- **Positive:** Every approved learning behaviour is buildable exactly as specified; content model doubles as the company's knowledge source of truth.
- **Negative:** The team owns everything an LMS would have provided — accepted because the slice is deliberately small.

## Related Documents
- [ADR-020](adr-020-canonical-content-records.md)
- [ADR-012](adr-012-nextjs-rsc-server-actions.md)
- Specifications: Phase 0 §26, Eng §1
