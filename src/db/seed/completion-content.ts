/**
 * Completion states (authored P1-COM-001/002, transformed verbatim from
 * phase1-content/04-remediation-and-completion/completion.md). Completion
 * names demonstrated ability, never consumption; the single permitted
 * exclamation mark in the product lives in these headlines.
 */
export interface CompletionContent {
  headline: string;
  perfectHeadline: string;
  message: string;
  perfectMessage: string;
  capabilities: string[];
  takeaways: string;
  observationActivity: string;
}

export const completionContent: CompletionContent = {
  headline: "Section complete - you can tell them apart now!",
  perfectHeadline: "A clean sweep - every category, first try!",
  message:
    "Three weeks ago - maybe three hours ago - \"AI\" was a word that could mean anything. Now it's a claim you can examine. That's the difference this section was built to make.",
  perfectMessage:
    "A clean sweep across every category, which means the distinctions aren't merely familiar - they're working. The observation activity below is where a perfect score gets interesting: the wild has messier cases than any assessment.",
  capabilities: [
    "Describe traditional software, automation, and AI in your own words",
    "Check whether an automated system involves AI instead of assuming either way",
    "Classify real products layer by layer, including combinations",
    'Treat "smart" and "AI-powered" as wording to question, not evidence',
    'Say "not enough information" - and name what would settle it',
  ],
  takeaways:
    "Rules are written; automation chains tasks; AI learns patterns - and most real products combine them. Pattern-based outputs are estimates: useful, confident-sounding, and sometimes wrong by design. Labels describe marketing; mechanisms decide classification.",
  observationActivity:
    "Over the next few days, catch three systems in the act - one you'd call traditional software, one automation, one AI-assisted or a combination. For each, name the clue that convinced you. If one stumps you, that's a finding too: write down what information was missing.",
};
