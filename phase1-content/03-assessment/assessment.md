# Assessment

```yaml
content_id: P1-ASM-001
content_type: graded-assessment
title: Assessment - AI, Automation and Traditional Software
phase: 4
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO1–LO10]
estimated_time: 5–8 minutes
required_or_optional: the only completion condition, on any route
prerequisites: none (assessment-first route is a first-class entry)
assessment_links: [core bank P1-QB-001..010]
remediation_links: [category mapping per P1-FND-006]
accessibility_requirements: activity-accessibility.md; delivery UX §S06–S08, Eng §9
content_status: draft-for-validation
```

## Assessment introduction (learner-facing)

**Assessment: AI, Automation and Traditional Software**

Six questions, drawn fresh each attempt. Passing shows you can use the distinctions - not that you memorized wording. There's no time limit, you can review your answers before submitting, and if it doesn't go your way, you'll get a specific study plan and a new set of questions whenever you're ready.

## Passing requirement (learner-facing)

You'll need five of six correct to pass.

## Attempt rules

- Six questions per attempt (within the corrected 6–7 range, reconciliation R10), drawn as: the ambiguity item + the misconception item + one AI-characteristics item + one combined-systems item + one classification item (industry variant rotated) + one of the traditional-software/automation items. Six categories per attempt (≥6 required). ✓
- Pass mark: 5 of 6 (83.3%, satisfying the ≥80% provisional threshold). Score displayed as n of 6 with its meaning, never a bare percentage.
- Retakes: unlimited; different combination (the AI/combined/classification slots rotate items and variants; the trad/auto slot alternates); answer order rotated except items marked fixed-order; category coverage preserved (Eng §9.2).
- Multiple-select items score correct only when the selected set matches the keyed set exactly; partial selections are acknowledged in feedback, not scored. *(Provisional - see validation notes.)*
- Feedback timing: per-question explanations appear on the results screen, not mid-attempt (the knowledge check is where mid-flow feedback lives).

## Behavioural states (learner-facing copy; mechanics canonical in UX §S06–S07, Eng §9)

- **Save and resume:** answers save per question. Resume: "Welcome back - you're on question {n} of 6. Everything so far is saved."
- **Unanswered-question behaviour:** review screen lists unanswered items as links: "Two questions still need an answer." Submission with unanswered items requires explicit confirmation; unanswered items score as not correct and the confirmation says so plainly.
- **Review-before-submit:** "Review your answers" lists all six with your selections; each links back.
- **Final submission confirmation:** "Submit your answers? You can review them first - after submitting, this attempt is scored." CTAs: Submit · Keep reviewing.
- **Interrupted state:** on return: "Your attempt was interrupted, and your answers are saved. Pick up at question {n}."
- **Offline state:** "You're offline. The assessment needs a connection to save answers. Nothing you've entered is lost." CTA: Retry connection.
- **Error state:** "Something went wrong on our side. Your answers are saved." CTA: Try again · Secondary: Back to the section.

---

## Core bank (P1-QB-001 – P1-QB-010)

Shared accessibility note: every item is a labelled radio group (or checkbox group for multiple select) with no time limit; option order rotates unless marked; feedback and results are announced per `activity-accessibility.md`.

### P1-QB-001 - Why the converter counts
*Type: best-explanation multiple choice · Category: Traditional software · Difficulty: foundational · LO1, LO6 · Misconception: M1 · Remediation: traditional-software block · Dependency: P1-LESSON-002 Quick · Randomization: options rotate*

**Question:** A currency converter multiplies the amount you enter by today's rate stored in its table. Why does this count as traditional software?

- A) Because it follows written rules applied to your input - the same amount and rate always give the same result *(correct)*
- B) Because it's a simple app, and simple apps can't be AI
- C) Because it doesn't connect to the internet
- D) Because a person checks every conversion

**Explanation (correct):** Correct. The clue is the stored rate and the fixed multiplication: written rules, deterministic output.
**Explanation (incorrect):** Not quite - the deciding evidence is the mechanism: a stored rate applied by a fixed calculation. Simplicity, connectivity, and human checking are beside the point; written rules with repeatable output define traditional software. Review: Traditional software.
**Option note - B:** simplicity isn't the criterion; complex tax software is also rules (M1's mirror image).

### P1-QB-002 - The 2am backup
*Type: scenario decision · Category: Automation · Difficulty: foundational · LO2, LO5 · Misconception: M2 · Remediation: automation + combined blocks · Dependency: P1-LESSON-003 · Randomization: options rotate*

**Question:** Every night at 2am, a company's files back up to the cloud with nobody involved. Which statement is most accurate?

- A) It's automation, and nothing described involves AI *(correct)*
- B) It's automation, so AI must be involved
- C) It's AI, because it happens without people
- D) It's traditional software, because computers are involved

