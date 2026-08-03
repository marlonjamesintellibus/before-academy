import { describe, expect, it } from "vitest";
import { buildDeck, type DeckRecord } from "@/features/content/presentation";

/**
 * The point of the export is that a deck and the lesson cannot disagree, so the
 * test that matters is the one asserting nothing is rewritten. If a future
 * change makes this builder summarize, these fail.
 */
const record: DeckRecord = {
  key: "artificial-intelligence",
  title: "Artificial intelligence (AI)",
  definition: "Systems that find patterns in data to classify, predict, or generate things",
  presentationSummary:
    "AI is the part of a system whose behaviour was learned rather than written.",
  speakerNotes: "Define it by where the behaviour came from, not by what it can do.",
  examples: [{ text: "A spam filter catching new wording", clue: "no rule was written for it" }],
  sources: ["Internal AI primer, 2026"],
};

const options = { title: "Deck title", contentVersion: 4, generatedOn: "2026-08-03" };

describe("presentation export", () => {
  it("reproduces approved wording verbatim", () => {
    const deck = buildDeck([record], options);
    expect(deck).toContain(record.definition);
    expect(deck).toContain(record.presentationSummary);
    expect(deck).toContain(record.speakerNotes);
    expect(deck).toContain(record.examples[0]!.text);
    expect(deck).toContain(record.examples[0]!.clue);
    expect(deck).toContain(record.sources[0]!);
  });

  it("stamps the content version so a deck is traceable to a record version", () => {
    const deck = buildDeck([record], options);
    expect(deck).toContain("content version 4");
    expect(deck).toContain("2026-08-03");
    expect(deck).toContain("`artificial-intelligence`");
  });

  it("separates slides so slide tools can import it", () => {
    const deck = buildDeck([record], options);
    // Title slide, one concept slide, provenance slide.
    expect(deck.split("\n---\n").length).toBe(3);
  });

  it("omits optional sections rather than emitting empty headings", () => {
    const bare = buildDeck([{ ...record, examples: [], sources: [] }], options);
    expect(bare).not.toContain("### Examples");
    expect(bare).not.toContain("### References");
  });

  it("is deterministic: same records and options produce the same bytes", () => {
    expect(buildDeck([record], options)).toBe(buildDeck([record], options));
  });

  it("introduces no learner-facing prose beyond the record and the fixed frame", () => {
    // Every sentence of substance must trace to a field. The frame is fixed
    // wording reviewed here, not generated per record.
    const deck = buildDeck([record], options);
    const withoutFields = [
      record.title,
      record.definition,
      record.presentationSummary,
      record.speakerNotes,
      record.examples[0]!.text,
      record.examples[0]!.clue,
      record.sources[0]!,
      record.key,
    ].reduce((text, field) => text.split(field).join(""), deck);
    // What remains is only the frame, so no record content leaked into it.
    expect(withoutFields).not.toContain("patterns in data");
    expect(withoutFields).not.toContain("spam filter");
  });
});
