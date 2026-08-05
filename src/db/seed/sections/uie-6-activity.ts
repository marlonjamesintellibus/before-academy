import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-6 designed interaction and retrieval step. Review-queue dialect on
 * component code: each scenario is a render-model call, and the feedback
 * traces the cycle (snapshot, reference, key, or wiring) that decides it.
 */
export const uie6ActivitySeed: ActivitySeed = {
  id: "UIE-6-ACT-001",
  title: "The render review",
  intro:
    "Six review calls on real component code. Predict the render, name the model that decides it, and check your trace against the feedback.",
  instructions:
    "Read the snippet, make the call, and check. The feedback walks the cycle: snapshot, queue, reference, key, or the one-way flow.",
  scenarios: [
    {
      id: "UIE-6-ACT-001-S01",
      position: 1,
      title: "The double increment",
      body: "A quantity stepper's handler runs `setQty(qty + 1); setQty(qty + 1);` to jump by two. QA reports it steps by one.",
      difficulty: "foundational",
      clue: "both calls photograph the same render",
      prompt: "What is the fix?",
      options: [
        {
          id: "functional",
          label:
            "Use the updater form twice: `setQty(q => q + 1)` reads the queue, not the snapshot",
          correct: true,
          feedback:
            "Correct. Both plain calls read this render's `qty` and queue the same value; the updater form receives the queue's latest, so two calls advance twice. Deriving next-from-current is what the functional form is for.",
        },
        {
          id: "await",
          label: "Await the first set before the second",
          correct: false,
          feedback:
            "Setters return nothing to await, and no delay changes the snapshot: the variable is a constant of this render. The queue is the moving part, and only the updater form reads it.",
        },
        {
          id: "double",
          label: "Just write `setQty(qty + 2)`",
          correct: false,
          feedback:
            "It works for this button and forfeits the lesson: any code path that composes increments (hold-to-repeat, keyboard plus click) re-meets the snapshot trap. The updater form composes; the arithmetic patch does not.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-005",
    },
    {
      id: "UIE-6-ACT-001-S02",
      position: 2,
      title: "The silent list",
      body: "`items.push(created); setItems(items);` runs after a save. The network tab shows success; the list on screen does not grow.",
      difficulty: "foundational",
      clue: "what did setItems receive, compared with last render?",
      prompt: "What explains it?",
      options: [
        {
          id: "same-ref",
          label: "Same array reference: React's change check says nothing changed, so no render",
          correct: true,
          feedback:
            "Correct. Push mutated in place, and the setter received the reference it already had: bail-out. `setItems([...items, created])` builds a new reference, which is the protocol renders listen on.",
        },
        {
          id: "server",
          label: "The list is waiting on a refetch from the server",
          correct: false,
          feedback:
            "The data already arrived and even entered the array; no refetch is pending. The miss is local: an in-place push presents the old reference, and React reasonably skips the render.",
        },
        {
          id: "key-missing",
          label: "The new item lacks a key, so React refuses to render it",
          correct: false,
          feedback:
            "Missing keys warn in the console and render anyway. Nothing rendered because nothing was scheduled: the reference check saw the same array. New reference first; the key matters once the render happens.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-006",
    },
    {
      id: "UIE-6-ACT-001-S03",
      position: 3,
      title: "The wandering checkbox",
      body: "A searchable contact list renders rows with `key={index}`, each row with a favourite toggle. Favouriting a contact, then searching, highlights a different contact.",
      difficulty: "applied",
      clue: "who owns the toggle state: the item or the position?",
      prompt: "What is the right call?",
      options: [
        {
          id: "id-key",
          label: "Key by the contact's id: state must travel with the item, not the position",
          correct: true,
          feedback:
            "Correct. Index keys declare position as identity, so the toggle's state stayed at row N while the search changed which contact is row N. `key={contact.id}` re-ties state to the data through any filter or sort.",
        },
        {
          id: "clear-state",
          label: "Clear all row state whenever the search changes",
          correct: false,
          feedback:
            "That erases the user's real favourites to mask a matching bug. Identity keys make the mixing impossible instead of hiding it: the state follows the id wherever the row lands.",
        },
        {
          id: "no-key",
          label: "Remove keys entirely and let React figure it out",
          correct: false,
          feedback:
            "Keyless lists fall back to, precisely, the index. The console warning exists because this bug family follows. The item's own id is the answer the warning is asking for.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-007",
    },
    {
      id: "UIE-6-ACT-001-S04",
      position: 4,
      title: "The frozen input",
      body: "`<input value={name} />` with no onChange. Typing does nothing, and the console warns about a controlled component.",
      difficulty: "foundational",
      clue: "value pins the display to state; what updates the state?",
      prompt: "What explains it?",
      options: [
        {
          id: "half-wired",
          label: "The input is controlled with no way to change the state it mirrors",
          correct: true,
          feedback:
            "Correct. `value` pins every render to `name`, and nothing ever sets `name`, so every keystroke re-renders the same string. Add `onChange={(e) => setName(e.target.value)}` to close the loop, or drop `value` for an uncontrolled input.",
        },
        {
          id: "readonly",
          label: "React inputs are read-only by default",
          correct: false,
          feedback:
            "An input with no `value` prop types freely, uncontrolled. The freeze came from pinning the display without wiring the report: control is a pair, value down and onChange up, and half a pair is a lock.",
        },
        {
          id: "browser",
          label: "The browser blocked the input for security",
          correct: false,
          feedback:
            "No permission is involved: the input renders exactly what `value` says, every render, and `value` never changes. The warning in the console names the pattern: controlled without onChange.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-008",
    },
    {
      id: "UIE-6-ACT-001-S05",
      position: 5,
      title: "The sideways read",
      body: "A filter panel needs the results count that lives in its sibling, the results list. A teammate proposes exporting the list's state through a module-level variable.",
      difficulty: "applied",
      clue: "which direction does data legally travel?",
      prompt: "What does the review say?",
      options: [
        {
          id: "lift",
          label: "Lift the count to the common parent and pass it down to both",
          correct: true,
          feedback:
            "Correct. Siblings share through the closest common parent: it owns the results (or the count), passes data down to both panels, and receives events up. The module variable would update outside React's knowledge: no render, stale UI.",
        },
        {
          id: "module-var",
          label: "Approve the module variable: it is the least code",
          correct: false,
          feedback:
            "Writes to a module variable schedule nothing: React never learns, and the panel renders stale until something else happens to render it. State that drives UI lives in React's model, where changes queue renders.",
        },
        {
          id: "effect-sync",
          label: "Mirror the count into the panel with an effect",
          correct: false,
          feedback:
            "Mirroring duplicates state and adds the machinery to keep the copies agreeing, the classic tangle. One owner above, two readers below deletes the problem instead of managing it.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-003",
    },
    {
      id: "UIE-6-ACT-001-S06",
      position: 6,
      title: "The derived state trap",
      body: "A cart stores `items` in state, and ALSO stores `total` in state, updated by an effect whenever items change. The totals drift after a fast sequence of edits.",
      difficulty: "challenging",
      clue: "does total need to be stored at all?",
      prompt: "What does the review say?",
      options: [
        {
          id: "derive",
          label: "Delete the total state: compute it during render from items",
          correct: true,
          feedback:
            "Correct. `const total = items.reduce(...)` in the body is correct on every render by construction: no second source of truth, no effect, no drift window. Store only what cannot be derived; derive the rest at render time.",
        },
        {
          id: "faster-effect",
          label: "Keep the effect but make it run sooner",
          correct: false,
          feedback:
            "However fast, an effect updates the copy one render after the source, and the window between is where the drift lives. The copy is the bug: derivation during render has no window at all.",
        },
        {
          id: "one-setter",
          label: "Update items and total together in every handler",
          correct: false,
          feedback:
            "Now every current and future handler must remember the pairing, and one miss desynchronises silently. The render model offers the stronger guarantee for free: derive during render, and total cannot disagree with items.",
        },
      ],
      remediationAnchor: "UIE-6-LESSON-004",
    },
  ],
};

/** UIE-6 retrieval step: one item per core model. */
export const uie6CheckSeed: CheckSeed = {
  id: "UIE-6-CHK-001",
  label: "Practice check",
  intro: "Four short problems. Nothing here is graded, and every answer walks the cycle.",
  questions: [
    {
      id: "UIE-6-CHK-001-Q1",
      category: "react_state",
      difficulty: "applied",
      learningOutcomes: ["UIE-6-LO3"],
      misconceptionTags: ["UIE-M-007"],
      stem: "A handler logs state right after calling its setter, and the log shows the OLD value. Why?",
      options: [
        {
          text: "The variable is this render's snapshot; the new value arrives with the next render",
          correct: true,
        },
        { text: "The setter silently rejected the update", correct: false },
        { text: "console.log runs before React code by specification", correct: false },
        { text: "The component is missing a dependency array", correct: false },
      ],
      correctFeedback:
        "Setting queues a re-render; it never edits the constant this render already holds. The next call of the component receives the new value, and the old log is the snapshot doing exactly its job.",
      incorrectFeedback:
        "Nothing was rejected and no array is involved: the state variable is a per-render constant. The setter queues the next render, and code in THIS render, logs included, keeps reading this render's photograph.",
      chip: { label: "State: a snapshot per render", anchor: "UIE-6-LESSON-005" },
    },
    {
      id: "UIE-6-CHK-001-Q2",
      category: "react_rendering",
      difficulty: "foundational",
      learningOutcomes: ["UIE-6-LO2"],
      misconceptionTags: [],
      stem: "What are the two triggers that make a component render?",
      options: [
        { text: "Its own state updating, or its parent rendering", correct: true },
        { text: "Only direct DOM events on its elements", correct: false },
        { text: "A timer React runs every frame", correct: false },
        { text: "Any variable in the module changing", correct: false },
      ],
      correctFeedback:
        "State updates schedule the component itself; a rendering parent calls its children as part of producing its own description. Module variables and frames are invisible to the scheduler.",
      incorrectFeedback:
        "React polls nothing and watches no plain variables: renders happen when a component's state updates or when its parent renders and calls it. Everything else must route through one of those two doors.",
      chip: { label: "Rendering is re-running", anchor: "UIE-6-LESSON-004" },
    },
    {
      id: "UIE-6-CHK-001-Q3",
      category: "react_lists_keys",
      difficulty: "applied",
      learningOutcomes: ["UIE-6-LO5"],
      misconceptionTags: [],
      stem: "What is a key actually FOR?",
      options: [
        { text: "Matching items across renders so state and DOM follow their item", correct: true },
        { text: "Making list items clickable", correct: false },
        { text: "A prop the item component receives for its own logic", correct: false },
        { text: "Sorting the array before rendering", correct: false },
      ],
      correctFeedback:
        "Keys are identity for the differ: this render's items are matched to last render's by key, so moves are moves rather than rewrites, and row state stays with its row.",
      incorrectFeedback:
        "Keys never reach the component as props and touch no sorting or events: they exist for the diff. React matches items across renders by key, which is why identity keys keep state travelling with data and index keys mix rows.",
      chip: { label: "Lists and keys", anchor: "UIE-6-LESSON-007" },
    },
    {
      id: "UIE-6-CHK-001-Q4",
      category: "react_components_props",
      difficulty: "foundational",
      learningOutcomes: ["UIE-6-LO1"],
      misconceptionTags: [],
      stem: "A child component needs to change data owned by its parent. What is the mechanism?",
      options: [
        {
          text: "The parent passes a callback prop; the child calls it with the change",
          correct: true,
        },
        { text: "The child writes to the prop directly", correct: false },
        { text: "The child sets a shared module variable", correct: false },
        { text: "The child renders the parent with new props", correct: false },
      ],
      correctFeedback:
        "Events climb as function calls: the parent hands down `onChange`-shaped props, keeps ownership, and decides what the change means. Props stay read-only in the child.",
      incorrectFeedback:
        "Props are read-only, children never render parents, and module variables sit outside the render model. The one lane is the callback prop: passed down, called up, ownership unmoved.",
      chip: { label: "Props flow down, events flow up", anchor: "UIE-6-LESSON-003" },
    },
  ],
  completion: {
    body: "Four models, four traces. When the snapshot, the reference and the key answer before the options tempt you, the foundations hold, and the hooks course will read as consequences.",
  },
};
