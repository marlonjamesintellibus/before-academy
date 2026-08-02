import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { deviceStorageAvailable, readDevice, removeDevice, writeDevice } from "@/lib/device-store";

function installFakeStorage(options: { throwOnWrite?: boolean } = {}) {
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      if (options.throwOnWrite) throw new Error("QuotaExceededError");
      map.set(key, value);
    },
    removeItem: (key: string) => void map.delete(key),
  };
  Object.defineProperty(globalThis, "window", {
    value: { localStorage: storage },
    configurable: true,
  });
  return map;
}

describe("device-store", () => {
  beforeEach(() => installFakeStorage());
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("round-trips JSON values", () => {
    expect(writeDevice("ba.v1.test", { a: 1 })).toBe(true);
    expect(readDevice("ba.v1.test", null)).toEqual({ a: 1 });
    removeDevice("ba.v1.test");
    expect(readDevice("ba.v1.test", "fallback")).toBe("fallback");
  });

  it("returns the fallback for corrupt JSON", () => {
    const map = installFakeStorage();
    map.set("ba.v1.test", "{not json");
    expect(readDevice("ba.v1.test", { ok: true })).toEqual({ ok: true });
  });

  it("applies the validator and falls back on shape mismatch", () => {
    writeDevice("ba.v1.test", { version: 2 });
    const value = readDevice<{ version: number } | null>(
      "ba.v1.test",
      null,
      (parsed) => (parsed as { version?: number }).version === 1,
    );
    expect(value).toBeNull();
  });

  it("degrades to no-op when storage throws (private browsing)", () => {
    installFakeStorage({ throwOnWrite: true });
    expect(deviceStorageAvailable()).toBe(false);
    expect(writeDevice("ba.v1.test", 1)).toBe(false);
    expect(readDevice("ba.v1.test", "fallback")).toBe("fallback");
  });

  it("degrades server-side where window is absent", () => {
    Reflect.deleteProperty(globalThis, "window");
    expect(deviceStorageAvailable()).toBe(false);
    expect(readDevice("ba.v1.test", "fallback")).toBe("fallback");
    expect(writeDevice("ba.v1.test", 1)).toBe(false);
  });
});
