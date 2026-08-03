import type { AssessmentSeed } from "@/features/assessment";

/**
 * Graded banks for AIA-5, AIA-6 and AIA-7 (docs/content/assessments.md).
 *
 * Same shape as the earlier banks: eight questions, three foundational, four
 * applied, one challenging, recall capped at two, answerable from the Quick
 * layers alone. AIA-5 carries the heaviest judgment load in the pathway, so
 * its fixedDraw pair is the use-review-refuse decision and the inherited-bias
 * item rather than two recall checks.
 */
export const aia5AssessmentSeed: AssessmentSeed = {
  id: "AIA-5-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-5-QB-001",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Why can a pattern-based system not guarantee an accurate answer?",
      options: [
        {
          text: "It answers with a likelihood, and likelihoods are sometimes wrong",
          correct: true,
        },
        { text: "Its code contains undiscovered defects", correct: false },
        { text: "It has not been given enough data yet", correct: false },
        { text: "It runs too quickly to check itself", correct: false },
      ],
      correctExplanation:
        "Correct. This is the same property that lets it handle cases nobody wrote a rule for, so it cannot be engineered away.",
      incorrectExplanation:
        "Not quite. This is not a defect awaiting a fix or more data. Answering by likelihood is the mechanism. Review: no guarantee of accuracy.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO1"],
      misconceptionTags: ["M4"],
    },
    {
      id: "AIA-5-QB-002",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "What does fluent, confident output tell you about whether the content is true?",
      options: [
        { text: "Nothing: the two are produced by different things", correct: true },
        { text: "It is probably true, since errors read badly", correct: false },
        { text: "It is probably false, since fluent text is generated", correct: false },
        { text: "It depends on the length of the passage", correct: false },
      ],
      correctExplanation:
        "Correct. Selecting likely continuations produces fluent text regardless of accuracy, so fluency is evidence in neither direction.",
      incorrectExplanation:
        "Not quite. Nothing in producing fluent text checks a fact, so the writing quality carries no information about truth. Review: fluent is not the same as true.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO2"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-5-QB-003",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "A vendor quotes 97 percent accuracy. What is the most useful follow-up?",
      options: [
        { text: "Which cases the misses were", correct: true },
        { text: "Whether the figure can be raised", correct: false },
        { text: "How many customers they have", correct: false },
        { text: "How recently it was measured", correct: false },
      ],
      correctExplanation:
        "Correct. An average hides the unusual cases, which is exactly where a system trained on typical cases performs worst.",
      incorrectExplanation:
        "Not quite. A high average can sit alongside consistent misses on the cases that matter most to you. Review: no guarantee of accuracy.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO1"],
      misconceptionTags: ["M4"],
    },
    {
      id: "AIA-5-QB-004",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "A hiring tool favours candidates from certain universities, and nobody programmed that. How did it happen?",
      options: [
        { text: "The pattern was present in the examples it learned from", correct: true },
        { text: "Someone hid a rule in the code", correct: false },
        { text: "The system formed a preference of its own", correct: false },
        { text: "It is random variation between runs", correct: false },
      ],
      correctExplanation:
        "Correct. The system reproduces patterns its examples contained, and nothing in the mechanism marks a pattern as unfair.",
      incorrectExplanation:
        "Not quite. No rule was written and no preference was formed. Past decisions carried the pattern and it was learned along with everything else. Review: bias is inherited, not chosen.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO3"],
      misconceptionTags: ["M7"],
    },
    {
      id: "AIA-5-QB-005",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "Why is the absence of a human decision not the same as the absence of human influence?",
      options: [
        { text: "People chose the data, the objective and what counted as success", correct: true },
        { text: "Because a person always reviews the output", correct: false },
        { text: "Because systems are audited before release", correct: false },
        { text: "It is the same thing, stated differently", correct: false },
      ],
      correctExplanation:
        "Correct. The influence arrived earlier rather than being absent, which is why examining the examples matters more than trusting the mechanism.",
      incorrectExplanation:
        "Not quite. Review and audits are controls that may or may not exist. The influence is upstream, in the choices that shaped the examples. Review: bias is inherited, not chosen.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO3"],
      misconceptionTags: ["M7"],
    },
    {
      id: "AIA-5-QB-006",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every part of a generated passage that carries the most verification risk.",
      options: [
        { text: "A cited figure", correct: true },
        { text: "A named source", correct: true },
        { text: "The overall structure", correct: false },
        { text: "The tone", correct: false },
      ],
      correctExplanation:
        "Correct. Specifics are cheap to compose and expensive to check, which is the wrong combination.",
      incorrectExplanation:
        "Not quite. Structure and tone are usually sound. It is the specifics that get composed as readily as everything else. Review: fluent is not the same as true.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-5-LO2"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-5-QB-007",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A drafted reply to a customer complaint reads well. Which route fits?",
      options: [
        { text: "Review first: a person and a decision depend on it", correct: true },
        { text: "Use as it stands: the writing is good", correct: false },
        { text: "Do not use: drafting is never appropriate here", correct: false },
        { text: "Use it, then check if they complain again", correct: false },
      ],
      correctExplanation:
        "Correct. Something reversible and low-cost can go as it stands. A reply reaching a customer is neither, so a person checks first.",
      incorrectExplanation:
        "Not quite. Drafting is a reasonable use here and writing quality is not the deciding factor. What decides it is that someone is affected. Review: three things to do with an output.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-5-LO4", "AIA-5-LO5"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-5-QB-008",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Which situation most clearly calls for do not use here rather than review first?",
      options: [
        { text: "Being wrong causes harm that review would not catch in time", correct: true },
        { text: "The output is long", correct: false },
        { text: "Nobody on the team has used the tool before", correct: false },
        { text: "The tool is expensive", correct: false },
      ],
      correctExplanation:
        "Correct. Review is a control that takes time. Where the harm outruns the control, a different approach is the answer.",
      incorrectExplanation:
        "Not quite. Length, familiarity and cost are practical concerns. What moves a case into do not use is harm that review cannot catch in time. Review: three things to do with an output.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-5-LO4", "AIA-5-LO5"],
      misconceptionTags: [],
    },
  ],
};

