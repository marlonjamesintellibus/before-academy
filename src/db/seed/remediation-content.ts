import type { RemediationSeed } from "@/features/content/learning-types";

/**
 * Misconception remediation modules (P1-REM), transformed from
 * phase1-content/04-remediation-and-completion/remediation.md.
 *
 * Only the misconceptions the assessment categories route to are included:
 * M1, M2, M3, M4, M5, M7, M8, M9, M10, M11. Claims come from the register in
 * phase1-content/00-content-foundation/misconception-map.md; the categoryMap
 * is derived from each graded item's category and misconception tags in
 * phase1-content/03-assessment (assessment.md and question-bank.md).
 */
export const remediationSeed: RemediationSeed = {
  modules: [
    {
      id: "P1-REM-001",
      misconceptionId: "M1",
      title: "Complex doesn't mean AI",
      claim: "If it's complex or impressive, it must be AI",
      body: [
        "Complexity and intelligence are easy to mix up because marketing blurs them on purpose - and honestly, a system juggling thousands of conditions feels like it must be thinking.",
        "Ask one question instead: could the behaviour be written down as instructions, however many pages it takes? An airline's fare engine prices millions of routes with taxes, fuel surcharges, and stopover rules - dazzling, and every line of it authored. Volume of rules measures effort, not mechanism.",
        "A vending machine the size of a warehouse, with ten thousand buttons, is still a vending machine. Nothing about adding buttons adds judgment.",
      ],
      miniConfirm: {
        prompt:
          "A scheduling tool coordinates 40 time zones and every public holiday. What does that complexity tell you about its mechanism?",
        options: [
          { text: "It must use AI", correct: false },
          {
            text: "Nothing - many written rules are still written rules",
            correct: true,
          },
          { text: "It can't use AI", correct: false },
        ],
        feedbackCorrect:
          'Correct - that\'s the gap closed. Complexity says "big effort," not "learned patterns." Time zones and holidays are exactly what people write down.',
        feedbackIncorrect:
          "Not quite - the clue is what time zones and holidays are: lists. Stored lists and conditions are authored rules at any scale, and scale proves nothing about learning - in either direction.",
      },
    },
    {
      id: "P1-REM-002",
      misconceptionId: "M2",
      title: "Automation isn't AI",
      claim: "Automation is AI",
      body: [
        "These two are easy to mix up because from the outside they look identical: work happens, and no human did it. The difference is invisible - it's underneath.",
        "Picture two inboxes. In the first, every message from billing@ moves to a Billing folder - a rule someone typed in. In the second, messages get sorted by what they're about, even from senders never seen before - a judgment learned from patterns. Both are hands-free. Only one involves AI. Automation is the hands-free part; AI is one possible way a step inside it decides.",
        "Dominoes and a weather forecast. Dominoes are the flow - one event tips the chain. The forecast is a judgment - a likelihood learned from the past. A domino chain can exist with no forecast anywhere in it; a chain can also include one.",
      ],
      miniConfirm: {
        prompt: "A receipt emails itself after every purchase. Which is accurate?",
        options: [
          { text: "Automated, so AI is involved", correct: false },
          {
            text: "Automated, and nothing described involves AI",
            correct: true,
          },
          { text: "Not automation, because it's rule-based", correct: false },
        ],
        feedbackCorrect:
          'Correct - evidence of progress. Trigger and template: a chain with no learned step. "Is it automated?" and "does it use AI?" are two separate questions, and you kept them separate.',
        feedbackIncorrect:
          "Not quite - the clue is the template: the same email, every time, on a trigger. Effort removed isn't intelligence added, and rule-based steps live inside automation constantly.",
      },
    },
    {
      id: "P1-REM-003",
      misconceptionId: "M3",
      title: "Pattern isn't comprehension",
      claim: "AI thinks and understands like a person",
      body: [
        "This one's easy to hold because fluent language is the strongest \"understanding\" signal humans know. When something answers naturally, every instinct says somebody's home.",
        "A music-identification app names a song from three seconds of audio in a noisy café. Uncanny - and it has no idea what music is. It matches the clip's fingerprint against patterns from millions of examples. Fluent chat works the same way at larger scale: patterns in language, matched and extended. The output resembles understanding because it was learned from people who understand.",
        'The forecast says "70% rain" without knowing you planned a picnic - or what rain feels like. Accuracy and comprehension are different achievements.',
      ],
      miniConfirm: {
        prompt: "A chatbot answers naturally and helpfully. What does that establish?",
        options: [
          { text: "It understands you", correct: false },
          {
            text: "Its training data contained many natural, helpful answers",
            correct: true,
          },
          { text: "A person is typing the replies", correct: false },
        ],
        feedbackCorrect:
          "Correct - that's the distinction landing. Fluency is evidence of patterns learned from fluent people, not of comprehension. Keep the verbs honest: it detects, classifies, generates.",
        feedbackIncorrect:
          "Not quite - the clue is where fluency comes from: patterns in human language, learned at scale. Natural-sounding output is the expected product of that process, with no understanding required.",
      },
    },
    {
      id: "P1-REM-004",
      misconceptionId: "M4",
      title: "Varying answers aren't broken",
      claim: "The same question always gives the same AI answer",
      body: [
        'A lifetime of calculators trains one expectation: same question, same answer. So when an AI answer shifts, "broken" is the natural read.',
        'Ask two experienced travel agents for a weekend itinerary and you\'ll get two good, different answers - because "good itinerary" is a judgment over patterns, not a lookup. Generative systems answer from likelihoods the same way: several phrasings are all probable, and different runs surface different ones. Variation is the mechanism showing, not the mechanism failing.',
        "Two forecasts an hour apart can say 60% and 70% without either being broken - likelihoods move with the inputs.",
      ],
      miniConfirm: {
        prompt:
          "You ask the same question twice and get two differently worded answers. Best explanation?",
        options: [
          { text: "It's malfunctioning", correct: false },
          { text: "Pattern-based output varies by design", correct: true },
          {
            text: "Someone edited it between your questions",
            correct: false,
          },
        ],
        feedbackCorrect:
          "Correct - progress. Rule-based systems repeat; pattern-based systems sample from likelihoods, so wording shifts run to run, by design.",
        feedbackIncorrect:
          "Not quite - the clue is that nothing failed: both answers were coherent. Variation between runs is the signature of generation from likelihoods, not damage or midnight edits.",
      },
    },
    {
      id: "P1-REM-005",
      misconceptionId: "M5",
      title: "The interface can't tell you",
      claim: "You can tell from the interface whether it's AI",
      body: [
        "The interface is all you can see, so judging by it is completely reasonable - and completely unreliable.",
        'Two search boxes, pixel-identical. One matches your words against product titles - string rules. One interprets "warm jacket for rainy commutes" and ranks by learned relevance. Same box, different engines. The window is a costume; mechanisms don\'t dress differently.',
        "From your restaurant table, the dining room looks the same whether the kitchen runs on a strict line or a chef's improvisation. You'd have to see the kitchen - or read the menu's claims critically.",
      ],
      miniConfirm: {
        prompt:
          "Two identical chat windows: one offers fixed menus, one writes varied free-form answers. What settles which uses AI?",
        options: [
          { text: "The look of the window", correct: false },
          {
            text: "The behaviour and mechanism evidence",
            correct: true,
          },
          { text: "Whichever brand is more famous", correct: false },
        ],
        feedbackCorrect:
          "Correct - the gap's closed. Fixed menus expose written rules; free-form varying output exposes generation. The window itself testified to nothing.",
        feedbackIncorrect:
          "Not quite - the clue sits in the behaviour: set lists repeat, generated text varies. Appearance and brand are surface; the mechanism only shows through what the system does or what's disclosed.",
      },
    },
    {
      id: "P1-REM-007",
      misconceptionId: "M7",
      title: "Useful isn't infallible",
      claim: "AI is always correct",
      body: [
        "Computers earned a reputation for exactness, so an exact-sounding AI answer borrows trust it hasn't shown it deserves.",
        "A navigation app predicts 22 minutes; the trip takes 31. Nobody concludes the app is worthless - you treat the estimate as an estimate. AI outputs deserve exactly that posture everywhere: a strong estimate, stated confidently, sometimes wrong. The failure isn't the miss; it's forgetting to hold it as an estimate.",
        "You still pack for the picnic when the forecast says 20% rain - you weigh likelihoods; you don't obey them.",
      ],
      miniConfirm: {
        prompt:
          "A generative assistant gives a confident, detailed answer. What does the confidence tell you about correctness?",
        options: [
          { text: "Confident means checked", correct: false },
          {
            text: "Nothing - tone and correctness are separate; verify when it matters",
            correct: true,
          },
          { text: "Confident answers are usually wrong", correct: false },
        ],
        feedbackCorrect:
          "Correct - the calibration is the skill. Fluent certainty is a style property of generation; correctness is a separate question you answer by checking.",
        feedbackIncorrect:
          "Not quite - the clue is where the tone comes from: generation reads confidently whether right or wrong. That doesn't make it usually wrong, either - it makes verification your job when stakes are real.",
      },
    },
    {
      id: "P1-REM-008",
      misconceptionId: "M8",
      title: "Personalized isn't proof",
      claim: "Personalization proves AI is being used",
      body: [
        '"Personalized" and "AI" arrive in the same ads so often that they\'ve fused. Reasonable - and worth prying apart.',
        'Two "personal" touches on one shopping site. "Your recently viewed items" - a stored list played back, pure rules. "Recommended for you," different per person and shifting with behaviour - learned patterns. Both feel personal. Only one is evidence of AI, and the evidence is the variation tracking behaviour, not the word "personal."',
        "A vending machine with your name engraved on it is personalized. It's still a vending machine.",
      ],
      miniConfirm: {
        prompt: "A homepage greets you by name and shows your saved articles. Evidence of AI?",
        options: [
          { text: "Yes - it's personalized", correct: false },
          {
            text: "No - a stored profile played back by rules explains it fully",
            correct: true,
          },
          { text: "Only if the articles are interesting", correct: false },
        ],
        feedbackCorrect:
          "Correct - cleanly separated. Playback of stored data is rules; the AI question needs different evidence: judgments that vary with learned patterns.",
        feedbackIncorrect:
          "Not quite - the clue is what's shown: your own saved data, retrieved. Rules do that perfectly. Personalization becomes AI evidence only when the system makes learned judgments, not lookups.",
      },
    },
    {
      id: "P1-REM-009",
      misconceptionId: "M9",
      title: "Labels aren't mechanisms",
      claim: "Marketing labels explain how a product works",
      body: [
        'Marketing words sound like technical descriptions - that\'s their job. Reading "smart" as information is exactly what the copy was engineered to produce.',
        '"Ocean-fresh" on a soap bottle doesn\'t mean seawater; it means a scent direction chosen by branding. "AI-powered," "smart," "adaptive," and "intelligent" work the same way: mood words, legally safe, mechanically silent. They can be true. They\'re never evidence. The move that cuts through: which feature, learning what, from what data?',
        'A menu calling a dish "chef-crafted" doesn\'t tell you whether the kitchen runs on recipes or improvisation. It tells you what the menu writer wanted you to feel.',
      ],
      miniConfirm: {
        prompt:
          'A store page says an app "uses smart technology to organize your photos." What do you know?',
        options: [
          { text: "It uses AI", correct: false },
          {
            text: "Only the wording - the mechanism isn't described",
            correct: true,
          },
          { text: "It uses no AI", correct: false },
        ],
        feedbackCorrect:
          "Correct - and note it cuts both ways: the label neither proves nor disproves AI. What you know is what the marketing team chose to say.",
        feedbackIncorrect:
          'Not quite - the clue is what "smart technology" describes: a promise. Date-and-location rules or learned face recognition could both sit behind it. The label leaves the mechanism exactly as unknown as before.',
      },
    },
    {
      id: "P1-REM-010",
      misconceptionId: "M10",
      title: "Products aren't one box",
      claim: "A product belongs to exactly one category",
      body: [
        "Classification exercises train a habit - one item, one label - and real products break it. Wanting a single box is the exercise talking, not the world.",
        'A translation earbud: rules manage pairing and audio, automation triggers capture when speech starts, learned models transcribe and translate. Ask "which category?" and the honest answer is "which layer?" The single-label instinct isn\'t wrong for a calculator; it\'s wrong for a stack.',
        "Asking \"is the restaurant the menu, the kitchen line, or the chef?\" mistakes the parts for the whole. It's the combination - that's what a restaurant is.",
      ],
      miniConfirm: {
        prompt:
          "A navigation app uses map rules, auto-rerouting, and learned traffic prediction. Best whole-product label?",
        options: [
          { text: "AI-assisted", correct: false },
          { text: "Combination", correct: true },
          { text: "Automation", correct: false },
        ],
        feedbackCorrect:
          'Correct - layers named, label earned. Each single label catches one true layer; "combination" is the only label that catches the product.',
        feedbackIncorrect:
          "Not quite - you've spotted a real layer, and there's more here: rules route, automation reroutes, learned patterns predict. When mechanisms stack, the honest label for the whole is a combination.",
      },
    },
    {
      id: "P1-REM-011",
      misconceptionId: "M11",
      title: "Written rules vs learned patterns",
      claim: "Fixed rules and learned patterns are the same thing",
      body: [
        "Both are invisible, both live in code, both sort things - so of course they blur. The difference is where the logic came from.",
        "Two ways to catch bad passwords. Rule version: reject anything under 12 characters - a person typed that criterion, and it fires identically forever. Pattern version: flag passwords resembling millions of leaked ones - nobody wrote \"reject P@ssw0rd123\"; the resemblance was learned, and it's scored as a likelihood. Authored versus learned; exact repetition versus estimate. That's the entire fork.",
        "The vending machine's button map was printed at the factory. The forecast's rain number was learned from decades of weather. Both produce outputs; only one had its logic written down by hand.",
      ],
      miniConfirm: {
        prompt:
          "One fraud check blocks all foreign transactions over $5,000. Another flags what's unusual for you. What's the key difference?",
        options: [
          { text: "The first is stricter", correct: false },
          {
            text: "The first is an authored rule; the second is a learned, likelihood-based pattern",
            correct: true,
          },
          { text: "There's no real difference", correct: false },
        ],
        feedbackCorrect:
          'Correct - the fork is yours now. Stated threshold: authored, deterministic. "Unusual for you": learned against your history, probabilistic.',
        feedbackIncorrect:
          'Not quite - the clue is who could write it down. Anyone can author "over $5,000 from abroad." Nobody can pre-write "unusual" for every customer - that\'s computed from learned patterns, as a likelihood.',
      },
    },
  ],
  /**
   * Assessment category -> misconception ids to review, derived from the
   * category and misconception tags on the graded items (core bank in
   * assessment.md, extended bank in question-bank.md). Restricted to the
   * misconceptions transformed above (M6, M12, M13, M14 excluded).
   */
  categoryMap: {
    traditional_software: ["M1", "M11"],
    automation: ["M2"],
    ai_characteristics: ["M3", "M4", "M7", "M11"],
    combined_systems: ["M10"],
    classification: ["M1", "M2", "M8"],
    ambiguity: ["M5", "M8", "M9"],
    misconceptions: ["M1", "M2", "M3", "M5", "M9"],
  },
};
