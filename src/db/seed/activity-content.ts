/**
 * Seed content for the Sort the System activity (P1-ACT-001) and the
 * knowledge check (P1-KC-001), transformed from
 * phase1-content/02-diagrams-and-activities/classification-activity.md and
 * phase1-content/03-assessment/knowledge-check.md.
 */

import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

export const activitySeed: ActivitySeed = {
  id: "P1-ACT-001",
  title: "Sort the System",
  intro:
    'Ten real situations. Your job: pick the best label from the evidence in front of you. Some of these are straightforward, a couple are deliberately tricky, and one of the five labels - "Not enough information" - is sometimes the skilled answer, not a cop-out.',
  instructions:
    "Read each scenario. Pick the best label from what the scenario tells you - not what you'd guess from the brand or how impressive it sounds.",
  scenarios: [
    {
      id: "P1-ACT-001-S01",
      position: 1,
      title: "The calculator",
      body: "You type three amounts into a calculator app and it returns the total. Same numbers tomorrow, same total.",
      difficulty: "foundational",
      correctCategory: "traditional_software",
      accepted: [],
      clue: "fixed arithmetic - identical output every time.",
      feedback: {
        traditional_software:
          'Correct. The clue is "same numbers tomorrow, same total." Fixed arithmetic rules produce identical output for identical input - the signature of traditional software.',
        automation:
          "Not quite - here's the clue: you did the triggering by typing. Nothing runs on its own; the app applies written arithmetic rules to your input. Review: Traditional software.",
        ai_assisted:
          'Not quite - the clue is "same total, every time." Learned patterns produce output that can vary; fixed arithmetic never does. This is written rules. Review: Traditional software.',
        combination:
          "Not quite - there's only one mechanism described: arithmetic rules applied to your input. No chained tasks, no learned judgment. Review: Traditional software.",
        not_enough_information:
          "Not quite - this one tells you the mechanism: arithmetic that repeats exactly. Save this label for descriptions that hide how the system works. Review: Traditional software.",
      },
      explanation:
        "Calculation is the cleanest case of written rules: the behaviour was fully specified in advance, so the output is deterministic.",
      remediationAnchor: "P1-LESSON-002",
    },
    {
      id: "P1-ACT-001-S02",
      position: 2,
      title: "The instant confirmation email",
      body: "A visitor submits a contact form on a company website. The moment they press send, a confirmation email goes out to them - no person involved.",
      difficulty: "foundational",
      correctCategory: "automation",
      accepted: [],
      clue: "trigger → action chain; no judgment involved.",
      feedback: {
        automation:
          'Correct. The clue is "the moment they press send" - a trigger firing an action with no person involved. That\'s a chain running on its setup: automation.',
        traditional_software:
          "Not quite - you're close, and the email system is built from written rules. But the scenario's point is the flow: an event fires an action on its own. That's automation. Review: Automation.",
        ai_assisted:
          "Not quite - here's the clue: nothing is being judged. A submission triggers a pre-written email, the same way every time. Effort removed isn't intelligence added. Review: Automation.",
        combination:
          "Not quite - one mechanism carries this: a trigger running a fixed action. No learned step, no human step in the loop. Review: Automation.",
        not_enough_information:
          "Not quite - the mechanism is stated: press send, email goes out, no person involved. Trigger and action are right there. Review: Automation.",
      },
      explanation:
        "Automation describes how the work flows - an event starts a chain. Whether any step is intelligent is a separate question, and here none is.",
      remediationAnchor: "P1-LESSON-003",
    },
    {
      id: "P1-ACT-001-S03",
      position: 3,
      title: "Recommended for you",
      body: 'An online store shows a "Recommended for you" shelf. The ranking is different for every customer, and it shifts as people browse and buy.',
      difficulty: "applied",
      correctCategory: "ai_assisted",
      accepted: [],
      clue: "ranking learned from behaviour patterns; varies by person.",
      feedback: {
        ai_assisted:
          'Correct. The clue is "different for every customer, and it shifts as people browse." A ranking learned from behaviour patterns - varying with the data - is a pattern-based system at work.',
        traditional_software:
          "Not quite - here's the clue: the ranking varies by person and shifts with behaviour. Written rules would give everyone the same shelf. Variation tracking behaviour is learned patterns. Review: Artificial intelligence.",
        automation:
          "Not quite - the shelf does appear without anyone's effort, but the scenario describes how the ranking is decided: from behaviour patterns, differently per person. That's a learned judgment. Review: Artificial intelligence.",
        combination:
          "Not quite - a store around this shelf certainly uses rules too, but the scenario asks about the described feature: a behaviour-learned, per-person ranking. Classify the feature. Review: Artificial intelligence.",
        not_enough_information:
          "Not quite - the mechanism is described: rankings built from browsing and buying behaviour, varying per person. That's evidence of learned patterns. Review: Artificial intelligence.",
      },
      explanation:
        "Personalization can be rules or patterns - the deciding evidence here is per-person variation that tracks behaviour, which written rules don't produce.",
      remediationAnchor: "P1-LESSON-004",
    },
    {
      id: "P1-ACT-001-S04",
      position: 4,
      title: "Payroll on the 25th",
      body: "A company's payroll runs on the 25th of every month: salaries are calculated from timesheets and payments go out.",
      difficulty: "foundational",
      correctCategory: "automation",
      accepted: [],
      clue: "scheduled repetition of a fixed process.",
      feedback: {
        automation:
          'Correct. The clue is "the 25th of every month" - a schedule triggering a fixed process. Scheduled repetition with less manual effort is automation.',
        traditional_software:
          "Not quite - the salary math is written rules, true. But the scenario's defining feature is the schedule running the whole process unattended. That flow is automation. Review: Automation.",
        ai_assisted:
          "Not quite - here's the clue: nothing here is learned. Timesheets in, fixed calculation, payments out, on a schedule. Repetition isn't intelligence. Review: Automation.",
        combination:
          "Not quite - only rule-based steps on a schedule are described. No learned judgment, no human decision inside the run. Review: Automation.",
        not_enough_information:
          "Not quite - the description gives you the mechanism: a schedule, timesheets, salary calculation. That settles it as automation. Review: Automation.",
      },
      explanation:
        "You met this one in the lesson - deliberately. Retrieving it again a few minutes later is what makes it stick.",
      remediationAnchor: "P1-LESSON-003",
    },
    {
      id: "P1-ACT-001-S05",
      position: 5,
      title: "The unusual purchase",
      body: "Your bank sends an alert: a purchase on your card was flagged as unusual, and it asks you to confirm it was really you.",
      difficulty: "applied",
      correctCategory: "ai_assisted",
      accepted: [],
      clue: '"unusual" means deviation from your pattern - probabilistic by nature.',
      feedback: {
        ai_assisted:
          'Correct. The clue is the word "unusual" - unusual compared to your pattern of spending. Judging deviation from a learned pattern is probabilistic, which is why the bank asks rather than blocks.',
        traditional_software:
          'Not quite - a written rule looks like "flag anything over $2,000." "Unusual" is relative to your history - a learned pattern, not a fixed threshold. Review: Artificial intelligence.',
        automation:
          'Not quite - the alert is delivered automatically, but the scenario hinges on the judgment: deciding a purchase is "unusual" for you. That decision is pattern-based. Review: Artificial intelligence.',
        combination:
          "Not quite - a fair instinct, since delivery involves ordinary software. But the described feature is the flag itself, and that judgment is pattern-based. Classify the feature. Review: Artificial intelligence.",
        not_enough_information:
          'Not quite - "flagged as unusual" is the evidence: unusual is measured against your pattern, which means a learned, likelihood-based judgment. Review: Artificial intelligence.',
      },
      explanation:
        "The confirmation request is honesty about probability: the system produces a likelihood, not a certainty - sometimes wrong, by design.",
      remediationAnchor: "P1-LESSON-004",
    },
    {
      id: "P1-ACT-001-S06",
      position: 6,
      title: "The chatbot with a menu",
      body: 'A delivery company\'s chat assistant greets you with a fixed menu of options - "Track my parcel", "Change my address", "Talk to support." Each choice leads to another set list of options.',
      difficulty: "applied",
      correctCategory: "traditional_software",
      accepted: [],
      clue: "a decision tree is written rules, despite the chat interface.",
      feedback: {
        traditional_software:
          'Correct. The clue is "a fixed menu of options." A decision tree is written rules, so this chat window is traditional software underneath.',
        ai_assisted:
          "Not quite - here's the clue: \"a fixed menu of options.\" A decision tree is written rules, so this chat window is traditional software underneath. The interface looks conversational; the mechanism isn't. Review: Traditional software.",
        automation:
          "Not quite - nothing runs on a trigger here; you're navigating a menu. Set lists of choices are written rules wearing a chat interface. Review: Traditional software.",
        combination:
          "Not quite - only one mechanism is described: fixed menus leading to fixed menus. No learned step is anywhere in the description. Review: Traditional software.",
        not_enough_information:
          "Not quite - the mechanism is visible: every path is a pre-written list. That's a decision tree, which is written rules. Review: Traditional software.",
      },
      explanation: "Hold this one in mind - the next scenario looks identical from the outside.",
      remediationAnchor: "P1-LESSON-002",
    },
    {
      id: "P1-ACT-001-S07",
      position: 7,
      title: "The chatbot that writes",
      body: "A different company's chat assistant answers any question you type, in free-form sentences - and phrases things a little differently each time.",
      difficulty: "applied",
      correctCategory: "ai_assisted",
      accepted: [],
      clue: "generated, variable output - pattern-based.",
      feedback: {
        ai_assisted:
          'Correct. The clue is "any question, in free-form sentences, phrased differently each time." Generated, variable output is pattern-based. Note what settled it - the mechanism, not the chat window. The last chatbot had the same window and no AI.',
        traditional_software:
          "Not quite - compare the previous scenario: that one had fixed menus. This one handles any question with wording that varies - no written list could do that. Generated output is learned patterns. Review: Artificial intelligence.",
        automation:
          "Not quite - no trigger-and-chain here; the defining feature is free-form, varying answers to anything you type. That's generation from learned patterns. Review: Artificial intelligence.",
        combination:
          "Not quite - the product around it surely includes ordinary software, but the described feature - free-form, variable answers - is the AI part, and it's what the scenario asks about. Review: Artificial intelligence.",
        not_enough_information:
          "Not quite - the evidence is in the behaviour: unrestricted questions, generated sentences, varying phrasing. Written rules can't produce that. Review: Artificial intelligence.",
      },
      explanation:
        "Scenarios 6 and 7 are the same interface with different mechanisms. That's the lesson: you can't classify from the window - only from the behaviour or the description of what's underneath.",
      remediationAnchor: "P1-LESSON-004",
    },
    {
      id: "P1-ACT-001-S08",
      position: 8,
      title: "The arrival time",
      body: "A navigation app plans your route, shows live traffic, and predicts you'll arrive at 5:42 - updating the estimate as conditions change.",
      difficulty: "challenging",
      correctCategory: "combination",
      accepted: ["ai_assisted"],
      clue: "rules (routing) + live data + learned prediction working together.",
      feedback: {
        combination:
          "Correct. The clue is the stack: routing over a map is rules, live traffic is data flowing in automatically, and the arrival prediction is learned from patterns. Three mechanisms, one screen.",
        ai_assisted:
          "You caught the AI layer - the arrival prediction is learned from traffic patterns. There's more happening here, though: rule-based routing and automatic live data sit under it. The best label is Combination. Review: Combined systems.",
        traditional_software:
          'Not quite - the map and turn logic are rules, but "predicts you\'ll arrive at 5:42, updating as conditions change" is a likelihood learned from patterns. More than one mechanism is at work. Review: Combined systems.',
        automation:
          "Not quite - live updates do flow in automatically, but the scenario also describes rule-based routing and a learned prediction. That's several mechanisms cooperating: a combination. Review: Combined systems.",
        not_enough_information:
          "Not quite - the description is unusually generous: mapping rules, live traffic, and a pattern-based prediction are all named. That's a combination in plain sight. Review: Combined systems.",
      },
      explanation:
        "Real products stack mechanisms. The skilled read names the layers rather than forcing one label onto the whole screen.",
      remediationAnchor: "P1-LESSON-005",
    },
    {
      id: "P1-ACT-001-S09",
      position: 9,
      title: "The support queue",
      body: "A company's support platform sorts incoming messages into topic queues using a system trained on past tickets - and a support agent reads and answers each one.",
      difficulty: "challenging",
      correctCategory: "combination",
      accepted: ["automation"],
      clue: "automation routes, AI classifies, a human decides.",
      feedback: {
        combination:
          "Correct. The clue is all three layers in one sentence: messages route automatically, a system trained on past tickets classifies them, and a person decides the answer. That's the full stack from the diagram.",
        automation:
          "You caught the routing layer - messages do flow through a chain. There's more here, though: \"trained on past tickets\" is a learned classifier, and an agent makes the final call. Together, that's a combination. Review: Combined systems.",
        traditional_software:
          'Not quite - here\'s the clue: "trained on past tickets." Trained means learned patterns, not written rules - and a human decision sits on top. Several mechanisms: a combination. Review: Combined systems.',
        ai_assisted:
          "Not quite - the trained classifier is real, but it's one layer. Routing chains the work and a person answers. The honest label for the whole is Combination. Review: Combined systems.",
        not_enough_information:
          "Not quite - this description names its mechanisms: automatic sorting, a system trained on past tickets, a human answering. Everything you need is stated. Review: Combined systems.",
      },
      explanation:
        "This is the support-platform walkthrough from the lesson, met in the wild: interface, records, routing, AI classification, human review.",
      remediationAnchor: "P1-LESSON-005",
    },
    {
      id: "P1-ACT-001-S10",
      position: 10,
      title: "Smart technology",
      body: 'An app\'s store page says: "Our app uses smart technology to organize your photos."',
      difficulty: "challenging",
      correctCategory: "not_enough_information",
      accepted: [],
      clue: "marketing language describes the promise, not the mechanism.",
      feedback: {
        not_enough_information:
          "Correct - and this is the skilled answer, not a shrug. \"Smart technology\" describes the promise, not the mechanism. Organizing photos could be date-and-location rules or learned face recognition; the page doesn't say. Naming what's missing is the skill.",
        ai_assisted:
          'Not quite - here\'s the clue: "smart technology" is a label, not a description. Photo organization can be rules (date, location) or learned patterns (faces). The page gives you the word, not the mechanism. Review: the marketing-claims passage.',
        traditional_software:
          "Not quite - it might be. Sorting by date and location would be rules. But nothing on the page settles it either way, and guessing isn't classifying. Review: the marketing-claims passage.",
        automation:
          "Not quite - organizing does happen without effort, but the question is how it decides - rules or learned patterns - and the page never says. When the mechanism is hidden, say so. Review: the marketing-claims passage.",
        combination:
          "Not quite - plausible, but plausible isn't evidence. The page describes an outcome and attaches a label. Nothing stated distinguishes rules from learned patterns. Review: the marketing-claims passage.",
      },
      explanation:
        "Words like smart, intelligent, personalized, and AI-powered are chosen by marketing teams. They can be true; they're never evidence. The question that cuts through: what does this feature learn, and from what?",
      remediationAnchor: "P1-LESSON-005",
    },
  ],
};

