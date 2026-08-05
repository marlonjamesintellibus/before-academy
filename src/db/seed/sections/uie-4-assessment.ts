import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-4 graded bank: twelve items over the five fundamentals families,
 * blueprint difficulty mix (five foundational, six applied, one challenging).
 * Two fixedDraw habits ride every attempt: the const-binding item (the
 * misconception the whole course opens on) and the safe-sink item (the one
 * with a security cost when missed).
 */
export const uie4AssessmentSeed: AssessmentSeed = {
  id: "UIE-4-ASM-001",
  intro:
    "Six questions drawn from a twelve-item bank across the fundamentals. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-4-QB-001",
      format: "multiple_choice",
      category: "js_values_types",
      difficulty: "foundational",
      stem: "After `const a = { n: 1 }; const b = a; b.n = 2;` what is `a.n`?",
      options: [
        { text: "2: a and b are one object under two names", correct: true },
        { text: "1: b received a copy", correct: false },
        { text: "1: const prevented the change from reaching a", correct: false },
        { text: "An error is thrown at `b.n = 2`", correct: false },
      ],
      correctExplanation:
        "Correct. Object assignment copies the reference: one object, two names, and a write through either is visible through both. Copies are explicit in JavaScript: `{ ...a }`.",
      incorrectExplanation:
        "Not quite. Objects assign by reference, so `b` is a second name for the same object and `b.n = 2` writes into it. `const` locks the bindings, not the contents, and no error occurs. Review: values and references.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO1"],
      misconceptionTags: ["UIE-M-005"],
    },
    {
      id: "UIE-4-QB-002",
      format: "multiple_choice",
      category: "js_values_types",
      difficulty: "foundational",
      stem: "Which statement about `const` is accurate?",
      options: [
        { text: "It forbids reassigning the name; the value can still be mutated", correct: true },
        { text: "It deep-freezes the value against all change", correct: false },
        { text: "It only works on primitives", correct: false },
        { text: "It is `var` with block scope and no other difference", correct: false },
      ],
      correctExplanation:
        "Correct. `const` is about the binding: the name points at one value forever. Whether that value's insides can change is the value's own business, and for objects and arrays they can.",
      incorrectExplanation:
        "Not quite. `const` locks the name-to-value binding and nothing deeper: object fields stay mutable, all types are welcome, and unlike `var` it is block-scoped AND non-reassignable. Freezing contents is `Object.freeze`, a separate act. Review: values and references.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO1"],
      misconceptionTags: ["UIE-M-005"],
    },
    {
      id: "UIE-4-QB-003",
      format: "multiple_choice",
      category: "js_values_types",
      difficulty: "applied",
      stem: "Which of these is truthy?",
      options: [
        { text: "`[]` (an empty array)", correct: true },
        { text: "`''` (an empty string)", correct: false },
        { text: "`0`", correct: false },
        { text: "`NaN`", correct: false },
      ],
      correctExplanation:
        "Correct. The falsy list is exactly eight values, and every object is truthy, including empty arrays and empty objects. `if (list)` therefore says nothing about emptiness; `list.length` does.",
      incorrectExplanation:
        "Not quite. Empty string, zero and NaN sit on the eight-value falsy list; an empty array is an object and every object is truthy. The practical edge: `if (list)` cannot detect emptiness, only `list.length` can. Review: types, truthiness and strict equality.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO2"],
      misconceptionTags: [],
    },

    {
      id: "UIE-4-QB-004",
      format: "multiple_choice",
      category: "js_scope_closures",
      difficulty: "applied",
      stem: "`function make() { let n = 0; return () => ++n; } const f = make(); const g = make(); f(); f(); g();` What does `g()` return?",
      options: [
        { text: "1", correct: true },
        { text: "3", correct: false },
        { text: "0", correct: false },
        { text: "undefined", correct: false },
      ],
      correctExplanation:
        "Correct. Each `make()` call creates a fresh `n` for its returned function to close over: `f` advanced its own `n` to 2, and `g` increments a separate `n` from 0 to 1.",
      incorrectExplanation:
        "Not quite. Closures are per-call: each `make()` runs the outer function and births a new `n`. `f` and `g` therefore count independently, so `g()` returns 1 regardless of how often `f` ran. Review: scope and closures.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-4-QB-005",
      format: "multiple_choice",
      category: "js_scope_closures",
      difficulty: "foundational",
      stem: "What decides which outer variables a function can see?",
      options: [
        { text: "Where the function was written in the source: lexical scope", correct: true },
        { text: "Where the function is called from", correct: false },
        { text: "The order listeners were registered", correct: false },
        { text: "Whether the function is named or anonymous", correct: false },
      ],
      correctExplanation:
        "Correct. Scope is lexical: the chain walks outward from the function's birthplace in the source, fixed at write time. Call site, registration order and naming change nothing about visibility.",
      incorrectExplanation:
        "Not quite. Visibility is decided where the function is written, walking outward through the enclosing blocks and functions: lexical scope. The call site matters to `this` (the in-depth course), never to variable lookup. Review: scope and closures.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO3"],
      misconceptionTags: [],
    },

    {
      id: "UIE-4-QB-006",
      format: "multiple_choice",
      category: "js_collections",
      difficulty: "foundational",
      stem: "Which method transforms every element of an array into a new array of the same length?",
      options: [
        { text: "`map`", correct: true },
        { text: "`filter`", correct: false },
        { text: "`reduce`", correct: false },
        { text: "`forEach`", correct: false },
      ],
      correctExplanation:
        "Correct. `map` is one-for-one: same length, each element transformed, source untouched. `filter` keeps a subset, `reduce` folds to one value, and `forEach` returns nothing at all.",
      incorrectExplanation:
        "Not quite. The trio divides cleanly: `map` transforms one-for-one, `filter` keeps some, `reduce` folds to a single value. `forEach` runs side effects and returns undefined, which is why assigning its result is a classic slip. Review: the everyday toolkit.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-4-QB-007",
      format: "multiple_choice",
      category: "js_collections",
      difficulty: "applied",
      stem: "`const sorted = scores.sort((a, b) => a - b);` A teammate says this line is still risky in shared state. Why?",
      options: [
        {
          text: "`sort` mutated `scores` in place; `sorted` is the same array, not a copy",
          correct: true,
        },
        { text: "The comparator is wrong for numbers", correct: false },
        { text: "`sort` is asynchronous and may not have finished", correct: false },
        { text: "It is not risky: assigning to a new name made a copy", correct: false },
      ],
      correctExplanation:
        "Correct. The comparator fixed the ordering, and the mutation remains: every alias of `scores` now sees the reordered array, and `sorted` is just another name for it. The shared-state-safe form copies first: `[...scores].sort((a, b) => a - b)` or `toSorted`.",
      incorrectExplanation:
        "Not quite. The comparator is right and `sort` is synchronous; the risk is mutation. `sort` reorders the original array, and assignment never copies, so every holder of `scores` sees the change. Copy first, or use `toSorted`. Review: the everyday toolkit.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-4-QB-008",
      format: "multiple_choice",
      category: "js_collections",
      difficulty: "challenging",
      stem: "State is `{ user: { name, prefs } }`. Which update changes the preference WITHOUT mutating the original state object?",
      options: [
        {
          text: "`{ ...state, user: { ...state.user, prefs: { ...state.user.prefs, theme } } }`",
          correct: true,
        },
        { text: "`{ ...state }` then assign `copy.user.prefs.theme = theme`", correct: false },
        {
          text: "`state.user.prefs.theme = theme` since objects are references anyway",
          correct: false,
        },
        { text: "`Object.assign({}, state).user.prefs.theme = theme`", correct: false },
      ],
      correctExplanation:
        "Correct. Spread copies one level, so every level on the path to the changed field needs its own spread. The one-level copies in the other options share `user` and `prefs` with the original, and the write reaches back into it.",
      incorrectExplanation:
        "Not quite. `{ ...state }` and `Object.assign({}, state)` copy only the top level: the nested `user` and `prefs` are still shared, so writing through them mutates the original. Immutable updates spread at every level they touch. Review: values and references, and the toolkit.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO1", "UIE-4-LO4"],
      misconceptionTags: ["UIE-M-005"],
    },

    {
      id: "UIE-4-QB-009",
      format: "multiple_choice",
      category: "js_dom_events",
      difficulty: "foundational",
      stem: "User-entered text must appear inside a list item. Which assignment is the safe one?",
      options: [
        { text: "`item.textContent = input`", correct: true },
        { text: "`item.innerHTML = input`", correct: false },
        { text: "`item.outerHTML = '<li>' + input + '</li>'`", correct: false },
        { text: "`item.insertAdjacentHTML('beforeend', input)`", correct: false },
      ],
      correctExplanation:
        "Correct. `textContent` renders the string as inert text whatever it contains. Every HTML-parsing sink on the list executes markup, which turns a hostile comment into script running in every reader's browser.",
      incorrectExplanation:
        "Not quite. The three HTML sinks parse and execute what arrives, so user input through them is cross-site scripting waiting for its author. The safe sink costs one property name: `textContent`. Review: the DOM.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-4-QB-010",
      format: "multiple_choice",
      category: "js_dom_events",
      difficulty: "applied",
      stem: "`document.querySelector('#save')` returns `null` and the next line throws. What is the strongest first hypothesis?",
      options: [
        {
          text: "No element with that id exists when the script runs: a typo, or the script ran too early",
          correct: true,
        },
        { text: "The browser blocked the selection for security reasons", correct: false },
        { text: "`querySelector` needs `getElementById` for ids", correct: false },
        { text: "The element exists but is hidden by CSS", correct: false },
      ],
      correctExplanation:
        "Correct. `null` means no match at query time: either the selector is wrong or the element does not exist yet because the script ran before the markup below it parsed. Deferred scripts and correct selectors close both routes.",
      incorrectExplanation:
        "Not quite. Selection is not permissioned and hidden elements still match; `querySelector` handles id selectors happily. `null` says 'no such element right now', which points at a typo or a script running before the DOM beneath it exists. Review: the DOM.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO5"],
      misconceptionTags: [],
    },

    {
      id: "UIE-4-QB-011",
      format: "multiple_choice",
      category: "js_errors",
      difficulty: "applied",
      stem: "A trace reads `TypeError: Cannot read properties of undefined (reading 'name')` with `renderCard` on top and `loadProfile` beneath it. Where does the hunt start?",
      options: [
        {
          text: "In `renderCard`'s input: something reached it without the object whose `name` it reads",
          correct: true,
        },
        { text: "In the browser: TypeErrors are engine bugs", correct: false },
        { text: "At the bottom frame: the oldest call is always the cause", correct: false },
        { text: "Nowhere: wrap the line in try/catch and move on", correct: false },
      ],
      correctExplanation:
        "Correct. The top frame is where the expectation broke: `renderCard` read `.name` off `undefined`. The cause usually lives one step upstream, in what `loadProfile` handed over, which is exactly the direction the trace points.",
      incorrectExplanation:
        "Not quite. Traces read top-down: the throw site first, callers beneath. The type error is your code's expectation breaking, not the engine's, and silencing it with an empty catch converts a visible bug into an invisible one. Review: errors are directions.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-4-QB-012",
      format: "multiple_choice",
      category: "js_errors",
      difficulty: "applied",
      stem: "Where should a caught error NOT end its journey?",
      options: [
        { text: "In an empty catch block", correct: true },
        { text: "In a retry state shown to the user", correct: false },
        { text: "In an error report with the original error attached", correct: false },
        { text: "Rethrown to a boundary that can respond", correct: false },
      ],
      correctExplanation:
        "Correct. The empty catch is the one terminal that serves nobody: the user sees a UI that quietly stopped working and the team sees nothing at all. Every other listed destination is a legitimate response.",
      incorrectExplanation:
        "Not quite. Retry states, reports and rethrowing to a responsible boundary are all real responses. The empty catch is the anti-pattern: it hides the break from the user and the team simultaneously, which is why reviews flag it on sight. Review: errors are directions.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-4-LO5"],
      misconceptionTags: [],
    },
  ],
};
