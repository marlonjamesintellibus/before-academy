import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-6: Myths and Misconceptions (docs/content/content-map.md).
 *
 * Consolidation, not new teaching: every claim here was corrected earlier in
 * the pathway, and this section's job is retrieval across all of them. The map
 * marks it lighter on exposition and heavier on activity for that reason, so
 * the lesson is deliberately short and the interaction carries the weight.
 *
 * Covers the full register M1 to M7.
 */
export const aia6Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "myths-and-misconceptions",
    title: "Myths and Misconceptions",
    description:
      "The claims you will hear most often, and the evidence that would settle each one.",
    position: 6,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-6-LESSON-001-HOOK",
      prompt:
        "Someone at work says the new tool is objective, because unlike a person it has no agenda. What is the strongest reply?",
      choices: [
        "Agree: machines have no motives",
        "Disagree: it has hidden motives",
        "Ask where its examples came from",
      ],
      reveal:
        "Ask where its examples came from. Neither agreeing nor disagreeing gets anywhere, because the influence is not a motive. It arrived earlier, in the data.",
    },
    {
      type: "why_it_matters",
      id: "AIA-6-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Most claims about AI are neither true nor false as stated. They are missing the context that would settle them, and the useful move is naming what evidence is absent.",
        },
        {
          type: "p",
          text: "That habit is more durable than a list of corrections, because next year's claims will be different and the question will be the same.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-6-LESSON-001-OBJECTIVES",
      items: [
        "Judge a common claim as accurate, misleading, or dependent on context",
        "Name the evidence that would settle a claim",
        "Explain a common misconception to someone else in plain language",
      ],
    },
    {
      type: "concept",
      id: "AIA-6-LESSON-002",
      title: "Why these beliefs are reasonable",
      quick: [
        {
          type: "p",
          text: "Every belief in this section is held by sensible people for sensible reasons, and dismissing them is the fastest way to lose an audience.",
        },
        {
          type: "p",
          text: "Fluent writing really does signal understanding, in people. Machines really are free of the motives we watch for. Removing effort really does look the same whether rules or learned patterns did it.",
        },
        {
          type: "p",
          text: "Each misconception is a reasonable expectation carried across to a mechanism where it stops holding. Naming the confusion is what makes the correction land.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-6-LESSON-003",
      title: "The claims worth having an answer for",
      quick: [
        {
          type: "p",
          text: "A handful come up repeatedly: that anything impressive is AI, that automation and AI are the same, that these systems reason, that the same question gives the same answer, that you can tell from the interface, that they work alone, and that a machine is neutral.",
        },
        {
          type: "p",
          text: "For each, one question does the work. What would have to be true for this claim to hold, and has anyone shown it?",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 3,
        body: [
          {
            type: "ul",
            items: [
              "It is AI because it is impressive: ask what was learned, and from what data",
              "Automation and AI are the same: ask how work flows, then ask how decisions get made, separately",
              "It reasons: ask what would look different if it were selecting likely continuations instead",
              "It is neutral: ask where the examples came from and who is represented in them",
              "AI will replace this job entirely: ask which of the jobs in that role are checkable and reversible",
            ],
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-6-LESSON-004",
      title: "Being the person who explains it",
      quick: [
        {
          type: "p",
          text: "The clearest sign you have this is being able to explain one of these distinctions to a colleague without using the word AI at all.",
        },
        {
          type: "p",
          text: "Say what the system does, where its behaviour came from, and what a wrong answer would cost. If that is enough for a decision, you never needed the label.",
        },
      ],
    },
    {
      type: "diagram",
      id: "AIA-6-DGM-001",
      title: "From claim to evidence",
      claim:
        "A claim about AI is rarely settled by argument. It is settled by naming the evidence that is missing.",
      altText: "A claim moving through three questions to a judgment.",
      longText:
        "A claim enters at the left. It passes through three questions in order. First, what is the system actually doing, stated as a job rather than a label. Second, where did its behaviour come from, written rules or learned examples. Third, what would a wrong answer cost and who would notice. The claim then exits as one of three judgments: accurate, misleading, or dependent on information nobody has supplied. The final judgment is the most common outcome, and naming it is treated as a skilled answer rather than an evasion.",
      layers: [
        {
          id: "claim",
          label: "The claim as stated",
          description: "Usually a label plus a promise, with the mechanism left out.",
        },
        {
          id: "job",
          label: "What is it doing?",
          description: "Name the job: recognising, predicting, generating, supporting a decision.",
        },
        {
          id: "origin",
          label: "Where did the behaviour come from?",
          description:
            "Written by a person, or derived from examples. This is the question that decides most claims.",
        },
        {
          id: "cost",
          label: "What would a wrong answer cost?",
          description: "And would anyone notice. This decides whether the claim matters.",
        },
        {
          id: "judgment",
          label: "Accurate, misleading, or not yet answerable",
          description:
            "The third outcome is the most common, and saying so is a skilled answer rather than an evasion.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-6-LESSON-004-MISCONCEPTION",
      misconceptionId: "M6",
      claim: "These systems run on their own, so the people are out of the loop.",
      correction:
        "People choose the data, the objective, the thresholds, and what happens to the output. A system running without supervision at the moment you see it was still shaped by decisions people made earlier. The belief is reasonable, because autonomy is how these systems are usually described in public.",
    },
    {
      type: "takeaway",
      id: "AIA-6-LESSON-005-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "You will not remember a list of myths, and you do not need to. You need one move: name the job, ask where the behaviour came from, and ask what being wrong would cost.",
        },
        {
          type: "p",
          text: "That works on claims that have not been made yet, which is the point of learning it rather than memorising corrections.",
        },
      ],
    },
    {
      type: "next_step",
      id: "AIA-6-LESSON-006-NEXT",
      body: "Last in the pathway: what you can now do, and where to take it.",
    },
  ],
  glossary: [],
};
