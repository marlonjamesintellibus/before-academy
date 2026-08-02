# Before Academy - Phase 1 learner content package

**Section:** AI, Automation and Traditional Software
**Competency level:** Level 1 - AI Awareness
**Content status:** draft-for-validation
**Package version:** 0.6.0 (all six generation phases complete)

---

## Purpose

This package contains the implementation-ready, learner-facing content for the Phase 1 vertical slice of Before Academy. It is not a curriculum outline or a strategy document: it holds the actual copy learners read, the scenarios they classify, the questions they answer, the feedback they receive, the remediation they review, and the supporting interface copy around all of it.

The package is produced in six generation phases. This version contains **all six phases**: the content foundation plus lessons, diagrams, activities, assessment, remediation, and supporting copy in the folders below.

## Canonical inputs

This package is subordinate to the approved Before Academy documents. Where this package and a canonical document disagree, the canonical document wins and the discrepancy is a defect here.

1. Phase 0 - Alignment and Foundations
2. Phase 1 - AI Awareness Vertical Slice
3. Product & UX Specification v1.0 (cited as "UX §n") - canonical for interface behaviour and verbatim UI strings
4. Engineering Specification v1.0 (cited as "Eng §n") - canonical for storage, delivery, and content lint
5. **Content Specification v1.0 (cited as "CS §n") - the primary canon for this package:** learning model, knowledge model, lesson spec, interactions, assessment blueprint, misconceptions, feedback, glossary, accessibility, governance

Conflicts between the original generation brief and the Content Specification, and how each was resolved, are recorded in `00-content-foundation/canonical-reconciliation.md`. That file is part of the change record required by the phase rules and must be read before reviewing anything else.

## Target learner

Complete beginners - adults who have heard about AI but cannot yet reliably distinguish AI from automation or traditional software. No coding, math, or technical background is assumed. Reading level target: Grade 8–10 (CS §12.1). The Phase 1 promise: after roughly twenty minutes, a learner can explain the distinctions in their own words, classify familiar systems, and recognize when they don't have enough information to judge (CS §1.1).

## Folder structure

```text
phase-1-ai-automation-traditional-software/
├── README.md
├── 00-content-foundation/        Phase 1 - system of truth (this delivery)
│   ├── canonical-reconciliation.md
│   ├── section-metadata.md
│   ├── learning-outcomes.md
│   ├── terminology-guide.md
│   ├── voice-and-tone.md
│   ├── misconception-map.md
│   ├── assessment-blueprint.md
│   ├── content-id-registry.md
│   └── learner-journey.md
├── 01-core-lessons/              Phase 2 - learner-facing lessons
├── 02-diagrams-and-activities/   Phase 3 - diagram specs + Sort the System
├── 03-assessment/                Phase 4 - assessment, bank, results, mapping
├── 04-remediation-and-completion/ Phase 5 - remediation + completion states
├── 05-supporting-content/        Phase 6 - glossary, account copy, UI copy, presentation reuse
└── 06-validation/                Phase 6 - audits and final manifest
```

## How to use these files

- **Content editors and writers:** the foundation files define approved terminology, tone, outcomes, misconceptions, and IDs. Learner copy in later phases must trace to them; a synonym for a fixed term is a defect, not a style choice (CS §11).
- **Product designers and engineers:** learner-facing copy is clearly separated from internal notes. Anything inside a blockquote beginning `INTERNAL VALIDATION NOTE` is never shown to learners. Verbatim UI strings remain canonical in UX §7; strings drafted in this package for completeness must be reconciled against the UX spec before implementation.
- **QA:** the content-id registry and assessment blueprint are the traceability artifacts. Every question, scenario, and remediation link must resolve to an outcome, a category, and a block (Eng §14 content lint).
- **AI coding agents:** treat every file in `00-content-foundation/` as binding constraints. Do not invent terminology, IDs, categories, or thresholds; consume them from these files.

## How future phases preserve approved decisions

1. Read all previously approved files before generating anything.
2. Treat definitions, IDs, terminology, outcomes, category labels, and structures as binding.
3. Never assess a concept that was not taught.
4. Never assign an ID that conflicts with `content-id-registry.md`.
5. On discovering a contradiction: stop, identify it, prefer the most recently approved canonical source, document the resolution in `canonical-reconciliation.md`, and change only the files affected.

## Learner-facing content versus internal notes

Learner-facing copy is plain Markdown body text inside clearly labelled sections. Internal material uses one of two markers:

```markdown
> INTERNAL VALIDATION NOTE:
> This decision should be tested during learner validation.
```

for testable assumptions, and YAML metadata blocks for structured implementation data. Neither is ever rendered to learners.
