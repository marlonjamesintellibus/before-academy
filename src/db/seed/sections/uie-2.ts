import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-2: Logical Ability, the GQ item families themselves.
 *
 * UIE-1 teaches the reasoning routine; this section teaches the five families
 * the Logical Ability round actually draws from, one technique per family:
 * sequences (difference ladders), syllogisms (draw the circles), codes
 * (position arithmetic), arrangements (draw the line, anchor first), and the
 * rate/clock/trap-arithmetic cluster. Several worked examples are the classic
 * items themselves, because recognising a family on sight is half the speed.
 *
 * The timed round is out of scope until the platform gains a timer; every
 * drill here is untimed with free retakes, per the current learning model.
 */
export const uie2Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "logical-ability",
    title: "Logical Ability",
    description:
      "The five families the logical ability round draws from, and one reliable technique for each: sequences, syllogisms, codes, arrangements, and trap arithmetic.",
    position: 2,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-2-LESSON-001-HOOK",
      prompt:
        "A bat and a ball cost 1.10 together. The bat costs 1.00 more than the ball. What does the ball cost?",
      choices: ["0.10", "0.05", "It cannot be worked out from this"],
      reveal:
        "0.05. If the ball were 0.10, the bat would be 1.10 and the pair would cost 1.20. Write it as algebra and the pull disappears: ball plus ball-plus-one equals 1.10, so two balls equal 0.10. This item appears in evaluations precisely because the wrong answer feels effortless, and every family in this section has a trap built the same way.",
    },
    {
      type: "why_it_matters",
      id: "UIE-2-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "The logical ability round is not a general intelligence measure, whatever it feels like on the day. It draws from a small set of item families, each with a learnable technique, and the difference between a stressed attempt and a calm one is usually whether you recognised the family before you started solving. This section names the families and hands you one technique for each.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-2-LESSON-001-OBJ",
      items: [
        "Crack number sequences with a difference ladder before guessing a formula",
        "Judge syllogisms by drawing the circles, separating must-be-true from could-be-true",
        "Decode letter ciphers with alphabet position arithmetic",
        "Solve arrangement and relation puzzles by drawing them, anchors first",
        "Disarm rate, clock and trap-arithmetic items with per-unit reasoning",
      ],
    },

    {
      type: "concept",
      id: "UIE-2-LESSON-002",
      title: "Sequences: build the difference ladder",
      objective: "Find the rule by measuring gaps, not by staring at the numbers.",
      minutes: 4,
      completion:
        "You can run a difference ladder and recognise squares, cubes and doublings on sight.",
      quick: [
        {
          type: "p",
          text: "Write the gaps between terms; if those gaps have no visible rule, write the gaps of the gaps. Most sequence items surrender by the second row. Take 2, 6, 12, 20, 30: the gaps are 4, 6, 8, 10, so the next gap is 12 and the answer is 42.",
        },
        {
          type: "p",
          text: "When the ladder does not settle, try the multiplicative reading: is each term roughly double the last? 3, 7, 16, 35, 74 resists differences, but each term is twice the previous plus a counter that climbs 1, 2, 3, 4, so the next is 74 times 2 plus 5: 153.",
        },
        {
          type: "ul",
          items: [
            "Row one: the differences; row two: differences of differences",
            "Memorise the fingerprints: squares to 225, cubes to 216, primes to 47",
            "Roughly doubling terms mean multiply-and-adjust, not add",
            "Letter sequences are number sequences wearing letters: convert to positions",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Odd-one-out items are the same skill inverted: 121, 144, 169, 180, 196 are all perfect squares except 180. The fingerprint list settles it in seconds, which is why it is worth memorising rather than deriving.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-2-LESSON-002-CHECK",
      prompt: "Complete the sequence: 2, 3, 5, 9, 17, 33, ___",
      correctOptionId: "sixtyfive",
      options: [
        {
          id: "sixtyfive",
          text: "65",
          feedback:
            "Correct. The difference ladder reads 1, 2, 4, 8, 16: each gap doubles, so the next gap is 32 and the answer is 65. One row of differences was enough.",
        },
        {
          id: "sixtyfour",
          text: "64",
          feedback:
            "64 comes from doubling the last term, which the sequence never quite does. Run the ladder instead: gaps of 1, 2, 4, 8, 16 point to a gap of 32, landing on 65.",
        },
        {
          id: "fortynine",
          text: "49",
          feedback:
            "49 extends the gaps arithmetically, but the gaps are not climbing by a constant: they double. 1, 2, 4, 8, 16, then 32, giving 65. The second look at the ladder is the technique.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-2-LESSON-003",
      title: "Syllogisms: draw the circles",
      objective: "Separate what must be true from what merely could be.",
      minutes: 5,
      completion:
        "You can draw a premise pair as circles and reject every conclusion the drawing does not force.",
      quick: [
        {
          type: "p",
          text: "Sketch each statement as circles: 'all A are B' puts circle A inside circle B; 'some A are B' overlaps them; 'no A are B' pulls them apart. A conclusion must be true only if every legal drawing forces it. If you can draw one legal picture where the conclusion breaks, it does not follow.",
        },
        {
          type: "p",
          text: "Worked: all designers are creatives, some creatives are engineers. 'Some designers are engineers' is tempting, but you can draw the engineer overlap entirely outside the designer circle, so it is not forced. What is forced: some creatives are designers, because the designer circle sits wholly inside creatives.",
        },
        {
          type: "ul",
          items: [
            "'Some' works both directions: some A are B means some B are A",
            "'All A are B' does not reverse: it only guarantees some B are A",
            "Two 'some' statements never chain into anything",
            "The moment one legal drawing breaks a conclusion, reject it",
          ],
        },
        {
          type: "analogy",
          text: "A conclusion that must be true is like a layout that survives every screen size: one counterexample viewport and the claim is dead. Syllogism items hand you premises and ask which conclusions are responsive in that sense.",
          boundary:
            "The analogy stops at discovery: viewports are enumerable and drawings are not, so the discipline is to actively hunt for the breaking drawing rather than admire the first one that works.",
        },
      ],
    },
    {
      type: "inline_check",
      id: "UIE-2-LESSON-003-CHECK",
      prompt:
        "No cats are dogs. All dogs are pets. Conclusion I: no cats are pets. Conclusion II: some pets are not cats. Which follows?",
      correctOptionId: "onlytwo",
      options: [
        {
          id: "onlytwo",
          text: "Only II follows",
          feedback:
            "Correct. The dogs sit inside pets and wholly outside cats, so those pets are not cats: II is forced. But nothing stops cats from also being pets, so I breaks in a perfectly legal drawing.",
        },
        {
          id: "onlyone",
          text: "Only I follows",
          feedback:
            "Draw it: cats can overlap pets without touching dogs, so 'no cats are pets' breaks. Meanwhile the dogs are pets that cannot be cats, which forces II. The circles reverse this answer.",
        },
        {
          id: "both",
          text: "Both follow",
          feedback:
            "II is forced, but I fails the drawing hunt: a cat that is also a pet violates nothing in the premises. One breaking drawing is enough to reject a conclusion, so only II survives.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-2-LESSON-004",
      title: "Codes: do position arithmetic",
      objective: "Turn letters into numbers, find the shift, apply it.",
      minutes: 4,
      completion:
        "You can crack shift ciphers, paired-end series and substitution word codes with one method each.",
      quick: [
        {
          type: "p",
          text: "Most letter codes are arithmetic in disguise. CODE becoming DPEF is every letter moved one step forward, so HTML becomes IUNM. Check the shift on two letters before trusting it, then apply it mechanically: MONDAY to NPOEBZ confirms the same plus-one, so SUNDAY is TVOEBZ.",
        },
        {
          type: "p",
          text: "Substitution word codes yield to intersection: if 'sky is blue' is 'pa ka lo' and 'blue is deep' is 'lo ka mi', the shared words carry the shared tokens, so 'blue' and 'is' are 'lo' and 'ka', leaving 'sky' as 'pa'. Then 'deep sea sky' as 'mi to pa' pins 'deep' to 'mi' and leaves 'sea' as 'to'.",
        },
        {
          type: "ul",
          items: [
            "Convert to alphabet positions and subtract: the shift shows itself",
            "Paired series like AZ, CX, EV move the two ends independently: plus 2 and minus 2 give IR",
            "Word codes: intersect the sentences, peel the shared tokens first",
            "Calendar and initial-letter series are lookups, not arithmetic: J, F, M, A is the months",
          ],
        },
      ],
    },
    {
      type: "inline_check",
      id: "UIE-2-LESSON-004-CHECK",
      prompt: "If CODE is written as DPEF, how is HTML written?",
      correctOptionId: "iunm",
      options: [
        {
          id: "iunm",
          text: "IUNM",
          feedback:
            "Correct. The sample pair shows plus one on every letter: C to D, O to P. Apply it: H to I, T to U, M to N, L to M. Two letters to find the rule, four to apply it.",
        },
        {
          id: "iumn",
          text: "IUMN",
          feedback:
            "The last two letters are swapped: M shifts to N and L shifts to M, in that order. The cipher moves each letter where it stands; it never reorders. Position arithmetic, applied one letter at a time, gives IUNM.",
        },
        {
          id: "huml",
          text: "HUML",
          feedback:
            "This shifts only one letter. The sample pair CODE to DPEF moves every letter forward by one, so all four letters of HTML move: IUNM. Verify the rule on two letters, then apply it to all of them.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-2-LESSON-005",
      title: "Arrangements: draw it, anchors first",
      objective: "Replace mental juggling with a sketch that answers for you.",
      minutes: 5,
      completion:
        "You can solve line-ups, orderings and family relations on paper, and say 'cannot be determined' with confidence when the sketch stays ambiguous.",
      quick: [
        {
          type: "p",
          text: "Never hold an arrangement in your head: draw slots and fill the fixed positions first, then the relative ones. Height orderings chain the same way: A taller than B, C shorter than B, D taller than A collapses onto one line as D, A, B, C, and the shortest is read off the end, not reasoned about.",
        },
        {
          type: "p",
          text: "Family relation items compress once you translate the anchor phrase: 'my grandfather's only son' is my father, so 'the daughter of my grandfather's only son' is my father's daughter, which makes her my sister. Translate the innermost phrase first and the sentence unwinds.",
        },
        {
          type: "ul",
          items: [
            "Draw the slots; place absolute positions before relative ones",
            "In circles, fix one seat and note which way people face before placing anyone",
            "If the sketch admits two different pictures, the answer is 'cannot be determined'",
            "That option is a real answer, not a concession: some items are built for it",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Worked ambiguity: five seats, Z at the far right, X immediately left of Y, W somewhere between X and Z. Two legal pictures exist, with Y immediately left of W in one and two seats away in the other. The sketch does not settle it, so the honest answer is 'cannot be determined', and drawing is what earns the confidence to say so.",
          },
        ],
      },
    },
    {
      type: "misconception",
      id: "UIE-2-LESSON-005-MISCONCEPTION",
      misconceptionId: "UIE-M-003",
      claim: "Logical ability rounds measure raw intelligence, so practice cannot move the score.",
      correction:
        "The items draw from a handful of families, each with a small technique: difference ladders, circle drawings, position arithmetic, slot sketches, per-unit rates. Recognising the family and applying its technique is trainable, and speed follows recognition, not the other way round.",
    },

    {
      type: "concept",
      id: "UIE-2-LESSON-006",
      title: "Rates, clocks and trap arithmetic",
      objective: "Reduce to per-unit quantities and let the units do the work.",
      minutes: 5,
      completion:
        "You can solve machine-rate, clock-angle and meeting-point items, and spot when a given is missing.",
      quick: [
        {
          type: "p",
          text: "Reduce to one unit before scaling. Five machines make five widgets in five minutes: one machine makes one widget in five minutes, so a hundred machines make a hundred widgets in the same five minutes. The trap answer, one hundred minutes, comes from scaling the wrong number.",
        },
        {
          type: "p",
          text: "Clock angles: the minute hand moves 6 degrees a minute, the hour hand 0.5. At 3:15 the minute hand sits at 90 and the hour hand has crept to 97.5, so the angle is 7.5 degrees, not zero. The hour hand never waits at the hour mark.",
        },
        {
          type: "p",
          text: "Approach items: two trains closing at 40 and 80 combine to 120, and the slower one covers 40 over 120, one third, of whatever distance separated them. Notice what that sentence needs: the separation. Asked without it, the only correct answer is that the distance travelled cannot be determined, only the share. Evaluations plant that missing-given trap deliberately.",
        },
      ],
    },
    {
      type: "diagram",
      id: "UIE-2-LESSON-006-DIAGRAM",
      title: "The timed-item loop",
      claim: "What to do with each item when the clock is real.",
      altText: "The five-step loop for working through timed logical ability items",
      longText:
        "The loop runs five steps per item. Classify: name the family before solving, since the family picks the technique. Apply: run that family's technique, difference ladder, circles, position arithmetic, sketch, or per-unit reduction. Check the trap: the tempting answer usually exists by design, so ask what it would take for it to be right. Commit: answer and move to the next item rather than polishing. Flag and return: if an item resists twice, mark a guess, note it, and spend the remaining time where it buys marks.",
      layers: [
        {
          id: "classify",
          label: "Classify",
          description:
            "Name the family first: sequence, syllogism, code, arrangement, or rate. The family picks the technique, and recognition is faster than derivation.",
        },
        {
          id: "apply",
          label: "Apply",
          description:
            "Run the family's technique mechanically: the ladder, the circles, the position arithmetic, the sketch, the per-unit reduction.",
        },
        {
          id: "trap",
          label: "Check the trap",
          description:
            "The tempting answer is usually planted. One sentence: what would have to be true for it to be right?",
        },
        {
          id: "commit",
          label: "Commit",
          description:
            "Answer and move on. Polishing a solved item spends time the unsolved ones need.",
        },
        {
          id: "flag",
          label: "Flag and return",
          description:
            "An item that resists twice gets a marked guess and a note. Return only if time remains: marks live where items are unsolved.",
        },
      ],
      predict: {
        prompt:
          "You are ninety seconds into an item budgeted for forty-five, with no answer in sight. What does the loop say to do?",
        options: [
          { text: "Mark a guess, flag it, and move to the next item", correct: true },
          { text: "Stay until it cracks: momentum matters", correct: false },
          { text: "Restart the item from scratch with a fresh read", correct: false },
        ],
        revealLabel: "Walk the loop and see where the time goes:",
      },
    },
    {
      type: "inline_check",
      id: "UIE-2-LESSON-006-CHECK",
      prompt: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      correctOptionId: "sevenfive",
      options: [
        {
          id: "sevenfive",
          text: "7.5 degrees",
          feedback:
            "Correct. The minute hand is at 90 degrees. The hour hand left the 3 mark when the hour began and has crept a quarter of the way to the 4: 90 plus 7.5. The gap is 7.5 degrees.",
        },
        {
          id: "zero",
          text: "0 degrees",
          feedback:
            "This is the planted trap: the hands only align near 3:16, not at quarter past. The hour hand moves 0.5 degrees per minute, so fifteen minutes into the hour it has crept 7.5 degrees past the 3.",
        },
        {
          id: "fifteen",
          text: "15 degrees",
          feedback:
            "This doubles the hour hand's creep. It moves half a degree per minute, so fifteen minutes give 7.5 degrees, and that is the whole gap, since the minute hand sits exactly on the 3.",
        },
      ],
    },

    {
      type: "takeaway",
      id: "UIE-2-LESSON-007-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Five families, five techniques: ladder the sequences, draw the syllogisms, do arithmetic on the codes, sketch the arrangements, and reduce rates to one unit. Classify before you solve, check the planted trap before you commit, and let 'cannot be determined' be a real answer. The drills run every family until recognition is instant.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-2-LESSON-007-ACT",
      body: "Six classic items across the five families. Solve each one, then compare your route with the technique the feedback walks through.",
    },
    {
      type: "check_cta",
      id: "UIE-2-LESSON-007-CHECK",
      body: "Four short items, one from each of the most-drawn families. Nothing is graded, and every answer shows the technique, not just the letter.",
    },
    {
      type: "next_step",
      id: "UIE-2-LESSON-007-NEXT",
      body: "With the routine from Logic and Reasoning and the five families from this section, the graded bank here mirrors the real round's mix. Timed drills join the platform later; until then, practise the loop with your own clock beside you.",
    },
  ],
  glossary: [],
};
