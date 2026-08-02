---
title: "Workflow: Add a Component"
category: implementation
owner: product-designer
status: approved
last_updated: 2026-07-31
---

# Add a Component

**Load:** [../product/components.md](../product/components.md) · [../product/design-system.md](../product/design-system.md) · [../product/interaction-patterns.md](../product/interaction-patterns.md).

**Steps:** confirm no existing component covers it (check the inventory) → if shadcn provides a base, wrap it once in `components/ui` with tokens; never consume shadcn directly from features → implement all listed states; correctness/status always icon + text → a11y per interaction-patterns (44×44, focus ring, aria semantics from the inventory row) → reduced-motion equivalent for any animation → add the row to components.md in the same PR → colocated tests incl. axe.

**Done when** the inventory row exists and every state renders in a demo/preview.

## Related Documents
- [../product/accessibility.md](../product/accessibility.md) - the gate component states serve
- [../engineering/standards.md](../engineering/standards.md) - file/type conventions
