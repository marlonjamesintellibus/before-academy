import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-2: AI in Everyday Life (docs/content/content-map.md).
 *
 * The most example-heavy section, where recognition does the teaching. Written
 * after AIA-4 and AIA-5 per the build order, because the examples land harder
 * once a learner can name the job each system is doing.
 *
 * The map flags this section as dependent on the document audit: the generic
 * examples below are what make it a competent explainer, and swapping in real
 * company work is what would make it an authority asset.
 */
export const aia2Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "ai-in-everyday-life",
    title: "AI in Everyday Life",
    description:
      "Where these systems already sit in an ordinary day, most of them nowhere near a chat window.",
    position: 2,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-2-LESSON-001-HOOK",
      prompt:
        "Between waking up and arriving at work, roughly how many systems of this kind has an average person already used?",
      choices: ["None unless they opened a chat assistant", "Two or three", "More than ten"],
      reveal:
        "More than ten is closest, and almost none of them announced themselves. The visible ones are the exception, which is exactly why judging by appearance does not work.",
    },
    {
      type: "why_it_matters",
      id: "AIA-2-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "People tend to picture a chat window. That picture makes most of the real thing invisible, and invisible systems are the ones making decisions about you without your noticing.",
        },
        {
          type: "p",
          text: "Recognising where these systems already sit is what turns this from a topic you read about into something you can see in your own day.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-2-LESSON-001-OBJECTIVES",
      items: [
        "Identify these systems in at least six everyday situations",
        "Say in one sentence what each one is doing",
        "Explain why most of them are invisible rather than conversational",
        "Tell the difference between a product that uses AI and a product that is AI",
      ],
    },
    {
      type: "concept",
      id: "AIA-2-LESSON-002",
      title: "The invisible majority",
      quick: [
        {
          type: "p",
          text: "Search results, the order of a feed, spam filtering, fraud alerts, route timings, photo grouping, autocorrect. None of these announce themselves, and all of them work the way you have now learned to recognise.",
        },
        {
          type: "p",
          text: "They are invisible because they sit inside a product doing a job, rather than being the product. Nobody markets a spam filter.",
        },
        {
          type: "p",
          text: "The visible ones, the assistants you type at, are a small and recent slice. Treating that slice as the whole subject is the most common mistake here.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "A useful habit is to name the job rather than the product. The map application is not doing one thing: the roads are rules, the live traffic is automation, and the arrival estimate is a learned prediction.",
          },
          {
            type: "ul",
            items: [
              "A bank alert: recognition applied to your spending pattern",
              "A photo app album: recognition, grouped",
              "A shop's front page: a ranking chosen for you",
            ],
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-2-LESSON-003",
      title: "Uses AI, or is AI",
      quick: [
        {
          type: "p",
          text: "Almost every product you meet uses one of these systems for part of its work while rules, automation and people do the rest.",
        },
        {
          type: "p",
          text: "Very few products are AI in any whole sense. Asking whether a product is AI usually produces an argument; asking which part of it learned its behaviour produces an answer.",
        },
        {
          type: "p",
          text: "This is the same reading skill from earlier in the pathway, applied to things you already own.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "analogy",
            text: "A car with cruise control and lane assist. Two components do something clever; the rest is a car.",
            boundary:
              "Nobody calls it an AI car, and yet the same product would be marketed that way in software.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-2-LESSON-004",
      title: "Why you cannot judge from the surface",
      quick: [
        {
          type: "p",
          text: "Two chat interfaces can look identical while one follows a decision tree someone wrote and the other generates each reply.",
        },
        {
          type: "p",
          text: "The interface is designed. It shows you what the designer chose to show, and it is not evidence about the mechanism underneath.",
        },
        {
          type: "p",
          text: "When the surface does not settle it, saying that there is not enough information is the accurate answer, not a shrug.",
        },
      ],
    },
    {
      type: "diagram",
      id: "AIA-2-DGM-001",
      title: "An ordinary morning",
      claim:
        "Most of these systems are working before anyone opens something labelled AI, and none of them look like it.",
      altText: "A morning timeline with the systems working at each step named.",
      longText:
        "A timeline runs through an ordinary morning. On waking, a phone shows notifications that have been ordered and filtered. Over breakfast, a news or social feed is ranked. A card payment for coffee is checked against a spending pattern in the background. On the commute, a route is planned and an arrival time is estimated from traffic patterns. At the desk, mail is sorted into spam and priority, and a typed message is autocorrected. Only at the end of the sequence does anything appear that a person would describe as AI. Each step names the job being done: ordering, ranking, checking, estimating, sorting, correcting.",
      layers: [
        {
          id: "wake",
          label: "Notifications ordered",
          description: "Which messages surface first is a ranking, decided for you.",
        },
        {
          id: "feed",
          label: "A feed ranked",
          description: "Not chronological. An ordering learned from what people engage with.",
        },
        {
          id: "payment",
          label: "A payment checked",
          description:
            "Your spending pattern compared against this transaction, in the background.",
        },
        {
          id: "commute",
          label: "An arrival time estimated",
          description: "Rules find the roads; a learned prediction estimates when you arrive.",
        },
        {
          id: "desk",
          label: "Mail sorted, typing corrected",
          description: "Recognition twice over, and neither announces itself.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-2-LESSON-004-MISCONCEPTION",
      misconceptionId: "M5",
      claim: "I would know if I were using AI.",
      correction:
        "Most of it is a component inside a product doing an ordinary job, with no label and no distinctive appearance. The belief is reasonable, because the examples that get discussed are the visible ones. The visible ones are the exception.",
    },
    {
      type: "takeaway",
      id: "AIA-2-LESSON-005-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "These systems are ordinary and already everywhere, mostly doing quiet jobs inside products that do not mention them.",
        },
        {
          type: "p",
          text: "Name the job, not the product. Once you are asking which part of something learned its behaviour, you are reading systems the way the rest of this pathway asks you to.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "AIA-2-LESSON-005-ACT-CTA",
      body: "Try it: A Day With AI. Six moments from one ordinary morning.",
    },
    {
      type: "check_cta",
      id: "AIA-2-LESSON-005-CHECK-CTA",
      body: "Four everyday situations to think through. Nothing is graded.",
    },
    {
      type: "next_step",
      id: "AIA-2-LESSON-006-NEXT",
      body: "Next: the difference between these systems, ordinary automation, and software that follows written rules.",
    },
  ],
  glossary: [],
};
