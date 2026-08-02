/**
 * Device storage core (docs/engineering/standards.md; ADR-025 device-only
 * guests). All ba.v1.* reads and writes go through here: safe in private
 * browsing (every call degrades to fallback/no-op), safe on the server
 * (window-guarded), and versioned per key by the caller's shape.
 *
 * Payload privacy (M5 exit criterion): device payloads contain learning
 * state only - never names, emails, or free-text learner input.
 */
export function deviceStorageAvailable(): boolean {
  try {
    const probe = "ba.v1.probe";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function readDevice<T>(key: string, fallback: T, validate?: (value: unknown) => boolean): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function writeDevice(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeDevice(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // nothing to do - storage is unavailable
  }
}
