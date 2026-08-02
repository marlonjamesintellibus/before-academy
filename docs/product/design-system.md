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

**Visual direction (v3, 2026-08-02, product-owner brief):** blue-led premium learning. The interactive clarity of Brilliant, the polished shell of Uxcel, the premium presentation of MasterClass - reinterpreted, never copied. Navy shell framing white content surfaces on soft blue-grey pages; #0057EA is the one brand color; subtle blue gradients only where they add depth and hierarchy. Approachable and intelligent, never childish, never generic-LMS. Personality from type contrast, composition, and interaction - not decoration.

## Colour
| Token | Value | Usage |
|---|---|---|
| color.ink | #0B1B33 | primary text (deep navy) |
| color.ink-muted | #46536E | secondary text (≥4.5:1 on all surfaces) |
| color.navy | #0A1B3D | shell surfaces: header, footer, hero, high-contrast panels |
| color.navy-soft | #12294F | raised shell surfaces, hero gradient stop |
| color.surface | #F4F7FC | page background (soft blue-grey) |
| color.surface-card | #FFFFFF | content cards, reading surfaces |
| color.border | #D9E2F1 | card borders, dividers |
| color.primary | #0057EA | actions, links, focus ring, progress (the brand blue) |
| color.primary-strong | #0046BC | hover/active |
| color.primary-tint | #E8F0FE | selected states, callouts, chips |
| color.sky | #BFD7FE | illustration support, progress tracks |
| color.success | #0E7A46 | correct (always icon + text) |
| color.success-tint | #E5F4EC | correct surfaces |
| color.warning | #B45309 | needs-review |
| color.danger | #B3261E | errors, destructive |
| color.danger-tint | #FBEAE8 | incorrect surfaces |

Gradients: `navy → navy-soft → primary` at low angles for hero/shell depth only; never behind body text under 18px, never as decoration on reading surfaces. All pairs meet AA. Colour never carries meaning alone.

## Typography
Display face: **Bricolage Grotesque** (600-800) for h1/h2, the wordmark, and stat numerals - confident and distinctive without being decorative. Body face: **Source Sans 3**. Loaded via next/font with system fallbacks; swap-ready via tokens. display 32/40→40/48 700 (h1) · heading 24/32→28/36 700 (h2) · subheading 18/28 600 · body 16/26→17/28 · caption 13/20. No oversized headings that create empty space. Reading column max 680px (~70ch). Must survive 200% zoom - no fixed-height text containers.

## Space, radius, elevation, breakpoints, motion
- Spacing 4px scale: 4 8 12 16 24 32 48 64; blocks separate by 32; page padding 16/24.
- Radius 8 (controls), 12 (cards), 16 (hero panels), 999 (chips/pills).
- Elevation: white cards with 1px border + soft layered shadow (0 1px 2px + 0 8px 24px at 6% navy); shell surfaces flat. Hover lifts are subtle (2px translate + deeper shadow), never bouncy.
- Progress: primary-filled bars/rings on sky tracks; always paired with text ("3 of 10").
- Breakpoints: 360 floor · 768 · 1024 (ToC rail appears) · 1440 max canvas.
- Motion: 120ms state / 200ms panel / 280ms route; ease-out in, ease-in out; instant reduced-motion equivalent; nothing loops or autoplays.
- Icons: 24px stroke set (Lucide), always paired with text except close ×.
- Illustration/diagram language: simple geometric forms, clear labels, blue-family fills with sparing neutral support, soft depth; custom to Before Academy, never stock or emoji.

## Related Documents
- [components.md](components.md) · [accessibility.md](accessibility.md)
