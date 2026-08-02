# Sort the System - classification activity

```yaml
content_id: P1-ACT-001
content_type: interactive-activity
title: Sort the System
phase: 3
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO7, LO9; every scenario also reinforces its concept LOs]
estimated_time: 6–8 minutes
required_or_optional: required for completion via the standard route (advanced by completion, not score)
prerequisites: P1-LESSON-002..005
concept_tags: [classification, evidence-first]
misconception_tags: [M1, M2, M3, M5, M8, M9, M10, M12, M14]
assessment_links: [P1-ASM-001 classification and ambiguity categories]
remediation_links: [per-scenario, see below]
accessibility_requirements: see activity-accessibility.md
content_status: draft-for-validation
source_of_truth: CS §6.1 (10 canonical scenarios, instructions standard, success criteria); mechanics UX §S04
```

**Answer labels (identical for every scenario, fixed order):** Traditional software · Automation · AI-assisted · Combination · Not enough information

**Design decisions (binding for implementation):**
- Feedback is immediate and follows Verdict → Because → Clue → Next (≤60 words).
- No within-scenario retry: feedback names the category, so a second guess would be theatre. The learner continues; "Try the set again" (full activity, shuffled order except the fixed 6→7 pair) is offered from the summary.
- Completion, not score, advances the learner. Skips are allowed, recorded, and revisitable from the summary.
- Scenarios present in canonical order 1–10 on first run (the 6→7 contrast and the scenario-10 closer are sequenced teaching).

## Introductory copy (learner-facing)

**Sort the System**

Ten real situations. Your job: pick the best label from the evidence in front of you. Some of these are straightforward, a couple are deliberately tricky, and one of the five labels - "Not enough information" - is sometimes the skilled answer, not a cop-out.

## Instructions (CS §6.1 standard, verbatim)

Read each scenario. Pick the best label from what the scenario tells you - not what you'd guess from the brand or how impressive it sounds.

## Progress messaging

Scenario {n} of 10 *(plus a non-colour-dependent progress indicator; skipped items marked "skipped" in the tracker)*

---

## Scenarios

### P1-ACT-001-S01 - The calculator
*Difficulty: foundational · LO1, LO7 · Misconceptions: M1 (baseline) · Remediation: traditional-software block · Analytics: scenario_answered {id: S01}*

**Scenario:** You type three amounts into a calculator app and it returns the total. Same numbers tomorrow, same total.

**Correct classification:** Traditional software. **Additional accepted:** none.
**The clue:** fixed arithmetic - identical output every time.

**Feedback - Traditional software (correct):** Correct. The clue is "same numbers tomorrow, same total." Fixed arithmetic rules produce identical output for identical input - the signature of traditional software.
**Feedback - Automation:** Not quite - here's the clue: you did the triggering by typing. Nothing runs on its own; the app applies written arithmetic rules to your input. Review: Traditional software.
**Feedback - AI-assisted:** Not quite - the clue is "same total, every time." Learned patterns produce output that can vary; fixed arithmetic never does. This is written rules. Review: Traditional software.
**Feedback - Combination:** Not quite - there's only one mechanism described: arithmetic rules applied to your input. No chained tasks, no learned judgment. Review: Traditional software.
**Feedback - Not enough information:** Not quite - this one tells you the mechanism: arithmetic that repeats exactly. Save this label for descriptions that hide how the system works. Review: Traditional software.

**Explanation:** Calculation is the cleanest case of written rules: the behaviour was fully specified in advance, so the output is deterministic.

### P1-ACT-001-S02 - The instant confirmation email
*Difficulty: foundational · LO2, LO7 · Misconceptions: M2 · Remediation: automation block · Analytics: scenario_answered {id: S02}*

**Scenario:** A visitor submits a contact form on a company website. The moment they press send, a confirmation email goes out to them - no person involved.

**Correct classification:** Automation. **Additional accepted:** none.
**The clue:** trigger → action chain; no judgment involved.

