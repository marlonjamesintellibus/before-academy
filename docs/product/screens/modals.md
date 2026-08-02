---
title: "Screens: System Modals (S13)"
category: product
owner: product-designer
status: approved
related: [../components.md, ../ux-copy.md]
last_updated: 2026-07-31
---

# S13 System Modals

All follow modal rules in [../interaction-patterns.md](../interaction-patterns.md): focus trap, Esc closes, focus returns to trigger, destructive action never default.

- **S13a Account conversion** - triggered per J3 moments; benefit headline, primary **Create free account**, equal **Continue as guest**; one per milestone, two per session, never repeats a dismissed trigger in-session.
- **S13b Feedback / error report** - from footer and every feedback panel ("Report a problem with this question"). Fields: type (content error / technical issue / suggestion), free text, optional email. Route + content version attached automatically. Rate-limited server-side.
- **S13c Exit-assessment confirm** - "Keep going" (default focus) / "Exit - discard this attempt".
- **S13d Guest storage notice** - first-visit non-modal banner: progress saves to this device; clearing browser data removes it. Dismiss persists.
- **S13e Delete-account confirm** - from the S11 account menu. States plainly that progress, assessment history, and the account itself are permanently deleted and cannot be recovered; learner types **DELETE** to enable the destructive button. "Keep my account" (default focus) / "Delete my account permanently". On confirm → `deleteAccount` action; see [auth-and-dashboard.md](auth-and-dashboard.md).

## Related Documents
- [../ux-copy.md](../ux-copy.md) - exact strings
