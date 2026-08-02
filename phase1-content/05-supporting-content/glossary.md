# Glossary

```yaml
content_id: P1-GLO-000 (set definition; entries P1-GLO-001..023)
content_type: glossary
title: Glossary - AI, Automation and Traditional Software
phase: 6
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §10 (standards; definitions §10.2 verbatim); terminology guide P1-FND-003
```

Rules applied (CS §10): plain definitions ≤25 words, behaviour-first, no circularity; a definition change is a canonical-record change, never a glossary-only edit. **Surfaced** entries appear as chips in the Phase 1 lesson; **record-only** entries ship in the record system for AI Literacy (context-first rule honoured: record-only terms are not surfaced before a lesson uses them). Entries P1-GLO-022/023 are Phase 1 additions beyond the CS 21, flagged for the document audit. Pronunciation guidance is included only where a term is commonly misread.

| ID | Term | Status · first appearance |
|---|---|---|
| 001 | Artificial intelligence (AI) | Surfaced · P1-LESSON-004 |
| 002 | Traditional software | Surfaced · P1-LESSON-002 |
| 003 | Automation | Surfaced · P1-LESSON-003 |
| 004 | Rule-based system | Surfaced · P1-LESSON-002 |
| 005 | Pattern-based system | Surfaced · P1-LESSON-004 |
| 006 | Deterministic output | Surfaced · P1-LESSON-002 |
| 007 | Probabilistic output | Surfaced · P1-LESSON-004 |
| 008 | Machine learning | Record-only |
| 009 | Model | Surfaced · P1-LESSON-004 |
| 010 | Algorithm | Surfaced · P1-LESSON-002 |
| 011 | Training | Surfaced · P1-LESSON-004 |
| 012 | Data | Record-only (used in prose; not chipped) |
| 013 | Prediction | Record-only (taught in prose) |
| 014 | Classification | Record-only (taught in prose) |
| 015 | Generative AI | Surfaced · P1-LESSON-004 |
| 016 | Prompt | Record-only |
| 017 | Output | Record-only (taught in prose) |
| 018 | Hallucination | Record-only |
| 019 | Bias | Record-only |
| 020 | Human review | Surfaced · P1-LESSON-005 |
| 021 | AI-assisted system | Surfaced · P1-LESSON-005 |
| 022 | Trigger *(addition)* | Surfaced · P1-LESSON-003 |
| 023 | Workflow *(addition)* | Surfaced · P1-LESSON-003 |

---

### P1-GLO-001 - Artificial intelligence (AI)
**Definition:** Systems that find patterns in data to classify, predict, or generate things - instead of only following written rules.
**Example:** A spam filter learning what junk mail tends to look like.
**What this does not mean:** software that thinks or understands like a person, or any product labelled "smart."
**Related:** pattern-based system, machine learning, model, generative AI.

### P1-GLO-002 - Traditional software
**Definition:** Software that follows rules people wrote, so the same input always produces the same output.
**Example:** A calculator - same numbers, same total, every time.
**What this does not mean:** old or simple software; a complex tax calculator is still traditional software.
**Related:** rule-based system, deterministic output, algorithm.

### P1-GLO-003 - Automation
**Definition:** Using technology to run or connect repeatable tasks with less manual effort.
**Example:** A receipt email sending itself the moment you buy something.
**What this does not mean:** AI. Automation describes how work flows; a chain may contain an AI step or none.
**Related:** trigger, workflow, AI-assisted system.

### P1-GLO-004 - Rule-based system
**Definition:** A system that decides using written if-then rules.
**Example:** "If the password is under 12 characters, reject it."
**Related:** traditional software, deterministic output.

### P1-GLO-005 - Pattern-based system
**Definition:** A system that decides using patterns learned from many examples.
**Example:** A filter flagging messages that resemble known spam.
**Related:** machine learning, model, training, probabilistic output.

### P1-GLO-006 - Deterministic output
**Definition:** A result that is always the same for the same input.
**Example:** The same tax return producing the same refund figure every time.
**Related:** rule-based system, traditional software.

### P1-GLO-007 - Probabilistic output
**Definition:** A result based on likelihood, which can vary or be wrong.
**Example:** "70% chance of rain" - useful, and sometimes it stays dry.
**What this does not mean:** a broken system; variation is designed behaviour.
**Related:** prediction, pattern-based system, hallucination.

