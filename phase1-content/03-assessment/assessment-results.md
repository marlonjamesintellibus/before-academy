# Assessment results

```yaml
content_id: P1-RES-000 (set definition; states P1-RES-001..014)
content_type: result-states
title: Assessment result states - learner-facing copy
phase: 4
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §9.4 (messaging standards); UX §S08 (screen behaviour, confidence prompt); strings pending UX §7 reconciliation (A4)
```

## Shared standards (apply to every state)

- **Score presentation:** "You answered {n} of 6 correctly. Passing is 5 of 6." Score always travels with its meaning; never a bare percentage; never attempt counts.
- **Concepts mastered / to review:** built from category tags - mastered categories named first, in plain concept names ("Automation", "Combined systems"), then review categories as links into the mapped remediation (CS §7.4). Perfect and empty lists degrade gracefully ("Every category held up" / omitted).
- **Screen-reader announcement:** one complete summary in a single reading: result, score with meaning, categories, next step. Example: "Assessment passed. Five of six correct; passing is five of six. Strong on automation and classification. One suggestion: review combined systems. Next: complete the section."
- **Language:** "fail" never appears; no identity labels; strengths precede plans; encouragement attaches to progress.
- **Guest/registered pattern:** registered learners get "your result is saved to your account"; guests get "your result is stored in this session" plus the non-coercive account line: "Create a free account if you'd like to keep it - optional."
- **Post-assessment confidence prompt** P1-CONF-002 renders on pass and not-passed states (UX §S08).

---

### P1-RES-001 - Passed on first attempt
- **Headline:** You've got it - assessment passed.
- **Message:** You can now tell traditional software, automation, and AI apart - and back it up with evidence. That's the competency this section exists to build.
- **Score:** standard. **Mastered/review:** standard (review list often empty here).
- **Primary CTA:** Complete the section · **Secondary:** Review my answers
- **Return-later:** Your result is saved - finish up whenever suits you.
- **Guest:** Your pass is stored in this session. Create a free account if you'd like to keep it - optional.
- **Registered:** Your pass is saved to your account and counts toward the AI Awareness pathway.
- **SR:** per pattern.

### P1-RES-002 - Passed after remediation
- **Headline:** Assessment passed - the review paid off.
- **Message:** You went back, worked the gap, and cleared it. That's exactly how this is meant to work: review targeted the confusion, and the fresh questions confirmed it's resolved.
- **Score:** standard. **Mastered/review:** name the previously-missed category as now demonstrated ("Combined systems - where you focused your review - held up this time").
- **Primary CTA:** Complete the section · **Secondary:** Review my answers
- **Return-later / Guest / Registered / SR:** per pattern.

### P1-RES-003 - Perfect score
- **Headline:** Six of six - a clean sweep.
- **Message:** Every category, first read to final answer. If you're curious for more, the Go Deeper layers you may have skipped are still there - and the next pathway will build on exactly these distinctions.
- **Score:** "You answered 6 of 6 correctly." **Mastered:** "Every category held up."
- **Primary CTA:** Complete the section · **Secondary:** Explore Go Deeper content
- **Return-later / Guest / Registered / SR:** per pattern.

### P1-RES-004 - Passed close to the threshold
- **Headline:** Assessment passed.
- **Message:** You cleared the bar. One area wobbled, so if you want the distinctions fully solid before moving on, there's a short, targeted review waiting - entirely optional.
- **Score:** standard. **Mastered/review:** mastered categories first; the missed category as an optional review link.
- **Primary CTA:** Complete the section · **Secondary:** Review {category} (optional)
- **Return-later / Guest / Registered / SR:** per pattern.

### P1-RES-005 - Did not meet the threshold
- **Headline:** Not this time - here's what to review.
- **Message:** First, what held: {mastered categories}. What tripped you up: {review categories} - so that's the plan, in order, starting with the one that needs the most work. When you're ready to try again, the questions will be different.
- **Score:** standard. **Mastered/review:** strengths first, then the ordered study plan (worst-performing category first, per CS §8.2).
- **Primary CTA:** Start my review · **Secondary:** Retake when ready
- **Return-later:** Your study plan is saved - come back to it anytime.
- **Guest:** Your plan is stored in this session; an account would keep it across visits - optional.
- **Registered:** Your plan is saved to your account.
- **SR:** per pattern, plan included.

