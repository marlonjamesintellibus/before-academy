# Remediation

```yaml
content_id: P1-REM-000 (set definition; modules P1-REM-001..014, aligned to M1–M14)
content_type: remediation-modules
title: Targeted remediation - AI, Automation and Traditional Software
phase: 5
competency_level: 1
section: ai-automation-traditional-software
content_status: draft-for-validation
source_of_truth: CS §8.2–8.4 (principles), §7.4 (category mapping); UX §S09 (remediation view, mini-confirm)
```

## Shared standards (apply to every module)

- **Trigger:** a wrong answer on any question or scenario tagged with the module's M-ID or category (mapping in `assessment-mapping.md`), or selection from a study plan (P1-RES-005/006). Multi-category failures present modules sequentially, worst-performing first - never a pile.
- **Reteach differently:** every module leads with material the lesson held back - fresh wording, a new example, or a new angle on an anchor analogy. Never the sentences that already failed to land.
- **Name the confusion:** each opens "These are easy to mix up because…" - the belief is treated as reasonable before it's corrected.
- **Mini-confirm:** optional one-question check closing each module; a correct answer is named as evidence of progress. Feedback follows Verdict → Because → Clue (≤60 words).
- **Return-to-assessment message (shared):** "That's the gap closed on this one. When you're ready, the assessment draws fresh questions - and this idea will look different next time you meet it."
- **Completion condition:** module viewed; mini-confirm optional and never gating.
- **Accessibility (shared):** plain text blocks, disclosure for the guided question, radio-group mini-confirm per `activity-accessibility.md`; announced feedback; no timers.
- **Analytics (shared):** `remediation_viewed {module_id, trigger}`, `miniconfirm_answered {module_id, result}`.
- **Maximum recommended repetitions:** a module surfaces at most twice per learner per category-failure cycle.
- **Escalation after repeated difficulty:** on a third trigger, the module is replaced by the guided sequential review (P1-RES-006 path): the full concept block reread plus this module's guided question, and the suggestion to try the practice knowledge check before the next attempt. Never a dead end; never shame.

---

### P1-REM-001 - Complex doesn't mean AI *(M1)*
**Related questions:** QB-001, QB-010, QB-023, S01, S06, KC-Q04.
**Short explanation:** Complexity and intelligence are easy to mix up because marketing blurs them on purpose - and honestly, a system juggling thousands of conditions feels like it must be thinking.
**Alternative explanation + new example:** Ask one question instead: could the behaviour be written down as instructions, however many pages it takes? An airline's fare engine prices millions of routes with taxes, fuel surcharges, and stopover rules - dazzling, and every line of it authored. Volume of rules measures effort, not mechanism.
**Alternative analogy (anchor extended):** A vending machine the size of a warehouse, with ten thousand buttons, is still a vending machine. Nothing about adding buttons adds judgment.
**Guided question (disclosure):** Think of the most impressive non-AI thing you can - a flight booking, a spreadsheet with 40 linked sheets. What makes it impressive: the number of rules, or something no rule could capture?
**Mini-confirm:** *A scheduling tool coordinates 40 time zones and every public holiday. What does that complexity tell you about its mechanism?*
A) It must use AI · B) Nothing - many written rules are still written rules *(correct)* · C) It can't use AI
**Correct:** Correct - that's the gap closed. Complexity says "big effort," not "learned patterns." Time zones and holidays are exactly what people write down.
**Incorrect:** Not quite - the clue is what time zones and holidays are: lists. Stored lists and conditions are authored rules at any scale, and scale proves nothing about learning - in either direction.

### P1-REM-002 - Automation isn't AI *(M2)*
**Related questions:** QB-002, QB-036, S02, S04, KC-Q02.
**Short explanation:** These two are easy to mix up because from the outside they look identical: work happens, and no human did it. The difference is invisible - it's underneath.
**Alternative explanation + new example (held back from the lesson):** Picture two inboxes. In the first, every message from billing@ moves to a Billing folder - a rule someone typed in. In the second, messages get sorted by what they're about, even from senders never seen before - a judgment learned from patterns. Both are hands-free. Only one involves AI. Automation is the hands-free part; AI is one possible way a step inside it decides.
**Alternative analogy (anchors side by side):** Dominoes and a weather forecast. Dominoes are the flow - one event tips the chain. The forecast is a judgment - a likelihood learned from the past. A domino chain can exist with no forecast anywhere in it; a chain can also include one.
**Guided question:** Name something automated in your life. Now ask the second question separately: does any step in that chain make a judgment nobody wrote down?
**Mini-confirm:** *A receipt emails itself after every purchase. Which is accurate?*
A) Automated, so AI is involved · B) Automated, and nothing described involves AI *(correct)* · C) Not automation, because it's rule-based
**Correct:** Correct - evidence of progress. Trigger and template: a chain with no learned step. "Is it automated?" and "does it use AI?" are two separate questions, and you kept them separate.
**Incorrect:** Not quite - the clue is the template: the same email, every time, on a trigger. Effort removed isn't intelligence added, and rule-based steps live inside automation constantly.

