---
title: Component Library
category: product
owner: product-designer
status: approved
used_by: [screens, ../engineering/frontend.md]
related: [design-system.md, interaction-patterns.md]
last_updated: 2026-07-31
---

# Component Library

27 components cover every Phase 1 screen. Global interaction rules live in [interaction-patterns.md](interaction-patterns.md) and apply to all. Engineering wraps shadcn/ui once in `components/ui` (ADR-013); features consume wrappers only.

| Component | Variants | States | Key accessibility behaviour |
|---|---|---|---|
| Button | Primary, Secondary, Tertiary, Destructive | default/hover/focus/active/disabled/loading | `aria-busy` when loading; disabled only in-flight; 44×44 min |
| AppHeader | Default, Minimal (assessment), Guest, Registered | - | nav landmark; skip link precedes |
| AppFooter | Default, Minimal (assessment) | - | contentinfo landmark; links: About, Report a problem (opens S13b), Privacy; keyboard-reachable after main |
| Card | Section, Preview (upcoming), Continue-learning, Status, History row | default/hover/focus; locked never used (sections never lock) | whole card clickable with single accessible name; status word in text |
| Breadcrumbs | Full, Collapsed (mobile) | - | `aria-label=Breadcrumb`; `aria-current` |
| ToC Rail / Contents Sheet | Rail ≥1024px, Sheet mobile | not started / in progress / done | sheet traps focus; `aria-current` section |
| Stepper | Horizontal mobile steps | available/current/done | ordered list; state via visually-hidden text |
| ProgressBar | Lesson scroll, Attempt, Activity dots | 0–100 / dots | `role=progressbar` + valuetext |
| ContentBlock | Concept, Objectives accordion | collapsed/expanded/highlighted | h2 headings; highlight announced in text |
| DepthPanel | Explore Further, Go Deeper | collapsed/expanded | button + `aria-expanded`; reading time in label |
| DiagramFigure | Interactive SVG layer stack + request trace | layer selected; tracing; text-alt open | figure/figcaption; layers are real buttons (aria-pressed); trace has reduced-motion instant equivalent; full text alternative |
| ConceptDiagram | Rules, Automation, AI (keyed by concept block) | idle/running/result | interactions are buttons; outcomes announced via aria-live; never colour alone |
| MisconceptionCallout | - | - | `role=note`; "Common misconception" prefix |
| GlossaryChip | inline term | default/open | tap-to-open panel, never hover tooltip |
| ScenarioCard | activity scenario | unanswered/selected/submitted | radiogroup; text precedes controls |
| AnswerOption | radio, checkbox, match/sort row | + correct/incorrect/missed | correctness = icon + text; button-based reorder |
| FeedbackPanel | Correct, Incorrect, Info | entering/static | `aria-live=polite`; receives focus |
| QuestionCard | MC, MS, Matching, Sorting, Scenario | as AnswerOption | fieldset/legend; plain-language format instructions |
| ResultSummary | Pass, Fail | - | outcome in first heading; score as text |
| CategoryBreakdown | list | strong/needs-review | status word per row |
| RemediationLink/Chip | inline, category row | - | descriptive label incl. time |
| ConfidenceScale | 1–5 buttons | unselected/selected | radiogroup; labelled endpoints |
| Banner | Resume, Guest storage, Content updated | dismissible/persistent | `role=status`; dismissal persists per type |
| Modal | Conversion, Confirm, Feedback | open/closing | trap; Esc; returns focus; non-destructive default |
| Toast | Success, Error, Info | auto 5s; error persists | `role=status`/`alert`; pauses on hover/focus |
| TextField | text, email, password toggle | default/focus/error/disabled | persistent label; `aria-describedby` errors |
| SkeletonLoader | text, card | - | `aria-hidden`; container announces once |

## Related Documents
- [design-system.md](design-system.md) - tokens the components consume
- [../implementation/add-a-component.md](../implementation/add-a-component.md)
