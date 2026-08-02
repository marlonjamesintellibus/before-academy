import type { DiagnosticSeed } from "@/features/content/learning-types";

/**
 * Opening diagnostic (P1-DIAG-001, addition A1), transformed from
 * phase1-content/01-core-lessons/opening-diagnostic.md. Feedback is deferred
 * until after the lesson, so no per-item explanations are seeded here.
 */
export const diagnosticSeed: DiagnosticSeed = {
  id: "P1-DIAG-001",
  intro:
    "Before we start - what's your read right now?\n\nFive quick situations. Pick whatever seems right; guessing is welcome, and nothing here counts toward anything. At the end of the section we'll show you how your answers compare - most people are surprised by at least one.",
  items: [
    {
      id: "P1-DIAG-001-S01",
      body: "A spreadsheet formula adds up your monthly expenses.",
      correctCategory: "traditional_software",
      accepted: ["automation"],
    },
    {
      id: "P1-DIAG-001-S02",
      body: "Your email app moves a message into the spam folder.",
      correctCategory: "not_enough_information",
      accepted: [],
    },
    {
      id: "P1-DIAG-001-S03",
      body: "A thermostat turns the heat on whenever the temperature drops below 20°C.",
      correctCategory: "automation",
      accepted: ["traditional_software"],
    },
    {
      id: "P1-DIAG-001-S04",
      body: 'A music app builds you a weekly playlist labelled "made for you."',
      correctCategory: "not_enough_information",
      accepted: [],
    },
    {
      id: "P1-DIAG-001-S05",
      body: 'An ad says a toothbrush is "AI-powered." Does that tell you how it works?',
      correctCategory: "not_enough_information",
      accepted: [],
    },
  ],
};
