# Learner journey

```yaml
content_id: P1-FND-008
content_type: learner-journey
title: Learner journey — AI, Automation and Traditional Software
phase: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §3.3 (routes), §5.2 (block order), §5.6 (reflection/confidence); behaviour UX §J1–J2, §S03–S09; analytics UX §8.1
```

## Routes (CS §3.3)

- **Standard route:** lesson → activity → knowledge check → assessment. Stages 1–16 below.
- **Assessment-first route:** entry → assessment directly. Identical rules, no penalty framing. Joins the standard journey at stage 11.
- **Remediation route:** assessment not passed → category-targeted review, worst-performing category first → retake with a different question combination. Stages 13–14.

Passing the assessment is the only completion condition on every route. Consumption, time, and depth usage are analytics signals, never gates.

---

### Stage 1 — Enter section
- **Learner goal:** start without friction, as guest or signed in.
- **Learner question:** "Is this for me, and how long will it take?"
- **Content required:** section title, description, estimated time, entry CTAs including the assessment-first option (P1-LESSON-001).
- **Emotional consideration:** beginners may expect to feel behind; the welcome assumes nothing and promises a usable skill, not expertise.
- **Interaction:** start lesson / start assessment / continue-as-guest choice.
- **Exit condition:** a start CTA activated.
- **Analytics implication:** section_entered, route_chosen, guest_or_registered.
- **Accessibility consideration:** all CTAs keyboard-reachable with meaningful labels; time estimate in text, not icon-only.

### Stage 2 — Understand why the topic matters
- **Learner goal:** feel the relevance in one concrete moment.
- **Learner question:** "Why should I care which is which?"
- **Content required:** hook — one-tap classification tease ("Your bank flags a purchase as suspicious. Is that AI?") with reveal ("It might be — and by the end you'll know how to tell") + why-it-matters block (2–3 sentences).
- **Emotional consideration:** the hook must create doubt, not fear; no "you've been fooled" framing.
- **Interaction:** one tap on the tease; pre-lesson confidence prompt (P1-CONF-001).
- **Exit condition:** learner proceeds past the hook.
- **Analytics implication:** hook_answered (choice recorded for pre/post comparison), confidence_pre.
- **Accessibility consideration:** one-tap prompt has a keyboard/button equivalent; reveal announced to screen readers.

### Stage 3 — Review learning goals
- **Learner goal:** know what they'll be able to do afterwards.
- **Learner question:** "What exactly will I get out of this?"
- **Content required:** objectives block — learner-voice list ("You'll be able to..."), max five bullets summarizing LO1–LO10, collapsed by default (UX §S03).
- **Emotional consideration:** ability framing, not obligation framing; no wall of objectives.
- **Interaction:** optional expand/collapse.
- **Exit condition:** learner continues (expansion optional).
- **Analytics implication:** objectives_expanded.
- **Accessibility consideration:** disclosure announced with expanded/collapsed state; content readable in reading order when expanded.

### Stage 4 — Complete low-pressure diagnostic *(addition A1 — approval pending)*
- **Learner goal:** surface their current assumptions without being graded.
- **Learner question:** "How much of this do I already know?"
- **Content required:** P1-DIAG-001 intro copy ("guessing is welcome — this doesn't count toward anything"), five items, skip control.
- **Emotional consideration:** explicitly ungraded and skippable; no correctness reveal yet, so wrong guesses can't sting before teaching happens.
- **Interaction:** five selections or skip.
- **Exit condition:** items answered or skipped.
- **Analytics implication:** diagnostic_answered per item (pre/post comparison baseline), diagnostic_skipped.
- **Accessibility consideration:** standard selection controls, no drag, no time limit; skip is a first-class labelled action.

### Stage 5 — Learn traditional software
- **Learner goal:** grasp "written rules, same input → same output."
- **Learner question:** "So what is ordinary software, exactly?"
- **Content required:** P1-LESSON-002 — Quick/Explore/Deeper layers, vending-machine anchor analogy with stated boundary, tax-calculator contrast case (feeds LO8), micro-check with feedback.
- **Emotional consideration:** learners who assumed complexity = AI must not feel foolish; the contrast case respects why that inference was reasonable (M1 framing).
- **Interaction:** optional layer expansion; micro-check.
- **Exit condition:** learner continues (layers optional; Quick stands alone).
- **Analytics implication:** layer_opened (explore/deeper), microcheck_answered.
- **Accessibility consideration:** layers as labelled disclosures with reading time; micro-check feedback announced.

