import type { AssessmentSeed } from "@/features/assessment";

/**
 * Graded banks for AIA-2 and AIA-4 (docs/content/assessments.md blueprint).
 *
 * Eight questions each: three foundational, four applied, one challenging.
 * Recall capped at two per bank. Every stem is answerable from the Quick
 * layers alone, so depth stays voluntary (learning-framework.md standalone
 * test). One ambiguity item and one misconception item are fixedDraw in each,
 * so no attempt can avoid the two judgments that matter most.
 */
export const aia2AssessmentSeed: AssessmentSeed = {
  id: "AIA-2-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-2-QB-001",
      format: "multiple_choice",
      category: "classification",
      difficulty: "foundational",
      stem: "Which of these is doing the job of ranking rather than generating?",
      options: [
        { text: "A feed deciding which posts you see first", correct: true },
        { text: "An assistant drafting a reply", correct: false },
        { text: "A tool writing a meeting summary", correct: false },
        { text: "An image tool producing a picture from a description", correct: false },
      ],
      correctExplanation:
        "Correct. Ranking chooses an order among things that already exist. The other three compose something new.",
      incorrectExplanation:
        "Not quite. Ask whether the output existed before. Ordering existing items is ranking; composing something new is generating. Review: the invisible majority.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO2"],
      misconceptionTags: [],
    },
    {
      id: "AIA-2-QB-002",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Someone says they have never used AI because they avoid chat assistants. What is the accurate correction?",
      options: [
        { text: "Most of it sits unannounced inside products they already use", correct: true },
        { text: "They are right, if they avoid those tools", correct: false },
        { text: "Only technical roles encounter it", correct: false },
        { text: "It depends which country they live in", correct: false },
      ],
      correctExplanation:
        "Correct. Spam filtering, card checks, ranking and autocorrect all work this way and none announce themselves.",
      incorrectExplanation:
        "Not quite. The visible assistants are the exception. Most of it is a component doing a quiet job inside an ordinary product. Review: the invisible majority.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO1", "AIA-2-LO3"],
      misconceptionTags: ["M5"],
    },
    {
      id: "AIA-2-QB-003",
      format: "multiple_choice",
      category: "combined_systems",
      difficulty: "applied",
      stem: "A navigation app stores roads, receives live traffic, and estimates arrival time. Which part is learned?",
      options: [
        { text: "The arrival estimate", correct: true },
        { text: "The stored roads", correct: false },
        { text: "The live traffic feed", correct: false },
        { text: "All three equally", correct: false },
      ],
      correctExplanation:
        "Correct. Roads are recorded and traffic is fed in. The estimate that shifts with conditions is built from patterns.",
      incorrectExplanation:
        "Not quite. Recording data and receiving data are not learning. The part that predicts something not yet known is the learned one. Review: uses AI, or is AI.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO4"],
      misconceptionTags: ["M6"],
    },
    {
      id: "AIA-2-QB-004",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "Why is it more useful to ask which part of a product learned its behaviour than to ask whether it is AI?",
      options: [
        { text: "Almost every product combines several mechanisms", correct: true },
        { text: "Because the word AI has no agreed meaning at all", correct: false },
        { text: "Because most products contain no AI", correct: false },
        { text: "Because vendors are usually lying", correct: false },
      ],
      correctExplanation:
        "Correct. The whole-product question produces an argument; the which-part question produces an answer you can act on.",
      incorrectExplanation:
        "Not quite. The reason is structural rather than cynical: products are layered, so a single label cannot describe them. Review: uses AI, or is AI.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO4"],
      misconceptionTags: ["M6"],
    },
    {
      id: "AIA-2-QB-005",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every everyday case where a system is deciding something about you in the background.",
      options: [
        { text: "A card payment checked against your spending pattern", correct: true },
        { text: "Mail sorted into spam and priority", correct: true },
        { text: "A calculator returning a total", correct: false },
        { text: "A clock showing the time", correct: false },
      ],
      correctExplanation:
        "Correct. Both involve a judgment about your case. The other two produce the same output for everyone.",
      incorrectExplanation:
        "Not quite. Look for a judgment that varies by person or situation, rather than a fixed calculation. Review: the invisible majority.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-2-LO1", "AIA-2-LO2"],
      misconceptionTags: ["M5"],
    },
    {
      id: "AIA-2-QB-006",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Why are most of these systems invisible to the people using them?",
      options: [
        { text: "They are components inside products, not products themselves", correct: true },
        { text: "Companies are legally required to hide them", correct: false },
        { text: "They only run overnight", correct: false },
        { text: "They are too slow to notice", correct: false },
      ],
      correctExplanation:
        "Correct. Nobody markets a spam filter, because it is a part doing a job rather than the thing being sold.",
      incorrectExplanation:
        "Not quite. There is nothing hidden about them. They are simply parts inside products, and parts do not get their own branding. Review: the invisible majority.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO3"],
      misconceptionTags: ["M5"],
    },
    {
      id: "AIA-2-QB-007",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "Two customer-support chat windows look identical. What can you conclude about their mechanisms?",
      options: [
        { text: "Not enough information: the interface is designed, not evidence", correct: true },
        { text: "Both must be generating replies", correct: false },
        { text: "The one that answers faster is rule-based", correct: false },
        { text: "The one with better writing is generating", correct: false },
      ],
      correctExplanation:
        "Correct. What you see was chosen by a designer. When the surface does not settle it, saying so is the accurate answer.",
      incorrectExplanation:
        "Not quite. Speed and writing quality are both design outcomes. Neither tells you whether a reply was written in advance or composed. Review: why you cannot judge from the surface.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-2-LO3"],
      misconceptionTags: ["M5"],
    },
    {
      id: "AIA-2-QB-008",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "A shop's front page shows different products to different visitors. What is the most accurate description?",
      options: [
        { text: "A ranking chosen for each visitor", correct: true },
        { text: "A page generated from scratch for each visitor", correct: false },
        { text: "A fixed page that happens to load differently", correct: false },
        { text: "A scheduled task with no decisions in it", correct: false },
      ],
      correctExplanation:
        "Correct. The products already exist; what varies is the order and selection, which is a ranking.",
      incorrectExplanation:
        "Not quite. Nothing new is being composed. Existing items are being ordered differently per visitor. Review: the invisible majority.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-2-LO2"],
      misconceptionTags: ["M5"],
    },
  ],
};

