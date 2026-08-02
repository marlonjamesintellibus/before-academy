---
title: Design System Tokens
category: product
owner: product-designer
status: approved
used_by: [components.md, ../engineering/frontend.md]
last_updated: 2026-08-02
---

# Design System

Tokens are implemented as the Tailwind theme; a token change is one diff (ADR-013).

**Visual direction (v2, 2026-08-02, product-owner directive):** editorial-education. Warm paper surfaces, ink typography with a serif display face, cobalt for action, terracotta as a sparing accent, and crisp ink-bordered cards with hard offset shadows. Deliberately not the generic gradient-SaaS look; personality comes from type contrast and structure, never from decoration that carries meaning.

## Colour
| Token | Value | Usage |
|---|---|---|
| color.ink | #16161F | primary text |
| color.ink-muted | #565968 | secondary text (≥4.5:1 on both surfaces) |
| color.surface | #FAF7F2 | page background (warm paper) |
| color.surface-alt | #F0EBE1 | cards, panels (deeper paper) |
| color.primary | #2145C4 | actions, links, focus ring (cobalt) |
| color.primary-strong | #17338F | hover/active |
| color.accent | #C2410C | eyebrows, marks, sparing emphasis (terracotta) |
| color.accent-tint | #FAEDE4 | accent surfaces |
| color.success | #1E7E4E | correct (always icon + text) |
| color.warning | #B45309 | needs-review |
| color.danger | #B3261E | errors, destructive |
| color.highlight | #E9EEFB | callouts, remediation highlight (cobalt tint) |

All pairs meet AA (4.5:1 body, 3:1 large/UI). Colour never carries meaning alone.

## Typography
Display face: **Fraunces** (serif, 600-700) for h1/h2 and the wordmark - the editorial signature. Body face: **Source Sans 3** for everything else. Loaded via next/font with system fallbacks; both swap-ready via tokens. display 32/40→40/48 700 (h1) · heading 24/32→28/36 700 (h2) · subheading 18/28 600 · body 16/26→17/28 (reading comfort first) · caption 13/20. Reading column max 680px (~70ch). Must survive 200% zoom and font-size overrides - no fixed-height text containers.

## Space, radius, elevation, breakpoints, motion
- Spacing 4px scale: 4 8 12 16 24 32 48 64; blocks separate by 32; page padding 16/24.
- Radius 8 (controls/cards), 12 (modals), 999 (chips).
- Elevation: ink borders + hard offset shadow (4px 4px 0 at 12% ink) on primary cards; borders over soft shadows; 3 levels.
- Decorative texture: a subtle dot-grid may appear on marketing surfaces only; always aria-hidden, never behind reading columns.
- Breakpoints: 360 floor · 768 · 1024 (ToC rail appears) · 1440 max canvas.
- Motion: 120ms state / 200ms panel / 280ms route; ease-out in, ease-in out; every animation has an instant reduced-motion equivalent; nothing loops or autoplays.
- Icons: 24px stroke set (Lucide), always paired with text except close ×.

## Related Documents
- [components.md](components.md) · [accessibility.md](accessibility.md)
