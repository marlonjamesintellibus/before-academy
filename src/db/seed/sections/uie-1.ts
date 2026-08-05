import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-1: Logic and Reasoning, the first module of the UI Engineer Readiness
 * pilot (readiness evaluation deck, "Content Modules" slide; pilot plan:
 * define, pilot, expand).
 *
 * This is the one module of the six that ships on the existing engine with no
 * code rendering, which is why it goes first: it buys real engagement signal
 * before the platform invests in code blocks and timers for the rest.
 *
 * The section teaches the reasoning routine that evaluators actually score:
 * restate, decompose, sweep the edges, verify by a second route, and narrate.
 * Every worked example is a UI engineering situation, but none requires
 * reading code, by design.
 */
export const uie1Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "logic-and-reasoning",
    title: "Logic and Reasoning",
    description:
      "The routine behind strong answers under pressure: restate the problem, break it down, sweep the edges, and check your result before you commit to it.",
    position: 1,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-1-LESSON-001-HOOK",
      prompt:
        "A page takes 2 seconds to load: 1 second of server work and 1 second of everything else. Caching cuts the server work in half. How long does the page take now?",
      choices: ["1 second", "1.5 seconds", "It cannot be worked out from this"],
      reveal:
        "1.5 seconds. Caching halves only the server second, so half a second is saved and the other second is untouched. The pull toward '1 second' is the point: the appealing answer skips the structure of the problem. Noticing that pull, and pausing on it, is the skill this whole section trains.",
    },
    {
      type: "why_it_matters",
      id: "UIE-1-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Interview evaluations score the path you take, not just the answer you land on. A candidate who restates the problem, names their assumptions and checks their result reads as someone safe to hand real work to. The same routine is what debugging and estimation demand on the job, so nothing here is interview theatre.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-1-LESSON-001-OBJ",
      items: [
        "Restate a problem in your own words and separate what is given from what is assumed",
        "Break an unfamiliar problem into parts you can solve in order",
        "Sweep the edges: empty, one, boundary, many, invalid",
        "Check an answer by a second route before committing to it",
        "Narrate your reasoning so an evaluator can follow the path",
      ],
    },

    {
      type: "concept",
      id: "UIE-1-LESSON-002",
      title: "What is actually being asked",
      objective: "Separate what the problem states from what you are adding to it.",
      minutes: 4,
      completion:
        "You can restate a problem in your own words and name the assumptions you were about to make.",
      quick: [
        {
          type: "p",
          text: "Most wrong answers are correct answers to a different problem. The caching question above catches people because they answer 'caching makes pages faster' instead of the question that was asked, which had a structure: two parts, only one of them touched.",
        },
        {
          type: "p",
          text: "The counter is a slow first read. Restate the problem in your own words, list what is actually given, and name what is not stated. Anything not stated that your answer depends on is an assumption, and assumptions are fine when they are said out loud and dangerous when they are silent.",
        },
        {
          type: "ul",
          items: [
            "Restate the problem in one sentence of your own",
            "List the givens: the numbers, constraints and definitions actually present",
            "Name what is not stated but matters to the answer",
            "Say your assumptions aloud before building on them",
          ],
        },
        {
          type: "analogy",
          text: "A ticket that says 'make the table sortable' hides at least three questions: which columns, what order for ties, and what happens to the user's scroll position. Reading an interview problem is reading that ticket: the visible sentence is not the whole requirement.",
          boundary:
            "The analogy stops at negotiation. A ticket can be clarified with the person who wrote it over a day; in an evaluation you surface the same questions in a minute, choose a reasonable assumption, and continue.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "A useful prompt when a problem sounds too straightforward: what would have to be true for the tempting answer to be right? For '1 second' to be right above, caching would have to remove the whole non-server second too. Saying that sentence out loud is usually enough to reject it.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-1-LESSON-002-CHECK",
      prompt:
        "An interviewer says: 'Our checkout loses 3 percent of its sessions at each step, and there are 4 steps. Roughly what fraction of sessions finish?' What is the strongest first move?",
      correctOptionId: "confirm",
      options: [
        {
          id: "confirm",
          text: "Confirm what 'loses 3 percent at each step' means before calculating",
          feedback:
            "Correct. Per-step loss compounds: each step keeps 97 percent of what reaches it, which is not the same as losing 12 percent overall. Confirming the definition first is constraint reading, and it changes the arithmetic that follows.",
        },
        {
          id: "multiply",
          text: "Multiply 0.97 by itself four times and give the result",
          feedback:
            "The arithmetic is right for one reading of the sentence. But you have not yet confirmed that reading, and an answer built on an unconfirmed reading inherits its risk. Confirm first, then this calculation is the correct second move.",
        },
        {
          id: "subtract",
          text: "Subtract 12 percent from 100 and answer 88 percent",
          feedback:
            "This treats per-step loss as if it adds up linearly. Compounding is the trap the question hides: each step keeps 97 percent of what reaches it, so the honest path is to confirm the meaning, then multiply, not add.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-1-LESSON-003",
      title: "Break it into parts",
      objective:
        "Turn one unfamiliar problem into a sequence of parts you already know how to solve.",
      minutes: 4,
      completion:
        "You can decompose a problem into ordered parts and handle the remainder deliberately.",
      quick: [
        {
          type: "p",
          text: "An unfamiliar problem is rarely new all the way through. It is usually familiar parts in an unfamiliar arrangement. Decomposition is finding that arrangement: solve the smallest version, find the repeating unit, handle the remainder, and only then generalise.",
        },
        {
          type: "p",
          text: "A worked example: a list of 137 items shows 12 per page. How many pages? The repeating unit is a full page, and 137 divided by 12 gives 11 full pages with 5 items left over. The remainder is not noise, it is a page: 12 pages. Most decomposition mistakes are dropped remainders.",
        },
        {
          type: "ul",
          items: [
            "Solve it for one item before solving it for many",
            "Find the repeating unit and count the repeats",
            "Handle the remainder as a deliberate step, never by rounding",
            "Generalise last, after the small version works",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The same shape appears everywhere in UI work: how many rows fit in a viewport, how many requests a batch needs, how many columns a grid can hold. The surface changes, the moves do not: unit, repeats, remainder.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-1-LESSON-003-CHECK",
      prompt:
        "A progress indicator updates after every 5th completed task in a run of 45 tasks. How many updates happen?",
      correctOptionId: "nine",
      options: [
        {
          id: "nine",
          text: "9 updates",
          feedback:
            "Correct. The repeating unit is 5 completed tasks, and 45 divides into exactly 9 of them, with no remainder to handle. Checking whether the division is exact is the step that makes this answer safe rather than lucky.",
        },
        {
          id: "eight",
          text: "8 updates",
          feedback:
            "This is the fence-post trap: counting the gaps between updates rather than the updates. The unit is 5 completed tasks and 45 contains 9 of them. Recount the units, not the spaces between them.",
        },
        {
          id: "ten",
          text: "10 updates",
          feedback:
            "This adds an update at the start, before any task has completed. The rule says after every 5th completed task, so the first update happens at task 5 and the last at task 45: nine in total. The definition of the unit settles it.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-1-LESSON-004",
      title: "Sweep the edges",
      objective: "Run the five-point sweep that catches most breakage before it ships.",
      minutes: 5,
      completion: "You can sweep empty, one, boundary, many and invalid on any feature you meet.",
      quick: [
        {
          type: "p",
          text: "Demos live in the middle of the input range; incidents live at its edges. The middle is where every list has a comfortable number of items and every date is this week. Evaluators probe the edges deliberately, because that is where reasoning quality shows.",
        },
        {
          type: "p",
          text: "The sweep is five questions asked in order: what happens with nothing, with exactly one, exactly at the limit, far past the limit, and with input that should never exist. It takes under a minute to say and catches the majority of breakage a feature will ever produce.",
        },
      ],
    },
    {
      type: "diagram",
      id: "UIE-1-LESSON-004-DIAGRAM",
      title: "The edge-case sweep",
      claim: "Five checks, asked in order, that catch most breakage before it ships.",
      altText: "The five-step edge-case sweep as a sequence of checks",
      longText:
        "The sweep runs five checks in order. Empty: no items at all, where layouts collapse and averages divide by zero. One: a single item, where separators, plurals and averages behave differently. Boundary: exactly at the limit, like the 12th item on a 12-per-page list. Many: far past the limit, where overflow, truncation and slow paths appear. Invalid: input that should never exist, like a negative count or a malformed date, which arrives anyway.",
      layers: [
        {
          id: "empty",
          label: "Empty",
          description:
            "No items at all. Layouts collapse, averages divide by zero, and 'no results' turns out to be a screen nobody designed.",
        },
        {
          id: "one",
          label: "One",
          description:
            "Exactly one item. Separators have nothing to separate, plurals read wrong, and an average of one value hides in plain sight.",
        },
        {
          id: "boundary",
          label: "Boundary",
          description:
            "Exactly at the limit: the 12th item on a 12-per-page list, the last character that fits. Off-by-one lives here.",
        },
        {
          id: "many",
          label: "Many",
          description:
            "Far past the limit. Overflow, truncation, and the slow path you never saw in a demo all arrive together.",
        },
        {
          id: "invalid",
          label: "Invalid",
          description:
            "Input that should never exist: a negative count, a malformed date, a user id that no longer resolves. It arrives anyway.",
        },
      ],
      predict: {
        prompt:
          "A list view worked in every demo, then broke on the first day of real use. Which input most likely did it?",
        options: [
          { text: "An empty list", correct: true },
          { text: "A list of exactly ten items", correct: false },
          { text: "A moderately long list", correct: false },
        ],
        revealLabel: "Walk the sweep and see where demos never go:",
      },
    },
    {
      type: "inline_check",
      id: "UIE-1-LESSON-004-CHECK",
      prompt: "A report covers 'the last 7 days'. Which question exposes the boundary?",
      correctOptionId: "today",
      options: [
        {
          id: "today",
          text: "Does today count as one of the 7 days?",
          feedback:
            "Correct. Whether the window is 'today plus six' or 'the seven days before today' changes every number in the report by one day of data. That is a boundary question, and it has no default answer: someone has to decide.",
        },
        {
          id: "format",
          text: "Should the dates be shown in ISO format?",
          feedback:
            "Formatting matters for readability, but every choice of format leaves the numbers identical. The question that changes the data is where the 7-day window starts and ends, which is the boundary.",
        },
        {
          id: "rows",
          text: "How many rows should each page of the report show?",
          feedback:
            "Page size is a presentation decision. The window boundary decides what data exists to paginate at all, so it comes first: does today count as one of the 7 days?",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-1-LESSON-005",
      title: "Check it twice, differently",
      objective: "Verify an answer by a second route before you commit to it.",
      minutes: 4,
      completion:
        "You can sanity-check a result by magnitude, by units, or by an extreme, in under a minute.",
      quick: [
        {
          type: "p",
          text: "The trap answer arrives fast and feels fluent. That feeling is not evidence. The reliable defence is a second route to the same result: check the magnitude, check the units, or push the problem to an extreme and see whether your answer still makes sense there.",
        },
        {
          type: "ul",
          items: [
            "Magnitude: is the answer in the right power of ten?",
            "Units: do the units of your calculation actually produce the units of the answer?",
            "Extremes: set an input to zero or to something huge, and see if the answer behaves",
            "A second route that agrees is strong evidence; one route however confident is not",
          ],
        },
        {
          type: "p",
          text: "In the caching problem, the extreme check settles it in one line: if caching removed server time entirely, the page would still take 1 second, because the other second is untouched. So halving server time cannot possibly reach 1 second. The trap answer dies at the extreme.",
        },
      ],
    },
    {
      type: "misconception",
      id: "UIE-1-LESSON-005-MISCONCEPTION",
      misconceptionId: "UIE-M-001",
      claim: "In an evaluation, answering fast is what demonstrates skill.",
      correction:
        "Evaluators score the path: restating, decomposing, sweeping the edges, checking. A measured answer with a visible check outscores a fast answer that cannot say why it is right, because the visible path is what predicts how you will handle problems nobody has rehearsed.",
    },
    {
      type: "inline_check",
      id: "UIE-1-LESSON-005-CHECK",
      prompt: "Roughly how many 40 KB images fit in a 100 MB storage budget?",
      correctOptionId: "twofive",
      options: [
        {
          id: "twofive",
          text: "About 2,500",
          feedback:
            "Correct. 100 MB is 100,000 KB, and 100,000 divided by 40 is 2,500. The magnitude check confirms it: a thousand images at 40 KB would use 40 MB, so the budget holds a couple of thousand and more. Two routes, same answer.",
        },
        {
          id: "twofifty",
          text: "About 250",
          feedback:
            "This is one power of ten short, which is the most common estimation slip. Run the magnitude check: 250 images at 40 KB is only 10 MB, a tenth of the budget. The check catches the slip before an evaluator does.",
        },
        {
          id: "twentyfive",
          text: "About 25,000",
          feedback:
            "One power of ten too far. 25,000 images at 40 KB would need 1,000 MB, ten times the budget. Units first: convert 100 MB into KB before dividing, and the powers of ten stop moving around.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-1-LESSON-006",
      title: "Reason out loud",
      objective: "Narrate the routine so an evaluator can score the path, not just the answer.",
      minutes: 3,
      completion:
        "You can structure an answer as restate, plan, execute, verify, and keep narrating through a wrong turn.",
      quick: [
        {
          type: "p",
          text: "Everything this section built is invisible unless you say it. The narration structure is four beats: restate the problem, state your plan, execute it, and verify the result. Each beat is one or two sentences, and together they are the difference between an evaluator watching you think and watching you type.",
        },
        {
          type: "ul",
          items: [
            "Restate: 'So the question is whether the window includes today.'",
            "Plan: 'I will work out one page first, then count pages.'",
            "Execute: the arithmetic or the reasoning, spoken as you go",
            "Verify: 'Sanity check: at the extreme this still holds, so I am confident.'",
          ],
        },
        {
          type: "p",
          text: "A wrong turn narrated is recoverable: 'that gives the wrong magnitude, so my unit conversion is off, let me redo it' is a strong moment, not a weak one. Silence followed by a wrong answer offers an evaluator nothing to credit. Narration is not decoration on the routine; it is how the routine is scored.",
        },
      ],
    },

    {
      type: "takeaway",
      id: "UIE-1-LESSON-007-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Strong reasoning under pressure is a routine, not a talent: restate the problem, break it into parts, sweep the edges, check by a second route, and narrate as you go. The drills that follow run that routine until it is what your hands do when the clock is real.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-1-LESSON-007-ACT",
      body: "Six excerpts from candidate answers, one judgment each: is the reasoning sound, or is there a hole? The feedback names the exact pitfall, using the routine you just built.",
    },
    {
      type: "check_cta",
      id: "UIE-1-LESSON-007-CHECK",
      body: "Four short problems, nothing graded. Each one exercises a different beat of the routine, and the feedback shows the reasoning path rather than just the answer.",
    },
    {
      type: "next_step",
      id: "UIE-1-LESSON-007-NEXT",
      body: "This is the first module of the UI Engineer Readiness pilot. HTML and CSS foundations, JavaScript depth and React hooks practice join it next, and the routine you built here is the one those modules assume.",
    },
  ],
  glossary: [],
};
