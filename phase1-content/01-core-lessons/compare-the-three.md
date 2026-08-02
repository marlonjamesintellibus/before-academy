# Compare the three - and how they combine

```yaml
content_id: P1-LESSON-005
content_type: lesson-concept
title: Compare the three - and how they combine
phase: 2
competency_level: 1
section: ai-automation-traditional-software
learning_outcomes: [LO4, LO5, LO6, LO7, LO8]
estimated_time: 5 minutes core; +3 with optional layers
required_or_optional: comparison and combined-systems passages required surface; example gallery optional
prerequisites: P1-LESSON-002, P1-LESSON-003, P1-LESSON-004
concept_tags: [combined-systems, human-review, classification]
misconception_tags: [M1, M6, M10, M14]
assessment_links: [P1-ASM-001 combined-systems and classification categories, P1-KC-001]
remediation_links: [P1-REM-001, P1-REM-006, P1-REM-010, P1-REM-014]
accessibility_requirements: comparison written as linear prose with a supplementary table; diagrams per CS §12.4; CS §12
content_status: draft-for-validation
```

Glossary chips in this lesson: AI-assisted system · human review · deterministic output · probabilistic output.

---

## The three side by side *(always visible)*

Put the three ideas next to each other and the differences sharpen.

**How each works.** Traditional software follows rules people wrote. Automation chains tasks together so they run with less manual effort. AI applies patterns learned from data.

**What each produces.** Written rules give you the same output for the same input, every time. An automated chain runs the same steps on the same trigger. Pattern-based systems produce likelihoods - outputs that can vary, and can be wrong.

**Where each struggles.** Rules can't handle what nobody anticipated. Automation can't judge - it reacts. AI can misjudge - usefully right most of the time, confidently wrong some of the time.

**What only AI does.** Handle inputs nobody wrote a rule for, and generate new content. No rulebook writes your email reply from scratch.

*(Comparison diagram P1-DGM-002 renders here - full specification in Phase 3. Its single teaching claim: the three approaches differ in how decisions are made, not in how impressive they look.)*

| | Traditional software | Automation | AI |
|---|---|---|---|
| Decides by | written rules | the setup it was given | learned patterns |
| Same input gives | same output | same steps | output that can vary |
| Typical job | calculate, validate, store | route, schedule, notify | predict, classify, generate |
| Struggles with | the unanticipated | judgment | certainty |

*(The table supplements the prose; every fact in it appears in the prose above, so no meaning depends on the table rendering.)*

## Real products combine them *(always visible)*

Here's the twist that makes classification a real skill: almost nothing you use is only one of these.

A restaurant is the useful picture. The menu is the interface - what you see and choose from. The kitchen line is the automation - orders flow through stations in a set sequence. The chef's judgment is the pattern-based part, with a person tasting before plates go out. One meal, several mechanisms. And from your table, you can't see the kitchen - which is exactly why you often can't classify a product from the outside.

**Walk through one real case.** You send a message to a company's support platform:

1. The **interface** takes your message.
2. **Traditional software** records the request - written rules, stored data.
3. **Automation** routes it - a trigger fires, the ticket moves.
4. An **AI component** classifies the topic and drafts a summary - learned patterns, likelihood-based.
5. A **person** reads, decides, and answers - human review.

Five layers, one product. The honest label for the whole thing is a combination - and if someone asks "is that platform AI?", the skilled answer names the layer: the classification step is AI-assisted; the rest isn't.

*(Canonical diagram P1-DGM-001, "How Rules, Automation and AI Work Together", renders here - CS §5.5; full spec in Phase 3.)*

## More combined systems *(optional · about 2 minutes)*

Six quick cases across everyday life. For each: the rule-based part, the automated part, the AI part - and what you still can't tell from outside.

**A banking app.** Rules: your balance, transfers, statements. Automation: the scheduled transfer on the 1st. AI: the fraud-risk flag on an unusual purchase. Still unknown: whether the "spending insights" screen is learned patterns or fixed category rules. One AI feature doesn't make it "an AI app" - it makes it a product with one AI-assisted step.

**A navigation app.** Rules: road maps and turn logic. Automation: rerouting fires when you miss a turn. AI: predicted arrival time learned from traffic patterns. Still unknown: how much of "fastest route" is live prediction versus fixed heuristics.

**A learning platform.** Rules: enrolment, progress records, certificates. Automation: the reminder email when you've been away a week. AI: possibly the "recommended next course" ranking. Still unknown: recommendations could be a written rule ("everyone who finishes A sees B") - the label alone can't tell you.

