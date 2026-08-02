---
title: "ADR-031: PostHog with explicit typed events only; identity aliased at conversion"
category: adr
status: Accepted
date: 2026-07-31
decision_category: Analytics
related: [adr-025-device-only-guests.md, adr-032-metric-decision-rule.md]
last_updated: 2026-07-31
---

# ADR-031 — PostHog with explicit typed events only; identity aliased at conversion

**Status:** Accepted · **Date:** 2026-07-31 · **Category:** Analytics

## Context
Analytics must answer the Phase 1 validation questions and survive the guest→account transition without collecting pre-consent PII.

## Decision
Autocapture and session recording are off; events are typed constants shared by client and server capture; the guest anonymous ID is the distinct ID and is aliased to the user ID at sign-up.

## Alternatives considered
Autocapture (rejected: noise without decisions, privacy surface); self-hosted analytics (rejected: ops burden for a pilot); GA4 (rejected: weaker funnel/alias ergonomics for product analytics).

## Consequences
- **Positive:** Every event maps to a documented decision; funnels survive conversion; drift-proof naming.
- **Negative:** Unanticipated questions may lack retroactive data — accepted trade of the explicit-only stance.

## Related Documents
- [ADR-025](adr-025-device-only-guests.md)
- [ADR-032](adr-032-metric-decision-rule.md)
- Specifications: Eng §11, UX §8
