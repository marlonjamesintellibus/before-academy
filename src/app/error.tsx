"use client";

import { Button } from "@/components/ui/button";
import { strings } from "@/lib/strings";

/** Route error boundary (docs/engineering/error-handling.md): learner-safe copy, retry. */
export default function RouteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-16">
      <h1 className="text-heading font-bold">{strings.system.loadFailure}</h1>
      <div className="mt-6">
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
