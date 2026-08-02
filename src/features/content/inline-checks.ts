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

export const INLINE_CHECKS: Record<"rules" | "automation" | "ai" | "compare", InlineCheckContent> =
  {
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
  };
