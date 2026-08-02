---
title: "Workflow: Create or Revise Assessment Questions"
category: implementation
owner: education-lead
status: approved
last_updated: 2026-07-31
---

# Create or Revise Assessment Questions

**Load:** [../content/assessments.md](../content/assessments.md) (blueprint, difficulty, formats) · [../content/lessons/ai-automation-software.md](../content/lessons/ai-automation-software.md) (LOs) · [../content/feedback.md](../content/feedback.md) · [../engineering/assessment-engine.md](../engineering/assessment-engine.md) (metadata the engine expects).

**Rules:** every question carries kind, format, blueprint category, difficulty, LO mapping, explanation, and a resolving `remediation_block_id` · no "all of the above" · recall cap: two per bank · applied items get two industry variants · plain language per [../content/editorial-style.md](../content/editorial-style.md) · answer rationales follow the feedback formula.

**Steps:** check blueprint coverage before writing → draft with metadata complete → SME + instructional review on the PR → content-lint (coverage + links) green → after release, watch question analytics; <40% or >95% first-attempt accuracy triggers review.

**Done when** the bank satisfies the blueprint table and every question's remediation link resolves.

## Related Documents
- [../content/misconceptions.md](../content/misconceptions.md) - misconception-category targets
- [../product/screens/assessment.md](../product/screens/assessment.md) - how questions render
