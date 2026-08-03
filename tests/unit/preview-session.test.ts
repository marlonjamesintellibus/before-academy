import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The simulated session standing in for BetterAuth until M6. These tests exist
 * for one reason above all: proving production can never run it, whatever the
 * public flag says (docs/ops/production-setup.md).
 */
const KEY = "ba.v1.preview_session";

let storage: Map<string, string>;

function installFakeStorage() {
  const map = new Map<string, string>();
  Object.defineProperty(globalThis, "window", {
    value: {
      localStorage: {
        getItem: (key: string) => map.get(key) ?? null,
        setItem: (key: string, value: string) => void map.set(key, value),
        removeItem: (key: string) => void map.delete(key),
      },
      // Sign-in and sign-out broadcast so mounted consumers resync.
      dispatchEvent: () => true,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    },
    configurable: true,
  });
  return map;
}

async function loadModule() {
  vi.resetModules();
  return import("@/lib/preview-session");
}

beforeEach(() => {
  storage = installFakeStorage();
  vi.stubEnv("NEXT_PUBLIC_PREVIEW_AUTH", "1");
  vi.stubEnv("APP_ENV", "development");
});

afterEach(() => {
  Reflect.deleteProperty(globalThis, "window");
  vi.unstubAllEnvs();
});

describe("preview auth gating", () => {
  it("is off unless the public flag is exactly 1", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_AUTH", "");
    const { previewAuthEnabled } = await loadModule();
    expect(previewAuthEnabled()).toBe(false);
  });

  it("is off in production even when the flag is set", async () => {
    vi.stubEnv("APP_ENV", "production");
    const { previewAuthEnabled, signInPreview, readPreviewSession } = await loadModule();
    expect(previewAuthEnabled()).toBe(false);
    expect(signInPreview("ada@example.com")).toBeNull();
    expect(readPreviewSession()).toBeNull();
  });

  it("refuses a session already on the device once production is in force", async () => {
    const enabled = await loadModule();
    enabled.signInPreview("ada@example.com");
    expect(enabled.readPreviewSession()).not.toBeNull();

    vi.stubEnv("APP_ENV", "production");
    const disabled = await loadModule();
    // The value is still in device storage; the gate is what refuses it.
    expect(storage.get(KEY)).toBeTruthy();
    expect(disabled.readPreviewSession()).toBeNull();
  });
});

describe("simulated session", () => {
  it("stores a BetterAuth-shaped user and derives a display name", async () => {
    const { signInPreview, readPreviewSession } = await loadModule();
    const session = signInPreview("ada.lovelace@example.com");
    expect(session?.user.email).toBe("ada.lovelace@example.com");
    expect(session?.user.name).toBe("Ada Lovelace");
    expect(session?.user.id).toBeTruthy();
    expect(readPreviewSession()?.user.email).toBe("ada.lovelace@example.com");
  });

  it("signs out by clearing the key", async () => {
    const { signInPreview, signOutPreview, readPreviewSession } = await loadModule();
    signInPreview("ada@example.com");
    signOutPreview();
    expect(readPreviewSession()).toBeNull();
    expect(storage.get(KEY)).toBeUndefined();
  });

  it("ignores a malformed stored session", async () => {
    storage.set(KEY, JSON.stringify({ version: 99, user: {} }));
    const { readPreviewSession } = await loadModule();
    expect(readPreviewSession()).toBeNull();
  });
});
