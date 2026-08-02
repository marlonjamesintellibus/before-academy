# Assessment mapping

```yaml
content_id: P1-FND-010
content_type: assessment-mapping
title: Assessment mapping - outcomes × content × items × remediation
phase: 4
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS Appendix B pattern (enforcement artifact); blueprint P1-FND-006
```

## Master matrix - learning outcomes

| LO | Taught by | Practised (activity) | Knowledge check | Core bank | Extended bank | Misconceptions | Remediation |
|---|---|---|---|---|---|---|---|
| LO1 | LESSON-002 | S01, S06 | Q01, Q04 | QB-001, 010 | 013, 015, 018, 023, 032, 035 | M1, M11 | REM-001, 011 |
| LO2 | LESSON-003 | S02, S04 | Q02 | QB-002, 007 | 016, 021, 024, 036 | M2 | REM-002 |
| LO3 | LESSON-004 | S03, S05, S07 | Q01, Q03 | QB-003, 004, 008 | 014, 017, 020, 025, 026, 033, 037, 040 | M3, M13 | REM-003, 013 |
| LO4 | LESSON-003/005 + DGM-001 | S08, S09 | Q02 | QB-005, 006 | 027, 028 | M2, M6 | REM-002, 006 |
| LO5 | LESSON-005 + DGM-001 | S06/S07 pair, S09 | Q02 | QB-002, 005, 006 | 019, 022, 036, 038 | M5, M6 | REM-005, 006 |
| LO6 | LESSON-002/004 outputs passages | S01 vs S05 | - | QB-001, 003 | 018, 026, 032, 033, 034, 035 | M4, M7, M11 | REM-004, 007, 011 |
| LO7 | LESSON-005 + DGM-001/002 | all ten | Q03 | QB-005..008 | 015–017, 020–029, 037 | M10, M14 | REM-010, 014 |
| LO8 | LESSON-005 callout | S06, S10 | Q04 | QB-009, 010 | 030, 031, 039 | M1, M9 | REM-001, 009 |
| LO9 | ACT instructions + S10 | S10 | - | QB-009 | 019, 031, 038, 039, 042 | M5, M8, M9 | REM-005, 008, 009 |
| LO10 | LESSON-004 M3 passage | S07 feedback | - | QB-004 | 034, 041 | M3 | REM-003 |

**Coverage result:** every LO is taught, practised, and assessed by at least one graded-eligible item. ✓

## Misconception coverage

| M-ID | Tested by (graded-eligible) | Remediation module |
|---|---|---|
| M1 | QB-001, 010, 023 | REM-001 |
| M2 | QB-002, 036 (+KC-Q02) | REM-002 |
| M3 | QB-004, 041 | REM-003 |
| M4 | QB-003 | REM-004 |
| M5 | QB-019, 038 | REM-005 |
| M6 | QB-006 | REM-006 |
| M7 | QB-003, 034 | REM-007 |
| M8 | QB-008, 020, 031 | REM-008 |
| M9 | QB-009, 030, 038, 039, 042 | REM-009 |
| M10 | QB-028 | REM-010 |
| M11 | QB-018, 032, 033 | REM-011 |
| M12 | *(gap - see below)* | REM-012 |
| M13 | QB-040 | REM-013 |
| M14 | QB-005, 029 | REM-014 |

## Gaps and flags

1. **M12 (AI must be conversational/humanoid) has no dedicated graded item.** It is taught (LESSON-004 quiet-AI passage) and practised (S06 feedback), and QB-017/025/026 test recognition of non-conversational AI implicitly. **Action for Phase 5/6:** either accept implicit coverage (recommended - a dedicated M12 stem risks a trick-adjacent "gotcha") or add one extended item in the Phase 6 audit. Flagged.
2. **LO6 and LO9 have no knowledge-check item** - acceptable: the check samples four of ten LOs by design (CS §6.2); both LOs have strong graded coverage.
3. **Questions testing multiple outcomes:** QB-005/006 (LO4+LO5+LO7), QB-009 (LO8+LO9), QB-033 (LO3+LO6) - all intentional; category tag remains singular for remediation routing.
4. **Items unsuitable for first attempts:** QB-038/039/040 (challenging swaps - retake rotation only until pilot data supports first-attempt use); diagnostic-tagged items (013–016, 021) excluded from graded draws while tagged diagnostic in a live cycle.
5. **Items requiring manual review before publication:** QB-005/027 (multiple-select scoring rule dependency), QB-009/031/038/039 (ambiguity keying - SME must confirm each "Not enough information" key survives scrutiny), S09/QB-006 wording ("trained on...") for technical accuracy.
6. **Requires learner-testing validation:** 5-of-6 pass math; all-or-nothing multiple-select scoring; the fixed inclusion of QB-009/010 in every draw; difficulty skew (25/52.5/22.5 combined vs ~40/45/15 target).

## Remediation coverage check

Every category maps to a block (blueprint table), every M-ID maps to a REM module (Phase 5), and every question's remediation link resolves to one of these. Content lint (Eng §14) enforces at publication.
