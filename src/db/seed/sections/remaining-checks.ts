import type { CheckSeed } from "@/features/content/activity-types";

/**
 * Knowledge checks for AIA-2, AIA-4, AIA-5, AIA-6 and AIA-7.
 *
 * Grouped in one file because each is four short questions and they were
 * authored as a set, so keeping them together makes the pathway's retrieval
 * load reviewable in a single read. AIA-1's check has its own file because it
 * was written first, as the pattern the rest follow.
 *
 * Every question is a decision rather than a definition to recite, and the
 * feedback names the evidence rather than the verdict (docs/content/feedback.md).
 * Categories reuse the first section's taxonomy, which is an honest fit but not
 * a perfect one; per-section categories are recorded as follow-up in the
 * content map.
 */
export const aia2CheckSeed: CheckSeed = {
  id: "AIA-2-CHK-001",
  label: "Practice check",
  intro: "Four everyday situations. Nothing here is graded.",
  questions: [
    {
      id: "AIA-2-CHK-001-Q1",
      stem: "Your phone shows notifications in an order you did not choose. What job is being done?",
      options: [
        { text: "A ranking, decided for you", correct: true },
        { text: "Nothing: notifications arrive in time order", correct: false },
        { text: "A generated summary of your messages", correct: false },
        { text: "A scheduled task with no decisions in it", correct: false },
      ],
      correctFeedback:
        "Correct. Deciding what surfaces first is an ordering, and orderings of this kind are learned from what people engage with.",
      incorrectFeedback:
        "Not quite. Something decided which of these you see first, and that decision is a ranking rather than a summary or a schedule.",
      chip: { label: "The invisible majority", anchor: "aia-2-lesson-002" },
      category: "classification",
      difficulty: "foundational",
      misconceptionTags: ["M5"],
      learningOutcomes: ["AIA-2-LO1", "AIA-2-LO2"],
    },
    {
      id: "AIA-2-CHK-001-Q2",
      stem: "A navigation app finds a route and estimates your arrival time. Which part of that is a learned prediction?",
      options: [
        { text: "Finding the roads", correct: false },
        { text: "The arrival estimate", correct: true },
        { text: "Both equally", correct: false },
        { text: "Neither: it is all map data", correct: false },
      ],
      correctFeedback:
        "Correct. The roads are rules someone recorded. The arrival time is a likelihood built from traffic patterns, which is why it keeps changing.",
      incorrectFeedback:
        "Not quite. Map geometry is recorded, not learned. The estimate that shifts as conditions change is the part built from patterns.",
      chip: { label: "Uses AI, or is AI", anchor: "aia-2-lesson-003" },
      category: "combined_systems",
      difficulty: "applied",
      misconceptionTags: ["M6"],
      learningOutcomes: ["AIA-2-LO4"],
    },
    {
      id: "AIA-2-CHK-001-Q3",
      stem: "Two support chat windows look identical. One follows a decision tree, the other generates each reply. What can you conclude from the interface?",
      options: [
        { text: "The one with better writing is generating", correct: false },
        { text: "Nothing: the interface is designed, not evidence", correct: true },
        { text: "Both must be generating, given they are chat", correct: false },
        { text: "Neither is AI, since both are chat windows", correct: false },
      ],
      correctFeedback:
        "Correct. What you see was chosen by a designer, and it carries no information about the mechanism underneath.",
      incorrectFeedback:
        "Not quite. The surface is a design decision. When it does not settle the question, saying there is not enough information is the accurate answer.",
      chip: { label: "Why you cannot judge from the surface", anchor: "aia-2-lesson-004" },
      category: "ambiguity",
      difficulty: "challenging",
      misconceptionTags: ["M5"],
      learningOutcomes: ["AIA-2-LO3"],
    },
    {
      id: "AIA-2-CHK-001-Q4",
      stem: "Someone says they have never used AI because they have never opened a chat assistant. What is the most useful correction?",
      options: [
        { text: "They are right, if they avoid those tools", correct: false },
        {
          text: "Most of it sits inside ordinary products doing quiet jobs, unannounced",
          correct: true,
        },
        { text: "Only people in technical roles use it", correct: false },
        { text: "It depends on which phone they own", correct: false },
      ],
      correctFeedback:
        "Correct. Spam filtering, card checks, ranking and autocorrect all work this way and none of them announce themselves.",
      incorrectFeedback:
        "Not quite. The visible assistants are a small slice. The rest is a component inside a product doing a job, with no label on it.",
      chip: { label: "The invisible majority", anchor: "aia-2-lesson-002" },
      category: "misconceptions",
      difficulty: "foundational",
      misconceptionTags: ["M5"],
      learningOutcomes: ["AIA-2-LO1", "AIA-2-LO3"],
    },
  ],
  completion: {
    body: "Naming the job rather than the product is the move that carries over to anything you meet next.",
  },
};

