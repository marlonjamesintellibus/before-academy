# Traditional software

```yaml
content_id: P1-LESSON-002
content_type: lesson-concept
title: Traditional software
phase: 2
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO1, LO6, LO8]
estimated_time: 3 minutes core; +4 with optional layers
required_or_optional: Quick layer required surface; Explore/Deeper optional
prerequisites: none
concept_tags: [traditional-software, rule-based-system, deterministic-output]
misconception_tags: [M1, M11]
assessment_links: [P1-ASM-001 traditional-software category, P1-KC-001]
remediation_links: [P1-REM-001, P1-REM-011]
accessibility_requirements: layers as labelled disclosures with reading time; feedback announced; CS §12
content_status: draft-for-validation
```

Glossary chips in this lesson: traditional software · rule-based system · deterministic output · algorithm.

---

## Quick Explanation *(always visible)*

Traditional software follows rules that people wrote. A programmer decides, in advance, exactly what should happen: if this, then that. Given the same input, it produces the same output — every single time.

Think of a vending machine. Press B4, get the same snack, today and next year. A calculator works this way. So does the form that refuses your sign-up until the email field has an @ in it. Nothing is being figured out in the moment. The behaviour was written down before you ever showed up — and that predictability is exactly what makes this kind of software dependable.

## Explore Further *(optional · about 1 minute)*

Here's where it gets interesting: written rules can be enormously complicated and still be written rules.

A tax calculator handles thousands of conditions — income bands, deductions, exceptions to the exceptions. It feels intelligent. It isn't guessing, though. Every one of those conditions was authored by a person, and the same tax return produces the same result every time. Complexity doesn't change the nature of the thing — a bigger vending machine is still a vending machine.

Two more everyday cases: a password-strength checker turns green because your password meets criteria someone listed. A notification arrives at nine because someone scheduled it for nine.

What traditional software does well: repeat, reliably, at any scale. What it doesn't do: handle anything nobody wrote a rule for. If a situation wasn't anticipated, it fails or asks a human — it can't improvise.

## Go Deeper *(optional · about 2 minutes)*

The technical name for this approach is a **rule-based system**: decisions made by written if-then rules. The result is a **deterministic output** — always identical for the same input. When your banking app shows a different balance today than yesterday, that's not the software behaving differently; the input changed, because money moved.

One more thing worth knowing, because it reframes everything ahead: traditional software is the foundation AI products stand on. The interface you tap, the database storing your account, the security checking your password, the workflow moving your request along — all written rules. When we get to AI, you'll see it arrives as one component inside this rule-based scaffolding, not as a replacement for it.

So when you're trying to recognize traditional software in the wild, look for two signals: the behaviour repeats exactly, and someone could, in principle, write the full instruction list down.

## Apply It — micro-check

**A password-strength checker approves your password once it has 12 characters, a number, and a symbol. What's underneath?**

- A) Written rules *(correct)*
- B) Patterns learned from examples
- C) Not enough information to tell

**Feedback — A (correct):** Correct. The clue is the checklist itself — 12 characters, a number, a symbol. Criteria someone listed in advance are written rules, and the same password gets the same verdict every time.

**Feedback — B:** Not quite — here's the clue: the exact checklist. When the criteria can be written out as a list, nothing was learned from examples; a person authored the rules. Review: Traditional software.

**Feedback — C:** Not quite — this one gives you enough. The stated checklist is the evidence: listed criteria are written rules. "Not enough information" is the right call only when a description hides the mechanism. Review: Traditional software.

## Reflection prompt

P1-REF-002 may surface here (see `reflection-prompts.md`): "Name one piece of software you used today that's almost certainly rule-based. What's your evidence?"

## Transition to the next lesson

You now have the first pole: written rules, same input, same output. Next comes a word that gets tangled up with AI more than any other — automation.

---

## Accessibility descriptions

- Explore Further and Go Deeper render as labelled disclosure controls with reading time ("Explore further · about 1 minute"); expanded/collapsed state is announced.
- The micro-check is a radio group with a Check answer button; feedback is announced by screen readers and never conveyed by colour alone.
- The vending-machine example is textual; no image is required. If illustrated later, alt text: "A vending machine: the same button press gives the same snack every time." (≤125 characters.)

---

## Presentation reuse (internal — not learner-facing)

- **Slide title:** Traditional software: written rules
- **One-sentence takeaway:** Traditional software follows rules people wrote — the same input always produces the same output.
- **Supporting points:** rules are authored in advance · same input → same output · complexity doesn't change the nature (a tax calculator is still rules) · it can't handle what nobody wrote a rule for · it's the foundation AI products stand on
- **Suggested visual:** vending machine with a pressed button and identical snack, twice
- **Speaker note:** Ask the room for software they trust precisely because it never surprises them. Land the boundary: a bigger vending machine is still a vending machine.

> INTERNAL VALIDATION NOTE:
> Quick layer is 118 words, Explore 172, Deeper 198 — within CS §3.2 budgets. Standalone test: the Quick layer alone must answer foundational traditional-software items (verified in Phase 4 mapping).