### P1-RES-006 - Multiple attempts not yet successful
- **Headline:** Still not there - let's change the approach.
- **Message:** Working the same route twice deserves a different path the third time. Instead of retaking now, try the short remediation walkthroughs - they explain each idea with new examples, one at a time, with a quick confirm at the end of each. The assessment will be there, with fresh questions, whenever you choose.
- **Score:** standard. **Mastered/review:** strengths still named first; plan presented one category at a time.
- **Primary CTA:** Start the guided review · **Secondary:** Back to the lesson
- **Return-later:** No clock on any of this - your progress and plan are saved.
- **Guest / Registered / SR:** per pattern. *(Never shows an attempt count.)*

### P1-RES-007 - Assessment partially completed
- **Headline:** You're partway through.
- **Message:** {n} of 6 answered, all saved. Pick up where you left off whenever you're ready - nothing is scored until you submit.
- **Score:** progress only, no correctness shown. **Mastered/review:** omitted.
- **Primary CTA:** Continue the assessment · **Secondary:** Save and exit
- **Return-later / Guest / Registered / SR:** per pattern.

### P1-RES-008 - Assessment interrupted
- **Headline:** Your attempt was interrupted - nothing lost.
- **Message:** Your answers are saved up to question {n}. Continue when you're ready; the attempt resumes exactly where it stopped.
- **Primary CTA:** Resume the assessment · **Secondary:** Back to the section
- **Others:** per pattern; no score shown.

### P1-RES-009 - Assessment resumed
- **Headline:** Picking up at question {n} of 6.
- **Message:** Everything you answered earlier is still in place. Take your time - there's no clock.
- **Primary CTA:** Continue · **Secondary:** Review earlier answers
- **Others:** per pattern.

### P1-RES-010 - Assessment unavailable
- **Headline:** The assessment isn't available right now.
- **Message:** That's on our side, not yours. Your progress and any saved answers are safe. The lesson and activity remain open in the meantime.
- **Primary CTA:** Try again · **Secondary:** Back to the lesson
- **Others:** per pattern; SR announces the recovery action.

### P1-RES-011 - Results temporarily unavailable
- **Headline:** Your answers are in - results are taking a moment.
- **Message:** Your submission is saved and will be scored shortly. You don't need to do anything; check back in a little while.
- **Primary CTA:** Check again · **Secondary:** Back to the section
- **Others:** per pattern.

### P1-RES-012 - No answers submitted
- **Headline:** This attempt closed without any answers.
- **Message:** Nothing was scored and nothing counts against you. Start fresh whenever you like - or warm up with the practice knowledge check first.
- **Primary CTA:** Start the assessment · **Secondary:** Try the knowledge check
- **Others:** per pattern.

### P1-RES-013 - Retake available
- **Headline:** Ready when you are - the questions will be different.
- **Message:** Your review plan is done (or skip it - your call). The next attempt draws a fresh combination covering the same ideas.
- **Primary CTA:** Start the retake · **Secondary:** Review a little more
- **Others:** per pattern.

### P1-RES-014 - Retake temporarily unavailable
- **Headline:** The retake isn't available right now.
- **Message:** A technical hitch on our side - your plan and progress are safe. Meanwhile, the remediation walkthroughs and lessons are open.
- **Primary CTA:** Try again shortly · **Secondary:** Continue reviewing
- **Others:** per pattern.

---

> INTERNAL VALIDATION NOTE:
> P1-RES-006's trigger (attempt count threshold for the changed-approach framing) is an implementation decision - recommended: after the second unsuccessful attempt, per CS §8.2 escalation; validate against retake analytics. All strings pending UX §7 reconciliation (A4).
