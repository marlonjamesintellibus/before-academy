# Content validation checklist

```yaml
content_id: P1-VAL-001
content_type: validation-audit
title: Content validation checklist - Phase 1 package
phase: 6
section: ai-automation-traditional-software
content_status: audit-complete
```

Statuses: **Pass** · **Pass with note** · **Requires correction** (with the correction applied and logged). Corrections carry IDs C1… for the manifest.

| # | Check | Status | Note / correction |
|---|---|---|---|
| 1 | Every learning outcome is taught | Pass | Matrix in P1-FND-010; LO1–LO10 each map to a teaching unit |
| 2 | Every learning outcome is assessed | Pass | Every LO has ≥1 graded-eligible item |
| 3 | Traditional software accurately described | Pass | CS-approved definition verbatim; deterministic framing consistent |
| 4 | Automation accurately described | Pass | "How work flows" framing consistent across lesson, activity, glossary |
| 5 | AI accurately described | Pass | Pattern-based definition verbatim; probabilistic framing consistent |
| 6 | Automation not treated as a synonym for AI | Pass | Explicit "automation ≠ AI, may contain AI" in L003, REM-002, PRS-002 |
| 7 | AI not presented as magic | Pass | No magic framing anywhere; banned-word scan clean |
| 8 | AI not presented as human consciousness | Pass | Anthropomorphic-verb scans clean across all learner copy |
| 9 | Hybrid (combined) systems explained | Pass | L005 walkthrough + DGM-001 + six-case gallery |
| 10 | Not-enough-information scenarios included | Pass | S10, QB-009/031/038/039, diagnostic S02/S04; overuse guard in feedback |
| 11 | Marketing language treated critically | Pass | S10, QB-030/042, REM-009, PRS-007 - both directions (proves nothing, disproves nothing) |
| 12 | Examples realistic and varied | Pass | Industries: banking, retail, healthcare, education, transport, logistics, media, communication, workplace |
| 13 | Incorrect feedback teaches | Pass | All 50 activity + all bank feedbacks follow Verdict → Because → Clue → Next |
| 14 | Remediation uses different explanations | Pass | Every REM module leads with held-back or fresh material; commitments from Phase 2 honoured |
| 15 | Language beginner-friendly | Pass with note | Grade 8–10 target by construction; automated readability lint (Eng §14) must confirm per block at implementation |
| 16 | Optional depth doesn't overwhelm the core | Pass with note | Quick layers stand alone; L004 Explore at budget ceiling (fallback documented); six-case gallery optional |
| 17 | Questions avoid tricks | Pass | No unmarked negation, no near-synonym distractors, no "all of the above" |
| 18 | Question-bank items meaningfully distinct | Pass | QB-032/033 documented pair; no near-duplicate wordings found |
| 19 | Guest messaging non-coercive | Pass | Every prompt ends optional/dismissible; loss warnings factual; leave-action-only firing |
| 20 | Accessibility descriptions complete | Pass | Both diagrams: alt + long alternative; every interactive: keyboard/SR/mobile/reduced-motion specs |
| 21 | Interface copy complete | Pass with note | 36 items cover the required set; strings are *proposed* pending UX §7 merge (A4) |
| 22 | Content IDs unique | Pass | Registry cross-checked; no collisions |
| 23 | Cross-file links valid | Requires correction → corrected | **C2:** registry's assigned-ID table lacked P1-FND-009/010 - rows added with correction note |
| 24 | No placeholder language remains | Pass | Grep for TODO/TBD/placeholder clean across all files |

## Additional corrections log

- **C1 (Phase 5, logged here):** banned minimizer "obvious" in P1-REM-013 learner copy → replaced with "natural." File updated.
- **C2:** ID registry updated for P1-FND-009/010 (row above).
- **C3 (decision, not a text change):** M12 graded-coverage gap - **accepted as implicit coverage** (QB-017/025/026 + S06) per the Phase 4 recommendation; a dedicated M12 stem risked trick-adjacent wording. Revisit only if pilot shows M12-pattern errors without a routing signal.
- **C4:** glossary chip count across lessons is 15 vs the CS ~9 recommendation (see accessibility audit, cognitive load) - accepted with per-lesson cap ≤6 and trim candidates named (algorithm, trigger, workflow, model, training). Pilot-validated.
- **C5:** glossary extended to 23 entries (trigger, workflow) because both terms are surfaced in lessons - flagged for the Phase 0 §18 document audit alongside the terminology guide's six new drafts.
