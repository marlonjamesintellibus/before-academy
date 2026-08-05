import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-5 designed interaction and retrieval step. Predict-the-output dialect:
 * each scenario is a short program from the tricky tier, and the learner
 * commits to what it does before the feedback traces it through the model.
 * Snippets stay inline-sized by design; anything needing a block example
 * lives in the lesson.
 */
export const uie5ActivitySeed: ActivitySeed = {
  id: "UIE-5-ACT-001",
  title: "Predict the log",
  intro:
    "Six programs from the tricky tier. Commit to what each one does, then compare your trace with the model's: capture counts, call shapes, queues, chains, and the zoo.",
  instructions:
    "Trace before you answer: which variable, which binding, which queue. The feedback walks the exact schedule or chain that decides it.",
  scenarios: [
    {
      id: "UIE-5-ACT-001-S01",
      position: 1,
      title: "The three timers",
      body: "`for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i)); }` What logs?",
      difficulty: "foundational",
      clue: "count the variables, not the iterations",
      prompt: "What appears in the console?",
      options: [
        {
          id: "threes",
          label: "3, 3, 3",
          correct: true,
          feedback:
            "Correct. `var` is function-scoped: one `i`, three callbacks reading it after the loop finished at 3. `let` would mint a variable per iteration and log 0, 1, 2. The question is always 'how many variables exist?'",
        },
        {
          id: "sequence",
          label: "0, 1, 2",
          correct: false,
          feedback:
            "That is the `let` answer. With `var` there is a single shared `i`, and all three timer callbacks read it after the loop completed: 3, three times. The capture model counts variables, and here there is one.",
        },
        {
          id: "undef",
          label: "undefined, undefined, undefined",
          correct: false,
          feedback:
            "The closures hold a live variable, not a missing one: `i` exists and finished at 3, so that is what all three read. Undefined would need the variable to be gone, and closures exist precisely to keep it alive.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-002",
    },
    {
      id: "UIE-5-ACT-001-S02",
      position: 2,
      title: "The borrowed greeting",
      body: "`const f = user.greet; f();` where `greet` reads `this.name`. What does the call produce?",
      difficulty: "foundational",
      clue: "look for the dot at the call site, not the definition",
      prompt: "What happens?",
      options: [
        {
          id: "undefined-name",
          label: "`this` is undefined in the call: the dot was severed at extraction",
          correct: true,
          feedback:
            "Correct. Binding is decided per call: `user.greet()` binds implicitly through the dot, and `f()` is a bare call with default binding. `user.greet.bind(user)` or a wrapper arrow restores the object.",
        },
        {
          id: "remembers",
          label: "'Hi, Ada': the function remembers the object it was defined on",
          correct: false,
          feedback:
            "Functions carry their scope, never their `this`: that is the asymmetry the tricky tier probes. `this` re-resolves at every call from the call's shape, and this call has no object left of a dot.",
        },
        {
          id: "throws-extract",
          label: "The extraction itself throws: methods cannot leave their object",
          correct: false,
          feedback:
            "Methods are just functions on properties; extraction is legal and common. The surprise arrives at the CALL, where the bare shape selects default binding and `this.name` reads off undefined.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-003",
    },
    {
      id: "UIE-5-ACT-001-S03",
      position: 3,
      title: "The queue jump",
      body: "`log(1); setTimeout(() => log(2), 0); Promise.resolve().then(() => log(3)); log(4);` What order?",
      difficulty: "applied",
      clue: "stack, then all microtasks, then one task",
      prompt: "What appears?",
      options: [
        {
          id: "1432",
          label: "1, 4, 3, 2",
          correct: true,
          feedback:
            "Correct. The stack runs to empty (1, 4), the microtask queue drains (3), then the task queue gets its turn (2). Zero milliseconds bought the timer a place in line, not a place at the front.",
        },
        {
          id: "1234",
          label: "1, 2, 3, 4",
          correct: false,
          feedback:
            "Source order only rules within the stack. The timer and the promise leave the stack for different queues, and microtasks always drain before a task runs: 1, 4, then 3, then 2.",
        },
        {
          id: "1423",
          label: "1, 4, 2, 3",
          correct: false,
          feedback:
            "Close: the stack part is right. But the queues have a fixed priority, microtasks completely before any task, so the promise's 3 beats the timer's 2 regardless of which was queued first.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-004",
    },
    {
      id: "UIE-5-ACT-001-S04",
      position: 4,
      title: "The unwaited fleet",
      body: "`items.forEach(async (x) => { await save(x); }); log('done');` When does 'done' log?",
      difficulty: "applied",
      clue: "who receives the promises the callbacks return?",
      prompt: "What happens?",
      options: [
        {
          id: "immediately",
          label: "Immediately, before any save settles: forEach discards the returned promises",
          correct: true,
          feedback:
            "Correct. Each callback returns a promise into the void; forEach neither collects nor awaits them, so the loop and the log finish while the saves fly. Sequence wants `for...of` with await; parallel wants `Promise.all(items.map(...))`.",
        },
        {
          id: "after-all",
          label: "After every save finishes: the awaits hold the loop",
          correct: false,
          feedback:
            "Each await holds only its own callback. forEach never looks at what the callbacks return, so nothing outside them waits: 'done' logs first, and the saves settle unowned, rejections included.",
        },
        {
          id: "one-by-one",
          label: "After the first save only: forEach awaits the first and drops the rest",
          correct: false,
          feedback:
            "forEach treats all callbacks alike: it awaits none of them. All the saves start, all unowned, and 'done' logs before any of them settles. Ownership, not order, is the missing piece.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-005",
    },
    {
      id: "UIE-5-ACT-001-S05",
      position: 5,
      title: "The recovered chain",
      body: "`reject('boom').catch(() => 1).then((v) => log(v));` treating the first call as a rejected promise. What logs?",
      difficulty: "applied",
      clue: "what does a catch that returns do to the chain's state?",
      prompt: "What happens?",
      options: [
        {
          id: "one",
          label: "1: the catch handled the rejection and its return re-fulfilled the chain",
          correct: true,
          feedback:
            "Correct. A catch is not just a drain: returning from it settles the next link as fulfilled with that value, so the then receives 1. Recovery is the point: substitute a fallback and the chain continues as if whole.",
        },
        {
          id: "boom",
          label: "'boom': rejections pass through catch to the next then",
          correct: false,
          feedback:
            "The catch consumed the rejection; nothing passes beyond it unless it throws or returns a rejected promise. What flows on is its return value, 1, in a fulfilled link.",
        },
        {
          id: "nothing",
          label: "Nothing: the chain stays rejected and the then never runs",
          correct: false,
          feedback:
            "A rejection ends a chain only when nothing catches it. This catch caught, returned 1, and re-fulfilled the chain, so the then runs with 1. Skipping is what happens to thens BEFORE the catch, not after.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-005",
    },
    {
      id: "UIE-5-ACT-001-S06",
      position: 6,
      title: "A visit to the zoo",
      body: "Which of these comparisons is true: `null == 0`, `null == undefined`, or `NaN == NaN`?",
      difficulty: "challenging",
      clue: "one pair is equal by decree, not by conversion",
      prompt: "Which is true?",
      options: [
        {
          id: "null-undef",
          label: "`null == undefined` only",
          correct: true,
          feedback:
            "Correct. The special rule marries null and undefined to each other and nothing else, so `null == 0` is false even though loose equality usually converges on numbers. And NaN refuses equality with everything, itself included: `Number.isNaN` exists for exactly that.",
        },
        {
          id: "null-zero",
          label: "`null == 0`: loose equality converts null to zero",
          correct: false,
          feedback:
            "The number-convergence rule loses to the special rule here: null compares equal only to undefined. That carve-out is why `x == null` is the one idiomatic use of loose equality, catching exactly the two absent values.",
        },
        {
          id: "nan-nan",
          label: "`NaN == NaN`: a value must equal itself",
          correct: false,
          feedback:
            "NaN is the standardised exception to self-equality, under == and === alike. The only honest checks are `Number.isNaN(x)` or `x !== x`. The pair that is true by decree is null and undefined.",
        },
      ],
      remediationAnchor: "UIE-5-LESSON-006",
    },
  ],
};

/** UIE-5 retrieval step: one trace per model. */
export const uie5CheckSeed: CheckSeed = {
  id: "UIE-5-CHK-001",
  label: "Practice check",
  intro: "Four short traces. Nothing here is graded, and every answer shows the schedule or chain.",
  questions: [
    {
      id: "UIE-5-CHK-001-Q1",
      category: "js_scope_closures",
      difficulty: "applied",
      learningOutcomes: ["UIE-5-LO1"],
      misconceptionTags: [],
      stem: "Three buttons are wired in a loop with `let index`. Clicking the second logs its own index, not the last one. Which fact makes that work?",
      options: [
        {
          text: "`let` creates a new binding per iteration, and each handler captured its own",
          correct: true,
        },
        { text: "Event handlers copy all outer variables when registered", correct: false },
        { text: "The browser stores the index on the button element", correct: false },
        { text: "Closures snapshot primitive values at creation", correct: false },
      ],
      correctFeedback:
        "Per-iteration bindings mean three variables exist, one per handler. Each closure holds its own, so each click reads the right value years after the loop ended.",
      incorrectFeedback:
        "Handlers copy nothing and snapshot nothing: they hold live variables. The saving fact is that `let` minted a separate variable each iteration, so every handler's captured variable is its own.",
      chip: { label: "Closures under pressure", anchor: "UIE-5-LESSON-002" },
    },
    {
      id: "UIE-5-CHK-001-Q2",
      category: "js_this_binding",
      difficulty: "applied",
      learningOutcomes: ["UIE-5-LO2"],
      misconceptionTags: [],
      stem: "Inside an object method, a `setTimeout` callback written as a regular function loses `this`; written as an arrow it keeps it. Why?",
      options: [
        { text: "Arrows have no own this and read the method's, lexically", correct: true },
        { text: "setTimeout binds this only for arrow functions", correct: false },
        { text: "Regular functions are hoisted out of the method's scope", correct: false },
        { text: "Arrows run synchronously so this has not changed yet", correct: false },
      ],
      correctFeedback:
        "The arrow treats `this` like any outer variable: it reads the enclosing method's binding at the definition site. The regular function gets its own `this` per call, and the timer calls it bare.",
      incorrectFeedback:
        "setTimeout binds nothing and hoisting is not involved: the difference is ownership. A regular function re-resolves `this` at its own call, which is bare; an arrow has no `this` and reads the method's, lexically, like a closed-over variable.",
      chip: { label: "this: decided at the call", anchor: "UIE-5-LESSON-003" },
    },
    {
      id: "UIE-5-CHK-001-Q3",
      category: "js_event_loop",
      difficulty: "applied",
      learningOutcomes: ["UIE-5-LO3"],
      misconceptionTags: ["UIE-M-006"],
      stem: "`await fetchData()` sits mid-function. What actually happens to the code after the await?",
      options: [
        {
          text: "It is scheduled as a microtask that runs when the promise settles",
          correct: true,
        },
        { text: "The thread blocks until the response arrives", correct: false },
        { text: "It runs on a second thread while the first waits", correct: false },
        { text: "It runs immediately; the await only labels the line", correct: false },
      ],
      correctFeedback:
        "The function suspends and returns control; the remainder re-enters via the microtask queue once the promise settles. One thread throughout, with the waiting done by the platform.",
      incorrectFeedback:
        "Nothing blocks and no second thread exists: await suspends the function, the platform waits, and the rest of the function is queued as a microtask on settlement. That queue placement is why awaited code beats a 0ms timer.",
      chip: { label: "The event loop", anchor: "UIE-5-LESSON-004" },
    },
    {
      id: "UIE-5-CHK-001-Q4",
      category: "js_async",
      difficulty: "applied",
      learningOutcomes: ["UIE-5-LO4"],
      misconceptionTags: [],
      stem: "Two independent fetches are awaited on consecutive lines. What does `Promise.all` change?",
      options: [
        {
          text: "Both start before waiting: total time is the slower one, not the sum",
          correct: true,
        },
        { text: "It retries whichever fetch rejects", correct: false },
        { text: "It caches the results for later calls", correct: false },
        { text: "Nothing: awaits already run in parallel", correct: false },
      ],
      correctFeedback:
        "Sequential awaits serialise: the second fetch starts only after the first settles. Starting both, then awaiting `Promise.all`, overlaps the waits, so the cost is max, not sum.",
      incorrectFeedback:
        "No retries, no cache: the change is when the work STARTS. Consecutive awaits run the fetches back to back; `Promise.all` on already-started promises overlaps them, turning sum-of-latencies into slowest-of-latencies.",
      chip: { label: "Promises", anchor: "UIE-5-LESSON-005" },
    },
  ],
  completion: {
    body: "Four traces, four models. When the queue order, the call shape and the chain state answer before the options tempt you, the tricky tier has become the readable tier, and the React module ahead will feel like applied revision.",
  },
};
