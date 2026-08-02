# Artificial intelligence

```yaml
content_id: P1-LESSON-004
content_type: lesson-concept
title: Artificial intelligence
phase: 2
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO3, LO6, LO10]
estimated_time: 4 minutes core; +5 with optional layers
required_or_optional: Quick layer required surface; Explore/Deeper optional
prerequisites: P1-LESSON-002, P1-LESSON-003
concept_tags: [artificial-intelligence, pattern-based-system, probabilistic-output, model, training]
misconception_tags: [M3, M4, M7, M12, M13]
assessment_links: [P1-ASM-001 AI-characteristics category, P1-KC-001]
remediation_links: [P1-REM-003, P1-REM-004, P1-REM-007, P1-REM-012, P1-REM-013]
accessibility_requirements: layers as labelled disclosures with reading time; feedback announced; CS §12
content_status: draft-for-validation
```

Glossary chips in this lesson: artificial intelligence (AI) · pattern-based system · probabilistic output · model · training · generative AI.

---

## Quick Explanation *(always visible)*

Artificial intelligence means systems that find patterns in data to classify, predict, or generate things — instead of only following written rules.

The best everyday comparison is a weather forecast. A forecast is built from patterns in years of past weather. It speaks in likelihoods — "70% chance of rain" — and it's genuinely useful while sometimes being wrong. Nobody wrote a rule that says "clouds like these mean rain on Tuesdays." The pattern was learned from many examples.

That's the core difference from everything you've seen so far: traditional software follows rules people wrote; AI systems apply patterns learned from data. And like a forecast, their outputs can vary — and can miss.

## Explore Further *(optional · about 1.5 minutes)*

What do pattern-based systems actually do all day? Five jobs cover most of it:

**Predicting** — estimating something not directly known, like your arrival time in traffic. **Classifying** — sorting things into categories, like flagging an email as spam. **Recommending** — ranking what you're likely to want, like a product feed. **Recognizing** — identifying what something is, like the words in your voice message. **Generating** — producing new content, like a chatbot writing free-form text.

Notice how quiet most of that is. No robot, no conversation, no face. A fraud flag on your card is AI doing its job in complete silence.

Now the part that trips people up: a spam filter will sometimes put a real message in your junk folder. That's not the filter breaking — it's a pattern-based system operating exactly as designed. Patterns produce likelihoods, not certainties, so the outputs can vary and can be wrong. Useful and fallible at the same time. The same is true when a chatbot answers the same question two different ways: variability is the nature of the mechanism, not a defect in it.

And the forecast comparison carries one more lesson. The forecast doesn't know about your picnic. It detects patterns and produces likelihoods — there's no comprehension in there, however fluent the output sounds. AI systems detect, classify, and generate; they don't understand the way you do.

## Go Deeper *(optional · about 2 minutes)*

A few distinctions make everything else clearer.

**Training versus using.** Before an AI system ships, it's shown many examples — that's training, and the examples are its training data. Training produces a **model**: the learned pattern-map the system uses from then on. When you use the product, you're giving that trained model an input and receiving an output. You are not retraining it with every tap. Collecting your data, and later updating the product or the model, are separate steps that may or may not happen — a speech recognizer doesn't rewire itself with each sentence you dictate; improvements arrive as updates.

**The model versus the product.** The model is one component. Around it sits everything from the traditional-software lesson: interface, database, security, workflows. "An AI product" is really a product with an AI component inside rule-based scaffolding.

**Claims versus evidence.** "AI-powered" on a box tells you what the marketing team chose, not how the system works. The question that cuts through: what patterns would this system have learned, from what data, to do this job? If a description can't support that question, you don't yet know it's AI — and saying so is a skill, not a shrug.

## Apply It — micro-check

**You ask a chatbot the same question twice and get two differently worded answers. What's the best explanation?**

- A) The chatbot is malfunctioning
- B) Pattern-based systems produce outputs that can vary *(correct)*
- C) Someone rewrote its rules between your two questions

**Feedback — B (correct):** Correct. The clue is "the same question twice" — a rule-based system would repeat itself exactly. Varying output is the signature of a pattern-based system, working as designed.

**Feedback — A:** Not quite — here's the clue: nothing failed, the wording changed. Pattern-based systems generate from likelihoods, so variation is designed behaviour, not a malfunction. Review: Artificial intelligence.

**Feedback — C:** Not quite — no one edits rules between your messages. The clue is the variation itself: generated, pattern-based output naturally differs run to run, unlike written rules. Review: Artificial intelligence.

## Reflection prompt

P1-REF-004 may surface here: "Pick a product you always assumed was AI. What's your actual evidence — and what would you need to check?"

## Transition to the next lesson

You now hold all three pieces: written rules, task chains, learned patterns. Real products almost never pick one — next, we put them side by side and then together.

---

## Accessibility descriptions

- Layer disclosures and micro-check behaviour as in P1-LESSON-002.
- The five-jobs list is a semantic list with the job name leading each item; bold is reinforced by the text structure, never meaning-bearing alone.
- The forecast example is textual. If illustrated later, alt text: "A weather forecast showing 70% chance of rain — a likelihood learned from past patterns." (≤125 characters.)

---

## Presentation reuse (internal — not learner-facing)

- **Slide title:** AI: patterns learned from data
- **One-sentence takeaway:** AI systems apply patterns learned from data to predict, classify, recommend, recognize, or generate — usefully, and sometimes wrongly, by design.
- **Supporting points:** learned patterns vs written rules · five jobs: predict, classify, recommend, recognize, generate · outputs are likelihoods — the spam filter's false positive is normal operation · the forecast doesn't know about your picnic: pattern, not comprehension · trained before shipping; using ≠ retraining
- **Suggested visual:** weather forecast card ("70% rain") beside a spam folder holding one real message
- **Speaker note:** The false-positive story is the emotional pivot — it converts "AI is wrong, so it's bad" into "AI is probabilistic, so check it." Keep verbs clean: detect, classify, generate; never think, know, understand.

> INTERNAL VALIDATION NOTE:
> Quick 112 words, Explore 248, Deeper 249 — within CS §3.2 budgets. Explore runs near its ceiling because it carries both the M4/M7 passage and the M3 passage; if pilot cognitive-load signals flag it, the M3 paragraph moves to Go Deeper. The picnic line and the five-step training sequence are commitments: remediation (Phase 5) must use fresh examples (translation app for M3; photo-app update cycle for M13).
