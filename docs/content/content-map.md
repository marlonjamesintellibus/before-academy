---
title: Master Content Map - AI Awareness (Level 1)
category: content
owner: education-lead
status: in_review
depends_on: [learning-framework.md, knowledge-model.md, assessments.md, governance.md]
used_by: [../roadmap/milestones.md, ../product/screens/marketing-and-pathway.md]
last_updated: 2026-08-03
---

# Master Content Map: AI Awareness (Level 1)

The commissioning spine for the AI Awareness pathway. Every section is planned here **before** a writer is briefed, so the seven sections are authored against one set of objectives, one ID scheme, and one assessment blueprint instead of drifting apart as they are written.

Scope is Level 1 only. Levels 2 to 7 get their own maps when their phase opens; this file's structure is the template.

**Status of this document: the commissioning plan of record.** The eight decisions it opened were delegated to the product team and are resolved at the foot of this file. Section AIA-3 is built, published, and approved; sections AIA-1, 2, 4, 5, 6 and 7 are approved *as plans* and writers may be briefed from them. Copy produced from those plans still passes the normal review gates before publication.

## Label legend

Per the roadmap brief, every claim below carries one of:

| Label | Meaning |
|---|---|
| **Confirmed** | Built, reviewed, and published, or an approved decision recorded in an ADR |
| **Recommended** | The product team's proposal; needs education-lead approval before briefing a writer |
| **Requires validation** | Needs learner evidence before it is treated as settled |
| **Dependent on document audit** | Cannot be finalized until the company's existing documentation is accessible |

## Identifier scheme

**Decision required before Section 2 is authored.** The published section uses unprefixed IDs (`P1-LESSON-002`, `P1-QB-001`, `LO1`…`LO10`) that carry no section discriminator. That was harmless with one section and breaks with seven: `LO4` would mean four different objectives.

Recommended scheme for all new content:

| Kind | Pattern | Example |
|---|---|---|
| Section | `AIA-<n>` | `AIA-4` |
| Lesson block | `AIA-<n>-LESSON-<nnn>` | `AIA-4-LESSON-002` |
| Learning objective | `AIA-<n>-LO<n>` | `AIA-4-LO3` |
| Question | `AIA-<n>-QB-<nnn>` | `AIA-4-QB-007` |
| Activity scenario | `AIA-<n>-ACT-<nnn>-S<nn>` | `AIA-4-ACT-001-S03` |
| Diagram | `AIA-<n>-DGM-<nnn>` | `AIA-4-DGM-001` |

**The published section keeps its `P1-*` IDs.** They are in the database, referenced by lesson anchors, remediation deep links, and e2e tests; renaming them buys nothing and risks live links. AIA-3 is therefore recorded as a legacy-prefix section, and content-lint should reject the `P1-` prefix on any newly added record so the exception cannot spread.

Misconception IDs (`M1`…`M6`) stay pathway-wide and unprefixed by design: a misconception is a property of the learner, not of a section, and several sections correct the same ones.

## Pathway overview

| ID | Section | Status | Priority | Est. time | Depends on |
|---|---|---|---|---|---|
| AIA-1 | What Is Artificial Intelligence? | **Published** | Must have | 15-20 min | none |
| AIA-2 | AI in Everyday Life | **Published** | Must have | 15-20 min | AIA-1 concepts |
| AIA-3 | AI, Automation and Traditional Software | **Published** | Must have | ~20 min | none (built as the vertical slice) |
| AIA-4 | What AI Can Do | **Published** | Must have | 15-20 min | AIA-1, AIA-3 |
| AIA-5 | What AI Cannot Reliably Do | **Published** | Must have | 20-25 min | AIA-4 |
| AIA-6 | Myths and Misconceptions | **Published** | Should have | 15-20 min | AIA-1 through AIA-5 |
| AIA-7 | Where to Go Next | **Published** | Must have | 10-15 min | all; ends in the pathway assessment |

