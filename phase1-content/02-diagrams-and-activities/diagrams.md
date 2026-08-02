# Diagrams

```yaml
content_id: P1-DGM-000 (set definition; diagrams P1-DGM-001, P1-DGM-002)
content_type: diagram-specification
title: Phase 1 diagram specifications
phase: 3
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §5.5 (P1-DGM-001 canonical), §12.4 (standards); rendering UX §6.2; storage Eng §8.5
```

Shared standards (CS §12.4): every diagram states exactly one teaching claim; alt text ≤125 characters; the long text alternative delivers the same teaching claim standalone and is stored and versioned in the canonical record; diagram text uses lesson terminology verbatim (drift between diagram and prose is a QA failure); colours never carry meaning alone; the text alternative's reading order matches the visual flow. Both diagrams are static — no animation, so no reduced-motion variant is required beyond confirming no entrance effects are added at implementation.

---

## P1-DGM-001 — How Rules, Automation and AI Work Together *(canonical, CS §5.5)*

**Diagram title (displayed):** How rules, automation and AI work together

**Learning purpose / teaching claim:** AI is usually one component inside a larger system, alongside rules, automation, and people — not a replacement for them. (LO4, LO5, LO7; directly counters M6.)

**Learner placement:** in P1-LESSON-005, immediately after the support-platform walkthrough, mirroring it exactly. Reused without redrawing in the sample presentation (CS §5.5 reuse rule).

**Exact text appearing in the diagram:**

- Heading (optional if the block heading serves): How rules, automation and AI work together
- Node 1 label: **Interface** — sub-label: *takes your message*
- Node 2 label: **Traditional software** — sub-label: *records the request*
- Node 3 label: **Automation** — sub-label: *routes it*
- Node 4 label: **AI component** — sub-label: *classifies and summarizes*
- Node 5 label: **Human review** — sub-label: *a person decides*
- Caption: One support message passes through five layers — and only one of them is AI.

**Node labels:** as above; every label ≤4 words (CS §5.5).

**Section labels:** none — the five nodes and caption are the complete text.

**Direction of flow:** vertical, top to bottom: Interface → Traditional software → Automation → AI component → Human review. Single arrows between consecutive nodes; no branches.

**Relationships:** strict sequence; each layer hands the message to the next. No layer replaces another.

**Visual hierarchy:** five equal-weight nodes — deliberately uniform so the AI component reads as one peer layer among five, which is the claim. The AI node may carry a subtle outline accent for findability, paired with its text label (never colour alone). The caption sits below the final node.

**Caption:** One support message passes through five layers — and only one of them is AI.

**Learner takeaway:** when someone asks "is that platform AI?", the skilled answer names the layer.

**Alt text (≤125 chars):** Five stacked layers of a support request: interface, traditional software, automation, AI component, human review.

**Full accessibility description / screen-reader equivalent (long text alternative, versioned with the asset):**

> A support message travels through five layers, top to bottom. First, the interface takes your message. Second, traditional software records the request — written rules and stored data. Third, automation routes it: a trigger fires and the ticket moves to the right queue. Fourth, an AI component classifies the topic and drafts a summary — learned patterns producing a likelihood-based judgment. Fifth, human review: a person reads, decides, and answers. Each layer hands the message to the next; no layer replaces another. Only the fourth layer is AI — one component inside a larger system alongside rules, automation, and people.

**Simplified mobile presentation:** identical vertical stack (the layout is mobile-native); nodes full-width, sub-labels wrap under labels; caption below. No horizontal variant exists, so desktop and mobile share one orientation.

**Reduced-motion alternative:** static asset; implementation must not add entrance or scroll-triggered animation. If any hover/tap affordance reveals sub-labels, sub-labels must also be visible by default at rest.

**Designer notes:** visual style tokens from UX §5. Uniform node treatment is intentional — do not enlarge or spotlight the AI node beyond the findability accent; emphasis inflation would contradict the teaching claim. Arrowheads must remain visible at mobile sizes.

