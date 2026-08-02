---
title: "Workflow: Build or Modify a Screen"
category: implementation
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Build or Modify a Screen

**Load:** the screen's doc in [../product/screens/](../product/screens/README.md) · [../product/components.md](../product/components.md) · [../product/interaction-patterns.md](../product/interaction-patterns.md) · [../engineering/frontend.md](../engineering/frontend.md). If the screen reads data: the owning engine doc. If it mutates: [../engineering/api-contracts.md](../engineering/api-contracts.md).

**Steps:** route per [../product/information-architecture.md](../product/information-architecture.md) → Server Component page composing one `queries.ts` call → client islands only from the frontend doc's list → wrapped `components/ui` primitives only → all states from the screen doc (incl. loading skeleton + error retry panel) → events from [../product/analytics-events.md](../product/analytics-events.md) via `events.ts` → a11y behaviours from interaction-patterns (focus, announcements, reduced motion) → tests: unit for logic, axe + journey step in E2E.

**Done when** the screen doc's states/events/a11y are all demonstrable on a preview deploy.

## Related Documents
- [../product/ux-copy.md](../product/ux-copy.md) - strings the screen renders
- [../roadmap/delivery-process.md](../roadmap/delivery-process.md) - DoD this workflow must satisfy
