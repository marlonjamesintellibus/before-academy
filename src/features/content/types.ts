/**
 * Content model (docs/engineering/content-engine.md, docs/content/lessons/README.md).
 * Blocks are the unit of authoring, versioning, and rendering. Rich text is a
 * small closed node set; inline glossary chips are marked [[term]] in text and
 * resolved against seeded glossary terms at render time.
 */

export type RichNode =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "analogy"; text: string; boundary: string }
  | {
      /** A highlighted, copyable code example (UI Engineer modules). */
      type: "code";
      language: "html" | "css" | "js" | "jsx" | "ts" | "tsx";
      code: string;
      /** Optional bar text, e.g. a filename. */
      label?: string;
    };

export type RichText = RichNode[];

/** The ten lesson-template block types (docs/content/lessons/README.md). */
export type LessonBlock =
  | {
      type: "hook";
      id: string;
      prompt: string;
      choices: string[];
      reveal: string;
    }
  | { type: "why_it_matters"; id: string; body: RichText }
  | { type: "objectives"; id: string; items: string[] }
  | {
      type: "concept";
      id: string;
      title: string;
      /** Learner-voice stage objective, shown under the stage heading. */
      objective?: string;
      /** Estimated minutes for the stage; feeds the progress rail. */
      minutes?: number;
      /** What the learner has after finishing the stage; shown at transition. */
      completion?: string;
      /** Visual identity for the stage card; auto-cycled when absent. */
      tone?: "start" | "rules" | "flow" | "pattern" | "compare";
      quick: RichText;
      explore?: { label: string; minutes: number; body: RichText };
      deeper?: { label: string; minutes: number; body: RichText };
    }
  | {
      type: "diagram";
      id: string;
      title: string;
      claim: string;
      altText: string;
      longText: string;
      /** Commit-first gate: the learner predicts before the diagram reveals. */
      predict?: {
        prompt: string;
        options: { text: string; correct: boolean }[];
        revealLabel?: string;
      };
      layers: { id: string; label: string; description: string }[];
    }
  | {
      type: "inline_check";
      id: string;
      prompt: string;
      correctOptionId: string;
      options: { id: string; text: string; feedback: string }[];
    }
  | {
      type: "misconception";
      id: string;
      misconceptionId: string;
      claim: string;
      correction: string;
    }
  | { type: "activity_cta"; id: string; body: string }
  | { type: "check_cta"; id: string; body: string }
  | { type: "takeaway"; id: string; body: RichText }
  | { type: "next_step"; id: string; body: string };

export type LessonBlockType = LessonBlock["type"];

export interface GlossarySeed {
  term: string;
  definition: string;
  example?: string;
  /** Chip terms surface inline in the lesson ([[term]]); others seed the record system. */
  chip: boolean;
}

export interface SectionSeed {
  pathway: { slug: string; title: string; description: string };
  section: { slug: string; title: string; description: string; position: number };
  blocks: LessonBlock[];
  glossary: GlossarySeed[];
}

/** What the lesson page renders: section row + typed blocks + chip lookup. */
export interface PublishedSection {
  title: string;
  description: string;
  version: number;
  blocks: LessonBlock[];
  glossary: Record<string, { definition: string; example?: string }>;
}
