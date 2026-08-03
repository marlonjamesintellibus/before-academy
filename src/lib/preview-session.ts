import { readDevice, removeDevice, writeDevice } from "@/lib/device-store";

/**
 * Simulated session for building S10/S11 before BetterAuth lands (M6).
 *
 * This is a placeholder for the *provider*, not for authorization. It proves
 * nothing and protects nothing: the session lives in device storage, anyone
 * can write it, and no server action trusts it. Server-side authorization
 * still resolves through actor.ts, so a preview session grants no access to
 * any protected data, because none is exposed to it.
 *
 * The shape mirrors what BetterAuth returns (docs/engineering/auth.md) so M6
 * replaces this module's three functions and leaves the screens untouched.
 *
 * Disabled unless NEXT_PUBLIC_PREVIEW_AUTH is "1", and hard-blocked whenever
 * APP_ENV is production (docs/ops/production-setup.md forbids setting the flag
 * there). Production therefore cannot run simulated auth even if the public
 * flag were set by mistake.
 */
const PREVIEW_SESSION_KEY = "ba.v1.preview_session";

/**
 * Broadcast so every mounted consumer resyncs. Without it the header keeps a
 * stale session across client-side navigation, because a route change does not
 * remount the layout. A real auth client exposes a subscribable session store,
 * so consumers written against this keep working after the M6 swap.
 */
export const PREVIEW_SESSION_EVENT = "ba:preview-session";

function notifySessionChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PREVIEW_SESSION_EVENT));
}

export interface PreviewUser {
  id: string;
  email: string;
  name: string;
}

export interface PreviewSession {
  version: 1;
  user: PreviewUser;
  signedInAt: string;
}

export function previewAuthEnabled(): boolean {
  // APP_ENV is server-only, so this branch is what blocks production renders.
  // On the client it reads undefined and the public flag is the gate; that flag
  // is inlined at build time and is never set for a production build.
  if (process.env.APP_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_PREVIEW_AUTH === "1";
}

function isPreviewSession(value: unknown): value is PreviewSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as PreviewSession;
  return candidate.version === 1 && typeof candidate.user?.email === "string";
}

export function readPreviewSession(): PreviewSession | null {
  if (!previewAuthEnabled()) return null;
  return readDevice<PreviewSession | null>(PREVIEW_SESSION_KEY, null, isPreviewSession);
}

/** Derives a display name from the local part: "ada.lovelace" -> "Ada Lovelace". */
function displayName(email: string): string {
  const local = email.split("@")[0] ?? email;
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Learner"
  );
}

export function signInPreview(email: string): PreviewSession | null {
  if (!previewAuthEnabled()) return null;
  const session: PreviewSession = {
    version: 1,
    user: { id: crypto.randomUUID(), email, name: displayName(email) },
    signedInAt: new Date().toISOString(),
  };
  writeDevice(PREVIEW_SESSION_KEY, session);
  notifySessionChanged();
  return session;
}

export function signOutPreview(): void {
  removeDevice(PREVIEW_SESSION_KEY);
  notifySessionChanged();
}
