---
title: Product Documentation
category: product
owner: product-designer
status: approved
last_updated: 2026-07-31
---

# Product

What Before Academy does and how it behaves, from the learner's side of the glass. Canonical for screens, components, design tokens, interaction/accessibility patterns, UX copy, and UX analytics. Engineering implements these; content fills them.

## Organization
- [vision-and-scope.md](vision-and-scope.md) - principles, Phase 1 scope, benchmarks
- [information-architecture.md](information-architecture.md) - sitemap, routes, navigation
- [personas-and-journeys.md](personas-and-journeys.md) - P1/P1b/P2, journeys J1–J4
- [screens/](screens/README.md) - S01–S13 specifications
- [components.md](components.md) · [design-system.md](design-system.md)
- [interaction-patterns.md](interaction-patterns.md) - global keyboard/focus/touch/error rules (screens inherit these)
- [accessibility.md](accessibility.md) - WCAG 2.1 AA release gate
- [ux-copy.md](ux-copy.md) - production strings
- [analytics-events.md](analytics-events.md) - UX event taxonomy

## Common workflows
Building a screen → its screens/ doc + components.md + interaction-patterns.md. Changing copy → ux-copy.md (interface strings) or content/ (learning copy - see ownership split in [../content/editorial-style.md](../content/editorial-style.md)). Adding an event → analytics-events.md + [../engineering/analytics.md](../engineering/analytics.md).

## Related Documents
- [../implementation/build-a-screen.md](../implementation/build-a-screen.md)
- [../adr/README.md](../adr/README.md) - UX decisions: ADR-006–011
