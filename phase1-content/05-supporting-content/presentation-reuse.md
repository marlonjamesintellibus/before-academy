# Presentation reuse

```yaml
content_id: P1-PRS-000 (set definition; units P1-PRS-001..008)
content_type: presentation-reuse
title: Presentation-ready concept summaries
phase: 6
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §2.2 (one approved meaning, many surfaces), §5.5 (diagram reuse without redrawing); Phase 2 in-lesson presentation blocks (consolidated here as the canonical deck source)
```

Rules: these summaries never replace the primary learner content; definitions match canonical records verbatim; the two diagrams reuse the identical assets and captions (no redrawn variants); every unit carries an audience caution so facilitators don't reintroduce banned framings. Shared accessibility note: slides use sentence case, readable contrast per UX §5 tokens, one idea per slide, and the diagram slides ship with their long text alternatives in the speaker notes for accessible distribution.

### P1-PRS-001 — Traditional software
- **Slide title:** Traditional software: written rules
- **Takeaway:** Traditional software follows rules people wrote — the same input always produces the same output.
- **Points:** rules authored in advance · same input → same output · complexity doesn't change the nature (a tax calculator is still rules) · can't handle what nobody wrote a rule for · the foundation AI products stand on
- **Visual:** vending machine, same button, identical snack twice
- **Speaker note:** Ask for software people trust because it never surprises them; land "a bigger vending machine is still a vending machine."
- **Audience caution:** don't equate "traditional" with "old" or "basic" — the category is about mechanism, not age.
- **Source lesson:** P1-LESSON-002 · **Accessibility:** describe the vending-machine visual aloud; alt text as specified in the lesson.

### P1-PRS-002 — Automation
- **Slide title:** Automation: how work flows
- **Takeaway:** Automation runs repeatable tasks with less manual effort — it describes how work flows, not how smart any step is.
- **Points:** trigger → condition → action → workflow · receipts, ticket routing, payroll, threshold alerts · automation ≠ AI, and automation may contain AI · same chain, two versions: checkbox rule vs learned routing
- **Visual:** dominoes with one piece labelled "this step can be a rule — or an AI"
- **Speaker note:** Poll: "Does your auto-receipt email involve AI?" Separate the flow from the judgment; plant the two-questions habit.
- **Audience caution:** never present automation and AI as rivals or synonyms — the room usually holds both errors at once.
- **Source lesson:** P1-LESSON-003 · **Accessibility:** narrate the labelled domino; keep the chain description verbal, not gesture-only.

### P1-PRS-003 — Artificial intelligence
- **Slide title:** AI: patterns learned from data
- **Takeaway:** AI systems apply patterns learned from data to predict, classify, recommend, recognize, or generate — usefully, and sometimes wrongly, by design.
- **Points:** learned patterns vs written rules · five jobs: predict, classify, recommend, recognize, generate · the spam filter's false positive is normal operation · the forecast doesn't know about your picnic · trained before shipping — using isn't retraining
- **Visual:** forecast card ("70% rain") beside a junk folder holding one real message
- **Speaker note:** The false-positive story converts "AI is wrong, so bad" into "AI is probabilistic, so check." Keep verbs clean: detect, classify, generate.
- **Audience caution:** anthropomorphic verbs are banned even casually — one "it knows" from the stage undoes the slide.
- **Source lesson:** P1-LESSON-004 · **Accessibility:** read the 70% figure and folder scene aloud.

### P1-PRS-004 — Comparing the three
- **Slide title:** Three mechanisms, side by side
- **Takeaway:** The three approaches differ in how decisions get made — written rules, chained setup, or learned patterns — not in how impressive they look.
- **Points:** rules: same input → same output · automation: same trigger → same steps · AI: likelihoods that can vary and miss · only AI handles the unanticipated and generates new content
- **Visual:** P1-DGM-002 (identical asset and caption)
- **Speaker note:** Run it as call-and-response — name a job, the room names the mechanism.
- **Audience caution:** don't rank the three as primitive-to-advanced; the deck's claim is difference of mechanism, not a ladder.
- **Source lesson:** P1-LESSON-005 · **Accessibility:** long text alternative in speaker notes; read the decides-by row when presenting.

### P1-PRS-005 — Combined systems
- **Slide title:** Real products mix all three
- **Takeaway:** AI usually arrives as one component inside a larger system — alongside rules, automation, and people.
- **Points:** restaurant picture: menu, kitchen line, chef, taste-check · walkthrough: interface → records → routing → AI classification → human decision · classify the feature, not the brand · from outside you often can't tell — saying so is skilled
- **Visual:** P1-DGM-001 (identical asset and caption, per CS §5.5)
- **Speaker note:** End on the question upgrade: from "is it AI?" to "which parts involve AI, and how would we know?"
- **Audience caution:** human review is a design layer, not an apology — never frame it as "AI isn't ready yet."
- **Source lesson:** P1-LESSON-005 · **Accessibility:** five-layer walkthrough read in visual order; long description in notes.

### P1-PRS-006 — AI limitations
- **Slide title:** Useful, confident, sometimes wrong
- **Takeaway:** Pattern-based outputs are likelihood-based estimates — confidence of tone is not evidence of accuracy.
- **Points:** likelihoods, not certainties · variation between runs is designed, not broken · confidently wrong happens — verification is the user's move when stakes are real · exact-and-identical jobs belong to written rules
- **Visual:** navigation estimate "22 min" beside the actual "31 min" trip
- **Speaker note:** The navigation example lands because nobody calls the app worthless — transfer that posture to every AI output.
- **Audience caution:** avoid both ditches — "AI can't be trusted" and "AI is basically right"; the slide teaches calibration, not a verdict.
- **Source lesson:** P1-LESSON-004 (Explore/Go Deeper) · **Accessibility:** read both numbers; the contrast is the content.

### P1-PRS-007 — Marketing claims
- **Slide title:** Labels aren't mechanisms
- **Takeaway:** "Smart," "intelligent," and "AI-powered" describe positioning — they're compatible with rules, patterns, or neither, and prove nothing.
- **Points:** marketing words are mood words, mechanically silent · they can be true — they're never evidence · the cut-through question: which feature, learning what, from what data? · outcome statistics ("resolves 80% instantly") describe results, not mechanisms
- **Visual:** a product box with "AI-POWERED" starburst next to an empty spec sheet
- **Speaker note:** Have the room draft the vendor question live; compare against "which feature uses AI, and what does it learn from?"
- **Audience caution:** the point is scrutiny, not cynicism — labels neither prove nor disprove; keep both directions explicit.
- **Source lesson:** P1-LESSON-004 Go Deeper + P1-ACT-001-S10 · **Accessibility:** describe the box-vs-spec-sheet contrast verbally.

### P1-PRS-008 — Not enough information
- **Slide title:** "Can't tell yet" is a skilled answer
- **Takeaway:** When a description covers the interface or the promise but not the mechanism, the accurate classification is that you can't tell — and naming what would settle it is the skill.
- **Points:** identical interfaces can hide different mechanisms (two chatbots) · personalization and outcomes fit rules or patterns equally · the skilled move: name what's missing · overusing it matters too — when evidence exists, use it
- **Visual:** two identical chat windows with a question mark between them
- **Speaker note:** Run the chatbot minimal pair as a live vote before revealing — the room's split is the lesson.
- **Audience caution:** frame it as precision, never as a shrug; and correct overuse in the room the same way the activity does — by pointing at the evidence that was there.
- **Source lesson:** P1-LESSON-005 + P1-ACT-001 S06/S07/S10 · **Accessibility:** narrate that the two windows are pixel-identical; the sameness is the content.
