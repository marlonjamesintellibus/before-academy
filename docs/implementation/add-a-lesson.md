---
title: "Workflow: Add a Lesson (or Edit Lesson Content)"
category: implementation
owner: education-lead
status: approved
last_updated: 2026-07-31
---

# Add a Lesson / Edit Lesson Content

**Load:** [../content/lessons/README.md](../content/lessons/README.md) (templates) · [../content/learning-framework.md](../content/learning-framework.md) · [../content/knowledge-model.md](../content/knowledge-model.md) · [../content/editorial-style.md](../content/editorial-style.md) · [../engineering/content-engine.md](../engineering/content-engine.md) (seed format). For Phase 1 edits: [../content/lessons/ai-automation-software.md](../content/lessons/ai-automation-software.md) is the spec.

**Steps:** canonical records first (rule of one; approved analogies only) → objectives numbered + matrixed → blocks per template with layer budgets; Quick layers must pass the standalone test → feedback per the [formula](../content/feedback.md); misconceptions referenced by ID → author as seed JSON in `db/seed/content` → PR tagging SME + education reviewers (merge = approval record) → content-lint must pass (readability, alt text, remediation links, banned words) → publish script versions + snapshots + revalidates.

**Done when** the lesson renders from published, versioned records and the governance sign-offs are on the PR. Human gates in [../content/governance.md](../content/governance.md) cannot be self-certified by an agent.

## Related Documents
- [../content/glossary.md](../content/glossary.md) — chip terms and definition standards
- [../content/misconceptions.md](../content/misconceptions.md) — IDs lessons reference