export const aia6AssessmentSeed: AssessmentSeed = {
  id: "AIA-6-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-6-QB-001",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Someone claims a tool is objective because it has no agenda. What would settle it?",
      options: [
        { text: "Knowing where its examples came from and who is represented", correct: true },
        { text: "Confirming the vendor is reputable", correct: false },
        { text: "Checking that no person reviews its output", correct: false },
        { text: "Nothing: machines are neutral by definition", correct: false },
      ],
      correctExplanation:
        "Correct. The influence is not a motive; it arrived in the data, which is where the question gets answered.",
      incorrectExplanation:
        "Not quite. Absence of motive is not neutrality. What the examples contained is what the system reproduces. Review: the claims worth having an answer for.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO1", "AIA-6-LO2"],
      misconceptionTags: ["M7"],
    },
    {
      id: "AIA-6-QB-002",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Why name a misconception as reasonable before correcting it?",
      options: [
        { text: "Each is a fair expectation carried where it stops holding", correct: true },
        { text: "It is a courtesy with no practical effect", correct: false },
        { text: "It avoids having to explain the correction", correct: false },
        { text: "It makes the claim partly true", correct: false },
      ],
      correctExplanation:
        "Correct. Naming why the belief made sense is what lets the correction land rather than bounce.",
      incorrectExplanation:
        "Not quite. These beliefs come from expectations that hold elsewhere, and dismissing them loses the person you are explaining to. Review: why these beliefs are reasonable.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO3"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-6-QB-003",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "A colleague says AI will replace this whole role. What is the most useful reply?",
      options: [
        { text: "Which jobs in that role are checkable and reversible?", correct: true },
        { text: "How soon do you think?", correct: false },
        { text: "Which vendor are you considering?", correct: false },
        { text: "How much would it save?", correct: false },
      ],
      correctExplanation:
        "Correct. Roles are bundles of jobs, and the ones that suit these systems are the checkable, reversible ones.",
      incorrectExplanation:
        "Not quite. Timing and cost come later. Breaking the role into jobs turns a sweeping claim into something answerable. Review: the claims worth having an answer for.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO1"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-6-QB-004",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "Which question decides the most claims about a system?",
      options: [
        { text: "Was the behaviour written by a person or derived from examples?", correct: true },
        { text: "How new is the technology?", correct: false },
        { text: "How many people built it?", correct: false },
        { text: "How fast does it respond?", correct: false },
      ],
      correctExplanation:
        "Correct. Origin is the property that separates the categories, and most disputed claims turn on it.",
      incorrectExplanation:
        "Not quite. Recency, team size and speed are all answerable without revealing how the system decides anything. Review: from claim to evidence.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO2"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-6-QB-005",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every statement that is evidence about a mechanism rather than a claim about a product.",
      options: [
        { text: "It handles inputs nobody wrote a rule for", correct: true },
        { text: "Its behaviour changed after being given more data", correct: true },
        { text: "It is described as AI-powered", correct: false },
        { text: "It is used by several large firms", correct: false },
      ],
      correctExplanation:
        "Correct. The first two describe how the system behaves. The other two describe how it is presented.",
      incorrectExplanation:
        "Not quite. Look for statements about behaviour rather than about description or adoption. Review: from claim to evidence.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-6-LO2"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-6-QB-006",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "Someone says these systems run on their own, so people are out of the loop. What is wrong?",
      options: [
        {
          text: "People chose the data, objective, thresholds and what happens next",
          correct: true,
        },
        { text: "Nothing: unsupervised systems have no human input", correct: false },
        { text: "A person always reviews every output", correct: false },
        { text: "They never run without supervision", correct: false },
      ],
      correctExplanation:
        "Correct. Running without supervision now does not mean it was not shaped by decisions people made earlier.",
      incorrectExplanation:
        "Not quite. Some do run unsupervised, and review is not guaranteed. The human influence is upstream rather than absent. Review: being the person who explains it.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO1"],
      misconceptionTags: ["M6"],
    },
    {
      id: "AIA-6-QB-007",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A colleague asks whether a new tool is AI. You have only its marketing page. What is the accurate answer?",
      options: [
        {
          text: "There is not enough information yet, and here is what would settle it",
          correct: true,
        },
        { text: "Yes, if the page says so", correct: false },
        { text: "No: marketing pages are always wrong", correct: false },
        { text: "It does not matter either way", correct: false },
      ],
      correctExplanation:
        "Correct. Naming what is missing is a skilled answer, and pairing it with the question that would settle it makes it useful.",
      incorrectExplanation:
        "Not quite. A marketing page is a claim, not evidence, in either direction. Review: from claim to evidence.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-6-LO1", "AIA-6-LO2"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-6-QB-008",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Why is learning one questioning habit better than memorising a list of myths?",
      options: [
        { text: "It works on claims that have not been made yet", correct: true },
        { text: "Lists are harder to remember", correct: false },
        { text: "Myths are all essentially the same", correct: false },
        { text: "The list changes every year by law", correct: false },
      ],
      correctExplanation:
        "Correct. Next year's claims will differ and the question that settles them will not.",
      incorrectExplanation:
        "Not quite. The myths are genuinely different from each other. What they share is being answerable by the same three questions. Review: the takeaway.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-6-LO2"],
      misconceptionTags: [],
    },
  ],
};

