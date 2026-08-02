# Terminology guide

```yaml
content_id: P1-FND-003
content_type: terminology-guide
title: Approved terminology — AI, Automation and Traditional Software
phase: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §10.2 (approved plain definitions), CS §11 (terminology discipline), CS §12.2 (banned verbs), CS Appendix C–D
```

Learner-facing names for concepts, layers, steps, and categories are fixed. Introducing a synonym is a defect, not a style choice (CS §11). Plain definitions marked **[CS approved]** are the canonical drafts from CS §10.2 and may not be reworded in learner copy without a canonical-record change (CS §10.1). Terms without a CS entry carry a new approved draft here, flagged for the CS document audit.

## Fixed classification labels (learner-facing, verbatim)

Traditional software · Automation · AI-assisted · Combination · Not enough information

## Fixed layer names (learner-facing, verbatim)

Quick Explanation · Explore Further · Go Deeper · Apply It

## Fixed assessment vocabulary

**Assessment** (graded) and **knowledge check** (practice) are the only two terms. "Test", "exam", and "quiz" are banned in all learner copy (CS §11).

---

## Terms

### Traditional software
- **Learner-facing definition [CS approved]:** Software that follows rules people wrote, so the same input always produces the same output.
- **Internal definition:** Deterministic software whose behaviour is fully specified by explicitly programmed rules, conditions, calculations, and workflows; complexity does not change its nature.
- **Avoid:** "dumb software", "basic software", "old software" — age and simplicity are not the distinction.
- **Common misconception:** complexity or impressiveness signals AI (M1).
- **Related:** rule-based system, deterministic output, algorithm.

### Software
- **Learner-facing definition [new draft]:** The programs and instructions that make computers and devices do things.
- **Internal definition:** Umbrella term covering all program types, including AI systems; used when the rule-based/pattern-based distinction is not at stake.
- **Avoid:** using "software" and "traditional software" interchangeably — AI is still software (LO context), but "traditional software" is the specific rule-based category.
- **Common misconception:** AI is something other than software (M6).
- **Related:** traditional software, artificial intelligence.

### Automation
- **Learner-facing definition [CS approved]:** Using technology to run or connect repeatable tasks with less manual effort.
- **Internal definition:** A property of how work is carried out — tasks chained, triggered, or scheduled with reduced human intervention. Describes process, not decision-making method; may contain traditional software, AI, or both.
- **Avoid:** "automation means AI", "smart automation" without evidence; never present automation and AI as mutually exclusive.
- **Common misconception:** automation is AI (M2).
- **Related:** trigger, workflow, AI-assisted system.

### Artificial intelligence (AI)
- **Learner-facing definition [CS approved]:** Systems that find patterns in data to classify, predict, or generate things — instead of only following written rules.
- **Internal definition:** Pattern-based systems whose outputs are probabilistic, depend on training data and human-set goals, and can vary or be wrong by design. Always delivered inside a larger product of software, automation, and often human review.
- **Avoid:** anthropomorphic verbs — AI systems detect, classify, generate, flag; never think, know, understand, believe, want, feel (CS §12.2, lintable). Never "magic", never "the AI decides like a person".
- **Common misconception:** AI thinks and understands like a person (M3).
- **Related:** machine learning, model, pattern-based system, generative AI.

### AI model
- **Learner-facing definition [CS approved, as "Model"]:** The learned pattern-map an AI system uses to make its outputs.
- **Internal definition:** The trained artifact produced from training data; distinct from the full product around it. Giving a trained model an input is not the same as training it; models do not automatically update from each interaction.
- **Avoid:** "the model learns from you as you use it" (unless a product genuinely does and says so); "the brain of the system".
- **Common misconception:** every AI system learns continuously from every interaction (M13).
- **Related:** training, training data, machine learning.

### Algorithm
- **Learner-facing definition [CS approved]:** A step-by-step procedure a computer follows to do a task.
- **Internal definition:** Neutral term applying to both rule-based and pattern-based systems; the presence of "an algorithm" proves nothing about AI use.
- **Avoid:** "the algorithm" as a synonym for AI or for a recommendation system.
- **Common misconception:** "algorithm" implies AI (feeds M1/M9).
- **Related:** traditional software, machine learning.

### Data
- **Learner-facing definition [CS approved]:** The information systems store, process, or learn from.
- **Internal definition:** Covers stored records, inputs, and training examples; which role data plays should always be clear from context.
- **Avoid:** "data" as something mystical AI "consumes"; conflating a product collecting user data with a model training on it.
- **Common misconception:** if a product collects data, it must be doing AI (feeds M8).
- **Related:** training data, input, output.

### Input
- **Learner-facing definition [new draft]:** What you give a system to work with — a tap, a question, a form, a photo.
- **Internal definition:** Any signal a system receives; for AI, the thing the trained model processes at use time (inference), distinct from training examples.
- **Avoid:** confusing giving a model an input with training the model.
- **Common misconception:** every input teaches the AI (M13).
- **Related:** output, prompt, data.

### Output
- **Learner-facing definition [CS approved]:** What a system produces in response to an input.
- **Internal definition:** The observable result. Deterministic for rule-based systems; probabilistic for pattern-based systems.
- **Avoid:** "answer" when the output may be non-textual; "the truth" — outputs can be wrong.
- **Common misconception:** AI outputs are always correct (M7).
- **Related:** deterministic output, probabilistic output.

### Pattern
- **Learner-facing definition [new draft]:** A regularity found across many examples — like most spam emails sharing certain features.
- **Internal definition:** The statistical regularities a model captures from training data; the basis of prediction, classification, recognition, and generation.
- **Avoid:** "the AI sees patterns like you do" — pattern-matching is not comprehension.
- **Common misconception:** finding patterns equals understanding (M3).
- **Related:** pattern-based system, machine learning, training.

