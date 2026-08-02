# Misconception map

```yaml
content_id: P1-FND-005
content_type: misconception-map
title: Misconception register — Phase 1 (M1–M14)
phase: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §8.1 (M1–M6 canonical); M7–M14 extend the register per CS §14 ("M-numbers continue")
```

The register is canonical: lesson callouts, feedback, and questions reference these IDs and never restate them as free text (CS §8.1). Each entry names why the belief is reasonable — respect for the learner's logic is what makes correction land. M1–M6 are unchanged from the Content Specification; M7–M14 are new entries covering the generation brief's additional items (mapping table at the end).

Remediation destinations reference lesson blocks per CS §7.4; remediation module IDs (P1-REM-0xx) are reserved in the ID registry and produced in Phase 5.

---

### M1 — "If it's complex or impressive, it must be AI"
- **Why learners hold it:** marketing labels everything AI; complexity and intelligence feel alike.
- **Correct concept:** complexity doesn't change the mechanism. Thousands of written rules are still written rules; the output is still deterministic (LO8).
- **Teaching strategy:** contrast case — a complex tax calculator is still just rules. Anchor analogy boundary: a bigger vending machine is still a vending machine. Featured misconception callout in the lesson.
- **Example:** tax calculator vs fraud detection — both impressive, only one pattern-based.
- **Assessment method:** misconception-rejection item (best-explanation selection); scenario 6.
- **Remediation destination:** misconception callout + M1 corrective (P1-REM-001).

### M2 — "Automation is AI"
- **Why learners hold it:** both remove human effort; the visible outcome is identical.
- **Correct concept:** automation is how work flows; AI is how decisions are made. Automation may contain AI — or none at all (LO2, LO4, LO5).
- **Teaching strategy:** teach the two definitions side by side; dominoes vs weather-forecast analogies presented together.
- **Example:** payroll running on the 25th (automation, no AI) vs a bank flagging an unusual transaction (AI-assisted).
- **Assessment method:** automation-vs-AI comparison item; scenarios 2 and 4.
- **Remediation destination:** automation + combined-systems blocks (P1-REM-002).

### M3 — "AI thinks and understands like a person"
- **Why learners hold it:** conversational interfaces and human-like output invite the inference.
- **Correct concept:** pattern without comprehension — the forecast doesn't know about your picnic (LO10).
- **Teaching strategy:** pattern-without-comprehension framing in the AI block; anthropomorphic verbs banned in our own copy so content never reinforces it (CS §12.2).
- **Example:** a generative chatbot produces fluent text by pattern, not by understanding the question.
- **Assessment method:** misconception-rejection item targeting LO10; scenario 7 feedback.
- **Remediation destination:** AI block M3 passage + corrective (P1-REM-003).

### M4 — "The same question always gives the same AI answer"
- **Why learners hold it:** a lifetime of deterministic software trains the expectation.
- **Correct concept:** pattern-based outputs are probabilistic; variability is designed, not broken (LO6).
- **Teaching strategy:** probabilistic-output passage + spam-filter false-positive example.
- **Example:** asking a generative chatbot the same question twice and getting different phrasings.
- **Assessment method:** AI-characteristics item on output variability; scenario 1 vs 5 contrast.
- **Remediation destination:** probabilistic-outputs passage (P1-REM-004).

### M5 — "You can tell from the interface whether it's AI"
- **Why learners hold it:** interfaces are all learners can see.
- **Correct concept:** identical interfaces can hide different mechanisms; classification needs evidence about the mechanism, and "Not enough information" is a correct, skilled answer (LO9).
- **Teaching strategy:** chatbot minimal pair (scenarios 6/7, fixed order, cross-referencing feedback) + restaurant-kitchen analogy boundary ("from your table you can't see the kitchen").
- **Example:** decision-tree chatbot vs language-model chatbot — same chat window.
- **Assessment method:** ambiguity item; the 6/7 pair.
- **Remediation destination:** scenario-10 explanation + LO9 passage (P1-REM-005).

### M6 — "AI works alone, replacing software and people"
- **Why learners hold it:** media framing of AI as an autonomous agent.
- **Correct concept:** AI is usually one component inside a larger system, alongside rules, automation, and people — not a replacement for them (LO4, LO5, LO7). AI cannot ship without traditional software around it.
- **Teaching strategy:** the diagram is the counter-argument — AI as one layer among five, with human review explicit.
- **Example:** customer-support walkthrough: interface → traditional software records → automation routes → AI classifies → a person decides.
- **Assessment method:** combined-systems items; scenario 9.
- **Remediation destination:** combined block + diagram (P1-REM-006).

### M7 — "AI is always correct" *(new)*
- **Why learners hold it:** outputs sound confident; computers are assumed precise; correct rule-based software sets the precedent.
- **Correct concept:** AI outputs are likelihood-based estimates — useful and sometimes wrong, by design (LO6). Confidence of tone is not evidence of accuracy.
- **Teaching strategy:** the "sometimes wrong, by design" passage; frame the spam filter's false positive as normal operation, not malfunction. Related to M4 (variability) but targets trust, not repeatability.
- **Example:** a spam filter putting a real message in the junk folder.
- **Assessment method:** AI-characteristics item on usefulness vs correctness.
- **Remediation destination:** probabilistic-outputs passage + spam-filter example (P1-REM-007).

### M8 — "Personalization proves AI is being used" *(new)*
- **Why learners hold it:** "personalized for you" is marketed alongside AI; tailored results feel like the system knows them.
- **Correct concept:** personalization can be a written rule ("customers who bought X see Y") or learned patterns; the label alone doesn't tell you which (LO8, LO9).
- **Teaching strategy:** contrast a rule-based "recently viewed" strip with a learned "recommended for you" ranking; return to the evidence habit — what does the description say about the mechanism?
- **Example:** an online store showing your recently viewed items (rules) vs ranking recommendations that vary by person (pattern-based).
- **Assessment method:** classification item with a personalization distractor; ambiguity item.
- **Remediation destination:** M1 corrective's evidence framing + recommendation example (P1-REM-008).

