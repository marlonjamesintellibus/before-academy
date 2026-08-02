import type { InlineCheckContent } from "@/features/content/inline-checks";

export interface ReviewItem extends InlineCheckContent {
  category: string;
}

export const reviewBank: ReviewItem[] = [
  {
    id: "P1-QB-032",
    category: "traditional_software",
    prompt:
      "A payment check blocks any transaction over $5,000 made from abroad. Rule or learned pattern?",
    correctOptionId: "written-rule",
    options: [
      {
        id: "written-rule",
        text: "A written rule - a fixed threshold and condition, applied identically every time",
        feedback:
          "Correct - a stated threshold plus a stated condition is authored logic, deterministic every time.",
      },
      {
        id: "pattern-money",
        text: "A learned pattern, because it involves money",
        feedback:
          "Not quite - the mechanism is spelled out: over $5,000, from abroad, block. Anyone could write that down, and it repeats exactly. Domain and unpredictability don't change what's authored. Review: Traditional software.",
      },
      {
        id: "pattern-fraud",
        text: "A learned pattern, because fraud is unpredictable",
        feedback:
          "Not quite - the mechanism is spelled out: over $5,000, from abroad, block. Anyone could write that down, and it repeats exactly. Domain and unpredictability don't change what's authored. Review: Traditional software.",
      },
      {
        id: "neither-automation",
        text: "Neither - it's automation, so mechanisms don't apply",
        feedback:
          "Not quite - the mechanism is spelled out: over $5,000, from abroad, block. Anyone could write that down, and it repeats exactly. Domain and unpredictability don't change what's authored. Review: Traditional software.",
      },
    ],
  },
  {
    id: "P1-QB-035",
    category: "traditional_software",
    prompt: "Which job is the best fit for written rules rather than AI?",
    correctOptionId: "tax-calculation",
    options: [
      {
        id: "tax-calculation",
        text: "Calculating tax owed to the cent, identically for identical returns",
        feedback: "Correct - exact, repeatable calculation is what deterministic rules do best.",
      },
      {
        id: "film-guess",
        text: "Guessing which film someone might enjoy",
        feedback:
          'Not quite - recommendations, recognition, and summarizing all need patterns learned from varied examples. When the requirement is "exact and identical every time," written rules are the fit. Review: the comparison passage.',
      },
      {
        id: "handwriting",
        text: "Reading handwriting on envelopes",
        feedback:
          'Not quite - recommendations, recognition, and summarizing all need patterns learned from varied examples. When the requirement is "exact and identical every time," written rules are the fit. Review: the comparison passage.',
      },
      {
        id: "summarizing",
        text: "Summarizing a long conversation",
        feedback:
          'Not quite - recommendations, recognition, and summarizing all need patterns learned from varied examples. When the requirement is "exact and identical every time," written rules are the fit. Review: the comparison passage.',
      },
    ],
  },
  {
    id: "P1-QB-021",
    category: "automation",
    prompt: "A phone backs up photos every night while charging. Best label?",
    correctOptionId: "automation",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - the clue is the schedule and condition triggering the same step nightly. Nothing decides anything; the chain runs on its setup. Review: Automation.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Correct - a schedule plus a condition (night, charging) firing a fixed action is automation.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - the clue is the schedule and condition triggering the same step nightly. Nothing decides anything; the chain runs on its setup. Review: Automation.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - the clue is the schedule and condition triggering the same step nightly. Nothing decides anything; the chain runs on its setup. Review: Automation.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - the clue is the schedule and condition triggering the same step nightly. Nothing decides anything; the chain runs on its setup. Review: Automation.",
      },
    ],
  },
  {
    id: "P1-QB-024",
    category: "automation",
    prompt:
      "Any expense report over $500 routes to a director for approval the moment it's submitted. Best label?",
    correctOptionId: "automation",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - trace the shape: event, threshold condition, fixed action. The threshold is a written rule inside an automated flow, and no learned judgment appears. Review: Automation.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Correct - a trigger (submission), a condition (over $500), an action (route): a textbook workflow.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - trace the shape: event, threshold condition, fixed action. The threshold is a written rule inside an automated flow, and no learned judgment appears. Review: Automation.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - trace the shape: event, threshold condition, fixed action. The threshold is a written rule inside an automated flow, and no learned judgment appears. Review: Automation.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - trace the shape: event, threshold condition, fixed action. The threshold is a written rule inside an automated flow, and no learned judgment appears. Review: Automation.",
      },
    ],
  },
  {
    id: "P1-QB-014",
    category: "ai_characteristics",
    prompt: "At this level, which is the best description of AI?",
    correctOptionId: "pattern-systems",
    options: [
      {
        id: "talks-with-people",
        text: "Software that talks with people",
        feedback:
          "Not quite - conversation, autonomy, and newness are all beside the point. The defining move is applying patterns learned from data. Review: Artificial intelligence.",
      },
      {
        id: "pattern-systems",
        text: "Systems that find patterns in data to classify, predict, or generate things",
        feedback: "Correct - pattern-based classify/predict/generate is the working definition.",
      },
      {
        id: "works-automatically",
        text: "Any system that works automatically",
        feedback:
          "Not quite - conversation, autonomy, and newness are all beside the point. The defining move is applying patterns learned from data. Review: Artificial intelligence.",
      },
      {
        id: "newest-version",
        text: "The newest version of any software",
        feedback:
          "Not quite - conversation, autonomy, and newness are all beside the point. The defining move is applying patterns learned from data. Review: Artificial intelligence.",
      },
    ],
  },
  {
    id: "P1-QB-034",
    category: "ai_characteristics",
    prompt:
      "A generative assistant gives a detailed, confident answer that turns out to be wrong. Most accurate description?",
    correctOptionId: "likelihood-based",
    options: [
      {
        id: "lied",
        text: "The assistant lied",
        feedback:
          "Not quite - no intent, no disproof, and no automatic self-repair. Generation produces likelihoods that read fluently either way; the practical move is verification. Review: Artificial intelligence.",
      },
      {
        id: "likelihood-based",
        text: "Generated output is likelihood-based and can be confidently wrong - worth checking before relying on it",
        feedback:
          "Correct - confidence of tone and correctness are separate things in pattern-based generation.",
      },
      {
        id: "not-really-ai",
        text: "This proves the assistant isn't really AI",
        feedback:
          "Not quite - no intent, no disproof, and no automatic self-repair. Generation produces likelihoods that read fluently either way; the practical move is verification. Review: Artificial intelligence.",
      },
      {
        id: "corrects-permanently",
        text: "The assistant will now correct itself permanently",
        feedback:
          "Not quite - no intent, no disproof, and no automatic self-repair. Generation produces likelihoods that read fluently either way; the practical move is verification. Review: Artificial intelligence.",
      },
    ],
  },
  {
    id: "P1-QB-028",
    category: "combined_systems",
    prompt:
      "A logistics system plans routes using map rules, dispatches drivers automatically, and predicts delays from weather and traffic patterns. Best label for the whole system?",
    correctOptionId: "combination",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - each label you might pick names one true layer, but the description stacks three: rules (maps), automation (dispatch), and learned prediction (delays). The honest whole-system label is a combination. Review: Combined systems.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - each label you might pick names one true layer, but the description stacks three: rules (maps), automation (dispatch), and learned prediction (delays). The honest whole-system label is a combination. Review: Combined systems.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - each label you might pick names one true layer, but the description stacks three: rules (maps), automation (dispatch), and learned prediction (delays). The honest whole-system label is a combination. Review: Combined systems.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Correct - map rules, automatic dispatch, and learned delay prediction are three mechanisms cooperating.",
      },
    ],
  },
  {
    id: "P1-QB-029",
    category: "combined_systems",
    prompt:
      "A project tool has boards, deadline reminders, and one feature that drafts task descriptions. Which is the most accurate way to talk about it?",
    correctOptionId: "drafting-is-ai",
    options: [
      {
        id: "ai-product-now",
        text: '"It\'s an AI product now"',
        feedback:
          "Not quite - one AI feature neither converts the whole product nor gets cancelled by the rule-based parts. Name the layer: drafting is generation from patterns; boards are rules; reminders are automation. Review: Combined systems.",
      },
      {
        id: "drafting-is-ai",
        text: '"The drafting feature is AI-assisted; the boards and reminders aren\'t"',
        feedback:
          "Correct - classify the feature, not the brand. One learned-generation feature doesn't recolour the boards and reminders.",
      },
      {
        id: "reminders-ai-too",
        text: '"The reminders must be AI too, since the product has AI"',
        feedback:
          "Not quite - one AI feature neither converts the whole product nor gets cancelled by the rule-based parts. Name the layer: drafting is generation from patterns; boards are rules; reminders are automation. Review: Combined systems.",
      },
      {
        id: "nothing-is-ai",
        text: '"Nothing in it is AI, because most of it is rules"',
        feedback:
          "Not quite - one AI feature neither converts the whole product nor gets cancelled by the rule-based parts. Name the layer: drafting is generation from patterns; boards are rules; reminders are automation. Review: Combined systems.",
      },
    ],
  },
  {
    id: "P1-QB-022",
    category: "classification",
    prompt:
      'A doorbell app starts recording when motion is detected and labels each clip "person," "animal," or "vehicle." Best label?',
    correctOptionId: "combination",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - split it in two: the trigger-recording step is automation, and the labelling step is recognition, which is pattern-based. Together: a combination. Review: Combined systems.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - split it in two: the trigger-recording step is automation, and the labelling step is recognition, which is pattern-based. Together: a combination. Review: Combined systems.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - split it in two: the trigger-recording step is automation, and the labelling step is recognition, which is pattern-based. Together: a combination. Review: Combined systems.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Correct - motion-triggered recording is automation; telling a person from an animal in varied footage is learned pattern recognition. Two mechanisms, one product.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - split it in two: the trigger-recording step is automation, and the labelling step is recognition, which is pattern-based. Together: a combination. Review: Combined systems.",
      },
    ],
  },
  {
    id: "P1-QB-025",
    category: "classification",
    prompt:
      "A meeting tool produces a written summary of each call, worded differently every time. Best label?",
    correctOptionId: "ai-assisted",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - the clue is generated, varying output from unpredictable input. Written rules and templates repeat; this doesn't. Review: Artificial intelligence.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - the clue is generated, varying output from unpredictable input. Written rules and templates repeat; this doesn't. Review: Artificial intelligence.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Correct - generating varied prose from varied conversations is a learned-pattern job; no template covers every meeting.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - the clue is generated, varying output from unpredictable input. Written rules and templates repeat; this doesn't. Review: Artificial intelligence.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - the clue is generated, varying output from unpredictable input. Written rules and templates repeat; this doesn't. Review: Artificial intelligence.",
      },
    ],
  },
  {
    id: "P1-QB-038",
    category: "ambiguity",
    prompt:
      'A company reports: "Our chatbot resolves 80% of customer questions instantly." From this alone, best label for the chatbot?',
    correctOptionId: "not-enough",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - resolution rates measure results, not mechanisms. Chat interfaces prove nothing either way, and impressive numbers aren't evidence of learning. What's missing is any description of how it answers. Review: the marketing-claims passage.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - resolution rates measure results, not mechanisms. Chat interfaces prove nothing either way, and impressive numbers aren't evidence of learning. What's missing is any description of how it answers. Review: the marketing-claims passage.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - resolution rates measure results, not mechanisms. Chat interfaces prove nothing either way, and impressive numbers aren't evidence of learning. What's missing is any description of how it answers. Review: the marketing-claims passage.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - resolution rates measure results, not mechanisms. Chat interfaces prove nothing either way, and impressive numbers aren't evidence of learning. What's missing is any description of how it answers. Review: the marketing-claims passage.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Correct - the statistic describes an outcome. A well-built fixed-menu decision tree could hit that number; so could a generative system. The mechanism isn't stated.",
      },
    ],
  },
  {
    id: "P1-QB-041",
    category: "misconceptions",
    prompt: '"It answers so naturally - it clearly understands me." What\'s the best correction?',
    correctOptionId: "fluent-from-patterns",
    options: [
      {
        id: "agreed",
        text: "Agreed - fluent language requires understanding",
        feedback:
          "Not quite - natural-sounding answers are what pattern-based generation does; they're evidence of training data, not of understanding. Keep the verbs honest: it detects, classifies, and generates. Review: Artificial intelligence.",
      },
      {
        id: "fluent-from-patterns",
        text: "Fluent output comes from patterns learned from language; comprehension isn't established by natural-sounding answers",
        feedback:
          "Correct - generation produces fluent text from patterns. Like the forecast that doesn't know about your picnic: pattern, not comprehension.",
      },
      {
        id: "words-not-sentences",
        text: "It understands words but not sentences",
        feedback:
          "Not quite - natural-sounding answers are what pattern-based generation does; they're evidence of training data, not of understanding. Keep the verbs honest: it detects, classifies, and generates. Review: Artificial intelligence.",
      },
      {
        id: "only-if-polite",
        text: "It understands you only if you type politely",
        feedback:
          "Not quite - natural-sounding answers are what pattern-based generation does; they're evidence of training data, not of understanding. Keep the verbs honest: it detects, classifies, and generates. Review: Artificial intelligence.",
      },
    ],
  },
];
