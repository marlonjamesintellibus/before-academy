import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-3: HTML & CSS Foundations, the first code-bearing module (readiness
 * deck: "HTML & CSS foundations: core concepts and best practices").
 *
 * Second, deepened edition (education-lead direction: this guides people
 * toward being working UI engineers, not toward reciting interview answers).
 * Eight models instead of five: semantics, the box and flow, positioning and
 * stacking, flexbox's distribution, grid's tracks, responsive units,
 * the cascade with inheritance and custom properties, and the accessibility
 * habits that ride along with each.
 *
 * First consumer of the code content model: RichText `code` nodes render as
 * highlighted, copyable blocks, and backtick spans carry inline code through
 * stems, options and feedback. Every example stays inside the lint's
 * line-length rule so a phone never scrolls sideways to learn.
 */
export const uie3Seed: SectionSeed = {
  pathway: {
    slug: "ui-engineer-readiness",
    title: "UI Engineer Readiness",
    description:
      "Preparation for UI engineering evaluations: build the reasoning routine first, then apply it to HTML, CSS, JavaScript and React.",
  },
  section: {
    slug: "html-css-foundations",
    title: "HTML & CSS Foundations",
    description:
      "The eight models working UI engineers lean on daily: semantic structure, boxes and flow, positioning, flexbox, grid, responsive units, the cascade, and the accessibility habits that ride along with all of them.",
    position: 3,
  },
  blocks: [
    {
      type: "hook",
      id: "UIE-3-LESSON-001-HOOK",
      prompt:
        "Two buttons look identical on screen: one is a `<button>`, the other a `<div>` with a click handler and button styling. What does the `<button>` give you that the `<div>` does not?",
      choices: [
        "Nothing: they behave the same once styled",
        "Keyboard focus, Enter and Space activation, and a correct announcement to assistive tech",
        "It renders faster",
      ],
      reveal:
        "The second: a real `<button>` is focusable, activates from the keyboard, and announces itself as a button to a screen reader, all for free. The `<div>` needs every one of those rebuilt by hand, and interviews probe this because it separates knowing what elements look like from knowing what they mean.",
    },
    {
      type: "why_it_matters",
      id: "UIE-3-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "HTML and CSS look memorisable, which is the trap: the property list is endless and the models underneath are few. A working UI engineer runs on the models: what markup means, how boxes get sized and stacked, how layout distributes space, how a design adapts to the screen it lands on, and which rule wins when two disagree. Own the eight models in this section and unfamiliar properties become look-ups; skip them and every layout bug is an afternoon.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-3-LESSON-001-OBJ",
      items: [
        "Choose elements for what they mean and keep the document navigable by structure",
        "Compute rendered sizes and predict flow: box model, display types, margin collapse",
        "Lay out with intent: positioned layers, flexbox's axes and shorthand, grid's tracks",
        "Build mobile-first, in units that respect user settings",
        "Predict the winning rule with specificity, inheritance and custom properties",
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-002",
      title: "HTML is meaning, not looks",
      objective: "Choose elements for what they are, and let the browser do the rest.",
      minutes: 4,
      completion:
        "You can name the semantic element for a given job and say what choosing it buys.",
      quick: [
        {
          type: "p",
          text: "Every element carries a meaning, and the browser, search engines and assistive tech all act on it. Two pages can render identically and be completely different documents underneath:",
        },
        {
          type: "code",
          language: "html",
          label: "the same page, twice",
          code: '<!-- says nothing -->\n<div class="top"><div class="links">...</div></div>\n<div class="content">...</div>\n\n<!-- says what it is -->\n<header><nav>...</nav></header>\n<main>...</main>',
        },
        {
          type: "p",
          text: "The second version gives keyboard users landmarks to jump between, gives a screen reader an outline to announce, and costs nothing extra. The habit interviews look for: `<div>` and `<span>` are the last resort, chosen when no element with meaning fits.",
        },
        {
          type: "ul",
          items: [
            "Navigation is `<nav>`, standalone content is `<article>`, page regions are `<header>`, `<main>`, `<footer>`",
            "Headings are an outline, not a font size: `h1` to `h6` in order, no levels skipped",
            "Anything clickable that performs an action is a `<button>`; anything that navigates is an `<a>`",
            "Forms group related fields with `<fieldset>` and name the group with `<legend>`",
            "If a `<div>` has a click handler, that is usually a `<button>` wearing a costume",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The heading rule has a practical face: assistive tech users navigate by headings the way sighted users scan. A page that jumps from `h1` to `h3` reads like a report with a missing chapter: everything still renders, and the structure quietly lies.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-002-CHECK",
      prompt: "A page's headings run `h1`, then `h3`, with no `h2`. What is the practical effect?",
      correctOptionId: "outline",
      options: [
        {
          id: "outline",
          text: "The document outline has a hole: heading navigation skips a level that should exist",
          feedback:
            "Correct. Nothing breaks visually, which is exactly why it survives review. The outline is a contract with people who navigate by structure, and a skipped level is a missing rung in their ladder.",
        },
        {
          id: "refuses",
          text: "The browser refuses to render the `h3` until an `h2` appears",
          feedback:
            "Browsers render almost anything: HTML is forgiving by design, which is why structural mistakes survive. The cost lands on the outline that assistive tech builds, not on the pixels.",
        },
        {
          id: "styling",
          text: "Nothing: heading tags are only styling hooks",
          feedback:
            "If headings were only styling, `<div class='big-text'>` would be their equal. They are the document's outline, and the outline is what screen reader users navigate by. Meaning first, looks second.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-003",
      title: "Boxes and flow: sizes you can compute",
      objective: "Compute rendered size, predict display behaviour, and expect margin collapse.",
      minutes: 5,
      completion:
        "You can compute box sizes under both sizing models, place display types, and explain a collapsed margin.",
      quick: [
        {
          type: "p",
          text: "Every element is a rectangle of content wrapped in padding, then border, then margin. The classic probe: what width does this card render at?",
        },
        {
          type: "code",
          language: "css",
          code: ".card {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid;\n  margin: 16px;\n}",
        },
        {
          type: "p",
          text: "By default, `width` sets only the content, so the visible box is 200 plus 40 of padding plus 4 of border: 244 pixels. Setting `box-sizing: border-box` changes the question: `width` then means the visible box and the content shrinks to fit, which is why most codebases set it globally.",
        },
        {
          type: "p",
          text: "Boxes then enter flow, and flow has two behaviours worth owning. Display: `block` elements stack and take the full line, `inline` elements sit in the text and ignore `width` and `height` entirely, and `inline-block` sits in the text while keeping its box properties. And vertical margins between stacked blocks collapse: two touching margins of 24 and 16 produce one gap of 24, the larger, not 40. The classic surprise is a child's top margin collapsing through its parent and moving the parent instead.",
        },
        {
          type: "ul",
          items: [
            "Content, padding, border, margin, inside out; margin is never part of the box's own size",
            "Default sizing: `width` is content only. `border-box`: `width` is the visible box",
            "`inline` ignores `width`, `height` and vertical margins; `inline-block` respects them",
            "Adjacent vertical margins collapse to the larger; padding or a border stops the collapse",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Margin collapse is why experienced stylesheets space stacks in one direction, `margin-top` or `margin-bottom` but not both, or hand the spacing to a parent's `gap`. The rule only applies to vertical margins in normal flow: flex and grid children never collapse, which is one more quiet argument for laying out with them.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-003-CHECK",
      prompt:
        "Two stacked paragraphs have `margin-bottom: 24px` and `margin-top: 16px`. How far apart do they sit?",
      correctOptionId: "twentyfour",
      options: [
        {
          id: "twentyfour",
          text: "24px: the margins collapse to the larger",
          feedback:
            "Correct. Adjacent vertical margins in normal flow merge into one gap the size of the larger. The 16 disappears into the 24, which is why doubling up spacing directions produces gaps that refuse to add up.",
        },
        {
          id: "forty",
          text: "40px: the margins add",
          feedback:
            "Horizontal margins add; vertical margins between stacked blocks collapse to the larger: 24. Flex and grid children are the exception, where nothing collapses and `gap` says what it means.",
        },
        {
          id: "sixteen",
          text: "16px: the later rule wins",
          feedback:
            "Margin collapse is not the cascade: no rule beats another. Both margins exist, and the gap between the blocks becomes the larger of the two, 24. Later-wins applies to conflicting declarations on one element, not to two elements' margins.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-004",
      title: "Positioning: layers and the stacking game",
      objective: "Take elements out of flow deliberately, and win the z-index argument on paper.",
      minutes: 5,
      completion:
        "You can pick the right position value, anchor an absolute child, and diagnose a losing z-index.",
      quick: [
        {
          type: "p",
          text: "Normal flow handles most of a page. Positioning exists for the pieces that float above it: tooltips, dropdowns, sticky headers, modals. Each value answers one question, where does this element anchor:",
        },
        {
          type: "code",
          language: "css",
          label: "the tooltip pattern",
          code: ".card {\n  position: relative; /* the anchor */\n}\n.card .tooltip {\n  position: absolute;\n  top: 100%;\n  left: 0;\n}",
        },
        {
          type: "p",
          text: "`absolute` anchors to the nearest positioned ancestor, and that is the fact doing all the work: without `position: relative` on the card, the tooltip anchors to the page and drifts. `relative` nudges an element while keeping its space, `fixed` anchors to the viewport, and `sticky` behaves normally until its scroll threshold, then pins, provided no ancestor clips overflow.",
        },
        {
          type: "p",
          text: "Stacking is the second half of the game. `z-index` only applies to positioned elements, and it competes inside its stacking context, not globally. An ancestor with `opacity` below 1, a `transform`, or its own z-index creates a new context, and no child value, however large, escapes it. The famous unbeatable `z-index: 9999` almost always sits inside a context that loses to a sibling context.",
        },
        {
          type: "ul",
          items: [
            "`absolute` anchors to the nearest positioned ancestor: give the parent `position: relative`",
            "`sticky` needs a scroll threshold like `top: 0`, and an ancestor with `overflow` clipping defeats it",
            "`z-index` competes within its stacking context; `opacity`, `transform` and friends create new ones",
            "Fewer layers, lower numbers: a stylesheet full of large z-indexes is a stacking-context mystery",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The full trigger list for stacking contexts is longer than transform and opacity: `filter`, `will-change`, `isolation: isolate`, `position: fixed`, and a positioned element with any z-index all create one. `isolation: isolate` is the deliberate version: it fences a component's internal layers so no inner z-index can escape and fight the page.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "The platform now offers an exit from the stacking game entirely: the top layer. A `<dialog>` opened with `showModal()` and elements using the popover attribute render above every stacking context on the page, with no z-index at all. This is why modern modals reach for `<dialog>` where older codebases portalled DOM nodes to the end of `<body>`: the browser now owns the layer that always wins.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-004-CHECK",
      prompt:
        "A dropdown has `z-index: 9999` yet renders under a sibling card with `z-index: 2`. What is the likeliest cause?",
      correctOptionId: "context",
      options: [
        {
          id: "context",
          text: "An ancestor of the dropdown creates a stacking context that loses to the card's",
          feedback:
            "Correct. The 9999 competes inside its own context, and the whole context stacks against the sibling as one unit at its ancestor's level. Find the ancestor with `transform`, `opacity` or its own z-index, and fix the contest there.",
        },
        {
          id: "bigger",
          text: "The card's z-index is being raised elsewhere; go higher than 9999",
          feedback:
            "If numbers alone decided, 9999 would already have won. When a huge z-index loses to a tiny one, the contest is between ancestor contexts, and raising the child's number cannot move its ancestor. The fix lives at the ancestor level.",
        },
        {
          id: "order",
          text: "Source order: the card comes later in the HTML",
          feedback:
            "Source order only breaks ties between elements at the same stacked level. A 2 beating a 9999 is the signature of separate stacking contexts, where the ancestors compete and the children's numbers never meet.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-005",
      title: "Flexbox: one axis, distributed",
      objective: "Own the axes, and the grow-shrink-basis shorthand that does the real work.",
      minutes: 5,
      completion:
        "You can centre on both axes, and predict what `flex: 1` does to a row's spare space.",
      quick: [
        {
          type: "p",
          text: "Flexbox distributes space along one axis: a row of buttons, a column of cards. The centring question has a two-line answer worth owning, and the axis distinction underneath it:",
        },
        {
          type: "code",
          language: "css",
          code: ".parent {\n  display: flex;\n  justify-content: center; /* main axis */\n  align-items: center; /* cross axis */\n}",
        },
        {
          type: "p",
          text: "`justify-content` distributes along the main axis and `align-items` along the cross axis, and which is horizontal depends on `flex-direction`. Change the direction and the two properties swap their visible effect.",
        },
        {
          type: "p",
          text: "The working-engineer half is the `flex` shorthand: grow, shrink, basis. `flex: 1` means grow to claim an equal share of spare space, shrink when tight, start from zero basis. The classic app frame is one line each:",
        },
        {
          type: "code",
          language: "css",
          label: "sidebar and content",
          code: ".sidebar {\n  flex: 0 0 240px; /* never grow, never shrink, 240 wide */\n}\n.content {\n  flex: 1; /* claim the rest */\n}",
        },
        {
          type: "ul",
          items: [
            "`justify-content` works the main axis, `align-items` the cross axis; `flex-direction` rotates both",
            "`flex: 1` is grow 1, shrink 1, basis 0: equal shares of the container",
            "`flex: 0 0 240px` is a fixed panel: exempt from growing and shrinking",
            "`gap` spaces flex children without margin arithmetic, and their margins never collapse",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Two companions finish the flexbox model. `flex-wrap: wrap` turns one line into many, and once there are multiple lines, `align-content` distributes the lines themselves, a property that visibly does nothing until wrapping starts. And truncation inside flex needs `min-width: 0` on the shrinking child, because the default minimum refuses to compress below the content, which is why long unbroken text blows out flex rows.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-005-CHECK",
      prompt:
        "A flex row holds two children: `flex: 2` and `flex: 1`. The container has 300px of spare space. Who gets what?",
      correctOptionId: "twothirds",
      options: [
        {
          id: "twothirds",
          text: "200px and 100px: spare space divides by grow factors",
          feedback:
            "Correct. Grow factors are shares: 2 and 1 make three shares of the 300, so 200 and 100. With basis 0 the shares apply to the whole width, which is why `flex: 2` reads as 'twice the room of a `flex: 1` sibling'.",
        },
        {
          id: "double-width",
          text: "The first child renders at exactly twice the second's total width, whatever the content",
          feedback:
            "Close, and true here because `flex: 1` and `flex: 2` zero the basis. With a non-zero basis the factors divide only the spare space on top of each basis, so the totals stop being a clean ratio. The precise rule: grow factors share the spare.",
        },
        {
          id: "first-takes-all",
          text: "The higher factor claims all 300px",
          feedback:
            "Grow factors are proportional shares, not a contest with one winner: 2 against 1 splits the spare space 200 to 100. A child only takes everything when the others have `flex-grow: 0`.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-006",
      title: "Grid: two axes, declared",
      objective:
        "Declare tracks with fr and minmax, and let auto-fit do the responsive arithmetic.",
      minutes: 4,
      completion:
        "You can write a track list for a real layout and build a wrapping gallery with no media query.",
      quick: [
        {
          type: "p",
          text: "Grid places items on rows and columns at once: dashboards, calendars, photo walls. You declare the tracks and the browser does the distribution:",
        },
        {
          type: "code",
          language: "css",
          code: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
        },
        {
          type: "p",
          text: "That one declaration is a responsive gallery: `minmax(200px, 1fr)` says columns never shrink below 200 and share the surplus equally, and `auto-fit` fits as many such columns as the width allows, re-flowing as the container resizes. No media query, no breakpoint arithmetic, no JavaScript.",
        },
        {
          type: "ul",
          items: [
            "`fr` shares remaining space the way flex-grow shares spare: `1fr 2fr` is one third, two thirds",
            "`repeat(3, 1fr)` declares three equal columns; `gap` spaces both axes",
            "`minmax(min, max)` bounds a track; with `auto-fit` it becomes wrap-without-breakpoints",
            "Choosing: one axis of distribution is flexbox; rows and columns that must agree is grid",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "A subtle companion: grid and flex children default to `min-width: auto`, so long unbreakable content can refuse to shrink and blow out a track. The idiom `minmax(0, 1fr)` in track lists, or `min-width: 0` on a flex child, is the working engineer's fix for the column that will not compress.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-006-CHECK",
      prompt:
        "A gallery uses `repeat(auto-fit, minmax(200px, 1fr))`. The container narrows from 900px to 500px. What happens?",
      correctOptionId: "fewer",
      options: [
        {
          id: "fewer",
          text: "Fewer columns fit, so items re-flow into more rows, each column at least 200px",
          feedback:
            "Correct. Four 200px columns no longer fit at 500, so the grid re-declares itself with two, and the 1fr maximum shares the spare width. The responsiveness is in the track definition, with no breakpoint anywhere.",
        },
        {
          id: "shrink",
          text: "The columns shrink below 200px to keep their count",
          feedback:
            "The `minmax` floor forbids exactly that: 200px is the minimum a column will accept. What gives way is the count, `auto-fit` refitting fewer columns and wrapping the rest into new rows.",
        },
        {
          id: "overflow",
          text: "The grid overflows horizontally until a media query intervenes",
          feedback:
            "There is no media query to wait for: the track list itself is the responsive rule. `auto-fit` recounts the columns that satisfy the 200px floor and the layout re-flows, which is the point of declaring tracks instead of breakpoints.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-007",
      title: "Responsive: smallest screen first, units that respect people",
      objective: "Layer styles mobile-first and pick units that follow the user's settings.",
      minutes: 5,
      completion:
        "You can structure a mobile-first stylesheet and justify rem over px where it matters.",
      quick: [
        {
          type: "p",
          text: "Responsive design is a stylesheet architecture, not a pile of breakpoints. Mobile-first means the base styles serve the smallest screen and `min-width` queries layer enhancements upward, so the default path is the constrained one and nothing needs undoing:",
        },
        {
          type: "code",
          language: "css",
          label: "mobile-first layering",
          code: ".layout {\n  display: block; /* small screens: one column */\n}\n@media (min-width: 48rem) {\n  .layout {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n  }\n}",
        },
        {
          type: "p",
          text: "Units decide who your design respects. `px` is fixed: it ignores the reader who raised their base font size. `rem` scales from the root font size, so text and the spacing around it follow the user's setting. `em` scales from the current element, compounding through nesting, useful and occasionally surprising. Percentages follow the parent, and `vw`/`vh` follow the viewport.",
        },
        {
          type: "ul",
          items: [
            "Base styles are the mobile styles; `min-width` queries add, never undo",
            "Type and spacing in `rem`: the design follows the user's font-size setting",
            "`px` for hairlines and borders, where scaling has nothing to protect",
            "Images and media: `max-width: 100%` so nothing escapes its container",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Writing breakpoints in `rem`, like the `48rem` above, keeps even the layout switch respectful: a user with a larger base font size reaches the roomier layout sooner, which is usually what their setting was asking for.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Two modern tools push past breakpoints. `clamp(1rem, 0.8rem + 1vw, 1.5rem)` declares fluid type: a floor, a scaling middle and a ceiling in one declaration, no queries. And container queries, `@container`, let a component respond to the space its parent gives it rather than to the viewport, which is what component libraries always needed: the card decides its own layout in a sidebar versus a main column, wherever the page puts it.",
          },
        ],
      },
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-007-CHECK",
      prompt:
        "A reader sets their browser's base font size to 20px. Which declaration respects that choice?",
      correctOptionId: "rem",
      options: [
        {
          id: "rem",
          text: "`font-size: 1.25rem`: it scales from the root, rendering 25px for this reader",
          feedback:
            "Correct. `rem` multiplies the root size the user chose: 1.25 × 20 = 25px here, 20px for defaults. The design breathes with the setting instead of overruling it, which is the accessibility case for rem type.",
        },
        {
          id: "px",
          text: "`font-size: 20px`: it matches their chosen number",
          feedback:
            "It matches today's number and ignores the choice itself: set the base to 24 and the pixel value stays 20, overruling the reader. Fixed pixels freeze one person's comfort into everyone's page.",
        },
        {
          id: "vw",
          text: "`font-size: 2vw`: it adapts to their screen",
          feedback:
            "Viewport units track the window, not the person: a narrow window shrinks the text regardless of what the reader asked for, and font settings change nothing. The unit that listens to the setting is `rem`.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-008",
      title: "The cascade: specificity, inheritance, custom properties",
      objective:
        "Predict the winning rule on paper, and know which properties travel down the tree.",
      minutes: 5,
      completion:
        "You can score selectors, say what inherits, and thread a design token through custom properties.",
      quick: [
        {
          type: "p",
          text: "When two rules target one element, the more specific selector wins; equal specificity falls to whichever comes last. Score a selector as three counts: ids, then classes and attributes and pseudo-classes, then elements. Compare left to right, like a version number.",
        },
        {
          type: "code",
          language: "css",
          label: "which color renders?",
          code: "#menu a {\n  color: navy; /* (1,0,1) */\n}\n.nav .active {\n  color: red; /* (0,2,0) */\n}",
        },
        {
          type: "p",
          text: "Navy wins: one id outranks any number of classes, which is also the argument against ids and `!important` in everyday styling. Every escalation forces the next override to escalate further.",
        },
        {
          type: "p",
          text: "Two companions complete the model. Inheritance: text properties like `color` and `font-family` flow down the tree until something overrides them, while box properties like `padding` and `border` never do, which is why setting a font once works and setting a border once does not. And custom properties ride inheritance by design: declare `--accent` high in the tree, read it anywhere below with `var()`, override it per subtree for theming:",
        },
        {
          type: "code",
          language: "css",
          code: ":root {\n  --accent: #0057ea;\n}\n.button {\n  background: var(--accent);\n}\n.danger-zone {\n  --accent: #b3261e; /* every button inside goes red */\n}",
        },
        {
          type: "ul",
          items: [
            "Score (ids, classes, elements); compare left to right; ties fall to source order",
            "Text properties inherit; box properties do not",
            "Custom properties inherit like text and cascade like any declaration: theming without repetition",
            "`!important` beats them all and starts an arms race: treat it as a debt marker",
          ],
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Two modern selector functions bend the scoring deliberately. `:is()` takes the specificity of its most specific argument, while `:where()` contributes exactly zero, whatever it contains. Libraries write `:where(.btn) svg` so their defaults are beatable by any single class, which is the polite version of the flat-selector discipline.",
          },
        ],
      },
      deeper: {
        label: "Go deeper",
        minutes: 3,
        body: [
          {
            type: "p",
            text: "Cascade layers reorder the contest itself: rules inside `@layer` lose to rules in later layers regardless of specificity, so `@layer reset, library, app` guarantees app styles win over library styles even against higher scores. Design systems increasingly ship inside a named layer for exactly this reason: the consumer's unlayered styles beat them by architecture instead of by escalation.",
          },
        ],
      },
    },
    {
      type: "misconception",
      id: "UIE-3-LESSON-008-MISCONCEPTION",
      misconceptionId: "UIE-M-004",
      claim: "CSS is unpredictable: sometimes rules just do not apply and you add `!important`.",
      correction:
        "Every 'unpredictable' rule lost a specificity contest, a source-order tie, or was never going to apply because the property does not inherit. All three are computable on paper. Score the selectors and the mystery dissolves; reach for `!important` and the next person inherits a rule that can only be beaten by another `!important`.",
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-008-CHECK",
      prompt: "Both rules target the same link: `nav a.active` and `.menu .item a`. Which wins?",
      correctOptionId: "menu",
      options: [
        {
          id: "later",
          text: "Whichever appears later in the stylesheet",
          feedback:
            "Source order only breaks dead ties, and this is not one: `nav a.active` scores (0,1,2) and `.menu .item a` scores (0,2,1). Two classes beat one at the position compared first, so `.menu .item a` wins wherever it sits in the file.",
        },
        {
          id: "menu",
          text: "`.menu .item a`: two classes outrank one class",
          feedback:
            "Correct. (0,2,1) against (0,1,2): the class count decides at the second position and element count never gets a vote. Source order would only matter at a dead-equal score.",
        },
        {
          id: "nav",
          text: "`nav a.active`: it names more of the path",
          feedback:
            "Length is not specificity. Score them: `nav a.active` is (0,1,2), `.menu .item a` is (0,2,1), and two classes beat one at the position that gets compared first between them.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-009",
      title: "Accessibility rides along, or it never arrives",
      objective: "Carry the habits that make the other seven models usable by everyone.",
      minutes: 4,
      completion:
        "You can name the riding habits and attach each to the markup or CSS decision it belongs to.",
      quick: [
        {
          type: "p",
          text: "Accessibility is not a layer applied at the end; it is a property of the choices this lesson already made. Semantic elements gave the page its landmarks and outline, rem gave the reader's font setting its authority. The remaining habits are small and they ride along with everyday markup:",
        },
        {
          type: "code",
          language: "html",
          code: '<label for="email">Email</label>\n<input id="email" type="email" autocomplete="email" />\n\n<img src="chart.png" alt="Sign-ups doubled after the March release" />',
        },
        {
          type: "ul",
          items: [
            "Every input gets a `<label>` whose `for` matches its `id`: placeholder text is not a label",
            'Every meaningful image gets `alt` text that says what the image is for; decorative ones get `alt=""`',
            "Focus must stay visible: style `:focus-visible`, never `outline: none` and walk away",
            "Text needs contrast against its background, and colour alone never carries a meaning",
            "Motion respects `prefers-reduced-motion`: the animation is delivery, never the content",
          ],
        },
        {
          type: "p",
          text: "Evaluations probe these because they are cheap at build time and expensive to retrofit, and because a candidate who ships them by habit needs no policing later. This platform practises the same habits it teaches: the lessons you are reading honour reduced motion and keep focus visible.",
        },
      ],
      explore: {
        label: "Explore further",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "One CSS idiom completes the kit: the visually-hidden pattern, a class that collapses an element to a pixel off-screen while leaving it in the accessibility tree. It carries text that only assistive tech needs, such as a link's fuller context. Its mirror is `aria-hidden`, which removes decorative elements from the tree while leaving them visible. One hides from eyes, the other from readers; mixing them up inverts the audience.",
          },
        ],
      },
    },

    {
      type: "diagram",
      id: "UIE-3-LESSON-009-DIAGRAM",
      title: "From your files to pixels",
      claim: "What the browser does with HTML and CSS, and why some changes cost more than others.",
      altText: "The browser rendering pipeline as five sequential steps",
      longText:
        "The pipeline runs five steps. Parse HTML into the DOM, the tree of elements. Parse CSS into the CSSOM, the tree of rules. Combine them into the render tree of visible, styled boxes. Layout computes every box's size and position, which is the step the box model, flow and layout properties feed. Paint fills in the pixels: colours, borders, shadows. A width change re-runs layout and everything after it; a colour change re-runs only paint, which is why the two edits cost differently.",
      layers: [
        {
          id: "dom",
          label: "Parse HTML",
          description:
            "The markup becomes the DOM: a tree of elements. Semantics live here, which is why they exist whether or not any CSS loads.",
        },
        {
          id: "cssom",
          label: "Parse CSS",
          description:
            "The stylesheets become the CSSOM: every rule with its specificity score, waiting to be matched.",
        },
        {
          id: "render-tree",
          label: "Build the render tree",
          description:
            "DOM and CSSOM combine: visible elements paired with the rules that won their specificity contests, inheritance filled in.",
        },
        {
          id: "layout",
          label: "Layout",
          description:
            "Every box gets its size and position: box-model arithmetic, flow, flex distribution and grid tracks all resolve here.",
        },
        {
          id: "paint",
          label: "Paint",
          description:
            "Pixels get filled: colours, borders, text, shadows. The cheapest step to redo, which is why colour changes feel free.",
        },
      ],
      predict: {
        prompt:
          "Two edits ship together: a link colour swap and a card width change. Which forces the browser to redo layout?",
        options: [
          { text: "The width change", correct: true },
          { text: "The colour swap", correct: false },
          { text: "Both, equally", correct: false },
        ],
        revealLabel: "Trace the pipeline and see where each edit lands:",
      },
    },

    {
      type: "takeaway",
      id: "UIE-3-LESSON-010-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Eight models carry the work: elements mean things, boxes have computable sizes and collapsing margins, positioning anchors layers inside stacking contexts, flexbox distributes one axis while grid declares two, mobile-first units respect the reader, and the cascade is a score plus inheritance you can run on paper. Accessibility rides along with each one. The drills put real markup in front of you until the models answer before the guessing does.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-3-LESSON-010-ACT",
      body: "Eight review calls on real markup and CSS: pick what renders, what wins, or what the accessible version looks like, and the feedback walks the model that decides it.",
    },
    {
      type: "check_cta",
      id: "UIE-3-LESSON-010-CHECK",
      body: "Four short problems across the models. Nothing is graded, and every answer shows the computation, not just the letter.",
    },
    {
      type: "next_step",
      id: "UIE-3-LESSON-010-NEXT",
      body: "JavaScript depth and React hooks practice are the remaining modules of this pathway. The models here are their floor: the DOM that JavaScript manipulates is the tree your markup just built, and the layers React renders into are the ones you just learned to stack.",
    },
  ],
  glossary: [],
};
