# Final content manifest

```yaml
content_id: P1-VAL-004
content_type: package-manifest
title: Final content manifest — Phase 1 learner content package
phase: 6
section: ai-automation-traditional-software
version: 0.6.0
content_status: draft-for-validation → ready for implementation validation
```

## Package

**Before Academy — Phase 1 vertical slice: AI, Automation and Traditional Software.** Version 0.6.0 (all six generation phases complete). Subordinate canon: Content Specification v1.0, UX Specification v1.0, Engineering Specification v1.0, Phase 0/1 documents.

## Folder structure and file purposes

```text
phase-1-ai-automation-traditional-software/
├── README.md                                  package orientation and usage rules
├── 00-content-foundation/
│   ├── canonical-reconciliation.md            conflict resolutions R1–R9, approvals A1–A5, change log — P1-FND-001
│   ├── section-metadata.md                    section definition, thresholds, entry/exit — P1-SEC-001
│   ├── learning-outcomes.md                   LO1–LO10 + supporting objectives, evidence, methods — P1-FND-002
│   ├── terminology-guide.md                   fixed labels, layer names, approved terms — P1-FND-003
│   ├── voice-and-tone.md                      voice, tone-by-situation, banned list, exemplars — P1-FND-004
│   ├── misconception-map.md                   register M1–M14 with strategies — P1-FND-005
│   ├── assessment-blueprint.md                instruments, categories, difficulty, rules — P1-FND-006
│   ├── content-id-registry.md                 ID rules, assignments, reservations — P1-FND-007
│   └── learner-journey.md                     16 stages × 8 dimensions, three routes — P1-FND-008
├── 01-core-lessons/
│   ├── section-welcome.md                     welcome + hook/why/objectives blocks — P1-LESSON-001
│   ├── opening-diagnostic.md                  5 ungraded items, deferred reveal — P1-DIAG-001
│   ├── traditional-software.md                four-layer lesson — P1-LESSON-002
│   ├── automation.md                          four-layer lesson — P1-LESSON-003
│   ├── artificial-intelligence.md             four-layer lesson — P1-LESSON-004
│   ├── compare-the-three.md                   comparison + combined systems + callout — P1-LESSON-005
│   └── reflection-prompts.md                  P1-REF-001..007
├── 02-diagrams-and-activities/
│   ├── diagrams.md                            P1-DGM-001 (canonical), P1-DGM-002 (A2)
│   ├── classification-activity.md             Sort the System, 10 scenarios, 50 feedbacks — P1-ACT-001
│   └── activity-accessibility.md              interaction accessibility spec — P1-FND-009
├── 03-assessment/
│   ├── assessment.md                          graded instrument + core bank — P1-ASM-001, P1-QB-001..010
│   ├── knowledge-check.md                     4 practice items — P1-KC-001
│   ├── question-bank.md                       30 extended items — P1-QB-013..042
│   ├── assessment-results.md                  14 result states — P1-RES-001..014
│   └── assessment-mapping.md                  coverage matrix and gaps — P1-FND-010
├── 04-remediation-and-completion/
│   ├── remediation.md                         14 modules — P1-REM-001..014
│   ├── completion.md                          5 states — P1-COM-001..005
│   └── progress-and-next-steps.md             13 states — P1-PRG-001..013
├── 05-supporting-content/
│   ├── glossary.md                            23 entries — P1-GLO-001..023
│   ├── guest-and-account-copy.md              13 account/guest states
│   ├── system-and-interface-copy.md           36 proposed strings — P1-UI-001..036
│   └── presentation-reuse.md                  8 deck units — P1-PRS-001..008
└── 06-validation/
    ├── content-validation-checklist.md        24-point audit, corrections C1–C5 — P1-VAL-001
    ├── accessibility-audit.md                 19-area audit — P1-VAL-002
    ├── assessment-audit.md                    16-area audit — P1-VAL-003
    └── final-content-manifest.md              this file — P1-VAL-004
```

## Cross-file dependencies (load-bearing)

Foundation binds everything; L005 walkthrough ↔ DGM-001 labels (verbatim match, QA-enforced); activity feedback → remediation chips → REM modules; every QB/KC/scenario item → LO + category + remediation (lint, Eng §14); UI strings → UX §7 merge (A4); glossary ↔ canonical records (definition changes are record changes).

## Coverage summary

- **Learning outcomes:** 10/10 taught, practised, and graded.
- **Assessment:** 44 items total (10 core + 30 extended + 4 practice); 6 per graded attempt; 14 result states.
- **Misconceptions:** 14/14 registered, taught, remediated; 13/14 with dedicated graded items (M12 accepted-implicit, C3).
- **Remediation:** 14/14 modules, every trigger resolving.
- **Accessibility:** complete content-side specs; interface verification transfers to build QA.

## Corrections applied this phase

C1 banned word in REM-013 · C2 registry rows for FND-009/010 · C3 M12 accepted-implicit decision · C4 chip-count acceptance with trim candidates · C5 glossary extension to 23. No approved meaning was rewritten.

## Known assumptions requiring learner testing

80% threshold as 5-of-6 (granularity note) · layer word budgets and the standalone test · difficulty skew 25/52.5/22.5 · all-or-nothing multiple-select scoring · fixed draw of QB-009/010 · diagnostic design (5 items, deferred reveal) and A1 approval standing · DGM-002 distinctness (A2) · extended-bank size and tags (A3) · UI strings pending UX merge (A4) · reflection pool surfacing cap (A5) · S04 spaced-retrieval repeat · chip count (C4) · time estimates · account-prompt placements · REM max-repetitions (2) and escalation trigger · 30-day long-absence threshold · SME review of new remediation examples and analogy extensions.

## Recommended next implementation step

1. Marlon signs off the five audit decisions (C1–C5) and the standing A1–A5 approvals.
2. SME technical review of the manual-review set (ambiguity keys, "trained on…" wordings, remediation examples/analogies).
3. Merge P1-UI strings into the UX §7 strings file with a version bump (A4).
4. Ingest the package into the repo /docs knowledge base (sixth-deliverable structure) and wire content lint (Eng §14): readability, remediation-link resolution, banned-word list, blueprint coverage.
5. Build against UX §S03–S09 with `activity-accessibility.md` as the QA script; pilot; revisit every item on the assumptions list with question-level analytics.
