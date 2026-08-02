import Link from "next/link";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

/** 404 (docs/product/ux-copy.md): Home + lesson links, no dead ends. */
export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-16">
      <h1 className="text-heading font-bold">{strings.system.notFound}</h1>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong"
        >
          Go home
        </Link>
        <Link
          href={LESSON_ROUTE}
          className="inline-flex min-h-11 items-center text-body text-primary underline-offset-4 hover:underline"
        >
          Jump into the lesson
        </Link>
      </div>
    </main>
  );
}
