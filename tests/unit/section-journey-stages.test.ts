import { describe, expect, it } from "vitest";
import { assembleStages } from "@/features/content/components/section-journey";
import type { LessonBlock } from "@/features/content/types";

/**
 * Stage assembly is what places inline checks, the diagram and the
 * misconception inside the stage they teach, instead of bolted onto the end.
 * These tests pin the grouping rules the seeds rely on.
 */
const blocks: LessonBlock[] = [
  { type: "hook", id: "H", prompt: "p", choices: ["a"], reveal: "r" },
  { type: "why_it_matters", id: "W", body: [{ type: "p", text: "why" }] },
  { type: "objectives", id: "O", items: ["one"] },
  {
    type: "concept",
    id: "C1",
    title: "First concept",
    objective: "Do the first thing",
    minutes: 5,
    completion: "First thing done",
    tone: "rules",
    quick: [{ type: "p", text: "quick" }],
  },
  {
    type: "inline_check",
    id: "IC1",
    prompt: "check one",
    correctOptionId: "a",
    options: [
      { id: "a", text: "A", feedback: "yes" },
      { id: "b", text: "B", feedback: "no" },
    ],
  },
  {
    type: "concept",
    id: "C2",
    title: "Second concept",
    quick: [{ type: "p", text: "quick2" }],
  },
  {
    type: "diagram",
    id: "D",
    title: "d",
    claim: "c",
    altText: "alt",
    longText: "long",
    layers: [{ id: "l", label: "L", description: "desc" }],
  },
  { type: "misconception", id: "M", misconceptionId: "M1", claim: "cl", correction: "co" },
  { type: "takeaway", id: "T", body: [{ type: "p", text: "t" }] },
];

describe("stage assembly", () => {
  const stages = assembleStages(blocks);

  it("opens with the pre-concept blocks", () => {
    expect(stages[0]?.label).toBe("Start here");
    expect(stages[0]?.blocks.map((b) => b.id)).toEqual(["H", "W", "O"]);
  });

  it("gives each concept a stage owning the blocks that follow it", () => {
    expect(stages[1]?.blocks.map((b) => b.id)).toEqual(["C1", "IC1"]);
    expect(stages[2]?.blocks.map((b) => b.id)).toEqual(["C2", "D", "M", "T"]);
  });

  it("carries the concept's stage metadata", () => {
    expect(stages[1]).toMatchObject({
      label: "First concept",
      objective: "Do the first thing",
      minutes: 5,
      completion: "First thing done",
      tone: "rules",
    });
  });

  it("defaults minutes and cycles tones when the seed omits them", () => {
    expect(stages[2]?.minutes).toBe(4);
    expect(stages[2]?.tone).toBe("flow");
  });
});
