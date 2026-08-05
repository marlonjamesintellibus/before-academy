import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-2 designed interaction and retrieval step: real items, technique-first
 * feedback. Unlike UIE-1's judge-the-reasoning activity, these are the items
 * themselves; the learning lives in the feedback, which walks the family's
 * technique rather than announcing the letter.
 */
export const uie2ActivitySeed: ActivitySeed = {
  id: "UIE-2-ACT-001",
  title: "The drill room",
  intro:
    "Six classic items across the five families. Solve each one your way, then compare your route with the technique in the feedback.",
  instructions:
    "Classify the item first, apply the family's technique, check the planted trap, then answer. The feedback shows the route, not just the letter.",
  scenarios: [
    {
      id: "UIE-2-ACT-001-S01",
      position: 1,
      title: "Odd one out",
      body: "Which does not belong: 121, 144, 169, 180, 196?",
      difficulty: "foundational",
      clue: "run the fingerprint list before any arithmetic",
      prompt: "Which number breaks the pattern?",
      options: [
        {
          id: "one-eighty",
          label: "180",
          correct: true,
          feedback:
            "Correct. The other four are 11, 12, 13 and 14 squared. 180 sits between 169 and 196 without being a square, and the memorised fingerprint list catches it before any division does.",
        },
        {
          id: "one-two-one",
          label: "121",
          correct: false,
          feedback:
            "121 is 11 squared, which puts it inside the pattern, not outside it. The set is consecutive squares with one intruder: 180, the only value with no integer root.",
        },
        {
          id: "one-nine-six",
          label: "196",
          correct: false,
          feedback:
            "196 is 14 squared, the natural continuation of 11, 12, 13. The intruder is 180: every neighbour has an integer root and it does not.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-002",
    },
    {
      id: "UIE-2-ACT-001-S02",
      position: 2,
      title: "The cube run",
      body: "Complete the sequence: 8, 27, 64, 125, ___",
      difficulty: "foundational",
      clue: "the fingerprint list again: these are not random gaps",
      prompt: "What comes next?",
      options: [
        {
          id: "two-sixteen",
          label: "216",
          correct: true,
          feedback:
            "Correct. These are 2, 3, 4 and 5 cubed, so next is 6 cubed. Recognition beats the difference ladder here: the ladder eventually works, but the fingerprint answers instantly.",
        },
        {
          id: "one-ninety-six",
          label: "196",
          correct: false,
          feedback:
            "196 is a square fingerprint, 14 squared, pattern-matched onto a cube sequence. 8, 27, 64, 125 are consecutive cubes, and the next cube is 216. Classify first: squares and cubes are different families of fingerprint.",
        },
        {
          id: "two-fifty-six",
          label: "256",
          correct: false,
          feedback:
            "256 is a power of two, and the sequence is consecutive cubes: 2, 3, 4, 5, then 6 cubed, 216. When a sequence climbs this fast, ask which fingerprint list it matches before extending it.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-002",
    },
    {
      id: "UIE-2-ACT-001-S03",
      position: 3,
      title: "The invented language",
      body: "In a code, 'sky is blue' means 'pa ka lo', 'blue is deep' means 'lo ka mi', and 'deep sea sky' means 'mi to pa'. Which token means 'sea'?",
      difficulty: "applied",
      clue: "peel the shared words between sentence pairs first",
      prompt: "Which token is 'sea'?",
      options: [
        {
          id: "to",
          label: "to",
          correct: true,
          feedback:
            "Correct. Sentences one and two share 'blue' and 'is', so those are 'lo' and 'ka', making 'sky' equal 'pa'. Sentence three then pins 'deep' to 'mi' and 'sky' to 'pa', leaving 'sea' as the unclaimed 'to'.",
        },
        {
          id: "mi",
          label: "mi",
          correct: false,
          feedback:
            "'mi' appears in both 'blue is deep' and 'deep sea sky', and the word those sentences share is 'deep'. Intersection assigns tokens by what repeats, and after the shared words are peeled, 'sea' is the leftover: 'to'.",
        },
        {
          id: "pa",
          label: "pa",
          correct: false,
          feedback:
            "'pa' rides with 'sky' in both of its sentences. Work the intersections in order, shared words first, and every token but 'to' gets claimed by something that is not 'sea'. The leftover is the answer.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-004",
    },
    {
      id: "UIE-2-ACT-001-S04",
      position: 4,
      title: "The nonsense syllogism",
      body: "All bloops are razzies. All razzies are lazzies. Some lazzies are grumps. Which must be true?",
      difficulty: "applied",
      clue: "nonsense words force the circles: nothing else to lean on",
      prompt: "Which conclusion is forced?",
      options: [
        {
          id: "all-bloops-lazzies",
          label: "All bloops are lazzies",
          correct: true,
          feedback:
            "Correct. Bloops sit inside razzies, razzies inside lazzies, so bloops sit inside lazzies: the chain of two 'all' statements is airtight. The nonsense words are the point: the drawing carries everything.",
        },
        {
          id: "some-bloops-grumps",
          label: "Some bloops are grumps",
          correct: false,
          feedback:
            "The grump overlap attaches to lazzies, and you can draw it far from the bloops without breaking a premise. One legal drawing where it breaks is enough: not forced. What the circles do force is bloops inside lazzies.",
        },
        {
          id: "some-grumps-razzies",
          label: "Some grumps are razzies",
          correct: false,
          feedback:
            "The grumps overlap lazzies, but razzies may occupy a different part of the lazzie circle entirely. Draw it both ways and it breaks in one, so it is not forced. The two chained 'all' statements are the only guarantee here.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-003",
    },
    {
      id: "UIE-2-ACT-001-S05",
      position: 5,
      title: "The photograph",
      body: "Pointing to a photo, a man says: 'She is the daughter of my grandfather's only son.' How is she related to him?",
      difficulty: "applied",
      clue: "translate the innermost phrase first",
      prompt: "Who is she?",
      options: [
        {
          id: "sister",
          label: "His sister",
          correct: true,
          feedback:
            "Correct. 'My grandfather's only son' can only be his father, since an only son leaves no uncles. Her being 'the daughter of his father' makes her his sister. Innermost phrase first, and the sentence unwinds in two steps.",
        },
        {
          id: "cousin",
          label: "His cousin",
          correct: false,
          feedback:
            "A cousin would need the grandfather to have another son, and 'only son' closes that door. The only son is the speaker's father, so his father's daughter is his sister.",
        },
        {
          id: "daughter",
          label: "His daughter",
          correct: false,
          feedback:
            "His daughter would be 'my daughter'. Translate from the inside out: grandfather's only son is his father; the daughter of his father is his sister. The nesting is the whole puzzle.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-005",
    },
    {
      id: "UIE-2-ACT-001-S06",
      position: 6,
      title: "The cancelled match",
      body: "If it rains, the match is cancelled. The match was cancelled. What can be concluded about the rain?",
      difficulty: "challenging",
      clue: "the rule runs in one direction only",
      prompt: "Which conclusion is valid?",
      options: [
        {
          id: "may-or-may-not",
          label: "It may or may not have rained",
          correct: true,
          feedback:
            "Correct. The rule promises rain forces cancellation; it says nothing about what else cancels matches. A burst pipe cancels matches too. Affirming the consequent is the planted trap, and the one-direction reading disarms it.",
        },
        {
          id: "it-rained",
          label: "It rained",
          correct: false,
          feedback:
            "This reads the rule backwards. 'If rain then cancelled' does not mean 'if cancelled then rain': other causes remain legal. The honest conclusion is that the rain is undetermined.",
        },
        {
          id: "it-didnt",
          label: "It did not rain",
          correct: false,
          feedback:
            "Nothing supports this either: rain is fully consistent with the cancellation, it just is not proven by it. The rule constrains one direction, so the rain stays undetermined both ways.",
        },
      ],
      remediationAnchor: "UIE-2-LESSON-003",
    },
  ],
};

/** UIE-2 retrieval step: one item from each of the four most-drawn families. */
export const uie2CheckSeed: CheckSeed = {
  id: "UIE-2-CHK-001",
  label: "Practice check",
  intro: "Four items, four families. Nothing here is graded, and every answer walks the technique.",
  questions: [
    {
      id: "UIE-2-CHK-001-Q1",
      category: "sequences",
      difficulty: "foundational",
      learningOutcomes: ["UIE-2-LO1"],
      misconceptionTags: [],
      stem: "Complete the sequence: 2, 6, 12, 20, 30, ___",
      options: [
        { text: "42", correct: true },
        { text: "40", correct: false },
        { text: "44", correct: false },
        { text: "36", correct: false },
      ],
      correctFeedback:
        "The difference ladder reads 4, 6, 8, 10: gaps climbing by two, so the next gap is 12 and the answer is 42. One row settled it.",
      incorrectFeedback:
        "Run the ladder: gaps of 4, 6, 8, 10 climb by two each time, so the next gap is 12, landing on 42. Measure the gaps before guessing a formula.",
      chip: { label: "Sequences: build the difference ladder", anchor: "UIE-2-LESSON-002" },
    },
    {
      id: "UIE-2-CHK-001-Q2",
      category: "syllogisms",
      difficulty: "applied",
      learningOutcomes: ["UIE-2-LO2"],
      misconceptionTags: [],
      stem: "All designers are creatives. Some creatives are engineers. Which must be true?",
      options: [
        { text: "Some creatives are designers", correct: true },
        { text: "Some designers are engineers", correct: false },
        { text: "All engineers are creatives", correct: false },
        { text: "No engineers are designers", correct: false },
      ],
      correctFeedback:
        "The designer circle sits wholly inside creatives, so some creatives are certainly designers. Every other option can be broken by a legal drawing.",
      incorrectFeedback:
        "Draw the circles: designers inside creatives forces 'some creatives are designers' and nothing more. The engineer overlap can sit anywhere in the creative circle, so no conclusion about designers and engineers is forced.",
      chip: { label: "Syllogisms: draw the circles", anchor: "UIE-2-LESSON-003" },
    },
    {
      id: "UIE-2-CHK-001-Q3",
      category: "coding_decoding",
      difficulty: "foundational",
      learningOutcomes: ["UIE-2-LO3"],
      misconceptionTags: [],
      stem: "If MONDAY is coded as NPOEBZ and FRIDAY as GSJEBZ, what is SUNDAY?",
      options: [
        { text: "TVOEBZ", correct: true },
        { text: "TVNEBZ", correct: false },
        { text: "TWOEBZ", correct: false },
        { text: "SVOEBZ", correct: false },
      ],
      correctFeedback:
        "Both samples show plus one on every letter. S to T, U to V, N to O, D to E, A to B, Y to Z: TVOEBZ. Verify on two letters, apply to all.",
      incorrectFeedback:
        "The two samples both move every letter one step forward. Apply the same shift to SUNDAY letter by letter: S, U, N, D, A, Y become T, V, O, E, B, Z. The wrong options each slip one letter of the arithmetic.",
      chip: { label: "Codes: do position arithmetic", anchor: "UIE-2-LESSON-004" },
    },
    {
      id: "UIE-2-CHK-001-Q4",
      category: "quantitative_reasoning",
      difficulty: "applied",
      learningOutcomes: ["UIE-2-LO5"],
      misconceptionTags: ["UIE-M-003"],
      stem: "If 5 machines make 5 widgets in 5 minutes, how long do 100 machines take to make 100 widgets?",
      options: [
        { text: "5 minutes", correct: true },
        { text: "100 minutes", correct: false },
        { text: "20 minutes", correct: false },
        { text: "1 minute", correct: false },
      ],
      correctFeedback:
        "Reduce to one unit: one machine makes one widget in 5 minutes. A hundred machines each making one widget still take 5 minutes, in parallel. The per-unit step disarms the planted 100.",
      incorrectFeedback:
        "Reduce before scaling: one machine, one widget, 5 minutes. A hundred machines working at once each produce their widget in those same 5 minutes. The trap answer scales the count instead of the rate.",
      chip: { label: "Rates, clocks and trap arithmetic", anchor: "UIE-2-LESSON-006" },
    },
  ],
  completion: {
    body: "Four families, four techniques, and the fifth, arrangements, is waiting in the graded bank. When classifying an item feels faster than solving it used to, the drills have done their job.",
  },
};