### P1-REM-003 - Pattern isn't comprehension *(M3)*
**Related questions:** QB-004, QB-041, S07.
**Short explanation:** This one's easy to hold because fluent language is the strongest "understanding" signal humans know. When something answers naturally, every instinct says somebody's home.
**Alternative explanation + new example:** A music-identification app names a song from three seconds of audio in a noisy café. Uncanny - and it has no idea what music is. It matches the clip's fingerprint against patterns from millions of examples. Fluent chat works the same way at larger scale: patterns in language, matched and extended. The output resembles understanding because it was learned from people who understand.
**Alternative analogy (anchor extended):** The forecast says "70% rain" without knowing you planned a picnic - or what rain feels like. Accuracy and comprehension are different achievements.
**Guided question:** What's one thing you'd expect from a person who truly understood your question that a pattern-matcher couldn't fake? Sit with how hard that is to name - that difficulty is the point.
**Mini-confirm:** *A chatbot answers naturally and helpfully. What does that establish?*
A) It understands you · B) Its training data contained many natural, helpful answers *(correct)* · C) A person is typing the replies
**Correct:** Correct - that's the distinction landing. Fluency is evidence of patterns learned from fluent people, not of comprehension. Keep the verbs honest: it detects, classifies, generates.
**Incorrect:** Not quite - the clue is where fluency comes from: patterns in human language, learned at scale. Natural-sounding output is the expected product of that process, with no understanding required.

### P1-REM-004 - Varying answers aren't broken *(M4)*
**Related questions:** QB-003, S05, S01-vs-S05 contrast.
**Short explanation:** A lifetime of calculators trains one expectation: same question, same answer. So when an AI answer shifts, "broken" is the natural read.
**Alternative explanation + new example:** Ask two experienced travel agents for a weekend itinerary and you'll get two good, different answers - because "good itinerary" is a judgment over patterns, not a lookup. Generative systems answer from likelihoods the same way: several phrasings are all probable, and different runs surface different ones. Variation is the mechanism showing, not the mechanism failing.
**Alternative analogy (anchor extended):** Two forecasts an hour apart can say 60% and 70% without either being broken - likelihoods move with the inputs.
**Guided question:** Where in your life do you already accept "same question, different good answers"? What makes software feel different?
**Mini-confirm:** *You ask the same question twice and get two differently worded answers. Best explanation?*
A) It's malfunctioning · B) Pattern-based output varies by design *(correct)* · C) Someone edited it between your questions
**Correct:** Correct - progress. Rule-based systems repeat; pattern-based systems sample from likelihoods, so wording shifts run to run, by design.
**Incorrect:** Not quite - the clue is that nothing failed: both answers were coherent. Variation between runs is the signature of generation from likelihoods, not damage or midnight edits.

### P1-REM-005 - The interface can't tell you *(M5)*
**Related questions:** QB-019, QB-038, S06/S07 pair, S10.
**Short explanation:** The interface is all you can see, so judging by it is completely reasonable - and completely unreliable.
**Alternative explanation + new example:** Two search boxes, pixel-identical. One matches your words against product titles - string rules. One interprets "warm jacket for rainy commutes" and ranks by learned relevance. Same box, different engines. The window is a costume; mechanisms don't dress differently.
**Alternative analogy (anchor extended):** From your restaurant table, the dining room looks the same whether the kitchen runs on a strict line or a chef's improvisation. You'd have to see the kitchen - or read the menu's claims critically.
**Guided question:** Pick an app you use. List what you can actually observe from outside. Which observation, if any, reveals the mechanism - and which reveals only the design?
**Mini-confirm:** *Two identical chat windows: one offers fixed menus, one writes varied free-form answers. What settles which uses AI?*
A) The look of the window · B) The behaviour and mechanism evidence *(correct)* · C) Whichever brand is more famous
**Correct:** Correct - the gap's closed. Fixed menus expose written rules; free-form varying output exposes generation. The window itself testified to nothing.
**Incorrect:** Not quite - the clue sits in the behaviour: set lists repeat, generated text varies. Appearance and brand are surface; the mechanism only shows through what the system does or what's disclosed.

