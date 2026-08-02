---
title: "ADR-027: PR-reviewed JSON seed files are the Phase 1 authoring and publishing system"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Data/Content
related: [adr-020-canonical-content-records.md, adr-021-immutable-versioning.md, adr-041-defer-cms-ui.md]
last_updated: 2026-07-31
---

# ADR-027 — PR-reviewed JSON seed files are the Phase 1 authoring and publishing system

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Data/Content

## Context
Governance requires drafting → SME review → educational review → approval with records (Phase 0 §20); building a CMS UI is explicit non-scope.

## Decision
Content lives as JSON in the repo; the Git PR review is the governance approval record; an idempotent publish script versions, snapshots, and revalidates.

## Alternatives considered
Minimal admin UI (rejected: scope Phase 1 forbids); headless CMS (rejected per ADR-020); direct DB editing (rejected: no review trail).

## Consequences
- **Positive:** Approval, diff history, and publication are one auditable mechanism; content-lint gates ride the same CI.
- **Negative:** Editors need Git — acceptable for one section and a small team; revisit at Phase 2 volume (ADR-041).

## Related Documents
- [ADR-020](adr-020-canonical-content-records.md)
- [ADR-021](adr-021-immutable-versioning.md)
- [ADR-041](adr-041-defer-cms-ui.md)
- Specifications: Eng §8.3, Content §13
