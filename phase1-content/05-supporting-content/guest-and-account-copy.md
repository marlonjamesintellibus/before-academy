# Guest and account copy

```yaml
content_id: P1-UI-000-A (set definition; items reference P1-PRG states where already canonical)
content_type: account-messaging
title: Guest and account messaging
phase: 6
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation (proposed strings, pending UX §7 reconciliation A4)
```

Principles (binding): what guests can access - everything in the section; what's stored - session only for guests, account for registered; what may be lost - guest session progress; what an account provides - progress across visits and devices, saved results and study plans; the core lesson remains accessible without an account, always. No urgency, no guilt, every prompt ends optional or dismissible.

### Guest beginning the section
Canonical string: P1-LESSON-001 guest introduction message. Dismiss: "Got it."

### Guest midway through the section
**Shown once, at the activity summary:** You're partway through as a guest - everything so far is stored in this session. An account keeps it across visits, whenever and whether you want one. *(CTA: Keep going · Secondary: Create a free account)*

### Guest reaching the assessment
**Message:** One thing before you start: as a guest, your result is stored in this session only. You can take the assessment now and create an account afterwards to keep the result - or never; the assessment works the same either way. *(CTA: Start the assessment · Secondary: Create an account first)*

### Guest completing the section
Canonical string: P1-COM-001 guest-user progress message.

### Guest attempting to leave
Canonical string: P1-PRG-005 (fires on explicit leave with unsaved progress only).

### Guest returning in the same session
**Message:** Welcome back - your guest progress is right where you left it. *(CTA: Continue)*

### Guest returning after progress is unavailable
**Message:** Welcome back. Your earlier guest session ended, so its progress isn't available - that's a limit of guest sessions, not something you did. The good news: the section moves quickly the second time, and everything is open as before. *(CTA: Start the section · Secondary: Go straight to the assessment)*

### Guest creating an account
**Message:** A free account keeps your progress, results, and study plans across visits and devices. That's the whole pitch - the learning itself stays free and open either way. *(CTA: Create account · Secondary: Not now)*

### Account creation completed
Canonical strings: P1-PRG-006 then P1-PRG-007.

### Account creation failed
**Message:** Account creation didn't go through - that's on our side. Your guest progress is untouched, and you can keep learning while we sort it out. *(CTA: Try again · Secondary: Continue as guest)*

### Existing user signing in
**Message:** Welcome back. Signing in brings your saved progress with you. *(CTA: Sign in · Secondary: Continue as guest)*

### Returning registered learner
Canonical string: P1-LESSON-001 registered-user return message.

### Registered learner whose progress was restored
Canonical string: P1-PRG-002.

---

> INTERNAL VALIDATION NOTE:
> Prompt frequency (once at the activity summary, once pre-assessment, once at completion/leave) is the A4/A5-adjacent placement assumption; validate against drop-off and account-conversion analytics with the explicit rule that conversion never outranks completion.
