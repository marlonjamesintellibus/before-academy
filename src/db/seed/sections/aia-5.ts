import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-5: What AI Cannot Reliably Do (docs/content/content-map.md).
 *
 * The matched pair to AIA-4, written together so the can/cannot boundary holds.
 * Editorial constraint from the map: limits are stated as consequences of the
 * mechanism, never as alarm. The tone target is a competent colleague
 * explaining a tool's failure modes, not a warning label.
 *
 * Carries M7, registered for this section: the belief that a machine is
 * objective because it is a machine.
 */
export const aia5Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "what-ai-cannot-reliably-do",
    title: "What AI Cannot Reliably Do",
    description:
      "The limits that follow from how these systems work, and how to decide whether an output is usable as it stands.",
    position: 5,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-5-LESSON-001-HOOK",
      prompt:
        "An assistant drafts a client summary. It reads well, the tone is right, and it cites a figure you do not recognise. What does the quality of the writing tell you about the figure?",
      choices: ["It is probably right", "It is probably wrong", "Nothing at all"],
      reveal:
        "Nothing at all. Fluency and accuracy are produced by different things here, which is the single most useful idea in this section.",
    },
    {
      type: "why_it_matters",
      id: "AIA-5-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Knowing the limits is not caution for its own sake. It is what lets you use these tools confidently, because you know which outputs to accept and which to check.",
        },
        {
          type: "p",
          text: "Every limit here follows from the mechanism you already met. None of them is a defect someone will patch next year.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-5-LESSON-001-OBJECTIVES",
      items: [
        "Explain why a pattern-based system cannot guarantee an accurate answer",
        "Explain why fluent output is not evidence that the content is true",
        "Describe how bias is inherited from data rather than chosen by the system",
        "Identify situations where a person must review the output",
        "Decide whether an output is usable as it stands, needs review, or should not be used",
      ],
    },
    {
      type: "concept",
      id: "AIA-5-LESSON-002",
      title: "No guarantee of accuracy",
      objective: "Expect likelihoods, and ask how often, how badly, and who would notice.",
      minutes: 5,
      completion: "You can ask the three questions that replace will it be wrong.",
      tone: "rules",
      quick: [
        {
          type: "p",
          text: "A system that derives behaviour from examples answers with a likelihood. Likelihoods are usually right and sometimes wrong, and there is no setting that removes the second half.",
        },
        {
          type: "p",
          text: "This is not a rough edge that better engineering will remove. It is the same property that lets the system handle cases nobody wrote a rule for.",
        },
        {
          type: "p",
          text: "So the useful question is never whether it will be wrong. It is how often, how badly, and who would notice.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Accuracy figures are usually averages over a set of examples. An average hides the cases that matter most: the unusual ones, which are exactly where a system trained on typical cases performs worst.",
          },
          {
            type: "p",
            text: "When someone quotes a high accuracy number, the follow-up worth asking is which cases the misses were, not how large the number is.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-5-MICRO-001",
      prompt: "A vendor's accuracy page shows one large number and nothing else. What is missing?",
      correctOptionId: "misses",
      options: [
        {
          id: "misses",
          text: "Which cases the misses were",
          feedback:
            "Correct. An average hides the unusual cases, and unusual cases are usually the expensive ones. The breakdown is the evidence; the headline is the advertisement.",
        },
        {
          id: "bigger",
          text: "A bigger number",
          feedback:
            "Not quite. A higher average can still hide the same concentrated misses. The size of the number is not the gap.",
        },
        {
          id: "date",
          text: "The date it was measured",
          feedback:
            "Worth knowing, but secondary. A fresh average conceals exactly as much as a stale one.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-5-LESSON-003",
      title: "Fluent is not the same as true",
      objective: "Hold fluency and truth apart, especially when the writing is good.",
      minutes: 5,
      completion: "You can read generated text without being read to.",
      tone: "flow",
      quick: [
        {
          type: "p",
          text: "A system that produces text is selecting likely continuations. Producing a sentence that reads as authoritative does not require the content to be checked against anything.",
        },
        {
          type: "p",
          text: "That is why confident, well-written, wrong output is common. It has a name, hallucination, and it is not a malfunction: it is what likely-continuation looks like when the likely continuation is not true.",
        },
        {
          type: "p",
          text: "In people, fluency is a fair signal of knowing the material. Carrying that expectation across is the most expensive habit to unlearn here.",
        },
      ],
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Specific details are the highest-risk part of any generated passage. Names, dates, figures, citations and quotations are exactly the elements that are cheap to compose and expensive to verify.",
          },
          {
            type: "p",
            text: "A practical habit: read generated text for structure and argument, and check every specific separately against a source you trust.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-5-MICRO-002",
      prompt:
        "An assistant writes a confident paragraph citing a study you cannot find. What happened?",
      correctOptionId: "composed",
      options: [
        {
          id: "composed",
          text: "The citation was composed like everything else",
          feedback:
            "Correct. Selecting likely continuations produces likely-looking citations. Nothing in the mechanism checks that the study exists, which is why specifics get verified separately.",
        },
        {
          id: "lied",
          text: "The system chose to deceive you",
          feedback:
            "Not quite. Choosing requires motives it does not have. The citation is not a lie; it is fluent output doing what fluent output does.",
        },
        {
          id: "rare",
          text: "A rare malfunction occurred",
          feedback:
            "Not quite. Composed specifics are ordinary behaviour, not a breakdown. Treating them as rare is what makes them dangerous.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-5-LESSON-004",
      title: "Bias is inherited, not chosen",
      objective: "Trace bias to the examples rather than to a motive.",
      minutes: 5,
      completion: "You can explain inherited bias without a villain.",
      tone: "pattern",
      quick: [
        {
          type: "p",
          text: "If the examples a system learned from contained a pattern, the system reproduces it. That includes patterns nobody intended and nobody noticed.",
        },
        {
          type: "p",
          text: "Nothing in the mechanism decides that a pattern is unfair. The system has no way to tell a useful regularity from a harmful one; both are patterns in the data and nothing more.",
        },
        {
          type: "p",
          text: "So the absence of a human decision is not the absence of human influence. People chose the data, the objective, and what counted as success.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "This is why the fix is rarely technical alone. Checking who is represented in the examples, and who reviews the outputs, does more than adjusting the system.",
          },
          {
            type: "analogy",
            text: "A recipe learned by watching one kitchen for a year. It will reproduce that kitchen's habits precisely, including the ones nobody would defend if asked.",
            boundary:
              "A kitchen can be asked to explain its habits. A fitted system cannot, which is why the examples have to be examined directly.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-5-MICRO-003",
      prompt:
        "A rota tool trained on past schedules keeps giving the unpopular shifts to the same team. Nobody programmed that. What is the fix most likely to work?",
      correctOptionId: "examples",
      options: [
        {
          id: "examples",
          text: "Examine the examples and what counted as success",
          feedback:
            "Correct. The pattern was learned from past schedules, so the past is where the fix starts. Adjusting the output without touching the examples treats the symptom.",
        },
        {
          id: "motive",
          text: "Find who biased the system",
          feedback:
            "Not quite. There may be no who: past decisions carried the pattern and it was learned along with everything else.",
        },
        {
          id: "retrain",
          text: "Retrain on the same data with more passes",
          feedback:
            "Not quite. More training on the same examples learns the same pattern more confidently.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-5-LESSON-005",
      title: "Deciding what to do with an output",
      objective: "Make the use, review, or refuse call deliberately.",
      minutes: 5,
      completion: "You can route any output by consequence and reversibility.",
      tone: "compare",
      quick: [
        {
          type: "p",
          text: "Everything so far converges on one practical decision. Given an output, you have three options: use it as it stands, review it first, or do not use it here.",
        },
        {
          type: "p",
          text: "Use as it stands suits low-cost, checkable, reversible work. Review first suits anything a person or a decision depends on. Do not use covers work where being wrong causes harm that review cannot catch in time.",
        },
        {
          type: "p",
          text: "Making that call deliberately, rather than by habit, is the whole skill this pathway has been building toward.",
        },
      ],
    },
    {
      type: "inline_check",
      id: "AIA-5-MICRO-004",
      prompt:
        "A colleague asks you to sanity-check a draft before it goes to their manager. Which route is that?",
      correctOptionId: "review",
      options: [
        {
          id: "review",
          text: "Review first: a person depends on the result",
          feedback:
            "Correct. You are the named person checking before the output counts. That is the review route working exactly as designed.",
        },
        {
          id: "use",
          text: "Use as it stands: it is only internal",
          feedback:
            "Not quite. Internal does not mean consequence-free; the manager decision is the consequence. The draft is fine, unreviewed sending is not.",
        },
        {
          id: "refuse",
          text: "Do not use: drafts to managers are too risky",
          feedback:
            "Stricter than the situation needs. Review exists precisely so drafting can be used here.",
        },
      ],
    },
    {
      type: "diagram",
      id: "AIA-5-DGM-001",
      title: "Three things to do with an output",
      predict: {
        prompt: "Before the diagram: what do you expect decides the route for an output?",
        options: [
          { text: "How good the output looks", correct: false },
          { text: "What being wrong costs, and whether it can be undone", correct: true },
          { text: "How advanced the tool is", correct: false },
        ],
      },
      claim:
        "The decision is not whether to trust AI in general, it is what to do with this output, in this situation.",
      altText: "Three routes from an output: use as it stands, review first, or do not use here.",
      longText:
        "An output leads to three routes. The first, use as it stands, applies where the work is low-cost, checkable and reversible, such as a first draft or a suggested category. The second, review first, applies where a person or a decision depends on the result, and a named person checks before it counts. The third, do not use here, applies where being wrong causes harm that review would not catch in time, such as advice in a safety-critical or regulated setting. The routes are decided by consequence and reversibility, not by how impressive the output looks.",
      layers: [
        {
          id: "as-is",
          label: "Use as it stands",
          description:
            "Low cost, checkable, reversible. A draft you will edit anyway, or a suggested label you can correct.",
        },
        {
          id: "review",
          label: "Review first",
          description:
            "Someone or something depends on it. A named person checks before the output counts.",
        },
        {
          id: "do-not",
          label: "Do not use here",
          description:
            "Being wrong causes harm that review would not catch in time. The right answer is a different approach.",
        },
        {
          id: "basis",
          label: "Decided by consequence",
          description:
            "The route follows from what a wrong answer costs and whether it can be undone, not from how good the output looks.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-5-LESSON-005-MISCONCEPTION",
      misconceptionId: "M7",
      claim: "A machine has no opinions, so its answers must be neutral.",
      correction:
        "Neutrality would require the examples to be neutral, and they are records of a world that is not. The system reproduces what its data contained, so no human deciding in the moment is not the same as no human influence. This belief is reasonable, because machines really are free of the motives we watch for in people; the influence arrived earlier, in the data and the choices around it.",
    },
    {
      type: "takeaway",
      id: "AIA-5-LESSON-006-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "None of these limits is a defect awaiting a patch. Each one follows from behaviour derived from examples, which is the same property that makes these systems useful.",
        },
        {
          type: "p",
          text: "Knowing them is what lets you use the tools with confidence: you know which outputs to accept, which to check, and which jobs to keep away from them entirely.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "AIA-5-LESSON-006-ACT-CTA",
      body: "Try it: Would You Trust This? Five outputs, three routes.",
    },
    {
      type: "check_cta",
      id: "AIA-5-LESSON-006-CHECK-CTA",
      body: "Four judgments about outputs you cannot fully verify. Nothing is graded.",
    },
    {
      type: "next_step",
      id: "AIA-5-LESSON-007-NEXT",
      body: "Next: the claims about AI you will hear most often, and what evidence would settle each one.",
    },
  ],
  glossary: [],
};
