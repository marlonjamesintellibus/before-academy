/**
 * Interface strings - mirrors docs/product/ux-copy.md (the canonical source).
 * A string that exists in both places with different wording is a defect.
 * Learning copy (lesson, feedback, questions) lives in content records, not here.
 */
export const strings = {
  actions: {
    startLearning: "Start learning - free",
    assessmentFirst: "Already know this? Take the pathway assessment",
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
      "Seven short sections teach you to read what a system really does, judging it on evidence instead of the label on the box. Start in the next minute; go at your own pace.",
    startCtaLabel: "Start the AI Awareness pathway",
    outcomes: [
      {
        title: "Read the mechanism",
        body: "Judge a system by how it works, not by what the marketing around it calls it.",
      },
      {
        title: "Practice on real cases",
        body: "Over forty real scenarios across seven activities, with feedback that names the clue you missed.",
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
      "Seven sections, each 15 to 25 minutes",
      "Every section: lesson, activity, practice, graded questions",
      "Self-paced across visits · Free, no account needed",
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
    /**
     * The seven sections in learner order, exactly as commissioned in
     * docs/content/content-map.md. This is the single source the pathway page
     * and the dashboard render from, so the pages cannot disagree about what
     * the pathway contains.
     */
    sections: [
      {
        position: 1,
        slug: "what-is-artificial-intelligence",
        title: "What Is Artificial Intelligence?",
        description:
          "A definition that holds up, why the term is contested, and why a label is a claim rather than evidence.",
        minutes: "15-20 min",
      },
      {
        position: 2,
        slug: "ai-in-everyday-life",
        title: "AI in Everyday Life",
        description:
          "Where these systems already sit in an ordinary day, most of them nowhere near a chat window.",
        minutes: "15-20 min",
      },
      {
        position: 3,
        slug: "ai-automation-software",
        title: "AI, Automation and Traditional Software",
        description:
          "Learn to tell the three apart, classify familiar systems, and recognize when you don't have enough information to judge.",
        minutes: "About 20 min",
      },
      {
        position: 4,
        slug: "what-ai-can-do",
        title: "What AI Can Do",
        description:
          "The handful of jobs these systems are genuinely good at, and how to recognise which one a task needs.",
        minutes: "15-20 min",
      },
      {
        position: 5,
        slug: "what-ai-cannot-reliably-do",
        title: "What AI Cannot Reliably Do",
        description:
          "The limits that follow from the mechanism, and the use, review, or refuse call on any output.",
        minutes: "20-25 min",
      },
      {
        position: 6,
        slug: "myths-and-misconceptions",
        title: "Myths and Misconceptions",
        description:
          "The claims you will hear most often, and the evidence that would settle each one.",
        minutes: "15-20 min",
      },
      {
        position: 7,
        slug: "where-to-go-next",
        title: "Where to Go Next",
        description: "What you can now do, said plainly, and the directions this opens up.",
        minutes: "10-15 min",
      },
    ],
    pathwayAssessment: {
      title: "The pathway assessment",
      description:
        "Twelve questions drawn across all seven sections, at least one from each. Passing this is what completing AI Awareness means.",
      cta: "Take the pathway assessment",
    },
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
      "You have not started yet. The first section takes about twenty minutes, and there are seven.",
  },
  system: {
    loadFailure: "Something went wrong loading this. Check your connection and try again.",
    notFound: "We can't find that page. Head home or jump back into the lesson.",
  },
} as const;
