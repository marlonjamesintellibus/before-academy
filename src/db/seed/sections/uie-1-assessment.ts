import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-1 graded bank: the logic and reasoning drills, graded form.
 *
 * Ten questions over the reasoning taxonomy (constraint_reading,
 * decomposition, edge_cases, estimation, reasoning_communication), difficulty
 * mix matching the AI Awareness blueprint: four foundational, five applied,
 * one challenging. Two items are fixedDraw so every attempt carries one
 * missing-given judgment and one edge-sweep item, the two habits the module
 * exists to build. The generic coverage-first draw serves this bank.
 *
 * No stem requires reading code, by design: this module is the pilot that
 * runs before the platform gains code rendering.
 */
export const uie1AssessmentSeed: AssessmentSeed = {
  id: "UIE-1-ASM-001",
  intro:
    "Six questions drawn from a larger bank, one reasoning decision each. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-1-QB-001",
      format: "multiple_choice",
      category: "constraint_reading",
      difficulty: "foundational",
      stem: "A requirement reads: 'Users can undo their last action.' Which unstated definition most changes what gets built?",
      options: [
        {
          text: "What counts as an action, and whether 'last' survives a page refresh",
          correct: true,
        },
        { text: "Which keyboard shortcut triggers the undo", correct: false },
        { text: "What the undo button looks like", correct: false },
        { text: "Where the undo control sits on the screen", correct: false },
      ],
      correctExplanation:
        "Correct. 'Action' and 'last' are the load-bearing words: whether typing one character is an action, and whether the undo stack survives a refresh, decide the architecture. The visible controls follow from those definitions, not the other way round.",
      incorrectExplanation:
        "Not quite. Shortcut, appearance and placement are presentation choices that any definition supports. The words doing hidden work are 'action' and 'last': their definitions decide what state must be kept and for how long. Review: what is actually being asked.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-002",
      format: "multiple_choice",
      category: "constraint_reading",
      difficulty: "applied",
      stem: "An interviewer says: 'Our search returns results in 200 milliseconds on average. Is that fast enough?' What is the strongest response?",
      options: [
        {
          text: "Ask what the slowest experiences look like, because an average hides the tail",
          correct: true,
        },
        { text: "Yes: 200 milliseconds is generally considered fast", correct: false },
        { text: "No: search should always return in under 100 milliseconds", correct: false },
        { text: "Yes, provided the results are relevant", correct: false },
      ],
      correctExplanation:
        "Correct. 'Fast enough' cannot be judged from an average alone: a 200 millisecond average can contain a tail of multi-second experiences for a meaningful share of users. Asking for the distribution is reading the constraint that the question quietly skipped.",
      incorrectExplanation:
        "Not quite. Any confident yes or no accepts the average as the whole story, and an average is one number summarising many. The missing given is the distribution: how slow the slow cases are and how many users meet them. Review: what is actually being asked.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO1"],
      misconceptionTags: ["UIE-M-002"],
    },
    {
      id: "UIE-1-QB-003",
      format: "multiple_choice",
      category: "decomposition",
      difficulty: "foundational",
      stem: "A gallery shows 8 images per row. With 59 images, how many rows are there, and how many images sit in the final row?",
      options: [
        { text: "8 rows, with 3 images in the final row", correct: true },
        { text: "7 rows, with 3 images in the final row", correct: false },
        { text: "8 rows, all of them full", correct: false },
        { text: "7 rows, with 8 images in the final row", correct: false },
      ],
      correctExplanation:
        "Correct. Seven full rows hold 56 images, and the remaining 3 make an eighth, partial row. Unit, repeats, remainder: the remainder is a real row, handled as a step of its own.",
      incorrectExplanation:
        "Not quite. 59 over 8 is 7 with 3 left over, and those 3 images still need a row: seven full rows plus one partial row of 3. Dropping or filling the remainder both change what renders. Review: break it into parts.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-004",
      format: "multiple_choice",
      category: "decomposition",
      difficulty: "applied",
      stem: "A migration must move 4,120 records through an API that accepts 500 records per call and allows 3 calls per minute. Roughly how long does the migration take?",
      options: [
        { text: "About 3 minutes: 9 calls at 3 calls per minute", correct: true },
        {
          text: "About 1 minute: 4,120 over 500 rounds to 8, and 8 calls fit in a minute",
          correct: false,
        },
        { text: "About 9 minutes: one call per minute for 9 calls", correct: false },
        { text: "About 14 minutes: 4,120 over 300 per minute", correct: false },
      ],
      correctExplanation:
        "Correct. Two decompositions chained: 4,120 over 500 is 8 full calls plus a remainder call, so 9 calls; and 9 calls at 3 per minute is 3 minutes. The remainder call is the step most answers drop.",
      incorrectExplanation:
        "Not quite. Chain the units: 4,120 records over 500 per call is 9 calls once the remainder is kept, and 9 calls at 3 per minute is 3 minutes. Each wrong option drops the remainder, the rate, or a unit conversion. Review: break it into parts.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-005",
      format: "multiple_choice",
      category: "edge_cases",
      difficulty: "foundational",
      stem: "A profile page shows 'Member for N years'. Which user breaks the copy first?",
      options: [
        { text: "Someone who joined this week", correct: true },
        { text: "Someone who joined four years ago", correct: false },
        { text: "Someone who joined ten years ago", correct: false },
        { text: "Someone whose display name is very long", correct: false },
      ],
      correctExplanation:
        "Correct. The empty edge of 'years' is zero: 'Member for 0 years' is technically true and reads as broken. Four and ten are comfortable middle values, and a long display name is a different feature's edge.",
      incorrectExplanation:
        "Not quite. Four and ten years are the comfortable middle where demos live. The sweep starts at empty, and for a year count, empty is the person who joined this week: 'Member for 0 years' is the line nobody designed. Review: sweep the edges.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-006",
      format: "multiple_choice",
      category: "edge_cases",
      difficulty: "applied",
      stem: "A rate limiter allows 100 requests per user per hour. Which single case most needs a decided answer before launch?",
      options: [
        {
          text: "The 100th request: is the limit 'up to' or 'up to and including'?",
          correct: true,
        },
        { text: "A user who sends 40 requests in an hour", correct: false },
        { text: "A user who sends no requests at all", correct: false },
        { text: "Two users who send 50 requests each", correct: false },
      ],
      correctExplanation:
        "Correct. The boundary is the case where 'allows 100' is genuinely ambiguous: whether request number 100 succeeds depends on a definition nobody has stated yet. The middle cases resolve themselves; the boundary needs a decision.",
      incorrectExplanation:
        "Not quite. Forty requests, zero requests and two separate users all sit comfortably inside the rule as written. The case the rule does not decide is its own boundary: does request number 100 succeed? 'Up to' and 'up to and including' are different products. Review: sweep the edges.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-007",
      format: "multiple_choice",
      category: "estimation",
      difficulty: "foundational",
      stem: "A page makes 30 requests averaging 50 KB each. Roughly how much does the page transfer?",
      options: [
        { text: "About 1.5 MB", correct: true },
        { text: "About 150 KB", correct: false },
        { text: "About 15 MB", correct: false },
        { text: "About 500 KB", correct: false },
      ],
      correctExplanation:
        "Correct. 30 times 50 KB is 1,500 KB, which is 1.5 MB. Magnitude check by a second route: ten such requests are half a megabyte, so thirty are one and a half. Two routes, one answer.",
      incorrectExplanation:
        "Not quite. 30 times 50 is 1,500, and 1,500 KB is 1.5 MB. The wrong options are each a slipped power of ten or a dropped factor, which is exactly what the magnitude check exists to catch: ten requests would already be 500 KB. Review: check it twice, differently.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-1-QB-008",
      format: "multiple_choice",
      category: "estimation",
      difficulty: "applied",
      stem: "A teammate estimates that moving image compression from 'none' to 'good' will cut page weight by 90 percent. Images are half the page's weight. What does the extreme check say about the claim?",
      options: [
        {
          text: "Even removing images entirely could only cut the page by half, so 90 percent is impossible",
          correct: true,
        },
        { text: "The claim is plausible, because compression is very effective", correct: false },
        { text: "The claim cannot be checked without knowing the image formats", correct: false },
        { text: "The claim is right if the compression is lossless", correct: false },
      ],
      correctExplanation:
        "Correct. Push the input to its extreme: deleting every image outright removes half the page's weight, so no image-only change can cut more than half. The claim exceeds its ceiling, and the check takes one sentence.",
      incorrectExplanation:
        "Not quite. The extreme settles it without any format detail: images are half the weight, so removing them entirely, the strongest possible version of the change, cuts the page by half at most. A 90 percent claim from an image-only change is above its own ceiling. Review: check it twice, differently.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO4"],
      misconceptionTags: ["UIE-M-002"],
    },
    {
      id: "UIE-1-QB-009",
      format: "multiple_choice",
      category: "reasoning_communication",
      difficulty: "foundational",
      stem: "Two candidates reach the same wrong answer on a timed problem. Candidate A narrated each step and named an assumption; candidate B worked silently. Why does A typically score higher?",
      options: [
        {
          text: "The narrated path shows where the reasoning holds and where it slipped, which is what is being evaluated",
          correct: true,
        },
        { text: "Talking during an evaluation is scored as confidence", correct: false },
        { text: "A's answer counts as partially correct because it took longer", correct: false },
        { text: "Evaluators prefer candidates who speak more", correct: false },
      ],
      correctExplanation:
        "Correct. The score attaches to the path: a visible method with one slip predicts different future performance than silence with the same slip. Narration is evidence, not decoration, and it is the only evidence silence never produces.",
      incorrectExplanation:
        "Not quite. Volume of speech and elapsed time are not what is scored. The narrated path lets an evaluator see the method working and locate the single slip; silence leaves them only the wrong number. Review: reason out loud.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO5"],
      misconceptionTags: ["UIE-M-001"],
    },
    {
      id: "UIE-1-QB-010",
      format: "multiple_choice",
      category: "reasoning_communication",
      difficulty: "challenging",
      stem: "Under time pressure, you can either finish a rough answer to the whole problem or a checked answer to two-thirds of it, narrating either way. Most evaluation rubrics reward the second choice. Why?",
      options: [
        {
          text: "A verified partial result plus a stated plan for the rest shows the routine working end to end",
          correct: true,
        },
        { text: "Rubrics award points per minute of narration", correct: false },
        { text: "Complete answers are penalised when any part is rough", correct: false },
        { text: "Two-thirds is above the passing threshold on most rubrics", correct: false },
      ],
      correctExplanation:
        "Correct. The checked partial answer demonstrates every beat: restate, decompose, verify, and a narrated plan for the remainder. The rough complete answer demonstrates coverage without evidence, and evidence is what a rubric can score.",
      incorrectExplanation:
        "Not quite. Rubrics score demonstrated method, not minutes narrated or fractions completed. A verified partial answer with a stated plan is method end to end; a rough complete answer asks the evaluator to trust what was never shown. Review: reason out loud.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-1-LO5"],
      misconceptionTags: ["UIE-M-001"],
    },
  ],
};
