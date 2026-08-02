---
title: Risks & Responsibilities
category: roadmap
owner: product-owner
status: approved
last_updated: 2026-07-31
---

# Risks & RACI

## Top risks (impact/likelihood → mitigation → contingency)
- **Content review bottleneck (D4)** H/M → parallel track from M0, weekly tracking, review-time metric → build against flagged drafts; slip pilot before slipping review quality.
- **Scope creep toward full pathway** H/M → per-milestone out-of-scope lists; spec-ref rule exposes unspecced work → new ideas file to Phase 2, never the current milestone.
- **Late blueprint/scoring defects** H/L → M4 integration tests vs the content blueprint; question analytics from first staging use → config-driven threshold; expedited question swaps.
- **Migration corrupts guest progress** H/L → D5 freeze; integration tests on real M5 payloads; idempotency; clamping → feature-flag migration off (guests keep device progress); fix within the week.
- **Beginner recruitment shortfall** M/M → start at M6; over-recruit 2× → extend pilot a week; remote moderated sessions; never substitute internal experts.
- **Structural a11y findings at M8** M/L → a11y in every story's DoD; axe per PR → M8 slack absorbs; sev-1 stops ship regardless of date.
- **Provisional thresholds frustrate pilots** M/M → config not code; daily confidence/retake watch → adjust mid-pilot with a version note.
- **Bus factor** M/M → handbook-first docs, ADRs, review requirement → anyone + the context package resumes any milestone.

## RACI (R responsible · A accountable · C consulted · I informed)
| Workstream | PO | Eng lead | Eng/agents | Designer | Edu lead | Writer | SME | QA |
|---|---|---|---|---|---|---|---|---|
| Milestone scope & exit | A | R | C | C | C | I | I | C |
| Architecture & schema | I | A/R | R | I | I | I | C | I |
| Screens & interactions | C | C | R | A/R | C | I | I | C |
| Lesson & feedback copy | I | I | I | C | A | R | C | C |
| Questions & scenarios | I | I | I | I | A | R | R | C |
| Seed/publish & content QA | I | C | R | I | C | R | C | A |
| Analytics & funnels | A | C | R | I | C | I | I | C |
| Accessibility gate | I | C | R | R | I | C | I | A |
| Pilot & findings | A | C | I | C | R | C | C | R |
| Production release | A | R | C | I | C | I | I | C |

## Related Documents
- [dependencies.md](dependencies.md) · [milestones.md](milestones.md)