### M9 — "Marketing labels explain how a product works" *(new)*
- **Why learners hold it:** "smart", "intelligent", "AI-powered" appear everywhere and sound like technical descriptions.
- **Correct concept:** marketing language describes the interface and the promise, not the mechanism. Words like smart, automated, personalized, adaptive, predictive, and advanced are not evidence (LO8, LO9).
- **Teaching strategy:** scenario 10 ("our app uses smart technology...") teaches the move: name what the description covers, name what would settle the question.
- **Example:** "smart photo organization" — could be rules (date, location), could be AI (face recognition), could be both.
- **Assessment method:** ambiguity item where "Not enough information" is correct; vendor-question reflection.
- **Remediation destination:** scenario-10 explanation + LO9 passage (P1-REM-009).

### M10 — "A product belongs to exactly one category" *(new)*
- **Why learners hold it:** classification exercises imply one right box; product names suggest one identity.
- **Correct concept:** real products mix rules, automation, AI, and people; the honest classification is often "Combination" — or applies to one feature, not the product (LO4, LO5, LO7).
- **Teaching strategy:** the combined-systems block and diagram; the navigation-app scenario where three mechanisms cooperate.
- **Example:** a navigation app — routing rules + live data + learned traffic prediction.
- **Assessment method:** combined-systems multiple-select item; scenarios 8–9.
- **Remediation destination:** combined block + diagram (P1-REM-010).

### M11 — "Fixed rules and learned patterns are the same thing" *(new)*
- **Why learners hold it:** both are invisible, both live in software, and both produce sorted outcomes.
- **Correct concept:** written if-then rules are authored by people and repeat exactly; learned patterns come from many examples and produce likelihoods that can vary (LO1, LO3, LO6).
- **Teaching strategy:** put the two definitions and the two anchor analogies (vending machine, weather forecast) directly side by side; the rule-based vs pattern-based glossary pair.
- **Example:** a password-strength checker (written criteria) vs spam detection (learned features).
- **Assessment method:** comparison item; scenario 1 vs 5.
- **Remediation destination:** traditional software + AI blocks, outputs passages (P1-REM-011).

### M12 — "AI must be conversational, robotic, or humanoid" *(new)*
- **Why learners hold it:** fiction and product demos foreground chatbots and robots; quiet AI is invisible.
- **Correct concept:** most AI is undramatic — ranking, flagging, filtering, predicting — with no conversation and no face. Equally, a chat interface doesn't prove AI (LO3, LO5).
- **Teaching strategy:** pair the quiet examples (spam detection, fraud flags, recommendations) with the chatbot minimal pair, which shows the interface proves nothing in either direction.
- **Example:** fraud detection has no personality; the fixed-menu chatbot has a chat window and no AI.
- **Assessment method:** classification items on non-conversational AI; scenario 6.
- **Remediation destination:** AI block examples + chatbot-pair explanation (P1-REM-012).

### M13 — "Every AI system learns continuously from every interaction" *(new)*
- **Why learners hold it:** "it learns" is used loosely; recommendations do shift with behaviour, which looks like live learning.
- **Correct concept:** training happens before deployment. Using a product means giving a trained model inputs; collecting data and later updating a product or model are separate steps that may or may not happen (LO3).
- **Teaching strategy:** the Go Deeper training passage separates the five steps: training a model, giving it an input, receiving an output, collecting data, updating later.
- **Example:** a speech recognizer doesn't retrain itself with each sentence you dictate; improvements arrive as product updates.
- **Assessment method:** AI-characteristics item on training vs use.
- **Remediation destination:** AI block Go Deeper training passage (P1-REM-013).

### M14 — "One AI feature makes the whole product an AI product" *(new)*
- **Why learners hold it:** products with any AI are marketed as "AI products"; one visible feature colours the whole.
- **Correct concept:** classify the feature or step, not the brand. A banking app with AI fraud detection is not "an AI app" — it's a combined system where one step is AI-assisted (LO7). Inverse of M10.
- **Teaching strategy:** feature-level classification practice in the combined-systems block; the support-platform walkthrough names which layer is which.
- **Example:** a banking app — rules for balances, automation for scheduled transfers, AI for fraud-risk flags.
- **Assessment method:** combined-systems item asking which part of a product is AI-assisted.
- **Remediation destination:** combined block + diagram walkthrough (P1-REM-014).

---

## Mapping to the generation brief's required list

| Brief item | Register ID |
|---|---|
| 1. All automation is AI | M2 |
| 2. Complex software must be AI | M1 |
| 3. AI works without traditional software | M6 |
| 4. AI understands information like a human | M3 |
| 5. AI is always correct | M7 |
| 6. Personalization proves AI is being used | M8 |
| 7. Marketing labels explain how a product works | M9 |
| 8. A product can only belong to one category | M10 |
| 9. Fixed rules and learned patterns are the same | M11 |
| 10. AI must be conversational, robotic, or humanoid | M12 |
| 11. Every AI system learns continuously from every interaction | M13 |
| 12. An entire product should be classified based on one AI feature | M14 |

M4 and M5 remain in the register from canon even though the brief did not list them; they are taught and assessed as specified in the CS.

> INTERNAL VALIDATION NOTE:
> M7 overlaps M4 (both concern probabilistic output) and M14 inverts M10. They are kept separate because they trigger from different learner errors and need different corrective framings; if pilot analytics show identical failure patterns, merge candidates are M4+M7 and M10+M14.