export const aia4CheckSeed: CheckSeed = {
  id: "AIA-4-CHK-001",
  label: "Practice check",
  intro: "Four decisions about what work suits these systems. Nothing here is graded.",
  questions: [
    {
      id: "AIA-4-CHK-001-Q1",
      stem: "Which property most decides whether a task is a good candidate?",
      options: [
        { text: "How difficult people find it", correct: false },
        { text: "What a wrong answer costs, and whether anyone would notice", correct: true },
        { text: "How much data the company already holds", correct: false },
        { text: "Whether the output is text", correct: false },
      ],
      correctFeedback:
        "Correct. Cost and visibility of an error decide suitability more than the technology or the difficulty of the work.",
      incorrectFeedback:
        "Not quite. Difficulty for a person and suitability for a system are unrelated. The deciding question is what being wrong costs and who would catch it.",
      chip: { label: "Choosing by the cost of being wrong", anchor: "aia-4-dgm-001" },
      category: "ai_characteristics",
      difficulty: "applied",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-4-LO3"],
    },
    {
      id: "AIA-4-CHK-001-Q2",
      stem: "A team wants to estimate which customers are likely to cancel next quarter. Which job is that?",
      options: [
        { text: "Recognising", correct: false },
        { text: "Predicting", correct: true },
        { text: "Generating", correct: false },
        { text: "Summarising", correct: false },
      ],
      correctFeedback:
        "Correct. It estimates something that has not happened, which makes it a likelihood rather than a fact.",
      incorrectFeedback:
        "Not quite. Nothing is being labelled, composed or compressed here. Something that has not happened is being estimated.",
      chip: { label: "Predicting what comes next", anchor: "aia-4-lesson-003" },
      category: "classification",
      difficulty: "foundational",
      misconceptionTags: ["M4"],
      learningOutcomes: ["AIA-4-LO1", "AIA-4-LO2"],
    },
    {
      id: "AIA-4-CHK-001-Q3",
      stem: "Why is summarising not automatically safer than generating?",
      options: [
        { text: "It is safer: the source is available", correct: false },
        {
          text: "A summary decides what to leave out, and the reader cannot see that",
          correct: true,
        },
        { text: "Summaries are always longer than the source", correct: false },
        { text: "It is the same job under a different name", correct: false },
      ],
      correctFeedback:
        "Correct. What was omitted is a judgment, and it is invisible to anyone reading only the summary.",
      incorrectFeedback:
        "Not quite. Having the source available helps only if someone checks it. The omissions are the part nobody sees.",
      chip: { label: "Generating and summarising", anchor: "aia-4-lesson-004" },
      category: "misconceptions",
      difficulty: "challenging",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-4-LO3"],
    },
    {
      id: "AIA-4-CHK-001-Q4",
      stem: "A support platform sorts messages, estimates urgency, drafts a reply and hands it to an agent. How is that best described?",
      options: [
        { text: "One AI system doing four things", correct: false },
        { text: "Several jobs combined, only some of them learned", correct: true },
        { text: "Automation with no learned component", correct: false },
        { text: "Not enough information to say", correct: false },
      ],
      correctFeedback:
        "Correct. Naming the jobs separately is what lets you judge each one, and the agent is a decision point rather than a step.",
      incorrectFeedback:
        "Not quite. The description names distinct jobs, and treating them as one thing hides which part you would need to check.",
      chip: { label: "Supporting a decision, not making it", anchor: "aia-4-lesson-005" },
      category: "combined_systems",
      difficulty: "applied",
      misconceptionTags: ["M6"],
      learningOutcomes: ["AIA-4-LO4"],
    },
  ],
  completion: {
    body: "Name the job, then ask what a wrong answer costs. Those two questions do more than any opinion about the technology.",
  },
};

