import type { CheckSeed } from "@/features/content/activity-types";

/**
 * AIA-1 knowledge check: practice, never graded (docs/product/screens/activity-and-check.md).
 *
 * Four questions, each a decision a real person could face rather than a
 * definition to recite. Feedback names the evidence, not the verdict, per
 * docs/content/feedback.md.
 *
 * Categories are drawn from the existing taxonomy, which was written for the
 * first section. `ai_characteristics` and `misconceptions` are the honest fits
 * for this content; a per-section category set is recorded as follow-up work
 * in the content map rather than invented here.
 */
export const aia1CheckSeed: CheckSeed = {
  id: "AIA-1-CHK-001",
  label: "Practice check",
  intro:
    "Four situations to think through. Nothing here is graded, and the feedback names the clue rather than the answer.",
  questions: [
    {
      id: "AIA-1-CHK-001-Q1",
      stem: "A vendor says their scheduling tool is AI-powered. Which single question would tell you the most about whether that is true?",
      options: [
        {
          text: "How many customers use it?",
          correct: false,
        },
        {
          text: "What did it learn, and from what examples?",
          correct: true,
        },
        {
          text: "Does it have a chat interface?",
          correct: false,
        },
        {
          text: "How long has it been on the market?",
          correct: false,
        },
      ],
      correctFeedback:
        "Correct. Asking what was learned and from what examples goes straight at where the behaviour came from, which is the property that decides the category.",
      incorrectFeedback:
        "Not quite. Popularity, interface and age are all things you can observe without learning anything about the mechanism. The question that cuts through is what the system learned, and from what.",
      chip: { label: "Where the behaviour came from", anchor: "aia-1-lesson-002" },
      category: "ai_characteristics",
      difficulty: "applied",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-1-LO1", "AIA-1-LO5"],
    },
    {
      id: "AIA-1-CHK-001-Q2",
      stem: "A colleague argues that a chess program is not really AI because we now know exactly how it works. What is the most useful response?",
      options: [
        {
          text: "They are right: understood systems stop being AI",
          correct: false,
        },
        {
          text: "The boundary does move like that, which is why the origin of the behaviour is the more stable question",
          correct: true,
        },
        {
          text: "They are wrong: once AI, always AI",
          correct: false,
        },
        {
          text: "It depends entirely on how fast the program is",
          correct: false,
        },
      ],
      correctFeedback:
        "Correct. Your colleague has noticed something real about how the term is used. Naming that, and then moving to where the behaviour came from, keeps the conversation useful.",
      incorrectFeedback:
        "Not quite. The observation is genuine: solved problems do get reclassified as ordinary computing. That is a reason to judge by where behaviour came from rather than to argue about the label.",
      chip: { label: "Why the boundary keeps moving", anchor: "aia-1-lesson-004" },
      category: "misconceptions",
      difficulty: "challenging",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-1-LO3"],
    },
    {
      id: "AIA-1-CHK-001-Q3",
      stem: "An assistant produces a well-written paragraph containing a statistic you cannot place. What does the quality of the writing tell you about the statistic?",
      options: [
        {
          text: "It suggests the statistic was checked",
          correct: false,
        },
        {
          text: "Nothing at all",
          correct: true,
        },
        {
          text: "It suggests the statistic was invented",
          correct: false,
        },
        {
          text: "It depends on the length of the paragraph",
          correct: false,
        },
      ],
      correctFeedback:
        "Correct. Fluency comes from selecting likely continuations. That process runs whether or not the content is true, so the writing quality carries no information about the figure.",
      incorrectFeedback:
        "Not quite. Fluent output is produced by selecting likely continuations, and nothing in that process checks a fact. Good writing is neither evidence for nor against the statistic.",
      chip: { label: "Doing a task is not working like a person", anchor: "aia-1-lesson-005" },
      category: "ai_characteristics",
      difficulty: "applied",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-1-LO4"],
    },
    {
      id: "AIA-1-CHK-001-Q4",
      stem: "Someone describes AI as one technology that is getting steadily better. What is the most accurate correction?",
      options: [
        {
          text: "It is a field of many methods that produce different kinds of output and break down differently",
          correct: true,
        },
        {
          text: "It is one technology, but progress is slower than claimed",
          correct: false,
        },
        {
          text: "It only refers to systems that produce text",
          correct: false,
        },
        {
          text: "It only refers to systems that beat people at a task",
          correct: false,
        },
      ],
      correctFeedback:
        "Correct. Treating it as one thing leads to odd conclusions, such as expecting a fraud check and a drafting assistant to share strengths and weaknesses.",
      incorrectFeedback:
        "Not quite. The useful correction is about scope: it is a field containing many methods, so knowing something is AI tells you little until you know which kind, doing what job.",
      chip: { label: "A field, not a single thing", anchor: "aia-1-lesson-003" },
      category: "misconceptions",
      difficulty: "foundational",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-1-LO2"],
    },
  ],
  completion: {
    body: "That is the reading skill in miniature: name the job, ask where the behaviour came from, and treat the label as a claim rather than evidence.",
  },
};