### P1-REM-006 - AI doesn't work alone *(M6)*
**Related questions:** QB-006, S09.
**Short explanation:** Films and headlines cast AI as a lone agent, so imagining it running solo is the default picture most of us inherited.
**Alternative explanation + new example:** Follow one fraud alert end to end. Written rules stored the transaction. Automation queued it for screening. A model scored it unusual. A rule held the payment pending. A person reviewed and released it. The AI contributed one judgment inside a machine built of ordinary software and human decisions - remove the scaffolding and the model has nowhere to live and no way to act.
**Alternative analogy (anchor extended):** The chef doesn't run the restaurant. No menu, no kitchen line, no servers - no restaurant, however brilliant the chef.
**Guided question:** Take any "AI product" you know. List three non-AI things it must contain to function at all.
**Mini-confirm:** *Which statement about AI products is accurate?*
A) AI replaces the software around it · B) AI is usually one component inside rules, automation, and human review *(correct)* · C) If people are involved, it isn't real AI
**Correct:** Correct - that's the diagram internalized. One layer among five, with human review as a design choice, not a failure.
**Incorrect:** Not quite - the clue is the walkthrough: interface, records, routing, one AI judgment, a human decision. AI ships inside that stack; people in the loop are part of the design, not evidence against it.

### P1-REM-007 - Useful isn't infallible *(M7)*
**Related questions:** QB-003, QB-034.
**Short explanation:** Computers earned a reputation for exactness, so an exact-sounding AI answer borrows trust it hasn't shown it deserves.
**Alternative explanation + new example:** A navigation app predicts 22 minutes; the trip takes 31. Nobody concludes the app is worthless - you treat the estimate as an estimate. AI outputs deserve exactly that posture everywhere: a strong estimate, stated confidently, sometimes wrong. The failure isn't the miss; it's forgetting to hold it as an estimate.
**Alternative analogy (anchor extended):** You still pack for the picnic when the forecast says 20% rain - you weigh likelihoods; you don't obey them.
**Guided question:** What's one AI output you'd verify before acting on, and one you'd accept as-is? What separates them - the stakes, or the accuracy?
**Mini-confirm:** *A generative assistant gives a confident, detailed answer. What does the confidence tell you about correctness?*
A) Confident means checked · B) Nothing - tone and correctness are separate; verify when it matters *(correct)* · C) Confident answers are usually wrong
**Correct:** Correct - the calibration is the skill. Fluent certainty is a style property of generation; correctness is a separate question you answer by checking.
**Incorrect:** Not quite - the clue is where the tone comes from: generation reads confidently whether right or wrong. That doesn't make it usually wrong, either - it makes verification your job when stakes are real.

### P1-REM-008 - Personalized isn't proof *(M8)*
**Related questions:** QB-008, QB-020, QB-031, S03.
**Short explanation:** "Personalized" and "AI" arrive in the same ads so often that they've fused. Reasonable - and worth prying apart.
**Alternative explanation + new example:** Two "personal" touches on one shopping site. "Your recently viewed items" - a stored list played back, pure rules. "Recommended for you," different per person and shifting with behaviour - learned patterns. Both feel personal. Only one is evidence of AI, and the evidence is the variation tracking behaviour, not the word "personal."
**Alternative analogy (anchor extended):** A vending machine with your name engraved on it is personalized. It's still a vending machine.
**Guided question:** Find one "personalized" feature you use. Could a stored list or a written rule produce it? If yes, the label alone can't tell you what's underneath.
**Mini-confirm:** *A homepage greets you by name and shows your saved articles. Evidence of AI?*
A) Yes - it's personalized · B) No - a stored profile played back by rules explains it fully *(correct)* · C) Only if the articles are interesting
**Correct:** Correct - cleanly separated. Playback of stored data is rules; the AI question needs different evidence: judgments that vary with learned patterns.
**Incorrect:** Not quite - the clue is what's shown: your own saved data, retrieved. Rules do that perfectly. Personalization becomes AI evidence only when the system makes learned judgments, not lookups.

