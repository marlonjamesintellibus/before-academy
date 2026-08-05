import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-7 designed interaction and retrieval step. Review-queue dialect on
 * hooks code in the wild: each scenario is a mechanism call, frozen timers,
 * orphaned listeners, defeated memo, lying deps, and the feedback names the
 * mechanism and the honest fix.
 */
export const uie7ActivitySeed: ActivitySeed = {
  id: "UIE-7-ACT-001",
  title: "Hooks in review",
  intro:
    "Six review calls from hooks code in the wild. Name the mechanism, pick the honest fix, and check your trace against the feedback.",
  instructions:
    "Trace before you answer: which closure, which deps, which lifecycle step. The feedback walks the mechanism that decides it.",
  scenarios: [
    {
      id: "UIE-7-ACT-001-S01",
      position: 1,
      title: "The frozen timer",
      body: "An effect with deps [] runs `setInterval(() => setSeconds(seconds + 1), 1000)`. The display shows 1 forever.",
      difficulty: "foundational",
      clue: "which render's seconds did the callback photograph?",
      prompt: "What is the honest fix?",
      options: [
        {
          id: "updater",
          label: "`setSeconds(s => s + 1)`: ask the queue instead of the frozen snapshot",
          correct: true,
          feedback:
            "Correct. The callback closed over mount's seconds, 0, and re-computes 0 + 1 every tick. The updater form reads the queue's latest, needing no snapshot at all, which is why it is the fix that keeps deps [] honest.",
        },
        {
          id: "no-deps",
          label: "Delete the deps array so the effect always re-runs",
          correct: false,
          feedback:
            "That re-creates the interval every render: a new timer per keystroke elsewhere in the component, stacking until cleanup debt becomes visible lag. The updater fixes the capture without churning the subscription.",
        },
        {
          id: "state-read",
          label: "Read seconds from a global variable instead of state",
          correct: false,
          feedback:
            "Moving state out of React trades a frozen display for one that never renders: globals schedule nothing. The mechanism is the closure, and the updater form routes around it inside the model.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-004",
    },
    {
      id: "UIE-7-ACT-001-S02",
      position: 2,
      title: "The chatty chat",
      body: "A chat component's effect connects to `roomId` with correct deps, and returns nothing. Users report ghost messages from rooms they left.",
      difficulty: "foundational",
      clue: "what runs when roomId changes from A to B?",
      prompt: "What explains it?",
      options: [
        {
          id: "no-cleanup",
          label: "No cleanup: each room change adds a connection and the old ones keep listening",
          correct: true,
          feedback:
            "Correct. Deps re-ran the effect, and nothing disconnected room A first: the connections accumulate, each closure delivering into the component. `return () => socket.disconnect()` makes room changes a swap instead of a pile.",
        },
        {
          id: "deps-wrong",
          label: "The deps array should be empty so only one connection exists",
          correct: false,
          feedback:
            "Empty deps would freeze the component in its FIRST room forever, the stale-capture trap in room form. The deps are honest; the missing half is the undo. Cleanup is what turns re-runs into replacements.",
        },
        {
          id: "server",
          label: "The server is misrouting messages between rooms",
          correct: false,
          feedback:
            "The server delivers to every open connection, and the client holds several: one per visited room, none closed. The pile of live sockets is client-side, and the one-line cleanup dismantles it.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-003",
    },
    {
      id: "UIE-7-ACT-001-S03",
      position: 3,
      title: "The defeated memo",
      body: "`const Grid = memo(GridInner)` re-renders on every parent keystroke. The parent passes `columns={[...]}` as an inline array literal.",
      difficulty: "applied",
      clue: "is this render's array the same VALUE or the same REFERENCE as last render's?",
      prompt: "What is the right call?",
      options: [
        {
          id: "stable-ref",
          label: "Stabilise the reference: useMemo the array (or hoist it if static)",
          correct: true,
          feedback:
            "Correct. memo compares by reference and the literal is born fresh each render: `[1] === [1]` is false, UIE-4 verbatim. `useMemo(() => [...], [])`, or a module constant when it never changes, hands memo the same reference and the skip starts firing.",
        },
        {
          id: "memo-deeper",
          label: "Wrap GridInner's children in memo as well",
          correct: false,
          feedback:
            "Deeper memo cannot help while the outermost comparison sees a new prop every render: the skip never fires, so the children render regardless. Fix the reference at the source, the parent's render.",
        },
        {
          id: "deep-compare",
          label: "Give memo a deep-equality comparator",
          correct: false,
          feedback:
            "A deep comparator on a hot path trades a cheap render for an expensive comparison on every keystroke, and it hides the actual smell: an unstable reference for stable data. Stabilise the data once instead of comparing it forever.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-006",
    },
    {
      id: "UIE-7-ACT-001-S04",
      position: 4,
      title: "The infinite effect",
      body: "An effect fetches, then stores results with `setResults([...data])`, and lists `results` in its deps. The network tab shows the same request repeating forever.",
      difficulty: "applied",
      clue: "the effect writes the very thing it depends on",
      prompt: "What explains it?",
      options: [
        {
          id: "self-loop",
          label:
            "The effect updates its own dep with a new reference each time: run, set, changed, run",
          correct: true,
          feedback:
            "Correct. Every run stores a fresh array, deps compare by reference, 'changed', run again: a loop with a network bill. The effect should depend on what DRIVES the fetch (the query), never on what it produces.",
        },
        {
          id: "server-push",
          label: "The server is pushing updates that re-trigger the effect",
          correct: false,
          feedback:
            "The client is doing this alone: write results, see results 'changed' (new reference), re-run, write again. Depending on the fetch's inputs rather than its output ends the loop at one request.",
        },
        {
          id: "strict-mode",
          label: "Strict mode double-runs effects, doubling forever",
          correct: false,
          feedback:
            "Strict mode rehearses mount once, in development, and then stops. An unbounded repeat is the self-dependency signature: the effect's own write re-satisfies its trigger every cycle.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-003",
    },
    {
      id: "UIE-7-ACT-001-S05",
      position: 5,
      title: "The re-rendering theme",
      body: "A ThemeProvider passes `value={{ theme, setTheme }}` inline. Profiling shows every consumer re-rendering on every keystroke in an unrelated search box.",
      difficulty: "applied",
      clue: "what does each provider render hand its consumers?",
      prompt: "What is the right call?",
      options: [
        {
          id: "memo-value",
          label: "Memoize the provider value: same reference until theme actually changes",
          correct: true,
          feedback:
            "Correct. The search box re-renders the provider, the inline object is born fresh, and context re-renders every consumer on reference change. `useMemo(() => ({ theme, setTheme }), [theme])` hands out one reference per actual theme change.",
        },
        {
          id: "split-context",
          label: "Ban the search box from the provider's subtree",
          correct: false,
          feedback:
            "Restructuring the tree around a fixable object identity is the expensive road. The mechanism is the fresh reference; one useMemo on the value stops the cascade wherever the search box lives.",
        },
        {
          id: "context-broken",
          label: "Context always re-renders consumers; nothing can be done",
          correct: false,
          feedback:
            "Context re-renders consumers when the VALUE's reference changes, which is exactly the lever: stabilise the reference and quiet renders follow. The bluntness is real, but this half is entirely fixable.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-007",
    },
    {
      id: "UIE-7-ACT-001-S06",
      position: 6,
      title: "The watcher effect",
      body: "A form stores `isValid` in state, updated by an effect that watches the fields. Reviews report a one-keystroke lag in the submit button's state.",
      difficulty: "challenging",
      clue: "does anything outside React participate in isValid?",
      prompt: "What does the review say?",
      options: [
        {
          id: "derive",
          label: "Delete the state and the effect: derive isValid in the body during render",
          correct: true,
          feedback:
            "Correct. Effects run AFTER commit, so the mirror updates one render behind its source, the visible lag. Nothing outside React is involved, which is the tell: `const isValid = validate(fields)` in the body is on time, every render, with no machinery.",
        },
        {
          id: "sync-effect",
          label: "Use a layout effect so the update lands before paint",
          correct: false,
          feedback:
            "That hides the lag while keeping the two-sources problem and adding blocking work before paint. The state is derivable, so it should not be state at all: the render body computes it on time for free.",
        },
        {
          id: "more-deps",
          label: "Add the missing field to the effect's deps",
          correct: false,
          feedback:
            "Complete deps make the mirror correct one render late instead of wrong, and late is the reported bug. Derivation during render deletes the lag AND the deps list: the strongest fix removes the effect entirely.",
        },
      ],
      remediationAnchor: "UIE-7-LESSON-003",
    },
  ],
};

/** UIE-7 retrieval step: one mechanism per model. */
export const uie7CheckSeed: CheckSeed = {
  id: "UIE-7-CHK-001",
  label: "Practice check",
  intro:
    "Four short problems. Nothing here is graded, and every answer traces the closure, the deps, or the lifecycle.",
  questions: [
    {
      id: "UIE-7-CHK-001-Q1",
      category: "react_hooks_rules",
      difficulty: "applied",
      learningOutcomes: ["UIE-7-LO1"],
      misconceptionTags: [],
      stem: "Why must the same hooks run in the same order on every render?",
      options: [
        {
          text: "Hook state is matched to calls by position: order is the only identity",
          correct: true,
        },
        { text: "The linter requires it for readability", correct: false },
        { text: "Hooks are globals that collide when reordered", correct: false },
        { text: "Ordering only matters for effects, not state", correct: false },
      ],
      correctFeedback:
        "The list model: slot N this render must be slot N next render, or state lands with the wrong hook. The linter enforces the mechanism; it did not invent it.",
      incorrectFeedback:
        "The rule is mechanical, not stylistic: hooks have no names, only positions in a per-component list. Any render that shifts the numbering hands state to the wrong owners, for every hook kind alike.",
      chip: { label: "The rules of hooks", anchor: "UIE-7-LESSON-002" },
    },
    {
      id: "UIE-7-CHK-001-Q2",
      category: "react_effects",
      difficulty: "applied",
      learningOutcomes: ["UIE-7-LO2"],
      misconceptionTags: ["UIE-M-008"],
      stem: "roomId changes from A to B. What order do the effect pieces run in?",
      options: [
        { text: "Cleanup for A, then the effect for B", correct: true },
        { text: "Effect for B, then cleanup for A", correct: false },
        { text: "Cleanup only runs at unmount", correct: false },
        { text: "Both effects run; cleanups queue for idle time", correct: false },
      ],
      correctFeedback:
        "Old room disconnects before new room connects: cleanup-then-run is the swap that keeps exactly one subscription alive. Unmount is just the final cleanup with no re-run after.",
      incorrectFeedback:
        "The lifecycle is cleanup-first on every deps change: undo A, then do B. Cleanup at unmount-only is the misreading that produces connection piles; nothing queues for idle time.",
      chip: { label: "Effects: synchronising with the outside", anchor: "UIE-7-LESSON-003" },
    },
    {
      id: "UIE-7-CHK-001-Q3",
      category: "react_refs",
      difficulty: "foundational",
      learningOutcomes: ["UIE-7-LO3"],
      misconceptionTags: [],
      stem: "What is the deciding question between useState and useRef for a value?",
      options: [
        { text: "Should the screen update when this value changes?", correct: true },
        { text: "Is the value an object or a primitive?", correct: false },
        { text: "Will the value change more than once?", correct: false },
        { text: "Does the value come from the server?", correct: false },
      ],
      correctFeedback:
        "State schedules renders; refs never do. A value the UI displays is state; an interval id, a latest-callback box or a DOM handle is a ref. One question sorts every case.",
      incorrectFeedback:
        "Type, frequency and origin are all beside the point: the split is whether changing the value should repaint. Yes is state, no is a ref, and mixing them up costs either missing updates or wasted renders.",
      chip: { label: "Refs: memory without renders", anchor: "UIE-7-LESSON-005" },
    },
    {
      id: "UIE-7-CHK-001-Q4",
      category: "react_memoization",
      difficulty: "applied",
      learningOutcomes: ["UIE-7-LO4"],
      misconceptionTags: [],
      stem: "When is useCallback REQUIRED for correctness rather than performance?",
      options: [
        {
          text: "When the function sits in an effect's deps: an unstable reference re-runs the effect every render",
          correct: true,
        },
        { text: "Whenever a function is passed as a prop", correct: false },
        { text: "For every handler in a list", correct: false },
        { text: "Never: useCallback is always optional polish", correct: false },
      ],
      correctFeedback:
        "Deps compare by reference, so a fresh function per render means 'changed' every render: subscriptions churn or loop. Stabilising that reference is correctness; most other uses are measured performance work.",
      incorrectFeedback:
        "Most function props need nothing: an unmemoized child re-renders cheaply. The correctness case is deps: an effect depending on a function re-runs whenever the reference changes, and useCallback is what keeps that honest.",
      chip: { label: "Memoization: paying for identity", anchor: "UIE-7-LESSON-006" },
    },
  ],
  completion: {
    body: "Four mechanisms, four traces. When the closure, the deps contract and the lifecycle answer before the options tempt you, the hooks tier is yours, and the pathway's graded assessments are the readiness signal waiting to be earned.",
  },
};
