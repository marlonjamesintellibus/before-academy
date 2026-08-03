import type { LessonBlock, RichText, SectionSeed } from "./types";

/**
 * Content-lint v1 (Eng §14; docs/content/governance.md). Gates the seed
 * pipeline the way code tests gate merges. Checks: structure, banned
 * terminology in learner copy, chip resolution, feedback-formula prerequisites.
 * Human gates (standalone test, SME review) stay human.
 */

/** Banned in learner copy (phase1-content/00-content-foundation/voice-and-tone.md). */
const BANNED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\b(simply|obvious(ly)?|of course)\b/i, reason: "minimizer" },
  { pattern: /\beasy\b(?! to mix up)/i, reason: "minimizer (exception: 'easy to mix up')" },
  { pattern: /\b(test|exam|quiz)\b/i, reason: "school-anxiety term" },
  { pattern: /\bfail(ed|ing|ure)?\b/i, reason: "'fail' never appears in learner copy" },
  {
    pattern: /\b(revolutionary|cutting-edge|game-changing|dive into|unlock the power)\b/i,
    reason: "marketing register",
  },
  {
    pattern: /\bAI (thinks|knows|understands|believes|wants|feels)\b/i,
    reason: "anthropomorphic AI verb",
  },
  { pattern: /—/, reason: "em dash (style directive: use other punctuation)" },
];

export interface LintIssue {
  blockId: string;
  message: string;
}

function richTextStrings(body: RichText): string[] {
  return body.flatMap((node) => {
    if (node.type === "p") return [node.text];
    if (node.type === "ul") return node.items;
    return [node.text, node.boundary];
  });
}

function learnerStrings(block: LessonBlock): string[] {
  switch (block.type) {
    case "hook":
      return [block.prompt, ...block.choices, block.reveal];
    case "why_it_matters":
    case "takeaway":
      return richTextStrings(block.body);
    case "objectives":
      return block.items;
    case "concept":
      return [
        block.title,
        ...richTextStrings(block.quick),
        ...(block.explore ? [block.explore.label, ...richTextStrings(block.explore.body)] : []),
        ...(block.deeper ? [block.deeper.label, ...richTextStrings(block.deeper.body)] : []),
      ];
    case "diagram":
      return [
        block.title,
        block.claim,
        block.altText,
        block.longText,
        ...block.layers.flatMap((layer) => [layer.label, layer.description]),
      ];
    case "misconception":
      return [block.claim, block.correction];
    case "activity_cta":
    case "check_cta":
    case "next_step":
      return [block.body];
  }
}

export function lintSection(
  seed: SectionSeed,
  options?: { stage?: "drafting" | "published" },
): LintIssue[] {
  const issues: LintIssue[] = [];
  const { blocks, glossary } = seed;

  const requiredTypes = [
    "hook",
    "why_it_matters",
    "objectives",
    "concept",
    "diagram",
    "misconception",
    "activity_cta",
    "check_cta",
    "takeaway",
    "next_step",
  ] as const;
  // Retrieval is required of a *published* section, but the framework asks for
  // it "via any route" rather than for every format: the first section carries
  // both an activity and a check because it was the slice testing both. A
  // published section must therefore offer at least one retrieval step, and a
  // drafting section is exempt from being finished while still being held to
  // every copy rule. Per-section category taxonomies are follow-up work.
  const retrievalTypes = new Set<string>(["activity_cta", "check_cta"]);
  for (const type of requiredTypes) {
    if (retrievalTypes.has(type)) continue;
    if (!blocks.some((block) => block.type === type)) {
      issues.push({ blockId: "-", message: `missing required block type: ${type}` });
    }
  }
  if (options?.stage !== "drafting" && !blocks.some((block) => retrievalTypes.has(block.type))) {
    issues.push({
      blockId: "-",
      message: "a published section needs at least one retrieval step (activity_cta or check_cta)",
    });
  }

  const seenIds = new Set<string>();
  for (const block of blocks) {
    if (seenIds.has(block.id)) issues.push({ blockId: block.id, message: "duplicate block id" });
    seenIds.add(block.id);
  }

  const objectives = blocks.find((block) => block.type === "objectives");
  if (objectives && objectives.items.length > 5) {
    issues.push({ blockId: objectives.id, message: "objectives exceed 5 bullets" });
  }

  const chipTerms = new Set(
    glossary.filter((entry) => entry.chip).map((entry) => entry.term.toLowerCase()),
  );
  for (const block of blocks) {
    for (const text of learnerStrings(block)) {
      for (const { pattern, reason } of BANNED_PATTERNS) {
        const match = text.match(pattern);
        if (match) {
          issues.push({
            blockId: block.id,
            message: `banned wording (${reason}): "${match[0]}" in "${text.slice(0, 60)}..."`,
          });
        }
      }
      for (const chipMatch of text.matchAll(/\[\[([^\]]+)\]\]/g)) {
        const term = chipMatch[1] ?? "";
        if (!chipTerms.has(term.toLowerCase())) {
          issues.push({
            blockId: block.id,
            message: `glossary chip [[${term}]] does not resolve to a chip-marked glossary term`,
          });
        }
      }
    }
  }

  return issues;
}
