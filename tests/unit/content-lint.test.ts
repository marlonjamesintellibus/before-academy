import { describe, expect, it } from "vitest";
import { lintSection } from "@/features/content/lint";
import type { SectionSeed } from "@/features/content/types";

function minimalSeed(overrides: Partial<SectionSeed> = {}): SectionSeed {
  return {
    pathway: { slug: "p", title: "P", description: "d" },
    section: { slug: "s", title: "S", description: "d", position: 1 },
    blocks: [
      {
        type: "hook",
        id: "hook",
        prompt: "Is that AI?",
        choices: ["Yes", "No"],
        reveal: "Soon you can tell.",
      },
      { type: "why_it_matters", id: "why", body: [{ type: "p", text: "It matters." }] },
      { type: "objectives", id: "obj", items: ["Tell the three apart"] },
      {
        type: "concept",
        id: "c1",
        title: "Traditional software",
        quick: [{ type: "p", text: "Rules." }],
      },
      {
        type: "diagram",
        id: "dgm",
        title: "How they work together",
        claim: "Layers differ.",
        altText: "Layer diagram",
        longText: "Five layers described.",
        layers: [{ id: "l1", label: "Interface", description: "What you see." }],
      },
      {
        type: "misconception",
        id: "m5",
        misconceptionId: "M5",
        claim: "You can tell from the interface.",
        correction: "The mechanism decides.",
      },
      { type: "activity_cta", id: "act", body: "Ready to sort real systems?" },
      { type: "check_cta", id: "chk", body: "Four practice questions." },
      { type: "takeaway", id: "tk", body: [{ type: "p", text: "Mechanism over interface." }] },
      { type: "next_step", id: "nx", body: "The assessment completes the section." },
    ],
    glossary: [
      { term: "automation", definition: "Running tasks with less manual effort", chip: true },
    ],
    ...overrides,
  };
}

describe("lintSection", () => {
  it("passes a clean seed", () => {
    expect(lintSection(minimalSeed())).toEqual([]);
  });

  it("flags a missing required block type", () => {
    const seed = minimalSeed();
    seed.blocks = seed.blocks.filter((block) => block.type !== "diagram");
    expect(lintSection(seed).some((issue) => issue.message.includes("diagram"))).toBe(true);
  });

  it("flags banned terminology in learner copy", () => {
    const seed = minimalSeed();
    seed.blocks[1] = {
      type: "why_it_matters",
      id: "why",
      body: [{ type: "p", text: "This is simply a quiz you cannot fail." }],
    };
    const issues = lintSection(seed);
    expect(issues.length).toBeGreaterThanOrEqual(3);
  });

  it("allows the sanctioned 'easy to mix up' frame but flags bare 'easy'", () => {
    const seed = minimalSeed();
    seed.blocks[1] = {
      type: "why_it_matters",
      id: "why",
      body: [{ type: "p", text: "These two are easy to mix up because both remove effort." }],
    };
    expect(lintSection(seed)).toEqual([]);
    seed.blocks[1] = {
      type: "why_it_matters",
      id: "why",
      body: [{ type: "p", text: "This part is easy." }],
    };
    expect(lintSection(seed).some((issue) => issue.message.includes("minimizer"))).toBe(true);
  });

  it("flags unresolvable glossary chips", () => {
    const seed = minimalSeed();
    seed.blocks[1] = {
      type: "why_it_matters",
      id: "why",
      body: [{ type: "p", text: "Consider [[machine learning]] here." }],
    };
    expect(lintSection(seed).some((issue) => issue.message.includes("machine learning"))).toBe(
      true,
    );
  });

  it("flags duplicate block ids and >5 objectives", () => {
    const seed = minimalSeed();
    seed.blocks[2] = { type: "objectives", id: "hook", items: ["a", "b", "c", "d", "e", "f"] };
    const issues = lintSection(seed);
    expect(issues.some((issue) => issue.message.includes("duplicate"))).toBe(true);
    expect(issues.some((issue) => issue.message.includes("exceed"))).toBe(true);
  });
});