export const aia5CheckSeed: CheckSeed = {
  id: "AIA-5-CHK-001",
  label: "Practice check",
  intro: "Four judgments about outputs you cannot fully verify. Nothing here is graded.",
  questions: [
    {
      id: "AIA-5-CHK-001-Q1",
      stem: "A vendor quotes 97% accuracy. What is the most useful follow-up?",
      options: [
        { text: "Whether the figure can be raised", correct: false },
        { text: "Which cases the misses were", correct: true },
        { text: "How many customers they have", correct: false },
        { text: "How recent the figure is", correct: false },
      ],
      correctFeedback:
        "Correct. An average hides the unusual cases, which are exactly where a system trained on typical cases performs worst.",
      incorrectFeedback:
        "Not quite. A high average can coexist with consistent misses on the cases that matter most to you. Ask which ones they were.",
      chip: { label: "No guarantee of accuracy", anchor: "aia-5-lesson-002" },
      category: "ai_characteristics",
      difficulty: "challenging",
      misconceptionTags: ["M4"],
      learningOutcomes: ["AIA-5-LO1"],
    },
    {
      id: "AIA-5-CHK-001-Q2",
      stem: "Which part of a generated passage carries the most risk?",
      options: [
        { text: "The overall structure", correct: false },
        { text: "Specific names, dates, figures and citations", correct: true },
        { text: "The tone", correct: false },
        { text: "The length", correct: false },
      ],
      correctFeedback:
        "Correct. Specifics are cheap to compose and expensive to verify, which is exactly the wrong combination.",
      incorrectFeedback:
        "Not quite. Structure and tone are usually sound. It is the specifics that are composed as readily as everything else and are rarely checked.",
      chip: { label: "Fluent is not the same as true", anchor: "aia-5-lesson-003" },
      category: "ai_characteristics",
      difficulty: "applied",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-5-LO2"],
    },
    {
      id: "AIA-5-CHK-001-Q3",
      stem: "A hiring tool favours candidates from certain universities. Nobody programmed that. How did it happen?",
      options: [
        { text: "Someone hid a rule in the code", correct: false },
        { text: "The pattern was in the examples it learned from", correct: true },
        { text: "The system formed a preference of its own", correct: false },
        { text: "It is random variation", correct: false },
      ],
      correctFeedback:
        "Correct. The system reproduces patterns its examples contained, and nothing in the mechanism marks a pattern as unfair.",
      incorrectFeedback:
        "Not quite. No rule was written and no preference was formed. Past hiring decisions carried the pattern, and it was learned along with everything else.",
      chip: { label: "Bias is inherited, not chosen", anchor: "aia-5-lesson-004" },
      category: "misconceptions",
      difficulty: "applied",
      misconceptionTags: ["M7"],
      learningOutcomes: ["AIA-5-LO3"],
    },
    {
      id: "AIA-5-CHK-001-Q4",
      stem: "A drafted reply to a customer complaint reads well. Which route fits?",
      options: [
        { text: "Use as it stands: the writing is good", correct: false },
        { text: "Review first: a person and a decision depend on it", correct: true },
        { text: "Do not use: drafting is never appropriate here", correct: false },
        { text: "Use as it stands, then check if they complain again", correct: false },
      ],
      correctFeedback:
        "Correct. Something reversible and low-cost can go as it stands. A reply that reaches a customer is neither, so a person checks first.",
      incorrectFeedback:
        "Not quite. Drafting is a reasonable use here, and the writing quality is not the deciding factor. What decides it is that someone is affected by the result.",
      chip: { label: "Three things to do with an output", anchor: "aia-5-dgm-001" },
      category: "ambiguity",
      difficulty: "applied",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-5-LO4", "AIA-5-LO5"],
    },
  ],
  completion: {
    body: "Use it, review it, or keep it away from this job. Making that call deliberately is the skill this section was for.",
  },
};

