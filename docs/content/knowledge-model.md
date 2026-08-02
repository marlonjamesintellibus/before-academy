---
title: Canonical Knowledge Model
category: content
owner: content-owner
status: approved
used_by: [lessons, glossary.md, ../engineering/content-engine.md]
last_updated: 2026-07-31
---

# Canonical Knowledge Model

Every concept is one canonical record; lessons, questions, scenarios, glossary, diagram text, and the presentation export reference it. **Rule of one:** a fact lives in exactly one record; others link.

## Record fields & standards
- **Plain-language definition** — ≤25 words, Grade 8, behaviour-first ("Software that…"); the most-reviewed sentence in the record
- **Technical definition** — 1–3 sentences, SME-accurate; feeds Go Deeper and future Literacy
- **Why it matters** — one learner-relevant consequence; never marketing
- **Approved examples** — 3–6, industry-varied, each with its identifying clue; ≥1 "looks like X but is Y" contrast
- **Approved analogies** — 1–2 from the approved set only ([lessons/ai-automation-software.md](lessons/ai-automation-software.md)); analogy drift is the top accuracy risk
- **Misconceptions** — references to [misconceptions.md](misconceptions.md) IDs, never free text
- **Practical applications · Related concepts · Suggested diagrams** (each diagram with its teaching claim)

## Phase 1 concept register
| Concept | Related | Future pathways |
|---|---|---|
| Artificial intelligence | ML, generative AI, model | all |
| Traditional software | rule-based, deterministic | engineering |
| Automation | AI-assisted, workflow | practical, engineering |
| Rule-based system | traditional software | literacy |
| Pattern-based system | ML, model, training | literacy |
| Deterministic output | rule-based | literacy, engineering |
| Probabilistic output | prediction, hallucination | literacy, responsible |
| Machine learning | model, training, data | literacy |
| Generative AI | prompt, output, hallucination | literacy, practical |
| Human review | AI-assisted, bias | responsible |
| AI-assisted system | combined systems, automation | all |

Definitions: [glossary.md](glossary.md). Storage: [../engineering/database.md](../engineering/database.md).

## Related Documents
- [governance.md](governance.md) — who may change a record
