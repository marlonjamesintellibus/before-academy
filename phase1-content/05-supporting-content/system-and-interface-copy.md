# System and interface copy

```yaml
content_id: P1-UI-000 (set definition; items P1-UI-001..036)
content_type: interface-copy
title: System and interface copy - proposed canonical strings
phase: 6
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation (proposed strings; UX §7 remains canonical - reconciliation A4 requires merge into the strings file, Eng §8.6, before implementation)
```

Format per item: **ID - context** · Primary text · *(supporting text where needed)* · CTA labels · SR = screen-reader announcement · recovery/variations where relevant. Sentence case throughout; no "Submit", no "Click here"; every label states its action.

**P1-UI-001 - Start lesson (welcome screen)** · CTA: Start lesson · SR: "Start lesson, button."

**P1-UI-002 - Continue (generic forward)** · CTA: Continue · SR: "Continue, button."

**P1-UI-003 - Resume (returning learner)** · Primary: Pick up where you left off · SR: announces position first ("You're at scenario 4 of 10. Pick up where you left off, button.").

**P1-UI-004 - Save progress (guest-visible)** · CTA: Save my progress · *(Supporting: creates a free account - the only way progress outlives this session.)* · Guest-only; registered users save automatically and never see it.

**P1-UI-005 - Explore further (layer disclosure)** · CTA: Explore further · about 1 minute · SR: "Explore further, about one minute, collapsed, button." State announced on toggle.

**P1-UI-006 - Go deeper (layer disclosure)** · CTA: Go deeper · about 2 minutes · SR pattern as UI-005.

**P1-UI-007 - Skip optional content** · CTA: Skip this - it's optional · SR: "Skip this optional content, button."

**P1-UI-008 - Return to lesson** · CTA: Back to the lesson · SR: "Back to the lesson, button."

**P1-UI-009 - Check answer** · CTA: Check answer · SR: "Check answer, button." Disabled until a selection exists; disabled state announced with reason ("Select an answer to check it").

**P1-UI-010 - Change answer (pre-check)** · Behaviour copy: selecting a different option before checking replaces the selection silently · SR: new selection state announced.

**P1-UI-011 - Try again** · Activity level: CTA: Try the set again · *(Supporting: fresh order, same ten scenarios.)* · Assessment level: CTA: Start the retake · *(Supporting: the questions will be different.)*

**P1-UI-012 - Show explanation** · CTA: Show explanation · SR: disclosure state announced; Escape closes and returns focus.

**P1-UI-013 - Review concept (remediation chip)** · CTA: Review: {concept name} · SR: "Review {concept name}, link." Never a bare "Review."

**P1-UI-014 - Continue as guest** · CTA: Continue as a guest · SR: "Continue as a guest, button."

**P1-UI-015 - Create an account** · CTA: Create a free account · SR: "Create a free account, button."

**P1-UI-016 - Sign in** · CTA: Sign in · SR: "Sign in, button."

**P1-UI-017 - Progress saved (toast)** · Primary: Progress saved · SR: "Progress saved." (polite region) · Canonical body: P1-PRG-001.

**P1-UI-018 - Progress restored** · Canonical: P1-PRG-002 · SR: position stated first.

**P1-UI-019 - Progress warning (guest leave)** · Canonical: P1-PRG-005 · SR: progress summary before choices · Recovery: Keep my progress (create account) / Leave anyway.

**P1-UI-020 - Loading** · Primary: Loading… · *(Over 3 seconds: Still loading - thanks for your patience.)* · SR: "Loading" announced once, completion announced.

**P1-UI-021 - Slow connection** · Primary: Your connection looks slow - content may take a moment · *(Nothing is lost; saved progress is safe.)* · CTA: Keep waiting · Secondary: Retry now.

**P1-UI-022 - Offline** · Primary: You're offline · *(Reading works where content is cached; answers need a connection to save.)* · CTA: Retry connection · SR: assertive announcement · Recovery: state clears automatically on reconnect, announced.

**P1-UI-023 - General error** · Primary: Something went wrong on our side · *(Your progress is saved.)* · CTA: Try again · Secondary: Back to the section · SR: assertive, includes the recovery action.

**P1-UI-024 - Activity unavailable** · Primary: Sort the System isn't available right now · *(That's on us. The lessons remain open, and your progress is safe.)* · CTA: Try again · Secondary: Back to the lesson.

**P1-UI-025 - Assessment unavailable** · Canonical: P1-RES-010.

**P1-UI-026 - Answer submitted (assessment, per question)** · SR: "Answer recorded, question {n} of 6." No visual celebration per answer.

**P1-UI-027 - Correct (feedback prefix)** · Primary: Correct. · SR: "Correct." then feedback body · Visual state paired with the word, never colour alone.

**P1-UI-028 - Partially correct (feedback prefix)** · Primary: You caught part of it. · SR: same pattern.

**P1-UI-029 - Incorrect (feedback prefix)** · Primary: Not quite. · SR: same pattern. The word "wrong" never renders as a state label.

**P1-UI-030 - No answer selected** · Primary: Select an answer to check it · SR: polite announcement on attempted check · Never phrased as an error.

**P1-UI-031 - Exit confirmation (mid-activity/assessment)** · Primary: Leave for now? · *(Everything so far is saved - you'll resume right here.)* · CTA: Leave and save · Secondary: Stay · SR: focus-managed dialog, cancel reachable first.

**P1-UI-032 - Restart confirmation** · Primary: Start this section over? · *(Your current progress in it will be replaced. Completed results stay on your record.)* · CTA: Start over · Secondary: Keep my progress · Destructive action is never the default focus.

**P1-UI-033 - Retake assessment** · Canonical: P1-RES-013 · CTA: Start the retake.

**P1-UI-034 - Review answers** · CTA: Review my answers · SR: "Review my answers, button." Lists all six with selections; unanswered flagged as links.

**P1-UI-035 - Review recommended content** · CTA: Start my review · *(Supporting: one concept at a time, worst-performing first.)*

**P1-UI-036 - Completion / session expired / content updated** · Completion canonical: P1-COM states · **Session expired:** Primary: Your session expired - your saved progress is safe · CTA: Sign back in · Guest variation: Your guest session ended; see P1-PRG-004 honesty rules · **Content updated since last visit:** Primary: This section was improved since your last visit · *(Your progress still counts; a few wordings and examples may look fresher.)* · CTA: Continue.

---

> INTERNAL VALIDATION NOTE:
> These 36 strings are the package's proposed canon and must merge into the UX §7 strings file (Eng §8.6) with a UX-spec version bump; any string existing in both places with different wording is a defect (A4). "Content updated" copy assumes non-breaking content updates; a breaking change (renumbered scenarios mid-attempt) needs its own state, deferred to the UX spec.
