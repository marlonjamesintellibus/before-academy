import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-7: React Hooks in Depth, the readiness deck's module ("React hooks
 * practice: hook patterns and state management") and the pathway's close.
 *
 * Seven models on top of UIE-6's rendering model and UIE-5's closures: the
 * rules of hooks as a consequence of call-order identity, effects as
 * synchronisation with cleanup, the stale-closure family and the deps
 * contract, refs as renderless memory, memoization against reference
 * identity, context and where state lives, and reducers plus custom hooks
 * as the packaging tier.
 */
export const uie7Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "react-hooks-in-depth",
    title: "React Hooks in Depth",
    description:
      "Hook patterns and state management under interview pressure: effects and cleanup, stale closures and the deps contract, refs, memoization, context, reducers and custom hooks.",
    position: 7,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-7-LESSON-001-HOOK",
      prompt:
        "An effect with an empty deps array starts `setInterval(() => setSeconds(seconds + 1), 1000)`. What does the timer display do?",
      choices: [
        "Counts up every second",
        "Shows 1 forever after the first tick",
        "Crashes when the component re-renders",
      ],
      reveal:
        "Shows 1 forever. The interval callback closed over the FIRST render's seconds, 0, and computes 0 + 1 every tick: the display reaches 1 and freezes there. UIE-5's closures plus UIE-6's snapshots, colliding in the most-asked hooks question there is. The fix is one updater: `setSeconds(s => s + 1)`. This course is about seeing that collision coming.",
    },
    {
      type: "why_it_matters",
      id: "UIE-7-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Hooks are where React interviews go to find depth, because hooks sit exactly on the join between the rendering model and the closure model: every effect, callback and memo is a closure over one render's snapshot, scheduled by rules. Engineers who hold both models write effects that clean up, deps that tell the truth, and memoization that actually memoizes; engineers who hold neither produce the intervals, leaks and infinite loops this course dissects.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-7-LESSON-001-OBJ",
      items: [
        "Explain the rules of hooks from the mechanism: call order is identity",
        "Write effects that synchronise, clean up, and survive strict mode",
        "Diagnose stale closures and choose among deps, updaters and refs",
        "Apply memoization where reference identity earns it, and skip it where it is noise",
        "Place state with context, reducers and custom hooks",
      ],
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-002",
      title: "The rules of hooks: order is identity",
      objective: "Derive the rules from how hooks are stored, not from the linter.",
      minutes: 4,
      completion: "You can say WHY hooks cannot sit in conditionals, from the storage model.",
      quick: [
        {
          type: "p",
          text: "React stores a component's hook state in a list, matched to hook CALLS by position: first useState gets slot one, second gets slot two. Nothing else identifies them, no names, no keys, just order. Both rules fall straight out:",
        },
        {
          type: "code",
          language: "jsx",
          label: "why the linter objects",
          code: "if (isEditing) {\n  // slot numbering shifts for every hook below\n  const [draft, setDraft] = useState('');\n}\n\n// legal: call the hook always, use the value conditionally\nconst [draft, setDraft] = useState('');\nif (isEditing) {\n  /* use draft */\n}",
        },
        {
          type: "p",
          text: "A hook inside a conditional makes render five's slot three a DIFFERENT hook than render four's slot three, and React hands state to the wrong owners from there on. Same mechanism for loops and early returns before hooks. And hooks only work inside components or other hooks because that list belongs to the currently rendering component; a plain function has no list to read.",
        },
        {
          type: "ul",
          items: [
            "Hooks are matched by call order: slot N this render is slot N next render",
            "No conditionals, loops or early returns before hooks: the numbering must hold",
            "Call always, use conditionally: the value is yours to ignore",
            "Only components and custom hooks may call hooks: they run inside a render",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The storage model also explains why `key` remounting (UIE-6's reset idiom) resets EVERY hook in the component: the new instance starts an empty list. And it explains why two components using the same custom hook share nothing: each component's render fills its own list, so a custom hook is a recipe, never a store.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-7-LESSON-002-CHECK",
      prompt:
        "A component returns early for a loading state ABOVE its second useState. Sometimes state values swap between hooks. Why?",
      correctOptionId: "order",
      options: [
        {
          id: "order",
          text: "Renders that return early call fewer hooks, so slot numbering shifts between renders",
          feedback:
            "Correct. Loading renders fill slots one deep; loaded renders fill three, and the matching by position hands old slot values to different hooks. Hooks first, early returns after: the numbering must be identical every render.",
        },
        {
          id: "async",
          text: "The loading data races the state initialisation",
          feedback:
            "No race is involved: the swap is bookkeeping. Position is the only identity hooks have, and an early return above a hook changes how many positions exist on some renders. Move every hook above the return.",
        },
        {
          id: "memory",
          text: "React garbage-collected the unused hooks during loading",
          feedback:
            "Nothing was collected: the list survived intact and was mis-indexed on the next full render, nothing more. The rule exists to keep the indexing honest: same hooks, same order, every render.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-003",
      title: "Effects: synchronising with the outside",
      objective: "Write effects that set up, clean up, and say their deps honestly.",
      minutes: 5,
      completion:
        "You can wire a subscription effect with cleanup and predict when each part runs.",
      quick: [
        {
          type: "p",
          text: "Render must stay pure, and the world outside React, subscriptions, timers, network, the document title, still needs touching. Effects are the bridge: they run AFTER commit, and each one returns the instructions for undoing itself:",
        },
        {
          type: "code",
          language: "jsx",
          label: "the subscription shape",
          code: "useEffect(() => {\n  const socket = connect(roomId);\n  socket.on('message', addMessage);\n  return () => socket.disconnect(); // cleanup\n}, [roomId]);",
        },
        {
          type: "p",
          text: "The deps array is a contract: this effect reads roomId, so re-run it when roomId changes. On a change, cleanup for the OLD value runs first, then the effect for the new one: disconnect room A, connect room B. Unmount runs the final cleanup. Strict mode mounts, cleans up and remounts once in development, precisely to catch effects whose cleanup is missing or wrong; an effect that survives the double-run is an effect written honestly.",
        },
        {
          type: "ul",
          items: [
            "Effects run after commit; the screen is already updated when they start",
            "Cleanup runs before the next run of the same effect, and at unmount",
            "Deps list everything from the render the effect reads: the honesty contract",
            "Strict mode's double-mount is a cleanup detector, not a bug to silence",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The most common effect is one you should delete: deriving state (UIE-6's cart total) or handling a user action both have better homes, render and handlers. The question that survives contact with real codebases: does this effect synchronise with something outside React? If nothing outside React is involved, the effect is probably a workaround wearing a hook.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Fetching in effects meets the race: the user flips from profile A to B, both requests fly, and A's slow response lands last, painting B's page with A's data. The cleanup solves it with a flag or an AbortController: cleanup for A marks it stale or aborts it, so only the current render's request may write state. Interviews love this one because it composes three models: effects, closures and network timing.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-7-LESSON-003-CHECK",
      prompt:
        "An effect adds a window resize listener with no cleanup, and deps []. The component mounts and unmounts across navigation. What accumulates?",
      correctOptionId: "listeners",
      options: [
        {
          id: "listeners",
          text: "One orphaned listener per mount, each a closure keeping its render alive",
          feedback:
            "Correct. Every mount adds a listener nobody removes; each closes over its render's scope, pinning it in memory (UIE-5's leak, hook edition). The one-line return, removeEventListener, is what unmount cleanup is FOR.",
        },
        {
          id: "nothing",
          text: "Nothing: unmount detaches everything the component created",
          feedback:
            "Unmount runs cleanups; this effect declared none. The listener lives on `window`, which never unmounts, so the browser keeps calling into dead renders. The cleanup return is the detachment, and it is opt-in.",
        },
        {
          id: "one",
          text: "At most one: addEventListener deduplicates by event name",
          feedback:
            "Deduplication needs the SAME function reference, and every mount creates a fresh closure: distinct references, distinct listeners, one per mount. The cleanup return removes each render's own listener, which no dedupe rule will do for you.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-004",
      title: "Stale closures and the deps contract",
      objective: "Diagnose the frozen-timer family and choose the right fix on sight.",
      minutes: 5,
      completion:
        "You can name why an effect reads old state, and pick deps, updater or ref deliberately.",
      quick: [
        {
          type: "p",
          text: "The hook that opened this course is a genre. An effect with deps [] runs once, and everything inside it closes over the FIRST render's snapshot forever: state, props, handlers, all frozen at mount. Three honest fixes, each with its own use:",
        },
        {
          type: "code",
          language: "jsx",
          label: "three fixes for the frozen interval",
          code: "// 1. Updater: no snapshot needed, ask the queue\nsetInterval(() => setSeconds((s) => s + 1), 1000);\n\n// 2. Honest deps: re-make the interval when seconds changes\nuseEffect(() => {\n  const id = setInterval(() => setSeconds(seconds + 1), 1000);\n  return () => clearInterval(id);\n}, [seconds]);\n\n// 3. A ref: read latest without re-running the effect\nconst latest = useRef(onTick);\nlatest.current = onTick;",
        },
        {
          type: "p",
          text: "The updater wins when the effect only advances its own state. Honest deps win when re-running is cheap and cleanup is written, the effect stays simple at the cost of churn. The ref wins for callbacks and values the effect must READ fresh without re-subscribing, a mutable window into the current render that the next stage makes precise. Deleting deps to silence the linter is the one non-fix: the lie does not change what the closure captured.",
        },
        {
          type: "ul",
          items: [
            "deps [] freezes every captured value at mount: that is its meaning",
            "Advancing own state: the updater form needs no snapshot at all",
            "Reading fresh values: honest deps re-run, or a ref reads through",
            "Silencing the lint warning changes the warning, never the capture",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The same genre wears other costumes: a debounced search reading a stale query, a drag handler reading mount-time coordinates, a websocket handler dispatching with old state. The diagnostic is always UIE-5's question, which variable, born when, and the answer is always one of the same three fixes. Recognising the genre is worth more than memorising any instance.",
          },
        ],
      },
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-005",
      title: "Refs: memory without renders",
      objective: "Use refs for mutable values and DOM handles, and know what they never do.",
      minutes: 4,
      completion:
        "You can choose between state and a ref from one question: should changing it repaint?",
      quick: [
        {
          type: "p",
          text: "`useRef` is a box that survives renders: `ref.current` can be read and written any time, and changing it renders NOTHING. That is the whole contract, and it cuts both ways:",
        },
        {
          type: "code",
          language: "jsx",
          code: "const inputRef = useRef(null); // DOM handle\nconst timerId = useRef(null); // mutable value\n\n<input ref={inputRef} />;\n// later, in a handler or effect:\ninputRef.current.focus();\ntimerId.current = setInterval(tick, 1000);",
        },
        {
          type: "p",
          text: "The decision rule: if the UI should change when the value changes, it is state; if not, a ref. Interval ids, previous-value stashes, latest-callback boxes, and DOM nodes for focus and measurement are refs. Anything rendered is state. Reading or writing `ref.current` during render breaks purity (the render lies about what it used); handlers and effects are the ref's territory.",
        },
        {
          type: "ul",
          items: [
            "`ref.current` mutates freely and never schedules a render",
            "The question: should this repaint the screen? state if yes, ref if no",
            "DOM refs fill at commit: read them in effects and handlers, not during render",
            "The latest-value box from the previous stage is this hook's signature trick",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Refs pair with UIE-6's uncontrolled inputs: `defaultValue` plus a ref read at submit is the two-line form. And measuring layout, a tooltip's height, a scroll position, is a DOM ref read inside an effect, after commit, exactly where UIE-3's rendering pipeline says the numbers exist.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-7-LESSON-005-CHECK",
      prompt:
        "A component stores its interval id in state: `const [id, setId] = useState(null)`. What is the practical cost over a ref?",
      correctOptionId: "renders",
      options: [
        {
          id: "renders",
          text: "Every id change re-renders the component for a value nothing displays",
          feedback:
            "Correct. State exists to drive UI, and the id drives none: each set is a wasted render, and in effect-heavy components a loop risk. The decision rule, should this repaint, answers ref, and `timerId.current` costs nothing.",
        },
        {
          id: "loses",
          text: "State loses the id between renders",
          feedback:
            "State persists fine; that is its job. The waste is the opposite direction: persistence PLUS a render per change, for a value with no visual meaning. Refs persist without the render bill.",
        },
        {
          id: "illegal",
          text: "Interval ids are objects and cannot live in state",
          feedback:
            "State holds any value happily. The issue is fit: a renderless value in a render-driving hook buys repaints nobody asked for. The ref is the renderless box built for exactly this.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-006",
      title: "Memoization: paying for identity",
      objective: "Apply memo, useMemo and useCallback where reference identity earns it.",
      minutes: 5,
      completion:
        "You can say why an inline object defeats memo, and where the three tools actually pay.",
      quick: [
        {
          type: "p",
          text: "UIE-6 established that re-renders cascade downward and that React compares by reference. Memoization is the toolkit that exploits both: `memo(Child)` skips the child when props are reference-equal, and the two hooks keep references stable across renders:",
        },
        {
          type: "code",
          language: "jsx",
          label: "why memo alone is not enough",
          code: "const Chart = memo(ChartInner);\n\n// defeats memo: a fresh object and function every render\n<Chart options={{ smooth: true }} onSelect={(p) => select(p)} />;\n\n// honours memo: stable references\nconst options = useMemo(() => ({ smooth: true }), []);\nconst onSelect = useCallback((p) => select(p), []);\n<Chart options={options} onSelect={onSelect} />;",
        },
        {
          type: "p",
          text: "Every render builds fresh objects and functions (UIE-4: `[1] === [1]` is false), so inline props hand memo a new reference each time and the skip never fires. `useMemo` caches a computed value, `useCallback` caches a function, both keyed by deps, the same honesty contract effects use. And the flip side is discipline: memoization is a cost (memory, deps to maintain, indirection), so it earns its place behind a measured problem, an expensive subtree, a hot list, a stable-identity requirement, not as seasoning on every component.",
        },
        {
          type: "ul",
          items: [
            "`memo` skips a child when every prop is reference-equal to last render",
            "Inline objects, arrays and arrows are new references by construction",
            "`useMemo` for values, `useCallback` for functions, deps as the cache key",
            "Memoize measured problems, not on principle: unmeasured memo is noise with deps",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The second consumer of stable identity is the deps array itself: an unstable function in an effect's deps re-runs the effect every render, which is how subscription loops are born. `useCallback` there is not a performance choice but a correctness one, and it is the honest answer to 'when is useCallback required rather than nice'.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "The React Compiler is moving this whole stage into the build step: it analyses components and inserts the caching automatically, which is why the ecosystem's direction is 'write plain code, let the compiler memoize'. The model still matters, the compiler is applying exactly these rules, but hand-written useMemo is becoming the exception for library boundaries and semantic identity rather than the default hygiene it once was.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-7-LESSON-006-CHECK",
      prompt:
        "`const Row = memo(RowInner)` still re-renders every keystroke. The parent passes `onPick={(id) => pick(id)}` inline. Why?",
      correctOptionId: "fresh-fn",
      options: [
        {
          id: "fresh-fn",
          text: "The inline arrow is a new function each render, so the prop comparison never matches",
          feedback:
            "Correct. memo compares by reference and the arrow is born fresh per render: unequal, render. Wrap it in `useCallback` (or pass a stable handler) and the skip starts firing. Identity, not size, is what memo reads.",
        },
        {
          id: "memo-broken",
          text: "memo does not work on components that take functions",
          feedback:
            "memo handles function props fine, PROVIDED the reference is stable. The inline arrow guarantees it never is. The fix is upstream, in the parent's render: `useCallback` gives the same function to every render.",
        },
        {
          id: "keystroke",
          text: "Keystrokes bypass memoization by design",
          feedback:
            "No event bypasses anything: the parent re-renders on each keystroke and offers Row a brand-new onPick. memo declines to skip because a prop genuinely differs, by reference. Stabilise the reference and keystrokes stop reaching Row.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-7-LESSON-007",
      title: "Where state lives: context, reducers, custom hooks",
      objective: "Place state at the right height and package its logic honestly.",
      minutes: 5,
      completion:
        "You can choose among lifting, context and a reducer, and extract a custom hook that reads like a sentence.",
      quick: [
        {
          type: "p",
          text: "State placement is a height question: as low as possible, lifted only as high as the widest reader (UIE-6). When props would tunnel through many indifferent layers, context teleports instead:",
        },
        {
          type: "code",
          language: "jsx",
          code: "const ThemeContext = createContext('light');\n\n<ThemeContext.Provider value={theme}>...</ThemeContext.Provider>;\n\n// any depth below:\nconst theme = useContext(ThemeContext);",
        },
        {
          type: "p",
          text: "Context's cost is its bluntness: every consumer re-renders when the value's REFERENCE changes, which is the memoization stage applying itself (an inline value object on the provider re-renders every consumer every render). It suits slow-changing tree-wide facts, theme, viewer, locale, not hot data. When one piece of state has many transition rules, `useReducer` centralises them: handlers dispatch actions, one reducer owns the legal moves, and the component reads like a list of intentions. And a custom hook is just a function that calls hooks: `useDebounce`, `useLocalStorage`, packaging state logic behind a name, each caller getting its own instance (the rules stage's list model).",
        },
        {
          type: "ul",
          items: [
            "Lift to the widest reader, no higher; colocate what only one branch needs",
            "Context for slow tree-wide facts; memoize the provider value or pay per render",
            "Reducers when transitions outnumber fields: the legal moves live in one place",
            "Custom hooks share logic, never state: each call is a fresh instance",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The interview question 'when do you reach for a state library' answers itself from this ladder: libraries earn their place when server-cache concerns (deduping, invalidation, optimistic updates) or cross-cutting write patterns outgrow lifted state plus context. Naming the ladder first, local, lifted, context, reducer, library, is the senior answer; jumping to the library is the junior one.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "A custom hook's api is a design surface: `useDebounce(value, delay)` returning the settled value hides a ref, an effect and a cleanup behind one sentence. The discipline inside is everything this course taught, honest deps, cleanup on change, refs for the mutable bits, which is why extracting a hook is the sharpest probe of whether the models actually hold: a leaky custom hook leaks in every component that calls it.",
          },
        ],
      },
    },

    {
      type: "diagram",
      id: "UIE-7-LESSON-007-DIAGRAM",
      title: "The life of an effect",
      claim: "When effects run, clean up, and run again, from mount to unmount.",
      altText: "The effect lifecycle as five sequential steps",
      longText:
        "The lifecycle has five steps. Render commits: the DOM is updated and the screen is current before any effect runs. Effects run: each effect executes with its render's snapshot, top to bottom. Deps compare: on the next commit, each effect's deps are checked by reference against last time. Cleanup then re-run: for any changed deps, the OLD effect's cleanup runs first, then the new effect, old room disconnected before new room connects. Unmount: every effect's final cleanup runs, and strict mode rehearses this whole cycle once at mount to catch missing cleanups early.",
      layers: [
        {
          id: "commit",
          label: "Commit first",
          description:
            "The render's DOM changes land and the screen is current. Effects never block paint; they follow it.",
        },
        {
          id: "run",
          label: "Effects run",
          description:
            "Each effect executes with its render's snapshot: the closures it holds are that render's, forever.",
        },
        {
          id: "compare",
          label: "Deps compare",
          description:
            "Next commit, each deps array is checked item by item, by reference. Unchanged deps skip the effect entirely.",
        },
        {
          id: "cleanup",
          label: "Cleanup, then re-run",
          description:
            "Changed deps: the previous effect's cleanup runs first, then the new effect. Disconnect the old room, connect the new.",
        },
        {
          id: "unmount",
          label: "Unmount",
          description:
            "Final cleanups run in order. Strict mode rehearses mount-cleanup-remount in development to expose effects that skip this step.",
        },
      ],
      predict: {
        prompt: "roomId changes from A to B. In what order do the effect pieces run?",
        options: [
          { text: "Cleanup for A, then the effect for B", correct: true },
          { text: "The effect for B, then cleanup for A", correct: false },
          { text: "Only the effect for B: cleanup is unmount-only", correct: false },
        ],
        revealLabel: "Walk the lifecycle and place the disconnect:",
      },
    },
    {
      type: "misconception",
      id: "UIE-7-LESSON-007-MISCONCEPTION",
      misconceptionId: "UIE-M-008",
      claim: "useEffect is the tool for reacting to state changes, like a watcher.",
      correction:
        "Reacting to state IS rendering: derived values compute in the body, and UI responds by re-rendering. Effects exist for the world outside React, subscriptions, timers, network, the DOM beyond your tree. An effect that only watches state to set other state is a derivation in the wrong place, one render late and drifting; the render body already does that job, on time, for free.",
    },

    {
      type: "takeaway",
      id: "UIE-7-LESSON-008-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Hooks are the two models joined: call order gives them identity, effects synchronise with the outside and undo themselves, deps are an honesty contract about what a closure captured, refs remember without repainting, memoization trades deps for stable references where measurement says so, and state lives at the lowest height that serves its widest reader. Every tricky hooks question is one of these sentences wearing a costume, and you have now met the whole wardrobe.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-7-LESSON-008-ACT",
      body: "Six review calls from hooks code in the wild: frozen timers, orphaned listeners, defeated memo, lying deps. Name the mechanism, pick the honest fix, and check your trace.",
    },
    {
      type: "check_cta",
      id: "UIE-7-LESSON-008-CHECK",
      body: "Four short problems across the models. Nothing is graded, and every answer traces the closure, the deps, or the lifecycle.",
    },
    {
      type: "next_step",
      id: "UIE-7-LESSON-008-NEXT",
      body: "This closes the UI Engineer Readiness pathway: the reasoning routine, the logical ability families, the web foundations, both JavaScript courses and both React courses. The graded assessments across all seven modules are the readiness signal; retake any of them any time, with a different combination each attempt.",
    },
  ],
  glossary: [],
};
