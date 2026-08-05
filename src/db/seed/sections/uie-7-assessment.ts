import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-7 graded bank: fourteen items over the five hooks families, blueprint
 * difficulty mix (five foundational, seven applied, two challenging). Two
 * fixedDraw habits ride every attempt: the frozen-interval item (the stale
 * closure the whole tier orbits) and the cleanup-order item (the lifecycle
 * fact that separates working effects from connection piles).
 */
export const uie7AssessmentSeed: AssessmentSeed = {
  id: "UIE-7-ASM-001",
  intro:
    "Six questions drawn from a fourteen-item bank across the hooks tier. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-7-QB-001",
      format: "multiple_choice",
      category: "react_hooks_rules",
      difficulty: "foundational",
      stem: "Why can a hook not be called inside an `if`?",
      options: [
        {
          text: "Hooks are matched to state by call order, and the branch shifts the order",
          correct: true,
        },
        { text: "Conditionals run too late for React to see", correct: false },
        { text: "It can, as long as the else branch calls it too", correct: false },
        { text: "Hooks inside branches leak memory", correct: false },
      ],
      correctExplanation:
        "Correct. Hook state lives in a per-component list indexed by call position. A conditional call makes slot N mean different hooks on different renders, and state lands with the wrong owners. Call always, use conditionally.",
      incorrectExplanation:
        "Not quite. The rule is bookkeeping, not timing or memory: position is a hook's only identity, so every render must produce the same call sequence. Mirroring the call in both branches still shifts numbering whenever the branches differ in other hooks. Review: the rules of hooks.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-002",
      format: "multiple_choice",
      category: "react_hooks_rules",
      difficulty: "applied",
      stem: "Two components both call `useCart()`, a custom hook wrapping useState. Do they share the cart?",
      options: [
        {
          text: "No: each component's call fills its own hook list; custom hooks share logic, not state",
          correct: true,
        },
        { text: "Yes: the hook's state lives in the hook function", correct: false },
        { text: "Yes, if the hook is exported from one module", correct: false },
        { text: "Only in strict mode", correct: false },
      ],
      correctExplanation:
        "Correct. A custom hook is a recipe: its useState runs inside whichever component is rendering, storing state in THAT component's list. Sharing needs the state placed above both, lifted or in context, and the hook can read it from there.",
      incorrectExplanation:
        "Not quite. Hook state belongs to the calling component's list, never to the hook function or its module: two callers, two carts. Shared state must live above both components, with the custom hook reading through context or props. Review: the rules of hooks, and where state lives.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO1", "UIE-7-LO5"],
      misconceptionTags: [],
    },

    {
      id: "UIE-7-QB-003",
      format: "multiple_choice",
      category: "react_effects",
      difficulty: "foundational",
      stem: "roomId changes from A to B. Which runs first?",
      options: [
        { text: "The cleanup from the room-A effect", correct: true },
        { text: "The effect for room B", correct: false },
        { text: "A re-render triggered by the deps change", correct: false },
        { text: "Nothing: cleanup only happens at unmount", correct: false },
      ],
      correctExplanation:
        "Correct. On a deps change, the previous effect's cleanup runs before the new effect: disconnect A, connect B, one live subscription at all times. Unmount is the same cleanup with no successor.",
      incorrectExplanation:
        "Not quite. The lifecycle is cleanup-then-run on every deps change, which is what keeps exactly one subscription alive. Deps changes do not trigger renders; renders come first, and effects follow the commit. Review: effects, and the life-of-an-effect diagram.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO2"],
      misconceptionTags: ["UIE-M-008"],
    },
    {
      id: "UIE-7-QB-004",
      format: "multiple_choice",
      category: "react_effects",
      difficulty: "applied",
      stem: "In development, a subscription effect runs, cleans up, and runs again at mount. What is React telling you?",
      options: [
        {
          text: "Nothing is wrong: strict mode rehearses the cycle to expose missing cleanups",
          correct: true,
        },
        { text: "The component is mounting twice due to a bug", correct: false },
        { text: "The deps array is unstable", correct: false },
        { text: "The effect must be converted to a layout effect", correct: false },
      ],
      correctExplanation:
        "Correct. Strict mode's mount-cleanup-remount is a development-only drill: an effect whose cleanup is honest survives it invisibly, and one that leaks shows itself immediately instead of in production.",
      incorrectExplanation:
        "Not quite. The double-run is deliberate and development-only: a rehearsal of the cleanup contract. Deps and effect flavour are unrelated; the correct response is an effect that survives the drill, never a workaround that silences it. Review: effects, strict mode.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-005",
      format: "multiple_choice",
      category: "react_effects",
      difficulty: "challenging",
      stem: "A profile page fetches in an effect keyed to userId. Flipping quickly from user A to B occasionally shows A's data on B's page. What is the mechanism and fix?",
      options: [
        {
          text: "A race: A's slow response lands last; cleanup must mark or abort the stale request",
          correct: true,
        },
        { text: "The cache returned the wrong entry; disable caching", correct: false },
        { text: "The deps array needs the response object added", correct: false },
        { text: "Effects cannot fetch; move the request into render", correct: false },
      ],
      correctExplanation:
        "Correct. Both requests fly and network order is unordered: last write wins unless the effect's cleanup revokes the old one, an ignore flag or an AbortController. The cleanup slot exists for exactly this undo.",
      incorrectExplanation:
        "Not quite. No cache misbehaved and responses never belong in deps: two in-flight requests raced and the stale one wrote last. The cleanup for the A-effect is where A's request gets flagged stale or aborted, making only the current render's request writable. Review: effects, go deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO2"],
      misconceptionTags: [],
    },

    {
      id: "UIE-7-QB-006",
      format: "multiple_choice",
      category: "react_effects",
      difficulty: "foundational",
      stem: "An effect with deps [] runs `setInterval(() => setCount(count + 1), 1000)`. The display sticks at 1. Why?",
      options: [
        {
          text: "The callback closed over mount's count and computes 0 + 1 forever",
          correct: true,
        },
        { text: "setInterval only fires once inside effects", correct: false },
        { text: "The deps array cancelled the interval", correct: false },
        { text: "Renders pause intervals until interaction", correct: false },
      ],
      correctExplanation:
        "Correct. deps [] means one effect, one closure, mount's snapshot forever: count is 0 in that world, and every tick queues 1. `setCount(c => c + 1)` reads the queue instead and counts honestly.",
      incorrectExplanation:
        "Not quite. The interval fires every second, uncancelled and unpaused; each firing computes from the frozen snapshot: 0 + 1. The stale closure is the whole story, and the updater form is the one-word fix. Review: stale closures and the deps contract.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO2"],
      misconceptionTags: ["UIE-M-007"],
    },

    {
      id: "UIE-7-QB-007",
      format: "multiple_choice",
      category: "react_refs",
      difficulty: "foundational",
      stem: "Which value belongs in a ref rather than state?",
      options: [
        { text: "The id returned by setInterval, needed later to clear it", correct: true },
        { text: "The text of a controlled search input", correct: false },
        { text: "The open/closed state of a modal", correct: false },
        { text: "The list of results being rendered", correct: false },
      ],
      correctExplanation:
        "Correct. Nothing on screen changes when an interval id changes: renderless memory is the ref's contract. The other three all drive pixels, which is state's job description.",
      incorrectExplanation:
        "Not quite. The sorting question is 'should changing it repaint?': input text, modal visibility and rendered lists all say yes and are state. The interval id says no, and a ref holds it without buying renders nobody sees. Review: refs.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-008",
      format: "multiple_choice",
      category: "react_refs",
      difficulty: "applied",
      stem: "Why is writing `ref.current` during render a problem?",
      options: [
        {
          text: "Render must stay pure: a mid-render mutation makes output depend on hidden writes",
          correct: true,
        },
        { text: "ref.current is read-only until commit", correct: false },
        { text: "It throws in production builds", correct: false },
        { text: "It schedules an infinite render loop", correct: false },
      ],
      correctExplanation:
        "Correct. Rendering may run twice, be discarded or run concurrently; a render that writes refs has side effects the output silently depends on. Handlers and effects run after commit, which is the ref's legal territory.",
      incorrectExplanation:
        "Not quite. Nothing throws and no loop schedules, which is what makes the bug quiet: the render is no longer a pure function of props and state, and repeat or discarded renders desynchronise the box. Read and write refs in handlers and effects. Review: refs.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO3"],
      misconceptionTags: [],
    },

    {
      id: "UIE-7-QB-009",
      format: "multiple_choice",
      category: "react_memoization",
      difficulty: "foundational",
      stem: "`memo(Child)` receives `style={{ width: 80 }}` inline from its parent. What does memo do on each parent render?",
      options: [
        {
          text: "Renders the child anyway: the object literal is a new reference every time",
          correct: true,
        },
        { text: "Skips the child: the values inside are identical", correct: false },
        { text: "Deep-compares the style object automatically", correct: false },
        { text: "Caches the first style and ignores later ones", correct: false },
      ],
      correctExplanation:
        "Correct. memo's comparison is reference equality, and a literal is born fresh per render: never equal, never skipped. Hoist static objects or useMemo dynamic ones, and the skip starts working.",
      incorrectExplanation:
        "Not quite. memo neither deep-compares nor caches props: it checks references, and `{} !== {}` however identical the contents (UIE-4's identity rule). The fix is upstream: give the prop a stable reference. Review: memoization, paying for identity.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-010",
      format: "multiple_choice",
      category: "react_memoization",
      difficulty: "applied",
      stem: "Which situation makes useCallback a correctness requirement rather than an optimisation?",
      options: [
        { text: "The function is listed in an effect's deps array", correct: true },
        { text: "The function is passed to any child component", correct: false },
        { text: "The function captures more than two variables", correct: false },
        { text: "The component renders more than ten times", correct: false },
      ],
      correctExplanation:
        "Correct. Deps compare by reference: an unstable function reads as 'changed' every render, so the effect churns its subscription or loops. Stabilising that identity is semantics, not speed.",
      incorrectExplanation:
        "Not quite. Children re-render cheaply without memo, and capture counts and render counts decide nothing. The correctness case is the deps array: effects keyed to an unstable function re-run every render, and useCallback is what makes the dep honest. Review: memoization, explore.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-011",
      format: "multiple_choice",
      category: "react_memoization",
      difficulty: "challenging",
      stem: "A team wraps every component in memo and every function in useCallback 'for performance'. What is the strongest review response?",
      options: [
        {
          text: "Memoization is a cost: deps to maintain and comparisons to run; apply it to measured problems",
          correct: true,
        },
        { text: "Approve: more memoization is always faster", correct: false },
        { text: "Reject memo but keep the useCallbacks", correct: false },
        { text: "Replace it all with one memo at the app root", correct: false },
      ],
      correctExplanation:
        "Correct. Every memo runs a comparison per render and every useCallback adds deps that can silently go stale: unmeasured, the blanket buys risk and noise, not speed. Memoize the expensive subtree the profiler names, and let the compiler era take the rest.",
      incorrectExplanation:
        "Not quite. Blanket memoization adds comparisons, memory and stale-deps surface to components that rendered cheaply anyway, and a root memo does nothing for internal cascades. The discipline is measurement first, mechanism second. Review: memoization, and its go-deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO4"],
      misconceptionTags: [],
    },

    {
      id: "UIE-7-QB-012",
      format: "multiple_choice",
      category: "react_context_state",
      difficulty: "foundational",
      stem: "Which state is the right fit for context rather than props?",
      options: [
        { text: "The viewer's locale, read by scattered components at every depth", correct: true },
        { text: "A modal's open flag, used by the modal and its trigger", correct: false },
        { text: "One form's field values", correct: false },
        { text: "A list's hover highlight", correct: false },
      ],
      correctExplanation:
        "Correct. Locale is slow-changing, tree-wide and read everywhere: tunnel props through indifferent layers or teleport with context, and context wins. The other three have narrow, local readers: lift to the nearest parent and stop.",
      incorrectExplanation:
        "Not quite. Context earns its bluntness for slow tree-wide facts, theme, viewer, locale. Modal flags, form fields and hover states have one or two nearby readers: local state or one lift covers them without the every-consumer re-render bill. Review: where state lives.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-013",
      format: "multiple_choice",
      category: "react_context_state",
      difficulty: "applied",
      stem: "A checkout's state has a dozen transitions: add, remove, apply-code, expire-code, clear. Handlers keep drifting out of sync. Which refactor fits?",
      options: [
        {
          text: "useReducer: the legal transitions live in one function; handlers dispatch intents",
          correct: true,
        },
        { text: "One useState holding a giant object, set from each handler", correct: false },
        { text: "Split every field into its own context", correct: false },
        { text: "Move the logic into refs to avoid re-renders", correct: false },
      ],
      correctExplanation:
        "Correct. When transitions outnumber fields, the reducer centralises the rules: every legal move is one case, handlers shrink to `dispatch({ type: 'addItem' })`, and drift has nowhere to live. State stays state; only the update logic moved.",
      incorrectExplanation:
        "Not quite. A giant setState object keeps the rules scattered across handlers, per-field contexts multiply re-render surfaces, and refs would stop the UI updating at all. Many-transitions-few-fields is the reducer's home case. Review: where state lives.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-7-QB-014",
      format: "multiple_choice",
      category: "react_context_state",
      difficulty: "applied",
      stem: "What does a custom hook like `useDebounce(value, delay)` share between the components that call it?",
      options: [
        {
          text: "The logic only: each caller gets its own state, effects and cleanups",
          correct: true,
        },
        { text: "One debounced value all callers read", correct: false },
        { text: "A single timer shared for efficiency", correct: false },
        { text: "Nothing: custom hooks cannot hold state", correct: false },
      ],
      correctExplanation:
        "Correct. A custom hook is a recipe run inside each calling component's render: its useState and useEffect fill THAT component's hook list. Ten callers, ten independent debounces, and shared values would need state lifted above them all.",
      incorrectExplanation:
        "Not quite. Custom hooks hold state happily, per caller: the hook's internals run inside whichever component is rendering, so nothing is shared, no value and no timer. Sharing is a placement decision, lifted state or context, not a hook feature. Review: where state lives, go deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-7-LO5"],
      misconceptionTags: [],
    },
  ],
};
