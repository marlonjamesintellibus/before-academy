import { describe, expect, it } from "vitest";
import { parseInlineCode } from "@/components/ui/code";
import { lintSection } from "@/features/content/lint";
import type { SectionSeed } from "@/features/content/types";

describe("parseInlineCode", () => {
  it("splits backtick spans from prose", () => {
    expect(parseInlineCode("Use `<button>` here")).toEqual([
      { code: false, value: "Use " },
      { code: true, value: "<button>" },
      { code: false, value: " here" },
    ]);
  });

  it("passes plain text through as one segment", () => {
    expect(parseInlineCode("no code here")).toEqual([{ code: false, value: "no code here" }]);
  });

  it("handles multiple spans", () => {
    const parts = parseInlineCode("`a` and `b`");
    expect(parts.filter((part) => part.code).map((part) => part.value)).toEqual(["a", "b"]);
  });
});

function seedWith(blocks: SectionSeed["blocks"]): SectionSeed {
  return {
    pathway: { slug: "x", title: "X", description: "d" },
    section: { slug: "s", title: "S", description: "d", position: 1 },
    blocks,
    glossary: [],
  };
}

describe("content lint and code", () => {
  it("exempts code node content from the copy rules", () => {
    const issues = lintSection(
      seedWith([
        {
          type: "concept",
          id: "C1",
          title: "T",
          quick: [
            // `test` and `fail` as identifiers: legitimate in code, banned in prose.
            { type: "code", language: "js", code: "if (!re.test(x)) reportFailure();" },
          ],
        },
      ]),
      { stage: "drafting" },
    );
    expect(issues.filter((issue) => issue.message.includes("banned wording"))).toEqual([]);
  });

  it("exempts backtick spans in prose from the copy rules but not the prose around them", () => {
    const clean = lintSection(
      seedWith([
        {
          type: "concept",
          id: "C1",
          title: "T",
          quick: [{ type: "p", text: "The `test()` method checks a pattern." }],
        },
      ]),
      { stage: "drafting" },
    );
    expect(clean.filter((issue) => issue.message.includes("banned wording"))).toEqual([]);

    const dirty = lintSection(
      seedWith([
        {
          type: "concept",
          id: "C1",
          title: "T",
          quick: [{ type: "p", text: "This test uses the `every` method." }],
        },
      ]),
      { stage: "drafting" },
    );
    expect(dirty.some((issue) => issue.message.includes("banned wording"))).toBe(true);
  });

  it("flags empty code and overlong lines", () => {
    const issues = lintSection(
      seedWith([
        {
          type: "concept",
          id: "C1",
          title: "T",
          quick: [
            { type: "code", language: "css", code: "   " },
            { type: "code", language: "html", code: `<div>${"x".repeat(95)}</div>` },
          ],
        },
      ]),
      { stage: "drafting" },
    );
    expect(issues.some((issue) => issue.message.includes("empty code block"))).toBe(true);
    expect(issues.some((issue) => issue.message.includes("exceeds 90"))).toBe(true);
  });
});