### Stage 6 — Learn automation
- **Learner goal:** grasp "how work flows, not how smart it is."
- **Learner question:** "Isn't automation the same thing as AI?"
- **Content required:** P1-LESSON-003 — dominoes anchor analogy with boundary ("a person or an AI can set them up"), explicit statement that automation ≠ AI and automation may contain AI, everyday and workplace examples, micro-check.
- **Emotional consideration:** M2 is the most common belief in the room; correction names why it's reasonable before correcting.
- **Interaction:** layer expansion; micro-check.
- **Exit condition:** learner continues.
- **Analytics implication:** layer_opened, microcheck_answered.
- **Accessibility consideration:** as stage 5.

### Stage 7 — Learn artificial intelligence
- **Learner goal:** grasp "patterns learned from data; outputs can vary and be wrong, by design."
- **Learner question:** "What is AI actually doing, if it isn't thinking?"
- **Content required:** P1-LESSON-004 — weather-forecast anchor analogy with boundary, common AI tasks (predict/classify/recommend/recognize/generate), spam-filter false-positive example ("sometimes wrong, by design"), M3 passage, Go Deeper training-vs-use passage (M13), micro-check.
- **Emotional consideration:** normalize probabilistic output without fear; variability framed as designed, not broken.
- **Interaction:** layer expansion; micro-check.
- **Exit condition:** learner continues.
- **Analytics implication:** layer_opened, microcheck_answered.
- **Accessibility consideration:** as stage 5; no anthropomorphic shortcuts in alt text either.

### Stage 8 — Compare the three
- **Learner goal:** hold the three side by side: written rules vs task chains vs learned patterns.
- **Learner question:** "How do I tell them apart in the wild?"
- **Content required:** P1-LESSON-005 comparison passage; proposed comparison diagram P1-DGM-002 (A2 pending) with full text alternative.
- **Emotional consideration:** consolidation, not new pressure; the comparison confirms what's already been taught.
- **Interaction:** reading; optional diagram long-description toggle.
- **Exit condition:** learner continues.
- **Analytics implication:** diagram_longdesc_opened.
- **Accessibility consideration:** diagram meets CS §12.4 — one teaching claim, ≤125-char alt, standalone prose walkthrough, colour never carrying meaning alone.

### Stage 9 — Understand combined systems
- **Learner goal:** see that real products mix all three plus human review, and that classification often applies to a feature, not a product.
- **Learner question:** "So which box does my banking app go in?"
- **Content required:** P1-LESSON-005 combined-systems passage — restaurant anchor analogy with boundary ("from your table you can't see the kitchen"), customer-support walkthrough mirrored by canonical diagram P1-DGM-001, featured M1 misconception callout.
- **Emotional consideration:** "Combination" and "it depends on the feature" must feel like skilled answers, not cop-outs.
- **Interaction:** diagram exploration; reading.
- **Exit condition:** learner continues to the activity intro.
- **Analytics implication:** diagram_longdesc_opened, callout_viewed.
- **Accessibility consideration:** diagram per CS §12.4; reading order of the text alternative matches visual flow.

### Stage 10 — Complete interactive classification (Sort the System)
- **Learner goal:** practise classifying ten real scenarios from evidence.
- **Learner question:** "Can I actually do this?"
- **Content required:** P1-ACT-001 — instructions ("Pick the best label from what the scenario tells you — not what you'd guess from the brand or how impressive it sounds"), 10 canonical scenarios with per-option feedback (Verdict → Because → Clue → Next), fixed 6→7 chatbot pair, scenario 10 teaching "Not enough information", summary naming per-category strengths, optional reflection P1-REF-001.
- **Emotional consideration:** completion advances, score doesn't; wrong answers are information; the summary leads with strengths.
- **Interaction:** classification selections with immediate feedback; keyboard-first alternative to any drag mechanic (UX §S04).
- **Exit condition:** all scenarios attempted (skips allowed and recorded).
- **Analytics implication:** scenario_answered per item; first-attempt accuracy; 6/7 order-effect monitoring; not-enough-information overuse signal (CS §6.3).
- **Accessibility consideration:** no drag-only interaction, no colour-only states, no time limits; feedback announced; touch targets per UX §6.

### Stage 11 — Complete knowledge check, then assessment
- **Learner goal:** confirm readiness (optional), then demonstrate the competency.
- **Learner question:** "Am I ready — and can I show it?"
- **Content required:** P1-KC-001 (4 practice questions, remediation chips on wrong answers, UX §S05) then P1-ASM-001 (6–7 questions, category coverage, review-before-submit, save/resume, interruption and offline states per UX §S06–S07).
- **Emotional consideration:** practice/graded distinction kept explicit ("practice, not graded" vs "assessment"); no time pressure anywhere.
- **Interaction:** answering, review, final submission confirmation.
- **Exit condition:** assessment submitted.
- **Analytics implication:** check_question_answered, remediation_chip_clicked, assessment_submitted, per-question category results.
- **Accessibility consideration:** unanswered-question review reachable by keyboard; submission confirmation announced; no timers.

