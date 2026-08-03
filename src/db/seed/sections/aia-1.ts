import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-1: What Is Artificial Intelligence? (docs/content/content-map.md)
 *
 * First in learner order and first in the approved build order, because every
 * later section quotes its definition. Written against the lesson template in
 * docs/content/lessons/README.md and the layer budgets in learning-framework.md.
 *
 * Definitions here are quoted from canonical records, not restated: the record
 * for `artificial-intelligence` is the source, and content-lint holds the
 * glossary to it.
 */
export const aia1Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "what-is-artificial-intelligence",
    title: "What Is Artificial Intelligence?",
    description:
      "A beginner definition that holds up, why the term is genuinely contested, and why a product's label tells you nothing about what is inside it.",
    position: 1,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-1-LESSON-001-HOOK",
      prompt:
        "Three products describe themselves as AI-powered: a thermostat, a spell-checker, and a photo app that recognises faces. How many of them are using AI?",
      choices: ["All three", "Two of them", "There is no way to tell from that sentence"],
      reveal:
        "The third answer is the skilled one. A product's description tells you what its marketing team chose to write. By the end of this section you will know which question to ask instead.",
    },
    {
      type: "why_it_matters",
      id: "AIA-1-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "You are already making decisions about AI. Which tools your team adopts, which outputs you double-check, which claims in a vendor pitch you believe. Those decisions get made whether or not anyone has defined the word.",
        },
        {
          type: "p",
          text: "A definition you can actually apply changes those decisions. Not a dictionary sentence to recite, but a question you can ask about any system in front of you, and get a useful answer.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-1-LESSON-001-OBJECTIVES",
      items: [
        "Say what AI is in one plain sentence, without using the word intelligent",
        "Explain why AI is a whole field rather than one technology",
        "Explain why informed people still disagree about where the boundary sits",
        "Tell the difference between doing a task well and working the way a person does",
        "Treat a product's label as a claim to check, not as evidence",
      ],
    },
    {
      type: "concept",
      id: "AIA-1-LESSON-002",
      title: "Where the behaviour came from",
      quick: [
        {
          type: "p",
          text: "The most useful definition of artificial intelligence is not about what a system does. It is about where its behaviour came from.",
        },
        {
          type: "p",
          text: "In most software, a person wrote the instructions: if this happens, do that. In an AI system, the behaviour was worked out from examples instead. Nobody wrote the rule for what a cat looks like; the system was shown many pictures and derived it.",
        },
        {
          type: "p",
          text: "That single difference explains nearly everything else you will meet: why these systems handle situations nobody anticipated, why they vary, and why they need checking.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Defining AI by capability is tempting and ages badly. Playing chess was the definition of machine intelligence for decades. Once a machine did it, chess stopped counting. Route-finding, speech transcription and handwriting recognition all made the same journey from impressive to ordinary.",
          },
          {
            type: "p",
            text: "Defining it by origin does not age the same way. Asking where the behaviour came from gives you a stable answer about a system built in 1990 or next year.",
          },
          {
            type: "analogy",
            text: "Two cooks produce the same dish. One follows a written recipe exactly. The other learned by watching hundreds of services and adjusts as they go.",
            boundary:
              "The plates can look identical, which is the point: you are asking how the cooking was learned, not how the dish tastes.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "In technical terms, traditional programs encode a function a person specified. A machine learning system fits a function to data, so its behaviour is a consequence of the examples it was given and the objective it was tuned against.",
          },
          {
            type: "p",
            text: "This is why data problems become behaviour problems. If the examples over-represent one kind of case, the fitted behaviour will too, and no line of code will show you where that happened.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-1-LESSON-003",
      title: "A field, not a single thing",
      quick: [
        {
          type: "p",
          text: "AI is not one technology. It is a field containing many, in the way that medicine contains surgery, pharmacology and physiotherapy.",
        },
        {
          type: "p",
          text: "A system that recommends films, one that transcribes speech and one that drafts an email may share almost nothing beyond that shared origin. They were built with different methods and break down in different ways.",
        },
        {
          type: "p",
          text: "This matters practically: knowing something is AI tells you very little on its own. The useful question is always which kind, doing what job.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Machine learning is currently the dominant approach, and generative AI is the branch most people have met. Neither is the whole field, and treating one as the definition of AI leads to odd conclusions, such as assuming every AI system produces text.",
          },
          {
            type: "ul",
            items: [
              "A fraud check that scores transactions produces a number, not prose",
              "A recommendation system produces an ordering",
              "A transcription system produces text, but composes none of it",
            ],
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-1-LESSON-004",
      title: "Why the boundary keeps moving",
      quick: [
        {
          type: "p",
          text: "Informed people disagree about what counts as AI, and that disagreement is not confusion. It is a term that has been stretched by three forces at once.",
        },
        {
          type: "p",
          text: "Research keeps redrawing the line as methods mature. Marketing pulls the label onto anything that would benefit from it. And ordinary language uses AI to mean whatever feels advanced this year.",
        },
        {
          type: "p",
          text: "So when someone calls a system AI, you have learned something about the speaker and very little about the system.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "There is a name for the research pattern: as soon as a problem is solved, it tends to get reclassified as ordinary computing. Optical character recognition was artificial intelligence; now it is a feature in your scanner.",
          },
          {
            type: "p",
            text: "The practical response is not to argue about the word. It is to ask what the system does and where that behaviour came from, and let the label fall where it may.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "AIA-1-LESSON-005",
      title: "Doing a task is not working like a person",
      quick: [
        {
          type: "p",
          text: "A system can do a job a person does without going about it the way a person would. A calculator has out-performed people at arithmetic for fifty years and nobody claims it reasons.",
        },
        {
          type: "p",
          text: "Modern systems produce fluent sentences, which makes this much harder to hold onto. Fluency is the strongest illusion in the field, because in people it is a reliable sign of comprehension and here it is not.",
        },
        {
          type: "p",
          text: "Keeping these apart is what stops you from over-trusting a confident answer, and it is the habit the rest of this pathway builds on.",
        },
      ],
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "A language system selects likely continuations given everything before them. Producing a sentence that reads as reasoning does not require the steps of reasoning to have occurred, which is why an answer can be well-formed and wrong at the same time.",
          },
          {
            type: "p",
            text: "You will meet this again as hallucination: output that is confident, fluent, and false. It is not a malfunction. It is what selecting a likely continuation looks like when the likely continuation is not true.",
          },
        ],
      },
    },
    {
      type: "diagram",
      id: "AIA-1-DGM-001",
      title: "Two ways a system gets its behaviour",
      claim:
        "The difference that matters is not what the system does, it is whether a person wrote the behaviour or the system derived it from examples.",
      altText:
        "Two paths leading to the same output: one from written rules, one from examples and a learned pattern.",
      longText:
        "Two routes are shown side by side. On the left, a person writes rules, the rules go into a program, and the program produces an output. On the right, examples are collected, a pattern is derived from them, and that pattern produces an output. Both routes end at an output that can look identical from outside, which is why the origin of the behaviour, not the appearance of the result, is what tells the two apart.",
      layers: [
        {
          id: "authored",
          label: "A person writes rules",
          description:
            "Someone states the conditions and the consequences. Behaviour changes only when a person edits them.",
        },
        {
          id: "program",
          label: "The program follows them",
          description:
            "The same input produces the same output, however intricate the rules become.",
        },
        {
          id: "examples",
          label: "Examples are collected",
          description:
            "Many cases of the thing to be recognised, predicted or produced, with no rule written for any of them.",
        },
        {
          id: "pattern",
          label: "A pattern is derived",
          description:
            "The system works out what the examples have in common, which lets it handle cases it was never shown.",
        },
        {
          id: "output",
          label: "An output either way",
          description:
            "From outside the two can look the same, so the appearance of the result is not evidence of how it was produced.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-1-LESSON-005-MISCONCEPTION",
      misconceptionId: "M3",
      claim: "If it answers me in sentences, something in there understands me.",
      correction:
        "Fluency is produced by selecting likely continuations, and that process runs whether or not the content is true or the request was understood. This belief is reasonable, because in people fluent speech really is a sign of comprehension. It is the transfer of that reasonable expectation onto a different mechanism that misleads.",
    },
    {
      type: "takeaway",
      id: "AIA-1-LESSON-006-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "AI is not one technology and not a claim on a box. It is a family of systems whose behaviour was derived from examples rather than written down by a person.",
        },
        {
          type: "p",
          text: "One question carries you through the rest of this pathway: what patterns would this system have learned, from what data, to do this job? If a description cannot support that question, you have not yet been told what the system is.",
        },
      ],
    },
    {
      type: "check_cta",
      id: "AIA-1-LESSON-006-CHECK-CTA",
      body: "Four quick situations to think through. Nothing is graded.",
    },
    {
      type: "next_step",
      id: "AIA-1-LESSON-007-NEXT",
      body: "Next in the pathway: where AI already sits in an ordinary day, most of it nowhere near a chat window.",
    },
  ],
  glossary: [],
};
