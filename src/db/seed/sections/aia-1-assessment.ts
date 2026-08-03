import type { AssessmentSeed } from "@/features/assessment";

/**
 * AIA-1 graded bank (docs/content/assessments.md blueprint).
 *
 * Ten questions, the pattern the remaining sections follow. Difficulty mix
 * holds to the blueprint: four foundational, five applied, one challenging.
 * Recall-only items are capped at two, so most stems are a decision a real
 * person could face rather than a definition to recite.
 *
 * Passing must be achievable from the Quick layers alone (the standalone test
 * in learning-framework.md), so no question depends on Explore or Go Deeper.
 * Two items are fixedDraw, guaranteeing every attempt carries one ambiguity
 * item and one misconception item.
 */
export const aia1AssessmentSeed: AssessmentSeed = {
  id: "AIA-1-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-1-QB-001",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Which statement best describes what makes a system AI?",
      options: [
        { text: "Its behaviour was derived from examples rather than written down", correct: true },
        { text: "It performs a task faster than a person could", correct: false },
        { text: "It responds in natural language", correct: false },
        { text: "It is complex enough that few people understand it", correct: false },
      ],
      correctExplanation:
        "Correct. Where the behaviour came from is the property that holds up over time; speed, language and complexity are all things ordinary software can have.",
      incorrectExplanation:
        "Not quite. Speed, conversational output and complexity are all achievable with written rules. What separates the categories is whether a person specified the behaviour or the system derived it. Review: what AI is.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO1"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-002",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "A tax calculator handles thousands of intricate rules. Is it AI?",
      options: [
        { text: "No: intricate rules are still rules someone wrote", correct: true },
        { text: "Yes: that many rules amount to intelligence", correct: false },
        { text: "Yes: any system that handles complexity is AI", correct: false },
        { text: "There is not enough information to say", correct: false },
      ],
      correctExplanation:
        "Correct. Volume of rules changes nothing about their origin. A bigger vending machine is still a vending machine.",
      incorrectExplanation:
        "Not quite. The description tells you the mechanism: rules that people wrote. Complexity is not evidence of learning. Review: complexity is not a signal.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO1", "AIA-1-LO5"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-003",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "A photo app groups pictures of the same person, including people it was never shown during setup. What does that tell you?",
      options: [
        { text: "It generalises from examples, which points to learned behaviour", correct: true },
        { text: "Someone entered each face in advance", correct: false },
        { text: "It is following a written rule about facial features", correct: false },
        { text: "Nothing: photo grouping is always rule-based", correct: false },
      ],
      correctExplanation:
        "Correct. Handling cases nobody entered in advance is the signature of behaviour derived from examples.",
      incorrectExplanation:
        "Not quite. The detail that decides it is that it works on people it was never shown. A stored list could not do that. Review: where the behaviour came from.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO1"],
      misconceptionTags: [],
    },
    {
      id: "AIA-1-QB-004",
      format: "multiple_choice",
      category: "classification",
      difficulty: "applied",
      stem: "Which of these would most change your judgment about whether a product uses AI?",
      options: [
        { text: "Learning that its behaviour improved without anyone editing it", correct: true },
        { text: "Learning that it has a conversational interface", correct: false },
        { text: "Learning that the vendor describes it as AI-powered", correct: false },
        { text: "Learning that it is used by large companies", correct: false },
      ],
      correctExplanation:
        "Correct. Behaviour changing without an edit means something was derived from data, which is the mechanism itself rather than a claim about it.",
      incorrectExplanation:
        "Not quite. Interfaces, marketing and customer lists are all observable without telling you anything about the mechanism. Review: label versus evidence.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO5"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-005",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Why is AI better described as a field than as a single technology?",
      options: [
        {
          text: "It contains many methods that produce different outputs and break down differently",
          correct: true,
        },
        { text: "Because no single company owns it", correct: false },
        { text: "Because it is still being researched", correct: false },
        { text: "Because the term is used loosely in marketing", correct: false },
      ],
      correctExplanation:
        "Correct. A fraud check and a drafting assistant share an origin and almost nothing else, which is why knowing something is AI tells you little on its own.",
      incorrectExplanation:
        "Not quite. Ownership, research status and loose marketing are all true but incidental. The reason that matters is that the methods genuinely differ. Review: a field, not a single thing.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO2"],
      misconceptionTags: [],
    },
    {
      id: "AIA-1-QB-006",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "An assistant writes a fluent, confident paragraph. What does the fluency tell you about whether the content is correct?",
      options: [
        { text: "Nothing: fluency and accuracy come from different things here", correct: true },
        { text: "It is likely correct, since errors usually read badly", correct: false },
        { text: "It is likely incorrect, since fluent output is generated", correct: false },
        { text: "It depends on how long the passage is", correct: false },
      ],
      correctExplanation:
        "Correct. Selecting likely continuations produces fluent text whether or not the content is true, so the writing quality carries no information either way.",
      incorrectExplanation:
        "Not quite. Fluency is produced by the same process regardless of accuracy, so it is evidence in neither direction. Review: doing a task is not working like a person.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO4"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-1-QB-007",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every signal that genuinely points to learned behaviour.",
      options: [
        { text: "It handles inputs nobody wrote a rule for", correct: true },
        { text: "Its performance changed after being given more data", correct: true },
        { text: "It has a chat interface", correct: false },
        { text: "The marketing page calls it AI-powered", correct: false },
      ],
      correctExplanation:
        "Correct. Both signals describe the mechanism. The other two describe presentation and claims.",
      incorrectExplanation:
        "Not quite. Look for statements about how the system behaves rather than how it is presented or described. Review: label versus evidence.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-1-LO1", "AIA-1-LO5"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-008",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "A colleague says a chess program stopped being AI once people understood how it worked. What is the most accurate response?",
      options: [
        {
          text: "The boundary really does move that way, which is why origin is the steadier question",
          correct: true,
        },
        { text: "They are simply mistaken about the history", correct: false },
        { text: "Understanding a system has no bearing on how it is described", correct: false },
        { text: "Chess programs were never described as AI", correct: false },
      ],
      correctExplanation:
        "Correct. Solved problems do get reclassified as ordinary computing, which is a reason to judge by where behaviour came from rather than to argue about the word.",
      incorrectExplanation:
        "Not quite. The observation is accurate, and dismissing it loses the point. What it argues for is a definition that does not move. Review: why the boundary keeps moving.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO3"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-009",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A vendor page says: our scheduling assistant uses advanced AI to optimise your calendar. What can you conclude about the mechanism?",
      options: [
        { text: "Not enough information: nothing here describes the mechanism", correct: true },
        { text: "It learns from your calendar history", correct: false },
        { text: "It applies scheduling rules someone wrote", correct: false },
        { text: "It combines both, as most products do", correct: false },
      ],
      correctExplanation:
        "Correct. Advanced and optimise describe an outcome, not a mechanism. Saying there is not enough information is the accurate answer, and it is a skilled one.",
      incorrectExplanation:
        "Not quite. Each of the other answers is plausible, and that is the point: nothing in the sentence lets you choose between them. Review: label versus evidence.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-1-LO5"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-1-QB-010",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Which question is most useful to ask about any system claiming to be AI?",
      options: [
        {
          text: "What patterns would it have learned, from what data, to do this job?",
          correct: true,
        },
        { text: "How many people worked on it?", correct: false },
        { text: "How fast does it respond?", correct: false },
        { text: "Does it use the newest available technology?", correct: false },
      ],
      correctExplanation:
        "Correct. It goes straight at the mechanism, and a description that cannot support it has not told you what the system is.",
      incorrectExplanation:
        "Not quite. Team size, speed and recency are all answerable without revealing anything about how the system decides. Review: the question that carries through.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-1-LO1", "AIA-1-LO5"],
      misconceptionTags: ["M1"],
    },
  ],
};