Learner order is 1 to 7. **Build order is not learner order:** AIA-3 was built first deliberately, because it is the section that best tests the platform ([roadmap brief, vertical slice rationale](../roadmap/milestones.md)). Recommended build order for the remainder: **AIA-1 → AIA-4 → AIA-5 → AIA-2 → AIA-6 → AIA-7**. Rationale: AIA-1 is the foundation every other section assumes; AIA-4 and AIA-5 form a matched pair (capability and its limits) and should be written together by one author to keep the boundary consistent; AIA-2 is the most example-heavy and benefits from the audit; AIA-6 mostly recombines misconceptions already corrected elsewhere, so it is cheapest last; AIA-7 must be written last because it summarizes the others.

Total pathway time at these estimates is 110 to 150 minutes, which is **Requires validation**: the brief's beginner persona may not sustain that in one sitting, and the return-visit loop already built ([review-schedule](../../src/features/progress/review-schedule.ts)) assumes multi-session use.

## Section records

Each record carries the field set the roadmap brief specifies. Fields that are identical for every Level 1 section are stated once here rather than repeated: **Audience** = AI Beginner (primary persona, [personas-and-journeys.md](../product/personas-and-journeys.md)) · **Competency level** = 1, AI Awareness · **Pathway** = `ai-awareness` · **Public or internal** = Public · **Content owner** = education lead · **Technical reviewer** = SME · **Educational reviewer** = instructional reviewer · **Version** = 1 at first publish · **Review cadence** = 6 months, or immediately on a learner-reported factual error ([governance.md](governance.md)) · **Source documents** = Dependent on document audit.

---

### AIA-1 · What Is Artificial Intelligence?

**Description.** The beginner definition, and why the definition is genuinely contested rather than simply unknown. Establishes the vocabulary every later section leans on.

**Learning objectives** (Recommended)
1. `AIA-1-LO1` Define AI in one sentence, in plain language, without using the word "intelligent".
2. `AIA-1-LO2` Explain why AI is a field rather than a single technology.
3. `AIA-1-LO3` Explain why experts disagree about the boundary of the term.
4. `AIA-1-LO4` Distinguish "does a task well" from "thinks like a person".
5. `AIA-1-LO5` Recognize that a system's label is a marketing choice, not evidence.

**Format.** Standard lesson: hook → why it matters → objectives → concept blocks (quick/explore/deeper) → diagram → misconception callout → activity → knowledge check → takeaway.

**Interaction.** *AI or Not AI?* Learners classify familiar systems and get an evidence-first explanation after each. Deliberately the same classification muscle as AIA-3's *Sort the System* but with a binary decision, so the two do not feel like the same exercise twice. **Requires validation:** if learner testing shows the two read as duplicates, AIA-1 should switch to a definition-building interaction instead.

**Misconceptions addressed.** M1 (complex equals AI), M3 (AI thinks like a person).

**Assessment method.** Section bank of 8-12 questions, blueprint categories: *definition*, *scope of the field*, *label versus evidence*. Contributes to the pathway assessment.

**Related content.** Glossary: artificial intelligence, model, algorithm. Canonical records: `artificial-intelligence`, `machine-learning`.

**Prerequisites.** None. This is the pathway entry point for learners who do not skip.

**Dependencies.** Canonical record for `artificial-intelligence` must be approved first; it is the definition every other section quotes.

**Priority.** Must have.

**Build status: published.** Lesson (`src/db/seed/sections/aia-1.ts`) plus a four-question knowledge check (`aia-1-check.ts`), live at `/learn/ai-awareness/what-is-artificial-intelligence`. Outstanding: a section assessment bank; Level 1 grading is intended to sit with the pathway assessment.

**Retrieval rule, clarified.** The learning framework requires retrieval "via any route", not every format. The first section carries both an activity and a check because it was the slice testing both formats. Content-lint therefore requires a published section to offer **at least one** retrieval step, and this section's is the knowledge check. Flagged for education-lead review: if the interaction named above is judged essential rather than optional, this section needs it before the pilot.

---

### AIA-2 · AI in Everyday Life

**Description.** Where AI already sits in the learner's day, chosen so recognition does the teaching. Breadth over depth; this is the section that makes the topic feel personally relevant rather than abstract.

