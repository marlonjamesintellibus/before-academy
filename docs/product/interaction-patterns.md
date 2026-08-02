---
title: Global Interaction Patterns
category: product
owner: product-designer
status: approved
used_by: [screens, components.md]
last_updated: 2026-07-31
---

# Global Interaction Patterns

Defined once; every screen and component inherits.

## Keyboard & focus
Everything operable by keyboard in DOM order = visual order. Tab/Shift+Tab traverse; Enter/Space activate; arrows within radiogroups/steppers; Esc closes any layer. Focus ring 2px primary, 2px offset, `:focus-visible`, never suppressed. Focus management: step advance → new h1/question heading; modal open → first meaningful element (never destructive); modal close → trigger; feedback open → panel. Skip link first on every page. No traps outside modals/sheets.

## Screen reader & semantics
One h1 per page; no skipped levels; complete landmarks. `aria-live=polite` for feedback/validation; `role=alert` for system errors; progress valuetext ("Question 3 of 6"). State is always text-bearing; colour/icon are reinforcement. Question formats carry spoken-friendly instructions.

## Touch & responsive
44×44 targets, 8px separation. No hover-dependent info (tap-to-open panels, not tooltips). Gestures never required. Reflow 360–1440 and at 200% zoom / 320px effective width without horizontal scroll.

## Errors, validation & resilience
Inline on-blur field-level validation stating the fix; never clear input; never disable submit for validation. Network failure on submit → queue + retry ×3 (1s/4s/10s) with non-blocking toast, then manual retry. Answers, attempt state, and scroll survive refresh; nothing user-entered is lost by in-lesson navigation.

## Related Documents
- [accessibility.md](accessibility.md) — the release gate these patterns serve
