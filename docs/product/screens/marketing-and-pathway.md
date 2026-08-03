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
Objective: demonstrate the product, not describe it, and move the visitor into the lesson within one scroll. Container max 1280px, aligned with the shell header. Hero is two columns at `lg` and above: left holds the eyebrow, two-line headline (page h1, second line in sky), one-sentence promise, primary CTA **Start learning - free**, and the quiet **Already know this? Take the assessment** link; right holds the live demo card, so a real scenario is playable above the fold. Below the hero: three outcome cards overlapping the navy edge, then the pathway teaser card. The columns stack on smaller viewports with the demo directly beneath the CTAs.

Hero demo: two real activity scenarios in sequence ("Scenario n of 2"), each answered from the five category buttons. Seed feedback already opens with its own verdict, so the component renders it unprefixed and uses colour only as reinforcement. After the first answer the card offers **Try a harder one**; after the second it hands over to **Learn to read them all**.
States: default; returning guest/registered = resume banner above hero ("Continue: … → Sort the System"). CTA accessible name: "Start the AI Awareness lesson".
Events: `home_viewed`, `resume_banner_shown/clicked`, `cta_start_clicked`, `cta_assessment_first_clicked`.

## S02 Pathway Overview (`/learn`)
Navy band header (eyebrow, title, plain description, and a meta row: total time, the four steps, free/no account) over a two-column body at `lg` and above. Main column: section list = ordered list of cards, Section 1 enabled with status chip + per-step microstatus and its unit rows, future sections muted **"Coming soon"** preview cards - never locks ([ADR-003](../../adr/adr-003-competency-progression.md): consumption is never a gate); the two-minute review renders here too, since it is an activity and needs the width. Aside ("Your standing"): progress summary (n of 4 steps done, bar paired with the count in text), skill map once a graded attempt exists, and the section reset. The aside always has at least the progress summary, so the column is never empty. States: no progress / progress (Continue CTA) / registered / post-completion (auto-scroll to `#next`). Status in text, not colour alone.
Events: `pathway_viewed`, `section_card_clicked`, `preview_card_clicked`, `notify_me_clicked`.

## S12 Next-Step Preview (`/learn#next`)
Anchor section on S02: next-section preview card (title, description, sample objective, "Coming soon"), **Notify me** (guest path doubles as conversion moment), link back to Go Deeper for learners who want more now. Never promises unbuilt features.
Events: `next_preview_viewed`, `notify_me_clicked`.

## Related Documents
- [../personas-and-journeys.md](../personas-and-journeys.md) - J1/J4 entry behaviour
