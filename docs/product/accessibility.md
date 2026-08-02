---
title: Accessibility (Release Gate)
category: product
owner: qa
status: approved
related: [interaction-patterns.md, ../content/editorial-style.md]
last_updated: 2026-07-31
---

# Accessibility

Target: **WCAG 2.1 AA** on all screens. Accessibility is per-story (Definition of Done) and audited at milestone M8 — never retrofitted (ADR-008). Severity-1 findings stop ship.

## Release gate (blocking)
- Automated scan (axe): zero critical/serious on every screen
- Keyboard-only pass of journeys J1–J4 (scripted)
- Screen-reader pass: one desktop SR + one mobile SR across lesson, activity, assessment
- Contrast audit of all token pairs; 200% zoom reflow pass; reduced-motion pass
- Where feasible, usability sessions include assistive-technology users

Interaction-level rules: [interaction-patterns.md](interaction-patterns.md). Content-side obligations (plain language, alt text, anthropomorphism ban): [../content/editorial-style.md](../content/editorial-style.md).

## Related Documents
- [../roadmap/milestones.md](../roadmap/milestones.md) — M8 audit scope
- [../engineering/testing.md](../engineering/testing.md) — axe-in-CI wiring