### Prediction
- **Learner-facing definition [CS approved]:** A system's best estimate about something it hasn't been told directly.
- **Internal definition:** A probabilistic output about an unknown or future value; correctness is likelihood-based.
- **Avoid:** presenting predictions as guarantees; "the AI knows what will happen".
- **Common misconception:** a confident prediction is a correct one (M7).
- **Related:** probabilistic output, classification.

### Classification
- **Learner-facing definition [CS approved]:** Sorting things into categories, like marking an email as spam or not spam.
- **Internal definition:** Assigning inputs to discrete categories; a core AI task, though rule-based systems also sort by written criteria — the learned/written distinction decides which is which.
- **Avoid:** treating any sorting as AI.
- **Common misconception:** fixed rules and learned patterns are the same kind of sorting (M11).
- **Related:** prediction, recognition, pattern-based system.

### Recommendation
- **Learner-facing definition [new draft]:** A suggestion a system makes for you — like products you might want or shows you might like — usually based on patterns in behaviour.
- **Internal definition:** A ranking/selection task typically driven by learned behaviour patterns; personalization alone does not prove AI — rule-based personalization exists ("people who bought X see Y" as a written rule).
- **Avoid:** "personalized, therefore AI".
- **Common misconception:** personalization proves AI is being used (M8).
- **Related:** prediction, classification.

### Recognition
- **Learner-facing definition [new draft]:** A system identifying what something is — a face in a photo, words in speech, a song from a clip.
- **Internal definition:** Classification applied to rich signals (images, audio, speech); characteristically pattern-based.
- **Avoid:** "the system sees/hears" without the pattern framing; "recognition" implying certainty.
- **Common misconception:** recognition implies human-like perception (M3).
- **Related:** classification, pattern.

### Generative AI
- **Learner-facing definition [CS approved]:** AI that creates new content — text, images, or audio — based on learned patterns.
- **Internal definition:** Pattern-based systems producing novel outputs; outputs vary run to run and can be confidently wrong (hallucination).
- **Avoid:** "it writes like a person because it understands"; "creativity" claims without the pattern boundary.
- **Common misconception:** fluent output implies understanding (M3) or correctness (M7).
- **Related:** prompt, hallucination, model.

### Training data
- **Learner-facing definition [CS approved, via "Training" + "Data"]:** The many examples a system is shown so it can learn patterns.
- **Internal definition:** The example set used to produce a model. Training happens before deployment; using a product is not training it unless the product explicitly does so later.
- **Avoid:** "it trains on everything you type" as a default assumption.
- **Common misconception:** M13 (continuous learning).
- **Related:** training, model, machine learning.

### Rule-based system
- **Learner-facing definition [CS approved]:** A system that decides using written if-then rules.
- **Internal definition:** The decision-mechanism view of traditional software; the contrast pole to pattern-based systems. Learner copy standardizes on "rule-based" (the brief's "rules-based" is a non-approved variant).
- **Avoid:** "rules engine" (jargon); "rules-based" (spelling variant).
- **Common misconception:** enough rules eventually become intelligence (M1).
- **Related:** traditional software, deterministic output.

### Trigger
- **Learner-facing definition [new draft]:** The event that starts an automated step — like a form being submitted or a date arriving.
- **Internal definition:** The initiating condition in an automation chain (event, schedule, threshold).
- **Avoid:** implying triggers involve judgment.
- **Common misconception:** reacting to events looks like deciding (M2).
- **Related:** workflow, automation.

### Workflow
- **Learner-facing definition [new draft]:** A chain of steps that runs in order to get a task done.
- **Internal definition:** An ordered sequence of triggers, conditions, and actions; the unit automation operates on. Steps may be rule-based or AI-assisted.
- **Avoid:** "intelligent workflow" without evidence.
- **Common misconception:** a long chain of steps implies intelligence (M1/M2).
- **Related:** trigger, automation, combined system.

### Combined system *(internal alias: hybrid system)*
- **Learner-facing definition [CS approved, as "AI-assisted system", adapted]:** A product where AI handles part of the work while rules, automation, or people handle the rest.
- **Internal definition:** The realistic default for shipped products: interface + traditional software + automation + AI component + human review (the diagram's five layers). Classification often applies to a feature or step, not the whole product.
- **Avoid:** "hybrid system" in learner copy (internal synonym only); labelling an entire product "an AI product" from one AI feature.
- **Common misconception:** a product belongs to exactly one category (M10); one AI feature makes the whole product AI (M14).
- **Related:** AI-assisted system, human review, workflow.

### Human review
- **Learner-facing definition [CS approved]:** A person checking or deciding on a system's output before it counts.
- **Internal definition:** The explicit human layer in combined systems; a deliberate design choice, not a failure of the technology.
- **Avoid:** framing human review as "AI not being good enough yet".
- **Common misconception:** AI works alone, replacing software and people (M6).
- **Related:** combined system, AI-assisted system.

---

## Notes for later phases

- Glossary entries (Phase 6) inherit the CS §10.2 definitions verbatim; a definition change is a canonical-record change, never a glossary-only edit.
- The six new drafts here (software, input, pattern, recommendation, recognition, trigger, workflow, combined-system adaptation) are flagged for the Phase 0 §18 document audit.
- Banned-word list for lint: think/know/understand/believe/want/feel (of AI) · test/exam/quiz · fail (learner copy) · simply/just/easy · obvious · cutting-edge/revolutionary/game-changing · magic.
