"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Fires lesson_completed_scroll once when the reader reaches the end of the article. */
export function LessonScrollTracker() {
  const fired = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const article = ref.current?.closest("article");
    if (!article) return;
    const sentinel = document.createElement("div");
    article.append(sentinel);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !fired.current) {
        fired.current = true;
        track("lesson_completed_scroll");
        observer.disconnect();
      }
    });
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return <span ref={ref} hidden />;
}
