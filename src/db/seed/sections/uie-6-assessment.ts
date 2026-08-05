import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-6 graded bank: twelve items over the five foundations families,
 * blueprint difficulty mix (five foundational, six applied, one challenging).
 * Two fixedDraw habits ride every attempt: the snapshot item (the
 * misconception the course opens on) and the mutation-bailout item (the
 * silent bug with the highest production hit rate).
 */
export const uie6AssessmentSeed: AssessmentSeed = {
  id: "UIE-6-ASM-001",
  intro:
    "Six questions drawn from a twelve-item bank across the foundations. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-6-QB-001",
      format: "multiple_choice",
      category: "react_state",
      difficulty: "foundational",
      stem: "count is 0. A handler runs `setCount(count + 1); setCount(count + 1);`. After the re-render, count is?",
      options: [
        { text: "1: both calls read the same snapshot", correct: true },
        { text: "2: the calls accumulate", correct: false },
        { text: "0: setters need the functional form to work at all", correct: false },
        { text: "2, but only in strict mode", correct: false },
      ],
      correctExplanation:
        "Correct. The state variable is this render's constant: both calls compute 0 + 1 and queue 1. Two increments need the updater form, `setCount(c => c + 1)`, which reads the queue instead of the snapshot.",
      incorrectExplanation:
        "Not quite. Plain setters read the render's snapshot, and both read 0: the queue receives 1 twice. Accumulation is what the functional form provides, and strict mode changes none of this. Review: state as a snapshot per render.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO3"],
      misconceptionTags: ["UIE-M-007"],
    },
    {
      id: "UIE-6-QB-002",
      format: "multiple_choice",
      category: "react_state",
      difficulty: "applied",
      stem: "A click starts `setTimeout(() => alert(count), 3000)`. The user clicks twice more before it fires, and count is now 3. What does the alert say?",
      options: [
        { text: "The count from the render that created the timeout", correct: true },
        { text: "3: the callback reads current state", correct: false },
        { text: "undefined: the render is gone", correct: false },
        { text: "It throws: state cannot cross a timeout", correct: false },
      ],
      correctExplanation:
        "Correct. The callback closed over its render's snapshot, and later renders mint new variables rather than rewriting old ones. UIE-5's closure model, verbatim: which variable, born when?",
      incorrectExplanation:
        "Not quite. The callback is a closure over ONE render's constant: it alerts that render's count, alive and well, however many renders followed. Nothing throws and nothing reads 'current': snapshots are per render, and closures keep them. Review: state as a snapshot per render.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO3"],
      misconceptionTags: ["UIE-M-007"],
    },
    {
      id: "UIE-6-QB-003",
      format: "multiple_choice",
      category: "react_state",
      difficulty: "applied",
      stem: "`todos.push(item); setTodos(todos);` runs and the screen shows nothing new. What happened?",
      options: [
        { text: "Same reference: React's change check bailed out before rendering", correct: true },
        { text: "The push is still pending asynchronously", correct: false },
        { text: "The array exceeded React's state size limit", correct: false },
        { text: "push returns a number, corrupting the state", correct: false },
      ],
      correctExplanation:
        "Correct. Mutation kept the reference, and `Object.is(old, new)` said unchanged: no render scheduled, real data invisible. `setTodos([...todos, item])` presents a new reference, which is the change protocol.",
      incorrectExplanation:
        "Not quite. push is synchronous, there is no size limit, and the setter received the array, not push's return. The silent part is the reference check: same array in, bail-out, no render. New references carry the news. Review: immutability is the render trigger.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO4"],
      misconceptionTags: [],
    },

    {
      id: "UIE-6-QB-004",
      format: "multiple_choice",
      category: "react_rendering",
      difficulty: "foundational",
      stem: "Where should a value that is fully computable from state, like a filtered list, live?",
      options: [
        { text: "In the function body, computed during render", correct: true },
        { text: "In its own state, synced by an effect", correct: false },
        { text: "In a module-level cache beside the component", correct: false },
        { text: "In the DOM, read back when needed", correct: false },
      ],
      correctExplanation:
        "Correct. The body re-runs every render, so a derivation there is always fresh with no second source of truth. State-plus-effect mirrors drift; module caches update outside the render model; the DOM is output, not storage.",
      incorrectExplanation:
        "Not quite. Rendering re-runs the body, which makes it the natural home of derived data: correct by construction, zero sync machinery. Every storage option creates a copy that can disagree with its source. Review: rendering is re-running.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-6-QB-005",
      format: "multiple_choice",
      category: "react_rendering",
      difficulty: "applied",
      stem: "A conditional renders `<TextField />` in one branch and `<NumberField />` in the other. Toggling it loses what the user typed. Why?",
      options: [
        { text: "A changed element type tears down and rebuilds, state included", correct: true },
        { text: "Inputs always reset on every render", correct: false },
        { text: "The condition re-runs the parent, which clears children", correct: false },
        { text: "Both components accidentally share one state slot", correct: false },
      ],
      correctExplanation:
        "Correct. Reconciliation matches by type at each position: a different type is a different thing, so the old unmounts with its state and the new mounts fresh. Same-type updates preserve state, which is the other half of the rule.",
      incorrectExplanation:
        "Not quite. Inputs survive renders happily, and parents re-rendering preserves same-type children. The reset came from the TYPE changing at that position: the differ tears down and rebuilds, state included, by rule. Review: rendering is re-running, go deeper.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO2"],
      misconceptionTags: [],
    },

    {
      id: "UIE-6-QB-006",
      format: "multiple_choice",
      category: "react_components_props",
      difficulty: "foundational",
      stem: "Which statement about props is accurate?",
      options: [
        { text: "They are the component's read-only inputs, passed by the parent", correct: true },
        { text: "The child may edit them to request changes", correct: false },
        { text: "They persist between renders like state", correct: false },
        { text: "They are global values any component can read", correct: false },
      ],
      correctExplanation:
        "Correct. Props are arguments: the parent chooses them each render, the child reads them and never writes. Changes travel the other lane, callbacks up, and each render's props are that call's arguments, not stored memory.",
      incorrectExplanation:
        "Not quite. Props are per-call arguments from the parent: read-only in the child, re-supplied on every render, visible only where passed. Editing them is the anti-pattern the one-way model exists to prevent. Review: props flow down, events flow up.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-6-QB-007",
      format: "multiple_choice",
      category: "react_components_props",
      difficulty: "applied",
      stem: "A Modal component should wrap arbitrary content the caller provides. Which mechanism is idiomatic?",
      options: [
        { text: "`children`: the caller nests content between the Modal's tags", correct: true },
        { text: "A `contentHtml` string prop rendered with innerHTML", correct: false },
        { text: "A global registry the Modal reads by name", correct: false },
        { text: "Copying the Modal for each content variant", correct: false },
      ],
      correctExplanation:
        "Correct. `children` is composition: the Modal renders `{children}` where content belongs and never knows what arrived. The HTML-string route reopens UIE-4's injection sink, and copies and registries trade composition for maintenance.",
      incorrectExplanation:
        "Not quite. The composition prop is `children`: nested JSX arrives as a value the Modal places without inspecting. HTML strings revive the innerHTML risk, and per-variant copies are the mega-component problem in reverse. Review: components, and the children explore.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO1"],
      misconceptionTags: [],
    },

    {
      id: "UIE-6-QB-008",
      format: "multiple_choice",
      category: "react_lists_keys",
      difficulty: "foundational",
      stem: "Why is `key={item.id}` preferred over `key={index}` for a reorderable list?",
      options: [
        {
          text: "State and DOM follow the item through moves; index ties them to the position",
          correct: true,
        },
        { text: "ids render faster than numbers", correct: false },
        { text: "Indexes are not valid key values", correct: false },
        { text: "It prevents duplicate items in the data", correct: false },
      ],
      correctExplanation:
        "Correct. Keys are matching identity across renders: with ids, a moved item is recognised and its row state moves too; with indexes, position is identity and reorders mix state between items.",
      incorrectExplanation:
        "Not quite. Indexes are legal and speed is identical; the difference is identity. The differ matches by key, so ids let state and DOM travel with their item while indexes pin them to positions that reorders reshuffle. Review: lists and keys.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-6-QB-009",
      format: "multiple_choice",
      category: "react_lists_keys",
      difficulty: "challenging",
      stem: "A profile editor should reset all its internal state when the selected user changes. Which is the idiomatic one-liner?",
      options: [
        {
          text: "`<ProfileEditor key={userId} />`: a changed key mounts a fresh instance",
          correct: true,
        },
        {
          text: "An effect that sets every field back to defaults on userId change",
          correct: false,
        },
        { text: "Reload the page on selection change", correct: false },
        { text: "Store the fields in module scope and overwrite them", correct: false },
      ],
      correctExplanation:
        "Correct. A changed key tells the differ 'different thing here': the old instance unmounts with all its state and a fresh one mounts. One attribute replaces a field-by-field reset effect that must chase every future field.",
      incorrectExplanation:
        "Not quite. The reset-effect works until someone adds a field and forgets the effect; the key route cannot go stale, because unmounting IS the reset. `key={userId}` is the idiom: identity change, fresh instance. Review: lists and keys, explore.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO5"],
      misconceptionTags: [],
    },

    {
      id: "UIE-6-QB-010",
      format: "multiple_choice",
      category: "react_forms_events",
      difficulty: "foundational",
      stem: "What makes an input 'controlled'?",
      options: [
        {
          text: "Its value is pinned to state, with onChange as the only way the state learns",
          correct: true,
        },
        { text: "It validates itself with HTML attributes", correct: false },
        { text: "It is disabled until the form is ready", correct: false },
        { text: "React intercepts and stores its keystrokes globally", correct: false },
      ],
      correctExplanation:
        "Correct. Control is the value/onChange pair: display pinned to state, keystrokes reported to state, and the render loop closing the circle. Validation attributes and disabling are orthogonal; nothing global is involved.",
      incorrectExplanation:
        "Not quite. Controlled means state owns the value: `value={x}` pins the display and `onChange` is how x advances. Without the pair the input either types freely (uncontrolled) or freezes (value with no onChange). Review: controlled inputs.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-6-QB-011",
      format: "multiple_choice",
      category: "react_forms_events",
      difficulty: "applied",
      stem: "The submit button must disable while the email field is invalid. Where does that logic belong?",
      options: [
        {
          text: "Derived during render from the email state: `disabled={!isValid(email)}`",
          correct: true,
        },
        { text: "In a separate isDisabled state, set by an effect watching email", correct: false },
        { text: "In direct DOM manipulation of the button on each keystroke", correct: false },
        { text: "In a submit-time check alone", correct: false },
      ],
      correctExplanation:
        "Correct. The controlled input already re-renders per keystroke, so deriving validity in the body keeps button and field agreeing by construction. Mirror state drifts, DOM pokes go around the model, and submit-only checks surrender the live feedback.",
      incorrectExplanation:
        "Not quite. Because the form is state, validity is a derivation, computed in the body each render, not stored, mirrored or poked into the DOM. That is the payoff controlled inputs buy. Review: controlled inputs, and deriving during render.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-6-QB-012",
      format: "multiple_choice",
      category: "react_rendering",
      difficulty: "applied",
      stem: "A handler calls three setters for three different state values. How many renders result, and why?",
      options: [
        { text: "One: React batches updates from a handler into a single pass", correct: true },
        { text: "Three, in call order", correct: false },
        { text: "Zero until the user interacts again", correct: false },
        { text: "One per distinct hook, so it depends", correct: false },
      ],
      correctExplanation:
        "Correct. Handler updates queue together and flush as one render whose snapshot carries all three new values. Batching is why intermediate half-updated frames never appear.",
      incorrectExplanation:
        "Not quite. Updates inside a handler batch: one render at the end sees all three values, regardless of how many hooks were touched. Per-call renders would paint inconsistent intermediate states, which batching exists to prevent. Review: one render cycle.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-6-LO2"],
      misconceptionTags: ["UIE-M-007"],
    },
  ],
};
