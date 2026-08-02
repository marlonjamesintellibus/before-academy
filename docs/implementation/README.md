---
title: Implementation Guides
category: implementation
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Implementation Guides

Task-shaped entry points telling an engineer or AI coding agent **exactly which docs to load** for a workflow — no more, no less. Context is deliberately minimal per task.

## AI agent working rules
1. Load only the guide's listed docs + [../engineering/standards.md](../engineering/standards.md) (always applies). Never load the whole library.
2. Precedence on conflict: product/ > engineering/ > content/ > roadmap/ > code comments; cite the deciding doc in the PR description.
3. Implement one story per session: restate acceptance criteria → list files to touch → implement vertically (tests + events + a11y included) → self-check against the DoD → open PR.
4. **Checkpoints — never skip:** human PR review (code + spec fidelity) → staging verification (behaviour) → education-lead sign-off for learner-visible copy or learning behaviour. Agents never merge unreviewed.
5. Escalate, never improvise: a spec gap becomes a question in the PR, not a decision in code.
6. Each milestone closes with a small agent-executed, human-reviewed refactor story (no behaviour change).

## Guides
- [build-a-screen.md](build-a-screen.md) · [add-a-component.md](add-a-component.md)
- [add-a-lesson.md](add-a-lesson.md) · [create-assessment-questions.md](create-assessment-questions.md)
- [work-with-auth-and-progress.md](work-with-auth-and-progress.md) · [extend-analytics.md](extend-analytics.md)
- [milestone-context-packages.md](milestone-context-packages.md)

## Related Documents
- [../roadmap/delivery-process.md](../roadmap/delivery-process.md) — DoR/DoD the checkpoints enforce
