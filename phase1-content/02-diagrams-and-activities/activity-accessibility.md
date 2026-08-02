# Activity accessibility

```yaml
content_id: P1-FND-009
content_type: accessibility-specification
title: Activity accessibility — Sort the System and lesson interactions
phase: 3
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: UX §6 (interface accessibility, canonical); CS §12 (content-side obligations); applies to P1-ACT-001, micro-checks, P1-DIAG-001, P1-KC-001, P1-ASM-001 content behaviour
```

Interface-level accessibility (focus styling, contrast tokens, component behaviour) is canonical in UX §6; this file specifies the content-and-interaction obligations for the Phase 1 interactive experiences so QA can test every path.

## Keyboard interaction

- Every interaction completes with keyboard only: Tab/Shift+Tab moves between the scenario text, the five answer options, Check answer, Show explanation, Skip this one, and Continue, in that order.
- Answer options form a radio group: arrow keys move selection within the group, Space selects, Tab leaves the group.
- No interaction requires simultaneous keys, timed presses, dragging, or hovering.
- "Try the set again" and summary links are ordinary buttons/links in tab order.

## Screen-reader reading order

Per scenario: progress ("Scenario 4 of 10") → scenario title → scenario text → group label ("Pick the best label") → five options with selection state → actions. Nothing meaningful is positioned outside this order; decorative elements are hidden from assistive tech.

## Focus behaviour

- On advancing to a new scenario, focus moves to the scenario heading (not past it, not to the first option), so the text is read before choices.
- After Check answer, focus moves to the feedback region; after Continue, to the next scenario heading.
- Focus is never trapped; Escape closes the explanation disclosure and returns focus to its trigger.

## Alternative to drag-and-drop

The primary mechanic is select-and-confirm — there is no drag mechanic to substitute for. If a future variant introduces drag-to-sort, select-and-confirm remains available as an equal, discoverable method, per the standing rule that drag-and-drop is never the only method.

## Alternative to colour coding

Correct, partially correct, and incorrect states are communicated by the verdict word ("Correct" / "You caught part of it" / "Not quite"), an icon with a text label, and the feedback text. Colour reinforces; it never solely carries meaning. Category strengths on the summary are named in text ("four for four on automation"), not colour-badged alone.

## Alternative to animation

No content meaning is carried by animation. Any transition between scenarios is decorative, respects reduced-motion settings (below), and has no informational payload.

## Error announcement

Activity errors (load failure, save failure, offline) render as text alerts announced via an assertive live region, name what happened and what is preserved ("Your answers so far are saved"), and present a keyboard-reachable recovery action.

## Feedback announcement

Feedback renders in a polite live region announced after Check answer: verdict first, then the body. The remediation "Review" link inside feedback is announced as a link with a meaningful label ("Review: Combined systems"), never "click here."

## Touch-target considerations

Answer options, Check answer, Skip, and Continue meet the UX §6 minimum touch-target size with adequate spacing; the five options never shrink below target size to fit one screen — the list scrolls instead.

## Mobile layout

Single column: progress, scenario, options stacked full-width, actions pinned in reading order (not floating over content). The summary's per-category readout stacks as cards. Nothing depends on landscape orientation.

## Reduced-motion behaviour

With reduced motion enabled: scenario transitions are instant, the progress indicator updates without animation, and the summary renders complete rather than progressively. No parallax, no auto-playing motion anywhere in the activity.

## Long-description handling

The activity itself needs no long descriptions (all content is text). Where the summary or reveal references the diagrams, links point to the in-lesson figures whose long text alternatives follow the CS §12.4 / UX §6.2 pattern.

## Activity timeout policy

None. No time limits, no idle warnings that discard state, no countdowns. Session expiry (platform-level) must preserve activity answers per the resume state.

## Saved-progress behaviour

- Answers save per scenario on Check answer (signed-in: account; guest: session), so resume restores position and all prior feedback.
- The resume state announces position ("You were on scenario 4 of 10") before any interaction is required.
- Skipped-item links on the summary return the learner to the exact scenario with prior context intact.

## Micro-checks, diagnostic, knowledge check, and assessment

All of the above applies, with these specifics: the diagnostic's Skip this is a first-class button announced in the intro; assessment review-before-submit lists unanswered questions as links; the final submission confirmation is a focus-managed dialog with an explicit cancel; result states are announced as a complete summary (score, categories, next step) in one reading.

---

> INTERNAL VALIDATION NOTE:
> The focus-to-heading-on-advance pattern and per-scenario save granularity are implementation assumptions to be verified against the UX §S04 component in accessibility QA; if the UX component specifies different focus management, UX wins and this file is updated.