### P1-REM-009 - Labels aren't mechanisms *(M9)*
**Related questions:** QB-009, QB-030, QB-038, QB-039, QB-042, S10.
**Short explanation:** Marketing words sound like technical descriptions - that's their job. Reading "smart" as information is exactly what the copy was engineered to produce.
**Alternative explanation + new example:** "Ocean-fresh" on a soap bottle doesn't mean seawater; it means a scent direction chosen by branding. "AI-powered," "smart," "adaptive," and "intelligent" work the same way: mood words, legally safe, mechanically silent. They can be true. They're never evidence. The move that cuts through: which feature, learning what, from what data?
**Alternative analogy (anchor extended):** A menu calling a dish "chef-crafted" doesn't tell you whether the kitchen runs on recipes or improvisation. It tells you what the menu writer wanted you to feel.
**Guided question:** Draft the one question you'd send a vendor whose page says "our platform uses intelligent automation." What answer would actually satisfy you?
**Mini-confirm:** *A store page says an app "uses smart technology to organize your photos." What do you know?*
A) It uses AI · B) Only the wording - the mechanism isn't described *(correct)* · C) It uses no AI
**Correct:** Correct - and note it cuts both ways: the label neither proves nor disproves AI. What you know is what the marketing team chose to say.
**Incorrect:** Not quite - the clue is what "smart technology" describes: a promise. Date-and-location rules or learned face recognition could both sit behind it. The label leaves the mechanism exactly as unknown as before.

### P1-REM-010 - Products aren't one box *(M10)*
**Related questions:** QB-028, S08.
**Short explanation:** Classification exercises train a habit - one item, one label - and real products break it. Wanting a single box is the exercise talking, not the world.
**Alternative explanation + new example:** A translation earbud: rules manage pairing and audio, automation triggers capture when speech starts, learned models transcribe and translate. Ask "which category?" and the honest answer is "which layer?" The single-label instinct isn't wrong for a calculator; it's wrong for a stack.
**Alternative analogy (anchor extended):** Asking "is the restaurant the menu, the kitchen line, or the chef?" mistakes the parts for the whole. It's the combination - that's what a restaurant is.
**Guided question:** Take a product you named "an AI product" or "just an app." Split it into three layers. Which layer were you actually judging?
**Mini-confirm:** *A navigation app uses map rules, auto-rerouting, and learned traffic prediction. Best whole-product label?*
A) AI-assisted · B) Combination *(correct)* · C) Automation
**Correct:** Correct - layers named, label earned. Each single label catches one true layer; "combination" is the only label that catches the product.
**Incorrect:** Not quite - you've spotted a real layer, and there's more here: rules route, automation reroutes, learned patterns predict. When mechanisms stack, the honest label for the whole is a combination.

### P1-REM-011 - Written rules vs learned patterns *(M11)*
**Related questions:** QB-018, QB-032, QB-033, S01 vs S05.
**Short explanation:** Both are invisible, both live in code, both sort things - so of course they blur. The difference is where the logic came from.
**Alternative explanation + new example:** Two ways to catch bad passwords. Rule version: reject anything under 12 characters - a person typed that criterion, and it fires identically forever. Pattern version: flag passwords resembling millions of leaked ones - nobody wrote "reject P@ssw0rd123"; the resemblance was learned, and it's scored as a likelihood. Authored versus learned; exact repetition versus estimate. That's the entire fork.
**Alternative analogy (anchors as a pair):** The vending machine's button map was printed at the factory. The forecast's rain number was learned from decades of weather. Both produce outputs; only one had its logic written down by hand.
**Guided question:** Take any sorting you've seen software do. Could a person write the complete criteria? If yes, rules can do it. If the criteria would have to be "things like these examples," you're looking at patterns.
**Mini-confirm:** *One fraud check blocks all foreign transactions over $5,000. Another flags what's unusual for you. What's the key difference?*
A) The first is stricter · B) The first is an authored rule; the second is a learned, likelihood-based pattern *(correct)* · C) There's no real difference
**Correct:** Correct - the fork is yours now. Stated threshold: authored, deterministic. "Unusual for you": learned against your history, probabilistic.
**Incorrect:** Not quite - the clue is who could write it down. Anyone can author "over $5,000 from abroad." Nobody can pre-write "unusual" for every customer - that's computed from learned patterns, as a likelihood.