**Developer notes:** render as an ordered list semantically (or figure with the long description programmatically associated via the UX §6.2 long-description pattern); the long text alternative ships from the canonical record, not hard-coded. Asset and caption are one versioned unit (Eng §8.5); the presentation export references the same asset ID.

**Content dependencies:** P1-LESSON-005 walkthrough (must match word-for-word on layer names); CS Appendix C records for traditional software, automation, AI, human review; M6 register entry.

---

## P1-DGM-002 — How traditional software, automation and AI differ *(addition A2)*

**Diagram title (displayed):** Three approaches, one difference that matters

**Learning purpose / teaching claim:** the three approaches differ in how decisions are made — written rules, chained setup, or learned patterns — not in how impressive they look. (LO1–LO3, LO6, LO8; counters M1/M11.)

**Learner placement:** in P1-LESSON-005, within "The three side by side", before the comparison table.

**Exact text appearing in the diagram:**

- Column 1 header: **Traditional software** · decides-by line: *Decides by written rules* · output line: *Same input, same output* · example line: *Tax calculator*
- Column 2 header: **Automation** · decides-by line: *Runs on its setup* · output line: *Same trigger, same steps* · example line: *Payroll on the 25th*
- Column 3 header: **AI** · decides-by line: *Decides by learned patterns* · output line: *Output can vary* · example line: *Spam filter*
- Banner beneath all three columns: *All three can look impressive — the difference is underneath.*
- Caption: What separates the three is how decisions get made, not how advanced the product looks.

**Node labels:** three column headers + three text lines each; every line ≤4 words except the banner and caption.

**Section labels:** a small shared row label at left of the decides-by row: *How it decides* (the row the claim lives in); other rows unlabelled to keep hierarchy on that line.

**Direction of flow:** none — three parallel columns read left to right, rows aligned for comparison. No arrows.

**Relationships:** parallel alternatives, not a sequence. The shared banner spans all three columns to bind them under the claim.

**Visual hierarchy:** the decides-by row is the emphasized row (weight and the row label); example rows are the lightest. Columns equal width and equal visual weight — no column may look "more advanced".

**Caption:** What separates the three is how decisions get made, not how advanced the product looks.

**Learner takeaway:** classify by mechanism, never by impressiveness.

**Alt text (≤125 chars):** Three columns — traditional software, automation, AI — compared by how each decides and what its output does.

**Full accessibility description / screen-reader equivalent (long text alternative):**

> Three approaches side by side. Traditional software decides by written rules; the same input gives the same output; a tax calculator is the example. Automation runs on its setup; the same trigger runs the same steps; payroll running on the 25th is the example. AI decides by learned patterns; its output can vary; a spam filter is the example. Beneath all three: all three can look impressive — the difference is underneath. What separates them is how decisions get made, not how advanced the product looks.

**Simplified mobile presentation:** columns stack vertically as three cards in the same order (traditional software, automation, AI), each card keeping its three lines; the banner becomes a full-width strip after the third card, before the caption. Reading order of the long description matches this stacked order, which also matches left-to-right desktop order.

**Reduced-motion alternative:** static; no carousel or swipe-only presentation on mobile — stacked cards scroll normally.

**Designer notes:** style tokens from UX §5. Resist icon decoration per column (a robot icon on the AI column would feed M12); if icons are used at all, they must be mechanism icons (rulebook, dominoes, scatter of points) approved by the education lead. Emphasis belongs to the decides-by row only.

**Developer notes:** semantically a comparison table or three-card list with the row label associated to each decides-by cell; long description from the canonical record; asset versioned with caption (Eng §8.5).

**Content dependencies:** P1-LESSON-002/003/004 Quick layers (terminology must match verbatim: "written rules", "learned patterns"); examples drawn from the CS §5.3 approved pool; M1/M11 register entries.

---

> INTERNAL VALIDATION NOTE:
> P1-DGM-002 exists under addition A2. Validate in pilot that the two diagrams read as different jobs (compare vs combine) rather than duplicates; if learners conflate them, DGM-002's candidate fallback is replacing the comparison table rather than sitting beside it.
