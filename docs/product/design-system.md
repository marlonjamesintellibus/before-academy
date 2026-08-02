---
title: Design System Tokens
category: product
owner: product-designer
status: approved
used_by: [components.md, ../engineering/frontend.md]
last_updated: 2026-07-31
---

# Design System

Tokens are implemented as the Tailwind theme; a token change is one diff (ADR-013).

## Colour
| Token | Value | Usage |
|---|---|---|
| color.ink | #1A1A2E | primary text |
| color.ink-muted | #5A5F6E | secondary text (4.5:1 on surface) |
| color.surface | #FFFFFF | page background |
| color.surface-alt | #F5F6FA | cards, panels |
| color.primary | #2A4CC7 | actions, links, focus ring |
| color.primary-strong | #1E3799 | hover/active |
| color.success | #1E7E4E | correct (always icon + text) |
| color.warning | #B45309 | needs-review |
| color.danger | #B3261E | errors, destructive |
| color.highlight | #EEF2FF | callouts, remediation highlight |

All pairs meet AA (4.5:1 body, 3:1 large/UI). Colour never carries meaning alone.

## Typography
System font stack at launch (swap-ready via tokens). display 32/40→40/48 700 (h1) · heading 24/32→28/36 700 (h2) · subheading 18/28 600 · body 16/26→17/28 (reading comfort first) · caption 13/20. Reading column max 680px (~70ch). Must survive 200% zoom and font-size overrides - no fixed-height text containers.

## Space, radius, elevation, breakpoints, motion
- Spacing 4px scale: 4 8 12 16 24 32 48 64; blocks separate by 32; page padding 16/24.
- Radius 8 (controls/cards), 12 (modals), 999 (chips).
- Elevation: borders over heavy shadows; 3 levels.
- Breakpoints: 360 floor · 768 · 1024 (ToC rail appears) · 1440 max canvas.
- Motion: 120ms state / 200ms panel / 280ms route; ease-out in, ease-in out; every animation has an instant reduced-motion equivalent; nothing loops or autoplays.
- Icons: 24px stroke set (Lucide), always paired with text except close ×.

## Related Documents
- [components.md](components.md) · [accessibility.md](accessibility.md)
