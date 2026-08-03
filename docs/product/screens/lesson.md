---
title: "Screen: Lesson (S03)"
category: product
owner: product-designer
status: approved
depends_on: [../../content/lessons/ai-automation-software.md]
related: [../components.md, ../../engineering/content-engine.md]
last_updated: 2026-07-31
---

# S03 Lesson (staged journey - ADR-042)

The lesson is a five-stage journey: Start Here (hook, why-it-matters, outcomes, opening diagnostic, pre-confidence) then four concept units (Traditional Software → Automation → Artificial Intelligence → Compare and Apply), each with its own objective, completion, and device resume (`ba.v1.lesson.*`). These stage labels are learner-facing and canonical: the pathway unit rows mirror them exactly, so no unit carries two different names. Stage completion is stored as a set of indices, never a count, because nothing is locked and stages can be finished out of order. Desktop: sticky progress rail (percent, minutes remaining, stage outline with completion state). Mobile: stacked stages with the same outline.

Every interactive diagram sits behind a prediction gate (predict → commit → observe → explain); each concept unit carries 2-3 inline checks from the authored bank; remediation deep links (`#p1-lesson-00x`, `#p1-lesson-005-misconception`) open the right stage without touching saved completion. Content renders from published records; the staged presentation, gates, and check placements are interface (this spec + ADR-042).

Block inventory per unit: quick explanation with glossary chips, interactive diagram, memory callback, Explore Further / Go Deeper depth panels, inline checks. Stage advance moves focus to the new stage heading. Events: `lesson_viewed`, `lesson_stage_started/completed(stage, stage_number)`, `lesson_resumed(stage)`, `prediction_committed`, `interaction_*`, `glossary_term_opened`, `layer_expanded`, `diagram_component_opened`, `diagram_text_alt_opened`, `confidence_submitted(value, stage='pre')`, `diagnostic_item_answered/completed`, `continue_to_activity_clicked`.

States: fresh · resumed (stage restored from device, `lesson_resumed`) · remediation entry (hash → stage + anchor focus) · private browsing (fully usable, nothing persists).

## Related Documents
- [../components.md](../components.md) - DepthPanel, GlossaryChip, DiagramFigure, ConceptDiagram contracts
- [../../adr/adr-042-staged-lesson-units.md](../../adr/adr-042-staged-lesson-units.md) - why staged
