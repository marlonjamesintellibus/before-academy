import type { SectionSeed } from "@/features/content/types";

/**
 * AIA-4: What AI Can Do (docs/content/content-map.md).
 *
 * Written as one piece with AIA-5, per the map: the boundary between what these
 * systems do well and what they cannot be relied on for is where beginners get
 * lost, and a seam between two authors would show. Capabilities here are framed
 * as "what kind of job is this?" so the learner leaves with a decision tool
 * rather than a list to memorise.
 */
export const aia4Seed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Build the judgment to tell what a system really does - starting with the difference between AI, automation and traditional software.",
  },
  section: {
    slug: "what-ai-can-do",
    title: "What AI Can Do",
    description:
      "The handful of jobs these systems are genuinely good at, and how to recognise which one a task actually needs.",
    position: 4,
  },
  blocks: [
    {
      type: "hook",
      id: "AIA-4-LESSON-001-HOOK",
      prompt:
        "A colleague says they want to use AI to reduce the time their team spends on customer email. Which part of that work is the best candidate?",
      choices: [
        "Deciding which customers get a refund",
        "Sorting incoming mail into topics",
        "Approving the final reply",
      ],
      reveal:
        "Sorting is the strongest candidate, and the reason is worth more than the answer: it is a job where being occasionally wrong is cheap and correctable. That property, not the technology, is what makes a task suitable.",
    },
    {
      type: "why_it_matters",
      id: "AIA-4-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Most disappointment with these tools comes from pointing them at the wrong job. The system was capable; the task was a poor fit, and nobody checked which kind of work was being asked for.",
        },
        {
          type: "p",
          text: "Recognising the kind of job is a skill you can use in a meeting, without knowing anything about how the system was built.",
        },
      ],
    },
    {
      type: "objectives",
      id: "AIA-4-LESSON-001-OBJECTIVES",
      items: [
        "Name the main jobs these systems do: recognising, sorting, predicting, generating, summarising and supporting a decision",
        "Match a real task to the job it actually needs",
        "Explain why a task's suitability depends on how costly a wrong answer is",
        "Recognise that most products combine several of these jobs at once",
      ],
    },
    {
      type: "concept",
      id: "AIA-4-LESSON-002",
      title: "Recognising and sorting",
      objective: "Recognise the jobs where a wrong answer is cheap and visible.",
      minutes: 5,
      completion: "You can name recognition and sorting when you see them.",
      tone: "rules",
      quick: [
        {
          type: "p",
          text: "The oldest and most reliable job is recognition: deciding what something is. A photo contains a face. A message is spam. A transaction looks unlike your usual spending.",
        },
        {
          type: "p",
          text: "Sorting is recognition applied at scale. Once a system can label one thing, it can label a million, which is where the value usually comes from.",
        },
        {
          type: "p",
          text: "These jobs suit AI well because the answer is checkable. Someone can look at a labelled item and say whether the label was right, and that feedback keeps the system honest.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Recognition is also where the cost of being wrong is usually lowest. A message wrongly sent to a spam folder is an annoyance you can undo. That is not true of every job in this section, which is the thread running through to the next one.",
          },
          {
            type: "ul",
            items: [
              "Marking a photo as containing a dog",
              "Routing a support message to the billing queue",
              "Flagging a transaction as unusual for review",
            ],
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-4-MICRO-001",
      prompt:
        "A hospital considers two uses: flagging scans for a radiologist's attention, or issuing diagnoses directly. Why is the first a better fit?",
      correctOptionId: "reversible",
      options: [
        {
          id: "reversible",
          text: "A wrong flag is cheap and a person still decides",
          feedback:
            "Correct. A missed or extra flag is caught by the radiologist reading the scan. A wrong diagnosis lands on a patient. The job is chosen by the cost of being wrong, not the sophistication of the model.",
        },
        {
          id: "accuracy",
          text: "Flagging is where models are most accurate",
          feedback:
            "Not quite. Accuracy varies by task and data either way. What separates the two uses is what a mistake costs and who catches it.",
        },
        {
          id: "speed",
          text: "Flagging is faster than diagnosing",
          feedback:
            "Not quite. Both are fast. Speed is a benefit of each and the deciding property of neither.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-4-LESSON-003",
      title: "Predicting what comes next",
      objective:
        "Treat every prediction as a likelihood resting on the past resembling the future.",
      minutes: 5,
      completion: "You know what a prediction silently assumes.",
      tone: "flow",
      quick: [
        {
          type: "p",
          text: "Prediction is estimating something that has not happened or is not directly known. Your arrival time. Which customers are likely to leave. How much stock a shop will need.",
        },
        {
          type: "p",
          text: "A prediction is a likelihood, not a fact, and a good one comes with a sense of how confident it is. Treating it as a fact is where most trouble starts.",
        },
        {
          type: "p",
          text: "Prediction suits AI when the past genuinely resembles the future. When conditions change in ways the examples never contained, the estimate quietly stops being useful.",
        },
      ],
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "This assumption has a name in practice: the future is expected to be drawn from the same distribution as the past. When that stops holding, performance degrades without any error appearing, because the system has no way to notice that the world moved.",
          },
          {
            type: "p",
            text: "It is why prediction systems need monitoring rather than one-off approval, and why a model that worked last year is not evidence about this year.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-4-MICRO-002",
      prompt: "A demand model performed well last year. What is that evidence about next quarter?",
      correctOptionId: "conditional",
      options: [
        {
          id: "conditional",
          text: "Useful only while conditions still resemble the past",
          feedback:
            "Correct. The estimate rests on the future being drawn from the same patterns. When the world moves, performance degrades with no error message.",
        },
        {
          id: "strong",
          text: "Strong evidence: models that worked keep working",
          feedback:
            "Not quite. Nothing in the mechanism notices that conditions changed. Last year's performance is evidence about last year's world.",
        },
        {
          id: "none",
          text: "No evidence at all",
          feedback:
            "Too strong the other way. It is real evidence, conditional on the world staying similar, which is exactly why prediction systems need monitoring rather than one-off approval.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-4-LESSON-004",
      title: "Generating and summarising",
      objective:
        "Use generation and summarising where a person reviews and a poor draft costs minutes.",
      minutes: 4,
      completion: "You can say why composed output needs a reader.",
      tone: "pattern",
      quick: [
        {
          type: "p",
          text: "Generating means producing something new: a draft, an image, a suggested reply. Summarising means compressing something long into something short.",
        },
        {
          type: "p",
          text: "Both are genuinely useful and both share one property worth remembering. The output is composed, not retrieved, so it can be well-formed and still wrong about the facts.",
        },
        {
          type: "p",
          text: "These jobs suit AI best where a person reviews the result and the cost of a poor draft is a few minutes, not a bad decision.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Summarising sounds safer than generating because the source material is right there. It is not automatically safer: a summary decides what to leave out, and what gets left out is a judgment the reader cannot see.",
          },
          {
            type: "analogy",
            text: "A colleague who reads a long report and gives you the gist in a minute.",
            boundary:
              "You would still ask what they skipped if the decision mattered, and the same question applies here.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "AIA-4-MICRO-003",
      prompt: "A generated project report is due in an hour. Which part gets checked first?",
      correctOptionId: "specifics",
      options: [
        {
          id: "specifics",
          text: "The names, figures and citations",
          feedback:
            "Correct. Specifics are composed as fluently as everything else and are the costliest to get wrong. Structure and tone can wait; the facts cannot.",
        },
        {
          id: "structure",
          text: "The overall structure",
          feedback:
            "Not quite. Structure is usually sound, and a structural weakness is visible on any read. The dangerous parts are the ones that look right.",
        },
        {
          id: "tone",
          text: "The tone and register",
          feedback:
            "Not quite. Tone problems embarrass; wrong figures mislead. Check in order of harm.",
        },
      ],
    },
    {
      type: "concept",
      id: "AIA-4-LESSON-005",
      title: "Supporting a decision, not making it",
      objective: "Keep the decision with a person and let the system narrow the field.",
      minutes: 4,
      completion: "You can tell decision support from decision making.",
      tone: "compare",
      quick: [
        {
          type: "p",
          text: "The last job is decision support: gathering, ranking or flagging so a person can decide faster. The system narrows the field; the person still chooses.",
        },
        {
          type: "p",
          text: "This framing is the one that survives contact with real work. It keeps accountability with a person, and it turns out to be where most successful uses actually sit.",
        },
        {
          type: "p",
          text: "Most products you meet combine several of these jobs. A support platform sorts, predicts urgency, drafts a reply, and hands the decision to an agent. Naming the jobs separately is how you judge each one.",
        },
      ],
    },
    {
      type: "inline_check",
      id: "AIA-4-MICRO-004",
      prompt: "What keeps decision support defensible in a way full automation is not?",
      correctOptionId: "accountability",
      options: [
        {
          id: "accountability",
          text: "A person still owns the decision",
          feedback:
            "Correct. The system narrows the field; the person chooses and is accountable. That structure survives audits, appeals and mistakes.",
        },
        {
          id: "volume",
          text: "It processes fewer cases",
          feedback:
            "Not quite. Decision support can run at full volume. What changes is who decides, not how much gets processed.",
        },
        {
          id: "cost",
          text: "It is cheaper to run",
          feedback:
            "Not quite. It is often more expensive, because people stay in the loop. The defensibility is what the expense buys.",
        },
      ],
    },
    {
      type: "diagram",
      id: "AIA-4-DGM-001",
      title: "Choosing by the cost of being wrong",
      predict: {
        prompt:
          "Before the diagram: what property do you expect orders these jobs from safe to risky?",
        options: [
          { text: "How technically difficult the job is", correct: false },
          { text: "What a wrong answer costs, and whether anyone would notice", correct: true },
          { text: "How new the underlying technology is", correct: false },
        ],
      },
      claim:
        "Suitability is decided less by the job than by what a wrong answer costs and whether anyone would notice.",
      altText:
        "Jobs arranged from low to high cost of error, with a review step marked where the cost rises.",
      longText:
        "Five jobs are arranged along a line by the cost of a wrong answer. Recognising and sorting sit at the low-cost end, where mistakes are visible and reversible. Summarising and generating sit in the middle, where a person normally reviews the output before it is used. Predicting and decision support sit at the higher-cost end, where a wrong answer can carry into a real decision. A review step is marked at the point where cost rises, showing that human review is the control that makes higher-cost uses workable rather than a formality.",
      layers: [
        {
          id: "sorting",
          label: "Recognising and sorting",
          description:
            "Cheapest to get wrong: the mistake is visible and someone can undo it in seconds.",
        },
        {
          id: "summarising",
          label: "Summarising",
          description:
            "The source is available, so an error can be caught, but only if a person actually looks.",
        },
        {
          id: "generating",
          label: "Generating",
          description: "A poor draft costs minutes. An unreviewed draft that ships costs more.",
        },
        {
          id: "review",
          label: "Human review sits here",
          description:
            "Above this line, someone checks before the output counts. That control is what makes the higher-cost uses workable.",
        },
        {
          id: "deciding",
          label: "Predicting and decision support",
          description:
            "A wrong answer can carry into a real decision about a real person, so the review step is not optional.",
        },
      ],
    },
    {
      type: "misconception",
      id: "AIA-4-LESSON-005-MISCONCEPTION",
      misconceptionId: "M1",
      claim: "If a task is hard for people, it must be a good job for AI.",
      correction:
        "Difficulty for a person and suitability for a system are unrelated. Some jobs people find trivial are poor candidates, and some they find laborious are ideal. The question that decides it is what a wrong answer costs and whether anyone would notice it. This belief is reasonable, because we tend to reach for tools where the work feels heaviest.",
    },
    {
      type: "takeaway",
      id: "AIA-4-LESSON-006-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "There are only a handful of jobs here: recognising, sorting, predicting, generating, summarising, and supporting a decision. Most products combine several.",
        },
        {
          type: "p",
          text: "When someone proposes using AI for something, name the job first, then ask what a wrong answer costs and who would notice. Those two questions do more work than any opinion about the technology.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "AIA-4-LESSON-006-ACT-CTA",
      body: "Try it: Choose the Best Use Case. Five workplace goals, one sound choice each.",
    },
    {
      type: "check_cta",
      id: "AIA-4-LESSON-006-CHECK-CTA",
      body: "Four decisions about what work suits these systems. Nothing is graded.",
    },
    {
      type: "next_step",
      id: "AIA-4-LESSON-007-NEXT",
      body: "Next: the same systems, viewed from the other side. What they cannot be relied on for, and why that follows from how they work.",
    },
  ],
  glossary: [],
};