**Explanation (correct):** Correct. The clue is the schedule: a trigger running a fixed process is automation, and no step described makes a learned judgment.
**Explanation (incorrect):** Not quite - "every night at 2am" is a schedule firing a fixed chain: automation. Effort removed doesn't mean intelligence added, and automation neither implies nor excludes AI - here, none is described. Review: Automation.

### P1-QB-003 - The junk folder miss
*Type: best-explanation multiple choice · Category: AI characteristics · Difficulty: foundational · LO3, LO6 · Misconceptions: M4, M7 · Remediation: AI block (probabilistic passage) · Dependency: P1-LESSON-004 · Randomization: options rotate*

**Question:** A spam filter sometimes puts a real message in the junk folder. What's the most accurate description of what's happening?

- A) The filter is broken and needs its rules fixed
- B) Pattern-based systems produce likelihoods, so occasional misses are part of the design *(correct)*
- C) The filter was given the wrong list of spam senders
- D) This proves the filter doesn't use AI

**Explanation (correct):** Correct. The clue is "sometimes" - a likelihood-based judgment that's usually right and occasionally wrong is a pattern-based system operating as designed.
**Explanation (incorrect):** Not quite - a false positive isn't breakage or proof of anything missing. Learned patterns yield likelihoods, not certainties, so useful-and-sometimes-wrong is the expected shape. Review: Artificial intelligence.

### P1-QB-004 - The fluent translator
*Type: best-explanation multiple choice · Category: AI characteristics · Difficulty: applied · LO3, LO10 · Misconceptions: M3, M13 · Remediation: AI block (M3 passage; Go Deeper training passage) · Dependency: P1-LESSON-004 · Randomization: options rotate*

**Question:** A translation app converts your sentences into another language, fluently. Which claim about it is accurate?

- A) It understands both languages the way a bilingual person does
- B) It applies patterns learned from many example translations *(correct)*
- C) It looks every sentence up in a stored list of translations
- D) It relearns your language habits from each sentence you type

**Explanation (correct):** Correct. The clue is fluency across sentences nobody stored in advance - that's generation from learned patterns, not lookup and not comprehension.
**Explanation (incorrect):** Not quite - fluency comes from patterns learned from many example translations. No stored list covers every sentence, comprehension isn't established by fluent output, and using the app isn't retraining it. Review: Artificial intelligence.

### P1-QB-005 - Name every mechanism
*Type: multiple select · Category: Combined systems · Difficulty: applied · LO4, LO5, LO7 · Misconception: M14 · Remediation: combined block + diagram · Dependency: P1-LESSON-005 · Randomization: variant rotated per attempt; options rotate*

**Variant A (banking):** A banking app shows your balance, runs your scheduled transfer on the 1st, and flags purchases unusual for your spending. Select every mechanism described.
**Variant B (retail):** An online store lists prices and handles checkout, emails a receipt after every order, and ranks a "recommended for you" shelf that varies by customer. Select every mechanism described.

- A) Traditional software *(keyed)*
- B) Automation *(keyed)*
- C) AI *(keyed)*
- D) Human review *(not keyed)*

**Explanation (correct):** Correct. Balance/prices are written rules; the scheduled transfer/receipt is a trigger-driven chain; the unusual-purchase flag/per-customer ranking is a learned judgment. No human step is described.
**Explanation (incorrect):** Not quite - go layer by layer: stored records and fixed calculations are rules; the scheduled or triggered step is automation; the judgment that varies with behaviour is AI. Human review isn't in the description. Review: Combined systems.

### P1-QB-006 - The no-show predictor
*Type: best-statement multiple choice · Category: Combined systems · Difficulty: challenging · LO5, LO7 · Misconceptions: M6, M14 · Remediation: combined block + diagram · Dependency: P1-LESSON-005 · Randomization: variant rotated; options rotate*

**Variant A (healthcare):** A clinic's system stores appointment records, sends reminders three days ahead, and uses a model trained on past no-shows to predict who might miss - staff decide who gets a phone call. Which statement is most accurate?
**Variant B (education):** A college's system stores enrolment records, emails schedule reminders, and uses a model trained on past attendance to predict which students may disengage - advisors decide who to contact. Which statement is most accurate?

- A) The whole system is AI
- B) The prediction step is AI-assisted; the rest is rules, automation, and people *(correct)*
- C) Since people make the final decision, no AI is involved
- D) The reminders are the AI part

**Explanation (correct):** Correct. The clue is "trained on past..." - that one step is a learned prediction. Records are rules, reminders are automation, and the human call is human review: one AI-assisted layer inside a combined system.
**Explanation (incorrect):** Not quite - classify layer by layer. "Trained on past" marks the learned step; storage is rules; scheduled reminders are automation; people deciding is human review. One AI layer doesn't make the whole system AI, and human involvement doesn't erase it. Review: Combined systems.