export const aia6CheckSeed: CheckSeed = {
  id: "AIA-6-CHK-001",
  label: "Practice check",
  intro: "Four claims of the kind you will actually hear. Nothing here is graded.",
  questions: [
    {
      id: "AIA-6-CHK-001-Q1",
      stem: '"This tool has no agenda, so its output is neutral." What would settle the claim?',
      options: [
        { text: "Confirming the vendor is reputable", correct: false },
        { text: "Knowing where its examples came from and who is represented", correct: true },
        { text: "Checking that no person reviews the output", correct: false },
        { text: "Nothing: machines are neutral by definition", correct: false },
      ],
      correctFeedback:
        "Correct. The influence is not a motive, it arrived earlier in the data, so the data is where the question gets answered.",
      incorrectFeedback:
        "Not quite. Absence of motive is not neutrality. What the examples contained is what the system reproduces.",
      chip: { label: "The claims worth having an answer for", anchor: "aia-6-lesson-003" },
      category: "misconceptions",
      difficulty: "applied",
      misconceptionTags: ["M7"],
      learningOutcomes: ["AIA-6-LO1", "AIA-6-LO2"],
    },
    {
      id: "AIA-6-CHK-001-Q2",
      stem: "Why is it worth saying that a misconception is reasonable before correcting it?",
      options: [
        { text: "It is a courtesy with no practical effect", correct: false },
        {
          text: "Each one is a fair expectation carried to a mechanism where it stops holding",
          correct: true,
        },
        { text: "It avoids having to explain the correction", correct: false },
        { text: "It makes the claim partly true", correct: false },
      ],
      correctFeedback:
        "Correct. Naming why the belief made sense is what lets the correction land rather than bounce.",
      incorrectFeedback:
        "Not quite. These beliefs come from expectations that hold elsewhere, and dismissing them loses the person you are explaining to.",
      chip: { label: "Why these beliefs are reasonable", anchor: "aia-6-lesson-002" },
      category: "misconceptions",
      difficulty: "foundational",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-6-LO3"],
    },
    {
      id: "AIA-6-CHK-001-Q3",
      stem: '"AI will replace this whole role." What is the most useful question in reply?',
      options: [
        { text: "How soon?", correct: false },
        { text: "Which jobs in that role are checkable and reversible?", correct: true },
        { text: "Which vendor are you considering?", correct: false },
        { text: "How much would it save?", correct: false },
      ],
      correctFeedback:
        "Correct. Roles are bundles of jobs, and the ones that suit these systems are the checkable, reversible ones.",
      incorrectFeedback:
        "Not quite. Timing and cost come later. Breaking the role into jobs is what turns a sweeping claim into something answerable.",
      chip: { label: "The claims worth having an answer for", anchor: "aia-6-lesson-003" },
      category: "misconceptions",
      difficulty: "challenging",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-6-LO1", "AIA-6-LO2"],
    },
    {
      id: "AIA-6-CHK-001-Q4",
      stem: "A colleague asks whether a new tool is AI. You have only the marketing page. What is the accurate answer?",
      options: [
        { text: "Yes, if the page says so", correct: false },
        {
          text: "There is not enough information yet, and here is what would settle it",
          correct: true,
        },
        { text: "No, marketing pages are always wrong", correct: false },
        { text: "It does not matter either way", correct: false },
      ],
      correctFeedback:
        "Correct. Naming what is missing is a skilled answer, and pairing it with the question that would settle it makes it a useful one.",
      incorrectFeedback:
        "Not quite. A marketing page is a claim, not evidence, in either direction. Saying what would settle it moves the conversation forward.",
      chip: { label: "From claim to evidence", anchor: "aia-6-dgm-001" },
      category: "ambiguity",
      difficulty: "applied",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-6-LO2"],
    },
  ],
  completion: {
    body: "One move covers claims that have not been made yet: name the job, ask where the behaviour came from, ask what being wrong costs.",
  },
};