export const checkSeed: CheckSeed = {
  id: "P1-KC-001",
  label: "Knowledge check - practice, not graded",
  intro:
    "Four questions to try the ideas out before the assessment. Feedback is immediate, nothing is scored, and a wrong answer hands you exactly the right thing to review.",
  questions: [
    {
      id: "P1-KC-001-Q01",
      stem: "Which of these best describes artificial intelligence?",
      options: [
        { text: "Any software that runs without human effort", correct: false },
        {
          text: "Systems that find patterns in data to classify, predict, or generate things",
          correct: true,
        },
        { text: "Software with an unusually large number of rules", correct: false },
        { text: 'Any product described as "smart"', correct: false },
      ],
      correctFeedback:
        "Correct. Patterns learned from data - instead of only written rules - is the whole definition at this level.",
      incorrectFeedback:
        "Not quite - effort, rule count, and labels don't define AI. The defining move is using patterns learned from data to classify, predict, or generate.",
      chip: { label: "Review - Artificial intelligence", anchor: "P1-LESSON-004" },
      category: "ai_characteristics",
      difficulty: "foundational",
      misconceptionTags: [],
      learningOutcomes: ["LO1", "LO2", "LO3"],
    },
    {
      id: "P1-KC-001-Q02",
      stem: "A report generates itself every Monday morning and emails the team. Which is accurate?",
      options: [
        { text: "It's automated, so it uses AI", correct: false },
        { text: "It's automated, and nothing described involves AI", correct: true },
        { text: "It uses AI, so it can't be called automation", correct: false },
        { text: "It's neither - reports are documents, not systems", correct: false },
      ],
      correctFeedback:
        'Correct. The clue is "every Monday" - a schedule running a fixed process. Automation and AI are separate questions, and no learned step is described here.',
      incorrectFeedback:
        "Not quite - a schedule firing a fixed process is automation, full stop. Automation neither implies nor excludes AI; you check for a learned judgment separately, and this description has none.",
      chip: { label: "Review - Automation", anchor: "P1-LESSON-003" },
      category: "automation",
      difficulty: "applied",
      misconceptionTags: ["M2"],
      learningOutcomes: ["LO4", "LO5"],
    },
    {
      id: "P1-KC-001-Q03",
      stem: "A photo app groups your pictures by the faces in them. Best label?",
      options: [
        { text: "Traditional software", correct: false },
        { text: "Automation", correct: false },
        { text: "AI-assisted", correct: true },
        { text: "Combination", correct: false },
        { text: "Not enough information", correct: false },
      ],
      correctFeedback:
        "Correct. Recognizing faces in varied photos is pattern recognition - no written rule lists every face.",
      incorrectFeedback:
        "Not quite - the clue is the task itself: identifying faces across endlessly varied images can't be written as a fixed rule list. Recognition is a learned-pattern job.",
      chip: { label: "Review - Artificial intelligence", anchor: "P1-LESSON-004" },
      category: "classification",
      difficulty: "applied",
      misconceptionTags: [],
      learningOutcomes: ["LO7"],
    },
    {
      id: "P1-KC-001-Q04",
      stem: '"This scheduling tool handles 40 time zones and every public holiday on Earth - it has to be AI." What\'s wrong with this reasoning?',
      options: [
        { text: "Nothing - that level of complexity requires AI", correct: false },
        {
          text: "It confuses complexity with mechanism: time zones and holidays are stored rules",
          correct: true,
        },
        { text: "It's wrong because scheduling tools can't use AI", correct: false },
        { text: "It's wrong because AI only exists in chatbots", correct: false },
      ],
      correctFeedback:
        "Correct. Time zones and holiday calendars are exactly the kind of thing people write down - many rules, still rules.",
      incorrectFeedback:
        'Not quite - the flaw is treating "impressive" as evidence. Stored time zones and holiday lists are written rules at scale; and AI is neither required by complexity nor limited to chatbots.',
      chip: { label: "Review - the misconception callout", anchor: "P1-LESSON-005-MISCONCEPTION" },
      category: "misconceptions",
      difficulty: "applied",
      misconceptionTags: ["M1"],
      learningOutcomes: ["LO8"],
    },
  ],
  completion: {
    body: "That's the practice done. When you're ready, the assessment draws fresh questions - same ideas, new situations.",
  },
};
