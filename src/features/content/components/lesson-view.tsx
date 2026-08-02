import Link from "next/link";
import type { LessonBlock, PublishedSection } from "../types";
import { DepthPanel } from "./depth-panel";
import { DiagramFigure } from "./diagram-figure";
import { HookBlock } from "./hook-block";
import { LessonScrollTracker } from "./lesson-scroll-tracker";
import { RichTextView } from "./rich-text";

/**
 * S03 lesson renderer (docs/product/screens/lesson.md): 680px reading column,
 * block order per template, sticky ToC rail at ≥1024px with concept anchors.
 * Server component; interactivity lives in the leaf client components.
 */
function anchorFor(block: LessonBlock): string {
  return block.id.toLowerCase();
}

function BlockView({
  block,
  glossary,
  lessonRoute,
}: {
  block: LessonBlock;
  glossary: PublishedSection["glossary"];
  lessonRoute: string;
}) {
  switch (block.type) {
    case "hook":
      return <HookBlock prompt={block.prompt} choices={block.choices} reveal={block.reveal} />;
    case "why_it_matters":
      return (
        <section aria-label="Why it matters">
          <RichTextView body={block.body} glossary={glossary} idPrefix={block.id} />
        </section>
      );
    case "objectives":
      return (
        <details className="panel p-4">
          <summary className="cursor-pointer text-body font-semibold">
            What you&rsquo;ll learn
          </summary>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-body">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      );
    case "concept":
      return (
        <section id={anchorFor(block)} aria-labelledby={`${block.id}-h`}>
          <h2 id={`${block.id}-h`} className="text-heading font-bold">
            {block.title}
          </h2>
          <RichTextView body={block.quick} glossary={glossary} idPrefix={block.id} />
          {block.explore ? (
            <DepthPanel
              layer="explore"
              concept={block.id}
              label={block.explore.label}
              minutes={block.explore.minutes}
            >
              <RichTextView
                body={block.explore.body}
                glossary={glossary}
                idPrefix={`${block.id}-explore`}
              />
            </DepthPanel>
          ) : null}
          {block.deeper ? (
            <DepthPanel
              layer="deeper"
              concept={block.id}
              label={block.deeper.label}
              minutes={block.deeper.minutes}
            >
              <RichTextView
                body={block.deeper.body}
                glossary={glossary}
                idPrefix={`${block.id}-deeper`}
              />
            </DepthPanel>
          ) : null}
        </section>
      );
    case "diagram":
      return (
        <DiagramFigure
          title={block.title}
          claim={block.claim}
          altText={block.altText}
          longText={block.longText}
          layers={block.layers}
        />
      );
    case "misconception":
      return (
        <aside
          role="note"
          className="rounded-(--radius-card) border-l-4 border-warning bg-surface-card p-5 shadow-(--shadow-card)"
        >
          <p className="text-body font-semibold">Common misconception</p>
          <p className="mt-2 text-body italic">&ldquo;{block.claim}&rdquo;</p>
          <p className="mt-2 text-body">{block.correction}</p>
        </aside>
      );
    case "activity_cta":
      return (
        <div className="panel bg-highlight p-5">
          <p className="text-body">{block.body}</p>
          <Link
            href={`${lessonRoute}/activity`}
            className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try it: Sort the System
          </Link>
        </div>
      );
    case "check_cta":
      return (
        <div className="panel p-5">
          <p className="text-body">{block.body}</p>
          <Link
            href={`${lessonRoute}/check`}
            className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-5 py-2.5 text-body font-semibold text-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start the knowledge check
          </Link>
        </div>
      );
    case "takeaway":
      return (
        <section
          aria-label="Key takeaways"
          className="rounded-(--radius-card) border-l-4 border-primary bg-primary-tint p-5"
        >
          <RichTextView body={block.body} glossary={glossary} idPrefix={block.id} />
        </section>
      );
    case "next_step":
      return <p className="text-body text-ink-muted">{block.body}</p>;
  }
}

export function LessonView({
  content,
  lessonRoute,
}: {
  content: PublishedSection;
  lessonRoute: string;
}) {
  const concepts = content.blocks.filter((block) => block.type === "concept");

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-10 px-4 md:px-6">
      {/* ToC rail, desktop only (docs/product/information-architecture.md) */}
      <nav
        aria-label="Lesson contents"
        className="sticky top-6 hidden h-fit w-56 shrink-0 self-start lg:block"
      >
        <p className="eyebrow">In this lesson</p>
        <ul className="mt-3 flex flex-col gap-2 text-body">
          {concepts.map((concept) => (
            <li key={concept.id}>
              <a href={`#${anchorFor(concept)}`} className="text-ink-muted hover:text-primary">
                {concept.type === "concept" ? concept.title : concept.id}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="w-full max-w-[680px] flex-1 pb-16">
        <LessonScrollTracker />
        <div className="flex flex-col gap-8">
          {content.blocks.map((block) => (
            <BlockView
              key={block.id}
              block={block}
              glossary={content.glossary}
              lessonRoute={lessonRoute}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