export const aia4AssessmentSeed: AssessmentSeed = {
  id: "AIA-4-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-4-QB-001",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Which property most decides whether a task suits these systems?",
      options: [
        { text: "What a wrong answer costs, and whether anyone would notice", correct: true },
        { text: "How difficult people find the task", correct: false },
        { text: "How much data the company holds", correct: false },
        { text: "Whether the output is text", correct: false },
      ],
      correctExplanation:
        "Correct. Cost and visibility of an error decide suitability more than the technology or the difficulty.",
      incorrectExplanation:
        "Not quite. Difficulty for a person and suitability for a system are unrelated. Ask what being wrong costs and who would catch it. Review: choosing by the cost of being wrong.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO3"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-4-QB-002",
      format: "multiple_choice",
      category: "classification",
      difficulty: "foundational",
      stem: "Estimating which customers are likely to cancel next quarter is which job?",
      options: [
        { text: "Predicting", correct: true },
        { text: "Recognising", correct: false },
        { text: "Summarising", correct: false },
        { text: "Generating", correct: false },
      ],
      correctExplanation:
        "Correct. It estimates something that has not happened, which makes it a likelihood rather than a fact.",
      incorrectExplanation:
        "Not quite. Nothing is being labelled, compressed or composed. Something not yet known is being estimated. Review: predicting what comes next.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO1", "AIA-4-LO2"],
      misconceptionTags: [],
    },
    {
      id: "AIA-4-QB-003",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "Why does a prediction system need ongoing monitoring rather than one-off approval?",
      options: [
        { text: "It assumes the future resembles the past, and conditions change", correct: true },
        { text: "Its code degrades over time", correct: false },
        { text: "Predictions become slower as data grows", correct: false },
        { text: "Regulators require monthly checks", correct: false },
      ],
      correctExplanation:
        "Correct. When conditions move away from the examples, performance degrades with no error appearing to announce it.",
      incorrectExplanation:
        "Not quite. Nothing rots and nothing slows. The assumption that the future resembles the past is what quietly stops holding. Review: predicting what comes next.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO3"],
      misconceptionTags: ["M4"],
    },
    {
      id: "AIA-4-QB-004",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "Why is summarising not automatically safer than generating?",
      options: [
        {
          text: "A summary decides what to leave out, and the reader cannot see that",
          correct: true,
        },
        { text: "Summaries are longer than their sources", correct: false },
        { text: "Summarising and generating are the same job", correct: false },
        { text: "It is safer, because the source is available", correct: false },
      ],
      correctExplanation:
        "Correct. Omission is a judgment, and it is invisible to anyone reading only the summary.",
      incorrectExplanation:
        "Not quite. Having the source helps only if someone checks it, and what was dropped is the part nobody sees. Review: generating and summarising.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO3"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-4-QB-005",
      format: "multiple_choice",
      category: "combined_systems",
      difficulty: "applied",
      stem: "A platform sorts messages, estimates urgency, drafts a reply, and hands it to an agent. Best description?",
      options: [
        { text: "Several jobs combined, only some of them learned", correct: true },
        { text: "One AI system doing four things", correct: false },
        { text: "Automation with no learned component", correct: false },
        { text: "Not enough information to say", correct: false },
      ],
      correctExplanation:
        "Correct. Naming the jobs separately is what lets you judge each, and the agent is a decision point rather than a step.",
      incorrectExplanation:
        "Not quite. The description names distinct jobs. Treating them as one hides which part you would need to check. Review: supporting a decision.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO4"],
      misconceptionTags: ["M6"],
    },
    {
      id: "AIA-4-QB-006",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every task where being occasionally wrong is cheap and correctable.",
      options: [
        { text: "Routing a support message to a queue", correct: true },
        { text: "Suggesting a tag for a photo", correct: true },
        { text: "Deciding whether a loan is approved", correct: false },
        { text: "Setting a medication dose", correct: false },
      ],
      correctExplanation:
        "Correct. The first two are visible and reversible in seconds. The other two carry consequences review must catch first.",
      incorrectExplanation:
        "Not quite. Ask who is affected and how quickly a mistake could be undone. Review: choosing by the cost of being wrong.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-4-LO3"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-4-QB-007",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A vendor says their tool uses AI to improve team productivity. Which job is it doing?",
      options: [
        { text: "Not enough information: no job is named", correct: true },
        { text: "Predicting", correct: false },
        { text: "Summarising", correct: false },
        { text: "Supporting a decision", correct: false },
      ],
      correctExplanation:
        "Correct. Improving productivity is an outcome, not a job. Any of the others could produce it, so nothing has been said.",
      incorrectExplanation:
        "Not quite. Each option is plausible, and that is the point: the sentence describes a result rather than what the system does. Review: name the job first.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-4-LO2"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-4-QB-008",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "A colleague argues that because a task is tedious for people, it must suit AI. What is wrong with that?",
      options: [
        { text: "Difficulty for a person says nothing about suitability", correct: true },
        { text: "Tedious tasks are always rule-based", correct: false },
        { text: "Nothing: tedium is a reliable signal", correct: false },
        { text: "Tedious tasks are too varied to automate", correct: false },
      ],
      correctExplanation:
        "Correct. Some tasks people find trivial are poor candidates, and some they find laborious are ideal. Cost of error decides it.",
      incorrectExplanation:
        "Not quite. Tedium describes the human experience of the work, not the properties that make a job suitable. Review: choosing by the cost of being wrong.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-4-LO3"],
      misconceptionTags: ["M1"],
    },
  ],
};
