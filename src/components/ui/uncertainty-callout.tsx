/**
 * Reusable evidence-gap pattern for lessons that ask learners to classify a
 * system from incomplete information.
 */
export function UncertaintyCallout({
  title = "Good judgment includes knowing when there is not enough evidence.",
  known,
  unknown,
  question,
}: {
  title?: string;
  known: string;
  unknown: string;
  question: string;
}) {
  return (
    <aside
      role="note"
      className="mt-6 rounded-(--radius-hero) border border-warning/40 bg-warning-tint p-5"
    >
      <p className="text-caption font-bold uppercase tracking-wider text-warning">
        Not enough information
      </p>
      <h3 className="mt-2 font-display text-subheading font-bold">{title}</h3>
      <dl className="mt-4 grid gap-3 text-body sm:grid-cols-3">
        <div>
          <dt className="font-semibold">What is known</dt>
          <dd className="text-ink-muted">{known}</dd>
        </div>
        <div>
          <dt className="font-semibold">What is unknown</dt>
          <dd className="text-ink-muted">{unknown}</dd>
        </div>
        <div>
          <dt className="font-semibold">Ask next</dt>
          <dd className="text-ink-muted">{question}</dd>
        </div>
      </dl>
    </aside>
  );
}
