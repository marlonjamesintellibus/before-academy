---
title: Before Academy Documentation
category: root
owner: product-owner
status: approved
last_updated: 2026-07-31
---

# Before Academy - Documentation

This is the canonical knowledge base for Before Academy, reorganized from five approved specifications (Product & UX, Engineering, Content, Build Roadmap, ADRs) into a modular library for humans and AI coding agents. Nothing here invents new decisions; every document traces to the canonical inputs.

**Phase 1 scope:** one vertical slice - the AI Awareness lesson *AI, Automation and Traditional Software* - covering lesson, activity, knowledge check, assessment, guest progress, accounts, analytics, and accessibility.

## How to navigate

| You are… | Start at |
|---|---|
| New to the project | [product/vision-and-scope.md](product/vision-and-scope.md), then this table |
| Implementing a story | [implementation/](implementation/README.md) - pick the matching workflow guide |
| Building UI | [product/screens/](product/screens/README.md) + [product/components.md](product/components.md) |
| Working server-side | [engineering/architecture.md](engineering/architecture.md) + the relevant engine doc |
| Writing content | [content/](content/README.md) |
| Planning / sequencing | [roadmap/](roadmap/README.md) |
| Asking "why is it like this?" | [adr/](adr/README.md) |

## Folders

- **product/** - what the product does: IA, screens, components, design system, copy, UX analytics. Owner: product designer.
- **engineering/** - how it's built: architecture, engines, data, auth, security, ops. Owner: engineering lead.
- **content/** - what it teaches: learning framework, lesson specs, assessment blueprint, glossary, governance. Owner: education lead.
- **roadmap/** - build order: milestones M0–M9, delivery process, dependencies, risks. Owner: product owner.
- **adr/** - why: 42 self-contained decision records. New decisions start at ADR-043.
- **shared/** - terminology, naming, and the decision-register index used by every folder.
- **implementation/** - task-shaped guides telling agents and engineers exactly which docs to load per workflow.

## Precedence on conflict

Phase 0/1 documents > product/ > engineering/ > content/ > roadmap/ > code comments. If two docs disagree, the one that owns the topic wins (see each folder README); file a fix rather than working around it.

## Conventions

Every document carries YAML frontmatter (`title, category, status, last_updated`, plus `owner, depends_on, used_by, related` where applicable - ADRs use `decision_category`/`date` instead of `owner`) and ends with **Related Documents**. Status vocabularies: ADRs use `Accepted` (with optional qualifiers); all other docs use `approved` - tooling that parses status must accept both. Cross-references are relative links. Provisional values (80% pass threshold, layer word budgets, question counts) are marked `provisional` and are configuration, not constants.

## Related Documents
- [shared/decision-register.md](shared/decision-register.md) - decision lookup by area
- [implementation/README.md](implementation/README.md) - start here to do work
