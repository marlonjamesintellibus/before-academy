import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-6: React Foundations, first of the two React courses (education-lead
 * decision mirroring the JavaScript split: the rendering model settles here,
 * and UIE-7 puts hooks under interview pressure on top of it).
 *
 * Seven models: components as functions, one-way props, rendering as
 * re-running, state as a snapshot per render, immutability as the render
 * trigger, list identity through keys, and controlled inputs. Everything
 * stands on UIE-4/5: components close over their renders, and immutable
 * updates are the spread discipline from fundamentals.
 */
export const uie6Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "react-foundations",
    title: "React Foundations",
    description:
      "The rendering model that every React question assumes: components as functions, one-way props, state as snapshots, immutability as the trigger, keys as identity, and controlled inputs.",
    position: 6,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-6-LESSON-001-HOOK",
      prompt:
        "A button's handler runs `setCount(count + 1); setCount(count + 1);` with count at 0. After the re-render, what is count?",
      choices: ["1", "2", "0 until the next click"],
      reveal:
        "1. Both calls read the same `count`, the snapshot this render was given: 0. Two requests to make it 1 collapse into 1. The functional form `setCount(c => c + 1)` twice gives 2, because each updater receives the queue's latest value. That snapshot model is the single most useful fact in React, and this course is built around it.",
    },
    {
      type: "why_it_matters",
      id: "UIE-6-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "React questions are rarely about the API surface: they probe whether you hold the rendering model. An engineer who knows that a render is a function call over a snapshot can predict every 'why is my state stale' and 'why did this not update' bug before running the code. This course installs that model; the hooks course stress-tests it where interviews do.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-6-LESSON-001-OBJ",
      items: [
        "Read a component as a function of props and state, composed like functions",
        "Trace data down through props and events up through callbacks",
        "Predict re-renders from the snapshot model, including batched updates",
        "Update state immutably so React can see the change",
        "Choose keys that carry identity, and wire controlled inputs",
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-002",
      title: "Components: functions that return UI",
      objective: "Read JSX as function calls and components as composable functions.",
      minutes: 4,
      completion: "You can read a component tree as nested function calls with props as arguments.",
      quick: [
        {
          type: "p",
          text: "A component is a function: props in, description of UI out. JSX is call syntax in costume, and composition is function composition:",
        },
        {
          type: "code",
          language: "jsx",
          code: 'function Badge({ label, tone }) {\n  return <span className={`badge ${tone}`}>{label}</span>;\n}\n\nfunction Card({ user }) {\n  return (\n    <article>\n      <h3>{user.name}</h3>\n      <Badge label={user.role} tone="quiet" />\n    </article>\n  );\n}',
        },
        {
          type: "p",
          text: "Returning JSX builds a description, cheap objects, not DOM: React later decides what the real page needs. Two consequences follow immediately: rendering a component means CALLING it, so anything in the function body runs on every render, and a component must stay a pure function of its inputs during that call, no mutations of anything outside it.",
        },
        {
          type: "ul",
          items: [
            "Capitalised names are components; lowercase are platform elements",
            "Props are the arguments: read-only, destructured at the top by convention",
            "JSX braces embed any expression; attributes become props",
            "Rendering is calling: body code runs every render, so it must stay pure",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "`children` is the prop that makes layout components work: whatever sits between a component's tags arrives as `props.children`, so a `<Panel>` can wrap anything without knowing what. Composition through children is how React codebases avoid the deeply-configured mega-component.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "JSX compiles to plain calls, roughly `jsx(Card, { user })`, returning element objects: `{ type, props }` trees. That is why components must be capitalised (the compiler emits a string for lowercase tags and a function reference for capitalised ones), why you can put elements in variables and arrays, and why rendering twice is calling twice: elements are values, and the whole UI is one big expression.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-6-LESSON-002-CHECK",
      prompt: "A component logs to the console in its function body. When does that log run?",
      correctOptionId: "every",
      options: [
        {
          id: "every",
          text: "On every render of that component: the body IS the render",
          feedback:
            "Correct. Rendering calls the function, body and all, each time. That is why side effects in the body are bugs (the hooks course gives them a proper home) and why render code must stay cheap and pure.",
        },
        {
          id: "once",
          text: "Once, when the component mounts",
          feedback:
            "Mount-only behaviour needs an effect, which UIE-7 covers. The function body has no such privilege: every render re-runs it top to bottom, logs included, which is often the first surprise the console shows a new React engineer.",
        },
        {
          id: "never",
          text: "Never: JSX compilation strips statements",
          feedback:
            "Compilation rewrites only the JSX syntax; the function body is ordinary JavaScript and runs as written, every render. Watching a body log repeat is actually the cleanest way to SEE the rendering model.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-003",
      title: "Props flow down, events flow up",
      objective: "Trace the one-way loop: data down as props, changes up as callbacks.",
      minutes: 4,
      completion:
        "You can wire a child to report upward without the child knowing what the parent does.",
      quick: [
        {
          type: "p",
          text: "Data moves one way: parents pass props down, and children never write to them. When a child needs to change something, the parent passes a function down and the child calls it, data down, events up:",
        },
        {
          type: "code",
          language: "jsx",
          code: "function Parent() {\n  const [query, setQuery] = useState('');\n  return <SearchBox value={query} onChange={setQuery} />;\n}\n\nfunction SearchBox({ value, onChange }) {\n  return (\n    <input value={value} onChange={(e) => onChange(e.target.value)} />\n  );\n}",
        },
        {
          type: "p",
          text: "The child stays reusable because it knows nothing: it renders what it is given and reports what happened. The parent owns the state and the meaning. Interviews probe this as 'how do siblings communicate', and the answer is always the same shape: through the closest common parent, data down to both, events up from each.",
        },
        {
          type: "ul",
          items: [
            "Props are read-only in the child: writing to them is a bug and a smell",
            "Callbacks are props too: `onSomething` down, called with the event's meaning",
            "Siblings communicate through their closest common parent, never sideways",
            "One-way flow is what makes a bug traceable: the writer is always upstream",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Naming carries the contract: a child exposing `onSelect(item)` speaks in its own domain, and the parent decides what selecting means. Children that call `onNavigate` or `onSave` have quietly absorbed parent responsibilities, and the reusability leaks away with the naming.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-6-LESSON-003-CHECK",
      prompt:
        "Two sibling panels must stay in sync: selecting in one highlights in the other. Where does the selection state live?",
      correctOptionId: "parent",
      options: [
        {
          id: "parent",
          text: "In their closest common parent, passed down to both",
          feedback:
            "Correct. Lifting the state to the shared parent gives both siblings the same source: one passes it as the selection, the other receives a callback to change it. Sideways channels do not exist in the one-way model, by design.",
        },
        {
          id: "first",
          text: "In the first panel, with the second reading from it",
          feedback:
            "Siblings cannot read each other: props only arrive from above. The state must climb to where both can receive it, the closest common parent, and flow down twice.",
        },
        {
          id: "both",
          text: "In both panels, synchronised by effects",
          feedback:
            "Duplicated state drifts, and effect-based syncing is the classic tangle that follows. One owner above, two readers below: the shape is boring on purpose, and it is the interview answer.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-004",
      title: "Rendering is re-running",
      objective: "Hold the loop: state change, function call, diff, commit.",
      minutes: 5,
      completion:
        "You can say what triggers a render, what runs during one, and what React does with the result.",
      quick: [
        {
          type: "p",
          text: "The whole model in one sentence: when state changes, React calls your component again and reconciles the new description with the old one. The UI is a function of state, recomputed, not edited.",
        },
        {
          type: "p",
          text: "A render is triggered by a state update (or a parent rendering), runs your function against the CURRENT state to produce a new element tree, and React diffs that tree against the previous one, touching only the DOM that differs. Your code never edits the page; it re-describes it, and React does the minimal surgery. Re-renders cascade downward by default: a parent rendering calls its children too, which is usually fine and occasionally the performance question UIE-7 answers with memoization.",
        },
        {
          type: "ul",
          items: [
            "Triggers: a state update in the component, or a render of its parent",
            "During: your function runs, pure, over the current snapshot",
            "After: React diffs descriptions and commits the minimal DOM change",
            "The DOM you wrote in UIE-4 is still there; React is doing the select-and-update for you",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Because rendering re-runs the body, values derived from state need no storage: `const total = items.reduce(...)` in the body is always fresh, by construction. Storing derived values in their own state is the most common beginner tangle, two sources of truth plus the code to reconcile them, and the render model deletes it: derive during render, store only what cannot be derived.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Reconciliation compares by element type at each position: same type updates in place, different type tears down and rebuilds, state included. That is why a conditional that swaps `<input>` for a different component resets what the user typed, and why position is identity until keys (next stages) say otherwise. The diff is heuristic and linear, which is what makes it fast enough to run on every keystroke.",
          },
        ],
      },
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-005",
      title: "State: a snapshot per render",
      objective: "Predict what state a render sees, and what a queued update will do.",
      minutes: 5,
      completion:
        "You can trace the double-setCount trap and choose the functional update on sight.",
      quick: [
        {
          type: "p",
          text: "`useState` gives a component memory that survives re-renders, but each render receives a SNAPSHOT: the state variable is a plain constant inside one function call. Setting state never changes that constant; it queues a re-render whose call will receive the new value:",
        },
        {
          type: "code",
          language: "jsx",
          label: "the hook question",
          code: "const [count, setCount] = useState(0);\n\nfunction handleClick() {\n  setCount(count + 1); // reads this render's count: 0\n  setCount(count + 1); // still 0: same snapshot\n}\n// next render: count is 1\n\nfunction handleClickRight() {\n  setCount((c) => c + 1); // reads the queue: 0 -> 1\n  setCount((c) => c + 1); // then 1 -> 2\n}",
        },
        {
          type: "p",
          text: "Updates inside handlers batch: one re-render at the end, not one per call. And because handlers are closures (UIE-5's model working for you), a handler created in render one that runs after render five still reads render one's snapshot, which is exactly the stale-value family of questions. The functional form sidesteps it by asking the queue instead of the closure.",
        },
        {
          type: "ul",
          items: [
            "The state variable is a constant per render; setting queues, never edits",
            "Multiple set calls in one handler batch into one re-render",
            "Deriving next-from-current: always the functional form `set(v => ...)`",
            "A handler reads the snapshot of the render that created it: closures, verbatim",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The snapshot explains the alert-after-timeout classic: click, `setTimeout(() => alert(count), 3000)`, click twice more, and the alert says the OLD count. The callback closed over its render's snapshot, and no later render rewrites history. Interviews ask it as a gotcha; the model answers it as a tautology.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Initial state runs once, so `useState(expensive())` pays the cost EVERY render (the call happens before React ignores it); the lazy form `useState(() => expensive())` runs only on mount. And state updates bail out when `Object.is` says nothing changed, which is the bridge to the next stage: mutate an object and set it, and React sees the same reference, same value, no render.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-6-LESSON-005-CHECK",
      prompt:
        "count is 0. A handler runs `setCount(count + 1)` and then `setCount((c) => c + 1)`. After the re-render, count is?",
      correctOptionId: "two",
      options: [
        {
          id: "two",
          text: "2: the plain set queues 1, and the functional updater reads the queue's 1 and adds one",
          feedback:
            "Correct. The first call writes 1 into the queue from the snapshot; the updater form then receives the queue's latest, 1, and returns 2. Mixing forms is legal, and tracing the queue, not the variable, is how you read it.",
        },
        {
          id: "one",
          text: "1: both calls read the same snapshot",
          feedback:
            "That is the outcome when BOTH calls use the plain form. The second call here is an updater: it asks the queue, which already holds 1, and advances it to 2. Snapshot for plain reads, queue for updaters.",
        },
        {
          id: "three",
          text: "3: updates accumulate per call",
          feedback:
            "Only updater calls chain off the queue; the plain call contributed a fixed 1 from the snapshot, and one updater advanced it once: 2. Three would need three effective increments, and the snapshot read gave only one.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-006",
      title: "Immutability is the render trigger",
      objective: "Update objects and arrays so React can see the change.",
      minutes: 4,
      completion:
        "You can explain a mutation that silently skipped a render, and write the spread that fixes it.",
      quick: [
        {
          type: "p",
          text: "React decides 'did state change?' with a reference check. Mutate an array and set it back, and the reference is identical: same value, no re-render, and the UI silently ignores real data:",
        },
        {
          type: "code",
          language: "jsx",
          code: "// silent: same reference, no render\nitems.push(newItem);\nsetItems(items);\n\n// visible: new array, new reference\nsetItems([...items, newItem]);\n\n// nested: spread every level you touch (UIE-4's discipline)\nsetUser({ ...user, prefs: { ...user.prefs, theme } });",
        },
        {
          type: "p",
          text: "This is UIE-4's values-and-references model doing production work: the mutators (`push`, `splice`, `sort`) edit in place and defeat the check, while spread, `map`, `filter` and `toSorted` build new references that carry the news. The habit is total: state is never mutated, only replaced.",
        },
        {
          type: "ul",
          items: [
            "Reference equality is the change detector: new data needs a new object",
            "Add: `[...items, x]`. Remove: `filter`. Change one: `map` with a swap",
            "Nested updates spread every level on the path, exactly as in UIE-4",
            "The mutating methods keep their old names; their copying twins end in -ed",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The same identity rule powers everything downstream: memoized children compare props by reference, effect dependency arrays compare by reference, and context consumers re-render on reference change. Immutability is not a style preference in React; it is the protocol the whole machine listens on, which is why UIE-7 keeps returning to it.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-6-LESSON-006-CHECK",
      prompt: "`todo.done = true; setTodos(todos);` runs, and nothing on screen changes. Why?",
      correctOptionId: "same-ref",
      options: [
        {
          id: "same-ref",
          text: "The array reference is unchanged, so React bails out before rendering",
          feedback:
            "Correct. The mutation edited the shared objects in place; `setTodos` received the same reference and `Object.is` said 'no change'. The fix builds new references along the path: `setTodos(todos.map(t => t.id === id ? { ...t, done: true } : t))`.",
        },
        {
          id: "async",
          text: "The update is asynchronous and has not landed yet",
          feedback:
            "Queued updates land on the next render; this one never queued a change at all, because the reference matched. No amount of waiting renders it: the data changed, and the protocol, reference identity, was never spoken.",
        },
        {
          id: "wrong-hook",
          text: "Objects in state need useReducer instead of useState",
          feedback:
            "Either hook works; both listen on the same protocol. The miss was mutation: edit-in-place presents the old reference, and React reasonably declines to re-render. New references along the touched path fix it under any hook.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-007",
      title: "Lists and keys: identity across renders",
      objective: "Choose keys that let React match items between renders.",
      minutes: 4,
      completion:
        "You can say what a key is FOR, and why the array index betrays reorderable lists.",
      quick: [
        {
          type: "p",
          text: "Rendering a list is a `map` to elements, and keys are how React matches this render's items to last render's, so it can move DOM instead of rebuilding it and keep each item's state with the right item:",
        },
        {
          type: "code",
          language: "jsx",
          code: "{todos.map((todo) => (\n  <TodoRow key={todo.id} todo={todo} />\n))}",
        },
        {
          type: "p",
          text: "The key must name the ITEM, not the position. Index keys work only until the list reorders, inserts or deletes: then item three's state (a checked box, a half-typed input) stays at position three while the data moves, and the UI mixes rows. The classic interview demonstration is exactly that: delete the first row of an index-keyed list and watch every row shift its state up one.",
        },
        {
          type: "ul",
          items: [
            "Keys are for React's matching, not your code: they never arrive as props",
            "Use the data's own identity: an id, a slug, anything stable per item",
            "Index as key is safe only for lists that never reorder, insert mid-list, or filter",
            "A changed key is a teardown order: new element, fresh state, on purpose sometimes",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The teardown behaviour is also a tool: giving a component `key={selectedUserId}` deliberately resets its internal state when the selection changes, which is the idiomatic answer to 'reset this form when the record switches', one attribute instead of an effect that clears fields.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-6-LESSON-007-CHECK",
      prompt:
        "A filterable list uses `key={index}`. Each row has a checkbox. The user checks row 2, then filters, and a different row appears checked. What happened?",
      correctOptionId: "position",
      options: [
        {
          id: "position",
          text: "The checkbox state stayed with position 2 while the data under it changed",
          feedback:
            "Correct. Index keys tell React 'position is identity', so filtering moved the data but the row-level state stayed put. Keys from the item's own id keep state travelling with the item, which is the entire job of a key.",
        },
        {
          id: "filter-bug",
          text: "The filter function mutated the array",
          feedback:
            "Filtering copies; the data is fine. The mixing came from identity: index keys pinned the checkbox state to a position, and the filter changed which item occupies it. The id key is the one-word fix.",
        },
        {
          id: "batch",
          text: "The check and the filter batched into one confused render",
          feedback:
            "Batching merges renders, never crosses wires between rows. The wires crossed because React matched rows by position, as the index keys instructed. Identity keys make the matching follow the data.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-6-LESSON-008",
      title: "Controlled inputs: the form speaks state",
      objective: "Wire inputs where React state is the single source of truth.",
      minutes: 4,
      completion:
        "You can build a controlled input and say what each half of the value/onChange pair does.",
      quick: [
        {
          type: "p",
          text: "A controlled input has no opinion of its own: `value` pins what it shows to state, and `onChange` reports every keystroke so state can decide what happens next:",
        },
        {
          type: "code",
          language: "jsx",
          code: "const [email, setEmail] = useState('');\n\n<input\n  type=\"email\"\n  value={email}\n  onChange={(e) => setEmail(e.target.value)}\n/>",
        },
        {
          type: "p",
          text: "The loop is the render model in miniature: keystroke, onChange, setState, re-render, the input shows the new value. It feels circular until it pays: validation, formatting, disabling the submit, clearing after save, all become ordinary state logic, because the form IS state. Set `value` without `onChange` and the input freezes, the half-wired form every React beginner meets once.",
        },
        {
          type: "ul",
          items: [
            "`value` pins the display to state; `onChange` is state's only way to learn",
            "Derive validation and button-disabling from the same state during render",
            "Checkboxes pair `checked` with `onChange`; selects pair `value` on the select",
            "The label wiring from UIE-3 still applies: `htmlFor` matching the input's id",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Uncontrolled inputs, where the DOM keeps the value and a ref reads it on submit, remain legitimate for simple forms, and UIE-7's ref stage covers the tool. The decision rule: if anything must react WHILE the user types, control it; if the value only matters at submit, an uncontrolled input plus one read is less machinery.",
          },
        ],
      },
    },

    {
      type: "diagram",
      id: "UIE-6-LESSON-008-DIAGRAM",
      title: "One render cycle",
      claim: "What happens between a click and the pixels changing.",
      altText: "The React render cycle as five sequential steps",
      longText:
        "The cycle runs five steps. A trigger: an event handler calls a state setter, queueing an update; handlers batch their updates. Render: React calls the component function with the NEW state snapshot; the body runs, derived values recompute, and the return describes the UI. Diff: the new description is compared with the previous one, type by type, key by key. Commit: only the differences touch the real DOM. Paint: the browser draws, and the page waits for the next trigger. Effects, the hooks course's subject, run after commit.",
      layers: [
        {
          id: "trigger",
          label: "Trigger",
          description:
            "A handler calls a setter: the update queues, the handler finishes, and batching folds multiple sets into one pass.",
        },
        {
          id: "render",
          label: "Render",
          description:
            "React calls the component with the new snapshot. The whole body runs: derivations recompute, JSX describes the result.",
        },
        {
          id: "diff",
          label: "Diff",
          description:
            "New description against old: same type updates in place, keys match list items, changed types tear down.",
        },
        {
          id: "commit",
          label: "Commit",
          description:
            "The minimal DOM surgery happens here: only what differs is touched, which is the framework's whole performance bet.",
        },
        {
          id: "paint",
          label: "Paint",
          description:
            "The browser draws the committed changes on the next frame, and the cycle waits for its next trigger.",
        },
      ],
      predict: {
        prompt:
          "A handler sets state three times with plain (non-functional) calls. How many renders follow?",
        options: [
          { text: "One: handler updates batch into a single render", correct: true },
          { text: "Three: one per set call", correct: false },
          { text: "Zero until the browser is idle", correct: false },
        ],
        revealLabel: "Walk the cycle and count the passes:",
      },
    },
    {
      type: "misconception",
      id: "UIE-6-LESSON-008-MISCONCEPTION",
      misconceptionId: "UIE-M-007",
      claim: "Calling setState changes the state variable right there in the running code.",
      correction:
        "The state variable is a constant belonging to its render: a snapshot. Setting state queues a NEW render whose function call receives the new value; nothing in the current call changes, which is why two plain sets read the same value and why a timeout logs the old count. Read state as 'this render's photograph', and every stale-value question answers itself.",
    },

    {
      type: "takeaway",
      id: "UIE-6-LESSON-009-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Seven models: components are functions called on every render, props flow down while events climb, rendering re-runs and diffs, state is a snapshot with a queue behind it, new references are how change becomes visible, keys give list items identity, and controlled inputs make forms into state. Hold these and the hooks course reads as consequences, not new material.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-6-LESSON-009-ACT",
      body: "Six review calls on real component code: predict the render, spot the mutation the UI ignored, and pick the key that keeps state with its item. The feedback traces the cycle that decides each one.",
    },
    {
      type: "check_cta",
      id: "UIE-6-LESSON-009-CHECK",
      body: "Four short problems, one per core model. Nothing is graded, and every answer walks the snapshot, the reference, or the key.",
    },
    {
      type: "next_step",
      id: "UIE-6-LESSON-009-NEXT",
      body: "React Hooks in Depth closes the pathway: effects and cleanup, the stale-closure family, refs, memoization against the identity rule you just learned, context, reducers and custom hooks, every one an interview staple standing on this course's model.",
    },
  ],
  glossary: [],
};
