/**
 * S01 marketing home placeholder — full screen lands at M8
 * (docs/product/screens/marketing-and-pathway.md). M0 serves a real page
 * through the real pipeline so the deploy exit criterion is checkable.
 */
export default function HomePage() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[680px] flex-1 flex-col justify-center px-4 py-12"
    >
      <h1 className="text-display font-bold">Before Academy</h1>
      <p className="mt-4 text-body text-ink-muted">
        Learn to tell AI, automation, and traditional software apart — in about twenty minutes,
        free, no account needed.
      </p>
      <p className="mt-8 text-caption text-ink-muted">
        Foundation build (M0). The lesson experience arrives with the next milestones.
      </p>
    </main>
  );
}
