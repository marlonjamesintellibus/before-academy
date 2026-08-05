import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";

/**
 * UIE-3 designed interaction and retrieval step. The activity is a review
 * queue: real markup and CSS calls, judged the way a pull-request reviewer
 * judges them, with the deciding model named in every feedback line. Inline
 * code carries the snippets through stems, options and feedback.
 */
export const uie3ActivitySeed: ActivitySeed = {
  id: "UIE-3-ACT-001",
  title: "The review queue",
  intro:
    "Six review calls on real markup and CSS. Decide what renders, what wins, or which version ships, and check your model against the one that decides it.",
  instructions:
    "Read the snippet, make the call, and check. The feedback walks the model that settles it: semantics, the box, the axes, the score, or the habits.",
  scenarios: [
    {
      id: "UIE-3-ACT-001-S01",
      position: 1,
      title: "The clickable div",
      body: 'A teammate ships `<div class="btn" onclick="save()">Save</div>` styled to look exactly like the design. What does the review say?',
      difficulty: "foundational",
      clue: "what does the keyboard user press?",
      prompt: "What is the right call?",
      options: [
        {
          id: "button",
          label: "Change it to a `<button>`: the div rebuilds none of what the element gives free",
          correct: true,
          feedback:
            "Correct. The div is unfocusable, ignores Enter and Space, and announces as nothing. A `<button>` carries all three for free, and the styling transfers unchanged. Semantics are behaviour, not decoration.",
        },
        {
          id: "fine",
          label: "Approve it: it looks and clicks the same",
          correct: false,
          feedback:
            "It clicks the same for a mouse. Tab to it and nothing focuses; press Enter and nothing saves; ask a screen reader and it says nothing actionable. The identical pixels are hiding a different element.",
        },
        {
          id: "tabindex",
          label: 'Add `tabindex="0"` and keep the div',
          correct: false,
          feedback:
            "Focus is one of three gaps: Enter and Space still do nothing without a key handler, and the announcement is still missing without a role. Rebuilding a button by hand is three patches for what `<button>` spells in one word.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-002",
    },
    {
      id: "UIE-3-ACT-001-S02",
      position: 2,
      title: "The overflowing card",
      body: "A 320px column holds a card set to `width: 320px; padding: 16px; border: 1px solid;` and it overflows by 34 pixels. Why?",
      difficulty: "foundational",
      clue: "which sizing model is the stylesheet using?",
      prompt: "What explains the 34 pixels?",
      options: [
        {
          id: "content-box",
          label: "Default sizing: padding and border stack on top of the 320",
          correct: true,
          feedback:
            "Correct. Under the default model the card renders at 320 + 32 + 2 = 354. Either subtract the extras from the width or set `box-sizing: border-box` and let 320 mean the visible box, which is why most codebases set it globally.",
        },
        {
          id: "margin",
          label: "The margin pushes the card wider",
          correct: false,
          feedback:
            "Margin spaces boxes apart; it never adds to the box's own size. The 34 pixels are exactly two sides of padding plus two sides of border: 32 + 2, stacked on the content width by the default sizing model.",
        },
        {
          id: "bug",
          label: "A browser rounding bug: 320 should mean 320",
          correct: false,
          feedback:
            "The browser is doing precisely what the default model specifies: `width` sets the content, and padding and border add on. The arithmetic 320 + 32 + 2 = 354 is the whole mystery, and `border-box` is the spell that makes 320 mean 320.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-003",
    },
    {
      id: "UIE-3-ACT-001-S03",
      position: 3,
      title: "The centring attempt",
      body: "A loading spinner must sit dead centre of its panel. The panel has `display: flex; justify-content: center;` and the spinner sits centred horizontally but stuck at the top.",
      difficulty: "foundational",
      clue: "one axis is handled; which property owns the other?",
      prompt: "What completes the centring?",
      options: [
        {
          id: "align",
          label: "Add `align-items: center` for the cross axis",
          correct: true,
          feedback:
            "Correct. `justify-content` handled the main axis, which runs horizontally here. The cross axis belongs to `align-items`, and with both set the spinner sits dead centre: the two-line pattern doing its job.",
        },
        {
          id: "margin-auto",
          label: "Add `margin-top: 50%` to the spinner",
          correct: false,
          feedback:
            "Percentage margins compute against the parent's width, not height, so this lands somewhere surprising and stays fragile as the panel resizes. The flex container already owns the answer: `align-items: center` on the cross axis.",
        },
        {
          id: "justify-again",
          label: "Set `justify-content: center` on the spinner itself",
          correct: false,
          feedback:
            "`justify-content` distributes a container's children; on the spinner it waits for children the spinner does not have. The missing half of the centring lives on the panel, on the other axis: `align-items: center`.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-004",
    },
    {
      id: "UIE-3-ACT-001-S04",
      position: 4,
      title: "The stubborn colour",
      body: "The stylesheet ends with `.link-quiet { color: gray; }`, yet the link renders navy from `#sidebar a` declared 200 lines earlier. A teammate proposes `!important`.",
      difficulty: "applied",
      clue: "score the two selectors before reaching for the hammer",
      prompt: "What does the review say?",
      options: [
        {
          id: "score",
          label:
            "The id rule outscores the class: raise the loser's specificity or restructure, not `!important`",
          correct: true,
          feedback:
            "Correct. `#sidebar a` scores (1,0,1) and `.link-quiet` scores (0,1,0): the id wins regardless of order, and the paper score explains the whole mystery. `!important` would win today and tax every override after it.",
        },
        {
          id: "important",
          label: "Approve `!important`: it is one line and it works",
          correct: false,
          feedback:
            "It works the way an arms race works: the next rule that needs to win now needs its own `!important`, and the stylesheet escalates from there. The losing score, (0,1,0) against (1,0,1), points at the real fix: match or restructure the specificity.",
        },
        {
          id: "order",
          label: "Move `.link-quiet` even later in the file",
          correct: false,
          feedback:
            "Source order only breaks exact ties, and this is a (1,0,1) against (0,1,0) mismatch: the id rule wins from any position. Reordering cannot promote a lower score; only the selector itself can change the contest.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-005",
    },
    {
      id: "UIE-3-ACT-001-S05",
      position: 5,
      title: "The placeholder label",
      body: 'A signup form uses `<input placeholder="Email address" />` with no label, and the design looks clean. What does the review say?',
      difficulty: "applied",
      clue: "what remains once the user starts typing?",
      prompt: "What is the right call?",
      options: [
        {
          id: "label",
          label: "Add a real `<label for>` wired to the input's `id`",
          correct: true,
          feedback:
            "Correct. A placeholder vanishes at the first keystroke, taking the field's name with it, and assistive tech cannot rely on it as a name. The `for`/`id` pair keeps the name present, clickable and announced, whatever the visual design does with it.",
        },
        {
          id: "placeholder-fine",
          label: "Approve it: the placeholder tells the user what goes there",
          correct: false,
          feedback:
            "Until they type, and then the field is anonymous mid-task: the moment of doubt arrives exactly when the hint is gone. A wired `<label>` survives typing, enlarges the click target, and gives the field its announced name.",
        },
        {
          id: "title-attr",
          label: "Add a `title` attribute as the accessible name",
          correct: false,
          feedback:
            "`title` surfaces as a hover tooltip: unreachable on touch, unreliable for assistive tech, invisible while typing. The dependable pattern is the one the platform defines: `<label for>` matched to the input's `id`.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-006",
    },
    {
      id: "UIE-3-ACT-001-S06",
      position: 6,
      title: "The two-axis wall",
      body: "A photo wall needs uniform columns and rows with images aligned in both directions, and the current flexbox version fights wrapping at every breakpoint.",
      difficulty: "applied",
      clue: "count the axes the design actually controls",
      prompt: "What is the right tool?",
      options: [
        {
          id: "grid",
          label: "Grid: `grid-template-columns` with `gap` places both axes at once",
          correct: true,
          feedback:
            "Correct. The design controls rows and columns together, which is grid's whole job: `grid-template-columns: repeat(3, 1fr)` with a `gap` replaces the wrapping arithmetic entirely. Flexbox distributes one axis; this layout owns two.",
        },
        {
          id: "flex-wrap",
          label: "Keep flexbox and tune `flex-wrap` percentages per breakpoint",
          correct: false,
          feedback:
            "Wrapping flexbox approximates a grid by fighting it: each breakpoint needs new percentage arithmetic because rows are emergent, not declared. When both axes are part of the design, declaring them with `grid-template-columns` deletes the fight.",
        },
        {
          id: "floats",
          label: "Floats with fixed widths: they have worked for years",
          correct: false,
          feedback:
            "Floats solved this before the layout tools existed, at the price of clearfixes and brittle arithmetic. The two-axis design names its own tool: grid declares the rows and columns the floats were simulating.",
        },
      ],
      remediationAnchor: "UIE-3-LESSON-004",
    },
  ],
};

/** UIE-3 retrieval step: one computation per model. */
export const uie3CheckSeed: CheckSeed = {
  id: "UIE-3-CHK-001",
  label: "Practice check",
  intro: "Four short problems, one per model. Nothing here is graded.",
  questions: [
    {
      id: "UIE-3-CHK-001-Q1",
      category: "semantic_html",
      difficulty: "foundational",
      learningOutcomes: ["UIE-3-LO1"],
      misconceptionTags: [],
      stem: 'A site\'s main navigation is currently `<div class="nav-links">`. Which element says what it is?',
      options: [
        { text: "`<nav>`", correct: true },
        { text: "`<section>`", correct: false },
        { text: "`<menu>`", correct: false },
        { text: "`<header>`", correct: false },
      ],
      correctFeedback:
        "`<nav>` is the landmark assistive tech lists and jumps to. The styling stays identical; the meaning is the upgrade.",
      incorrectFeedback:
        "The element for navigation is `<nav>`: it becomes a landmark that assistive tech can list and jump to. `<header>` may contain it, but the navigation itself has its own name.",
      chip: { label: "HTML is meaning, not looks", anchor: "UIE-3-LESSON-002" },
    },
    {
      id: "UIE-3-CHK-001-Q2",
      category: "css_box_model",
      difficulty: "applied",
      learningOutcomes: ["UIE-3-LO2"],
      misconceptionTags: [],
      stem: "With `box-sizing: border-box`, how wide does this render: `width: 300px; padding: 10px; border: 5px solid;`?",
      options: [
        { text: "300px", correct: true },
        { text: "330px", correct: false },
        { text: "320px", correct: false },
        { text: "270px", correct: false },
      ],
      correctFeedback:
        "`border-box` makes `width` the visible box: padding and border fit inside, and the content shrinks to 270 to make room. The 330 answer belongs to the default model.",
      incorrectFeedback:
        "Under `border-box`, the declared `width` is the rendered width: 300. The padding and border move inside, squeezing the content to 270. 330 is the default-model answer, where extras stack on top.",
      chip: { label: "The box model", anchor: "UIE-3-LESSON-003" },
    },
    {
      id: "UIE-3-CHK-001-Q3",
      category: "css_specificity",
      difficulty: "applied",
      learningOutcomes: ["UIE-3-LO4"],
      misconceptionTags: ["UIE-M-004"],
      stem: "Which selector wins for the same element: `#profile .name` or `.card .header .name`?",
      options: [
        { text: "`#profile .name`: (1,1,0) outranks (0,3,0)", correct: true },
        { text: "`.card .header .name`: three classes beat two parts", correct: false },
        { text: "Whichever comes later in the file", correct: false },
        { text: "Neither: the browser averages them", correct: false },
      ],
      correctFeedback:
        "Ids compare first, and one id outranks any number of classes: (1,1,0) beats (0,3,0) before the class column is even read. Source order only matters at a dead tie.",
      incorrectFeedback:
        "Score them like version numbers: `#profile .name` is (1,1,0), `.card .header .name` is (0,3,0). The id column compares first and 1 beats 0, so the id rule wins from any position in the file.",
      chip: { label: "Specificity: who wins and why", anchor: "UIE-3-LESSON-005" },
    },
    {
      id: "UIE-3-CHK-001-Q4",
      category: "web_accessibility",
      difficulty: "foundational",
      learningOutcomes: ["UIE-3-LO5"],
      misconceptionTags: [],
      stem: "Which pairing gives an input an accessible name that survives typing?",
      options: [
        { text: '`<label for="e">Email</label>` with `<input id="e" />`', correct: true },
        { text: '`<input placeholder="Email" />`', correct: false },
        { text: "`<span>Email</span>` next to the input", correct: false },
        { text: '`<input title="Email" />`', correct: false },
      ],
      correctFeedback:
        "The `for`/`id` pair is the durable link: announced by assistive tech, clickable to focus, and present after the first keystroke erases any placeholder.",
      incorrectFeedback:
        "Placeholders vanish at the first keystroke, an unlinked `<span>` is just nearby text, and `title` is a hover tooltip. The wiring that survives is `<label for>` matched to the input's `id`.",
      chip: { label: "Accessibility rides along", anchor: "UIE-3-LESSON-006" },
    },
  ],
  completion: {
    body: "Four models, four computations. When the answer arrives from the model before the options tempt you, the foundations are doing their job: the graded bank runs the same five families with the clock in your own hands.",
  },
};
