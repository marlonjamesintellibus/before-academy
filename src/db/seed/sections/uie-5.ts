import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-5: JavaScript in Depth, second of the two JavaScript courses: the
 * tricky tier the readiness deck names outright ("Tricky JavaScript
 * questions: real-world scenarios that test depth" - the deck's word, not
 * learner copy). Every question here leans on a fundamentals model and
 * pushes it where interviews push: closures in loops, the four this
 * bindings, the event loop's two queues, promise semantics, the coercion
 * zoo, and the prototype chain.
 *
 * Depth bar per UIE-3's second edition: every concept carries Explore
 * further, Go deeper where the craft lives, and the event-loop diagram
 * sits behind a predict gate built on the classic ordering question.
 */
export const uie5Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "javascript-in-depth",
    title: "JavaScript in Depth",
    description:
      "The tricky tier: closures under pressure, the four this bindings, the event loop's queues, promise semantics, the coercion zoo, and the prototype chain behind class.",
    position: 5,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-5-LESSON-001-HOOK",
      prompt:
        "In what order do these log? `setTimeout(() => log('A'), 0); Promise.resolve().then(() => log('B')); log('C');`",
      choices: ["C, B, A", "A, B, C", "C, A, B"],
      reveal:
        "C, B, A. The synchronous line runs first, always. Then the microtask queue, where promise callbacks wait, empties completely before the task queue, where timers wait, gets a turn, so B beats A even at zero milliseconds. One picture, the event loop, decides every question of this shape, and this course draws it.",
    },
    {
      type: "why_it_matters",
      id: "UIE-5-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "The tricky tier is where evaluations separate candidates who use JavaScript from candidates who can say what it will do. None of it is trivia: the loop question is a real bug class, this-binding decides whether an extracted method works, queue ordering explains why a UI updates late, and coercion rules are why a form comparison went wrong in production. Each model here is small; the questions only look mysterious until the model is drawn.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-5-LESSON-001-OBJ",
      items: [
        "Predict what a closure captures inside loops and callbacks, including the classic var trap",
        "Resolve this from the call site with the four-binding decision list",
        "Order any mix of synchronous code, promises and timers with the event loop",
        "Chain, await and recover: promise semantics including the errors",
        "Read coercion and prototype questions from the rules, not the vibes",
      ],
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-002",
      title: "Closures under pressure",
      objective: "Solve the loop question and its relatives from the capture model.",
      minutes: 5,
      completion:
        "You can say what any callback captures, and fix the var loop three different ways.",
      quick: [
        {
          type: "p",
          text: "The fundamentals course established that closures capture variables, not values. The tricky tier's favourite question weaponises it:",
        },
        {
          type: "code",
          language: "js",
          label: "the classic",
          code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i));\n}\n// logs 3, 3, 3",
        },
        {
          type: "p",
          text: "All three callbacks close over the same `i`, because `var` is function-scoped: one variable, three readers, and by the time the timers run the loop finished at 3. Change `var` to `let` and each iteration gets a fresh block-scoped `i`: the callbacks capture three different variables and log 0, 1, 2. The question is a probe for exactly this: do you know closures capture variables, and do you know how many variables there are?",
        },
        {
          type: "ul",
          items: [
            "`var` in a loop: one shared variable, every callback sees its final value",
            "`let` in a loop: one variable per iteration, each callback owns its moment",
            "Third fix, no let: pass the value in as a parameter, since parameters copy primitives",
            "The same trap wears other costumes: listeners in loops, requests in loops, `i` in a cleanup",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The stale-capture family is the same model in async clothing: a callback built before a variable's final update reads the update anyway (variables, not snapshots), while a callback that captured a PARAMETER holds a copy from call time. Asking 'which variable, born when?' answers every variant the interviewer can dress up.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Closures also carry memory: a long-lived handler keeps its whole birthplace alive, including large objects it never reads, because the scope survives as a unit. The leak signature is a detached component whose data will not free; the fix is narrowing what the closure needs, capturing the field rather than the record, or nulling references on teardown. Interviewers at senior tiers ask this as 'how can a closure leak?'",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-5-LESSON-002-CHECK",
      prompt: "In the classic loop, `var` is replaced with `let`. What logs now, and why?",
      correctOptionId: "fresh",
      options: [
        {
          id: "fresh",
          text: "0, 1, 2: each iteration declares a fresh i, and each callback captured its own",
          feedback:
            "Correct. `let` gives every iteration its own block-scoped variable, so three callbacks close over three different variables holding 0, 1 and 2. The count of variables, not the timing, is what changed.",
        },
        {
          id: "same",
          text: "3, 3, 3: the timers still run after the loop",
          feedback:
            "The timers do run after the loop, and it no longer matters: with `let` there are three variables, one per iteration, each frozen at the value its iteration held. The var version had one variable; that was the whole bug.",
        },
        {
          id: "error",
          text: "A ReferenceError: let cannot be redeclared in a loop",
          feedback:
            "Loop heads are the one place `let` re-declares by design: a fresh binding per iteration is the feature. That freshness is exactly what makes the callbacks log 0, 1, 2.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-003",
      title: "this: decided at the call, not the definition",
      objective: "Resolve this with the four-binding list, in order.",
      minutes: 5,
      completion:
        "You can read any call site and name which binding applies, including the extracted-method trap.",
      quick: [
        {
          type: "p",
          text: "Variable lookup is lexical; `this` is the exception: it is decided by how the function is CALLED. Four bindings, checked in order, cover every case:",
        },
        {
          type: "code",
          language: "js",
          label: "the extracted-method trap",
          code: "const user = {\n  name: 'Ada',\n  greet() {\n    return `Hi, ${this.name}`;\n  },\n};\nuser.greet(); // 'Hi, Ada' - implicit: called through user\nconst f = user.greet;\nf(); // 'Hi, undefined' - default: called bare",
        },
        {
          type: "p",
          text: "`new` binds this to the fresh object. Explicit `call`, `apply` and `bind` set it by hand. Implicit binding reads the object left of the dot at the call. And a bare call gets the default: undefined in modules and strict code. Arrow functions opt out entirely: they have no this of their own and read the enclosing scope's, lexically, which is why they make good callbacks and wrong methods.",
        },
        {
          type: "ul",
          items: [
            "Order: `new`, then explicit (`call`/`apply`/`bind`), then implicit (left of the dot), then default",
            "Extracting a method severs the dot: the binding is decided at each call, not carried by the function",
            "Arrows inherit this lexically: ideal inside methods, wrong as methods",
            "`bind` returns a permanently bound copy: the fix for handlers that lose their object",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The framework-era version of the trap: passing `obj.method` as an event handler or prop calls it bare later, so this is gone. The three fixes map to the bindings: `obj.method.bind(obj)`, an arrow wrapper `() => obj.method()`, or class fields written as arrows, which bind lexically at construction. Recognising these as one trap with three costumes is the depth interviews look for.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "The bindings compose with an order of victory: `new` beats `bind`, and `bind` beats implicit. `const bound = f.bind(a); bound.call(b)` still sees `a`, because bind is permanent against later explicit attempts, yet `new bound()` constructs a fresh object anyway. Few interviewers go here; the ones who do are checking whether the list is a model or a mnemonic.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-5-LESSON-003-CHECK",
      prompt:
        "`button.addEventListener('click', account.deposit)` breaks with `this` undefined inside `deposit`. Why?",
      correctOptionId: "severed",
      options: [
        {
          id: "severed",
          text: "The listener calls the function bare later: the account-dot-deposit binding lived at the call site, and this call site has no dot",
          feedback:
            "Correct. Passing `account.deposit` passes the bare function; when the click calls it, no object sits left of a dot, so the default binding applies. `account.deposit.bind(account)` or an arrow wrapper restores it.",
        },
        {
          id: "async",
          text: "Event handlers run asynchronously, and this cannot survive the delay",
          feedback:
            "Timing is innocent: a bound function keeps its this across any delay. What was lost is the call shape, the object left of the dot, and `bind` or an arrow wrapper carries it into the handler.",
        },
        {
          id: "strict",
          text: "Strict mode forbids methods as event handlers",
          feedback:
            "Nothing forbids it; strict code only changes what a bare call receives (undefined instead of the global object), which is why the break is loud instead of silent. The severed dot is the mechanism either way.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-004",
      title: "The event loop: one thread, two queues",
      objective: "Order any mix of sync code, promises and timers from the model.",
      minutes: 5,
      completion:
        "You can trace stack, microtasks and tasks through any ordering question without guessing.",
      quick: [
        {
          type: "p",
          text: "JavaScript runs one thing at a time on one call stack. Waiting happens elsewhere: timers, network and the DOM hand work to the platform and enqueue callbacks when done. Two queues hold those callbacks, and their priority is the entire tricky tier:",
        },
        {
          type: "code",
          language: "js",
          code: "console.log('sync 1');\nsetTimeout(() => console.log('task'), 0);\nPromise.resolve().then(() => console.log('micro 1'));\nPromise.resolve().then(() => console.log('micro 2'));\nconsole.log('sync 2');\n// sync 1, sync 2, micro 1, micro 2, task",
        },
        {
          type: "p",
          text: "The rule: run the stack to empty, then drain the ENTIRE microtask queue (promise callbacks, queueMicrotask), then take ONE task (timers, events), then drain microtasks again, repeat. Zero milliseconds never means now: it means 'a task, as soon as the loop gets there'. And rendering waits for the stack too, which is why a long synchronous loop freezes the page.",
        },
        {
          type: "ul",
          items: [
            "Stack first, always: synchronous code cannot be interrupted",
            "Microtasks drain completely before any task runs, even a 0ms timer",
            "One task per turn, then microtasks again: a microtask that queues microtasks can starve tasks",
            "The page renders between turns, never mid-stack: long sync work is a frozen UI",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "`await` is this model wearing syntax: everything after the await is a microtask scheduled when the promise settles. Two awaited fetches in sequence therefore cost two round trips, while `Promise.all` starts both before waiting, one round trip. Reading await as 'suspend and re-enter via the microtask queue' makes async ordering questions the same question as the hook.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "The starvation case is a real outage pattern: a microtask that re-queues itself drains forever, and no task, no timer, no render ever runs again, one thread, wholly owned. Its polite cousin is chunking: long work split across setTimeout or requestIdleCallback turns a frozen page into a responsive one, because tasks yield to rendering where sync loops cannot. requestAnimationFrame sits in its own slot, right before paint, which is why animation code belongs there and data code does not.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-5-LESSON-004-CHECK",
      prompt:
        "`setTimeout(f, 0)` and `Promise.resolve().then(g)` are queued in that order. Which runs first, and why?",
      correctOptionId: "micro",
      options: [
        {
          id: "micro",
          text: "g: the microtask queue drains completely before the task queue gets a turn",
          feedback:
            "Correct. Queue membership beats queue order: promise callbacks are microtasks, timers are tasks, and the loop drains all microtasks before taking one task. The 0ms is a request to join the task queue, nothing sooner.",
        },
        {
          id: "timer",
          text: "f: it was queued first and has a 0ms delay",
          feedback:
            "First-queued decides within a queue, not across queues. The timer waits in the task queue while microtasks drain, so g runs first however the queuing interleaved.",
        },
        {
          id: "race",
          text: "Unpredictable: two queues race on separate threads",
          feedback:
            "There is one thread and a fixed schedule: stack, all microtasks, one task, repeat. The determinism is the point: every ordering question of this shape has exactly one answer, which is why evaluations love them.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-005",
      title: "Promises: states, chains, and where errors go",
      objective: "Follow values and rejections through chains and async/await.",
      minutes: 5,
      completion: "You can predict what a chain resolves to, and where a rejection surfaces.",
      quick: [
        {
          type: "p",
          text: "A promise is a one-shot state machine: pending, then settled as fulfilled or rejected, permanently. `then` returns a NEW promise settled by its callback's return, which is what makes chains flat, and rejections skip forward to the next catch:",
        },
        {
          type: "code",
          language: "js",
          code: "fetchUser()\n  .then((user) => fetchOrders(user.id)) // return a promise: chain waits\n  .then((orders) => orders.length)\n  .catch((error) => {\n    showRetry(error); // any rejection above lands here\n    return 0; // and the chain recovers to fulfilled\n  });",
        },
        {
          type: "p",
          text: "`async/await` is the same machine in sequential clothing: `await` unwraps a fulfillment or THROWS the rejection, so try/catch replaces `.catch`. The classic slips are forgetting to return the inner promise (the chain stops waiting), awaiting in sequence what could run in parallel, and the floating promise, a call nobody awaits or catches, whose rejection becomes a global unhandled error.",
        },
        {
          type: "ul",
          items: [
            "`then` returns a new promise: return values pass along, returned promises are awaited",
            "A rejection skips forward to the nearest catch, and a catch that returns recovers the chain",
            "`Promise.all` rejects on the first rejection; `allSettled` reports every outcome",
            "Every promise needs an owner: awaited, returned, or caught, never floating",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The parallel idiom is worth owning as a pattern: start first, await after. `const a = fetchA(); const b = fetchB(); const [x, y] = await Promise.all([a, b]);` both requests fly before either await. The sequential version, await on each line, reads identically and costs the sum of the latencies, which is the difference an interviewer is fishing for with 'how would you speed this up?'",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Interviews at depth probe the machinery: implement a timeout with `Promise.race` between the work and a delayed rejection; explain why `await` in a `forEach` callback awaits nothing (forEach ignores returned promises, so the loop finishes first: use `for...of`); and note that `then(f, g)` and `then(f).catch(g)` differ, because only the second catches a rejection thrown inside `f` itself.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-5-LESSON-005-CHECK",
      prompt:
        "`items.forEach(async (item) => { await save(item); }); console.log('done');` What is wrong?",
      correctOptionId: "ignored",
      options: [
        {
          id: "ignored",
          text: "'done' logs before any save finishes: forEach ignores the returned promises",
          feedback:
            "Correct. Each async callback returns a promise and forEach discards it, so nothing waits for anything. Sequential saving is `for...of` with await; parallel is `Promise.all(items.map(...))`. Both give the promises an owner.",
        },
        {
          id: "syntax",
          text: "async is not allowed inside forEach callbacks",
          feedback:
            "It is allowed, which is the trap: the code runs, returns promises into the void, and the awaits only order work inside each callback. The loop and the log never wait, so the bug is silence, not syntax.",
        },
        {
          id: "sequential",
          text: "The saves run one at a time and are just slow",
          feedback:
            "They actually all start at once, unawaited by anyone, and 'done' logs while they fly. If sequence was the intent, `for...of` with await delivers it; if parallel, `Promise.all` at least waits for the fleet.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-006",
      title: "The coercion zoo, visited deliberately",
      objective: "Answer trick questions from the conversion rules, then avoid them in real code.",
      minutes: 4,
      completion:
        "You can walk any == or + question through the rules, and say why real code uses ===.",
      quick: [
        {
          type: "p",
          text: "The zoo exists because two operators convert enthusiastically. `+` concatenates the moment either side is a string, otherwise it adds numbers. `==` converts across types by rules that are learnable, if rarely worth deploying:",
        },
        {
          type: "code",
          language: "js",
          label: "exhibits",
          code: "1 + '2'; // '12' - string wins the +\n'5' - 1; // 4 - minus only knows numbers\n[] + []; // '' - arrays become strings first\n0 == ''; // true - both reach 0\nnull == undefined; // true - by special rule\nnull == 0; // false - null equals only undefined",
        },
        {
          type: "p",
          text: "Three rules decide almost every exhibit: objects (arrays included) become primitives before comparing, usually via their string form; `==` between different primitive types converges on numbers; and `null` and `undefined` equal each other and nothing else, by decree. The professional summary: know the rules well enough to read the trick, write `===` so you never depend on them.",
        },
        {
          type: "ul",
          items: [
            "`+` with any string concatenates; every other arithmetic operator converts to numbers",
            "Objects to primitives first: `[] + []` is '' because each array stringifies empty",
            "`null == undefined` is true and `null == 0` is false: the special rule beats the number rule",
            "The habits that retire the zoo: `===`, `Number.isNaN`, explicit `Number()` and `String()`",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The one zoo resident that bites real code is NaN: it spreads through arithmetic, refuses to equal itself, and `Number('')` is 0 while `Number('  ')` is also 0, which is how a blank form field becomes a zero price. Parsing user input deliberately, `Number.parseFloat` plus a `Number.isNaN` guard, is the working defence.",
          },
        ],
      },
    },
    {
      type: "misconception",
      id: "UIE-5-LESSON-006-MISCONCEPTION",
      misconceptionId: "UIE-M-006",
      claim: "async and promises make JavaScript multi-threaded.",
      correction:
        "One thread runs it all. Promises and async/await reorganise WHEN callbacks run on that single thread, via the microtask queue; the actual waiting (network, timers) happens in the platform, outside JavaScript. Real parallel JavaScript exists only in workers, which run separate threads with message passing and no shared DOM.",
    },

    {
      type: "concept",
      id: "UIE-5-LESSON-007",
      title: "Prototypes: the chain behind class",
      objective: "Trace property lookup up the chain, and read class as its syntax.",
      minutes: 4,
      completion: "You can say where a property was found, and what class desugars to.",
      quick: [
        {
          type: "p",
          text: "Objects inherit by delegation: a property lookup that finds nothing on the object itself walks up the prototype chain until it finds the name or runs out of links. Methods live once on a shared prototype, not copied onto every instance, and `class` is syntax over exactly this machinery:",
        },
        {
          type: "code",
          language: "js",
          code: "class Button {\n  constructor(label) {\n    this.label = label; // own property, per instance\n  }\n  click() {\n    return `${this.label} clicked`; // lives once, on Button.prototype\n  }\n}\nconst b = new Button('Save');\nObject.hasOwn(b, 'label'); // true\nObject.hasOwn(b, 'click'); // false - found up the chain",
        },
        {
          type: "ul",
          items: [
            "Lookup: own properties first, then up the chain link by link",
            "Methods live on the prototype, shared; instance data lives on instances",
            "`new` wires the instance's chain to the constructor's prototype",
            "Writing never walks the chain: assignment creates an own property that shadows",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The chain explains the classic gotcha pair: `hasOwn` says what an object truly carries versus what it borrows, and shadowing means an assignment can hide a prototype method for one instance while every other instance still sees the original. Debugging 'this object behaves differently' often ends at an accidental shadow.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "`extends` chains prototypes: instance to subclass prototype to superclass prototype, one lookup path. `super.method()` starts the search one link higher than the current class, which is how an override can wrap rather than replace. And because methods resolve through the chain at call time, monkey-patching a prototype changes behaviour for every live instance, a power the platform itself uses and applications mostly should not.",
          },
        ],
      },
    },

    {
      type: "diagram",
      id: "UIE-5-LESSON-007-DIAGRAM",
      title: "One turn of the event loop",
      claim: "The schedule that decides every ordering question.",
      altText: "The event loop's repeating schedule as five steps",
      longText:
        "The loop repeats five steps. Run the call stack to empty: synchronous code, uninterruptible. Drain the microtask queue completely: promise callbacks and queueMicrotask, including any microtasks they queue. Take exactly one task from the task queue: a timer callback, an event handler. Drain microtasks again, because the task may have queued some. Render if the browser is due a frame, then take the next task. Zero-millisecond timers wait their turn in the task queue; microtasks always cut ahead.",
      layers: [
        {
          id: "stack",
          label: "Run the stack",
          description:
            "Synchronous code runs to completion, uninterruptible. Nothing else, rendering included, happens while the stack is busy.",
        },
        {
          id: "micro",
          label: "Drain microtasks",
          description:
            "Promise callbacks and queueMicrotask run until the queue is empty, including microtasks queued along the way.",
        },
        {
          id: "task",
          label: "One task",
          description:
            "Exactly one task runs: a timer's callback, an event's handler. The rest of the task queue waits for later turns.",
        },
        {
          id: "micro-again",
          label: "Microtasks again",
          description:
            "The task may have queued promise callbacks; they drain before anything else proceeds.",
        },
        {
          id: "render",
          label: "Render, then repeat",
          description:
            "If a frame is due, the page paints, requestAnimationFrame callbacks run just before it. Then the loop takes the next task.",
        },
      ],
      predict: {
        prompt:
          "A click handler updates state, then runs a heavy synchronous loop for two seconds. When does the user see the update?",
        options: [
          { text: "After the loop ends: rendering waits for the stack", correct: true },
          { text: "Immediately: DOM updates paint as they happen", correct: false },
          { text: "Halfway through, when the browser steals a frame", correct: false },
        ],
        revealLabel: "Walk one turn of the loop and place the paint:",
      },
    },

    {
      type: "takeaway",
      id: "UIE-5-LESSON-008-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Five models retire the tricky tier: closures capture variables and the question is how many, this is decided at the call by a four-item list, one thread runs a stack and two queues with microtasks always ahead, promises are one-shot machines whose chains pass values and skip rejections to the next catch, and property lookup walks a chain that class merely dresses. Read the trick through the model, answer, and then write the code that never needed the trick.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-5-LESSON-008-ACT",
      body: "Six predict-the-output drills from the tricky tier: loops, bindings, queues, chains and the zoo. Commit to an answer, then compare your trace with the model's.",
    },
    {
      type: "check_cta",
      id: "UIE-5-LESSON-008-CHECK",
      body: "Four short problems across the five models. Nothing is graded, and every answer shows the trace.",
    },
    {
      type: "next_step",
      id: "UIE-5-LESSON-008-NEXT",
      body: "React hooks practice is the final module of the pathway, and it stands on everything here: components close over their renders, effects are scheduled callbacks, and state updates ride the very queues this course drew.",
    },
  ],
  glossary: [],
};
