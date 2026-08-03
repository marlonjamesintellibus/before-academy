import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-7: Where to Go Next (docs/content/content-map.md).
 *
 * Written last because it summarizes the others. The map flags this as the
 * section most at risk of promising unbuilt content, so it describes the later
 * competency levels by what a learner would be able to do, without naming
 * dates, courses, or features that do not exist.
 */
export const aia7Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "where-to-go-next",
    title: "Where to Go Next",
    description: "What you can now do, said plainly, and the directions this opens up.",
    position: 7,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-7-LESSON-001-HOOK",
      prompt:
        "Think of one system you used today. Could you now say what job it does, and where its behaviour came from?",
      choices: ["Yes, for most of them", "For some, not all", "Not yet"],
      reveal:
        "Any of those is a fair answer. The skill is a habit rather than a fact, and habits take a few passes. The two-minute reviews exist for exactly that.",
    },
    {
      type: "why_it_matters",
      id: "AIA-7-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "It is worth being precise about what this pathway did and did not give you, because knowing the edge of your own knowledge is part of the skill it was teaching.",
        },
        {
          type: "p",
          text: "You can now read systems. You cannot yet build them, evaluate them technically, or judge whether a particular tool is safe for a particular regulated use. Those are different competencies, and each has its own path.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-7-LESSON-001-OBJECTIVES",
      items: [
        "Summarise what AI Awareness covered in your own words",
        "Judge which direction is worth your time next",
        "Describe what the deeper and role-focused directions lead to",
      ],
    },
    {
      type: "concept",
      id: "AIA-7-LESSON-002",
      title: "What you can now do",
      quick: [
        {
          type: "p",
          text: "You can define these systems by where their behaviour came from rather than by what they do, which is a definition that will still work in five years.",
        },
        {
          type: "p",
          text: "You can tell written rules, ordinary automation and learned patterns apart, and you can name which layer is doing the work in a product that combines them.",
        },
        {
          type: "p",
          text: "You can decide what to do with an output: use it, review it, or keep it away from this job. And you can say when there is not enough information to judge, which is the answer people most often avoid giving.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-7-LESSON-003",
      title: "The directions from here",
      quick: [
        {
          type: "p",
          text: "One direction goes deeper into the vocabulary: models, training, prompts, tokens, and why outputs vary. It suits anyone who wants to follow a technical conversation without being lost.",
        },
        {
          type: "p",
          text: "Another goes toward responsible use: handling sensitive information, recognising when review is required, and the judgment calls that come with using these tools at work.",
        },
        {
          type: "p",
          text: "A third goes toward practice: writing better instructions, judging outputs, and building repeatable ways of working. Beyond those sit the role-focused paths for people who design, build, or run these systems.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "You do not have to take these in order. Each one starts where it starts, and the only real prerequisite is the reading skill you have just built.",
          },
          {
            type: "p",
            text: "If you are choosing, pick by the decision you most often face. People who evaluate tools benefit most from responsible use; people who use them daily benefit most from practice.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-7-LESSON-004",
      title: "Keeping it",
      quick: [
        {
          type: "p",
          text: "A skill you never use fades, and this one is used by noticing rather than by studying.",
        },
        {
          type: "p",
          text: "The habit worth keeping is small: when you meet a system doing something impressive, ask what it would have learned, from what data, to do that job.",
        },
        {
          type: "p",
          text: "Come back for a two-minute review in a few days. Retrieval is what makes this stick, far more than rereading would.",
        },
      ],
    },
    {
      type: "diagram",
      id: "AIA-7-DGM-001",
      title: "Where this sits",
      claim:
        "Awareness is the reading skill everything else is built on, and each direction from here answers a different question.",
      altText: "Awareness at the base, with three directions leading from it.",
      longText:
        "AI Awareness sits at the base as the reading skill: what is this system, and where did its behaviour come from. Three directions lead from it. The first, deeper vocabulary, answers how these systems work in more detail. The second, responsible use, answers what may safely be done with them at work. The third, practical application, answers how to get reliable results from them day to day. Beyond those sit role-focused paths for designing, building and running these systems. The directions are not sequential, and each begins from the reading skill rather than from each other.",
      layers: [
        {
          id: "awareness",
          label: "Awareness: what is this?",
          description: "The reading skill you now have. Everything else assumes it.",
        },
        {
          id: "literacy",
          label: "Deeper vocabulary: how does it work?",
          description: "Models, training, prompts, and why outputs vary.",
        },
        {
          id: "responsible",
          label: "Responsible use: what may I do with it?",
          description:
            "Sensitive information, when review is required, where not to use it at all.",
        },
        {
          id: "practical",
          label: "Practice: how do I get good results?",
          description: "Better instructions, judging outputs, repeatable ways of working.",
        },
        {
          id: "roles",
          label: "Role-focused paths",
          description: "For people who design, build or run these systems rather than use them.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-7-LESSON-004-MISCONCEPTION",
      misconceptionId: "M3",
      claim: "Now that I understand the basics, I can judge whether any AI tool is trustworthy.",
      correction:
        "Reading a system is not the same as evaluating one. Judging a specific tool for a specific job needs evidence about its data, its accuracy on cases like yours, and what happens when it is wrong. What you have is the ability to ask for that evidence and to notice when it is missing, which is where every serious evaluation starts.",
    },
    {
      type: "takeaway",
      id: "AIA-7-LESSON-005-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "You came in able to recognise the word. You leave able to read the system: what job it does, where its behaviour came from, and what being wrong would cost.",
        },
        {
          type: "p",
          text: "That is the whole of AI Awareness, and it is the foundation every direction from here builds on.",
        },
      ],
    },
    {
      type: "next_step",
      id: "AIA-7-LESSON-006-NEXT",
      body: "Take a two-minute review in a few days, and pick the direction that matches the decisions you actually face.",
    },
  ],
  glossary: [],
};
