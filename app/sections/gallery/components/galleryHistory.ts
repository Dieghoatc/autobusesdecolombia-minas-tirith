import type { Vehicle } from "@/services/types/vehicle.type";

// Persists what the infinite gallery has loaded, plus the scroll position,
// for the current browser history entry. Going back to that entry (e.g. after
// "Ver página completa de detalles") restores the exact list and position;
// a fresh visit from the menu is a new entry and starts from the top.

export interface GallerySnapshot {
  vehicles: Vehicle[];
  nextPage: number;
  hasNext: boolean;
  scrollY: number;
}

const STORAGE_PREFIX = "galeria:";
const STATE_KEY = "galleryKey";

function newKey(): string {
  // crypto.randomUUID needs a secure context (not available on http LAN IPs)
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Key stored in this history entry's state (merged, so Next.js keeps its own).
export function historyEntryKey(): string {
  const state = (window.history.state ?? {}) as Record<string, unknown>;
  if (typeof state[STATE_KEY] === "string") return state[STATE_KEY];

  const key = newKey();
  window.history.replaceState({ ...state, [STATE_KEY]: key }, "");
  return key;
}

export function readSnapshot(key: string): GallerySnapshot | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as GallerySnapshot) : null;
  } catch {
    return null;
  }
}

export function writeSnapshot(key: string, snapshot: GallerySnapshot): void {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(snapshot));
  } catch {
    // Storage full or blocked (private mode): restoring is best effort.
  }
}
