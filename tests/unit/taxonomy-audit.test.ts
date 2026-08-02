import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * M7 event-by-event audit (docs/roadmap/milestones.md; ADR-031/032): every
 * event name in lib/events.ts must have a taxonomy row in
 * docs/product/analytics-events.md, and vice versa. This test IS the audit -
 * drift in either direction fails CI.
 */
function taxonomyEvents(): Set<string> {
  const doc = readFileSync(join(process.cwd(), "docs/product/analytics-events.md"), "utf-8");
  const names = new Set<string>();
  for (const line of doc.split("\n")) {
    if (!line.startsWith("|") || line.startsWith("|---") || line.includes("Decision supported")) {
      continue;
    }
    const cell = line.split("|")[1] ?? "";
    // Tokens are separated by "/" or "·"; properties live in parentheses.
    const tokens = cell
      .replace(/\([^)]*\)/g, " ")
      .split(/[/·]/)
      .map((token) => token.trim())
      .filter(Boolean);
    let previous: string | null = null;
    for (const token of tokens) {
      if (!/^[a-z][a-z0-9_]*$/.test(token)) continue;
      if (token.includes("_") || !previous) {
        names.add(token);
        previous = token;
      } else {
        // Shorthand like "resume_banner_shown / clicked": swap the last segment.
        const base = previous.split("_").slice(0, -1).join("_");
        names.add(`${base}_${token}`);
      }
    }
  }
  return names;
}

function codeEvents(): Set<string> {
  const source = readFileSync(join(process.cwd(), "src/lib/events.ts"), "utf-8");
  const names = new Set<string>();
  for (const match of source.matchAll(/^\s*\|\s*"([a-z0-9_]+)"/gm)) {
    names.add(match[1] ?? "");
  }
  return names;
}

describe("analytics taxonomy audit", () => {
  it("every typed event has a taxonomy row", () => {
    const taxonomy = taxonomyEvents();
    const missing = [...codeEvents()].filter((name) => !taxonomy.has(name));
    expect(missing).toEqual([]);
  });

  it("every taxonomy row has a typed event", () => {
    const code = codeEvents();
    const orphaned = [...taxonomyEvents()].filter((name) => !code.has(name));
    expect(orphaned).toEqual([]);
  });

  it("both sides agree on the event count", () => {
    expect(codeEvents().size).toBeGreaterThan(40);
    expect(codeEvents().size).toBe(taxonomyEvents().size);
  });
});