**Feedback - Automation (correct):** Correct. The clue is "the moment they press send" - a trigger firing an action with no person involved. That's a chain running on its setup: automation.
**Feedback - Traditional software:** Not quite - you're close, and the email system is built from written rules. But the scenario's point is the flow: an event fires an action on its own. That's automation. Review: Automation.
**Feedback - AI-assisted:** Not quite - here's the clue: nothing is being judged. A submission triggers a pre-written email, the same way every time. Effort removed isn't intelligence added. Review: Automation.
**Feedback - Combination:** Not quite - one mechanism carries this: a trigger running a fixed action. No learned step, no human step in the loop. Review: Automation.
**Feedback - Not enough information:** Not quite - the mechanism is stated: press send, email goes out, no person involved. Trigger and action are right there. Review: Automation.

**Explanation:** Automation describes how the work flows - an event starts a chain. Whether any step is intelligent is a separate question, and here none is.

### P1-ACT-001-S03 - Recommended for you
*Difficulty: applied · LO3, LO7 · Misconceptions: M8 · Remediation: AI block · Analytics: scenario_answered {id: S03}*

**Scenario:** An online store shows a "Recommended for you" shelf. The ranking is different for every customer, and it shifts as people browse and buy.

**Correct classification:** AI-assisted. **Additional accepted:** none.
**The clue:** ranking learned from behaviour patterns; varies by person.

**Feedback - AI-assisted (correct):** Correct. The clue is "different for every customer, and it shifts as people browse." A ranking learned from behaviour patterns - varying with the data - is a pattern-based system at work.
**Feedback - Traditional software:** Not quite - here's the clue: the ranking varies by person and shifts with behaviour. Written rules would give everyone the same shelf. Variation tracking behaviour is learned patterns. Review: Artificial intelligence.
**Feedback - Automation:** Not quite - the shelf does appear without anyone's effort, but the scenario describes how the ranking is decided: from behaviour patterns, differently per person. That's a learned judgment. Review: Artificial intelligence.
**Feedback - Combination:** Not quite - a store around this shelf certainly uses rules too, but the scenario asks about the described feature: a behaviour-learned, per-person ranking. Classify the feature. Review: Artificial intelligence.
**Feedback - Not enough information:** Not quite - the mechanism is described: rankings built from browsing and buying behaviour, varying per person. That's evidence of learned patterns. Review: Artificial intelligence.

**Explanation:** Personalization can be rules or patterns - the deciding evidence here is per-person variation that tracks behaviour, which written rules don't produce.
**Optional follow-up:** If the shelf were instead labelled "Bestsellers this week - same list for everyone", which label would fit? *(Answer: traditional software - a fixed popularity rule.)*

### P1-ACT-001-S04 - Payroll on the 25th
*Difficulty: foundational · LO2, LO7 · Misconceptions: M2 · Remediation: automation block · Analytics: scenario_answered {id: S04}*

**Scenario:** A company's payroll runs on the 25th of every month: salaries are calculated from timesheets and payments go out.

**Correct classification:** Automation. **Additional accepted:** none.
**The clue:** scheduled repetition of a fixed process.

**Feedback - Automation (correct):** Correct. The clue is "the 25th of every month" - a schedule triggering a fixed process. Scheduled repetition with less manual effort is automation.
**Feedback - Traditional software:** Not quite - the salary math is written rules, true. But the scenario's defining feature is the schedule running the whole process unattended. That flow is automation. Review: Automation.
**Feedback - AI-assisted:** Not quite - here's the clue: nothing here is learned. Timesheets in, fixed calculation, payments out, on a schedule. Repetition isn't intelligence. Review: Automation.
**Feedback - Combination:** Not quite - only rule-based steps on a schedule are described. No learned judgment, no human decision inside the run. Review: Automation.
**Feedback - Not enough information:** Not quite - the description gives you the mechanism: a schedule, timesheets, salary calculation. That settles it as automation. Review: Automation.

**Explanation:** You met this one in the lesson - deliberately. Retrieving it again a few minutes later is what makes it stick.

> INTERNAL VALIDATION NOTE:
> Spaced retrieval of the P1-LESSON-003 micro-check case; see validation note.

### P1-ACT-001-S05 - The unusual purchase
*Difficulty: applied · LO3, LO6, LO7 · Misconceptions: M4 · Remediation: AI block (probabilistic passage) · Analytics: scenario_answered {id: S05}*