### Stage 12 — Receive result
- **Learner goal:** understand what happened and what's next.
- **Learner question:** "How did I do — and what now?"
- **Content required:** result states (P1-RES-0xx): pass variants confirm the competency and bridge forward; not-passed uses the required frame — strengths first, then a study plan built from category tags ("Not this time — here's what to review"); post-assessment confidence prompt P1-CONF-002.
- **Emotional consideration:** no shame, no empty praise; "fail" never appears; score presented with its meaning, not alone.
- **Interaction:** result review; CTA to continue, review, or retake.
- **Exit condition:** learner selects the next action.
- **Analytics implication:** result_state_shown, confidence_post, study_plan_generated.
- **Accessibility consideration:** result announced as a screen-reader-complete summary (score, categories, next step), not colour-coded only.

### Stage 13 — Complete remediation where needed
- **Learner goal:** repair the specific confusion, one concept at a time.
- **Learner question:** "What did I mix up, and how do I un-mix it?"
- **Content required:** P1-REM modules mapped by category (blueprint mapping table): reteach with different wording, the held-back example or analogy first; "these two are easy to mix up because..." framing; optional one-question mini-confirm closing each module (UX §S09).
- **Emotional consideration:** worst-performing category first, presented sequentially — never a pile of everything wrong at once; a correct mini-confirm is named as evidence of progress.
- **Interaction:** reading + optional mini-confirm per module.
- **Exit condition:** targeted modules viewed (mini-confirms optional).
- **Analytics implication:** remediation_viewed, miniconfirm_answered, repeat-difficulty escalation signal.
- **Accessibility consideration:** remediation sequence navigable by keyboard; module completion states announced.

### Stage 14 — Retake where appropriate
- **Learner goal:** try again on fresh questions when ready.
- **Learner question:** "Will it be the same questions again?"
- **Content required:** retake framing ("when you're ready — the questions will be different"), new draw with rotated options and preserved category coverage.
- **Emotional consideration:** readiness framing; unlimited attempts; no attempt counts shown.
- **Interaction:** retake CTA → assessment (returns to stage 11 behaviour).
- **Exit condition:** retake submitted → stage 12.
- **Analytics implication:** retake_started, attempt_number (internal only), category-improvement delta.
- **Accessibility consideration:** as stage 11.

### Stage 15 — Complete the section
- **Learner goal:** hear what they can now do, and where to look next.
- **Learner question:** "What did I actually gain?"
- **Content required:** completion states (P1-COM-0xx): ability-framed message, takeaway block (rules are written; automation chains tasks; AI learns patterns — and most real products combine them), suggested real-world observation activity, honest next-step preview of AI Literacy ("coming soon") + Go Deeper pointer.
- **Emotional consideration:** one exclamation mark permitted here and nowhere else; no new major concept introduced at completion.
- **Interaction:** completion CTAs (next step / review optional content).
- **Exit condition:** learner exits or continues to optional content.
- **Analytics implication:** section_completed, completion_variant_shown.
- **Accessibility consideration:** completion announced; optional-content links meaningfully labelled.

### Stage 16 — Save or preserve progress
- **Learner goal:** keep what they earned.
- **Learner question:** "Will this still be here when I come back?"
- **Content required:** progress states (P1-PRG-0xx): saved/restored/not-yet-synced; guest-session storage and possible-loss warning; account-creation offer with factual benefits; guest-to-account transfer success and failure states; long-absence return message.
- **Emotional consideration:** non-coercive throughout — the core lesson stays accessible without an account; loss warnings are factual, never threatening.
- **Interaction:** optional account creation / sign-in; dismiss.
- **Exit condition:** learner leaves with progress state communicated honestly.
- **Analytics implication:** account_prompt_shown, account_created_after_learning, transfer_succeeded/failed.
- **Accessibility consideration:** prompts dismissible by keyboard; warnings announced; no modal traps.

---

> INTERNAL VALIDATION NOTE:
> Stage 4 exists only if addition A1 is approved; if declined, the hook (stage 2) remains the sole pre-lesson probe and the diagnostic analytics events are dropped. Account-prompt placement (stages 1 and 16 only) is a testable assumption validated against drop-off analytics.
