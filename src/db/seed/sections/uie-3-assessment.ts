import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-3 graded bank: ten items over the five web-foundations families, two per
 * family, difficulty at the blueprint mix (four foundational, five applied,
 * one challenging). Two fixedDraw habits ride every attempt: the label wiring
 * item (accessibility is not optional polish) and the specificity scoring
 * item (the cascade is computable, not mystical). Inline code carries every
 * snippet; no item needs a block-level example to be answerable.
 */
export const uie3AssessmentSeed: AssessmentSeed = {
  id: "UIE-3-ASM-001",
  intro:
    "Six questions drawn from a ten-item bank across the five foundations. Pass at 80 percent, retake any time with a different combination.",
  questions: [
    {
      id: "UIE-3-QB-001",
      format: "multiple_choice",
      category: "semantic_html",
      difficulty: "foundational",
      stem: "A card's whole surface opens the article it previews. Which element wraps the card's title text?",
      options: [
        {
          text: "An `<a>` with the article's address: activation that navigates is a link",
          correct: true,
        },
        { text: "A `<button>` with a click handler that changes `location`", correct: false },
        {
          text: "A `<div>` with `onclick`, since the whole card is clickable anyway",
          correct: false,
        },
        { text: "A `<span>` styled with an underline", correct: false },
      ],
      correctExplanation:
        "Correct. Navigation is what `<a>` means: it gets open-in-new-tab, copy address, and a correct announcement for free. Buttons perform actions; links go places, and this card goes somewhere.",
      incorrectExplanation:
        "Not quite. The decision rule: activation that navigates is an `<a>`; activation that performs an action is a `<button>`; a `<div>` is neither and announces as nothing. Opening an article is navigation, so the link element carries it. Review: HTML is meaning, not looks.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO1"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-002",
      format: "multiple_choice",
      category: "semantic_html",
      difficulty: "applied",
      stem: "A page renders `<h1>` then `<h3>` with no `<h2>`, and a teammate argues nothing is broken because it looks right. What is the strongest review response?",
      options: [
        {
          text: "The outline now lies to heading navigation; fix the levels, restyle if the size was the goal",
          correct: true,
        },
        { text: "Approve it: heading levels are visual choices", correct: false },
        { text: "Ask for an `<h2>` styled invisibly to fill the gap", correct: false },
        { text: "Convert both headings to styled `<div>`s to avoid the rule", correct: false },
      ],
      correctExplanation:
        "Correct. Levels are structure and CSS is appearance: pick the level the outline needs, then style it to the design. The skipped level only costs people who navigate by structure, which is why it survives visual review.",
      incorrectExplanation:
        "Not quite. Heading levels build the outline assistive tech navigates; the font size is a separate, styleable fact. An invisible filler heading adds noise, and `<div>`s delete the outline entirely. Fix the level, keep the look. Review: HTML is meaning, not looks.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO1"],
      misconceptionTags: [],
    },

    {
      id: "UIE-3-QB-003",
      format: "multiple_choice",
      category: "css_box_model",
      difficulty: "foundational",
      stem: "Under the default `box-sizing`, what is the rendered width of `width: 250px; padding: 15px; border: 3px solid; margin: 20px;`?",
      options: [
        { text: "286px, with the margin outside the box", correct: true },
        { text: "250px: `width` means the visible box", correct: false },
        { text: "326px: the margin counts too", correct: false },
        { text: "268px: one side of padding and border", correct: false },
      ],
      correctExplanation:
        "Correct. 250 of content plus both sides of padding (30) plus both sides of border (6): 286. The margin spaces neighbours; it is never part of the box's own size.",
      incorrectExplanation:
        "Not quite. Default sizing stacks both sides of padding and border on the content width: 250 + 30 + 6 = 286. Margin stays outside the box, and 250 would be the `border-box` reading. Review: the box model.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO2"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-004",
      format: "multiple_choice",
      category: "css_box_model",
      difficulty: "applied",
      stem: "A stylesheet begins `* { box-sizing: border-box; }`. What does `width: 100%` with `padding: 24px` now do to a child of a 400px parent?",
      options: [
        { text: "Renders exactly 400px wide, content squeezed to 352", correct: true },
        { text: "Overflows to 448px: padding still adds on", correct: false },
        { text: "Renders 400px but the padding is ignored", correct: false },
        { text: "Renders 352px to leave room for the padding", correct: false },
      ],
      correctExplanation:
        "Correct. `border-box` makes 100 percent mean the visible box: 400. The padding moves inside, leaving 352 for content, and the classic 100-percent-plus-padding overflow disappears, which is why the global rule is so common.",
      incorrectExplanation:
        "Not quite. Under `border-box`, the declared width is the rendered width: 400, with the padding absorbed inside and content at 352. The overflow-to-448 behaviour belongs to the default model, and padding is never ignored. Review: the box model.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO2"],
      misconceptionTags: [],
    },

    {
      id: "UIE-3-QB-005",
      format: "multiple_choice",
      category: "css_layout",
      difficulty: "foundational",
      stem: "A toolbar needs its buttons in one row: first group left, one button pushed to the far right. Which is the idiomatic flexbox answer?",
      options: [
        {
          text: "`display: flex` on the toolbar and `margin-left: auto` on the last button",
          correct: true,
        },
        { text: "`float: right` on the last button", correct: false },
        { text: "`position: absolute; right: 0` on the last button", correct: false },
        { text: "`justify-content: flex-end` on the toolbar", correct: false },
      ],
      correctExplanation:
        "Correct. Inside a flex row, an auto margin absorbs all free space on that side, shoving the button to the far edge while the rest keep their flow. Floats and absolute positioning both take the button out of the toolbar's layout conversation.",
      incorrectExplanation:
        "Not quite. `justify-content: flex-end` moves the whole row right, floats predate flex and fight it, and absolute positioning stops the button reserving space at all. The flex idiom is `margin-left: auto` on the item that should break away. Review: flexbox for one axis.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-006",
      format: "multiple_choice",
      category: "css_layout",
      difficulty: "applied",
      stem: "Which layout genuinely needs grid rather than flexbox?",
      options: [
        {
          text: "A calendar month: fixed columns for weekdays, rows aligning by week",
          correct: true,
        },
        { text: "A horizontal row of tags that wraps when full", correct: false },
        { text: "A vertical stack of settings rows", correct: false },
        { text: "A navbar with links left and an avatar right", correct: false },
      ],
      correctExplanation:
        "Correct. A calendar's columns and rows must align in both directions at once: that is two-axis placement, grid's defining job. The other three are single-axis distributions that flexbox states in a line or two.",
      incorrectExplanation:
        "Not quite. Wrapping tags, stacks and navbars each distribute along one axis, which is flexbox's territory. The calendar is the one whose rows and columns must agree in both directions simultaneously, and declaring that is what `grid-template-columns` is for. Review: flexbox for one axis, grid for two.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO3"],
      misconceptionTags: [],
    },

    {
      id: "UIE-3-QB-007",
      format: "multiple_choice",
      category: "css_specificity",
      difficulty: "applied",
      stem: "Four rules target the same paragraph. Which one wins: `p` (last in the file), `.note` , `#intro`, or `p.note` ?",
      options: [
        { text: "`#intro`: (1,0,0) outranks every classful score", correct: true },
        { text: "`p`, because it comes last", correct: false },
        { text: "`p.note`: it is the most descriptive", correct: false },
        { text: "`.note`: classes always beat ids", correct: false },
      ],
      correctExplanation:
        "Correct. Score them: `#intro` (1,0,0), `p.note` (0,1,1), `.note` (0,1,0), `p` (0,0,1). The id column compares first and only one rule scores there. Source order never gets a vote until scores tie exactly.",
      incorrectExplanation:
        "Not quite. Specificity is a scored contest, compared column by column: ids, then classes, then elements. `#intro` scores (1,0,0) and wins before the class column is read; last-in-file only matters between rules with identical scores. Review: specificity, who wins and why.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO4"],
      misconceptionTags: ["UIE-M-004"],
    },
    {
      id: "UIE-3-QB-008",
      format: "multiple_choice",
      category: "css_specificity",
      difficulty: "challenging",
      stem: "A component library styles with flat single classes. An app stylesheet must adjust one instance without editing the library or using `!important`. Which approach respects the cascade?",
      options: [
        {
          text: "A single class on the instance, loaded after the library: equal score, later source wins",
          correct: true,
        },
        { text: "An id selector on the instance to guarantee the win", correct: false },
        { text: "Inline `style` attributes on the instance", correct: false },
        { text: "Copy the library rule and edit the copy in place", correct: false },
      ],
      correctExplanation:
        "Correct. Matching the library's score and winning on source order is the gentlest override: the next adjustment can play the same move. Ids and inline styles win by escalation, and every escalation taxes the override after it.",
      incorrectExplanation:
        "Not quite. The cascade's own tiebreak is the tool: equal specificity, later source wins, so a flat class loaded after the library adjusts cleanly. Ids and inline styles escalate the contest, and editing a copied library rule forks what you meant to reuse. Review: specificity, who wins and why.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO4"],
      misconceptionTags: ["UIE-M-004"],
    },

    {
      id: "UIE-3-QB-009",
      format: "multiple_choice",
      category: "web_accessibility",
      difficulty: "foundational",
      stem: "Which input has an accessible name that a screen reader announces and that survives the user typing?",
      options: [
        { text: '`<label for="q">Search</label><input id="q" />`', correct: true },
        { text: '`<input placeholder="Search" />`', correct: false },
        { text: '`<input title="Search" />`', correct: false },
        { text: "`<b>Search</b> <input />` side by side", correct: false },
      ],
      correctExplanation:
        "Correct. The `for`/`id` wiring is the durable name: announced on focus, clickable to focus the field, and still there after the first keystroke. Everything else on the list evaporates or never reaches assistive tech reliably.",
      incorrectExplanation:
        "Not quite. Placeholders vanish when typing starts, `title` lives in a hover tooltip, and adjacent bold text is just nearby text with no wiring. The name that survives is the `<label for>` matched to the input's `id`. Review: accessibility rides along.",
      fixedDraw: true,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO5"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-010",
      format: "multiple_choice",
      category: "web_accessibility",
      difficulty: "applied",
      stem: "A designer asks for `outline: none` on buttons because the focus ring clashes with the brand. What ships?",
      options: [
        {
          text: "A styled `:focus-visible` ring that fits the brand: restyled, never removed",
          correct: true,
        },
        { text: "The `outline: none`: pointer users never see the ring anyway", correct: false },
        { text: "`outline: none` plus a colour change on focus", correct: false },
        { text: "Keep the default ring and decline the request", correct: false },
      ],
      correctExplanation:
        "Correct. The ring is how keyboard users see where they are; `:focus-visible` even scopes it away from pointer clicks, which is usually what the designer minded. Restyling honours both the brand and the person tabbing through the page.",
      incorrectExplanation:
        "Not quite. Removing the ring blinds keyboard navigation, and a colour-only change fails whoever cannot perceive that colour. The move that satisfies everyone is restyling `:focus-visible` to the brand: visible focus, on the interactions that need it. Review: accessibility rides along.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO5"],
      misconceptionTags: [],
    },
  ],
};