**Scenario:** Your bank sends an alert: a purchase on your card was flagged as unusual, and it asks you to confirm it was really you.

**Correct classification:** AI-assisted. **Additional accepted:** none.
**The clue:** "unusual" means deviation from your pattern - probabilistic by nature.

**Feedback - AI-assisted (correct):** Correct. The clue is the word "unusual" - unusual compared to your pattern of spending. Judging deviation from a learned pattern is probabilistic, which is why the bank asks rather than blocks.
**Feedback - Traditional software:** Not quite - a written rule looks like "flag anything over $2,000." "Unusual" is relative to your history - a learned pattern, not a fixed threshold. Review: Artificial intelligence.
**Feedback - Automation:** Not quite - the alert is delivered automatically, but the scenario hinges on the judgment: deciding a purchase is "unusual" for you. That decision is pattern-based. Review: Artificial intelligence.
**Feedback - Combination:** Not quite - a fair instinct, since delivery involves ordinary software. But the described feature is the flag itself, and that judgment is pattern-based. Classify the feature. Review: Artificial intelligence.
**Feedback - Not enough information:** Not quite - "flagged as unusual" is the evidence: unusual is measured against your pattern, which means a learned, likelihood-based judgment. Review: Artificial intelligence.

**Explanation:** The confirmation request is honesty about probability: the system produces a likelihood, not a certainty - sometimes wrong, by design.

### P1-ACT-001-S06 - The chatbot with a menu
*Difficulty: applied · LO1, LO5, LO7 · Misconceptions: M12, M5 · Remediation: traditional-software block · Analytics: scenario_answered {id: S06} · Order: fixed, always immediately before S07*

**Scenario:** A delivery company's chat assistant greets you with a fixed menu of options - "Track my parcel", "Change my address", "Talk to support." Each choice leads to another set list of options.

**Correct classification:** Traditional software. **Additional accepted:** none.
**The clue:** a decision tree is written rules, despite the chat interface.

**Feedback - Traditional software (correct):** Correct. The clue is "a fixed menu of options." A decision tree is written rules, so this chat window is traditional software underneath.
**Feedback - AI-assisted:** Not quite - here's the clue: "a fixed menu of options." A decision tree is written rules, so this chat window is traditional software underneath. The interface looks conversational; the mechanism isn't. Review: Traditional software.
**Feedback - Automation:** Not quite - nothing runs on a trigger here; you're navigating a menu. Set lists of choices are written rules wearing a chat interface. Review: Traditional software.
**Feedback - Combination:** Not quite - only one mechanism is described: fixed menus leading to fixed menus. No learned step is anywhere in the description. Review: Traditional software.
**Feedback - Not enough information:** Not quite - the mechanism is visible: every path is a pre-written list. That's a decision tree, which is written rules. Review: Traditional software.

**Explanation:** Hold this one in mind - the next scenario looks identical from the outside.

### P1-ACT-001-S07 - The chatbot that writes
*Difficulty: applied · LO3, LO5, LO7 · Misconceptions: M5, M3 · Remediation: AI block · Analytics: scenario_answered {id: S07} · Order: fixed, always immediately after S06*

**Scenario:** A different company's chat assistant answers any question you type, in free-form sentences - and phrases things a little differently each time.

**Correct classification:** AI-assisted. **Additional accepted:** none.
**The clue:** generated, variable output - pattern-based.

**Feedback - AI-assisted (correct):** Correct. The clue is "any question, in free-form sentences, phrased differently each time." Generated, variable output is pattern-based. Note what settled it - the mechanism, not the chat window. The last chatbot had the same window and no AI.
**Feedback - Traditional software:** Not quite - compare the previous scenario: that one had fixed menus. This one handles any question with wording that varies - no written list could do that. Generated output is learned patterns. Review: Artificial intelligence.
**Feedback - Automation:** Not quite - no trigger-and-chain here; the defining feature is free-form, varying answers to anything you type. That's generation from learned patterns. Review: Artificial intelligence.
**Feedback - Combination:** Not quite - the product around it surely includes ordinary software, but the described feature - free-form, variable answers - is the AI part, and it's what the scenario asks about. Review: Artificial intelligence.
**Feedback - Not enough information:** Not quite - the evidence is in the behaviour: unrestricted questions, generated sentences, varying phrasing. Written rules can't produce that. Review: Artificial intelligence.

