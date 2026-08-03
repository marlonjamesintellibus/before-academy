/**
 * Interface strings - mirrors docs/product/ux-copy.md (the canonical source).
 * A string that exists in both places with different wording is a defect.
 * Learning copy (lesson, feedback, questions) lives in content records, not here.
 */
export const strings = {
  actions: {
    startLearning: "Start learning - free",
    assessmentFirst: "Already know this? Take the assessment",
    continue: "Continue",
    tryActivity: "Try it: Sort the System",
    notifyMe: "Notify me",
    signIn: "Sign in",
    createAccount: "Create free account",
  },
  home: {
    eyebrow: "AI Awareness · Free · No account needed",
    headlineLead: "Know what AI actually is.",
    headlineFoil: "And what it isn't.",
    promise:
      "In about twenty minutes, learn to read what a system really does, judging it on evidence instead of the label on the box.",
    startCtaLabel: "Start the AI Awareness lesson",
    outcomes: [
      {
        title: "Read the mechanism",
        body: "Judge a system by how it works, not by what the marketing around it calls it.",
      },
      {
        title: "Practice on real cases",
        body: "Ten everyday systems to classify, with feedback that names the clue you missed.",
      },
      {
        title: "Know when you can't tell",
        body: "Spot the moment the evidence runs out, and say so instead of guessing.",
      },
    ],
  },
  pathway: {
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
    totalTime: "About 20 minutes",
    meta: [
      "About 20 minutes end to end",
      "4 steps: lesson, activity, practice, assessment",
      "Free, no account needed",
    ],
    sectionOneTitle: "AI, Automation and Traditional Software",
    sectionOneDescription:
      "Learn to tell the three apart, classify familiar systems, and recognize when you don't have enough information to judge.",
    notStarted: "Not started",
    comingSoon: "Coming soon",
    previewNote: "Coming soon - we'll open this section once it passes learner testing.",
  },
  system: {
    loadFailure: "Something went wrong loading this. Check your connection and try again.",
    notFound: "We can't find that page. Head home or jump back into the lesson.",
  },
} as const;