export const aia7CheckSeed: CheckSeed = {
  id: "AIA-7-CHK-001",
  label: "Practice check",
  intro: "Four questions about what you now have, and where its edges are.",
  questions: [
    {
      id: "AIA-7-CHK-001-Q1",
      stem: "Which of these can you now do, on the strength of this pathway alone?",
      options: [
        { text: "Judge whether a specific tool is safe for a regulated use", correct: false },
        { text: "Read what a system does and where its behaviour came from", correct: true },
        { text: "Evaluate a model's accuracy on your own data", correct: false },
        { text: "Build a system of this kind", correct: false },
      ],
      correctFeedback:
        "Correct. Reading systems is the skill here. Evaluating and building are different competencies with their own paths.",
      incorrectFeedback:
        "Not quite. Knowing the edge of your own knowledge is part of this skill: what you have is the ability to read a system, not to evaluate or build one.",
      chip: { label: "What you can now do", anchor: "aia-7-lesson-002" },
      category: "ai_characteristics",
      difficulty: "foundational",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-7-LO1"],
    },
    {
      id: "AIA-7-CHK-001-Q2",
      stem: "Someone evaluates tools for their team and asks which direction suits them. Which fits best?",
      options: [
        { text: "Practice: writing better instructions", correct: false },
        { text: "Responsible use: what may safely be done with these tools", correct: true },
        { text: "A role-focused path for building systems", correct: false },
        { text: "None: they already have what they need", correct: false },
      ],
      correctFeedback:
        "Correct. Choosing by the decisions you actually face is the useful way to pick, and theirs are about what is permissible and when review is required.",
      incorrectFeedback:
        "Not quite. Match the direction to the decisions the person faces. Evaluating tools for others is mostly a question of what may safely be done with them.",
      chip: { label: "The directions from here", anchor: "aia-7-lesson-003" },
      category: "classification",
      difficulty: "applied",
      misconceptionTags: ["M1"],
      learningOutcomes: ["AIA-7-LO2", "AIA-7-LO3"],
    },
    {
      id: "AIA-7-CHK-001-Q3",
      stem: "Why does this skill fade without use?",
      options: [
        { text: "The facts are hard to remember", correct: false },
        { text: "It is a habit of noticing, and habits need using", correct: true },
        { text: "The technology changes too quickly", correct: false },
        { text: "It does not fade once learned", correct: false },
      ],
      correctFeedback:
        "Correct. Retrieval is what keeps it, which is why the two-minute reviews exist and why rereading would do less.",
      incorrectFeedback:
        "Not quite. There are few facts to hold. What fades is the habit of asking, and habits are kept by using them.",
      chip: { label: "Keeping it", anchor: "aia-7-lesson-004" },
      category: "misconceptions",
      difficulty: "foundational",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-7-LO1"],
    },
    {
      id: "AIA-7-CHK-001-Q4",
      stem: "You are asked whether a particular tool can be trusted for a task. What does this pathway equip you to do?",
      options: [
        { text: "Give a yes or no from the description", correct: false },
        {
          text: "Ask for the evidence that would decide it, and notice if it is missing",
          correct: true,
        },
        { text: "Test the tool's accuracy yourself", correct: false },
        { text: "Defer entirely to the vendor", correct: false },
      ],
      correctFeedback:
        "Correct. Knowing which evidence a serious evaluation needs, and noticing its absence, is where every real evaluation starts.",
      incorrectFeedback:
        "Not quite. Reading a system is not the same as evaluating one, and that distinction is itself part of what you have gained.",
      chip: { label: "Where this sits", anchor: "aia-7-dgm-001" },
      category: "ambiguity",
      difficulty: "challenging",
      misconceptionTags: ["M3"],
      learningOutcomes: ["AIA-7-LO2"],
    },
  ],
  completion: {
    body: "You can read the system: what job it does, where its behaviour came from, and what being wrong would cost.",
  },
};
