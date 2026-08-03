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
    /** AIA-4 in docs/content/content-map.md, the section that follows the
     * published one in learner order. Named here so the pathway page and the
     * dashboard cannot drift apart, which is how "Applying AI at Work" (a
     * section no plan defined) reached both. */
    nextSectionTitle: "What AI Can Do",
    restOfPathwayTitle: "The rest of the AI Awareness pathway",
    restOfPathwayNote:
      "Seven sections in total, all open. Each is a lesson with a practice check; graded assessment currently sits with section 3.",
    /**
     * The AI Awareness outline exactly as commissioned in
     * docs/content/content-map.md. Positions are learner order, so the open
     * section keeps its true number 3 rather than being renumbered to look
     * like the beginning of the pathway.
     */
    outline: [
      {
        position: 1,
        title: "What Is Artificial Intelligence?",
        slug: "what-is-artificial-intelligence",
      },
      { position: 2, title: "AI in Everyday Life", slug: "ai-in-everyday-life" },
      { position: 4, title: "What AI Can Do", slug: "what-ai-can-do" },
      { position: 5, title: "What AI Cannot Reliably Do", slug: "what-ai-cannot-reliably-do" },
      { position: 6, title: "Myths and Misconceptions", slug: "myths-and-misconceptions" },
      { position: 7, title: "Where to Go Next", slug: "where-to-go-next" },
    ],
    previewNote: "Coming soon - we'll open this section once it passes learner testing.",
  },
  account: {
    dashboard: "Dashboard",
    signOut: "Sign out",
    previewNotice:
      "Simulated sign-in for development. No password, no account, nothing leaves this device. Real accounts arrive with the auth milestone.",
    previewCta: "Start a simulated session",
    emailLabel: "Email address",
    dashboardTitle: "Your dashboard",
    guestOnly:
      "The dashboard needs an account, and accounts are still on the way. Everything in the lesson works without one.",
    emptyState:
      "You have not started yet. AI, Automation and Traditional Software takes about 20 minutes.",
  },
  system: {
    loadFailure: "Something went wrong loading this. Check your connection and try again.",
    notFound: "We can't find that page. Head home or jump back into the lesson.",
  },
} as const;
