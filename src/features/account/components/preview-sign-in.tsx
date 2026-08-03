"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInPreview } from "@/lib/preview-session";
import { Callout } from "@/components/ui/callout";
import { Button, TextField } from "@/components/ui";
import { track } from "@/lib/analytics";
import { strings } from "@/lib/strings";

/**
 * Simulated sign-in standing in for S10 until BetterAuth lands (M6).
 *
 * There is deliberately no password field. A fake one would teach testers to
 * type real credentials into a form that stores them in device storage, and it
 * would prove nothing anyway. The real S10 card (email + password, Google, the
 * contextual benefit line) is built against BetterAuth at M6.
 */
export function PreviewSignIn({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setError("Enter an email address so the simulated session has something to show.");
      return;
    }
    setError("");
    signInPreview(trimmed);
    track("auth_completed", { method: "preview" });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <Callout variant="info" title="Not a real sign-in">
        {strings.account.previewNotice}
      </Callout>

      <form onSubmit={submit} className="panel mt-6 p-6">
        <TextField
          id="preview-email"
          type="email"
          label={strings.account.emailLabel}
          value={email}
          autoComplete="off"
          onChange={(event) => setEmail(event.target.value)}
          {...(error ? { error } : {})}
        />
        <Button type="submit" className="mt-4">
          {strings.account.previewCta}
        </Button>
      </form>

      <p className="mt-6 text-body text-ink-muted">
        {mode === "sign-up" ? "Nothing is created" : "Nothing is verified"}, and your device
        progress is untouched either way.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-11 items-center text-body text-primary underline-offset-4 hover:underline"
      >
        Continue as guest
      </Link>
    </>
  );
}