**Explanation:** Scenarios 6 and 7 are the same interface with different mechanisms. That's the lesson: you can't classify from the window - only from the behaviour or the description of what's underneath.

### P1-ACT-001-S08 - The arrival time
*Difficulty: challenging · LO4, LO5, LO7 · Misconceptions: M10 · Remediation: combined block + diagram · Analytics: scenario_answered {id: S08}*

**Scenario:** A navigation app plans your route, shows live traffic, and predicts you'll arrive at 5:42 - updating the estimate as conditions change.

**Correct classification:** Combination. **Additional accepted (partially correct):** AI-assisted.
**The clue:** rules (routing) + live data + learned prediction working together.

**Feedback - Combination (correct):** Correct. The clue is the stack: routing over a map is rules, live traffic is data flowing in automatically, and the arrival prediction is learned from patterns. Three mechanisms, one screen.
**Feedback - AI-assisted (partially correct):** You caught the AI layer - the arrival prediction is learned from traffic patterns. There's more happening here, though: rule-based routing and automatic live data sit under it. The best label is Combination. Review: Combined systems.
**Feedback - Traditional software:** Not quite - the map and turn logic are rules, but "predicts you'll arrive at 5:42, updating as conditions change" is a likelihood learned from patterns. More than one mechanism is at work. Review: Combined systems.
**Feedback - Automation:** Not quite - live updates do flow in automatically, but the scenario also describes rule-based routing and a learned prediction. That's several mechanisms cooperating: a combination. Review: Combined systems.
**Feedback - Not enough information:** Not quite - the description is unusually generous: mapping rules, live traffic, and a pattern-based prediction are all named. That's a combination in plain sight. Review: Combined systems.

**Explanation:** Real products stack mechanisms. The skilled read names the layers rather than forcing one label onto the whole screen.

### P1-ACT-001-S09 - The support queue
*Difficulty: challenging · LO4, LO5, LO7 · Misconceptions: M6, M14 · Remediation: combined block + diagram · Analytics: scenario_answered {id: S09}*

**Scenario:** A company's support platform sorts incoming messages into topic queues using a system trained on past tickets - and a support agent reads and answers each one.

**Correct classification:** Combination. **Additional accepted (partially correct):** Automation.
**The clue:** automation routes, AI classifies, a human decides.

**Feedback - Combination (correct):** Correct. The clue is all three layers in one sentence: messages route automatically, a system trained on past tickets classifies them, and a person decides the answer. That's the full stack from the diagram.
**Feedback - Automation (partially correct):** You caught the routing layer - messages do flow through a chain. There's more here, though: "trained on past tickets" is a learned classifier, and an agent makes the final call. Together, that's a combination. Review: Combined systems.
**Feedback - Traditional software:** Not quite - here's the clue: "trained on past tickets." Trained means learned patterns, not written rules - and a human decision sits on top. Several mechanisms: a combination. Review: Combined systems.
**Feedback - AI-assisted:** Not quite - the trained classifier is real, but it's one layer. Routing chains the work and a person answers. The honest label for the whole is Combination. Review: Combined systems.
**Feedback - Not enough information:** Not quite - this description names its mechanisms: automatic sorting, a system trained on past tickets, a human answering. Everything you need is stated. Review: Combined systems.

**Explanation:** This is the support-platform walkthrough from the lesson, met in the wild: interface, records, routing, AI classification, human review.

### P1-ACT-001-S10 - Smart technology
*Difficulty: challenging · LO8, LO9 · Misconceptions: M9, M8, M1 · Remediation: scenario-10 explanation + LO9 passage · Analytics: scenario_answered {id: S10}*

**Scenario:** An app's store page says: "Our app uses smart technology to organize your photos."

**Correct classification:** Not enough information. **Additional accepted:** none.
**The clue:** marketing language describes the promise, not the mechanism.

