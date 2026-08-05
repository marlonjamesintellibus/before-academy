import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-2 graded bank: fifteen genuine logical ability items, three per family,
 * mirroring the real round's mix. Difficulty holds the blueprint proportions
 * (six foundational, seven applied, two challenging). Two items are fixedDraw:
 * the affirming-the-consequent syllogism and the cannot-be-determined
 * arrangement, because those two habits, direction of implication and honest
 * ambiguity, are the ones the round most reliably probes.
 */
export const uie2AssessmentSeed: AssessmentSeed = {
  id: "UIE-2-ASM-001",
  intro:
    "Six questions drawn from a fifteen-item bank across the five families. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-2-QB-001",
      format: "multiple_choice",
      category: "sequences",
      difficulty: "foundational",
      stem: "Complete the sequence: 1, 1, 2, 3, 5, 8, 13, ___",
      options: [
        { text: "21", correct: true },
        { text: "18", correct: false },
        { text: "20", correct: false },
        { text: "26", correct: false },
      ],
      correctExplanation:
        "Correct. Each term is the sum of the previous two, so 8 plus 13 gives 21. The additive fingerprint is worth recognising on sight; the difference ladder also reveals it, since the gaps repeat the sequence itself.",
      incorrectExplanation:
        "Not quite. Check the additive reading: 1 plus 1 is 2, 2 plus 3 is 5, 5 plus 8 is 13, so the next is 8 plus 13: 21. Review: build the difference ladder.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-002",
      format: "multiple_choice",
      category: "sequences",
      difficulty: "applied",
      stem: "Complete the sequence: 2, 3, 5, 9, 17, 33, ___",
      options: [
        { text: "65", correct: true },
        { text: "64", correct: false },
        { text: "66", correct: false },
        { text: "49", correct: false },
      ],
      correctExplanation:
        "Correct. The gaps run 1, 2, 4, 8, 16: doubling each time, so the next gap is 32 and the term is 65. One row of the ladder was enough.",
      incorrectExplanation:
        "Not quite. Ladder the gaps: 1, 2, 4, 8, 16. They double, so the next gap is 32, landing on 65. The near-miss options come from doubling the term instead of the gap. Review: build the difference ladder.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-003",
      format: "multiple_choice",
      category: "sequences",
      difficulty: "challenging",
      stem: "Complete the sequence: 3, 7, 16, 35, 74, ___",
      options: [
        { text: "153", correct: true },
        { text: "148", correct: false },
        { text: "143", correct: false },
        { text: "152", correct: false },
      ],
      correctExplanation:
        "Correct. Each term is double the previous plus a climbing counter: 3 times 2 plus 1, 7 times 2 plus 2, 16 times 2 plus 3, 35 times 2 plus 4, so next is 74 times 2 plus 5: 153. Roughly-doubling terms are the cue to leave the ladder for the multiplicative reading.",
      incorrectExplanation:
        "Not quite. The terms roughly double, which is the cue for multiply-and-adjust: each is twice the last plus 1, 2, 3, 4 in turn, so the next is 74 times 2 plus 5, which is 153. Review: build the difference ladder, and its multiplicative escape hatch.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO1"],
      misconceptionTags: [],
    },

    {
      id: "UIE-2-QB-004",
      format: "multiple_choice",
      category: "syllogisms",
      difficulty: "applied",
      stem: "No cats are dogs. All dogs are pets. Conclusion I: no cats are pets. Conclusion II: some pets are not cats. Which follows?",
      options: [
        { text: "Only II follows", correct: true },
        { text: "Only I follows", correct: false },
        { text: "Both follow", correct: false },
        { text: "Neither follows", correct: false },
      ],
      correctExplanation:
        "Correct. The dogs are pets and cannot be cats, so some pets are certainly not cats: II is forced. But cats may still be pets by another route, so I breaks in a legal drawing.",
      incorrectExplanation:
        "Not quite. Draw it: dogs sit inside pets and apart from cats. Those dog-pets are not cats, forcing II. Nothing separates cats from pets in general, so I is not forced. Review: draw the circles.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-005",
      format: "multiple_choice",
      category: "syllogisms",
      difficulty: "foundational",
      stem: "All bloops are razzies. All razzies are lazzies. Some lazzies are grumps. Which must be true?",
      options: [
        { text: "All bloops are lazzies", correct: true },
        { text: "Some bloops are grumps", correct: false },
        { text: "Some grumps are razzies", correct: false },
        { text: "No bloops are grumps", correct: false },
      ],
      correctExplanation:
        "Correct. Two chained 'all' statements nest the circles: bloops inside razzies inside lazzies. The grump overlap floats free and forces nothing about bloops or razzies, in either direction.",
      incorrectExplanation:
        "Not quite. The only airtight chain is bloops inside razzies inside lazzies, giving 'all bloops are lazzies'. The grump overlap can be drawn touching or missing the inner circles, so every grump conclusion breaks somewhere. Review: draw the circles.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-006",
      format: "multiple_choice",
      category: "syllogisms",
      difficulty: "applied",
      stem: "If it rains, the match is cancelled. The match was cancelled. Which conclusion is valid?",
      options: [
        { text: "It may or may not have rained", correct: true },
        { text: "It rained", correct: false },
        { text: "It did not rain", correct: false },
        { text: "The match was played", correct: false },
      ],
      correctExplanation:
        "Correct. The rule runs one direction: rain guarantees cancellation, but cancellation has other legal causes. Concluding rain from the cancellation is the planted trap, affirming the consequent.",
      incorrectExplanation:
        "Not quite. 'If rain then cancelled' says nothing about what a cancellation implies: other causes cancel matches too. The rain is undetermined either way, which is itself the valid conclusion. Review: draw the circles, and the direction of a rule.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO2"],
      misconceptionTags: ["UIE-M-003"],
    },

    {
      id: "UIE-2-QB-007",
      format: "multiple_choice",
      category: "coding_decoding",
      difficulty: "foundational",
      stem: "If MONDAY is coded as NPOEBZ and FRIDAY as GSJEBZ, what is SUNDAY?",
      options: [
        { text: "TVOEBZ", correct: true },
        { text: "TVNEBZ", correct: false },
        { text: "TWOEBZ", correct: false },
        { text: "SVOEBZ", correct: false },
      ],
      correctExplanation:
        "Correct. Both samples move every letter one step forward. SUNDAY letter by letter: T, V, O, E, B, Z. Verify the shift on two letters, then apply it mechanically.",
      incorrectExplanation:
        "Not quite. The samples establish plus one on every letter. Each wrong option slips exactly one letter of that arithmetic, which is how these items are built. S, U, N, D, A, Y shift to T, V, O, E, B, Z. Review: do position arithmetic.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-008",
      format: "multiple_choice",
      category: "coding_decoding",
      difficulty: "applied",
      stem: "Complete the letter series: AZ, CX, EV, GT, ___",
      options: [
        { text: "IR", correct: true },
        { text: "IS", correct: false },
        { text: "HR", correct: false },
        { text: "JR", correct: false },
      ],
      correctExplanation:
        "Correct. The two positions move independently: the first letter climbs 2 (A, C, E, G, I) while the second falls 2 (Z, X, V, T, R). Treat a letter pair as two sequences, not one.",
      incorrectExplanation:
        "Not quite. Split the pair into two independent series: first letters A, C, E, G step up by two, second letters Z, X, V, T step down by two. Next is I and R. Review: do position arithmetic, one end at a time.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-009",
      format: "multiple_choice",
      category: "coding_decoding",
      difficulty: "applied",
      stem: "In a code, 'sky is blue' means 'pa ka lo', 'blue is deep' means 'lo ka mi', and 'deep sea sky' means 'mi to pa'. Which token means 'sea'?",
      options: [
        { text: "to", correct: true },
        { text: "mi", correct: false },
        { text: "pa", correct: false },
        { text: "ka", correct: false },
      ],
      correctExplanation:
        "Correct. Sentences one and two share 'blue' and 'is', claiming 'lo' and 'ka'; that pins 'sky' to 'pa'. Sentence three then assigns 'deep' to 'mi', leaving 'sea' as the only unclaimed token: 'to'.",
      incorrectExplanation:
        "Not quite. Intersect the sentences: shared words claim shared tokens, so 'blue' and 'is' take 'lo' and 'ka', 'sky' takes 'pa', 'deep' takes 'mi'. The leftover token in 'deep sea sky' is 'to', and the leftover word is 'sea'. Review: peel the shared tokens first.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO3"],
      misconceptionTags: [],
    },

    {
      id: "UIE-2-QB-010",
      format: "multiple_choice",
      category: "arrangements",
      difficulty: "foundational",
      stem: "A is taller than B. C is shorter than B. D is taller than A. Who is shortest?",
      options: [
        { text: "C", correct: true },
        { text: "B", correct: false },
        { text: "A", correct: false },
        { text: "Cannot be determined", correct: false },
      ],
      correctExplanation:
        "Correct. Chain the statements onto one line: D above A above B above C. Every name has a fixed slot, so the sketch answers directly: C is shortest, and this one is fully determined.",
      incorrectExplanation:
        "Not quite. Draw the line: D over A over B over C, with no ambiguity left anywhere. When the sketch settles every position, 'cannot be determined' stops being available, and the bottom of the line is C. Review: draw it, anchors first.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-011",
      format: "multiple_choice",
      category: "arrangements",
      difficulty: "challenging",
      stem: "Five people sit in a row. X is immediately left of Y. Z is at the far right. W sits between X and Z. Where is Y relative to W?",
      options: [
        { text: "Cannot be determined", correct: true },
        { text: "Immediately left", correct: false },
        { text: "Immediately right", correct: false },
        { text: "Two seats left", correct: false },
      ],
      correctExplanation:
        "Correct. Two legal sketches exist: with X and Y in seats one and two, W can sit in seat three or seat four, putting Y immediately left of W in one picture and two seats away in the other. When the sketch stays ambiguous, the honest answer is the right one.",
      incorrectExplanation:
        "Not quite. Draw both pictures: Z holds seat five, X and Y pair up, and W has two legal seats between them and Z. Y's relation to W changes between the pictures, so no single answer is forced. 'Cannot be determined' is a real answer, and this item is built for it. Review: draw it, anchors first.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-012",
      format: "multiple_choice",
      category: "arrangements",
      difficulty: "foundational",
      stem: "Pointing to a photo, a man says: 'She is the daughter of my grandfather's only son.' How is she related to him?",
      options: [
        { text: "Sister", correct: true },
        { text: "Cousin", correct: false },
        { text: "Daughter", correct: false },
        { text: "Niece", correct: false },
      ],
      correctExplanation:
        "Correct. Innermost phrase first: 'my grandfather's only son' is his father, since 'only' rules out uncles. His father's daughter is his sister.",
      incorrectExplanation:
        "Not quite. Unwind from the inside: the grandfather's only son can only be the speaker's father ('only' closes the uncle route), and the daughter of his father is his sister. Review: draw it, anchors first, and translate the innermost phrase.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO4"],
      misconceptionTags: [],
    },

    {
      id: "UIE-2-QB-013",
      format: "multiple_choice",
      category: "quantitative_reasoning",
      difficulty: "foundational",
      stem: "A bat and a ball cost 1.10 together. The bat costs 1.00 more than the ball. What does the ball cost?",
      options: [
        { text: "0.05", correct: true },
        { text: "0.10", correct: false },
        { text: "0.15", correct: false },
        { text: "1.00", correct: false },
      ],
      correctExplanation:
        "Correct. Ball plus ball-plus-one equals 1.10, so two balls equal 0.10 and the ball is 0.05. Writing one line of algebra is the whole defence against the planted 0.10.",
      incorrectExplanation:
        "Not quite. Check the trap: a 0.10 ball makes the bat 1.10 and the pair 1.20. Set it up instead: two balls plus 1.00 equals 1.10, so the ball is 0.05. Review: trap arithmetic, and the one-line check.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO5"],
      misconceptionTags: ["UIE-M-003"],
    },
    {
      id: "UIE-2-QB-014",
      format: "multiple_choice",
      category: "quantitative_reasoning",
      difficulty: "applied",
      stem: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: [
        { text: "7.5 degrees", correct: true },
        { text: "0 degrees", correct: false },
        { text: "15 degrees", correct: false },
        { text: "22.5 degrees", correct: false },
      ],
      correctExplanation:
        "Correct. The minute hand sits at 90 degrees. The hour hand moves half a degree per minute, so fifteen minutes past three puts it at 97.5. The gap is 7.5 degrees, and 'zero' is the planted answer.",
      incorrectExplanation:
        "Not quite. The hour hand never waits at the 3: it creeps half a degree per minute, reaching 97.5 degrees at quarter past while the minute hand sits at 90. The gap is 7.5 degrees. Review: rates, clocks and trap arithmetic.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-2-QB-015",
      format: "multiple_choice",
      category: "quantitative_reasoning",
      difficulty: "applied",
      stem: "Two trains 90 km apart drive toward each other, one at 40 km per hour and the other at 80. How far does the slower train travel before they meet?",
      options: [
        { text: "30 km", correct: true },
        { text: "45 km", correct: false },
        { text: "60 km", correct: false },
        { text: "40 km", correct: false },
      ],
      correctExplanation:
        "Correct. They close at 120 km per hour, so the meeting comes at 45 minutes, and the slower train covers 40 times three-quarters: 30 km. Equivalently, it always covers its share of the gap, 40 over 120, one third of 90. Notice the item needs the 90: asked without a separation, only the one-third share is knowable.",
      incorrectExplanation:
        "Not quite. Closing speed is the sum, 120 km per hour, so they meet after 45 minutes, in which the slower train covers 30 km. The share route agrees: 40 over 120 is one third of the 90 km gap. Review: rates, clocks and trap arithmetic, and per-unit reduction.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-2-LO5"],
      misconceptionTags: [],
    },
  ],
};
