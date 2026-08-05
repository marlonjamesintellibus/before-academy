import type { SectionSeed } from "@/features/content/types";

/**
 * UIE-3: HTML & CSS Foundations, the first code-bearing module (readiness
 * deck: "HTML & CSS foundations: core concepts and best practices").
 *
 * First consumer of the code content model: RichText `code` nodes render as
 * highlighted, copyable blocks, and backtick spans carry inline code through
 * stems, options and feedback. Every example is small enough to read on a
 * phone, per the lint's line-length rule.
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
      "The five foundations interviews probe: semantic structure, the box model, flexbox and grid, specificity, and the accessibility habits that ride along with all of them.",
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
          text: "HTML and CSS questions in evaluations are rarely about memorising properties. They probe whether you understand the model underneath: what markup means, how boxes get their size, how layout distributes space, and which rule wins when two disagree. Understand the four models and the individual properties become look-ups; memorise properties without the models and every question is a coin flip.",
        },
      ],
    },
    {
      type: "objectives",
      id: "UIE-3-LESSON-001-OBJ",
      items: [
        "Choose elements for what they mean, reaching for `<div>` last",
        "Compute a rendered box size from width, padding and border",
        "Pick flexbox for one axis and grid for two, and centre things without guessing",
        "Predict which CSS rule wins using specificity, not trial and error",
        "Carry the accessibility habits that make the rest of it usable",
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
      title: "The box model: everything is a rectangle",
      objective: "Compute what size a box actually renders at, before the browser shows you.",
      minutes: 4,
      completion: "You can compute rendered size under both box-sizing models without guessing.",
      quick: [
        {
          type: "p",
          text: "Every element is a rectangle of content wrapped in padding, then border, then margin. The classic interview probe: what width does this card render at?",
        },
        {
          type: "code",
          language: "css",
          code: ".card {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid;\n  margin: 16px;\n}",
        },
        {
          type: "p",
          text: "By default, `width` sets only the content, so the visible box is 200 plus 40 of padding plus 4 of border: 244 pixels, with margin outside pushing neighbours away. Setting `box-sizing: border-box` changes the question: `width` then means the visible box, and the content shrinks to fit inside it, which is why most codebases set it globally and most layout arithmetic gets saner.",
        },
        {
          type: "ul",
          items: [
            "Content, then padding, then border, then margin, inside out",
            "Default sizing: `width` is content only; padding and border add on top",
            "`border-box`: `width` is the visible box; the content absorbs the difference",
            "Margin is spacing between boxes, never part of the box's own size",
          ],
        },
      ],
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-003-CHECK",
      prompt:
        "With the default `box-sizing`, how wide does this render: `width: 300px; padding: 10px; border: 5px solid;`?",
      correctOptionId: "threethirty",
      options: [
        {
          id: "threethirty",
          text: "330px",
          feedback:
            "Correct. 300 of content plus 10 of padding on each side plus 5 of border on each side: 300 + 20 + 10. Under `border-box` the same declaration would render at exactly 300.",
        },
        {
          id: "threehundred",
          text: "300px",
          feedback:
            "300 would be the `border-box` answer. Under the default model, `width` sets the content alone, and both sides of padding and border stack on top: 300 + 20 + 10 = 330.",
        },
        {
          id: "threefifteen",
          text: "315px",
          feedback:
            "This counts one side of the padding and border. Boxes have two of each: left and right. 300 + (10 × 2) + (5 × 2) = 330. Drawing the rectangle catches the single-side slip every time.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-004",
      title: "Layout: flexbox for one axis, grid for two",
      objective: "Pick the right layout tool and centre things deliberately.",
      minutes: 5,
      completion:
        "You can choose between flexbox and grid on sight and centre a child both ways without searching.",
      quick: [
        {
          type: "p",
          text: "Flexbox distributes space along one axis: a row of buttons, a column of cards. Grid places items in two dimensions at once: a dashboard, a photo wall. The interview probe is usually the centring question, and it has a two-line answer worth owning:",
        },
        {
          type: "code",
          language: "css",
          code: ".parent {\n  display: flex;\n  justify-content: center; /* main axis */\n  align-items: center; /* cross axis */\n}",
        },
        {
          type: "p",
          text: "The distinction doing the work: `justify-content` distributes along the main axis and `align-items` along the cross axis, and which is horizontal depends on `flex-direction`. Change the direction and the two properties swap their visible effect, which is the follow-up question interviewers reach for next.",
        },
        {
          type: "ul",
          items: [
            "One axis of distribution: flexbox. Two axes of placement: grid",
            "`justify-content` works the main axis, `align-items` the cross axis",
            "`flex-direction: column` rotates what those two visibly do",
            "Grid rows and columns come from `grid-template-columns`, and `gap` replaces margin juggling in both tools",
          ],
        },
      ],
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-004-CHECK",
      prompt:
        "A flex container has `flex-direction: column` and `justify-content: center`. What does the centring apply to?",
      correctOptionId: "vertical",
      options: [
        {
          id: "vertical",
          text: "Vertical position: the main axis now runs top to bottom",
          feedback:
            "Correct. `justify-content` always works the main axis, and `column` points that axis downward, so the children centre vertically. Horizontal centring now belongs to `align-items`.",
        },
        {
          id: "horizontal",
          text: "Horizontal position, as always",
          feedback:
            "That holds only while the main axis runs horizontally. `flex-direction: column` rotates the axes, and `justify-content` follows the main axis wherever it points: downward here, so vertical.",
        },
        {
          id: "both",
          text: "Both axes at once",
          feedback:
            "One property, one axis: `justify-content` distributes along the main axis only. Centring both ways takes its partner `align-items` on the cross axis, which is what the two-line pattern does.",
        },
      ],
    },

    {
      type: "concept",
      id: "UIE-3-LESSON-005",
      title: "Specificity: who wins and why",
      objective: "Predict the winning rule from the selector, not from trial and error.",
      minutes: 4,
      completion:
        "You can score two selectors and name the winner before the browser breaks the tie.",
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
          text: "Navy wins: one id outranks any number of classes. That is also the argument against reaching for ids and `!important` in everyday styling: every escalation forces the next override to escalate further, and the file becomes an arms race. Flat, class-based selectors keep the cascade predictable.",
        },
        {
          type: "ul",
          items: [
            "Score (ids, classes, elements); compare left to right",
            "One id outranks any number of classes; one class outranks any number of elements",
            "Equal scores: the later rule wins, which is why source order matters",
            "`!important` beats them all and starts an arms race: treat it as a debt marker",
          ],
        },
      ],
    },
    {
      type: "misconception",
      id: "UIE-3-LESSON-005-MISCONCEPTION",
      misconceptionId: "UIE-M-004",
      claim: "CSS is unpredictable: sometimes rules just do not apply and you add `!important`.",
      correction:
        "Every 'unpredictable' rule lost a specificity contest or a source-order tie, and both are computable on paper. Score the selectors and the mystery dissolves; reach for `!important` and the next person inherits a rule that can only be beaten by another `!important`.",
    },
    {
      type: "inline_check",
      id: "UIE-3-LESSON-005-CHECK",
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
      id: "UIE-3-LESSON-006",
      title: "Accessibility rides along, or it never arrives",
      objective: "Carry the four habits that make the rest of the foundations usable.",
      minutes: 4,
      completion:
        "You can name the four riding habits and attach each to the markup or CSS decision it belongs to.",
      quick: [
        {
          type: "p",
          text: "Accessibility is not a layer applied at the end; it is a property of the choices this lesson already made. Semantic elements gave the page its landmarks and outline. The remaining habits are small and they ride along with everyday markup:",
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
          ],
        },
        {
          type: "p",
          text: "Evaluations probe these because they are cheap to do at build time and expensive to retrofit, and because a candidate who ships them by habit needs no policing later.",
        },
      ],
    },

    {
      type: "diagram",
      id: "UIE-3-LESSON-006-DIAGRAM",
      title: "From your files to pixels",
      claim: "What the browser does with HTML and CSS, and why some changes cost more than others.",
      altText: "The browser rendering pipeline as five sequential steps",
      longText:
        "The pipeline runs five steps. Parse HTML into the DOM, the tree of elements. Parse CSS into the CSSOM, the tree of rules. Combine them into the render tree of visible, styled boxes. Layout computes every box's size and position, which is the step the box model and layout properties feed. Paint fills in the pixels: colours, borders, shadows. A width change re-runs layout and everything after it; a colour change re-runs only paint, which is why the two edits cost differently.",
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
            "DOM and CSSOM combine: visible elements paired with the rules that won their specificity contests.",
        },
        {
          id: "layout",
          label: "Layout",
          description:
            "Every box gets its size and position: the box model arithmetic and the flexbox and grid distribution happen here.",
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
      id: "UIE-3-LESSON-007-TAKEAWAY",
      body: [
        {
          type: "p",
          text: "Four models carry the round: elements mean things, boxes are rectangles with computable sizes, flexbox distributes one axis while grid places two, and specificity is a score you can run on paper. Accessibility rides along with each one. The drills put real markup in front of you until the models answer before the guessing does.",
        },
      ],
    },
    {
      type: "activity_cta",
      id: "UIE-3-LESSON-007-ACT",
      body: "Six review calls on real markup and CSS: pick what renders, what wins, or what the accessible version looks like, and the feedback walks the model that decides it.",
    },
    {
      type: "check_cta",
      id: "UIE-3-LESSON-007-CHECK",
      body: "Four short problems, one per model. Nothing is graded, and every answer shows the computation, not just the letter.",
    },
    {
      type: "next_step",
      id: "UIE-3-LESSON-007-NEXT",
      body: "JavaScript depth and React hooks practice are the remaining modules of this pathway. The models here are their floor: the DOM that JavaScript manipulates is the tree your markup just built.",
    },
  ],
  glossary: [],
};
