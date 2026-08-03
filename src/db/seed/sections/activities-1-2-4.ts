import type { ActivitySeed } from "@/features/content/activity-types";

/**
 * Designed interactions for AIA-1, AIA-2 and AIA-4 (docs/content/content-map.md),
 * in the generic scenario dialect: per-scenario options, per-option feedback
 * that names the evidence rather than the verdict (docs/content/feedback.md),
 * and a clue per scenario for the evidence second step.
 *
 * Remediation anchors resolve to the section's own lesson blocks; content-lint
 * verifies every one.
 */
export const aia1ActivitySeed: ActivitySeed = {
  id: "AIA-1-ACT-001",
  title: "AI or Not AI?",
  intro:
    "Five familiar systems, one question each: is learned behaviour involved? The honest third answer is available every time.",
  instructions:
    "Read the description, decide, and check. The feedback names the evidence that settles it, not just the answer.",
  scenarios: [
    {
      id: "AIA-1-ACT-001-S01",
      position: 1,
      title: "The spell-checker",
      body: "A word processor underlines any word that is not in its dictionary and suggests the closest entries.",
      difficulty: "foundational",
      clue: "a fixed dictionary lookup, written in advance",
      prompt: "Is learned behaviour involved?",
      options: [
        {
          id: "ai",
          label: "AI involved",
          correct: false,
          feedback:
            "Not quite. A dictionary lookup with closest-match suggestions can be written entirely as rules, and this description says nothing beyond that.",
        },
        {
          id: "no-ai",
          label: "No AI",
          correct: true,
          feedback:
            "Correct. The behaviour described is a lookup against a list someone compiled. Nothing here had to be derived from examples.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "Close, and healthy caution. Here the description does state the mechanism: a dictionary and closest entries, which is rules end to end.",
        },
      ],
      remediationAnchor: "AIA-1-LESSON-002",
    },
    {
      id: "AIA-1-ACT-001-S02",
      position: 2,
      title: "The photo grouping",
      body: "A photo app groups pictures of the same person, including people it was never told about.",
      difficulty: "foundational",
      clue: "it works on people nobody entered in advance",
      prompt: "Is learned behaviour involved?",
      options: [
        {
          id: "ai",
          label: "AI involved",
          correct: true,
          feedback:
            "Correct. Recognising people nobody entered in advance means the behaviour was derived from examples; no stored list could do it.",
        },
        {
          id: "no-ai",
          label: "No AI",
          correct: false,
          feedback:
            "Not quite. The deciding detail is that it works on people it was never told about. A written rule needs someone to have written it.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "The description does settle it: handling cases nobody anticipated is the signature of learned behaviour.",
        },
      ],
      remediationAnchor: "AIA-1-LESSON-002",
    },
    {
      id: "AIA-1-ACT-001-S03",
      position: 3,
      title: "The smart thermostat",
      body: "A thermostat marketed as intelligent turns the heating on at 6am and off at 10pm, exactly as configured.",
      difficulty: "applied",
      clue: "the behaviour matches its configuration exactly",
      prompt: "Is learned behaviour involved?",
      options: [
        {
          id: "ai",
          label: "AI involved",
          correct: false,
          feedback:
            "Not quite. The label says intelligent; the behaviour described is a schedule someone set. The label is a marketing choice, not evidence.",
        },
        {
          id: "no-ai",
          label: "No AI",
          correct: true,
          feedback:
            "Correct. Turning on and off exactly as configured is a written rule doing exactly what it was told, whatever the box says.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "The behaviour described settles it: exact adherence to configuration is rules. The marketing label was the distraction.",
        },
      ],
      remediationAnchor: "AIA-1-LESSON-004",
    },
    {
      id: "AIA-1-ACT-001-S04",
      position: 4,
      title: "The route suggestion",
      body: "A cycling app suggests a route it says most riders like you prefer.",
      difficulty: "applied",
      clue: "riders like you implies patterns from other people's rides",
      prompt: "Is learned behaviour involved?",
      options: [
        {
          id: "ai",
          label: "AI involved",
          correct: true,
          feedback:
            "Correct. Riders like you means the suggestion was built from patterns in other people's behaviour, which nobody wrote down as a rule.",
        },
        {
          id: "no-ai",
          label: "No AI",
          correct: false,
          feedback:
            "Not quite. A fixed route could be rules, but preferences of riders like you have to come from somewhere, and that somewhere is examples.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: false,
          feedback:
            "Defensible, but the phrase riders like you tips it: grouping people by similarity is pattern work, not a written rule.",
        },
      ],
      remediationAnchor: "AIA-1-LESSON-003",
    },
    {
      id: "AIA-1-ACT-001-S05",
      position: 5,
      title: "The premium claim",
      body: "A vendor page says: our advanced AI engine transforms how teams work. Nothing else is described.",
      difficulty: "challenging",
      clue: "no behaviour is described at all, only a label",
      prompt: "Is learned behaviour involved?",
      options: [
        {
          id: "ai",
          label: "AI involved",
          correct: false,
          feedback:
            "Not quite. The page asserts it, but an assertion is not a mechanism. Nothing described here could distinguish AI from anything else.",
        },
        {
          id: "no-ai",
          label: "No AI",
          correct: false,
          feedback:
            "Not quite. There is no evidence for AI here, but none against it either. The page describes an outcome, not a mechanism.",
        },
        {
          id: "cant-tell",
          label: "Can't tell from this",
          correct: true,
          feedback:
            "Correct, and this is the skilled answer. No behaviour was described, so no judgment is possible yet. Ask what the system learned, from what data, to do this job.",
        },
      ],
      remediationAnchor: "AIA-1-LESSON-005",
    },
  ],
};