**Learning objectives** (Recommended)
1. `AIA-2-LO1` Identify AI in at least six everyday contexts.
2. `AIA-2-LO2` Explain what the system is doing in each case in one sentence.
3. `AIA-2-LO3` Recognize that most everyday AI is invisible rather than conversational.
4. `AIA-2-LO4` Distinguish a product that uses AI from a product that is AI.

**Format.** Standard lesson, example-dense. Coverage: search, recommendations, navigation, fraud detection, spam filtering, voice assistants, customer support, image recognition, generative AI.

**Interaction.** *A Day With AI.* Learners walk a fictional person's day and mark where AI appears, with an explanation per beat.

**Misconceptions addressed.** M5 (you can tell from the interface), M6 (AI works alone).

**Assessment method.** Section bank 8-12: *recognition in context*, *what the system is doing*, *invisible versus conversational*.

**Related content.** Feeds AIA-4 (the same examples are reused to teach capability categories, which is deliberate reinforcement, not repetition).

**Prerequisites.** AIA-1 concepts. Not enforced: no section locks (ADR-003, **Confirmed**).

**Dependencies.** **Dependent on document audit** for company-specific examples. Generic examples can be written immediately; swapping in real company work is what makes this section an authority asset rather than a generic explainer.

**Priority.** Must have.

---

### AIA-3 · AI, Automation and Traditional Software

**Status: Published, version 1, approved.** Full specification: [lessons/ai-automation-software.md](lessons/ai-automation-software.md).

**Learning objectives.** LO1-LO10 (legacy unprefixed IDs, **Confirmed**).

**Interaction.** *Sort the System*, 10 scenarios, five categories including "Not enough information".

**Assessment.** Bank of 10 questions across seven categories; 6 per attempt; 80% threshold (provisional, ADR-030).

**Misconceptions addressed.** M1, M2, M4, M5, M6, with M1 featured.

**Canonical records.** Populated and lint-enforced for all eleven Phase 1 concepts ([knowledge-model.md](knowledge-model.md)).

---

### AIA-4 · What AI Can Do

**Description.** The capability categories, framed as "what kind of job is this?" so the learner acquires a decision tool rather than a list.

**Learning objectives** (Recommended)
1. `AIA-4-LO1` Name the main capability categories: pattern recognition, classification, prediction, generation, summarization, decision support.
2. `AIA-4-LO2` Match a real task to the capability it needs.
3. `AIA-4-LO3` Explain why a task's suitability depends on tolerance for being wrong.
4. `AIA-4-LO4` Recognize that most products combine several capabilities.

**Format.** Standard lesson. Diagram: capability categories with one real example each, one teaching claim.

**Interaction.** *Choose the Best Use Case.* Learners pick which of several tasks suits AI, with feedback naming the deciding property rather than the verdict.

**Misconceptions addressed.** M1, M6.

**Assessment method.** Section bank 8-12: *capability identification*, *task matching*, *combination*.

**Related content.** Pairs with AIA-5. **The two must be written together by one author**, because the boundary between "can" and "cannot reliably" is exactly where beginners get lost, and a seam between two writers will show.

**Prerequisites.** AIA-1, AIA-3.

**Priority.** Must have.

**Build status: published.** Lesson (`src/db/seed/sections/aia-4.ts`) plus a four-question knowledge check (`remaining-checks.ts`). Outstanding: assessment bank; Level 1 grading is intended to sit with the pathway assessment.

---

### AIA-5 · What AI Cannot Reliably Do

**Description.** The limits, taught as properties of the mechanism rather than as warnings. The most consequential section in the pathway for real-world behaviour, and the one most likely to be written as fear rather than judgment.

**Learning objectives** (Recommended)
1. `AIA-5-LO1` Explain why a pattern-based system cannot guarantee accuracy.
2. `AIA-5-LO2` Explain why fluent output is not evidence of truth.
3. `AIA-5-LO3` Recognize that bias is inherited from data, not chosen by the system.
4. `AIA-5-LO4` Identify situations where human review is required.
5. `AIA-5-LO5` Decide whether a given output is usable as-is, needs review, or should not be used.

