---
title: Assessment Specification
category: content
owner: education-lead
status: approved
used_by: [../engineering/assessment-engine.md]
related: [../adr/adr-028-blueprint-metadata.md, ../adr/adr-030-provisional-threshold.md]
last_updated: 2026-07-31
---

# Assessments

**Philosophy:** measure whether the learner can *use* the distinction. Every question is a decision a real person could face; recall-only questions capped at two per bank. Passing must be achievable from Quick layers alone (standalone test). Failure output is diagnostic by design.

## Blueprint (Phase 1 bank: 10–13; per attempt: 6–7 across ≥6 categories)
| Category | Measures (LOs) | Bank | Per attempt |
|---|---|---|---|
| Traditional software | LO1, LO6 | 1–2 | ≥1 of first two |
| Automation | LO2, LO4, LO5 | 1–2 | ≥1 of first two |
| AI characteristics | LO3, LO6, LO10 | 2 | 1 |
| Combined systems | LO4, LO5, LO7 | 2 | 1 |
| Classification | LO7 | 2 | 1 |
| Ambiguity | LO9 | 1 | 1 |
| Misconceptions | LO8, LO10 | 1–2 | 1 |

Formats: multiple choice, multiple select, matching, sorting, scenario decision. "All of the above" banned (rotation integrity). Applied items keep two industry variants (e.g., banking/retail) so retakes change surface, not skill.

## Difficulty
Foundational (Quick-layer answerable, single concept) ~40% · Applied (transfer to unseen scenario) ~45% · Challenging (combine concepts / spot insufficient evidence) ~15%.

## Passing, retakes, remediation mapping
Threshold **80% - provisional, configuration not code**; reviewed from pilot question analytics. Retakes unlimited: different combination, rotated answers, preserved coverage; never punitive framing. Remediation map (category → blocks): traditional→its block · automation→automation+combined · AI characteristics→AI block (probabilistic passage) · combined→combined+diagram · classification→activity summary+concept · ambiguity→scenario-10 explanation · misconceptions→callout+[misconceptions.md](misconceptions.md) corrective. Every question's remediation link must resolve (content-lint).

## Related Documents
- [../engineering/assessment-engine.md](../engineering/assessment-engine.md) - selection/scoring mechanics
