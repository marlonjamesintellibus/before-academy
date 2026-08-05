import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-5 graded bank: fourteen items over five in-depth families plus the
 * js_scope_closures family shared with fundamentals, blueprint difficulty
 * mix (five foundational, seven applied, two challenging). Two fixedDraw
 * habits ride every attempt: the microtask-versus-task ordering item (the
 * model the whole tier hangs on) and the extracted-method item (the trap
 * with the highest real-world hit rate).
 */
export const uie5AssessmentSeed: AssessmentSeed = {
  id: "UIE-5-ASM-001",
  intro:
    "Six questions drawn from a fourteen-item bank across the tricky tier. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-5-QB-001",
      format: "multiple_choice",
      category: "js_scope_closures",
      difficulty: "foundational",
      stem: "`for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i)); }` What logs?",
      options: [
        { text: "3, 3, 3", correct: true },
        { text: "0, 1, 2", correct: false },
        { text: "0, 0, 0", correct: false },
        { text: "undefined three times", correct: false },
      ],
      correctExplanation:
        "Correct. One function-scoped `i`, three callbacks reading it after the loop ended at 3. The `let` version logs 0, 1, 2 because each iteration gets a fresh variable. Capture questions are counting questions.",
      incorrectExplanation:
        "Not quite. `var` gives the loop ONE shared variable; every callback closes over it and reads its post-loop value, 3. Fresh-per-iteration capture needs `let`, or a parameter to copy the value. Review: closures under pressure.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-5-QB-002",
      format: "multiple_choice",
      category: "js_scope_closures",
      difficulty: "challenging",
      stem: "A modal's close handler captures the entire loaded report object but only reads its `id`. The team sees memory climb with each opened report. What is the mechanism?",
      options: [
        {
          text: "The closure keeps its whole birthplace alive: the report cannot free while the handler lives",
          correct: true,
        },
        { text: "Event handlers copy their captured objects on registration", correct: false },
        { text: "Garbage collection never runs while modals are open", correct: false },
        { text: "Reading `id` marks the whole object as permanently reachable", correct: false },
      ],
      correctExplanation:
        "Correct. A closure retains its scope as a unit, so the long-lived handler pins the whole report. Capture the `id` into its own variable and close over that, or drop the handler on teardown, and the reports free.",
      incorrectExplanation:
        "Not quite. Nothing is copied and collection runs normally: the closure simply holds a live reference to its scope, report included, for as long as the handler exists. Narrow the capture (take the id out first) or release the handler. Review: closures under pressure, go deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO1"],
      misconceptionTags: [],
    },

    {
      id: "UIE-5-QB-003",
      format: "multiple_choice",
      category: "js_this_binding",
      difficulty: "foundational",
      stem: "`const f = user.greet; f();` Inside `greet`, what is `this`?",
      options: [
        { text: "undefined: a bare call gets the default binding", correct: true },
        { text: "`user`: the function remembers where it was defined", correct: false },
        { text: "The global object, in all modern code", correct: false },
        { text: "The nearest enclosing object literal", correct: false },
      ],
      correctExplanation:
        "Correct. `this` is chosen per call: extraction severed the dot, the call is bare, and modules and strict code make the default binding undefined. `bind`, a wrapper arrow, or calling through the object restores it.",
      incorrectExplanation:
        "Not quite. Functions carry scope, never `this`: it re-resolves at each call from the call's shape. A bare `f()` selects the default binding, which is undefined in modules and strict code, so `this.name` throws. Review: this, decided at the call.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-5-QB-004",
      format: "multiple_choice",
      category: "js_this_binding",
      difficulty: "applied",
      stem: "Why is an arrow function the wrong choice for an object METHOD that reads `this`?",
      options: [
        {
          text: "Arrows have no own this; defined at module level, theirs is not the object",
          correct: true,
        },
        { text: "Arrows cannot access object properties at all", correct: false },
        { text: "Arrows are slower to call than regular methods", correct: false },
        { text: "It is fine: arrows bind this to their object automatically", correct: false },
      ],
      correctExplanation:
        "Correct. An arrow reads the `this` of the scope where it was WRITTEN, and an object literal does not create one: the arrow method sees the module's `this`, not the object. Shorthand methods bind implicitly through the call; that is the right tool.",
      incorrectExplanation:
        "Not quite. The arrow's defining feature, lexical `this`, is exactly wrong here: written inside a module-level object literal, it inherits the module's `this`, never the object's. The same feature makes arrows RIGHT inside methods, as callbacks. Review: this, decided at the call.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-5-QB-005",
      format: "multiple_choice",
      category: "js_this_binding",
      difficulty: "applied",
      stem: "`class Timer { start() { setInterval(function () { this.tick(); }, 1000); } }` throws on the first interval. Which change is idiomatic?",
      options: [
        {
          text: "Make the callback an arrow: it will read the method's this lexically",
          correct: true,
        },
        { text: "Rename the class field to avoid shadowing", correct: false },
        { text: "Call `this.tick.call(Timer)` inside the callback", correct: false },
        { text: "Move tick outside the class as a plain function", correct: false },
      ],
      correctExplanation:
        "Correct. The interval calls the regular function bare, so its `this` is undefined. An arrow has no own `this` and reads `start`'s, which is the instance: `setInterval(() => this.tick(), 1000)` is the standard modern fix.",
      incorrectExplanation:
        "Not quite. No shadowing is involved, and `call(Timer)` aims at the class rather than the instance. The interval's bare call is the mechanism, and the lexical fix is the idiom: an arrow callback inherits the method's `this`, the instance. Review: this, decided at the call.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO2"],
      misconceptionTags: [],
    },

    {
      id: "UIE-5-QB-006",
      format: "multiple_choice",
      category: "js_event_loop",
      difficulty: "foundational",
      stem: "`log(1); setTimeout(() => log(2), 0); Promise.resolve().then(() => log(3)); log(4);` What order?",
      options: [
        { text: "1, 4, 3, 2", correct: true },
        { text: "1, 2, 3, 4", correct: false },
        { text: "1, 4, 2, 3", correct: false },
        { text: "1, 3, 4, 2", correct: false },
      ],
      correctExplanation:
        "Correct. Stack to empty (1, 4), microtasks drained (3), then one task (2). The zero-millisecond timer joined the back of the task queue, and microtasks always cut ahead of tasks.",
      incorrectExplanation:
        "Not quite. Trace the schedule: synchronous code first (1, 4), then the ENTIRE microtask queue (3), then one task from the timer queue (2). Nothing about 0ms moves a task ahead of microtasks. Review: the event loop.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO3"],
      misconceptionTags: ["UIE-M-006"],
    },
    {
      id: "UIE-5-QB-007",
      format: "multiple_choice",
      category: "js_event_loop",
      difficulty: "applied",
      stem: "A click handler runs a synchronous loop for three seconds. What does the user experience?",
      options: [
        {
          text: "A frozen page: no rendering, no other handlers, until the stack empties",
          correct: true,
        },
        { text: "A slow page that still scrolls and repaints", correct: false },
        { text: "Nothing unusual: loops run on a background thread", correct: false },
        { text: "The browser pauses the loop every frame to render", correct: false },
      ],
      correctExplanation:
        "Correct. One thread runs everything, and rendering happens between loop turns, never mid-stack. Three seconds of synchronous work is three seconds of frozen UI, which is why long work gets chunked into tasks or moved to a worker.",
      incorrectExplanation:
        "Not quite. There is no background thread and no preemption: the stack runs to completion while rendering and every other handler wait. The remedies are chunking (yield via tasks) or a worker (a genuinely separate thread). Review: the event loop.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO3"],
      misconceptionTags: ["UIE-M-006"],
    },
    {
      id: "UIE-5-QB-008",
      format: "multiple_choice",
      category: "js_event_loop",
      difficulty: "challenging",
      stem: "A microtask queues another microtask, which queues another, indefinitely. What happens to a pending 0ms timer?",
      options: [
        { text: "It never runs: the microtask queue must drain before any task", correct: true },
        { text: "It runs after at most one extra millisecond", correct: false },
        { text: "The browser alternates fairly between the queues", correct: false },
        { text: "The engine throws a queue-overflow error", correct: false },
      ],
      correctExplanation:
        "Correct. The schedule is drain-microtasks-completely, and a self-refilling queue never completes: tasks, timers, rendering all starve on the owned thread. The task queue has no such trap, which is why chunked work uses tasks.",
      incorrectExplanation:
        "Not quite. No fairness and no overflow protection exist: microtasks drain fully before any task, so a self-perpetuating microtask starves the timer, and the page, forever. That asymmetry is the deep fact of the two queues. Review: the event loop, go deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO3"],
      misconceptionTags: ["UIE-M-006"],
    },

    {
      id: "UIE-5-QB-009",
      format: "multiple_choice",
      category: "js_async",
      difficulty: "foundational",
      stem: "In a promise chain, where does a rejection thrown in the second `then` surface?",
      options: [
        { text: "At the next `catch` (or rejection handler) down the chain", correct: true },
        { text: "In the first `then`, which must retry", correct: false },
        { text: "It is swallowed silently", correct: false },
        { text: "At the original promise's creator", correct: false },
      ],
      correctExplanation:
        "Correct. Rejections travel forward, skipping fulfillment handlers until a catch takes them. Nothing travels backward, and silence only happens when no catch exists anywhere, which surfaces as an unhandled rejection.",
      incorrectExplanation:
        "Not quite. Chains flow one way: a rejection skips forward past every plain `then` to the nearest catch. Upstream links never see it, and it is only 'silent' when the chain has no catch at all, which the runtime reports as unhandled. Review: promises.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-5-QB-010",
      format: "multiple_choice",
      category: "js_async",
      difficulty: "applied",
      stem: "`const a = await fetchA(); const b = await fetchB();` where the fetches are independent, 300ms each. What does restructuring with `Promise.all` achieve?",
      options: [
        { text: "About 300ms total instead of 600: the waits overlap", correct: true },
        { text: "Nothing: await already parallelises independent calls", correct: false },
        { text: "It makes the calls take turns more efficiently", correct: false },
        { text: "It halves each request's own latency", correct: false },
      ],
      correctExplanation:
        "Correct. Sequential awaits start the second fetch only after the first settles: 600ms. Starting both, then awaiting all, overlaps the platform's waiting: about 300. Latency per request is untouched; concurrency is what changed.",
      incorrectExplanation:
        "Not quite. `await` serialises whatever it touches: the second fetch waits for the first, summing to 600ms. `Promise.all` on promises started together overlaps the waits at about 300. Nothing about either request got faster; they simply flew together. Review: promises.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO4"],
      misconceptionTags: ["UIE-M-006"],
    },
    {
      id: "UIE-5-QB-011",
      format: "multiple_choice",
      category: "js_async",
      difficulty: "applied",
      stem: "Five saves must ALL be attempted, and the UI must report which succeeded and which did not. Which tool fits?",
      options: [
        { text: "`Promise.allSettled`: every outcome, no early rejection", correct: true },
        { text: "`Promise.all`: it collects every result", correct: false },
        { text: "`Promise.race`: the fastest outcome wins", correct: false },
        { text: "Sequential awaits inside one try/catch", correct: false },
      ],
      correctExplanation:
        "Correct. `allSettled` waits for every promise and reports each as fulfilled-with-value or rejected-with-reason, which is exactly a per-item status report. `all` rejects on the first rejection and discards the rest of the story.",
      incorrectExplanation:
        "Not quite. `all` abandons the report at the first rejection, `race` keeps only the fastest, and one try/catch around sequential awaits stops at the first throw. The requirement, every attempt with its outcome, is `allSettled` verbatim. Review: promises.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO4"],
      misconceptionTags: [],
    },

    {
      id: "UIE-5-QB-012",
      format: "multiple_choice",
      category: "js_coercion_tricks",
      difficulty: "foundational",
      stem: "What does `1 + '2' + 3` evaluate to?",
      options: [
        { text: "'123'", correct: true },
        { text: "6", correct: false },
        { text: "'15'", correct: false },
        { text: "NaN", correct: false },
      ],
      correctExplanation:
        "Correct. `+` concatenates the moment either operand is a string, and it associates left to right: 1 + '2' is '12', then '12' + 3 is '123'. The minus family would have converted to numbers instead.",
      incorrectExplanation:
        "Not quite. Left to right with the string rule: 1 + '2' concatenates to '12', and '12' + 3 concatenates again to '123'. Only `+` has the string affinity; '5' - 1 really is 4. Review: the coercion zoo.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-5-QB-013",
      format: "multiple_choice",
      category: "js_coercion_tricks",
      difficulty: "applied",
      stem: "Which comparison is TRUE?",
      options: [
        { text: "`null == undefined`", correct: true },
        { text: "`null == 0`", correct: false },
        { text: "`NaN === NaN`", correct: false },
        { text: "`[1] === [1]`", correct: false },
      ],
      correctExplanation:
        "Correct. The special rule pairs null with undefined exclusively, which is why `x == null` idiomatically catches both absences. NaN never equals itself, and two array literals are two objects: identity, not contents.",
      incorrectExplanation:
        "Not quite. Three of these are famous falses: null equals only undefined (not 0), NaN refuses self-equality under any operator, and `===` on objects compares identity, so two fresh arrays never match. The decree pair is the true one. Review: the coercion zoo.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO5"],
      misconceptionTags: [],
    },

    {
      id: "UIE-5-QB-014",
      format: "multiple_choice",
      category: "js_prototypes",
      difficulty: "applied",
      stem: "`class A { hello() {} } const a = new A();` Where does `a.hello` actually live?",
      options: [
        { text: "On `A.prototype`, found by walking a's chain", correct: true },
        { text: "Copied onto `a` itself at construction", correct: false },
        { text: "On the class object `A` directly", correct: false },
        { text: "Recreated fresh on every call", correct: false },
      ],
      correctExplanation:
        "Correct. Methods live once, on the prototype, and every instance finds them by delegation: `Object.hasOwn(a, 'hello')` is false while `a.hello` resolves. One function, shared, which is the memory model class syntax preserves.",
      incorrectExplanation:
        "Not quite. Construction copies nothing and calls recreate nothing: `hello` exists once on `A.prototype`, and instance lookup walks the chain to it. Static methods are the ones living on `A` itself. Review: prototypes.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-5-LO5"],
      misconceptionTags: [],
    },
  ],
};
