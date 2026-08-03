---
title: M8 Accessibility Gate Record
category: product
owner: product-designer
status: approved
related: [accessibility.md, ../roadmap/milestones.md]
last_updated: 2026-08-02
---

# M8 Accessibility Gate Record

Record of the WCAG 2.1 AA gate (ADR-008: accessibility is a release gate). Method: four-agent audit (2026-08-02) against accessibility.md and interaction-patterns.md, followed by a fix pass and machine verification.

## Fixed this milestone (previously severity 1-2)

- **Focus management**: assessment results move focus to the outcome; stage advances, remediation modules, review sessions, diagnostic items, and capstone compare all focus their new heading; prediction gates focus the acknowledgment.
- **Live regions**: error messages render as persistently mounted `role="alert"`/`role="status"` regions (assessment start/submit, answer hints) instead of conditionally mounted nodes.
- **Never disable for validation**: every Check/Next/Submit across inline checks, activity, knowledge check, and assessment is always enabled; an unanswered press explains itself in a status region ("Choose an answer first...").
- **Reduced motion for JS sequences**: automation Play and the canonical Play-trace jump instantly to their completed state under `prefers-reduced-motion`; the CSS kill switch already covered keyframes.
- **Stepper state**: lesson outline buttons carry visually hidden ", completed"/", not started" so completion is not colour/icon-only.
- **Name ambiguity**: assessment review rows label "Change answer to question N".
- **Touch targets**: header/footer/nav links meet the 44px target rule.
- **Modal**: built-in labelled Close button (Esc still works; focus returns to trigger via native dialog).
- **Button loading**: `aria-busy` supplemented with visually hidden "Loading".
- **Reflow**: 360px sweep across all seven core routes asserts zero horizontal overflow in CI (caught and fixed a confidence-scale wrap failure).

## Machine-verified, every CI run

- axe (critical + serious = fail) on home, pathway, lesson, activity, check, assessment, 404 - desktop and mobile profiles.
- Keyboard journeys: skip link → CTA → lesson; full activity and assessment runs driven by keyboard-checkable controls.
- Lighthouse budgets (new `lighthouse` CI job): accessibility ≥ 0.95, best practices ≥ 0.9, LCP < 2.5s, CLS < 0.1 on home, pathway, and lesson.
- 360px reflow sweep; reduced-motion behavior test; focus/`aria-expanded`/`aria-pressed` assertions throughout the e2e suite (82 tests).

## Residual items - honest register

1. **Manual screen-reader passes (SR ×2) are not yet performed.** Automated checks cannot substitute for a VoiceOver + NVDA walk-through of J1-J4. Owner: product owner or a tester with SR fluency, before pilot (M9 checklist item).
2. Single-select button groups (diagram layers, scenario chooser) use `aria-pressed` per components.md rather than radiogroup semantics; group labels state the choose-one contract. Recorded as a known deviation; revisit if SR passes surface confusion.
3. CSP allows 'unsafe-inline' scripts (Next.js hydration baseline); resolved at M9 as an accepted risk with rationale in [ADR-043](../adr/adr-043-csp-inline-acceptance.md).

Gate status: **automated AA gate green; manual SR passes pending** - the one human task left before the pilot checklist can close.

## Related Documents
- [accessibility.md](accessibility.md) - the standing requirements this record verifies
