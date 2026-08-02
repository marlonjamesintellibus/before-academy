---
title: "ADR-013: Strict TypeScript, Tailwind tokens, and wrapped shadcn/ui primitives"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Frontend
related: [adr-012-nextjs-rsc-server-actions.md]
last_updated: 2026-07-31
---

# ADR-013 — Strict TypeScript, Tailwind tokens, and wrapped shadcn/ui primitives

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Frontend

## Context
A small team plus AI coding agents need conventions that prevent drift and make the design system one diff wide.

## Decision
TypeScript strict with no-any; design tokens as the Tailwind theme; shadcn/ui components wrapped once in components/ui and consumed only through wrappers.

## Alternatives considered
Component library as-is throughout features (rejected: token changes become codebase-wide edits); CSS-in-JS system (rejected: runtime cost, weaker agent legibility); loose TS (rejected: forfeits the main defect net for agent-written code).

## Consequences
- **Positive:** Design changes are single-file; agents inherit constraints from types and lint rather than review comments.
- **Negative:** Wrapper indirection adds a thin layer — accepted for the single-point-of-change property.

## Related Documents
- [ADR-012](adr-012-nextjs-rsc-server-actions.md)
- Specifications: Eng §3.2, §16, UX §5
