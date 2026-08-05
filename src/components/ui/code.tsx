"use client";

import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

/**
 * Code rendering for lesson and assessment content (UI Engineer Readiness
 * modules; the AI Awareness pathway never needed it).
 *
 * Two forms:
 * - CodeBlock: a highlighted, copyable block for RichText `code` nodes.
 * - InlineCode / renderInlineCode: backtick spans inside any learner-facing
 *   string (`<button>` in a stem, `box-sizing` in an option).
 *
 * Highlighting is Prism, client-side, tokens colored via CSS variables so the
 * palette stays inside the design system. Content-lint strips backtick spans
 * and code nodes from copy scanning, so code can say `test()` without
 * tripping the vocabulary rules; the trade is that lint checks code shape
 * (language, emptiness, line length) instead of prose rules.
 */
export type CodeLanguage = "html" | "css" | "js" | "jsx" | "ts" | "tsx";

const PRISM_GRAMMAR: Record<CodeLanguage, string> = {
  html: "markup",
  css: "css",
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
};

export const CODE_LANGUAGES: readonly CodeLanguage[] = ["html", "css", "js", "jsx", "ts", "tsx"];

/** Split a string on backtick spans. Exported for tests and for content-lint. */
export function parseInlineCode(text: string): { code: boolean; value: string }[] {
  return text
    .split(/(`[^`]+`)/g)
    .filter((part) => part.length > 0)
    .map((part) => {
      const match = /^`([^`]+)`$/.exec(part);
      return match ? { code: true, value: match[1] ?? "" } : { code: false, value: part };
    });
}

/** Render backtick spans in a plain string as inline code. */
export function InlineCode({ text }: { text: string }) {
  const parts = parseInlineCode(text);
  if (!parts.some((part) => part.code)) return <>{text}</>;
  return (
    <>
      {parts.map((part, index) =>
        part.code ? (
          <code
            key={index}
            className="rounded-sm bg-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
          >
            {part.value}
          </code>
        ) : (
          part.value
        ),
      )}
    </>
  );
}

export function CodeBlock({
  language,
  code,
  label,
}: {
  language: CodeLanguage;
  code: string;
  /** Optional bar text, e.g. a filename; the language shows regardless. */
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const grammarName = PRISM_GRAMMAR[language];
  const grammar = Prism.languages[grammarName];
  const highlighted = grammar ? Prism.highlight(code, grammar, grammarName) : null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions, http); the button is an
      // extra, not a requirement, so a silent miss beats a broken flow.
    }
  }

  return (
    <figure className="code-block mt-4 overflow-hidden rounded-(--radius-control) border border-navy/20 bg-navy">
      <figcaption className="flex items-center gap-3 border-b border-white/10 px-4 py-2">
        <span className="font-mono text-caption font-semibold uppercase tracking-wide text-sky">
          {language}
        </span>
        {label ? <span className="text-caption text-white/70">{label}</span> : null}
        <button
          type="button"
          onClick={copy}
          className="ml-auto min-h-8 rounded-(--radius-chip) px-3 text-caption font-semibold text-sky hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-sky"
        >
          {copied ? "Copied" : "Copy code"}
        </button>
      </figcaption>
      <pre tabIndex={0} className="overflow-x-auto p-4 font-mono text-sm leading-6 text-white">
        {highlighted !== null ? (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </figure>
  );
}