**Format.** Standard lesson. **Editorial constraint (Recommended):** limitations are stated as mechanism consequences, never as alarm. The tone target is a competent colleague explaining a tool's failure modes.

**Interaction.** *Would You Trust This?* Three-way decision: use directly, review first, do not use. This is the pathway's most transferable interaction and the strongest candidate for the evidence-board treatment later.

**Misconceptions addressed.** M3, M4, M7 (registered as part of decision 3).

**Assessment method.** Section bank 10-12 (larger: this is the highest-stakes content), with scenario decisions weighted above recall.

**Prerequisites.** AIA-4.

**Priority.** Must have.

**Build status: drafting.** Lesson authored (`src/db/seed/sections/aia-5.ts`), written as one piece with AIA-4 so the boundary holds. Outstanding before publish: activity, knowledge check, assessment bank, generalized step routes.

**Build status: published.** Lesson (`src/db/seed/sections/aia-2.ts`) plus a four-question knowledge check (`remaining-checks.ts`). Outstanding: assessment bank; Level 1 grading is intended to sit with the pathway assessment.

---

### AIA-6 · Myths and Misconceptions

**Description.** Consolidation. Every myth here has already been corrected in an earlier section; this section is retrieval practice across all of them, not new teaching.

**Learning objectives** (Recommended)
1. `AIA-6-LO1` Judge common AI claims as accurate, misleading, or context-dependent.
2. `AIA-6-LO2` Name the evidence that would settle each claim.
3. `AIA-6-LO3` Explain one myth to someone else in plain language.

**Format.** Lighter lesson, heavier activity. **Recommended:** this is the section to make almost entirely interactive, since its job is retrieval rather than exposition.

**Interaction.** *Myth or Reality*, drawing on the full register M1-M7.

**Misconceptions addressed.** All registered.

**Assessment method.** Section bank 8-10, drawn largely from the misconception category. **Requires validation:** if pathway-assessment analytics show misconceptions already well covered by AIA-1 through AIA-5, this section may be better as an optional practice set than a required section. Decide from pilot data.

**Prerequisites.** AIA-1 through AIA-5 conceptually.

**Priority.** Should have. This is the one Level 1 section that could ship after the pathway assessment without leaving a hole.

**Build status: published.** Lesson (`src/db/seed/sections/aia-6.ts`) plus a four-question knowledge check (`remaining-checks.ts`). Outstanding: assessment bank; Level 1 grading is intended to sit with the pathway assessment.

---

### AIA-7 · Where to Go Next

**Description.** The pathway close: recap, honest statement of what the learner can now do, and an orientation to what follows. Also the pathway's main conversion moment.

**Learning objectives** (Recommended)
1. `AIA-7-LO1` Summarize what AI Awareness covered in the learner's own words.
2. `AIA-7-LO2` Choose an appropriate next competency level.
3. `AIA-7-LO3` Describe what the three role pathways lead to.

**Format.** Short recap plus the **pathway assessment** (distinct from the section assessments; see below). Ends with the capstone-style transfer task already built for AIA-3, generalized.

**Interaction.** Pathway self-assessment against the Level 1 competencies, feeding the skill map.

**Assessment method.** Hosts the pathway assessment.

**Dependencies.** Cannot be written until AIA-1 through AIA-6 are approved, and the Level 2 map exists at least in outline, or this section will describe a next step that does not exist. **This is the section most at risk of promising unbuilt content**, which the product has already had to correct once.

**Priority.** Must have.

**Build status: published.** Lesson (`src/db/seed/sections/aia-7.ts`) plus a four-question knowledge check (`remaining-checks.ts`). Outstanding: assessment bank; Level 1 grading is intended to sit with the pathway assessment.

---

## Pathway assessment

**New artifact.** Today only section assessments exist. The pathway assessment is a Level 1 competency check drawing across all seven sections, and it is what "passing AI Awareness" should mean.

| Property | Value | Label |
|---|---|---|
| Total bank | 60-80 questions (sum of section banks) | Recommended |
| Per attempt | 12-15 questions | Recommended |
| Category coverage | at least one from each of the seven sections | Recommended |
| Threshold | 80%, configuration not code | Confirmed (ADR-030), value provisional |
| Retakes | unlimited, different combination, rotated options | Confirmed |
| Remediation | per-section, routed by failed category | Confirmed pattern, needs per-section mapping |

