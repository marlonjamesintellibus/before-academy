/**
 * Interface strings — mirrors docs/product/ux-copy.md (the canonical source).
 * A string that exists in both places with different wording is a defect.
 * Learning copy (lesson, feedback, questions) lives in content records, not here.
 */
export const strings = {
  actions: {
    startLearning: "Start learning — free",
    assessmentFirst: "Already know this? Take the assessment",
    continue: "Continue",
    tryActivity: "Try it: Sort the System",
    notifyMe: "Notify me",
    signIn: "Sign in",
    createAccount: "Create free account",
  },
  home: {
    headline: "Know what AI actually is — and what it isn't",
    promise:
      "In about twenty minutes, learn to tell AI, automation and traditional software apart — free, no account needed.",
    startCtaLabel: "Start the AI Awareness lesson",
    valueStrip: ["Layered depth", "Learn by doing", "No account needed"],
  },
  pathway: {
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does — starting with the difference between AI, automation and traditional software.",
    totalTime: "About 20 minutes",
    sectionOneTitle: "AI, Automation and Traditional Software",
    sectionOneDescription:
      "Learn to tell the three apart, classify familiar systems, and recognize when you don't have enough information to judge.",
    notStarted: "Not started",
    comingSoon: "Coming soon",
    previewNote: "Coming soon — we'll open this section once it passes learner testing.",
  },
  system: {
    loadFailure: "Something went wrong loading this. Check your connection and try again.",
    notFound: "We can't find that page. Head home or jump back into the lesson.",
  },
} as const;
