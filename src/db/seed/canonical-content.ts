/**
 * Canonical concept records (docs/content/knowledge-model.md).
 *
 * One approved record per concept. The glossary, lesson blocks, question
 * feedback, diagram text and the future presentation export all quote these;
 * the "rule of one" is enforced by content-lint, which fails the build when a
 * glossary definition drifts from its record here.
 *
 * Definitions are the approved wording from docs/content/glossary.md and are
 * provisional pending the company document audit, exactly as that file states.
 * Changing a definition here is a content change: bump the version, record the
 * review, and follow docs/content/governance.md.
 *
 * Misconceptions are register IDs (M1-M6, docs/content/misconceptions.md),
 * never restated prose, so a correction is written in exactly one place.
 */

export interface CanonicalExample {
  /** The example as a learner meets it. */
  text: string;
  /** The observable property that identifies it. Evidence, never the label. */
  clue: string;
}

export interface CanonicalAnalogy {
  analogy: string;
  /** Every analogy states where it stops being true. Drift starts here. */
  boundary: string;
}

export interface CanonicalRecordSeed {
  key: string;
  title: string;
  /** 25 words or fewer, behaviour-first, standalone. Matches the glossary exactly. */
  definition: string;
  technicalDefinition: string;
  whyItMatters: string;
  examples: CanonicalExample[];
  analogies: CanonicalAnalogy[];
  misconceptionIds: string[];
  relatedKeys: string[];
  /** Approved wording for decks. A summary of the record, never a re-explanation. */
  presentationSummary: string;
  speakerNotes: string;
  sources: string[];
  /** True when the term surfaces as a lesson glossary chip in Phase 1. */
  isChip: boolean;
}