### P1-GLO-008 - Machine learning *(record-only)*
**Definition:** A way of building AI where systems learn patterns from examples rather than being given rules.
**Example:** Showing a system thousands of labelled photos so it can recognize dogs.
**Related:** training, model, pattern-based system.

### P1-GLO-009 - Model
**Definition:** The learned pattern-map an AI system uses to make its outputs.
**Example:** The trained component inside a speech recognizer that turns sound into words.
**What this does not mean:** something that retrains itself every time you use it; updates usually ship separately.
**Related:** training, machine learning.

### P1-GLO-010 - Algorithm
**Definition:** A step-by-step procedure a computer follows to do a task.
**Example:** The steps a sort feature follows to put names in order.
**What this does not mean:** AI. Both rule-based and pattern-based systems use algorithms.
**Related:** traditional software, machine learning.
**Pronunciation:** AL-guh-rith-um.

### P1-GLO-011 - Training
**Definition:** Showing a system many examples so it can learn patterns.
**Example:** Feeding a filter millions of emails labelled "spam" or "not spam."
**What this does not mean:** what happens each time you use a product - that's giving a trained model an input.
**Related:** training data (see data), model, machine learning.

### P1-GLO-012 - Data *(record-only chip)*
**Definition:** The information systems store, process, or learn from.
**Example:** Your order history; the past weather behind a forecast.
**Related:** training, input, output.

### P1-GLO-013 - Prediction *(record-only chip)*
**Definition:** A system's best estimate about something it hasn't been told directly.
**Example:** An arrival time of 5:42 in traffic.
**Related:** probabilistic output, classification.

### P1-GLO-014 - Classification *(record-only chip)*
**Definition:** Sorting things into categories, like marking an email as spam or not spam.
**What this does not mean:** always AI - sorting by a stored list is a written rule.
**Related:** recognition (see pattern-based system), prediction.

### P1-GLO-015 - Generative AI
**Definition:** AI that creates new content - text, images, or audio - based on learned patterns.
**Example:** A chat assistant writing a free-form answer, worded differently each time.
**Related:** prompt, output, hallucination, model.

### P1-GLO-016 - Prompt *(record-only)*
**Definition:** The input or instruction you give an AI system.
**Example:** Typing "summarize this meeting in three bullet points."
**Related:** input, output, generative AI.

### P1-GLO-017 - Output *(record-only chip)*
**Definition:** What a system produces in response to an input.
**Example:** The total from a calculator; the reply from a chat assistant.
**Related:** deterministic output, probabilistic output.

### P1-GLO-018 - Hallucination *(record-only)*
**Definition:** When generative AI produces confident-sounding output that is false.
**Example:** An assistant citing a book that doesn't exist.
**What this does not mean:** lying - there's no intent; it's likelihood-based generation missing.
**Related:** generative AI, probabilistic output.

### P1-GLO-019 - Bias *(record-only)*
**Definition:** When a system's outputs unfairly favour or disadvantage certain groups or answers, often reflecting its data.
**Example:** A hiring screen scoring applicants unevenly because its examples were uneven.
**Related:** data, training, human review.

### P1-GLO-020 - Human review
**Definition:** A person checking or deciding on a system's output before it counts.
**Example:** A support agent reading an AI-drafted summary before replying.
**What this does not mean:** a sign the AI "isn't good enough" - it's a deliberate design layer.
**Related:** AI-assisted system, bias.

### P1-GLO-021 - AI-assisted system
**Definition:** A product where AI handles part of the work while rules, automation, or people handle the rest.
**Example:** A banking app whose one AI part is the unusual-purchase flag.
**Related:** human review, automation, combined system (lesson term).

### P1-GLO-022 - Trigger *(addition, flagged for document audit)*
**Definition:** The event that starts an automated step - like a form being submitted or a date arriving.
**Example:** Payment clearing, which fires the receipt email.
**Related:** workflow, automation.

### P1-GLO-023 - Workflow *(addition, flagged for document audit)*
**Definition:** A chain of steps that runs in order to get a task done.
**Example:** Submit form → check amount → route to approver → notify.
**What this does not mean:** intelligence - steps may be rules, and one may be an AI step.
**Related:** trigger, automation, AI-assisted system.
