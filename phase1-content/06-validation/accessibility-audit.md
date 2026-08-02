# Accessibility audit

```yaml
content_id: P1-VAL-002
content_type: validation-audit
title: Accessibility audit - content-side, Phase 1 package
phase: 6
section: ai-automation-traditional-software
content_status: audit-complete
source_of_truth: CS §12 obligations; interface accessibility remains canonical in UX §6 and is audited at implementation
```

| Area | Status | Finding |
|---|---|---|
| Heading structure | Pass | Descriptive, sentence-case, hierarchical in every learner-facing file |
| Reading order | Pass | All comparisons complete in linear prose; tables supplementary; walkthroughs match diagram flow |
| Plain language | Pass with note | Sentences short, one idea per block; automated per-block readability check (Eng §14) still required at build |
| Link labels | Pass | All links name their target ("Review: Combined systems"); no "click here" |
| Button labels | Pass | Action-stating labels throughout; no bare "Submit" |
| Screen-reader announcements | Pass | Specified for feedback, states, results, errors, saves, and disclosures; results announced as one complete summary |
| Image descriptions | Pass | No meaning-bearing images beyond diagrams; illustrative alt texts pre-written in lessons |
| Diagram alternatives | Pass | Both diagrams: ≤125-char alt + standalone long walkthrough, versioned with the asset, reading order matched |
| Keyboard interaction | Pass | Full keyboard paths specified; no drag-only, hover-only, or multi-key interactions |
| Drag-and-drop alternatives | Pass | Primary mechanic is select-and-confirm; rule recorded for any future drag variant |
| Colour independence | Pass | Every state pairs word + icon; colour reinforces only |
| Motion alternatives | Pass | No meaning in motion anywhere; reduced-motion behaviour specified per surface |
| Error messaging | Pass | Names the event, states what's preserved, gives a recovery action; assertive announcements |
| Time limits | Pass | None anywhere - activity, checks, assessment, reflections |
| Mobile presentation | Pass | Single-column specs for activity and both diagrams; no landscape dependency; no swipe-only |
| Cognitive load | Pass with note | Layered model + one-idea blocks; two watch items: L004 Explore at word-budget ceiling (fallback documented) and 15 glossary chips across four lessons vs CS ~9 recommendation (≤6 per lesson; trim candidates: algorithm, trigger, workflow, model, training) - both pilot-validated |
| Content length | Pass | Core path ≈20 minutes; every optional layer labelled with reading time |
| Repetition | Pass with note | S04 payroll repeat is deliberate spaced retrieval, labelled in learner copy and flagged with a swap candidate |
| Language clarity | Pass | No idioms failing translation, no culture-locked references, no ability or violence metaphors; corrected item C1 logged |

**Corrections this audit produced:** none beyond C1/C4 already logged in the content checklist. Interface-level verification (focus visuals, contrast, touch targets, live-region wiring) transfers to implementation QA against UX §6 with `activity-accessibility.md` as the test script.