export const canonicalRecordSeeds: CanonicalRecordSeed[] = [
  {
    key: "artificial-intelligence",
    title: "Artificial intelligence (AI)",
    definition:
      "Systems that find patterns in data to classify, predict, or generate things - instead of only following written rules",
    technicalDefinition:
      "A field of computing concerned with systems that derive their behaviour from patterns learned over data rather than from rules stated in advance. Outputs are produced with a degree of likelihood, so the same input need not produce the same result.",
    whyItMatters:
      "Knowing a system learned its behaviour tells you to expect variation and to check the output, which is a different working relationship than you have with a calculator.",
    examples: [
      {
        text: "A spam filter that keeps catching new wording it was never explicitly told about",
        clue: "it handles messages nobody wrote a rule for",
      },
      {
        text: "A photo app that groups pictures of the same person",
        clue: "recognition learned from examples, not from a stored list of faces",
      },
      {
        text: "A chat assistant that phrases the same answer differently each time",
        clue: "output varies for the same input",
      },
    ],
    analogies: [
      {
        analogy: "A weather forecast: patterns, likelihoods, and sometimes wrong",
        boundary:
          "the forecast does not understand your picnic, and the system does not understand your question",
      },
    ],
    misconceptionIds: ["M1", "M3"],
    relatedKeys: [
      "machine-learning",
      "generative-ai",
      "pattern-based-system",
      "probabilistic-output",
    ],
    presentationSummary:
      "AI is the part of a system whose behaviour was learned from data rather than written down by a person. That single property explains almost everything else about it: why it generalises, why it varies, and why it needs checking.",
    speakerNotes:
      "Resist defining AI by what it can do; capability lists date badly and invite the 'complex equals AI' error. Define it by where the behaviour came from. If the audience takes one thing away, make it the question: what patterns would this have learned, from what data, to do this job?",
    sources: [],
    isChip: true,
  },
  {
    key: "traditional-software",
    title: "Traditional software",
    definition:
      "Software that follows rules people wrote, so the same input always produces the same output",
    technicalDefinition:
      "Systems whose behaviour is fully specified in advance as explicit instructions. Given identical input and state, output is reproducible. Complexity of the rules does not change the category.",
    whyItMatters:
      "Most of what people call AI is this. Recognising it stops you from over-trusting a system's sophistication or expecting judgment it does not have.",
    examples: [
      {
        text: "A calculator returning a total",
        clue: "same numbers tomorrow, same total",
      },
      {
        text: "A payroll run calculating salaries from timesheets",
        clue: "fixed arithmetic applied on a schedule, however intricate the tax rules are",
      },
      {
        text: "A form that validates a postcode",
        clue: "the accepted patterns were written down by someone",
      },
    ],
    analogies: [
      {
        analogy: "A vending machine: press B4, get the same snack",
        boundary:
          "a bigger machine with more slots is still a machine, so complexity is not evidence of AI",
      },
    ],
    misconceptionIds: ["M1"],
    relatedKeys: ["rule-based-system", "deterministic-output", "automation"],
    presentationSummary:
      "Traditional software does exactly what someone wrote down. Same input, same output, every time. Sophistication is not a signal of AI: a complex tax engine is still rules.",
    speakerNotes:
      "The contrast case earns its keep here. Audiences accept 'a calculator is not AI' immediately and resist 'a complex tax engine is not AI', which is precisely why the second example is the one to use.",
    sources: [],
    isChip: true,
  },
  {
    key: "automation",
    title: "Automation",
    definition: "Using technology to run or connect repeatable tasks with less manual effort",
    technicalDefinition:
      "The orchestration of steps so they run on a trigger or schedule without manual initiation. Automation describes how work flows, not how decisions inside that work are made, so it is orthogonal to whether AI is present.",
    whyItMatters:
      "Automation is the single most common thing mistaken for AI, because both remove effort and the outcome looks identical from outside.",
    examples: [
      {
        text: "A confirmation email sent the moment a contact form is submitted",
        clue: "a trigger firing a fixed action, with no judgment involved",
      },
      {
        text: "A nightly report that assembles itself and lands in an inbox",
        clue: "scheduled execution of steps someone defined",
      },
      {
        text: "A support queue that routes tickets by keyword",
        clue: "the routing runs itself, but the rule was written, not learned",
      },
    ],
    analogies: [
      {
        analogy: "A row of dominoes: one push and the sequence runs",
        boundary: "dominoes decide nothing, so a person or an AI still chose the arrangement",
      },
    ],
    misconceptionIds: ["M2"],
    relatedKeys: ["traditional-software", "ai-assisted-system", "rule-based-system"],
    presentationSummary:
      "Automation is about how work flows, not how decisions get made. It can be entirely rule-based, and it can contain AI. The two questions are separate, and answering one does not answer the other.",
    speakerNotes:
      "Put automation and AI side by side rather than in sequence: dominoes next to a forecast. The confusion is not that people think automation is impressive, it is that removing human effort feels like the same thing in both cases.",
    sources: [],
    isChip: true,
  },
  {
    key: "rule-based-system",
    title: "Rule-based system",
    definition: "A system that decides using written if-then rules",
    technicalDefinition:
      "A system whose decision logic is an explicit set of conditions and consequences authored by people. Behaviour changes only when someone edits the rules.",
    whyItMatters:
      "If behaviour only changes when a person edits it, you are looking at rules, and that is a reliable test you can apply without seeing the code.",
    examples: [
      {
        text: "A bank flagging every transaction above a set amount",
        clue: "one fixed threshold, applied identically to everyone",
      },
      {
        text: "An email filter that blocks a named sender",
        clue: "the condition was typed in by a person",
      },
      {
        text: "A warehouse system reordering stock when the count drops below fifty",
        clue: "fifty is a number someone chose, not a demand forecast",
      },
    ],
    analogies: [],
    misconceptionIds: ["M1"],
    relatedKeys: ["traditional-software", "deterministic-output", "automation"],
    presentationSummary:
      "Rules are authored. The system does what someone specified, and it changes only when someone changes the specification.",
    speakerNotes:
      "The useful diagnostic to offer: ask what would have to happen for this system to behave differently next month. If the answer is 'someone edits it', it is rules.",
    sources: [],
    isChip: true,
  },
  {
    key: "pattern-based-system",
    title: "Pattern-based system",
    definition: "A system that decides using patterns learned from many examples",
    technicalDefinition:
      "A system whose decision function is fitted over example data rather than authored. It generalises to inputs never seen during fitting, which is both its value and the reason it can be confidently wrong.",
    whyItMatters:
      "Generalising to new cases is the capability worth paying for, and being wrong on new cases is the cost that comes with it. They are the same property.",
    examples: [
      {
        text: "A fraud check that adapts to new scam patterns without anyone rewriting it",
        clue: "behaviour improved without an edit",
      },
      {
        text: "A support classifier trained on past tickets",
        clue: "the word trained names the mechanism",
      },
      {
        text: "A camera app that finds faces in a photo it has never seen before",
        clue: "it works on images that were not among its examples",
      },
    ],
    analogies: [],
    misconceptionIds: ["M1", "M4"],
    relatedKeys: ["artificial-intelligence", "machine-learning", "probabilistic-output"],
    presentationSummary:
      "Pattern-based systems learn their behaviour from examples, so they handle cases nobody anticipated and can be wrong in ways nobody anticipated either.",
    speakerNotes:
      "Pair the benefit and the cost in one breath. Audiences that hear only the benefit come away expecting reliability the mechanism cannot provide.",
    sources: [],
    isChip: true,
  },
  {
    key: "deterministic-output",
    title: "Deterministic output",
    definition: "A result that is always the same for the same input",
    technicalDefinition:
      "Output fully determined by input and state, reproducible on repeat execution. The property that makes traditional software testable by exact comparison.",
    whyItMatters:
      "Repeating an input and getting the same answer twice is the cheapest test a non-technical person can run on a system.",
    examples: [
      {
        text: "Entering the same three amounts and getting the same total",
        clue: "identical output on repeat",
      },
      {
        text: "A payroll run producing the same net pay from the same timesheet",
        clue: "rerun the month and every figure matches",
      },
      {
        text: "A currency converter returning the same amount for the same rate and input",
        clue: "no variation between runs, however many times you ask",
      },
    ],
    analogies: [],
    misconceptionIds: ["M4"],
    relatedKeys: ["traditional-software", "rule-based-system", "probabilistic-output"],
    presentationSummary:
      "Same input, same output. Reproducibility is the signature of authored rules.",
    speakerNotes:
      "This is the most actionable idea in the section: it gives a beginner something to actually do when they want to know what they are looking at.",
    sources: [],
    isChip: true,
  },
  {
    key: "probabilistic-output",
    title: "Probabilistic output",
    definition: "A result based on likelihood, which can vary or be wrong",
    technicalDefinition:
      "Output selected according to learned likelihoods rather than fixed rules, so repeat runs on identical input can differ. Variation is a designed property, not a defect.",
    whyItMatters:
      "Expecting a pattern-based system to behave like a calculator is the root of most disappointment with AI tools.",
    examples: [
      {
        text: "A chat assistant phrasing the same answer differently each time",
        clue: "the output changed while the input did not",
      },
      {
        text: "A spam filter occasionally catching a real message",
        clue: "a false positive that is expected behaviour, not a bug",
      },
      {
        text: "A voice assistant transcribing the same phrase slightly differently on a second try",
        clue: "identical audio in, different text out",
      },
    ],
    analogies: [],
    misconceptionIds: ["M4"],
    relatedKeys: ["artificial-intelligence", "pattern-based-system", "deterministic-output"],
    presentationSummary:
      "Probabilistic systems answer with likelihoods, so the same question can get different answers and some answers will be wrong. That is the design, not a fault.",
    speakerNotes:
      "The spam false positive is the example to lead with: everyone has lost a real email to a spam folder, and nobody concluded the filter was broken.",
    sources: [],
    isChip: true,
  },
  {
    key: "machine-learning",
    title: "Machine learning",
    definition:
      "A way of building AI where systems learn patterns from examples rather than being given rules",
    technicalDefinition:
      "A set of methods for fitting a model to data so it performs a task without task-specific rules being authored. The dominant way AI systems are built today.",
    whyItMatters:
      "It names the how behind most modern AI, and it is the point where data quality becomes the system's quality.",
    examples: [
      {
        text: "A recommendation system improving as more people use it",
        clue: "performance changed with data, not with an edit",
      },
      {
        text: "A bank's fraud model retrained each quarter on recent cases",
        clue: "behaviour updated by new examples, not by new rules",
      },
      {
        text: "A logistics tool estimating delivery windows from years of past routes",
        clue: "the estimate came from history; nobody wrote the timings down",
      },
    ],
    analogies: [],
    misconceptionIds: [],
    relatedKeys: ["artificial-intelligence", "pattern-based-system"],
    presentationSummary:
      "Machine learning is how most AI gets built: fit a model to examples instead of writing the rules. It also means the data is the product.",
    speakerNotes:
      "Level 1 audiences do not need the taxonomy of learning methods. They need the causal link: data shapes behaviour, so data problems become behaviour problems.",
    sources: [],
    isChip: false,
  },
  {
    key: "generative-ai",
    title: "Generative AI",
    definition: "AI that creates new content - text, images, or audio - based on learned patterns",
    technicalDefinition:
      "Models that produce novel output in a modality by sampling from learned distributions. Fluency of output is unrelated to its factual accuracy.",
    whyItMatters:
      "It is the AI most people have met, and its fluency makes it the easiest to over-trust.",
    examples: [
      {
        text: "A tool drafting an email from a one-line instruction",
        clue: "the output did not exist anywhere before",
      },
      {
        text: "An image tool producing a picture from a written description",
        clue: "the picture is composed, not retrieved from a library",
      },
      {
        text: "A meeting tool writing a summary in its own prose rather than quoting lines",
        clue: "the wording is new, so it can be fluent and wrong at once",
      },
    ],
    analogies: [],
    misconceptionIds: ["M3"],
    relatedKeys: ["artificial-intelligence", "probabilistic-output"],
    presentationSummary:
      "Generative AI produces new content from learned patterns. It is fluent by construction, and fluency is not evidence that the content is correct.",
    speakerNotes:
      "Separate fluency from accuracy explicitly and early. Most audience misjudgment traces back to treating confident prose as a reliability signal.",
    sources: [],
    isChip: false,
  },
  {
    key: "human-review",
    title: "Human review",
    definition: "A person checking or deciding on a system's output before it counts",
    technicalDefinition:
      "A control step where a person accepts, amends, or rejects system output before it takes effect. Converts a probabilistic step into an accountable decision.",
    whyItMatters:
      "It is the practical answer to AI's limits, and its presence or absence in a product changes how much the output should be trusted.",
    examples: [
      {
        text: "A support agent reading and answering a ticket the system routed",
        clue: "a person makes the call that reaches the customer",
      },
      {
        text: "A clinician confirming a flagged scan before it reaches the patient record",
        clue: "the flag is a prompt to look, not a decision",
      },
      {
        text: "An editor approving a drafted product description before it goes live",
        clue: "nothing publishes until a person accepts it",
      },
    ],
    analogies: [],
    misconceptionIds: ["M6"],
    relatedKeys: ["ai-assisted-system", "artificial-intelligence"],
    presentationSummary:
      "Human review is where a probabilistic output becomes an accountable decision. Asking who checks the output is often more revealing than asking whether the system uses AI.",
    speakerNotes:
      "This is the bridge to Responsible AI Use. Keep it concrete: name the person and the moment, not the principle.",
    sources: [],
    isChip: true,
  },
  {
    key: "ai-assisted-system",
    title: "AI-assisted system",
    definition:
      "A product where AI handles part of the work while rules, automation, or people handle the rest",
    technicalDefinition:
      "A composite system in which a learned component sits alongside authored logic, orchestration, and human decision points. The honest label for most shipped products.",
    whyItMatters:
      "Almost every real product is this, so 'is it AI?' is usually the wrong question. The useful question is which layer does what.",
    examples: [
      {
        text: "A navigation app: mapping rules, live traffic feeds, and a learned arrival prediction",
        clue: "three mechanisms named in one description",
      },
      {
        text: "A support platform that routes automatically, classifies with a trained model, and hands to an agent",
        clue: "trained names the AI layer, routing names the automation, the agent is the human step",
      },
      {
        text: "An email client with rule-based folders, scheduled send, and a learned spam filter",
        clue: "three mechanisms in one familiar product, only one of them learned",
      },
    ],
    analogies: [
      {
        analogy: "A restaurant: menu, kitchen line, and a chef exercising judgment",
        boundary:
          "you cannot see the kitchen from your table, so sometimes the honest answer is that there is not enough information",
      },
    ],
    misconceptionIds: ["M5", "M6"],
    relatedKeys: ["automation", "human-review", "artificial-intelligence", "traditional-software"],
    presentationSummary:
      "Most products are combinations: rules, automation, a learned component, and people, layered together. The useful question is not whether a product is AI but which layer is doing the work you care about.",
    speakerNotes:
      "Close on this. It reframes the whole topic from a binary label to a reading skill, and it is the idea that transfers to the audience's own procurement and product decisions.",
    sources: [],
    isChip: true,
  },
];

/**
 * Which glossary seed term each record owns (terms as spelled in
 * section-content.ts, which vary in case by design: some are sentence-case
 * chips). Terms absent here have no record yet and are AI Literacy seed
 * material per docs/content/glossary.md; content-lint permits that and
 * forbids the reverse, a record claiming a term that does not exist.
 */
export const GLOSSARY_TERM_BY_KEY: Record<string, string> = {
  "artificial-intelligence": "Artificial intelligence",
  "traditional-software": "Traditional software",
  automation: "Automation",
  "rule-based-system": "rule-based system",
  "pattern-based-system": "pattern-based system",
  "deterministic-output": "deterministic output",
  "probabilistic-output": "probabilistic output",
  "machine-learning": "Machine learning",
  "generative-ai": "Generative AI",
  "human-review": "human review",
  "ai-assisted-system": "AI-assisted system",
};
