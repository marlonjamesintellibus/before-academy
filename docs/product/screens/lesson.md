---
title: "Screen: Lesson (S03)"
category: product
owner: product-designer
status: approved
depends_on: [../../content/lessons/ai-automation-software.md]
related: [../components.md, ../../engineering/content-engine.md]
last_updated: 2026-07-31
---

# S03 Lesson - Layered Content

Objective: deliver the four-layer model with genuinely voluntary depth (ADR-006).

## Layout
Desktop: sticky left ToC rail + 680px reading column. Mobile: sticky compact progress header + stepper. Block order (content defined in [content/lessons](../../content/lessons/ai-automation-software.md)): hook (one-tap tease) → pre-lesson confidence prompt (1–5 scale, optional, per the lesson spec's pre/post pair) → why it matters → objectives (collapsed accordion "What you'll learn") → Quick Explanation blocks per concept → diagram → misconception callout → Continue to activity.

## Depth controls
Explore Further / Go Deeper render as **inline expandable panels** beneath each Quick block, labelled with reading time ("Explore further · 2 min"). Buttons with `aria-expanded`; expansion state persists per learner; never displayed as pressure. Tabs and separate pages were rejected - see ADR-006.

## Diagram
"How Rules, Automation and AI Work Together": responsive figure; each layer (Interface / Traditional software / Automation / AI component / Human review) is a tappable **button** revealing a description panel below the figure (no tooltips - they fail on touch). Adjacent **"Read as text"** disclosure contains the complete prose alternative (versioned with the diagram - [../../content/editorial-style.md](../../content/editorial-style.md) alt-text standards).

## States
Fresh · resumed (scroll restored + toast) · remediation entry (relevant blocks auto-expanded and highlighted, highlight announced in text) · content-version mismatch ("This lesson was updated" banner).

## Accessibility & events
Single h1; concepts are h2; reduced motion = instant toggle. Events: `lesson_viewed`, `layer_expanded(layer, concept)`, `diagram_component_opened`, `diagram_text_alt_opened`, `hook_answered`, `confidence_submitted(value, stage='pre')`, `lesson_completed_scroll`, `continue_to_activity_clicked`.

## Related Documents
- [../../content/learning-framework.md](../../content/learning-framework.md) - why layers exist, standalone test
- [../../engineering/content-engine.md](../../engineering/content-engine.md) - rendering pipeline