**A clinic's patient portal.** Rules: appointment records, prescription lists. Automation: the reminder message three days before your visit. AI: possibly a symptom-checker that suggests likely causes. Still unknown: a symptom checker can be a fixed decision tree - a chat window proves nothing either way.

**An online store.** Rules: prices, stock counts, checkout. Automation: the receipt and shipping notifications. AI: the "recommended for you" ranking that varies by person. Still unknown: whether search results are ranked by learned relevance or by fixed fields like price and popularity.

**A workplace email suite.** Rules: folders, signatures, storage. Automation: the out-of-office auto-reply. AI: spam filtering and suggested replies. Still unknown: which "smart" features are learned and which are templates.

The pattern across all six: classify the feature, not the brand. "Which parts of this product involve AI?" is a better question than "is this product AI?"

## Featured misconception *(callout - always visible)*

**"It's complex and impressive, so it must be AI."**

It's a reasonable inference - complexity and intelligence feel alike, and marketing blurs them on purpose. But a tax calculator handling thousands of conditions is still written rules, start to finish, with identical output for identical input. Impressiveness tells you about the engineering effort; it tells you nothing about the mechanism. A bigger vending machine is still a vending machine. *(Register: M1.)*

## Apply It - micro-check

**A company says: "Our support platform automatically sorts incoming messages, and our team answers them." Which label fits best?**

- A) Automation only
- B) AI-assisted only
- C) A combination - and part of it depends on information we don't have *(correct)*

**Feedback - C (correct):** Correct. The clue is the two halves: "automatically sorts" is automation, "our team answers" is human review - already a combination. Whether the sorting step is rules or learned patterns isn't stated, and noticing that gap is the skill.

**Feedback - A:** Not quite - you caught the automation layer; there's one more thing happening here. "Our team answers" adds human review, so this is already a combination - and the sorting mechanism itself isn't described. Review: Combined systems.

**Feedback - B:** Not quite - here's the clue: nothing in the description says the sorting is learned. Sorting can be a written rule. What's certain is a chain plus human review: a combination. Review: Combined systems.

## Takeaway *(always visible)*

Rules are written; automation chains tasks; AI learns patterns - and most real products combine them. When a description hides the mechanism, "not enough information" is the accurate answer, and asking how it works is the skill.

## Next step

Time to use all of it. The activity ahead gives you ten real scenarios to classify - evidence first, labels second.

*(CTA: Start Sort the System)*

---

## Accessibility descriptions

- The comparison is complete in linear prose; the table is supplementary and marked as such, with a caption ("The same comparison at a glance"). Screen readers can skip it without losing content.
- Both diagrams follow CS §12.4: one teaching claim each, ≤125-character alt text, standalone prose walkthrough versioned with the asset, colour never carrying meaning alone, reading order of the text alternative matching visual flow. Full specs ship in Phase 3.
- The support-platform walkthrough is an ordered list whose sequence matches the diagram's top-to-bottom flow.

---

## Presentation reuse (internal - not learner-facing)

**Unit 1 - Comparing the three**
- **Slide title:** Three mechanisms, side by side
- **One-sentence takeaway:** The three approaches differ in how decisions get made - written rules, chained setup, or learned patterns - not in how impressive they look.
- **Supporting points:** rules: same input → same output · automation: same trigger → same steps · AI: likelihoods that can vary and miss · only AI handles the unanticipated and generates new content
- **Suggested visual:** the P1-DGM-002 comparison diagram (same asset, no redrawn variant)
- **Speaker note:** Run the table as a call-and-response: name a job, the room names the mechanism.

**Unit 2 - Combined systems**
- **Slide title:** Real products mix all three
- **One-sentence takeaway:** AI usually arrives as one component inside a larger system - alongside rules, automation, and people.
- **Supporting points:** restaurant picture: menu, kitchen line, chef, taste-check · support walkthrough: interface → records → routing → AI classification → human decision · classify the feature, not the brand · from the outside, you often can't tell - and saying so is skilled
- **Suggested visual:** the P1-DGM-001 canonical diagram with identical caption (CS §5.5 reuse rule)
- **Speaker note:** End on the question upgrade: from "is it AI?" to "which parts involve AI, and how would we know?"

> INTERNAL VALIDATION NOTE:
> The six-case gallery exceeds the CS §5.2 minimum (one walkthrough) to satisfy the brief's hybrid-example coverage across banking, education, healthcare, transportation, communication, e-commerce, and workplace productivity; it ships as an optional layer to protect cognitive load. If pilot data shows low expansion rates, the gallery is a candidate for the presentation deck rather than the lesson.
