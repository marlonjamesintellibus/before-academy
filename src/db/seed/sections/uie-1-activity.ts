import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-1 designed interaction and retrieval step.
 *
 * The activity judges reasoning rather than facts: each scenario is an excerpt
 * from a candidate's answer, and the learner decides whether the reasoning is
 * sound or has a hole. This mirrors what the section teaches, because naming a
 * pitfall in someone else's reasoning is the fastest way to start hearing it
 * in your own. The honest third option carries over from the AI Awareness
 * dialect: some excerpts cannot be judged from what is quoted, and saying so
 * is the sound judgment.
 *
 * Remediation anchors resolve to UIE-1 lesson blocks (content-lint verifies).
 */
export const uie1ActivitySeed: ActivitySeed = {
  id: "UIE-1-ACT-001",
  title: "Sound or shaky?",
  intro:
    "Six excerpts from candidate answers in mock evaluations. One judgment each: is the reasoning sound, or is there a hole? The honest third answer is available every time.",
  instructions:
    "Read the excerpt, judge the reasoning, and check. The feedback names the exact pitfall or the exact strength, in the words of the routine.",
  scenarios: [
    {
      id: "UIE-1-ACT-001-S01",
      position: 1,
      title: "The instant answer",
      body: "Interviewer: 'Page load is 2 seconds, half of it server time. Caching halves server time. New load time?' Candidate, immediately: '1 second.'",
      difficulty: "foundational",
      clue: "which second did the caching actually touch?",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: false,
          feedback:
            "The speed is the tell. Caching halves only the server second, so half a second is saved and the answer is 1.5. The candidate answered a vaguer question, 'does caching help', instead of the one asked.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: true,
          feedback:
            "Correct. The problem has structure, two parts with only one touched, and the instant answer skipped it. A one-line extreme check would have caught it: even removing server time entirely leaves a full second.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "Everything needed is quoted: two seconds, half server, caching halves it. When the givens are complete, the judgment can be made, and here the structure was skipped.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-002",
    },
    {
      id: "UIE-1-ACT-001-S02",
      position: 2,
      title: "The named assumption",
      body: "Candidate: 'The ticket says users lose their draft on refresh. I will assume a draft means unsubmitted form state, not uploaded files, and say that out loud in case it is wrong. On that assumption, the fix is to persist form state locally.'",
      difficulty: "foundational",
      clue: "the assumption is spoken before anything is built on it",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: true,
          feedback:
            "Correct. The candidate restated the problem, named the assumption before building on it, and marked it as revisable. That is exactly the constraint-reading routine, and an evaluator can follow every step of it.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: false,
          feedback:
            "The assumption is the strength here, not the weakness. An assumption said out loud and marked as revisable is how incomplete requirements are handled well. Silent assumptions are the pitfall, and this one is anything but silent.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "The excerpt shows the full move: restate, name the assumption, proceed on it. Whether the assumption turns out right is a separate question from whether the reasoning is sound, and the reasoning is.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-002",
    },
    {
      id: "UIE-1-ACT-001-S03",
      position: 3,
      title: "The dropped remainder",
      body: "Candidate: '137 items at 12 per page is 137 over 12, which is about 11.4, so 11 pages.'",
      difficulty: "foundational",
      clue: "where do the 5 leftover items live?",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: false,
          feedback:
            "The division is right and the conclusion is wrong. Eleven full pages hold 132 items; the remaining 5 need somewhere to live, and that somewhere is a twelfth page. Rounding down made real items vanish.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: true,
          feedback:
            "Correct. The remainder was dropped by rounding instead of handled as a deliberate step. Five items still exist, and they make page 12. Dropped remainders are the most common decomposition slip, and this is a textbook one.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "The givens are complete: 137 items, 12 per page. The judgment can be made, and the hole is visible: 11 pages hold 132 items, and 5 are unaccounted for.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-003",
    },
    {
      id: "UIE-1-ACT-001-S04",
      position: 4,
      title: "The happy-path plan",
      body: "Candidate: 'For the search results page, I will render the list, add pagination, and show the count. I have covered the feature, so I am done.'",
      difficulty: "applied",
      clue: "every case mentioned has a comfortable number of results",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: false,
          feedback:
            "Every case in the plan lives in the middle of the input range. No results, one result, exactly a full page, and thousands of results are all missing, and the sweep exists because that is where the breakage lives.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: true,
          feedback:
            "Correct. 'I am done' arrived without the sweep: empty, one, boundary, many, invalid. A search page meets an empty result set on day one, and this plan has never considered it.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "The excerpt includes the claim of completeness, which is what makes it judgeable: 'I am done' with no edge in sight is the hole. The sweep takes under a minute to say, and it is absent.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-004",
    },
    {
      id: "UIE-1-ACT-001-S05",
      position: 5,
      title: "The second route",
      body: "Candidate: 'About 2,500 images fit. Check: a thousand of them at 40 KB is 40 MB, so 100 MB should hold two and a half thousand. Same answer both ways, so I am confident.'",
      difficulty: "applied",
      clue: "two different routes arriving at one number",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: true,
          feedback:
            "Correct. The answer was checked by a second, independent route, and the two agreed. This is what 'check it twice, differently' looks like when spoken: cheap, one sentence, and it converts a guess into evidence.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: false,
          feedback:
            "The arithmetic holds on both routes: 100,000 KB over 40 KB is 2,500, and the magnitude route agrees. When two independent routes land together, that is the strongest signal available in an estimation.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "Both routes are quoted in full, so the judgment can be made. The verification is present and correct, which makes this a model answer rather than an unjudgeable one.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-005",
    },
    {
      id: "UIE-1-ACT-001-S06",
      position: 6,
      title: "The halves that might not be",
      body: "Candidate: 'Half our users are on mobile, so mobile accounts for half our sessions, so we should split the performance budget evenly.'",
      difficulty: "challenging",
      clue: "users and sessions are different units",
      prompt: "Is the reasoning sound?",
      options: [
        {
          id: "sound",
          label: "Sound",
          correct: false,
          feedback:
            "The step from users to sessions changes units, and nothing quoted says mobile and desktop users generate sessions at the same rate. The conclusion may even be right, but this excerpt cannot establish it.",
        },
        {
          id: "shaky",
          label: "Shaky",
          correct: false,
          feedback:
            "Close, and the instinct is healthy: something is off. But shaky would mean the excerpt contains a visible hole, and what it actually contains is a missing given: the sessions-per-user rate. Without it, the judgment itself cannot be made.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: true,
          feedback:
            "Correct. Users and sessions are different units, and the excerpt never states how they relate. If mobile users browse in shorter, more frequent sessions, the split could be far from even. Saying 'this depends on a number we have not been given' is the sound judgment here.",
        },
      ],
      remediationAnchor: "UIE-1-LESSON-005",
    },
  ],
};

