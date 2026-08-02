# Progress and next steps

```yaml
content_id: P1-PRG-000 (set definition; states P1-PRG-001..013)
content_type: progress-states
title: Progress, syncing, and next-step states — learner-facing copy
phase: 5
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §9.4 (non-punitive framing), account messaging rules (non-coercive); behaviour Eng §5/§9; strings pending UX §7 reconciliation (A4)
```

Shared rules: warnings are factual, never threatening; account prompts state benefits plainly and end with "optional"; the core lesson is always accessible without an account; screen-reader announcements state the progress fact before any CTA.

---

### P1-PRG-001 — Progress saved
**Message:** Progress saved.
**Supporting (first occurrence only):** Your place in the section is stored automatically — leave anytime and pick up where you stopped.
**SR announcement:** "Progress saved."

### P1-PRG-002 — Progress restored
**Message:** Welcome back — your progress is restored.
**Supporting:** You're at {stage description, e.g. "scenario 4 of 10 in Sort the System"}.
**Primary CTA:** Pick up where you left off · **Secondary:** Start from the section overview

### P1-PRG-003 — Progress not yet synced
**Message:** Your latest progress hasn't synced yet.
**Supporting:** It's stored on this device and will sync when the connection allows. Nothing is lost; you can keep going.
**Primary CTA:** Continue · **Secondary:** Retry sync now

### P1-PRG-004 — Guest progress stored in this session
**Message:** You're learning as a guest — progress is stored in this browser session.
**Supporting:** Everything in the section is open to you. If you close the browser, this session's progress may not be here next time. A free account keeps progress across visits and devices — optional.
**Primary CTA:** Keep going as a guest · **Secondary:** Create a free account

### P1-PRG-005 — Guest progress may be lost
**Message:** Heads-up before you go: this session's progress may not be here when you return.
**Supporting:** You've completed {summary, e.g. "the lesson and 7 of 10 activity scenarios"}. As a guest, that's stored only in this session. Creating a free account takes about a minute and keeps it — and leaving without one is completely fine too.
**Primary CTA:** Keep my progress (create account) · **Secondary:** Leave anyway
**SR:** announces the progress summary before the choice.

### P1-PRG-006 — Account created after learning began
**Message:** Account created — welcome aboard.
**Supporting:** We're moving this session's progress into your account now.

### P1-PRG-007 — Guest progress transferred to an account
**Message:** All of it made the trip.
**Supporting:** Your lesson progress, activity answers, and any results from this session are now saved to your account and will be here on any device.
**Primary CTA:** Continue where you left off

### P1-PRG-008 — Progress transfer failed
**Message:** Your account is ready, but this session's progress didn't transfer.
**Supporting:** That's a fault on our side. Your account works normally from here on — everything new saves automatically. The section is quick to move back through, and your completed assessment (if any) can be retaken at no cost to you.
**Primary CTA:** Continue from here · **Secondary:** Try the transfer again
**SR:** states what was kept (the account, future progress) before what was lost.

### P1-PRG-009 — Returning after a long time away
**Message:** Welcome back — it's been a while, and that's fine.
**Supporting:** You were partway through "AI, Automation and Traditional Software." The two-minute takeaway block is a quick way to warm the ideas back up before continuing — or jump straight back in.
**Primary CTA:** Continue where I was · **Secondary:** Warm up with the takeaway first

### P1-PRG-010 — Resuming at the assessment
**Message:** You're resuming at the assessment — question {n} of 6, answers saved.
**Supporting:** No clock, and you can review everything before submitting. If you'd rather warm up first, the practice knowledge check is one step back.
**Primary CTA:** Continue the assessment · **Secondary:** Do the practice check first

### P1-PRG-011 — Resuming in remediation
**Message:** You're resuming your review — {category} is up, {n} of {total} in your plan.
**Supporting:** One concept at a time, fresh examples, and a quick confirm at the end if you want it. The retake unlocks fresh questions whenever you're ready.
**Primary CTA:** Continue the review · **Secondary:** Go to the retake

### P1-PRG-012 — Section complete, optional content remains
**Message:** Section complete — with some optional depth left unexplored.
**Supporting:** Your completion doesn't depend on it, but the Explore Further and Go Deeper layers are still open, and they preview where the next pathway goes.
**Primary CTA:** Continue to what's next · **Secondary:** Browse the optional layers

### P1-PRG-013 — Section complete, all optional content reviewed
**Message:** Section complete — every layer of it.
**Supporting:** Core path, optional depth, the lot. When AI Literacy opens, you'll be starting it with the full foundation.
**Primary CTA:** See what's next · **Secondary:** Revisit anything

---

> INTERNAL VALIDATION NOTE:
> P1-PRG-005 fires only on an explicit leave action (close/back with unsaved guest progress), never as an interruptive timer — placement per the account-prompt assumption (stages 1 and 16 only). The "long time away" threshold for P1-PRG-009 is an implementation value; recommended 30 days, validated against return analytics.
