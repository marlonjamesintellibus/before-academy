import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-4: JavaScript Fundamentals, first of the two JavaScript courses
 * (education-lead decision: fundamentals and depth split into separate
 * modules so the mental models settle before the tricky tier tests them).
 *
 * Six models: values and references, types and equality, scope and closures,
 * the collections toolkit, the DOM and events, and errors as information.
 * The in-depth course (UIE-5) owns this-binding, the event loop, promises,
 * coercion traps and prototypes.
 *
 * Depth bar per UIE-3's second edition: every concept carries Explore
 * further, Go deeper where the craft lives, code blocks teach alongside
 * prose, and inline checks land inside the stage they test.
 */
export const uie4Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "The six models everyday JavaScript runs on: values and references, types and equality, scope and closures, the collections toolkit, the DOM, and errors as information.",
    position: 4,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-4-LESSON-001-HOOK",
      prompt: "After `const a = [1, 2]; const b = a; b.push(3);` what is `a.length`?",
      choices: ["2: b is a copy", "3: a and b are the same array", "An error: a is const"],
      reveal:
        "3. `b = a` copies the reference, not the array: both names point at one object, so a mutation through either is visible through both. And `const` never froze anything: it locks the binding, not the value. Those two sentences resolve half the surprising bugs in everyday JavaScript, which is why this course starts here.",
    },
    {
      type: "why_it_matters",
      id: "UIE-4-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "JavaScript is the layer where UI work stops being declarative: state changes, events fire, data transforms. Evaluations probe fundamentals because they predict debugging speed: an engineer who knows what a reference is finds the shared-array bug in minutes, and one who does not loses an afternoon to it. This course builds the six models that everyday code runs on; the in-depth course that follows stress-tests them with the tricky tier.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-4-LESSON-001-OBJ",
      items: [
        "Predict when two names share one value and when they hold copies",
        "Use strict equality and the falsiness list without guessing",
        "Trace what a closure captures and why it still works after its function returns",
        "Transform data with destructuring, spread and the map, filter, reduce trio",
        "Wire the DOM: select, listen, update, and read errors as directions",
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-002",
      title: "Values and references",
      objective: "Know when an assignment copies and when it aliases.",
      minutes: 5,
      completion: "You can predict whether a change through one name is visible through another.",
      quick: [
        {
          type: "p",
          text: "JavaScript has two kinds of values. Primitives, numbers, strings, booleans, `null`, `undefined`, copy on assignment: each name holds its own value. Objects, which includes arrays and functions, assign by reference: the name holds a pointer, and copying the name copies the pointer.",
        },
        {
          type: "code",
          language: "js",
          code: "const a = [1, 2];\nconst b = a; // same array, second name\nb.push(3);\na.length; // 3\n\nlet x = 2;\nlet y = x; // own copy\ny += 1;\nx; // still 2",
        },
        {
          type: "p",
          text: "`const` locks the binding, not the value: `a` can never point at a different array, and the array can still change. Freezing content is a separate act (`Object.freeze`), and true copies are explicit: `[...a]` and `{ ...obj }` copy one level deep, which is exactly one level more than assignment copies.",
        },
        {
          type: "ul",
          items: [
            "Primitives copy; objects, arrays and functions alias",
            "`const` forbids reassignment of the name, never mutation of the value",
            "`[...a]` and `{ ...obj }` are shallow copies: nested objects are still shared",
            "Two variables, one bug: unexpected sharing is the first thing to suspect",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Equality follows the same split: `===` on objects compares identity, not contents, so `[1] === [1]` is false: two arrays, two pointers. When code needs are-these-the-same-data, it must say how: compare fields, serialise, or use a library's deep equality, because the language only offers is-this-the-same-object.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "The shallow-copy trap has a signature: `const next = { ...state }` then `next.user.name = x` mutates the original `state.user`, because one level down the copy shares everything. Immutable updates spread at every level they touch: `{ ...state, user: { ...state.user, name: x } }`. React's rendering model leans on exactly this discipline, which is why it is worth owning before the React module.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-4-LESSON-002-CHECK",
      prompt:
        "A function receives an array parameter and calls `list.sort()` on it. What does the caller observe?",
      correctOptionId: "mutated",
      options: [
        {
          id: "mutated",
          text: "Their array is now sorted too: the parameter aliased it, and `sort` mutates in place",
          feedback:
            "Correct. Passing an array passes the reference, and `sort` reorders the one shared array. A function that should not surprise its caller sorts a copy: `[...list].sort()`.",
        },
        {
          id: "copy",
          text: "Nothing: parameters receive copies",
          feedback:
            "Primitives arrive as copies; arrays arrive as references. The parameter is a second name for the caller's array, so the in-place `sort` reaches straight back. `[...list].sort()` is the polite version.",
        },
        {
          id: "frozen",
          text: "An error, if the caller declared the array with `const`",
          feedback:
            "`const` guards the caller's binding, not the array's contents: mutation through any alias remains legal. The visible effect is a sorted original, which is why in-place methods deserve suspicion at function boundaries.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-003",
      title: "Types, truthiness and strict equality",
      objective: "Answer type questions from the model, not from superstition.",
      minutes: 4,
      completion: "You can list the falsy values and say why `===` is the everyday equality.",
      quick: [
        {
          type: "p",
          text: "The type system is small enough to memorise: seven primitives plus objects, inspected with `typeof`, which has one famous lie: `typeof null` is 'object', a bug standardised into permanence. Every value also carries a truthiness, and the falsy list is short enough to own outright:",
        },
        {
          type: "code",
          language: "js",
          label: "the complete falsy list",
          code: "false, 0, -0, 0n, '', null, undefined, NaN\n// everything else is truthy: '0', [], {}, 'false'",
        },
        {
          type: "p",
          text: "Loose equality `==` coerces before comparing, which is a machine for surprises: `'' == 0` is true. Strict equality `===` compares value and type with no conversions, and it is the everyday habit; the in-depth course visits the trick zoo that `==` breeds. One resident matters now: `NaN === NaN` is false, so checking for it takes `Number.isNaN(x)`.",
        },
        {
          type: "ul",
          items: [
            "Eight falsy values, everything else truthy, including `'0'`, `[]` and `{}`",
            "`===` for equality; reach for `==` only deliberately, and expect a comment explaining why",
            "`typeof null` says 'object': the check for null is `x === null`",
            "`Number.isNaN` for NaN, since NaN refuses to equal itself",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Truthiness powers the guard idioms: `value || fallback` substitutes on any falsy value, which wrongly swallows `0` and `''`. The precision tool is `??`, which substitutes only for `null` and `undefined`, and `?.`, which stops a property chain at the first nullish link instead of throwing. Together they express 'absent' without catching 'empty'.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-4-LESSON-003-CHECK",
      prompt:
        "A discount of `0` percent renders as 'Free shipping' because of `discount || 'Free shipping'`. What is the precise fix?",
      correctOptionId: "nullish",
      options: [
        {
          id: "nullish",
          text: "`discount ?? 'Free shipping'`: substitute only when the value is null or undefined",
          feedback:
            "Correct. `0` is falsy, so `||` treats a real zero as absence. `??` narrows the substitution to genuinely missing values, and the legitimate zero flows through to render as 0 percent.",
        },
        {
          id: "strict",
          text: "`discount === 0 || 'Free shipping'`",
          feedback:
            "This expression evaluates to `true` for a zero discount, which is further from the goal. The intent, use the value unless it is missing, has a dedicated operator: `discount ?? 'Free shipping'`.",
        },
        {
          id: "string",
          text: "Convert the discount to a string first, since '0' is truthy",
          feedback:
            "It works by accident and reads as a riddle: the code now depends on string truthiness to express 'missing'. `??` states the actual rule, only substitute for null and undefined, in one operator.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-004",
      title: "Scope and closures: functions remember their birthplace",
      objective: "Trace what a function can see, and why it still sees it later.",
      minutes: 5,
      completion:
        "You can predict a lookup through the scope chain and explain a closure without hand-waving.",
      quick: [
        {
          type: "p",
          text: "Every function carries the scope it was born in. A name that is not local resolves outward, through the enclosing function, to the module, and that chain is fixed by where the code is written, not where it is called from. `let` and `const` live inside their nearest block; `var` ignores blocks and floats to the function, one of several reasons it retired.",
        },
        {
          type: "code",
          language: "js",
          label: "a closure at work",
          code: "function makeCounter() {\n  let count = 0;\n  return function () {\n    count += 1;\n    return count;\n  };\n}\nconst next = makeCounter();\nnext(); // 1\nnext(); // 2",
        },
        {
          type: "p",
          text: "`makeCounter` has returned, and `count` lives on, because the inner function closed over it: a closure is a function plus the variables of its birthplace, kept alive as long as the function is. This is not an exotic feature; every event handler that mentions an outer variable is a closure doing its everyday job.",
        },
        {
          type: "ul",
          items: [
            "Lookup walks outward from where the function was written: lexical scope",
            "`let` and `const` are block-scoped; `var` is function-scoped and best left retired",
            "A closure keeps its captured variables alive after the outer function returns",
            "Two calls to the factory make two independent closures: `makeCounter()` twice, two counts",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Closures capture variables, not values: a handler reading `count` sees the current `count` at call time, not a snapshot from when the handler was created. That is usually what you want, and occasionally the source of a stale-looking bug; the in-depth course puts this under pressure with the classic loop question and its interview variants.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Closures are the language's privacy mechanism: nothing outside `makeCounter` can reach `count` except the returned function, which makes factories the lightweight module pattern. Before classes with private fields, this was how JavaScript hid state, and it remains the idiom hooks-based React leans on: a component's state setters are closures over React's internals.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-4-LESSON-004-CHECK",
      prompt:
        "`const a = makeCounter(); const b = makeCounter(); a(); a(); b();` What does `b()` return?",
      correctOptionId: "one",
      options: [
        {
          id: "one",
          text: "1: each factory call creates its own captured count",
          feedback:
            "Correct. Every call to `makeCounter` runs the outer function afresh, creating a new `count` for the returned function to close over. `a` advanced its own private count to 2; `b` starts at its own zero.",
        },
        {
          id: "three",
          text: "3: the counters share the module's count",
          feedback:
            "The `count` lives inside `makeCounter`, not in the module, so each call births a fresh one. Sharing would require declaring the variable outside the factory: birthplace decides visibility.",
        },
        {
          id: "zero",
          text: "0: b's count was never initialised by calling a",
          feedback:
            "`b` needs no help from `a`: its `count` was initialised to 0 when `makeCounter` ran for `b`, and the call advances it to 1. Two factories, two closures, two independent lives.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-005",
      title: "The everyday toolkit: destructure, spread, transform",
      objective: "Reshape data declaratively, and know which tools mutate.",
      minutes: 5,
      completion:
        "You can chain map, filter and reduce with intent, and update state without mutating it.",
      quick: [
        {
          type: "p",
          text: "Most UI code is data reshaping: pick fields, filter rows, derive totals. The toolkit is small. Destructuring names what you take, spread copies-and-extends, and the transform trio covers the loops you used to write:",
        },
        {
          type: "code",
          language: "js",
          code: "const { name, email } = user;\nconst [first, ...rest] = items;\n\nconst active = users.filter((u) => u.active);\nconst names = active.map((u) => u.name);\nconst total = cart.reduce((sum, item) => sum + item.price, 0);",
        },
        {
          type: "p",
          text: "`map` transforms one-for-one, `filter` keeps a subset, `reduce` folds to a single value, and none of the three mutates its source. The mutators are worth knowing by name, `push`, `pop`, `splice`, `sort`, `reverse`, because at a function boundary or inside state they are exactly the ones that bite; their polite modern twins `toSorted` and `toReversed` return copies.",
        },
        {
          type: "ul",
          items: [
            "`map` one-for-one, `filter` keep-some, `reduce` fold-to-one; all three return new arrays",
            "Update immutably: `[...items, added]` and `{ ...obj, field: next }`",
            "`sort` mutates and compares as strings without a comparator: `[10, 9, 1].sort()` is [1, 10, 9]",
            "`find` returns the first match or `undefined`; guard before using it",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "`reduce` is the trio's power tool and its readability tax: a reduce that builds an object of groups is idiomatic, and one that reimplements `map` is noise. The working rule: if the accumulator is a genuinely different shape from the elements, reduce earns its place; if it is an array the same length, `map` was the sentence you meant.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Chaining has a cost model: `users.filter(...).map(...)` walks the data twice and allocates an intermediate array, which is irrelevant at hundreds of rows and visible at hundreds of thousands. The fix at scale is a single pass, one loop or one reduce, and the discipline is to write the readable chain first and reach for the single pass when a profiler, not a feeling, says so.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-4-LESSON-005-CHECK",
      prompt: "`[25, 100, 9].sort()` returns what?",
      correctOptionId: "strings",
      options: [
        {
          id: "strings",
          text: "[100, 25, 9]: without a comparator, sort compares as strings",
          feedback:
            "Correct. Default `sort` stringifies, and '100' sorts before '25' the way 'apple' sorts before 'banana'. Numeric intent must be spelled out: `sort((a, b) => a - b)`. It also mutated the array in place while it was at it.",
        },
        {
          id: "numbers",
          text: "[9, 25, 100]: numbers sort numerically",
          feedback:
            "Only with a comparator: `sort((a, b) => a - b)`. Bare `sort` compares string forms, putting '100' first. The two facts to keep: default sort is lexicographic, and it mutates in place.",
        },
        {
          id: "error",
          text: "An error: sort needs a comparator for numbers",
          feedback:
            "It runs happily and returns the wrong order, which is worse than an error: [100, 25, 9] survives until real data makes it visible. The comparator `(a, b) => a - b` states the numeric intent.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-006",
      title: "The DOM: the tree you built, now scriptable",
      objective: "Select, listen and update against the tree from the foundations module.",
      minutes: 5,
      completion: "You can wire an interaction end to end: select, listen, read the event, update.",
      quick: [
        {
          type: "p",
          text: "The DOM is the element tree your HTML declared, and JavaScript holds a live handle to it. The everyday loop is three verbs: select a node, listen for an event, update the tree.",
        },
        {
          type: "code",
          language: "js",
          label: "the wiring pattern",
          code: "const button = document.querySelector('#add');\nconst list = document.querySelector('#items');\n\nbutton.addEventListener('click', (event) => {\n  const item = document.createElement('li');\n  item.textContent = 'New item';\n  list.append(item);\n});",
        },
        {
          type: "p",
          text: "The handler receives an `event` whose `target` is the element that was actually interacted with. Two update habits matter from day one: `textContent` for text, because `innerHTML` executes whatever markup a string smuggles in, and class toggles over inline styles, because the foundations module's cascade is still the styling authority.",
        },
        {
          type: "ul",
          items: [
            "`querySelector` takes any CSS selector; it returns the first match or `null`",
            "`addEventListener` attaches without overwriting other listeners",
            "`event.target` is what was interacted with; `preventDefault()` cancels the browser's default action",
            "`textContent` for text always; `innerHTML` only for markup you built, never for user input",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Selection returning `null` is the everyday crash: `querySelector('#adds')` on a typo, then `.addEventListener` throws on null. The habit is to treat selection as fallible, guard or assert immediately, and keep selectors in one place so a renamed id has one line to update, not twelve.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Every DOM write from the foundations module's pipeline: `append` and `textContent` invalidate layout, and reading `offsetHeight` right after a write forces the browser to run layout early. Interleaved reads and writes in a loop, layout thrashing, is the classic scripted-performance bug, and the fix is batching: read everything, then write everything. Frameworks exist substantially to do this batching for you.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-4-LESSON-006-CHECK",
      prompt:
        "A comment box renders user text with `element.innerHTML = comment`. What is the review call?",
      correctOptionId: "textcontent",
      options: [
        {
          id: "textcontent",
          text: "Use `textContent`: user input rendered as HTML can carry a script",
          feedback:
            "Correct. `innerHTML` parses and executes markup, so a comment containing a script tag or an onerror image runs in every reader's browser: cross-site scripting. `textContent` renders the same string as inert text.",
        },
        {
          id: "fine",
          text: "Approve: comments are just text anyway",
          feedback:
            "They are text until someone submits markup, and the attacker is the one user who will. The sink decides the risk: `innerHTML` executes, `textContent` displays. User input belongs in the second.",
        },
        {
          id: "escape",
          text: "Keep `innerHTML` but strip angle brackets from the comment first",
          feedback:
            "Hand-rolled sanitisers age badly: encodings, attributes and event handlers slip through filters that looked complete. The robust move costs one word: `textContent` treats the input as text, whole and always.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-4-LESSON-007",
      title: "Errors are directions, not verdicts",
      objective: "Read a stack trace top-down and throw errors worth catching.",
      minutes: 4,
      completion:
        "You can locate a bug from a trace and choose between catching and letting it travel.",
      quick: [
        {
          type: "p",
          text: "An error message has three useful parts: the type says what went wrong, the message says where the value went wrong, and the stack trace is a map, top frame first: the line that threw, then the line that called it, downward through your code. `TypeError: Cannot read properties of undefined (reading 'name')` almost always means the line above expected an object and got `undefined`, and the interesting question is who handed it over.",
        },
        {
          type: "code",
          language: "js",
          code: "function loadUser(id) {\n  if (!id) {\n    throw new Error(`loadUser needs an id, got ${id}`);\n  }\n  // ...\n}\n\ntry {\n  render(await loadUser(input));\n} catch (error) {\n  showRetry();\n  console.error(error); // keep the evidence\n}",
        },
        {
          type: "ul",
          items: [
            "Read traces top-down: the throw site first, callers beneath it",
            "Throw early with a message that names the expectation and the actual value",
            "Catch where you can respond: show a retry, substitute a fallback; otherwise let it travel",
            "An empty catch block is a bug you have chosen not to hear about",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The console is wider than `log`: `console.table` renders arrays of objects as a grid, `console.group` nests related output, and the debugger's breakpoints beat sprinkled logs the moment a bug spans more than one function: pause, inspect every variable in scope, step. The scope panel you inspect there is the closure model from earlier, drawn live.",
          },
        ],
      },
    },

    {
      type: "diagram",
      id: "UIE-4-LESSON-007-DIAGRAM",
      title: "What runs when",
      claim: "A script's life: run once top to bottom, then respond to events.",
      altText: "The lifecycle of a script from load to event responses",
      longText:
        "The lifecycle has five steps. The browser loads the script when it meets the tag. It parses the source into a runnable form, catching syntax errors before anything runs. It executes once, top to bottom: declarations happen, wiring code runs, functions are defined but wait. Listeners registered during that pass sit dormant. From then on, events drive everything: each click or keypress calls its handler, the handler finishes, and the page waits for the next event.",
      layers: [
        {
          id: "load",
          label: "Load",
          description:
            "The browser meets the script tag and fetches the source. Until it runs, the elements below the tag may not exist yet, which is why scripts load deferred or at the end of the body.",
        },
        {
          id: "parse",
          label: "Parse",
          description:
            "The source becomes a runnable form. Syntax errors surface here, before a single line executes.",
        },
        {
          id: "run",
          label: "Run top to bottom",
          description:
            "The one pass: constants initialise, functions are defined but do not run, and wiring code like addEventListener executes.",
        },
        {
          id: "register",
          label: "Listeners wait",
          description:
            "Handlers registered during the pass sit dormant, each a closure holding the scope it was born in.",
        },
        {
          id: "respond",
          label: "Respond to events",
          description:
            "Each event calls its handler and the page waits again. Almost everything a UI does after load starts here.",
        },
      ],
      predict: {
        prompt:
          "A script defines `handleClick` and registers it for a button. When does the code inside `handleClick` run?",
        options: [
          {
            text: "Each time the button is clicked, after the top-to-bottom pass finished",
            correct: true,
          },
          { text: "Once, during the top-to-bottom pass", correct: false },
          { text: "It runs when defined and again on each click", correct: false },
        ],
        revealLabel: "Walk the lifecycle and place the handler:",
      },
    },
    {
      type: "misconception",
      id: "UIE-4-LESSON-007-MISCONCEPTION",
      misconceptionId: "UIE-M-005",
      claim: "`const` makes a value constant, so const objects cannot change.",
      correction:
        "`const` freezes the binding: the name can never point at a different value. The value itself, if it is an object or array, remains as mutable as ever, through this name or any alias. Content immutability is a separate decision, made with `Object.freeze`, with copies, or with discipline.",
    },

    {
      type: "takeaway",
      id: "UIE-4-LESSON-008-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Six models: assignments copy primitives and alias objects, equality is strict and falsiness is a list of eight, functions carry their birthplace, the transform trio replaces most loops without mutating, the DOM is select-listen-update with textContent as the safe sink, and errors are maps with the throw site on top. The in-depth course now puts these models under interview pressure: closures in loops, this, the event loop, and the coercion trick zoo.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-4-LESSON-008-ACT",
      body: "Six review calls on everyday JavaScript: predict what the code does, spot the mutation crossing a boundary, and pick the fix that states its intent. The feedback walks the model that decides each one.",
    },
    {
      type: "check_cta",
      id: "UIE-4-LESSON-008-CHECK",
      body: "Four short problems, one per core model. Nothing is graded, and every answer traces the reasoning, not just the letter.",
    },
    {
      type: "next_step",
      id: "UIE-4-LESSON-008-NEXT",
      body: "JavaScript in Depth is next: closures under pressure, the four this bindings, the event loop's queues, promises, and the coercion trick zoo. Every one of its questions leans on a model from this course.",
    },
  ],
  glossary: [],
};
