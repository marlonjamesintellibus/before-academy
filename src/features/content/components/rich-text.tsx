import type { ReactNode } from "react";
import type { PublishedSection, RichText } from "../types";
import { GlossaryChip } from "./glossary-chip";
import { CodeBlock, InlineCode } from "@/components/ui/code";

/**
 * Rich text renderer. Inline [[term]] markers become glossary chips
 * (tap-to-open, never hover - docs/product/components.md).
 */
export function renderChipText(
  text: string,
  glossary: PublishedSection["glossary"],
  keyPrefix: string,
): ReactNode[] {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[\[([^\]]+)\]\]$/);
    // Non-chip segments may carry `backtick` spans of inline code.
    if (!match) return <InlineCode key={`${keyPrefix}-${index}`} text={part} />;
    const term = match[1] ?? "";
    const entry = glossary[term.toLowerCase()];
    if (!entry) return term;
    return (
      <GlossaryChip
        key={`${keyPrefix}-${index}`}
        term={term}
        definition={entry.definition}
        {...(entry.example ? { example: entry.example } : {})}
      />
    );
  });
}

export function RichTextView({
  body,
  glossary,
  idPrefix,
}: {
  body: RichText;
  glossary: PublishedSection["glossary"];
  idPrefix: string;
}) {
  return (
    <>
      {body.map((node, index) => {
        const key = `${idPrefix}-${index}`;
        if (node.type === "p") {
          return (
            <p key={key} className="mt-4 text-body">
              {renderChipText(node.text, glossary, key)}
            </p>
          );
        }
        if (node.type === "ul") {
          return (
            <ul key={key} className="mt-4 list-disc space-y-2 pl-6 text-body">
              {node.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>
                  {renderChipText(item, glossary, `${key}-${itemIndex}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (node.type === "code") {
          return (
            <CodeBlock
              key={key}
              language={node.language}
              code={node.code}
              {...(node.label ? { label: node.label } : {})}
            />
          );
        }
        return (
          <p key={key} className="mt-4 rounded-(--radius-control) bg-highlight p-4 text-body">
            {renderChipText(node.text, glossary, key)}{" "}
            <span className="text-ink-muted">{node.boundary}</span>
          </p>
        );
      })}
    </>
  );
}
