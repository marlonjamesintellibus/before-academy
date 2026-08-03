import { describe, expect, it } from "vitest";
import { lintCanonicalRecords } from "@/features/content/canonical-lint";
import { canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY } from "@/db/seed/canonical-content";
import { sectionSeed } from "@/db/seed/section-content";
import type { CanonicalRecordSeed } from "@/db/seed/canonical-content";
import type { SectionSeed } from "@/features/content/types";

/**
 * The canonical lint is what makes the "rule of one" real rather than asserted,
 * so these tests care most about what it *rejects*. A gate that only ever
 * passes is not a gate.
 */
const base: CanonicalRecordSeed = {
  key: "example-concept",
  title: "Example concept",
  definition: "A short plain definition that stays under the word limit",
  technicalDefinition: "A more precise framing for the deeper layer.",
  whyItMatters: "It changes a decision the learner actually makes.",
  examples: [
    { text: "A familiar system", clue: "the observable property" },
    { text: "A second system from another industry", clue: "a different observable property" },
    { text: "A third that looks like the first but is not", clue: "the contrast case" },
  ],
  analogies: [{ analogy: "A vending machine", boundary: "a bigger machine is still a machine" }],
  misconceptionIds: ["M1"],
  relatedKeys: [],
  presentationSummary: "The deck-ready summary.",
  speakerNotes: "What to say out loud.",
  sources: [],
  isChip: false,
};

/** The published section keeps the legacy prefix, so fixtures use its slug. */
function sectionWith(overrides: Partial<{ glossary: unknown[]; blocks: unknown[]; slug: string }>) {
  return {
    section: { slug: overrides.slug ?? "ai-automation-software" },
    blocks: overrides.blocks ?? [],
    glossary: overrides.glossary ?? [],
  } as unknown as SectionSeed;
}

const emptySection = sectionWith({});

function lint(record: Partial<CanonicalRecordSeed>) {
  return lintCanonicalRecords([{ ...base, ...record }], {}, emptySection);
}

describe("canonical-lint: shipped seeds", () => {
  it("passes the real records against the real glossary", () => {
    expect(lintCanonicalRecords(canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY, sectionSeed)).toEqual(
      [],
    );
  });

  it("covers every concept in the Phase 1 register with a glossary link", () => {
    // Regression guard: the table existed for months with zero rows.
    expect(canonicalRecordSeeds.length).toBeGreaterThanOrEqual(11);
    expect(Object.keys(GLOSSARY_TERM_BY_KEY).length).toBeGreaterThanOrEqual(11);
  });
});

describe("canonical-lint: rejections", () => {
  it("catches a glossary definition that drifts from its record", () => {
    const drifted = sectionWith({
      glossary: [
        {
          term: "Example term",
          definition: "Something a writer edited without touching the record",
          example: null,
          chip: false,
        },
      ],
    });
    const issues = lintCanonicalRecords([base], { "example-concept": "Example term" }, drifted);
    expect(issues.map((i) => i.message).join(" ")).toMatch(/drifted from its canonical record/);
  });

  it("accepts a trailing period difference, which is rendering not wording", () => {
    const sameWithPeriod = sectionWith({
      glossary: [
        {
          term: "Example term",
          definition: `${base.definition}.`,
          example: null,
          chip: false,
        },
      ],
    });
    expect(
      lintCanonicalRecords([base], { "example-concept": "Example term" }, sameWithPeriod),
    ).toEqual([]);
  });

  it("catches a record claiming a glossary term that does not exist", () => {
    const issues = lintCanonicalRecords([base], { "example-concept": "Nowhere" }, emptySection);
    expect(issues.map((i) => i.message).join(" ")).toMatch(/not in the section glossary/);
  });

  it("catches an unregistered misconception id", () => {
    expect(
      lint({ misconceptionIds: ["M99"] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/unknown misconception M99/);
  });

  it("catches a related key with no record", () => {
    expect(
      lint({ relatedKeys: ["ghost-concept"] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/has no canonical record/);
  });

  it("catches a self-referential related key", () => {
    expect(
      lint({ relatedKeys: ["example-concept"] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/cannot be related to itself/);
  });

  it("catches an over-long plain definition", () => {
    const long = Array.from({ length: 30 }, (_, i) => `word${i}`).join(" ");
    expect(
      lint({ definition: long })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/limit 25/);
  });

  it("catches a record below the approved-example floor", () => {
    expect(
      lint({ examples: [{ text: "Only one", clue: "a clue" }] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/asks for 3 to 6/);
  });

  it("catches a record above the approved-example ceiling", () => {
    const many = Array.from({ length: 7 }, (_, i) => ({ text: `Example ${i}`, clue: "a clue" }));
    expect(
      lint({ examples: many })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/exceeds the 6/);
  });

  it("rejects the legacy P1- prefix outside the published section", () => {
    const newSection = sectionWith({
      slug: "what-is-artificial-intelligence",
      blocks: [{ id: "P1-LESSON-002" }],
    });
    const issues = lintCanonicalRecords([base], {}, newSection);
    expect(issues.map((i) => i.message).join(" ")).toMatch(/must not use the legacy P1- prefix/);
  });

  it("allows the legacy prefix in the published section", () => {
    const published = sectionWith({ blocks: [{ id: "P1-LESSON-002" }] });
    expect(lintCanonicalRecords([base], {}, published)).toEqual([]);
  });

  it("catches an example missing its identifying clue", () => {
    expect(
      lint({ examples: [{ text: "A system", clue: "" }] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/needs both text and the clue/);
  });

  it("catches an analogy with no stated boundary", () => {
    expect(
      lint({ analogies: [{ analogy: "A brain", boundary: "" }] })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/no boundary/);
  });

  it("catches missing required prose fields", () => {
    expect(
      lint({ speakerNotes: "" })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/speaker notes is required/);
  });

  it("catches a non-kebab-case key", () => {
    expect(
      lint({ key: "Example_Concept" })
        .map((i) => i.message)
        .join(" "),
    ).toMatch(/kebab-case/);
  });
});