export const aia2ActivitySeed: ActivitySeed = {
  id: "AIA-2-ACT-001",
  title: "A Day With AI",
  intro:
    "Six moments from one person's ordinary morning. At each one, name what is actually happening underneath.",
  instructions:
    "Pick the description that matches the mechanism, not the appearance. Some moments have no learned behaviour in them at all.",
  scenarios: [
    {
      id: "AIA-2-ACT-001-S01",
      position: 1,
      title: "7:02 - the alarm",
      body: "Maya's phone alarm goes off at 7:00, exactly as set the night before.",
      difficulty: "foundational",
      clue: "it did exactly what was configured, when configured",
      prompt: "What is happening underneath?",
      options: [
        {
          id: "rule",
          label: "A rule doing what it was told",
          correct: true,
          feedback:
            "Correct. An alarm at a set time is configuration running on schedule. Not everything on a smartphone involves learning.",
        },
        {
          id: "learned",
          label: "A learned prediction about when to wake her",
          correct: false,
          feedback:
            "Not quite. She set 7:00 and it rang at 7:00. When behaviour matches configuration exactly, nothing needed to be learned.",
        },
        {
          id: "ranking",
          label: "A ranking chosen for her",
          correct: false,
          feedback: "Not quite. Nothing is being ordered or selected here; one setting fired once.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-002",
    },
    {
      id: "AIA-2-ACT-001-S02",
      position: 2,
      title: "7:15 - the news feed",
      body: "Over breakfast, Maya scrolls a feed. The stories are not in time order.",
      difficulty: "foundational",
      clue: "not chronological means something chose the order",
      prompt: "What is happening underneath?",
      options: [
        {
          id: "ranking",
          label: "A ranking learned from what people engage with",
          correct: true,
          feedback:
            "Correct. Out-of-time-order means something ordered it, and feed orderings are built from engagement patterns, not written rules per story.",
        },
        {
          id: "rule",
          label: "A rule showing newest first",
          correct: false,
          feedback:
            "Not quite. The detail that decides it is that the stories are not in time order, so newest-first is exactly what this is not.",
        },
        {
          id: "human",
          label: "An editor choosing stories for her",
          correct: false,
          feedback:
            "Not quite. A person curates for everyone; this order is specific to Maya, which takes patterns about Maya.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-002",
    },
    {
      id: "AIA-2-ACT-001-S03",
      position: 3,
      title: "7:40 - the coffee payment",
      body: "Maya taps her card for coffee. The payment goes through instantly, and nothing else visibly happens.",
      difficulty: "applied",
      clue: "the check that matters ran invisibly in the background",
      prompt: "What is happening underneath?",
      options: [
        {
          id: "background",
          label: "A background check against her spending pattern",
          correct: true,
          feedback:
            "Correct. The interesting system here is the one she cannot see: the transaction was compared against her pattern before it cleared.",
        },
        {
          id: "nothing",
          label: "Nothing beyond moving the money",
          correct: false,
          feedback:
            "Not quite. Instant approval is itself the visible end of an invisible judgment: this purchase, this place, this pattern.",
        },
        {
          id: "person",
          label: "A person at the bank approving it",
          correct: false,
          feedback:
            "Not quite. Instant means no person was in the loop for this one; people review the flagged cases, not every tap.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-002",
    },
    {
      id: "AIA-2-ACT-001-S04",
      position: 4,
      title: "8:05 - the commute",
      body: "Maya's map app plans her route and says she will arrive at 8:42, then revises it to 8:47 as traffic builds.",
      difficulty: "applied",
      clue: "the estimate shifts as conditions change; the roads do not",
      prompt: "What is happening underneath?",
      options: [
        {
          id: "layers",
          label: "Rules for the roads, a learned estimate for the arrival",
          correct: true,
          feedback:
            "Correct. The map is recorded, the traffic is fed in, and the shifting arrival time is a prediction built from patterns. Three layers, one product.",
        },
        {
          id: "all-ai",
          label: "AI end to end",
          correct: false,
          feedback:
            "Not quite. The roads and turn rules are written data and logic. Only the arrival estimate needed learning. Naming the layer is the skill.",
        },
        {
          id: "all-rules",
          label: "Written rules end to end",
          correct: false,
          feedback:
            "Not quite. A rule cannot revise an arrival time from live conditions it was never written for; that part is a learned estimate.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-003",
    },
    {
      id: "AIA-2-ACT-001-S05",
      position: 5,
      title: "9:00 - the inbox",
      body: "At her desk, Maya's inbox shows two folders already sorted: priority and everything else. One real message sits in spam.",
      difficulty: "applied",
      clue: "a false positive is expected behaviour for a learned filter",
      prompt: "What does the message in spam tell her?",
      options: [
        {
          id: "expected",
          label: "The filter judges by likelihood, and likelihoods are sometimes wrong",
          correct: true,
          feedback:
            "Correct. A learned filter answers with likelihoods, so an occasional real message in spam is the designed cost of catching new junk without new rules.",
        },
        {
          id: "broken",
          label: "The filter is broken and needs fixing",
          correct: false,
          feedback:
            "Not quite. If it followed written rules it would only ever make the mistakes written into it. An occasional false positive is how likelihood-based filtering behaves.",
        },
        {
          id: "rule-error",
          label: "Someone wrote a bad rule",
          correct: false,
          feedback:
            "Not quite. Nobody wrote a rule about that message. It resembled junk in ways the filter learned from millions of examples.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-004",
    },
    {
      id: "AIA-2-ACT-001-S06",
      position: 6,
      title: "9:20 - the support chat",
      body: "Maya opens a supplier's support chat. It greets her by name and offers four buttons of common questions.",
      difficulty: "challenging",
      clue: "buttons and a name lookup need no learning; the surface hides the mechanism",
      prompt: "What can she conclude about the mechanism?",
      options: [
        {
          id: "cant-tell",
          label: "Not enough information: the interface hides the mechanism",
          correct: true,
          feedback:
            "Correct. A greeting is a lookup and buttons are a menu; everything visible so far could be rules. What happens when she types freely would be the evidence.",
        },
        {
          id: "generative",
          label: "It is generating replies",
          correct: false,
          feedback:
            "Not quite yet. Nothing described requires generation: a name lookup and a fixed menu are rules. The surface is designed, not evidence.",
        },
        {
          id: "rules",
          label: "It is a decision tree",
          correct: false,
          feedback:
            "Probably, from what is visible, but probably is not knowledge. The honest answer is that the interface has not shown her the mechanism.",
        },
      ],
      remediationAnchor: "AIA-2-LESSON-004",
    },
  ],
};

export const aia4ActivitySeed: ActivitySeed = {
  id: "AIA-4-ACT-001",
  title: "Choose the Best Use Case",
  intro:
    "Five workplace goals. For each, pick the piece of the work that genuinely suits these systems, using the property that decides it: what a wrong answer costs and who would notice.",
  instructions:
    "Every option is a real task. One suits the mechanism; the feedback names the property that decided it.",
  scenarios: [
    {
      id: "AIA-4-ACT-001-S01",
      position: 1,
      title: "The overflowing inbox",
      body: "A support team wants help with their shared inbox of two hundred messages a day.",
      difficulty: "foundational",
      clue: "a wrong label is visible and undone in seconds",
      prompt: "Which task suits these systems best?",
      options: [
        {
          id: "sort",
          label: "Sorting messages into topic queues",
          correct: true,
          feedback:
            "Correct. A mis-sorted message is visible and moved in seconds: cheap to be wrong, easy to notice, and the volume is where the value is.",
        },
        {
          id: "refunds",
          label: "Deciding which customers get refunds",
          correct: false,
          feedback:
            "Not quite. A wrong refund decision affects a person and sets a precedent. That is decision support at most, with a person deciding.",
        },
        {
          id: "final-reply",
          label: "Sending replies without review",
          correct: false,
          feedback:
            "Not quite. A reply that reaches a customer is neither reversible nor private. Drafting suits the mechanism; sending unreviewed does not.",
        },
      ],
      remediationAnchor: "AIA-4-LESSON-002",
    },
    {
      id: "AIA-4-ACT-001-S02",
      position: 2,
      title: "The quarterly forecast",
      body: "An operations lead wants to know how much stock to order for next quarter.",
      difficulty: "applied",
      clue: "the past resembling the future is the assumption that decides it",
      prompt: "Where do these systems genuinely help?",
      options: [
        {
          id: "estimate",
          label: "Estimating demand from past seasons, with a person setting the order",
          correct: true,
          feedback:
            "Correct. Demand estimation is pattern work, and keeping a person on the order keeps accountability where the consequences are.",
        },
        {
          id: "auto-order",
          label: "Placing the orders automatically from the estimate",
          correct: false,
          feedback:
            "Not quite. The estimate assumes next quarter resembles the past. When that quietly stops holding, an auto-order carries the mistake into real money before anyone notices.",
        },
        {
          id: "novel",
          label: "Forecasting demand for a product with no history",
          correct: false,
          feedback:
            "Not quite. Pattern-based estimates need patterns. A product with no history is exactly where the mechanism has nothing to learn from.",
        },
      ],
      remediationAnchor: "AIA-4-LESSON-003",
    },
    {
      id: "AIA-4-ACT-001-S03",
      position: 3,
      title: "The meeting mountain",
      body: "A manager wants to spend less time on the write-ups from six weekly meetings.",
      difficulty: "applied",
      clue: "a summary decides what to leave out, and the reader cannot see that",
      prompt: "What is the sound way to use these systems here?",
      options: [
        {
          id: "draft-review",
          label: "Drafting the summaries, with the manager reviewing before sending",
          correct: true,
          feedback:
            "Correct. Drafting is where the time goes, review is where the judgment stays, and the cost of a poor draft is minutes.",
        },
        {
          id: "auto-send",
          label: "Summarising and distributing without review",
          correct: false,
          feedback:
            "Not quite. What a summary leaves out is a judgment the readers cannot see. Unreviewed, an omission travels with the manager's name on it.",
        },
        {
          id: "skip-meetings",
          label: "Having the system attend and decide action items",
          correct: false,
          feedback:
            "Not quite. Deciding commitments is exactly the judgment that stays with people. Capturing and drafting them for confirmation is the fitting job.",
        },
      ],
      remediationAnchor: "AIA-4-LESSON-004",
    },
    {
      id: "AIA-4-ACT-001-S04",
      position: 4,
      title: "The screening pile",
      body: "A hiring manager faces three hundred applications for one role.",
      difficulty: "challenging",
      clue: "a wrong answer here affects a person and repeats a learned pattern",
      prompt: "Which use is defensible?",
      options: [
        {
          id: "assist",
          label:
            "Surfacing applications matching stated requirements, with people reading every rejection",
          correct: true,
          feedback:
            "Correct. Narrowing by stated, checkable requirements is decision support; keeping people on rejections keeps the consequential judgment human.",
        },
        {
          id: "auto-reject",
          label: "Rejecting the bottom half automatically",
          correct: false,
          feedback:
            "Not quite. An automatic rejection affects a person, is invisible to them, and repeats whatever patterns past decisions carried. Highest cost, least visibility.",
        },
        {
          id: "rank-fit",
          label: "Ranking candidates by similarity to past hires",
          correct: false,
          feedback:
            "Not quite. Similarity to past hires learns the past's habits along with its skills, which is inherited pattern, not merit.",
        },
      ],
      remediationAnchor: "AIA-4-LESSON-005",
    },
    {
      id: "AIA-4-ACT-001-S05",
      position: 5,
      title: "The vendor pitch",
      body: "A vendor proposes AI to improve customer satisfaction. The team must respond by Friday.",
      difficulty: "challenging",
      clue: "an outcome was named; no job was",
      prompt: "What is the right first move?",
      options: [
        {
          id: "name-job",
          label:
            "Ask which job it does: recognising, predicting, generating, or supporting a decision",
          correct: true,
          feedback:
            "Correct. Improve satisfaction is an outcome, not a job. Until the job is named, suitability cannot be judged at all.",
        },
        {
          id: "pilot",
          label: "Run a pilot and see whether satisfaction improves",
          correct: false,
          feedback:
            "Not quite yet. A pilot without a named job has no failure condition; whatever happens can be read as success. Name the job, then pilot it.",
        },
        {
          id: "decline",
          label: "Decline: outcome claims are always empty",
          correct: false,
          feedback:
            "Not quite. The claim is not evidence, but it is not disproof either. The skilled move extracts the mechanism before judging it.",
        },
      ],
      remediationAnchor: "AIA-4-LESSON-005",
    },
  ],
};
