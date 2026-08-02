---
title: "Lesson Spec: AI, Automation and Traditional Software"
category: content
owner: education-lead
status: approved
depends_on: [../learning-framework.md, ../knowledge-model.md]
used_by: [../../product/screens/lesson.md, ../../engineering/content-engine.md]
last_updated: 2026-07-31
---

# AI, Automation and Traditional Software - Lesson Specification

Writers produce final copy from this spec; nothing may be skipped; additions need education-lead approval.

## Learning objectives (LO1–LO10)
1. Describe traditional software as software following explicitly programmed rules.
2. Describe automation as technology completing/coordinating tasks with reduced manual effort.
3. Describe AI as systems that identify patterns, predict, classify, or generate outputs.
4. Explain that automation and AI are not mutually exclusive.
5. Recognize that some automated systems use AI and others do not.
6. Distinguish predictable rule-based outputs from probabilistic outputs.
7. Classify familiar systems (traditional / automation / AI-assisted / combination).
8. Explain why "complex" doesn't mean "AI".
9. Identify when there isn't enough information to classify a system.
10. Avoid the misconception that AI thinks like a person.

## Block requirements (summary)
- **Hook:** one-tap tease - "Your bank flags a purchase as suspicious. Is that AI?" → "It might be - by the end you'll know how to tell." Doubt, not fear. (LO7, LO9)
- **Concepts:** Traditional software (rules; same input→same output; required contrast: complex tax calculator is still rules - LO8) · Automation (describes *how work flows*, not how decisions are made; must state automation ≠ AI and may contain AI) · AI (pattern-based; outputs vary; one "sometimes wrong by design" example: spam false positive) · Combined systems (support-request walkthrough mirroring the diagram's five layers: interface → routing → AI classification → human decision → traditional software records).
- **Diagram:** "How Rules, Automation and AI Work Together" - five layers, ≤4-word plain labels matching lesson terminology exactly, one caption stating the claim (AI is one component among rules, automation, and people - attacks M6). Full prose alternative versioned with it. Reused unchanged in the presentation export.
- **Misconception callout:** M1 featured. **Takeaway:** rules are written; automation chains tasks; AI learns patterns - and most real products combine them.
- **Confidence prompts:** pre (hook area) + post (results). **Optional reflection** after the activity summary (never graded): "Think of one system you use daily - which category, and what would you need to know to be sure?"

## Approved anchor analogies (one per concept; anthropomorphic analogies banned)
| Concept | Analogy | Boundary to state |
|---|---|---|
| Traditional software | vending machine (B4 → same snack) | bigger machine is still a machine (LO8) |
| Automation | row of dominoes | dominoes decide nothing - a person or an AI sets them up |
| AI | weather forecast (patterns, likelihoods, sometimes wrong) | the forecast doesn't "understand" your picnic (M3) |
| Combined systems | restaurant (menu / kitchen line / chef + judgment) | you can't see the kitchen from your table (LO9) |

## Sort the System scenario bank (10; technically reviewed; order fixed)
| # | Scenario | Answer | Clue |
|---|---|---|---|
| 1 | calculator returns a total | Traditional software | fixed arithmetic; identical output |
| 2 | email auto-sent on form submit | Automation | trigger→action chain, no judgment |
| 3 | store ranks "recommended for you" | AI-assisted | learned from behaviour; varies by person |
| 4 | payroll runs on the 25th | Automation | scheduled repetition |
| 5 | bank flags unusual transaction | AI-assisted | "unusual" = pattern deviation |
| 6 | chatbot with fixed menu | Traditional software | decision tree = rules despite the chat UI |
| 7 | chatbot writing free-form answers | AI-assisted | generated, variable output |
| 8 | navigation predicts arrival time | Combination | routing rules + live data + learned prediction |
| 9 | platform sorts messages; person answers | Combination | automation routes, AI classifies, human decides |
| 10 | "our app uses smart technology…" | Not enough information | marketing describes the interface, not the mechanism |

**6/7 are a deliberate minimal pair** (same interface, different mechanism) - the most efficient teacher of LO5/LO9 and the M5 counter; order fixed, 7's feedback references 6.

## Knowledge check
4 practice questions: definition (LO1–3) · automation-vs-AI comparison (LO4/5) · real-world classification (LO7) · misconception rejection (LO8/10). `kind=check`; never in graded attempts.

## LO traceability
Every LO maps to block(s) + scenario(s) + assessment category + remediation target; the content-lint blueprint-coverage check enforces the matrix.

## Related Documents
- [../assessments.md](../assessments.md) · [../feedback.md](../feedback.md) · [../misconceptions.md](../misconceptions.md)
