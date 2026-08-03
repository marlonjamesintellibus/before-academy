import type { ActivitySeed } from "@/features/content/activity-types";

/**
 * Designed interactions for AIA-5, AIA-6 and AIA-7 (docs/content/content-map.md).
 *
 * Would You Trust This? is the pathway's most transferable interaction: the
 * three-way use / review / refuse call on outputs the learner cannot fully
 * verify. Myth or Reality judges claims rather than systems. The AIA-7
 * self-check is transfer: given a live situation, pick the skilled move.
 */
export const aia5ActivitySeed: ActivitySeed = {
  id: "AIA-5-ACT-001",
  title: "Would You Trust This?",
  intro:
    "Five outputs land on your desk. For each: use it as it stands, review it first, or keep it away from this job. The route follows from consequence and reversibility, never from how good the output looks.",
  instructions:
    "There is a best-supported route for each. The feedback names the property that decided it.",
  scenarios: [
    {
      id: "AIA-5-ACT-001-S01",
      position: 1,
      title: "The brainstorm list",
      body: "An assistant produces twenty name ideas for an internal project. You need three to shortlist.",
      difficulty: "foundational",
      clue: "you are the filter, and a bad idea costs nothing",
      prompt: "What do you do with it?",
      options: [
        {
          id: "use",
          label: "Use as it stands",
          correct: true,
          feedback:
            "Correct. You are selecting from it, so you are the review. A weak idea costs nothing and is discarded on sight.",
        },
        {
          id: "review",
          label: "Review first",
          correct: false,
          feedback:
            "Heavier than needed. Shortlisting is itself the review; adding a checking step to a brainstorm buys nothing.",
        },
        {
          id: "refuse",
          label: "Do not use here",
          correct: false,
          feedback:
            "Not quite. Idea generation is close to the ideal case: reversible, checkable at a glance, and nobody is affected by a dud.",
        },
      ],
      remediationAnchor: "AIA-5-LESSON-005",
    },
    {
      id: "AIA-5-ACT-001-S02",
      position: 2,
      title: "The client email",
      body: "An assistant drafts a reply to an unhappy client. The tone is right and it reads well.",
      difficulty: "foundational",
      clue: "a person is affected, so a person checks first",
      prompt: "What do you do with it?",
      options: [
        {
          id: "review",
          label: "Review first",
          correct: true,
          feedback:
            "Correct. A reply that reaches a client carries your name and their relationship. Reading well changes nothing about who is accountable.",
        },
        {
          id: "use",
          label: "Use as it stands",
          correct: false,
          feedback:
            "Not quite. The quality of the writing is not the deciding property. A person is affected by this output, so a person checks it first.",
        },
        {
          id: "refuse",
          label: "Do not use here",
          correct: false,
          feedback:
            "Stricter than needed. Drafting is a fitting job here; it is sending without review that would not be.",
        },
      ],
      remediationAnchor: "AIA-5-LESSON-005",
    },
    {
      id: "AIA-5-ACT-001-S03",
      position: 3,
      title: "The cited statistics",
      body: "A drafted report section includes three statistics with sources. You did not supply them.",
      difficulty: "applied",
      clue: "specifics are cheap to compose and expensive to verify",
      prompt: "What do you do with the statistics?",
      options: [
        {
          id: "review",
          label: "Check each against its source before the section ships",
          correct: true,
          feedback:
            "Correct. Names, figures and citations are the highest-risk parts of generated text: composed as fluently as everything else, checked far less often.",
        },
        {
          id: "use",
          label: "Keep them: the sources are named, so they are checkable",
          correct: false,
          feedback:
            "Not quite. Checkable is not checked. A composed citation looks identical to a real one until someone follows it.",
        },
        {
          id: "refuse",
          label: "Cut all statistics from generated drafts",
          correct: false,
          feedback:
            "Blunter than needed. The draft is fine; the specifics need verification. Cutting them discards the useful work along with the risk.",
        },
      ],
      remediationAnchor: "AIA-5-LESSON-003",
    },
    {
      id: "AIA-5-ACT-001-S04",
      position: 4,
      title: "The dosage question",
      body: "A colleague suggests using a chat assistant to answer patients' medication-dosage questions on the clinic's website.",
      difficulty: "applied",
      clue: "harm would land before any review could catch it",
      prompt: "What do you do?",
      options: [
        {
          id: "refuse",
          label: "Do not use here",
          correct: true,
          feedback:
            "Correct. A wrong dosage answer harms someone before any review could intervene, and a likelihood-based mechanism cannot promise not to produce one.",
        },
        {
          id: "review",
          label: "Use it with a clinician reviewing answers weekly",
          correct: false,
          feedback:
            "Not quite. Review after the fact is review after the harm. Where the damage outruns the check, the check is not a control.",
        },
        {
          id: "use",
          label: "Use it: dosage information is public anyway",
          correct: false,
          feedback:
            "Not quite. The information being public does not make a confidently wrong answer safe. Fluency would make it more dangerous, not less.",
        },
      ],
      remediationAnchor: "AIA-5-LESSON-005",
    },
    {
      id: "AIA-5-ACT-001-S05",
      position: 5,
      title: "The confident summary",
      body: "An assistant summarises a fifty-page contract into one page for tomorrow's negotiation.",
      difficulty: "challenging",
      clue: "what was left out is invisible, and tomorrow it matters",
      prompt: "What do you do with it?",
      options: [
        {
          id: "review",
          label: "Use it to navigate, and verify every clause you will rely on",
          correct: true,
          feedback:
            "Correct. The summary is a map, not the territory. Omission is a judgment you cannot see, so anything you will lean on tomorrow gets read at the source.",
        },
        {
          id: "use",
          label: "Rely on it: summarising is what these tools do best",
          correct: false,
          feedback:
            "Not quite. A summary decides what to leave out, and in a negotiation the omitted clause is precisely the expensive one.",
        },
        {
          id: "refuse",
          label: "Read all fifty pages and skip the summary",
          correct: false,
          feedback:
            "Safe but wasteful. The summary genuinely helps you navigate; the discipline is verifying what you rely on rather than refusing the help.",
        },
      ],
      remediationAnchor: "AIA-5-LESSON-002",
    },
  ],
};

