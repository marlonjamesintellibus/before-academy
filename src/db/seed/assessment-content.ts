/**
 * Graded assessment core bank seed (P1-ASM-001, items P1-QB-001..010).
 * Transformed faithfully from phase1-content/03-assessment/assessment.md.
 * Industry variant rotation is deferred: variant A text is used for QB-005,
 * QB-006, QB-007, and QB-008.
 */

import type { AssessmentSeed } from "@/features/assessment/types";

export const assessmentSeed: AssessmentSeed = {
  id: "P1-ASM-001",
  intro:
    "Assessment: AI, Automation and Traditional Software\n\nSix questions, drawn fresh each attempt. Passing shows you can use the distinctions - not that you memorized wording. There's no time limit, you can review your answers before submitting, and if it doesn't go your way, you'll get a specific study plan and a new set of questions whenever you're ready.\n\nYou'll need five of six correct to pass.",
  questions: [
    {
      id: "P1-QB-001",
      format: "multiple_choice",
      category: "traditional_software",
      difficulty: "foundational",
      stem: "A currency converter multiplies the amount you enter by today's rate stored in its table. Why does this count as traditional software?",
      options: [
        {
          text: "Because it follows written rules applied to your input - the same amount and rate always give the same result",
          correct: true,
        },
        { text: "Because it's a simple app, and simple apps can't be AI", correct: false },
        { text: "Because it doesn't connect to the internet", correct: false },
        { text: "Because a person checks every conversion", correct: false },
      ],
      correctExplanation:
        "Correct. The clue is the stored rate and the fixed multiplication: written rules, deterministic output.",
      incorrectExplanation:
        "Not quite - the deciding evidence is the mechanism: a stored rate applied by a fixed calculation. Simplicity, connectivity, and human checking are beside the point; written rules with repeatable output define traditional software. Review: Traditional software.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO1", "LO6"],
      misconceptionTags: ["M1"],
    },
    {
      id: "P1-QB-002",
      format: "scenario_decision",
      category: "automation",
      difficulty: "foundational",
      stem: "Every night at 2am, a company's files back up to the cloud with nobody involved. Which statement is most accurate?",
      options: [
        { text: "It's automation, and nothing described involves AI", correct: true },
        { text: "It's automation, so AI must be involved", correct: false },
        { text: "It's AI, because it happens without people", correct: false },
        { text: "It's traditional software, because computers are involved", correct: false },
      ],
      correctExplanation:
        "Correct. The clue is the schedule: a trigger running a fixed process is automation, and no step described makes a learned judgment.",
      incorrectExplanation:
        'Not quite - "every night at 2am" is a schedule firing a fixed chain: automation. Effort removed doesn\'t mean intelligence added, and automation neither implies nor excludes AI - here, none is described. Review: Automation.',
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO2", "LO5"],
      misconceptionTags: ["M2"],
    },
    {
      id: "P1-QB-003",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "A spam filter sometimes puts a real message in the junk folder. What's the most accurate description of what's happening?",
      options: [
        { text: "The filter is broken and needs its rules fixed", correct: false },
        {
          text: "Pattern-based systems produce likelihoods, so occasional misses are part of the design",
          correct: true,
        },
        { text: "The filter was given the wrong list of spam senders", correct: false },
        { text: "This proves the filter doesn't use AI", correct: false },
      ],
      correctExplanation:
        'Correct. The clue is "sometimes" - a likelihood-based judgment that\'s usually right and occasionally wrong is a pattern-based system operating as designed.',
      incorrectExplanation:
        "Not quite - a false positive isn't breakage or proof of anything missing. Learned patterns yield likelihoods, not certainties, so useful-and-sometimes-wrong is the expected shape. Review: Artificial intelligence.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO3", "LO6"],
      misconceptionTags: ["M4", "M7"],
    },
    {
      id: "P1-QB-004",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "A translation app converts your sentences into another language, fluently. Which claim about it is accurate?",
      options: [
        {
          text: "It understands both languages the way a bilingual person does",
          correct: false,
        },
        { text: "It applies patterns learned from many example translations", correct: true },
        { text: "It looks every sentence up in a stored list of translations", correct: false },
        {
          text: "It relearns your language habits from each sentence you type",
          correct: false,
        },
      ],
      correctExplanation:
        "Correct. The clue is fluency across sentences nobody stored in advance - that's generation from learned patterns, not lookup and not comprehension.",
      incorrectExplanation:
        "Not quite - fluency comes from patterns learned from many example translations. No stored list covers every sentence, comprehension isn't established by fluent output, and using the app isn't retraining it. Review: Artificial intelligence.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO3", "LO10"],
      misconceptionTags: ["M3", "M13"],
    },
    {
      id: "P1-QB-005",
      format: "multiple_select",
      category: "combined_systems",
      difficulty: "applied",
      stem: "A banking app shows your balance, runs your scheduled transfer on the 1st, and flags purchases unusual for your spending. Select every mechanism described.",
      options: [
        { text: "Traditional software", correct: true },
        { text: "Automation", correct: true },
        { text: "AI", correct: true },
        { text: "Human review", correct: false },
      ],
      correctExplanation:
        "Correct. Balance/prices are written rules; the scheduled transfer/receipt is a trigger-driven chain; the unusual-purchase flag/per-customer ranking is a learned judgment. No human step is described.",
      incorrectExplanation:
        "Not quite - go layer by layer: stored records and fixed calculations are rules; the scheduled or triggered step is automation; the judgment that varies with behaviour is AI. Human review isn't in the description. Review: Combined systems.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO4", "LO5", "LO7"],
      misconceptionTags: ["M14"],
    },
    {
      id: "P1-QB-006",
      format: "multiple_choice",
      category: "combined_systems",
      difficulty: "challenging",
      stem: "A clinic's system stores appointment records, sends reminders three days ahead, and uses a model trained on past no-shows to predict who might miss - staff decide who gets a phone call. Which statement is most accurate?",
      options: [
        { text: "The whole system is AI", correct: false },
        {
          text: "The prediction step is AI-assisted; the rest is rules, automation, and people",
          correct: true,
        },
        { text: "Since people make the final decision, no AI is involved", correct: false },
        { text: "The reminders are the AI part", correct: false },
      ],
      correctExplanation:
        'Correct. The clue is "trained on past..." - that one step is a learned prediction. Records are rules, reminders are automation, and the human call is human review: one AI-assisted layer inside a combined system.',
      incorrectExplanation:
        "Not quite - classify layer by layer. \"Trained on past\" marks the learned step; storage is rules; scheduled reminders are automation; people deciding is human review. One AI layer doesn't make the whole system AI, and human involvement doesn't erase it. Review: Combined systems.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["LO5", "LO7"],
      misconceptionTags: ["M6", "M14"],
    },
    {
      id: "P1-QB-007",
      format: "multiple_choice",
      category: "classification",
      difficulty: "applied",
      stem: "An email tool sends your out-of-office reply to every message that arrives while you're away. Best label?",
      options: [
        { text: "Traditional software", correct: false },
        { text: "Automation", correct: true },
        { text: "AI-assisted", correct: false },
        { text: "Combination", correct: false },
        { text: "Not enough information", correct: false },
      ],
      correctExplanation:
        "Correct. The clue is the trigger - a message arrives / an order is paid - firing a fixed action every time. That's a chain running on its setup.",
      incorrectExplanation:
        "Not quite - look for the trigger-and-action shape: an event fires, a pre-set step runs, identically each time. No judgment is described, and the mechanism is stated, so the evidence settles it as automation. Review: Automation.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["LO2", "LO7"],
      misconceptionTags: ["M2"],
    },
    {
      id: "P1-QB-008",
      format: "multiple_choice",
      category: "classification",
      difficulty: "applied",
      stem: "A music service's weekly mix is different for every listener and shifts with what they play. Best label?",
      options: [
        { text: "Traditional software", correct: false },
        { text: "Automation", correct: false },
        { text: "AI-assisted", correct: true },
        { text: "Combination", correct: false },
        { text: "Not enough information", correct: false },
      ],
      correctExplanation:
        "Correct. The clue is output that varies with behaviour/patterns - per-listener mixes, per-applicant likelihoods. Learned patterns produce that; written rules don't.",
      incorrectExplanation:
        "Not quite - the evidence is variation tracking the data: different for every person, built from past examples, expressed as estimates. That's a pattern-based judgment. Review: Artificial intelligence.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["LO3", "LO7"],
      misconceptionTags: ["M8"],
    },
    {
      id: "P1-QB-009",
      format: "multiple_choice",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A fitness app's store page says it \"adapts intelligently to your routine.\" From this alone, what's the best label?",
      options: [
        { text: "Traditional software", correct: false },
        { text: "Automation", correct: false },
        { text: "AI-assisted", correct: false },
        { text: "Combination", correct: false },
        { text: "Not enough information", correct: true },
      ],
      correctExplanation:
        "Correct - and it's the skilled answer. \"Adapts intelligently\" describes a promise, not a mechanism. Adapting could be a written rule (harder workouts every two weeks) or learned patterns; the page doesn't say.",
      incorrectExplanation:
        'Not quite - nothing in "adapts intelligently to your routine" reveals how it decides. It reads like evidence of AI, and that\'s the trap: marketing words describe outcomes and promises. When the mechanism is hidden, saying so is the accurate classification. Review: the marketing-claims passage.',
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["LO8", "LO9"],
      misconceptionTags: ["M9"],
    },
    {
      id: "P1-QB-010",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: 'A colleague says: "Our new invoicing tool must be AI - it handles hundreds of tax rules across 12 countries." What\'s the best response?',
      options: [
        { text: "Agree - nothing that complex could run on ordinary rules", correct: false },
        {
          text: "Point out that complexity doesn't reveal the mechanism: many written rules are still written rules",
          correct: true,
        },
        { text: "Say it's AI only if it runs in the cloud", correct: false },
        {
          text: "Ask whether it's automated - automated and AI mean the same thing",
          correct: false,
        },
      ],
      correctExplanation:
        'Correct. The clue is in the claim itself: "hundreds of tax rules." Rules authored by people, however many, are traditional software. Impressiveness measures effort, not mechanism.',
      incorrectExplanation:
        'Not quite - scale doesn\'t change the nature: a bigger vending machine is still a vending machine. Cloud hosting is irrelevant, and automation is a separate question from AI. The tell is "rules" - written, deterministic, traditional. Review: the misconception callout.',
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["LO8"],
      misconceptionTags: ["M1", "M2"],
    },
  ],
};
