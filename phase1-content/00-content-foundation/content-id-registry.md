# Content ID registry

```yaml
content_id: P1-FND-007
content_type: id-registry
title: Content ID registry - Phase 1
phase: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
```

## Naming rules

1. Package IDs use `P1-<TYPE>-<NNN>` - uppercase type code, zero-padded three-digit number.
2. Child items append a typed suffix: scenario `-S01`, question `-Q01`, state `-R01` (result state), string `-U001`.
2a. The number `000` is reserved per type for a **set definition** (the file-level unit that defines a collection, e.g. `P1-QB-000`, `P1-RES-000`); a set definition may carry a letter suffix for sub-sets (e.g. `P1-UI-000-A`). Set definitions are internal and never learner-facing.
3. Canonical spec IDs keep their native format and are never re-prefixed: **LO1–LO10** (CS §5.1) and **M1–M14** (CS §8.1 + this package). Package files reference them as-is.
4. An ID identifies one content unit forever. Never assign the same ID to two units; never reuse a deprecated ID.
5. Approved IDs do not change in later phases unless a direct conflict is discovered; any change is documented in the phase manifest and `canonical-reconciliation.md`.

## Type codes

| Code | Meaning | Producing phase |
|---|---|---|
| P1-SEC | Section | 1 |
| P1-FND | Foundation document (internal) | 1 |
| P1-LESSON | Lesson unit | 2 |
| P1-DIAG | Opening diagnostic (addition A1) | 2 |
| P1-REF | Reflection prompt | 2 |
| P1-CONF | Confidence prompt | 2 |
| P1-DGM | Diagram | 3 |
| P1-ACT | Interactive activity | 3 |
| P1-KC | Knowledge check (practice) | 4 |
| P1-ASM | Assessment (graded) | 4 |
| P1-QB | Question-bank item | 4 |
| P1-RES | Assessment result state | 4 |
| P1-REM | Remediation module | 5 |
| P1-COM | Completion state | 5 |
| P1-PRG | Progress/next-step state | 5 |
| P1-GLO | Glossary entry | 6 |
| P1-UI | Interface copy item | 6 |
| P1-PRS | Presentation-reuse unit | 6 |
| P1-VAL | Validation/audit document (internal) | 6 |

The generation brief's recommended `P1-KC` prefix for the scored instrument is superseded by the knowledge-check/assessment terminology split (reconciliation R3): **P1-KC = practice knowledge check; P1-ASM = graded assessment.**

## IDs assigned in Phase 1

| ID | Unit |
|---|---|
| P1-SEC-001 | Section: AI, Automation and Traditional Software |
| P1-FND-001 | Canonical reconciliation record |
| P1-FND-002 | Learning outcomes |
| P1-FND-003 | Terminology guide |
| P1-FND-004 | Voice and tone |
| P1-FND-005 | Misconception map |
| P1-FND-006 | Assessment blueprint |
| P1-FND-007 | Content ID registry (this file) |
| P1-FND-008 | Learner journey |
| P1-FND-009 | Activity accessibility specification *(assigned Phase 3; registered here per Phase 6 audit correction C2)* |
| P1-FND-010 | Assessment mapping *(assigned Phase 4; registered here per Phase 6 audit correction C2)* |
| M7–M14 | New misconception register entries (M1–M6 pre-existing in CS) |

## Reserved ranges for later phases

| Range | Reserved for | Phase |
|---|---|---|
| P1-LESSON-001 | Section welcome | 2 |
| P1-LESSON-002 | Traditional software lesson | 2 |
| P1-LESSON-003 | Automation lesson | 2 |
| P1-LESSON-004 | Artificial intelligence lesson | 2 |
| P1-LESSON-005 | Compare the three / combined systems lesson | 2 |
| P1-DIAG-001 (+ -S01..S05) | Opening diagnostic + items | 2 |
| P1-REF-001..007 | Reflection prompts (CS-required reflection = P1-REF-001) | 2 |
| P1-CONF-001..002 | Pre-lesson and post-assessment confidence prompts | 2 |
| P1-DGM-001 | Canonical diagram "How Rules, Automation and AI Work Together" | 3 |
| P1-DGM-002 | Proposed comparison diagram (addition A2) | 3 |
| P1-ACT-001 (+ -S01..S10) | Sort the System + 10 canonical scenarios (CS §6.1 numbering preserved: S01 = scenario 1) | 3 |
| P1-KC-001 (+ -Q01..Q04) | Knowledge check + 4 practice questions | 4 |
| P1-ASM-001 | Assessment definition | 4 |
| P1-QB-001..012 | Core bank (10 items shipped; 011–012 reserved buffer; blueprint range 10–13, growth beyond 12 promotes extended items in place) | 4 |
| P1-QB-013..050 | Extended bank (addition A3) | 4 |
| P1-RES-001..014 | Result states | 4 |
| P1-REM-001..014 | Remediation modules, aligned to M1–M14 (P1-REM-*n* remediates M*n*) | 5 |
| P1-COM-001..005 | Completion states | 5 |
| P1-PRG-001..013 | Progress/next-step states | 5 |
| P1-GLO-001..023 | Glossary entries (001..021 in CS §10.2 order; 022–023 added per audit correction C5) | 6 |
| P1-UI-001..099 | Interface copy | 6 |
| P1-PRS-001..008 | Presentation-reuse units | 6 |

Future sections in the AI Awareness pathway use `P2-`, `P3-`... prefixes with the same type codes.

## Cross-file reference rules

- Reference by ID, never by title (titles may be edited; IDs may not).
- Every question carries `learning_outcomes`, exactly one `category`, `misconception_tags` where applicable, and a resolving `remediation_id` (lint, Eng §14).
- Every remediation module names its triggering category/misconception IDs and its target block IDs.
- Learner-facing copy never displays IDs.

## Versioning rules

- The package uses semantic versioning; each phase delivery bumps the minor version (0.1.0 = Foundation, 0.2.0 = + lessons, ... 1.0.0 = validated package).
- Individual content units carry `content_status` (draft-for-validation → in-review → approved → published → archived) following the CS §13.1 lifecycle; merge = record (Eng §8.3).
- A meaning change to any approved definition is a canonical-record change and requires the CS §13.1 reviewer set; wording-for-flow changes within a block do not alter the record.

## Deprecation rules

- Superseded content is archived, never deleted (Eng §5.2); archived items note their replacement ID.
- A deprecated ID is retired permanently; the registry keeps the row with status `archived → replaced by <ID>`.
- If an ID must change due to a direct conflict, the change is recorded in the phase manifest, the reconciliation file, and both affected units.