### P1-REM-012 - Most AI is quiet *(M12)*
**Related questions:** QB-017, QB-025, QB-026 (implicit), S06.
**Short explanation:** Fiction gave AI a face and a voice, so the chatty, humanoid version feels like the real one - and the everyday versions pass unnoticed.
**Alternative explanation + new example:** Count the AI in a morning with no conversation anywhere: the spam that never reached you, the commute time on your lock screen, the photos grouped by your dog's face, the card purchase silently scored as normal. Four learned judgments before breakfast, zero chat windows. Meanwhile the chattiest thing you met - a fixed-menu support bot - contained none.
**Alternative analogy (anchor extended):** The forecast never speaks and has no face, and it's the clearest everyday AI-shaped thing there is: learned patterns, likelihood out.
**Guided question:** List three systems you used today with no conversational interface. For each: any sign of a learned judgment?
**Mini-confirm:** *Which is the strongest sign AI is involved?*
A) It talks like a person · B) A judgment that varies with learned patterns - however silent the feature is *(correct)* · C) It has a face or a name
**Correct:** Correct - the costume's off. Chat and faces are interface choices; the tell is a learned, varying judgment, which mostly ships in silence.
**Incorrect:** Not quite - the clue is the fixed-menu bot from the activity: fully conversational, zero AI. Voices and faces are design; learned judgment is mechanism, and it's usually the quietest thing in the product.

### P1-REM-013 - Using isn't training *(M13)*
**Related questions:** QB-040, QB-004 option D.
**Short explanation:** "It learns" gets said loosely everywhere, and feeds visibly change with what you do - so live retraining feels like the natural explanation.
**Alternative explanation + new example (held back from the lesson):** Your photo app couldn't tell cats from dogs, then one day it could - not because of your photos that morning, but because an update shipped a retrained model. Five separate steps hide inside "it learns": a model was trained on examples; you give it inputs; it returns outputs; the product may collect data; and later - maybe - a new model ships. A changing feed is step three with fresh inputs, not step one happening live.
**Alternative analogy (anchor extended):** Tuesday's forecast didn't relearn meteorology from your glance at the app. It applied its existing model to new data; the model itself gets rebuilt on its own schedule.
**Guided question:** Name a product that "learned your taste." Which of the five steps have you actually observed - and which did you infer?
**Mini-confirm:** *Your recommendations changed right after you watched one film. What's established?*
A) The model retrained on you in real time · B) A trained model produced new output from new input - normal use *(correct)* · C) A person updated your profile
**Correct:** Correct - the five steps are doing their work. Fresh input through an existing model explains the change completely; when and whether the model retrains is a separate, unobserved step.
**Incorrect:** Not quite - the clue is what changed: the output, immediately. That's an existing model responding to new input. Live retraining is a much bigger claim than a shifted list can support.

### P1-REM-014 - One feature doesn't recolour the product *(M14)*
**Related questions:** QB-005, QB-029.
**Short explanation:** Products with any AI get sold as "AI products," so painting the whole thing one colour is the framing you were handed, not a mistake you invented.
**Alternative explanation + new example:** A word processor adds one drafting assistant. The spell-checker is still lists and rules; autosave is still a trigger; your documents are still a database. Calling it "an AI product" tells you about the launch announcement. Saying "the drafting feature is AI-assisted" tells you about the product - and lets you judge each part on its own mechanism.
**Alternative analogy (anchor extended):** Hiring one improvising chef doesn't make the menu, the ovens, and the booking system improvisational. The restaurant gained a capability; it didn't change species.
**Guided question:** Pick a product recently rebranded around AI. Name the one feature that actually changed - and three parts that didn't.
**Mini-confirm:** *A project tool adds an AI drafting feature. Most accurate statement?*
A) The tool is an AI product now · B) The drafting feature is AI-assisted; the boards and reminders are what they were *(correct)* · C) The reminders became AI too
**Correct:** Correct - feature-level precision, which is the skill. One learned-generation feature; the rest of the stack unchanged and honestly named.
**Incorrect:** Not quite - the clue is what the update touched: one feature. Capabilities are added per layer; the boards stayed rules and the reminders stayed automation. Classify the feature, not the announcement.

---

> INTERNAL VALIDATION NOTE:
> New remediation examples (airline fare engine, music identification, twin search boxes, translation earbud, leaked-password check, quiet-morning inventory, photo-app update, word-processor assistant, soap-bottle framing) and the analogy extensions require SME technical review per CS §13.1 before publication - analogy drift is the named top accuracy risk. Max-repetition (2) and escalation-on-third-trigger values are provisional against CS §8.2's escalation requirement.
