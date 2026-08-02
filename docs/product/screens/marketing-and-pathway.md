---
title: "Screens: Home, Pathway Overview, Next-Step Preview"
category: product
owner: product-designer
status: approved
related: [../information-architecture.md, ../ux-copy.md]
last_updated: 2026-07-31
---

# S01 Home · S02 Pathway Overview · S12 Next-Step Preview

## S01 Home (`/`)
Objective: communicate the product and move the visitor into the lesson within one scroll. Single column, max 720px. Hero: headline (page h1), one-sentence promise, primary CTA **Start learning - free**, quiet **Already know this? Take the assessment** link. Below: value strip (Layered depth · Learn by doing · No account needed) + pathway teaser card.
States: default; returning guest/registered = resume banner above hero ("Continue: … → Sort the System"). CTA accessible name: "Start the AI Awareness lesson".
Events: `home_viewed`, `resume_banner_shown/clicked`, `cta_start_clicked`, `cta_assessment_first_clicked`.

## S02 Pathway Overview (`/learn`)
Coursera course-home pattern. Pathway header (title, plain description, estimated total time). Section list = ordered list of cards: Section 1 enabled with status chip + per-step microstatus; future sections muted **"Coming soon"** preview cards - never locks ([ADR-003](../../adr/adr-003-competency-progression.md): consumption is never a gate). States: no progress / progress (Continue CTA) / registered / post-completion (auto-scroll to `#next`). Status in text, not colour alone.
Events: `pathway_viewed`, `section_card_clicked`, `preview_card_clicked`, `notify_me_clicked`.

## S12 Next-Step Preview (`/learn#next`)
Anchor section on S02: next-section preview card (title, description, sample objective, "Coming soon"), **Notify me** (guest path doubles as conversion moment), link back to Go Deeper for learners who want more now. Never promises unbuilt features.
Events: `next_preview_viewed`, `notify_me_clicked`.

## Related Documents
- [../personas-and-journeys.md](../personas-and-journeys.md) - J1/J4 entry behaviour