export const aia6ActivitySeed: ActivitySeed = {
  id: "AIA-6-ACT-001",
  title: "Myth or Reality",
  intro:
    "Six claims you will actually hear this year. Judge each: accurate, misleading, or not answerable as stated.",
  instructions:
    "The feedback names the evidence that settles each claim, which is the part worth remembering after the claim itself has changed.",
  scenarios: [
    {
      id: "AIA-6-ACT-001-S01",
      position: 1,
      title: "The objectivity claim",
      body: "A machine has no opinions, so its answers are neutral.",
      difficulty: "foundational",
      clue: "the influence arrived earlier, in the examples",
      prompt: "Your judgment?",
      options: [
        {
          id: "misleading",
          label: "Misleading",
          correct: true,
          feedback:
            "Correct. No motive is not no influence. The system reproduces what its examples contained, and the examples are records of a world with patterns in it.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. The premise is true: machines have no opinions. The conclusion does not follow, because neutrality would require neutral examples.",
        },
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: false,
          feedback:
            "This one is answerable: the claim's logic does not hold regardless of which system it is about. Inherited pattern is not neutrality.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-003",
    },
    {
      id: "AIA-6-ACT-001-S02",
      position: 2,
      title: "The replacement claim",
      body: "This technology will replace accountants within five years.",
      difficulty: "applied",
      clue: "a role is a bundle of jobs, and the claim treats it as one",
      prompt: "Your judgment?",
      options: [
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: true,
          feedback:
            "Correct. A role is a bundle of jobs with different costs of error. Some suit the mechanism, some do not, and the claim cannot be judged until it says which.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. Some accounting jobs are checkable and reversible; others carry liability and judgment. The sweeping version cannot be right as stated.",
        },
        {
          id: "misleading",
          label: "Misleading",
          correct: false,
          feedback:
            "Close, but calling it misleading concedes it was answerable. The stronger move is naming what is missing: which jobs, at what cost of error.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-003",
    },
    {
      id: "AIA-6-ACT-001-S03",
      position: 3,
      title: "The consistency claim",
      body: "Ask it the same question twice and you will get the same answer, like any software.",
      difficulty: "foundational",
      clue: "likelihood-based output varies by design",
      prompt: "Your judgment?",
      options: [
        {
          id: "misleading",
          label: "Misleading",
          correct: true,
          feedback:
            "Correct. Like any software is the tell: written rules repeat exactly, likelihood-based systems vary by design. A lifetime of deterministic software makes this one feel true.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. That expectation comes from rule-based software, where it holds. Generative systems select likely continuations, and likely is not identical.",
        },
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: false,
          feedback:
            "The claim is specific enough to judge: for the systems being discussed, variation between runs is the designed behaviour.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-002",
    },
    {
      id: "AIA-6-ACT-001-S04",
      position: 4,
      title: "The autonomy claim",
      body: "These systems run on their own now; people are out of the loop.",
      difficulty: "applied",
      clue: "the people are upstream: data, objectives, thresholds",
      prompt: "Your judgment?",
      options: [
        {
          id: "misleading",
          label: "Misleading",
          correct: true,
          feedback:
            "Correct. Running unsupervised at the moment you look is not the same as unshaped by people. Someone chose the data, the objective, and what happens with the output.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. Some systems do run without live supervision, which is what makes the claim feel true. The human influence moved upstream; it did not leave.",
        },
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: false,
          feedback:
            "Judgeable as stated: whatever the system, its data, objective and thresholds were chosen by people, so out of the loop is wrong on its face.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-002",
    },
    {
      id: "AIA-6-ACT-001-S05",
      position: 5,
      title: "The accuracy claim",
      body: "Our fraud model is 99 percent accurate, so you can rely on its calls.",
      difficulty: "challenging",
      clue: "an average says nothing about which cases the misses were",
      prompt: "Your judgment?",
      options: [
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: true,
          feedback:
            "Correct. The figure may be real and the conclusion still wrong: an average hides which cases the misses were, and rare cases are usually where they live. Ask about the misses.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. Even a true 99 percent does not license rely on its calls. If fraud is rare, a model that says fine to everything scores well and catches nothing.",
        },
        {
          id: "misleading",
          label: "Misleading",
          correct: false,
          feedback:
            "Close. But the number itself may be honest; what is missing is the breakdown that would make it meaningful. Name the missing evidence rather than the motive.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-003",
    },
    {
      id: "AIA-6-ACT-001-S06",
      position: 6,
      title: "The impressiveness claim",
      body: "You should see what it produced; something that good has to be real intelligence.",
      difficulty: "foundational",
      clue: "quality of output is not evidence about mechanism",
      prompt: "Your judgment?",
      options: [
        {
          id: "misleading",
          label: "Misleading",
          correct: true,
          feedback:
            "Correct. Impressive output tells you the job was done well, not how. A calculator out-multiplies every human alive; the question is always where the behaviour came from.",
        },
        {
          id: "accurate",
          label: "Accurate",
          correct: false,
          feedback:
            "Not quite. This is the oldest transfer error in the subject: reading quality as comprehension. Mechanism and output quality are separate questions.",
        },
        {
          id: "depends",
          label: "Not answerable as stated",
          correct: false,
          feedback:
            "The inference is judgeable and does not hold: however good the output, quality alone cannot distinguish learned patterns from rules from luck.",
        },
      ],
      remediationAnchor: "AIA-6-LESSON-002",
    },
  ],
};

export const aia7ActivitySeed: ActivitySeed = {
  id: "AIA-7-ACT-001",
  title: "The Transfer Check",
  intro:
    "Four situations from real working weeks. No labels, no hints: just the skilled move. This is the pathway used, rather than recited.",
  instructions:
    "Each situation has one move that applies what AI Awareness taught. The feedback names which skill it drew on.",
  scenarios: [
    {
      id: "AIA-7-ACT-001-S01",
      position: 1,
      title: "The demo that wows",
      body: "In a vendor demo, the tool answers every question fluently. A colleague whispers: this thing is smarter than half our team.",
      difficulty: "foundational",
      clue: "fluency is the strongest illusion in the field",
      prompt: "The skilled move?",
      options: [
        {
          id: "mechanism",
          label: "Ask what it learned, from what data, to produce those answers",
          correct: true,
          feedback:
            "Correct. That is the reading skill applied at the exact moment it earns its keep: when fluency is doing the persuading.",
        },
        {
          id: "agree",
          label: "Agree: performance like that speaks for itself",
          correct: false,
          feedback:
            "Not quite. Performance in a demo speaks for the demo. Curated questions plus fluent output is precisely the situation the mechanism question was built for.",
        },
        {
          id: "dismiss",
          label: "Dismiss it: demos are marketing",
          correct: false,
          feedback:
            "Not quite. Cynicism is not judgment. The demo is neither proof nor disproof; the mechanism question converts it into evidence.",
        },
      ],
      remediationAnchor: "AIA-7-LESSON-002",
    },
    {
      id: "AIA-7-ACT-001-S02",
      position: 2,
      title: "The policy vacuum",
      body: "Your team has quietly started pasting client material into a free chat tool. No policy says anything either way.",
      difficulty: "applied",
      clue: "what may safely go in is a responsible-use question",
      prompt: "The skilled move?",
      options: [
        {
          id: "raise",
          label: "Raise it: where client material goes is a decision, not a default",
          correct: true,
          feedback:
            "Correct. You recognised the boundary of awareness: knowing how systems work is not knowing what may safely be given to them. Naming the gap is the transfer.",
        },
        {
          id: "fine",
          label: "Say nothing: the tool is only drafting text",
          correct: false,
          feedback:
            "Not quite. The job being small does not make the input safe. What enters a system is a separate question from what the system does.",
        },
        {
          id: "ban",
          label: "Push for a ban on the tools",
          correct: false,
          feedback:
            "Blunter than the situation needs. The gap is a missing decision about inputs, not the existence of the tools.",
        },
      ],
      remediationAnchor: "AIA-7-LESSON-003",
    },
    {
      id: "AIA-7-ACT-001-S03",
      position: 3,
      title: "The explainer request",
      body: "Your manager asks you to explain to a client, in two minutes, whether their new scheduling product really uses AI.",
      difficulty: "applied",
      clue: "the explanation works without the label",
      prompt: "The skilled move?",
      options: [
        {
          id: "explain",
          label:
            "Describe what it does, where the behaviour came from, and what being wrong would cost",
          correct: true,
          feedback:
            "Correct. Three sentences, no label required. If that is enough for the client's decision, the word AI was never needed, which is the surest sign you have the skill.",
        },
        {
          id: "check-site",
          label: "Read the product's website and relay its description",
          correct: false,
          feedback:
            "Not quite. The website is the claim, and relaying a claim is not explaining. The mechanism questions turn the description into an answer.",
        },
        {
          id: "defer",
          label: "Say it needs a technical specialist",
          correct: false,
          feedback:
            "Underselling yourself. Whether it uses learned behaviour is readable from what the product does; that reading is exactly what this pathway built.",
        },
      ],
      remediationAnchor: "AIA-7-LESSON-002",
    },
    {
      id: "AIA-7-ACT-001-S04",
      position: 4,
      title: "The week after",
      body: "The course is done. Next Tuesday, a headline says a new model passed a famous exam, and a colleague forwards it: thoughts?",
      difficulty: "challenging",
      clue: "the habit is the skill; the reviews keep it",
      prompt: "The skilled move?",
      options: [
        {
          id: "habit",
          label: "Apply the questions to the headline, and take the two-minute review this week",
          correct: true,
          feedback:
            "Correct on both counts. The headline is a fresh case for the same three questions, and retrieval this week is what keeps the questions available next month.",
        },
        {
          id: "reread",
          label: "Reread the lesson material to stay sharp",
          correct: false,
          feedback:
            "Not quite. Rereading feels productive and does little; retrieval is what makes it stick. The review exists for exactly this moment.",
        },
        {
          id: "done",
          label: "Consider the topic finished and move on",
          correct: false,
          feedback:
            "Not quite. The skill is a habit of noticing, and habits fade without use. Two minutes of retrieval is the cheapest maintenance there is.",
        },
      ],
      remediationAnchor: "AIA-7-LESSON-004",
    },
  ],
};
