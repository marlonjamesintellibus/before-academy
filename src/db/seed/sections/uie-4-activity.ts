import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-4 designed interaction and retrieval step. Review-queue dialect like
 * UIE-3: everyday JavaScript calls judged the way a reviewer judges them,
 * with the deciding model named in every feedback line. Snippets ride in
 * inline code; nothing needs a block example to be judgeable.
 */
export const uie4ActivitySeed: ActivitySeed = {
  id: "UIE-4-ACT-001",
  title: "The code review",
  intro:
    "Six review calls on everyday JavaScript. Predict what the code does, name the model that decides it, and check your route against the feedback.",
  instructions:
    "Read the snippet, make the call, and check. The feedback walks the model: references, truthiness, closures, the toolkit, the DOM, or the trace.",
  scenarios: [
    {
      id: "UIE-4-ACT-001-S01",
      position: 1,
      title: "The shared draft",
      body: "A form keeps `const draft = saved;` so users can edit without losing the original. Edits to `draft.title` turn out to change `saved.title` too.",
      difficulty: "foundational",
      clue: "did the assignment copy anything?",
      prompt: "What explains it?",
      options: [
        {
          id: "alias",
          label: "`draft` aliases `saved`: assignment copied the reference, not the object",
          correct: true,
          feedback:
            "Correct. One object, two names: edits through either are edits to both. An independent draft needs a copy, `{ ...saved }` for one level, deeper spreads if nested fields are edited.",
        },
        {
          id: "const-bug",
          label: "`const` should have prevented the change: this is an environment bug",
          correct: false,
          feedback:
            "`const` locks the binding, so `draft = other` would throw; mutating the object it points at is fully legal. The sharing came from assignment semantics: objects alias, and copies are explicit.",
        },
        {
          id: "timing",
          label: "The save ran before the edit finished",
          correct: false,
          feedback:
            "No timing is involved: both names pointed at one object from the moment of assignment. The signature of aliasing is exactly this, changes appearing 'somewhere else', and the fix is a real copy.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-002",
    },
    {
      id: "UIE-4-ACT-001-S02",
      position: 2,
      title: "The vanished zero",
      body: "A dashboard shows `count || 'None yet'` and displays 'None yet' for teams whose count is genuinely 0.",
      difficulty: "foundational",
      clue: "which values does || treat as absent?",
      prompt: "What is the right call?",
      options: [
        {
          id: "nullish",
          label: "Use `count ?? 'None yet'`: only null and undefined mean absent",
          correct: true,
          feedback:
            "Correct. `0` is falsy, so `||` swallows a real answer. `??` substitutes only for null and undefined, letting the legitimate zero render. The falsy list is the model: eight values, and 0 is one of them.",
        },
        {
          id: "fine",
          label: "Approve: zero items and no data are the same to a user",
          correct: false,
          feedback:
            "They are opposite facts: 0 says 'we measured, nothing there', absence says 'we do not know'. A dashboard that blurs them misreports. `??` keeps the distinction at zero cost.",
        },
        {
          id: "stringify",
          label: "Render `String(count) || 'None yet'` since '0' is truthy",
          correct: false,
          feedback:
            "It renders the right pixels by accident and encodes the rule as a riddle: absence is now expressed through string truthiness. `??` says the actual intent, substitute only when the value is missing, in one operator.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-003",
    },
    {
      id: "UIE-4-ACT-001-S03",
      position: 3,
      title: "The two counters",
      body: "Code calls `const inc = makeCounter();` in two different modules expecting a shared count, and each module counts separately.",
      difficulty: "applied",
      clue: "how many times did the factory run?",
      prompt: "What explains it?",
      options: [
        {
          id: "two-closures",
          label: "Each factory call created its own captured count: two closures, two counts",
          correct: true,
          feedback:
            "Correct. Every `makeCounter()` call runs the outer function afresh, so each returned function closes over its own `count`. A shared count must live in one closure both modules import, or in a module-level variable.",
        },
        {
          id: "async",
          label: "The modules loaded at different times, splitting the count",
          correct: false,
          feedback:
            "Load order changes nothing here: the split happened because the factory ran twice, and each run birthed a fresh `count`. Closures are per-call, which is their power and, here, the surprise.",
        },
        {
          id: "gc",
          label: "The first count was garbage collected between calls",
          correct: false,
          feedback:
            "A closure keeps its captured variables alive for as long as the function lives, so nothing was collected. The counts diverged at creation: two factory calls, two independent birthplaces.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-004",
    },
    {
      id: "UIE-4-ACT-001-S04",
      position: 4,
      title: "The leaderboard flip",
      body: "A leaderboard in ascending mode sorts with `scores.sort()` and renders 100 before 25 before 9. Meanwhile, other parts of the app report that the source array now arrives already reordered.",
      difficulty: "applied",
      clue: "two separate bugs, one method",
      prompt: "What does the review say?",
      options: [
        {
          id: "both",
          label: "`sort` compared as strings AND mutated the shared array: comparator plus copy",
          correct: true,
          feedback:
            "Correct. Bare `sort` is lexicographic, so 100 precedes 25, and it reorders in place, which is why the source array changed across the app. `[...scores].sort((a, b) => a - b)` fixes both in one line.",
        },
        {
          id: "comparator-only",
          label: "Just add `(a, b) => a - b`: the mutation is harmless",
          correct: false,
          feedback:
            "The comparator fixes the order and leaves the in-place mutation reaching every alias of that array. The 'elsewhere in the app' symptom is the mutation talking. Copy first, then sort.",
        },
        {
          id: "reverse",
          label: "Call `.reverse()` after sorting to correct the order",
          correct: false,
          feedback:
            "Reversing a lexicographic order produces a different wrong order, and `reverse` mutates in place too, doubling the aliasing damage. State the numeric intent with a comparator, on a copy.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-005",
    },
    {
      id: "UIE-4-ACT-001-S05",
      position: 5,
      title: "The comment renderer",
      body: "A PR renders user comments with `item.innerHTML = comment.text` because some users paste links and the team wants them clickable.",
      difficulty: "applied",
      clue: "what else can a comment carry besides links?",
      prompt: "What does the review say?",
      options: [
        {
          id: "reject",
          label:
            "Block it: user input through `innerHTML` is script execution; render text, linkify deliberately",
          correct: true,
          feedback:
            "Correct. A comment can carry a script tag or an image with an error handler, and `innerHTML` runs it in every reader's browser. Render with `textContent`, then linkify by building anchor elements from matched URLs, so only the markup you constructed exists.",
        },
        {
          id: "approve",
          label: "Approve: the convenience outweighs the edge case",
          correct: false,
          feedback:
            "Cross-site scripting is not an edge case, it is the attack every input eventually meets. The sink decides: `innerHTML` executes whatever arrives. Convenience survives the safe route: build the links yourself.",
        },
        {
          id: "filter",
          label: "Approve with a regex that strips script tags first",
          correct: false,
          feedback:
            "Script tags are one of many executable forms: attributes, encodings and event handlers slip past tag filters. Allow-listing what you construct beats deny-listing what you fear: text via `textContent`, links via created elements.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-006",
    },
    {
      id: "UIE-4-ACT-001-S06",
      position: 6,
      title: "The silent catch",
      body: "A data loader wraps its fetch in try/catch with an empty catch block, because 'the UI should never crash'.",
      difficulty: "challenging",
      clue: "what does the user see when the load breaks?",
      prompt: "What does the review say?",
      options: [
        {
          id: "respond",
          label: "Catch must respond: show the retry state and keep the error evidence",
          correct: true,
          feedback:
            "Correct. Swallowing the error trades a visible crash for an invisible one: the user sees a forever-spinner and the team sees nothing at all. Catching earns its block by responding, a retry state for the user, `console.error` or a report for the team.",
        },
        {
          id: "approve",
          label: "Approve: no crash is the goal",
          correct: false,
          feedback:
            "The crash was the symptom; the goal is a UI that tells the truth. An empty catch hides the break from both the user, who waits forever, and the team, who cannot fix what never surfaces.",
        },
        {
          id: "rethrow",
          label: "Remove the try/catch entirely so errors stay visible",
          correct: false,
          feedback:
            "Bare propagation crashes the flow the loader serves, which is the problem the author feared. The middle path is the right one: catch where a response exists, respond visibly, preserve the evidence.",
        },
      ],
      remediationAnchor: "UIE-4-LESSON-007",
    },
  ],
};

/** UIE-4 retrieval step: one item per core model. */
export const uie4CheckSeed: CheckSeed = {
  id: "UIE-4-CHK-001",
  label: "Practice check",
  intro: "Four short problems. Nothing here is graded, and every answer traces the reasoning.",
  questions: [
    {
      id: "UIE-4-CHK-001-Q1",
      category: "js_values_types",
      difficulty: "foundational",
      learningOutcomes: ["UIE-4-LO1"],
      misconceptionTags: ["UIE-M-005"],
      stem: "`const user = { name: 'Ada' };` Which line throws?",
      options: [
        { text: "`user = { name: 'Grace' }`", correct: true },
        { text: "`user.name = 'Grace'`", correct: false },
        { text: "`delete user.name`", correct: false },
        { text: "None of them: const objects are fully frozen", correct: false },
      ],
      correctFeedback:
        "`const` guards the binding, so reassigning the name throws. Mutating fields and deleting them remain legal: the object never froze.",
      incorrectFeedback:
        "The rule: `const` forbids reassignment of the name and says nothing about the value's contents. Only `user = ...` re-points the name, so only it throws; the mutations sail through.",
      chip: { label: "Values and references", anchor: "UIE-4-LESSON-002" },
    },
    {
      id: "UIE-4-CHK-001-Q2",
      category: "js_scope_closures",
      difficulty: "applied",
      learningOutcomes: ["UIE-4-LO3"],
      misconceptionTags: [],
      stem: "A click handler references an outer variable `total` that the surrounding function updated after registering the handler. When clicked, what does the handler read?",
      options: [
        { text: "The current value of `total` at click time", correct: true },
        { text: "The value `total` had when the handler was registered", correct: false },
        { text: "`undefined`: the outer function has returned by then", correct: false },
        { text: "A copy frozen by the event system", correct: false },
      ],
      correctFeedback:
        "Closures capture variables, not snapshots: the handler reads whatever `total` holds when the click arrives, and the variable stays alive because the closure holds it.",
      incorrectFeedback:
        "A closure keeps the variable itself, live and current, for as long as the function exists: no snapshot, no undefined, no freezing. At click time the handler reads today's `total`.",
      chip: { label: "Scope and closures", anchor: "UIE-4-LESSON-004" },
    },
    {
      id: "UIE-4-CHK-001-Q3",
      category: "js_collections",
      difficulty: "applied",
      learningOutcomes: ["UIE-4-LO4"],
      misconceptionTags: [],
      stem: "Which expression adds an item to state without mutating the existing array?",
      options: [
        { text: "`const next = [...items, added]`", correct: true },
        { text: "`items.push(added)`", correct: false },
        { text: "`items[items.length] = added`", correct: false },
        { text: "`const next = items; next.push(added)`", correct: false },
      ],
      correctFeedback:
        "Spread builds a new array around the old elements plus the addition, leaving `items` untouched for anyone else holding it.",
      incorrectFeedback:
        "`push` and index assignment write into the existing array, and assigning to a new name first changes nothing: the name aliases the same array. The non-mutating form builds anew: `[...items, added]`.",
      chip: { label: "The everyday toolkit", anchor: "UIE-4-LESSON-005" },
    },
    {
      id: "UIE-4-CHK-001-Q4",
      category: "js_dom_events",
      difficulty: "foundational",
      learningOutcomes: ["UIE-4-LO5"],
      misconceptionTags: [],
      stem: "Which property renders a user-supplied string safely into an element?",
      options: [
        { text: "`textContent`", correct: true },
        { text: "`innerHTML`", correct: false },
        { text: "`outerHTML`", correct: false },
        { text: "`document.write`", correct: false },
      ],
      correctFeedback:
        "`textContent` treats the string as inert text, whatever it contains. The HTML sinks parse and execute markup, which hands user input a voice it should never have.",
      incorrectFeedback:
        "The rule follows the sink: `innerHTML`, `outerHTML` and `document.write` parse markup and will execute what a hostile string smuggles in. `textContent` displays the same characters as plain text.",
      chip: { label: "The DOM", anchor: "UIE-4-LESSON-006" },
    },
  ],
  completion: {
    body: "Four models, four calls. When aliasing, truthiness, closures and the safe sink answer before the options tempt you, the fundamentals are set, and the in-depth course is ready to put them under pressure.",
  },
};