Formats currently implemented are multiple choice, multiple select, and scenario decision. The blueprint also names **matching and sorting**, which are specified but unbuilt. **Recommended:** build them during AIA-4, whose task-matching content is their natural home, rather than as a standalone engineering task.

## Maintenance rules

1. **No writer is briefed before their section's record here is approved.** The record is the brief.
2. **A section's record is updated in the same pull request that changes its content**, so the map cannot drift from what shipped. Content-lint should eventually assert that every published section has a record here.
3. **Review cadence is six months**, or immediately on a learner-reported factual error (governance expedited path, 48 hours).
4. **New levels get their own map file** in this directory using this structure.
5. **Status values match the governance lifecycle** exactly: Planned → Drafting → Technical review → Educational review → Approval → Published → Monitored → Updated or Archived.

## Decisions taken

All eight decisions were delegated to the product team and are settled below. Each is **revisitable on evidence**, and the two that touch factual accuracy still need a subject-matter reviewer before lesson copy is published: deciding a direction is not the same as certifying that the content is correct, and [governance.md](governance.md) requires SME sign-off on canonical definitions regardless of who set the direction.

| # | Decision | Resolution | Rationale |
|---|---|---|---|
| 1 | Identifier scheme | **Adopted as specified above.** Enforced by content-lint: any section other than the published one is rejected if it uses the `P1-` prefix. | The scheme is unambiguous and the enforcement means the legacy exception cannot spread by copy-paste, which is the only way it realistically would. |
| 2 | The seven section records | **Adopted as the commissioning plan.** Writers may be briefed from them. | They follow the roadmap brief's own pathway, and holding the whole content track for a review that is not scheduled costs more than the risk of amending a record mid-draft. **SME review still gates publication** of the resulting copy. |
| 3 | M7 in the register | **Added.** "AI is objective because it is a machine", corrective framed as inherited-not-chosen bias. | It was the one misconception AIA-5 needed and the register lacked. Written now so AIA-5 can be commissioned without a blocker. |
| 4 | Build order | **Confirmed: AIA-1 → AIA-4 → AIA-5 → AIA-2 → AIA-6 → AIA-7.** | Foundation first, then the capability pair by one author, then the example-heavy section that most benefits from the document audit, then consolidation, then the closer that summarizes the rest. |
| 5 | Is AIA-6 required | **Required for now, revisit on pathway-assessment analytics.** | Making it optional before there is evidence would remove the only section whose sole job is cross-section retrieval, which is the mechanism most likely to produce durable recall. Cheaper to cut later than to add back. |
| 6 | Total pathway time | **Accepted at 110-150 minutes, explicitly as multi-session.** | The return loop and spaced review already assume repeat visits, so the number to defend is per-session length (15-25 minutes), not the total. Section scoping should hold that per-section budget. |
| 7 | Public listing of all seven sections | **Yes, with honest per-section status.** | The pathway page previously implied a two-section product, which understated the work and left the roadmap invisible to learners and leadership alike. Statuses are labelled so nothing reads as available when it is not. |
| 8 | 3-6 approved examples per record | **Applied.** Every record now carries at least three examples with identifying clues, and content-lint enforces the floor. | An aspirational standard that lint did not check is how the empty `canonical_records` table happened in the first place. |

## Still requiring a human, by role

Deciding direction did not remove these, and none of them are product-team calls:

- **SME accuracy review** of the eleven canonical records and any lesson copy written from these plans ([governance.md](governance.md) minimum reviewers).
- **Education-lead review** of the section records as instructional design, which may amend objectives or interaction choices.
- **The document audit**, which is what turns generic examples into company-specific ones and is still pending access.

## Related Documents
- [learning-framework.md](learning-framework.md) - the model every section inherits
- [knowledge-model.md](knowledge-model.md) - canonical records the sections must quote
- [assessments.md](assessments.md) - blueprint discipline the section banks follow
- [governance.md](governance.md) - the review gates each record moves through
