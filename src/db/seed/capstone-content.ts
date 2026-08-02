/**
 * Capstone: audit an AI claim (experience-plan Phase E). Structured workplace
 * transfer task - the learner applies the section's skill to a real product
 * they use. Free-text answers are device-only by design (ADR-025 privacy
 * stance: no learner prose ever leaves the device).
 */
export interface CapstoneField {
  id: string;
  prompt: string;
  hint: string;
  modelAnswer: string;
}

export const capstoneFields: CapstoneField[] = [
  {
    id: "feature",
    prompt: "Which product and which specific feature are you auditing?",
    hint: "One feature, not the whole product - products mix mechanisms.",
    modelAnswer:
      'Example: "Our helpdesk tool - specifically the box that suggests a reply to each incoming ticket." Not "our helpdesk tool", which bundles a dozen mechanisms.',
  },
  {
    id: "inputs",
    prompt: "What does the feature take in, and what does it produce?",
    hint: "Observable inputs and outputs only - what goes in, what comes out.",
    modelAnswer:
      "Example: in - the ticket text and past ticket history; out - a drafted reply plus a topic label. Naming inputs and outputs keeps the audit about behaviour, not branding.",
  },
  {
    id: "mechanism",
    prompt: "Written rules, learned patterns, or can you not tell from the evidence?",
    hint: '"Not enough information" is a skilled answer - if you pick it, you are doing this right.',
    modelAnswer:
      "Example: the drafted reply varies with phrasing and sometimes misses badly - that points to learned patterns. The topic label might be keyword rules. Mixed mechanisms in one feature are common.",
  },
  {
    id: "automation",
    prompt: "What runs automatically, and what starts it?",
    hint: "Find the trigger; automation is about how work flows, not how decisions are made.",
    modelAnswer:
      "Example: ticket arrival triggers the draft; nothing sends without an agent clicking. The automation is the routing and the trigger - separate from whether any step is AI.",
  },
  {
    id: "evidence",
    prompt: "What evidence is missing? What would you ask the vendor?",
    hint: "One good question beats three assumptions.",
    modelAnswer:
      'Example: "What was the suggestion model trained on, and how often do agents edit its drafts?" Training data and override rates reveal more than any marketing page.',
  },
  {
    id: "oversight",
    prompt: "Where should a person review the output - and where is it safe not to?",
    hint: "Match oversight to the cost of a confident wrong answer.",
    modelAnswer:
      "Example: drafts to customers always get a human read before sending; the internal topic label can run unreviewed because a mislabel costs little and is easy to spot later.",
  },
  {
    id: "description",
    prompt:
      "Write one accurate sentence describing how the feature uses AI - without overstating it.",
    hint: "The sentence a careful colleague could repeat in a meeting.",
    modelAnswer:
      'Example: "It drafts replies using patterns learned from past tickets - an agent reviews every draft before it goes out." Specific mechanism, honest uncertainty, named oversight.',
  },
];