/**
 * UIE-1 retrieval step: six short problems, one per beat of the routine plus
 * one that mixes beats. Chips anchor back into the lesson block the beat came
 * from, and every feedback line shows the path, not just the verdict.
 */
export const uie1CheckSeed: CheckSeed = {
  id: "UIE-1-CHK-001",
  label: "Practice check",
  intro: "Four short problems. Nothing here is graded, and every answer shows the reasoning path.",
  questions: [
    {
      id: "UIE-1-CHK-001-Q1",
      category: "constraint_reading",
      difficulty: "foundational",
      learningOutcomes: ["UIE-1-LO1"],
      misconceptionTags: [],
      stem: "A feature request reads: 'Show the newest comments first.' Which unstated question matters most before building?",
      options: [
        { text: "What decides 'newest' when comments are edited?", correct: true },
        { text: "Which font the comment timestamps use", correct: false },
        { text: "Whether comments should have avatars", correct: false },
        { text: "How wide the comment column should be", correct: false },
      ],
      correctFeedback:
        "Edited comments force the definition into the open: newest by creation or by last edit changes the ordering users see. That is the given the sentence hides, and naming it is the constraint-reading move.",
      incorrectFeedback:
        "Presentation choices change how the list looks; the hidden definition changes what the list is. 'Newest by creation or by last edit' decides the actual order, so it is the question to surface first.",
      chip: { label: "What is actually being asked", anchor: "UIE-1-LESSON-002" },
    },
    {
      id: "UIE-1-CHK-001-Q2",
      category: "decomposition",
      difficulty: "foundational",
      learningOutcomes: ["UIE-1-LO2"],
      misconceptionTags: [],
      stem: "An upload of 230 files runs in batches of 25. How many batches run?",
      options: [
        { text: "10 batches", correct: true },
        { text: "9 batches", correct: false },
        { text: "9.2 batches", correct: false },
        { text: "It depends on file size", correct: false },
      ],
      correctFeedback:
        "Nine full batches carry 225 files, and the remaining 5 files are a real batch, the tenth. Unit, repeats, remainder: the remainder is handled as a step, not rounded away.",
      incorrectFeedback:
        "230 over 25 is 9 with 5 left over, and those 5 files still have to travel: they make a tenth batch. A fractional batch cannot run, and file size was never part of the count.",
      chip: { label: "Break it into parts", anchor: "UIE-1-LESSON-003" },
    },
    {
      id: "UIE-1-CHK-001-Q4",
      category: "estimation",
      difficulty: "applied",
      learningOutcomes: ["UIE-1-LO4"],
      misconceptionTags: [],
      stem: "A colleague estimates that a 2 MB page over a connection of 1 MB per second loads in 'about 0.2 seconds'. What does the units check say?",
      options: [
        {
          text: "The answer is off by a power of ten: 2 MB over 1 MB per second is 2 seconds",
          correct: true,
        },
        {
          text: "The answer is right, because connections are usually faster than rated",
          correct: false,
        },
        {
          text: "The answer cannot be checked without knowing the server location",
          correct: false,
        },
        { text: "The answer is right if the page is cached", correct: false },
      ],
      correctFeedback:
        "Megabytes divided by megabytes-per-second leaves seconds, and 2 over 1 is 2. The stated answer is one power of ten off, and the units check catches it in a single line, before anyone builds on it.",
      incorrectFeedback:
        "Run the units: MB divided by MB per second gives seconds, and 2 over 1 is 2 seconds. Appeals to faster connections or caching change the problem instead of checking the arithmetic that was given.",
      chip: { label: "Check it twice, differently", anchor: "UIE-1-LESSON-005" },
    },
    {
      id: "UIE-1-CHK-001-Q5",
      category: "reasoning_communication",
      difficulty: "applied",
      learningOutcomes: ["UIE-1-LO5"],
      misconceptionTags: ["UIE-M-001"],
      stem: "Mid-answer, you realise your result has the wrong magnitude. What is the strongest next move in an evaluation?",
      options: [
        { text: "Say so, name the likely slip, and redo that step out loud", correct: true },
        { text: "Go quiet until you have the corrected answer", correct: false },
        { text: "Present the result anyway and move on quickly", correct: false },
        { text: "Start the whole problem again from a different approach", correct: false },
      ],
      correctFeedback:
        "A narrated wrong turn is a strong moment: it shows the check working and the recovery being systematic. 'Wrong magnitude, so my conversion is off, redoing it' gives an evaluator a path to credit.",
      incorrectFeedback:
        "Silence offers nothing to credit, presenting a known-wrong number spends your credibility, and restarting discards the working parts. The routine recovers locally: name the slip, redo the step, narrate both.",
      chip: { label: "Reason out loud", anchor: "UIE-1-LESSON-006" },
    },
  ],
  completion: {
    body: "Four problems, four beats of the routine, and every answer traced a path rather than naming a verdict. When you can hear the missing beat in someone else's answer, you are ready for the graded assessment.",
  },
};