**Feedback - Not enough information (correct):** Correct - and this is the skilled answer, not a shrug. "Smart technology" describes the promise, not the mechanism. Organizing photos could be date-and-location rules or learned face recognition; the page doesn't say. Naming what's missing is the skill.
**Feedback - AI-assisted:** Not quite - here's the clue: "smart technology" is a label, not a description. Photo organization can be rules (date, location) or learned patterns (faces). The page gives you the word, not the mechanism. Review: the marketing-claims passage.
**Feedback - Traditional software:** Not quite - it might be. Sorting by date and location would be rules. But nothing on the page settles it either way, and guessing isn't classifying. Review: the marketing-claims passage.
**Feedback - Automation:** Not quite - organizing does happen without effort, but the question is how it decides - rules or learned patterns - and the page never says. When the mechanism is hidden, say so. Review: the marketing-claims passage.
**Feedback - Combination:** Not quite - plausible, but plausible isn't evidence. The page describes an outcome and attaches a label. Nothing stated distinguishes rules from learned patterns. Review: the marketing-claims passage.

**Explanation:** Words like smart, intelligent, personalized, and AI-powered are chosen by marketing teams. They can be true; they're never evidence. The question that cuts through: what does this feature learn, and from what?
**Optional follow-up:** Write the one question you'd ask this app's maker. *(Feeds P1-REF-006; never graded.)*

---

## Activity states (learner-facing copy)

- **Selection state:** labels render as five equal buttons/options; the current selection is indicated by a text state ("Selected") plus a visual state, never colour alone.
- **Confirmation behaviour:** selection then a Check answer action (two-step, so a stray tap never commits an answer). After feedback: Continue.
- **Correct state:** verdict-led feedback as written above; announced to screen readers.
- **Incorrect state:** verdict-led feedback as written above; the "Review" link is the remediation chip for the category.
- **Partially correct state (S08, S09 designated options):** acknowledgment-led feedback as written; counted separately in analytics.
- **Try-again behaviour:** not offered within a scenario (feedback names the category); "Try the set again" appears on the summary and reruns all ten with shuffled order, 6→7 pair kept adjacent and ordered.
- **Show-explanation behaviour:** after any answer, a Show explanation disclosure reveals the Explanation text (and follow-up, where present).
- **Skip behaviour:** Skip this one is always available; skipped items are listed on the summary with a Return to it link.
- **Completion state (summary):** "Ten scenarios sorted. Here's your read." Per-category strengths named first ("You read automation confidently - four for four"), then growth areas framed as review links, never as failures. Includes the diagnostic reveal block (P1-DIAG-001) and reflection prompt P1-REF-001. CTA: Continue to the knowledge check. Secondary: Try the set again.
- **Resume state:** "Welcome back - you were on scenario {n} of 10. Your earlier answers are saved." CTA: Pick up where you left off.
- **Error state:** "Something went wrong loading this activity. Your answers so far are saved." CTA: Try loading again. Secondary: Back to the lesson.
- **Offline state:** "You're offline. Sort the System needs a connection to save your answers." CTA: Retry connection. Secondary: Back to the lesson (reading works offline where cached).
- **Mobile behaviour / keyboard behaviour / screen-reader behaviour:** specified in `activity-accessibility.md`; mechanics canonical in UX §S04.

## Analytics events (per CS §6.3, UX §8.1)

`scenario_answered {scenario_id, selected_label, result: correct|partial|incorrect, attempt_number, skipped, time_ms}` · `activity_completed {first_attempt_accuracy, per_category_results}` · `activity_retried` · content-QA readouts: items <40% or >95% first-attempt accuracy reviewed; 6/7 order effects monitored; "Not enough information" overuse (chosen when evidence sufficed) triggers instruction-wording review.

---

> INTERNAL VALIDATION NOTE:
> S04 deliberately repeats the payroll case from the P1-LESSON-003 micro-check as spaced retrieval; if pilot shows near-100% accuracy with no learning value, swap in the recurring-report variant from the approved pool. The no-within-scenario-retry decision and the two-step confirm are testable assumptions. S09's scenario text states "trained on past tickets" so the keyed answer is derivable from evidence - flagging that this wording is slightly more generous than the CS summary, by design, to keep the item fair.