### P1-QB-007 - Sort it: the unattended step
*Type: five-label classification · Category: Classification · Difficulty: applied · LO2, LO7 · Misconception: M2 · Remediation: activity summary + automation block · Dependency: P1-ACT-001 · Randomization: variant rotated; label order fixed (canonical five)*

**Variant A (workplace):** An email tool sends your out-of-office reply to every message that arrives while you're away. Best label?
**Variant B (logistics):** A warehouse system prints a shipping label the moment an order is paid. Best label?

Options (fixed order): Traditional software · Automation *(correct)* · AI-assisted · Combination · Not enough information

**Explanation (correct):** Correct. The clue is the trigger - a message arrives / an order is paid - firing a fixed action every time. That's a chain running on its setup.
**Explanation (incorrect):** Not quite - look for the trigger-and-action shape: an event fires, a pre-set step runs, identically each time. No judgment is described, and the mechanism is stated, so the evidence settles it as automation. Review: Automation.

### P1-QB-008 - Sort it: the shifting output
*Type: five-label classification · Category: Classification · Difficulty: applied · LO3, LO7 · Misconception: M8 · Remediation: activity summary + AI block · Dependency: P1-ACT-001 · Randomization: variant rotated; label order fixed*

**Variant A (media):** A music service's weekly mix is different for every listener and shifts with what they play. Best label?
**Variant B (banking):** A bank's loan pre-check estimates each applicant's approval likelihood from patterns in past applications. Best label?

Options (fixed order): Traditional software · Automation · AI-assisted *(correct)* · Combination · Not enough information

**Explanation (correct):** Correct. The clue is output that varies with behaviour/patterns - per-listener mixes, per-applicant likelihoods. Learned patterns produce that; written rules don't.
**Explanation (incorrect):** Not quite - the evidence is variation tracking the data: different for every person, built from past examples, expressed as estimates. That's a pattern-based judgment. Review: Artificial intelligence.

### P1-QB-009 - The adaptive routine
*Type: five-label classification · Category: Ambiguity · Difficulty: challenging · LO8, LO9 · Misconception: M9 · Remediation: scenario-10 explanation + LO9 passage · Dependency: P1-ACT-001-S10 · Randomization: label order fixed; always included in every attempt*

**Question:** A fitness app's store page says it "adapts intelligently to your routine." From this alone, what's the best label?

Options (fixed order): Traditional software · Automation · AI-assisted · Combination · Not enough information *(correct)*

**Explanation (correct):** Correct - and it's the skilled answer. "Adapts intelligently" describes a promise, not a mechanism. Adapting could be a written rule (harder workouts every two weeks) or learned patterns; the page doesn't say.
**Explanation (incorrect):** Not quite - nothing in "adapts intelligently to your routine" reveals how it decides. It reads like evidence of AI, and that's the trap: marketing words describe outcomes and promises. When the mechanism is hidden, saying so is the accurate classification. Review: the marketing-claims passage.

### P1-QB-010 - The twelve-country invoicer
*Type: best-response multiple choice · Category: Misconceptions · Difficulty: applied · LO8 · Misconceptions: M1, M2 · Remediation: misconception callout + M1 corrective · Dependency: P1-LESSON-005 callout · Randomization: options rotate · Always included in every attempt*

**Question:** A colleague says: "Our new invoicing tool must be AI - it handles hundreds of tax rules across 12 countries." What's the best response?

- A) Agree - nothing that complex could run on ordinary rules
- B) Point out that complexity doesn't reveal the mechanism: many written rules are still written rules *(correct)*
- C) Say it's AI only if it runs in the cloud
- D) Ask whether it's automated - automated and AI mean the same thing

**Explanation (correct):** Correct. The clue is in the claim itself: "hundreds of tax rules." Rules authored by people, however many, are traditional software. Impressiveness measures effort, not mechanism.
**Explanation (incorrect):** Not quite - scale doesn't change the nature: a bigger vending machine is still a vending machine. Cloud hosting is irrelevant, and automation is a separate question from AI. The tell is "rules" - written, deterministic, traditional. Review: the misconception callout.

---

> INTERNAL VALIDATION NOTE:
> Provisional decisions for pilot review: 6-question attempts with pass at 5/6; all-or-nothing multiple-select scoring; QB-009 and QB-010 fixed in every draw (guarantees ambiguity + misconception coverage but reduces retake variety for those slots - the extended bank's swaps QB-038/039 and QB-040/041 relieve this once approved). Core difficulty split lands at 3 foundational / 5 applied / 2 challenging (30/50/20) against the ~40/45/15 target - within tolerance for a 10-item bank; rebalance from the extended bank if pilot shows the first attempt running hard.