export const aia7AssessmentSeed: AssessmentSeed = {
  id: "AIA-7-ASM-001",
  intro:
    "Six questions drawn from a larger bank. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "AIA-7-QB-001",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "Which can you do on the strength of AI Awareness alone?",
      options: [
        { text: "Read what a system does and where its behaviour came from", correct: true },
        { text: "Judge whether a tool is safe for a regulated use", correct: false },
        { text: "Evaluate a model's accuracy on your own data", correct: false },
        { text: "Build a system of this kind", correct: false },
      ],
      correctExplanation:
        "Correct. Reading systems is this competency. Evaluating and building are separate ones with their own paths.",
      incorrectExplanation:
        "Not quite. Knowing the edge of your own knowledge is part of this skill: you can read a system, not yet evaluate or build one. Review: what you can now do.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO1"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-7-QB-002",
      format: "multiple_choice",
      category: "classification",
      difficulty: "applied",
      stem: "Someone evaluates tools for their team. Which direction suits them best?",
      options: [
        { text: "Responsible use: what may safely be done with these tools", correct: true },
        { text: "Practice: writing better instructions", correct: false },
        { text: "A role-focused path for building systems", correct: false },
        { text: "None: they already have what they need", correct: false },
      ],
      correctExplanation:
        "Correct. Their decisions are about what is permissible and when review is required, which is what that direction covers.",
      incorrectExplanation:
        "Not quite. Match the direction to the decisions the person actually faces. Evaluating tools for others is mostly about permissible use. Review: the directions from here.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO2", "AIA-7-LO3"],
      misconceptionTags: [],
    },
    {
      id: "AIA-7-QB-003",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "foundational",
      stem: "Why does this skill fade without use?",
      options: [
        { text: "It is a habit of noticing, and habits need using", correct: true },
        { text: "The facts are hard to remember", correct: false },
        { text: "The technology changes too quickly", correct: false },
        { text: "It does not fade once learned", correct: false },
      ],
      correctExplanation:
        "Correct. Retrieval is what keeps it, which is why short reviews do more than rereading.",
      incorrectExplanation:
        "Not quite. There are few facts to hold. What fades is the habit of asking. Review: keeping it.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO1"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-7-QB-004",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "applied",
      stem: "You are asked whether a particular tool can be trusted for a task. What does this pathway equip you to do?",
      options: [
        {
          text: "Ask for the evidence that would decide it, and notice if it is missing",
          correct: true,
        },
        { text: "Give a yes or no from the description", correct: false },
        { text: "Measure the tool's accuracy yourself", correct: false },
        { text: "Defer entirely to the vendor", correct: false },
      ],
      correctExplanation:
        "Correct. Knowing what a serious evaluation needs, and noticing its absence, is where every real evaluation starts.",
      incorrectExplanation:
        "Not quite. Reading a system is not evaluating one, and that distinction is itself part of what you gained. Review: where this sits.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO2"],
      misconceptionTags: ["M3"],
    },
    {
      id: "AIA-7-QB-005",
      format: "multiple_select",
      category: "classification",
      difficulty: "applied",
      stem: "Select every question you can now answer about an unfamiliar system.",
      options: [
        { text: "What job is it doing?", correct: true },
        { text: "Where did its behaviour come from?", correct: true },
        { text: "What is its error rate on my data?", correct: false },
        { text: "Which architecture was used to build it?", correct: false },
      ],
      correctExplanation:
        "Correct. The first two are readable from a good description. The other two need evidence only the builder can supply.",
      incorrectExplanation:
        "Not quite. Error rates and architecture require access you do not have. Job and origin are readable. Review: what you can now do.",
      fixedDraw: false,
      rotateOptions: false,
      learningOutcomes: ["AIA-7-LO1"],
      misconceptionTags: [],
    },
    {
      id: "AIA-7-QB-006",
      format: "multiple_choice",
      category: "misconceptions",
      difficulty: "applied",
      stem: "Why can you begin a later competency without finishing every earlier one?",
      options: [
        {
          text: "Prerequisites apply only where success is impossible without them",
          correct: true,
        },
        { text: "The levels are unrelated to each other", correct: false },
        { text: "Later levels repeat all earlier material", correct: false },
        { text: "You cannot: they must be taken in order", correct: false },
      ],
      correctExplanation:
        "Correct. Each direction begins from the reading skill rather than from the others, so the order is a recommendation.",
      incorrectExplanation:
        "Not quite. The levels are related but not strictly sequential, and nothing repeats wholesale. Review: the directions from here.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO3"],
      misconceptionTags: [],
    },
    {
      id: "AIA-7-QB-007",
      format: "scenario_decision",
      category: "ambiguity",
      difficulty: "challenging",
      stem: "A colleague forwards a product page and asks if you would recommend it. What is the honest response?",
      options: [
        {
          text: "Name what the page does not say, and what you would need to decide",
          correct: true,
        },
        { text: "Recommend it: the description sounds capable", correct: false },
        { text: "Reject it: product pages cannot be trusted", correct: false },
        { text: "Say the question cannot be answered by anyone", correct: false },
      ],
      correctExplanation:
        "Correct. It can be answered, just not from this page. Saying which evidence is missing turns the request into something actionable.",
      incorrectExplanation:
        "Not quite. Neither accepting nor rejecting on the page alone is honest, and the question is answerable with the right evidence. Review: where this sits.",
      fixedDraw: true,
      rotateOptions: false,
      learningOutcomes: ["AIA-7-LO1", "AIA-7-LO2"],
      misconceptionTags: ["M1"],
    },
    {
      id: "AIA-7-QB-008",
      format: "multiple_choice",
      category: "ai_characteristics",
      difficulty: "foundational",
      stem: "What single habit best keeps this skill alive?",
      options: [
        { text: "Asking what a system learned, from what data, to do its job", correct: true },
        { text: "Reading industry news weekly", correct: false },
        { text: "Trying every new tool that appears", correct: false },
        { text: "Rereading the lesson material", correct: false },
      ],
      correctExplanation:
        "Correct. It is one question, it applies to anything, and using it is what keeps the habit rather than the facts.",
      incorrectExplanation:
        "Not quite. News and new tools change what you have heard of, not how you read systems, and rereading does less than retrieval. Review: keeping it.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["AIA-7-LO1"],
      misconceptionTags: [],
    },
  ],
};
