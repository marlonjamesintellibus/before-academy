/**
 * Phase 1 seed content: "AI, Automation and Traditional Software".
 * Transformed faithfully from the approved learner content package
 * (phase1-content/01-core-lessons, 02-diagrams-and-activities, 05-supporting-content).
 * Learner-facing copy is copied verbatim; internal validation notes, YAML metadata,
 * presentation-reuse sections, micro-checks, and reflection prompts are not seeded.
 */

import type { SectionSeed } from "@/features/content/types";

export const sectionSeed: SectionSeed = {
  pathway: {
    slug: "ai-awareness",
    title: "AI Awareness",
    description:
      "Being able to tell what's underneath the AI label changes real decisions: what you buy, what you trust, and what you expect a product to do.",
  },
  section: {
    slug: "ai-automation-software",
    title: "AI, Automation and Traditional Software",
    description:
      "Learn what actually separates artificial intelligence from automation and ordinary software - and how to tell which one you're looking at.",
    position: 1,
  },
  blocks: [
    {
      type: "hook",
      id: "P1-LESSON-001-HOOK",
      prompt: "Your bank flags a purchase as suspicious. Is that AI?",
      choices: ["Yes", "No", "Can't tell"],
      reveal:
        "It might be - and by the end of this section you'll know how to tell. That's the whole skill here: looking past what a system does to how it does it.",
    },
    {
      type: "why_it_matters",
      id: "P1-LESSON-001-WHY",
      body: [
        {
          type: "p",
          text: "Right now, \"AI\" is a label attached to everything from chatbots to toothbrushes. When you can tell what's actually underneath, three things change: what you're willing to pay for, what you're willing to trust, and what you expect when something goes wrong.",
        },
      ],
    },
    {
      type: "objectives",
      id: "P1-LESSON-001-OBJECTIVES",
      items: [
        "Describe traditional software, automation, and AI in your own words",
        "Explain how automation and AI relate - and why they're not the same thing",
        "Tell rule-based results apart from pattern-based ones",
        "Classify real systems, including products that combine several approaches",
        "Recognize when a description doesn't give you enough to judge",
      ],
    },
    {
      type: "concept",
      id: "P1-LESSON-002",
      title: "Traditional software",
      quick: [
        {
          type: "p",
          text: "[[Traditional software]] follows rules that people wrote. A programmer decides, in advance, exactly what should happen: if this, then that. Given the same input, it produces the same output - every single time.",
        },
        {
          type: "analogy",
          text: "Think of a vending machine. Press B4, get the same snack, today and next year. A calculator works this way. So does the form that refuses your sign-up until the email field has an @ in it. Nothing is being figured out in the moment. The behaviour was written down before you ever showed up - and that predictability is exactly what makes this kind of software dependable.",
          boundary:
            "Complexity doesn't change the nature of the thing - a bigger vending machine is still a vending machine.",
        },
      ],
      explore: {
        label: "Explore Further",
        minutes: 1,
        body: [
          {
            type: "p",
            text: "Here's where it gets interesting: written rules can be enormously complicated and still be written rules.",
          },
          {
            type: "p",
            text: "A tax calculator handles thousands of conditions - income bands, deductions, exceptions to the exceptions. It feels intelligent. It isn't guessing, though. Every one of those conditions was authored by a person, and the same tax return produces the same result every time. Complexity doesn't change the nature of the thing - a bigger vending machine is still a vending machine.",
          },
          {
            type: "p",
            text: "Two more everyday cases: a password-strength checker turns green because your password meets criteria someone listed. A notification arrives at nine because someone scheduled it for nine.",
          },
          {
            type: "p",
            text: "What traditional software does well: repeat, reliably, at any scale. What it doesn't do: handle anything nobody wrote a rule for. If a situation wasn't anticipated, it fails or asks a human - it can't improvise.",
          },
        ],
      },
      deeper: {
        label: "Go Deeper",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "The technical name for this approach is a [[rule-based system]]: decisions made by written if-then rules. The result is a [[deterministic output]] - always identical for the same input. When your banking app shows a different balance today than yesterday, that's not the software behaving differently; the input changed, because money moved.",
          },
          {
            type: "p",
            text: "One more thing worth knowing, because it reframes everything ahead: traditional software is the foundation AI products stand on. The interface you tap, the database storing your account, the security checking your password, the workflow moving your request along - all written rules. When we get to AI, you'll see it arrives as one component inside this rule-based scaffolding, not as a replacement for it.",
          },
          {
            type: "p",
            text: "So when you're trying to recognize traditional software in the wild, look for two signals: the behaviour repeats exactly, and someone could, in principle, write the full instruction list down.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "P1-LESSON-003",
      title: "Automation",
      quick: [
        {
          type: "p",
          text: "[[Automation]] means using technology to run or connect repeatable tasks with less manual effort. Something happens - a form gets submitted, a date arrives - and the next steps run on their own.",
        },
        {
          type: "analogy",
          text: "Picture a row of dominoes. One event tips the first piece, and the whole chain follows without anyone pushing each one. That's what happens when you buy something online and a receipt lands in your inbox seconds later. Nobody typed that email. A trigger fired, an action ran.",
          boundary:
            "The dominoes don't decide anything. The setup was decided in advance - the chain reacts, it doesn't judge.",
        },
        {
          type: "p",
          text: "Notice what automation describes: how the work flows. It says nothing about how smart any step is - and that gap is where most AI confusion lives.",
        },
      ],
      explore: {
        label: "Explore Further",
        minutes: 1,
        body: [
          {
            type: "p",
            text: "An automated process has three parts. A [[trigger]] - the event that starts things (a submission, a schedule, a threshold crossed). A condition - an optional check along the way (only if the amount is over $500). And actions - the steps that run. Chain a few together and you have a [[workflow]].",
          },
          {
            type: "p",
            text: "You're surrounded by these. A recurring report that generates itself every Monday. A support ticket that routes to the right team based on which category the customer picked. An alert that fires when server storage passes 90%. Payroll running on the 25th of every month.",
          },
          {
            type: "p",
            text: "Automation feels intelligent because things happen without you. But look at those dominoes again: they don't decide anything. The setup was decided in advance - the chain reacts, it doesn't judge. Here's the sentence to keep: automation is not the same thing as AI, and automation may contain AI. Those two facts sit together comfortably.",
          },
        ],
      },
      deeper: {
        label: "Go Deeper",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "So when does automation involve AI? When one of the steps in the chain makes a pattern-based judgment rather than following a written rule.",
          },
          {
            type: "p",
            text: "Compare two versions of the same workflow. Version one: applications route to a reviewer based on which checkbox the applicant ticked. Trigger, rule, action - pure automation, no AI anywhere. Version two: applications route based on a system that reads the free-text description and predicts which team fits best. Same trigger, same action at the end - but the middle step now involves a learned judgment. The dominoes are still dominoes; a person or an AI can set them up, and one of the pieces can itself be an AI step.",
          },
          {
            type: "p",
            text: 'That\'s why "is it automated?" and "does it use AI?" are two separate questions, and why answering the first tells you nothing about the second. To recognize automation in the wild, listen for repetition and triggers: "every month", "whenever a form comes in", "as soon as payment clears". Then ask the second question separately: is any step in that chain making a learned judgment - and does the description actually say?',
          },
        ],
      },
    },
    {
      type: "concept",
      id: "P1-LESSON-004",
      title: "Artificial intelligence",
      quick: [
        {
          type: "p",
          text: "[[Artificial intelligence]] means systems that find patterns in data to classify, predict, or generate things - instead of only following written rules.",
        },
        {
          type: "analogy",
          text: 'The best everyday comparison is a weather forecast. A forecast is built from patterns in years of past weather. It speaks in likelihoods - "70% chance of rain" - and it\'s genuinely useful while sometimes being wrong. Nobody wrote a rule that says "clouds like these mean rain on Tuesdays." The pattern was learned from many examples.',
          boundary:
            "The forecast doesn't know about your picnic. It detects patterns and produces likelihoods - there's no comprehension in there, however fluent the output sounds.",
        },
        {
          type: "p",
          text: "That's the core difference from everything you've seen so far: traditional software follows rules people wrote; AI systems apply patterns learned from data. And like a forecast, their outputs can vary - and can miss.",
        },
      ],
      explore: {
        label: "Explore Further",
        minutes: 1.5,
        body: [
          {
            type: "p",
            text: "What do pattern-based systems actually do all day? Five jobs cover most of it:",
          },
          {
            type: "ul",
            items: [
              "Predicting - estimating something not directly known, like your arrival time in traffic.",
              "Classifying - sorting things into categories, like flagging an email as spam.",
              "Recommending - ranking what you're likely to want, like a product feed.",
              "Recognizing - identifying what something is, like the words in your voice message.",
              "Generating - producing new content, like a chatbot writing free-form text.",
            ],
          },
          {
            type: "p",
            text: "Notice how quiet most of that is. No robot, no conversation, no face. A fraud flag on your card is AI doing its job in complete silence.",
          },
          {
            type: "p",
            text: "Now the part that trips people up: a spam filter will sometimes put a real message in your junk folder. That's not the filter breaking - it's a [[pattern-based system]] operating exactly as designed. Patterns produce likelihoods, not certainties, so the outputs can vary and can be wrong. Useful and fallible at the same time. The same is true when a chatbot answers the same question two different ways: variability is the nature of the mechanism, not a defect in it.",
          },
          {
            type: "p",
            text: "And the forecast comparison carries one more lesson. The forecast doesn't know about your picnic. It detects patterns and produces likelihoods - there's no comprehension in there, however fluent the output sounds. AI systems detect, classify, and generate; they don't understand the way you do.",
          },
        ],
      },
      deeper: {
        label: "Go Deeper",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "A few distinctions make everything else clearer.",
          },
          {
            type: "p",
            text: "Training versus using. Before an AI system ships, it's shown many examples - that's [[training]], and the examples are its training data. Training produces a [[model]]: the learned pattern-map the system uses from then on. When you use the product, you're giving that trained model an input and receiving an output. You are not retraining it with every tap. Collecting your data, and later updating the product or the model, are separate steps that may or may not happen - a speech recognizer doesn't rewire itself with each sentence you dictate; improvements arrive as updates.",
          },
          {
            type: "p",
            text: 'The model versus the product. The model is one component. Around it sits everything from the traditional-software lesson: interface, database, security, workflows. "An AI product" is really a product with an AI component inside rule-based scaffolding.',
          },
          {
            type: "p",
            text: "Claims versus evidence. \"AI-powered\" on a box tells you what the marketing team chose, not how the system works. The question that cuts through: what patterns would this system have learned, from what data, to do this job? If a description can't support that question, you don't yet know it's AI - and saying so is a skill, not a shrug.",
          },
        ],
      },
    },
    {
      type: "concept",
      id: "P1-LESSON-005",
      title: "Compare the three - and how they combine",
      quick: [
        {
          type: "p",
          text: "Put the three ideas next to each other and the differences sharpen.",
        },
        {
          type: "p",
          text: "How each works. Traditional software follows rules people wrote. Automation chains tasks together so they run with less manual effort. AI applies patterns learned from data.",
        },
        {
          type: "p",
          text: "What each produces. Written rules give you the same output for the same input, every time. An automated chain runs the same steps on the same trigger. Pattern-based systems produce likelihoods - outputs that can vary, and can be wrong.",
        },
        {
          type: "p",
          text: "Where each struggles. Rules can't handle what nobody anticipated. Automation can't judge - it reacts. AI can misjudge - usefully right most of the time, confidently wrong some of the time.",
        },
        {
          type: "p",
          text: "What only AI does. Handle inputs nobody wrote a rule for, and generate new content. No rulebook writes your email reply from scratch.",
        },
        {
          type: "p",
          text: "Here's the twist that makes classification a real skill: almost nothing you use is only one of these.",
        },
        {
          type: "analogy",
          text: "A restaurant is the useful picture. The menu is the interface - what you see and choose from. The kitchen line is the automation - orders flow through stations in a set sequence. The chef's judgment is the pattern-based part, with a person tasting before plates go out. One meal, several mechanisms.",
          boundary:
            "And from your table, you can't see the kitchen - which is exactly why you often can't classify a product from the outside.",
        },
        {
          type: "p",
          text: "Walk through one real case. You send a message to a company's support platform:",
        },
        {
          type: "ul",
          items: [
            "The interface takes your message.",
            "Traditional software records the request - written rules, stored data.",
            "Automation routes it - a trigger fires, the ticket moves.",
            "An AI component classifies the topic and drafts a summary - learned patterns, likelihood-based.",
            "A person reads, decides, and answers - [[human review]].",
          ],
        },
        {
          type: "p",
          text: 'Five layers, one product. The honest label for the whole thing is a combination - and if someone asks "is that platform AI?", the skilled answer names the layer: the classification step is AI-assisted; the rest isn\'t.',
        },
      ],
      explore: {
        label: "More combined systems",
        minutes: 2,
        body: [
          {
            type: "p",
            text: "Six quick cases across everyday life. For each: the rule-based part, the automated part, the AI part - and what you still can't tell from outside.",
          },
          {
            type: "p",
            text: 'A banking app. Rules: your balance, transfers, statements. Automation: the scheduled transfer on the 1st. AI: the fraud-risk flag on an unusual purchase. Still unknown: whether the "spending insights" screen is learned patterns or fixed category rules. One AI feature doesn\'t make it "an AI app" - it makes it a product with one AI-assisted step.',
          },
          {
            type: "p",
            text: 'A navigation app. Rules: road maps and turn logic. Automation: rerouting fires when you miss a turn. AI: predicted arrival time learned from traffic patterns. Still unknown: how much of "fastest route" is live prediction versus fixed heuristics.',
          },
          {
            type: "p",
            text: 'A learning platform. Rules: enrolment, progress records, certificates. Automation: the reminder email when you\'ve been away a week. AI: possibly the "recommended next course" ranking. Still unknown: recommendations could be a written rule ("everyone who finishes A sees B") - the label alone can\'t tell you.',
          },
          {
            type: "p",
            text: "A clinic's patient portal. Rules: appointment records, prescription lists. Automation: the reminder message three days before your visit. AI: possibly a symptom-checker that suggests likely causes. Still unknown: a symptom checker can be a fixed decision tree - a chat window proves nothing either way.",
          },
          {
            type: "p",
            text: 'An online store. Rules: prices, stock counts, checkout. Automation: the receipt and shipping notifications. AI: the "recommended for you" ranking that varies by person. Still unknown: whether search results are ranked by learned relevance or by fixed fields like price and popularity.',
          },
          {
            type: "p",
            text: 'A workplace email suite. Rules: folders, signatures, storage. Automation: the out-of-office auto-reply. AI: spam filtering and suggested replies. Still unknown: which "smart" features are learned and which are templates.',
          },
          {
            type: "p",
            text: 'The pattern across all six: classify the feature, not the brand. "Which parts of this product involve AI?" is a better question than "is this product AI?"',
          },
        ],
      },
    },
    {
      type: "diagram",
      id: "P1-DGM-001",
      title: "How rules, automation and AI work together",
      claim:
        "AI is usually one component inside a larger system, alongside rules, automation, and people - not a replacement for them.",
      altText:
        "Five stacked layers of a support request: interface, traditional software, automation, AI component, human review.",
      longText:
        "A support message travels through five layers, top to bottom. First, the interface takes your message. Second, traditional software records the request - written rules and stored data. Third, automation routes it: a trigger fires and the ticket moves to the right queue. Fourth, an AI component classifies the topic and drafts a summary - learned patterns producing a likelihood-based judgment. Fifth, human review: a person reads, decides, and answers. Each layer hands the message to the next; no layer replaces another. Only the fourth layer is AI - one component inside a larger system alongside rules, automation, and people.",
      layers: [
        { id: "interface", label: "Interface", description: "takes your message" },
        {
          id: "traditional-software",
          label: "Traditional software",
          description: "records the request",
        },
        { id: "automation", label: "Automation", description: "routes it" },
        { id: "ai-component", label: "AI component", description: "classifies and summarizes" },
        { id: "human-review", label: "Human review", description: "a person decides" },
      ],
    },
    {
      type: "misconception",
      id: "P1-LESSON-005-MISCONCEPTION",
      misconceptionId: "M1",
      claim: "It's complex and impressive, so it must be AI.",
      correction:
        "It's a reasonable inference - complexity and intelligence feel alike, and marketing blurs them on purpose. But a tax calculator handling thousands of conditions is still written rules, start to finish, with identical output for identical input. Impressiveness tells you about the engineering effort; it tells you nothing about the mechanism. A bigger vending machine is still a vending machine.",
    },
    {
      type: "activity_cta",
      id: "P1-LESSON-005-ACTIVITY-CTA",
      body: "Time to use all of it. The activity ahead gives you ten real scenarios to classify - evidence first, labels second.",
    },
    {
      type: "check_cta",
      id: "P1-LESSON-005-CHECK-CTA",
      body: "Want to practice first? Try a quick knowledge check - every answer, right or wrong, comes with the reasoning.",
    },
    {
      type: "takeaway",
      id: "P1-LESSON-005-TAKEAWAY",
      body: [
        {
          type: "p",
          text: 'Rules are written; automation chains tasks; AI learns patterns - and most real products combine them. When a description hides the mechanism, "not enough information" is the accurate answer, and asking how it works is the skill.',
        },
      ],
    },
    {
      type: "next_step",
      id: "P1-LESSON-005-NEXT-STEP",
      body: "Already confident? Go straight to the assessment. Same rules, and you can return to the lesson anytime.",
    },
  ],
  glossary: [
    {
      term: "Artificial intelligence",
      definition:
        "Systems that find patterns in data to classify, predict, or generate things - instead of only following written rules.",
      example: "A spam filter learning what junk mail tends to look like.",
      chip: true,
    },
    {
      term: "Traditional software",
      definition:
        "Software that follows rules people wrote, so the same input always produces the same output.",
      example: "A calculator - same numbers, same total, every time.",
      chip: true,
    },
    {
      term: "Automation",
      definition: "Using technology to run or connect repeatable tasks with less manual effort.",
      example: "A receipt email sending itself the moment you buy something.",
      chip: true,
    },
    {
      term: "rule-based system",
      definition: "A system that decides using written if-then rules.",
      example: '"If the password is under 12 characters, reject it."',
      chip: true,
    },
    {
      term: "pattern-based system",
      definition: "A system that decides using patterns learned from many examples.",
      example: "A filter flagging messages that resemble known spam.",
      chip: true,
    },
    {
      term: "deterministic output",
      definition: "A result that is always the same for the same input.",
      example: "The same tax return producing the same refund figure every time.",
      chip: true,
    },
    {
      term: "probabilistic output",
      definition: "A result based on likelihood, which can vary or be wrong.",
      example: '"70% chance of rain" - useful, and sometimes it stays dry.',
      chip: true,
    },
    {
      term: "Machine learning",
      definition:
        "A way of building AI where systems learn patterns from examples rather than being given rules.",
      example: "Showing a system thousands of labelled photos so it can recognize dogs.",
      chip: false,
    },
    {
      term: "model",
      definition: "The learned pattern-map an AI system uses to make its outputs.",
      example: "The trained component inside a speech recognizer that turns sound into words.",
      chip: true,
    },
    {
      term: "algorithm",
      definition: "A step-by-step procedure a computer follows to do a task.",
      example: "The steps a sort feature follows to put names in order.",
      chip: true,
    },
    {
      term: "training",
      definition: "Showing a system many examples so it can learn patterns.",
      example: 'Feeding a filter millions of emails labelled "spam" or "not spam."',
      chip: true,
    },
    {
      term: "Data",
      definition: "The information systems store, process, or learn from.",
      example: "Your order history; the past weather behind a forecast.",
      chip: false,
    },
    {
      term: "Prediction",
      definition: "A system's best estimate about something it hasn't been told directly.",
      example: "An arrival time of 5:42 in traffic.",
      chip: false,
    },
    {
      term: "Classification",
      definition: "Sorting things into categories, like marking an email as spam or not spam.",
      chip: false,
    },
    {
      term: "Generative AI",
      definition:
        "AI that creates new content - text, images, or audio - based on learned patterns.",
      example: "A chat assistant writing a free-form answer, worded differently each time.",
      chip: true,
    },
    {
      term: "Prompt",
      definition: "The input or instruction you give an AI system.",
      example: 'Typing "summarize this meeting in three bullet points."',
      chip: false,
    },
    {
      term: "Output",
      definition: "What a system produces in response to an input.",
      example: "The total from a calculator; the reply from a chat assistant.",
      chip: false,
    },
    {
      term: "Hallucination",
      definition: "When generative AI produces confident-sounding output that is false.",
      example: "An assistant citing a book that doesn't exist.",
      chip: false,
    },
    {
      term: "Bias",
      definition:
        "When a system's outputs unfairly favour or disadvantage certain groups or answers, often reflecting its data.",
      example: "A hiring screen scoring applicants unevenly because its examples were uneven.",
      chip: false,
    },
    {
      term: "human review",
      definition: "A person checking or deciding on a system's output before it counts.",
      example: "A support agent reading an AI-drafted summary before replying.",
      chip: true,
    },
    {
      term: "AI-assisted system",
      definition:
        "A product where AI handles part of the work while rules, automation, or people handle the rest.",
      example: "A banking app whose one AI part is the unusual-purchase flag.",
      chip: true,
    },
    {
      term: "trigger",
      definition:
        "The event that starts an automated step - like a form being submitted or a date arriving.",
      example: "Payment clearing, which fires the receipt email.",
      chip: true,
    },
    {
      term: "workflow",
      definition: "A chain of steps that runs in order to get a task done.",
      example: "Submit form → check amount → route to approver → notify.",
      chip: true,
    },
  ],
};
