import type { AssessmentSeed } from "@/features/assessment";

/**
 * UIE-3 graded bank, deepened with the lesson: sixteen items over seven
 * families (semantics, box and flow, positioning, layout, responsive,
 * cascade, accessibility). Two fixedDraw habits ride every attempt: the
 * label wiring item (accessibility is not optional polish) and the
 * specificity scoring item (the cascade is computable, not mystical).
 * Inline code carries every snippet; no item needs a block-level example
 * to be answerable.
 */
export const uie3AssessmentSeed: AssessmentSeed = {
  id: "UIE-3-ASM-001",
  intro:
    "Six questions drawn from a sixteen-item bank across the foundations. Pass at 80 percent, retake any time with a different combination.",
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

    {
      id: "UIE-3-QB-011",
      format: "multiple_choice",
      category: "css_box_model",
      difficulty: "applied",
      stem: "Two stacked sections have `margin-bottom: 32px` and `margin-top: 20px`, and the designer measures a 32px gap instead of 52. What is happening?",
      options: [
        {
          text: "Vertical margins in normal flow collapse to the larger of the two",
          correct: true,
        },
        { text: "The browser is rounding the margins down", correct: false },
        { text: "The second rule overrode the first in the cascade", correct: false },
        { text: "Percent-based line height absorbed the difference", correct: false },
      ],
      correctExplanation:
        "Correct. Adjacent vertical margins merge into one gap the size of the larger: 32. Wrapping the stack in a flex or grid parent with `gap`, or spacing in one direction only, makes gaps mean what they say.",
      incorrectExplanation:
        "Not quite. This is margin collapse: touching vertical margins in normal flow merge to the larger value, 32, and no cascade or rounding is involved. Flex and grid children never collapse, which is one reason `gap` reads truer than stacked margins. Review: boxes and flow.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO2"],
      misconceptionTags: ["UIE-M-004"],
    },
    {
      id: "UIE-3-QB-012",
      format: "multiple_choice",
      category: "css_positioning",
      difficulty: "foundational",
      stem: "A tooltip inside a card uses `position: absolute; top: 100%;` but appears at the bottom of the page instead of under the card. What is the fix?",
      options: [
        { text: "Give the card `position: relative` so the tooltip anchors to it", correct: true },
        { text: "Raise the tooltip's `z-index` until it looks right", correct: false },
        { text: "Switch the tooltip to `position: fixed`", correct: false },
        { text: "Move the tooltip element outside the card in the HTML", correct: false },
      ],
      correctExplanation:
        "Correct. Absolute positioning anchors to the nearest positioned ancestor, and without one the search walks up to the page itself. `position: relative` on the card, changing nothing visually, is the anchor the tooltip was missing.",
      incorrectExplanation:
        "Not quite. The tooltip is not mislayered, it is mis-anchored: `absolute` positions against the nearest positioned ancestor, and no ancestor qualifies. Give the card `position: relative` and `top: 100%` starts meaning 'below the card'. Review: positioning, layers and the stacking game.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-013",
      format: "multiple_choice",
      category: "css_positioning",
      difficulty: "challenging",
      stem: "A modal has `z-index: 1000` yet renders beneath a toast with `z-index: 3`. The modal's ancestor has `transform: scale(1)`. Why does the toast win?",
      options: [
        {
          text: "The transform created a stacking context, so the modal's 1000 competes only inside it",
          correct: true,
        },
        { text: "The toast's later source position breaks the tie", correct: false },
        { text: "`z-index` values above 999 are clamped by browsers", correct: false },
        { text: "Toasts render in a privileged browser layer", correct: false },
      ],
      correctExplanation:
        "Correct. Any transform, even a no-op `scale(1)`, creates a stacking context. The modal's 1000 ranks it among siblings inside that context, while the context itself stacks at its ancestor's level against the toast's 3, and loses. Remove the transform or portal the modal out.",
      incorrectExplanation:
        "Not quite. Nothing clamps z-index and no element is privileged: the no-op `transform` created a stacking context, capping the modal's 1000 inside it while the ancestor competes at its own level against the toast. The mechanism, not the numbers, decides. Review: positioning, layers and the stacking game.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO3"],
      misconceptionTags: ["UIE-M-004"],
    },
    {
      id: "UIE-3-QB-014",
      format: "multiple_choice",
      category: "css_layout",
      difficulty: "applied",
      stem: "An app frame is `display: flex`. The sidebar must hold exactly 240px while the content area takes everything else. Which pair does it?",
      options: [
        { text: "Sidebar `flex: 0 0 240px`, content `flex: 1`", correct: true },
        { text: "Sidebar `width: 240px`, content `width: 100%`", correct: false },
        { text: "Sidebar `flex: 240`, content `flex: 1`", correct: false },
        { text: "Sidebar `flex-basis: 240px`, content `margin-left: 240px`", correct: false },
      ],
      correctExplanation:
        "Correct. `flex: 0 0 240px` exempts the sidebar from growing and shrinking at a fixed basis, and `flex: 1` lets the content claim all spare space. The shorthand states the whole contract in two declarations.",
      incorrectExplanation:
        "Not quite. `width: 100%` on a flex child invites overflow because it ignores the sibling, `flex: 240` makes the sidebar grow 240 times faster rather than sit at 240px, and pairing a basis with a margin double-books the same 240 pixels. The contract is `flex: 0 0 240px` beside `flex: 1`. Review: flexbox, one axis distributed.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO3"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-015",
      format: "multiple_choice",
      category: "responsive_design",
      difficulty: "foundational",
      stem: "A stylesheet is written mobile-first. Which shape do its media queries take?",
      options: [
        {
          text: "`@media (min-width: ...)` blocks that add enhancements for wider screens",
          correct: true,
        },
        {
          text: "`@media (max-width: ...)` blocks that strip features away for phones",
          correct: false,
        },
        { text: "One `@media` block per device brand", correct: false },
        { text: "No media queries: mobile-first means mobile-only", correct: false },
      ],
      correctExplanation:
        "Correct. The base styles serve the smallest screen, and `min-width` queries layer on columns, grids and larger type as room appears. Nothing ever needs undoing, which is the architecture's whole advantage.",
      incorrectExplanation:
        "Not quite. Mobile-first writes the constrained layout as the default and adds upward with `min-width` queries. `max-width` stacks describe desktop-first, subtracting features from an assumed large screen, and device-brand queries chase hardware instead of describing the design's own breakpoints. Review: smallest screen first.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO4"],
      misconceptionTags: [],
    },
    {
      id: "UIE-3-QB-016",
      format: "multiple_choice",
      category: "responsive_design",
      difficulty: "applied",
      stem: "A reader raises their browser's base font size from 16px to 20px. Which body-text declaration honours that change?",
      options: [
        { text: "`font-size: 1rem`, now rendering at 20px", correct: true },
        { text: "`font-size: 16px`, staying at 16px", correct: false },
        { text: "`font-size: 4vw`, tracking the window width", correct: false },
        { text: "`font-size: larger` on every paragraph", correct: false },
      ],
      correctExplanation:
        "Correct. `rem` multiplies the root size the reader chose, so their 20px setting becomes the page's 20px reality. Pixels freeze the old value, and viewport units answer to the window rather than the person.",
      incorrectExplanation:
        "Not quite. The unit that listens to the reader's setting is `rem`: 1rem renders 20px the moment they ask for 20. Fixed pixels overrule the setting, `vw` follows the window instead of the person, and relative keywords compound unpredictably through nesting. Review: units that respect people.",
      fixedDraw: false,
      rotateOptions: true,
      learningOutcomes: ["UIE-3-LO4"],
      misconceptionTags: [],
    },
  ],
};
