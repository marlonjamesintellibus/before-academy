---
title: Content Exports
category: content
owner: content-owner
status: approved
related: [../content/knowledge-model.md, ../content/content-map.md]
last_updated: 2026-08-03
---

# Exports

Approved content, rendered for uses outside the learning platform. This is the roadmap brief's vertical-slice item 16, "a sample presentation generated from the same source content".

| Export | Command | Source |
|---|---|---|
| [ai-awareness-core-concepts.md](ai-awareness-core-concepts.md) | `npm run content:deck` | Published `canonical_records` |

## What this is, and is not

**Is:** proof that one approved record drives both the lesson a learner reads and the deck a colleague presents, so the two cannot drift. Every definition, summary, example and speaker note in the output is copied from a record without alteration, which unit tests assert.

**Is not:** the presentation-generation tool. The roadmap brief defers that to Phase 9, and it deliberately has none of its features: no audience, length or depth selection, no event templates, no theming, no interface. Building those now would be the scope creep the brief's prioritization section warns against.

## Rules

1. **Never edit an export by hand.** Edit the canonical record, run `npm run db:seed`, then regenerate. A hand-edited deck is a second unreviewed version of the company's explanation, which is the exact failure the canonical-record system exists to prevent.
2. **Exports are stamped with the content version** they came from, so any deck in circulation can be traced to the record version that produced it.
3. **Regenerate after any record change.** The committed file is the reviewable artifact; a stale one is worse than none.
4. Markdown with `---` separators imports into Marp, Deckset, and Google Slides, and stays reviewable in a pull request, which a binary deck would not.

## Related Documents
- [../content/knowledge-model.md](../content/knowledge-model.md) - the records this renders
- [../content/content-map.md](../content/content-map.md) - what else is planned
