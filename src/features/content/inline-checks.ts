export interface InlineCheckOption {
  id: string;
  text: string;
  feedback: string;
}

export interface InlineCheckContent {
  id: string;
  prompt: string;
  correctOptionId: string;
  options: InlineCheckOption[];
}

export const INLINE_CHECKS: Record<
  | "rules"
  | "automation"
  | "ai"
  | "compare"
  | "rules2"
  | "rules3"
  | "automation2"
  | "automation3"
  | "ai2"
  | "ai3"
  | "compare2"
  | "compare3",
  InlineCheckContent
> = {
  rules: {
    id: "P1-MICRO-001",
    prompt:
      "A password-strength checker approves your password once it has 12 characters, a number, and a symbol. What's underneath?",
    correctOptionId: "written-rules",
    options: [
      {
        id: "written-rules",
        text: "Written rules",
        feedback:
          "Correct. The clue is the checklist itself - 12 characters, a number, a symbol. Criteria someone listed in advance are written rules, and the same password gets the same verdict every time.",
      },
      {
        id: "learned-patterns",
        text: "Patterns learned from examples",
        feedback:
          "Not quite - here's the clue: the exact checklist. When the criteria can be written out as a list, nothing was learned from examples; a person authored the rules. Review: Traditional software.",
      },
      {
        id: "not-enough",
        text: "Not enough information to tell",
        feedback:
          'Not quite - this one gives you enough. The stated checklist is the evidence: listed criteria are written rules. "Not enough information" is the right call only when a description hides the mechanism. Review: Traditional software.',
      },
    ],
  },
  automation: {
    id: "P1-MICRO-002",
    prompt:
      "Payroll runs on the 25th of every month, calculating salaries from timesheets and sending payments. What's the best label?",
    correctOptionId: "automation",
    options: [
      {
        id: "automation",
        text: "Automation",
        feedback:
          'Correct. The clue is "the 25th of every month" - a schedule triggers a fixed sequence. Nothing in the description makes a learned judgment.',
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - repetition and reduced effort do not make a system AI. A schedule starts predefined calculations and payments, so this is automation. Review: Automation.",
      },
      {
        id: "not-enough",
        text: "Not enough information to tell",
        feedback:
          "Not quite - the mechanism is visible: a date triggers a fixed sequence using timesheets. That is enough evidence to identify automation. Review: Automation.",
      },
    ],
  },
  ai: {
    id: "P1-MICRO-003",
    prompt:
      "You ask a chatbot the same question twice and get two differently worded answers. What's the best explanation?",
    correctOptionId: "pattern-output",
    options: [
      {
        id: "malfunction",
        text: "The system must be malfunctioning",
        feedback:
          "Not quite - different wording can be normal for a pattern-based system. Variation alone is not proof of a malfunction. Review: Artificial intelligence.",
      },
      {
        id: "pattern-output",
        text: "Pattern-based systems produce outputs that can vary",
        feedback:
          "Correct. A pattern-based system produces a likely output rather than replaying one fixed answer, so wording can vary even when the prompt stays the same.",
      },
      {
        id: "rules-rewritten",
        text: "Someone rewrote the rules between questions",
        feedback:
          "Not quite - no rule change is needed. Generated output can vary because the system works from learned patterns and probabilities. Review: Artificial intelligence.",
      },
    ],
  },
  compare: {
    id: "P1-MICRO-004",
    prompt:
      'A company says: "Our support platform automatically sorts incoming messages, and our team answers them." Which label fits best?',
    correctOptionId: "combination",
    options: [
      {
        id: "automation-only",
        text: "Automation only",
        feedback:
          "Not quite - automatic sorting describes the workflow, but the company has not told us whether the sorting uses written rules or learned patterns. A person is also part of the system.",
      },
      {
        id: "ai-only",
        text: "AI-assisted only",
        feedback:
          "Not quite - the word automatically does not prove AI. We know there is a workflow and human review, but we do not know how the sorting decision is made.",
      },
      {
        id: "combination",
        text: "A combination - and part of it depends on information we don't have",
        feedback:
          "Correct. We can see automation and human work. Whether the sorting layer is AI or written rules remains unknown, so the honest answer names both the combination and the missing evidence.",
      },
    ],
  },
  rules2: {
    id: "P1-QB-013",
    prompt: "Which description matches traditional software?",
    correctOptionId: "written-rules",
    options: [
      {
        id: "written-rules",
        text: "Software that follows rules people wrote, so the same input gives the same output",
        feedback: "Correct - written rules and repeatable output are the definition.",
      },
      {
        id: "improves-itself",
        text: "Software that improves itself as you use it",
        feedback:
          "Not quite - age and interfaces are irrelevant, and self-improvement isn't part of it. The definition is authored rules producing the same output for the same input. Review: Traditional software.",
      },
      {
        id: "older-computers",
        text: "Software that runs only on older computers",
        feedback:
          "Not quite - age and interfaces are irrelevant, and self-improvement isn't part of it. The definition is authored rules producing the same output for the same input. Review: Traditional software.",
      },
      {
        id: "no-interface",
        text: "Software with no user interface",
        feedback:
          "Not quite - age and interfaces are irrelevant, and self-improvement isn't part of it. The definition is authored rules producing the same output for the same input. Review: Traditional software.",
      },
    ],
  },
  rules3: {
    id: "P1-QB-018",
    prompt: "What's the key difference between a rule-based and a pattern-based system?",
    correctOptionId: "authored-vs-learned",
    options: [
      {
        id: "older",
        text: "Rule-based systems are older",
        feedback:
          "Not quite - age, accuracy, and arithmetic don't separate them. Rules are written by people and repeat exactly; patterns are learned from examples and produce likelihoods. Review: the comparison passage.",
      },
      {
        id: "authored-vs-learned",
        text: "Rule-based systems follow authored if-then rules; pattern-based systems apply patterns learned from examples",
        feedback: "Correct - authorship versus learning is the whole distinction.",
      },
      {
        id: "more-accurate",
        text: "Pattern-based systems are always more accurate",
        feedback:
          "Not quite - age, accuracy, and arithmetic don't separate them. Rules are written by people and repeat exactly; patterns are learned from examples and produce likelihoods. Review: the comparison passage.",
      },
      {
        id: "no-numbers",
        text: "Rule-based systems can't handle numbers",
        feedback:
          "Not quite - age, accuracy, and arithmetic don't separate them. Rules are written by people and repeat exactly; patterns are learned from examples and produce likelihoods. Review: the comparison passage.",
      },
    ],
  },
  automation2: {
    id: "P1-QB-016",
    prompt: "A parking garage barrier lifts the moment a paid ticket is inserted. Best label?",
    correctOptionId: "automation",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - look for the trigger-and-action shape: event in, fixed step out, no judgment described. Review: Automation.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Correct - a trigger (paid ticket) fires an action (barrier lifts), the same way every time.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Not quite - look for the trigger-and-action shape: event in, fixed step out, no judgment described. Review: Automation.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - look for the trigger-and-action shape: event in, fixed step out, no judgment described. Review: Automation.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - look for the trigger-and-action shape: event in, fixed step out, no judgment described. Review: Automation.",
      },
    ],
  },
  automation3: {
    id: "P1-QB-036",
    prompt:
      "Your team wants a receipt emailed automatically after every purchase. Does this need AI?",
    correctOptionId: "no-trigger-template",
    options: [
      {
        id: "yes-automatic",
        text: "Yes - anything automatic needs AI",
        feedback:
          "Not quite - automatic doesn't mean intelligent, a template isn't generation, and rule-based steps sit inside automation all the time. Trigger plus template is the whole solution. Review: Automation.",
      },
      {
        id: "no-trigger-template",
        text: "No - a trigger and a template cover it; that's automation without AI",
        feedback:
          "Correct - event fires, template sends. A fixed chain does this perfectly with no learned step.",
      },
      {
        id: "yes-language",
        text: "Yes - emails require language generation",
        feedback:
          "Not quite - automatic doesn't mean intelligent, a template isn't generation, and rule-based steps sit inside automation all the time. Trigger plus template is the whole solution. Review: Automation.",
      },
      {
        id: "no-cant-automate",
        text: "No - because receipts are traditional software, it can't be automated",
        feedback:
          "Not quite - automatic doesn't mean intelligent, a template isn't generation, and rule-based steps sit inside automation all the time. Trigger plus template is the whole solution. Review: Automation.",
      },
    ],
  },
  ai2: {
    id: "P1-QB-017",
    prompt: "A voice assistant turns your spoken message into written text. Best label?",
    correctOptionId: "ai-assisted",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - the clue is the task: converting endlessly varied speech to text can't be written as fixed rules. Recognition is pattern-based. Review: Artificial intelligence.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - the clue is the task: converting endlessly varied speech to text can't be written as fixed rules. Recognition is pattern-based. Review: Artificial intelligence.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Correct - recognizing speech across voices and accents is a learned-pattern job; no rule list covers every way people talk.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - the clue is the task: converting endlessly varied speech to text can't be written as fixed rules. Recognition is pattern-based. Review: Artificial intelligence.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - the clue is the task: converting endlessly varied speech to text can't be written as fixed rules. Recognition is pattern-based. Review: Artificial intelligence.",
      },
    ],
  },
  ai3: {
    id: "P1-QB-033",
    prompt:
      "A payment check flags transactions that are unusual for that specific customer's history. Rule or learned pattern?",
    correctOptionId: "learned-pattern",
    options: [
      {
        id: "rule-banks-write",
        text: "A written rule, because banks write everything down",
        feedback:
          "Not quite - no author can pre-write \"unusual\" for every customer; it's computed against each person's history. A binary flag can still come from a likelihood underneath. Review: Artificial intelligence.",
      },
      {
        id: "learned-pattern",
        text: 'A learned pattern - "unusual for you" is measured against patterns in your history',
        feedback:
          "Correct - \"unusual for you\" has no fixed threshold; it's deviation from a learned pattern, and it's probabilistic.",
      },
      {
        id: "neither-alert",
        text: "Neither - it's just an alert",
        feedback:
          "Not quite - no author can pre-write \"unusual\" for every customer; it's computed against each person's history. A binary flag can still come from a likelihood underneath. Review: Artificial intelligence.",
      },
      {
        id: "rule-on-off",
        text: "A written rule, because the flag is either on or off",
        feedback:
          "Not quite - no author can pre-write \"unusual\" for every customer; it's computed against each person's history. A binary flag can still come from a likelihood underneath. Review: Artificial intelligence.",
      },
    ],
  },
  compare2: {
    id: "P1-QB-020",
    prompt:
      'A streaming app\'s "because you watched" row is different for every viewer and updates with what they play. Best label?',
    correctOptionId: "ai-assisted",
    options: [
      {
        id: "traditional-software",
        text: "Traditional software",
        feedback:
          "Not quite - the evidence is variation tied to behaviour: every viewer sees a different row. Written rules would show everyone the same thing. Review: Artificial intelligence.",
      },
      {
        id: "automation",
        text: "Automation",
        feedback:
          "Not quite - the evidence is variation tied to behaviour: every viewer sees a different row. Written rules would show everyone the same thing. Review: Artificial intelligence.",
      },
      {
        id: "ai-assisted",
        text: "AI-assisted",
        feedback:
          "Correct - per-viewer rankings that track behaviour are learned patterns at work.",
      },
      {
        id: "combination",
        text: "Combination",
        feedback:
          "Not quite - the evidence is variation tied to behaviour: every viewer sees a different row. Written rules would show everyone the same thing. Review: Artificial intelligence.",
      },
      {
        id: "not-enough",
        text: "Not enough information",
        feedback:
          "Not quite - the evidence is variation tied to behaviour: every viewer sees a different row. Written rules would show everyone the same thing. Review: Artificial intelligence.",
      },
    ],
  },
  compare3: {
    id: "P1-QB-042",
    prompt: 'A vendor says their product is "AI-powered." Which question best evaluates the claim?',
    correctOptionId: "which-feature",
    options: [
      {
        id: "awards",
        text: '"How many awards has it won?"',
        feedback:
          "Not quite - awards, hosting, and chat windows are all surface. The evaluating question targets mechanism: which feature, learning what, from what data. Review: the marketing-claims passage.",
      },
      {
        id: "which-feature",
        text: '"Which specific feature uses AI, and what does it learn from?"',
        feedback:
          "Correct - naming the feature and its learning source moves the conversation from labels to mechanism.",
      },
      {
        id: "cloud",
        text: '"Is it in the cloud?"',
        feedback:
          "Not quite - awards, hosting, and chat windows are all surface. The evaluating question targets mechanism: which feature, learning what, from what data. Review: the marketing-claims passage.",
      },
      {
        id: "chatbot",
        text: '"Does it have a chatbot?"',
        feedback:
          "Not quite - awards, hosting, and chat windows are all surface. The evaluating question targets mechanism: which feature, learning what, from what data. Review: the marketing-claims passage.",
      },
    ],
  },
};

export const STAGE_EXTRA_CHECKS: Record<number, InlineCheckContent[]> = {
  1: [INLINE_CHECKS.rules2, INLINE_CHECKS.rules3],
  2: [INLINE_CHECKS.automation2, INLINE_CHECKS.automation3],
  3: [INLINE_CHECKS.ai2, INLINE_CHECKS.ai3],
  4: [INLINE_CHECKS.compare2, INLINE_CHECKS.compare3],
};
