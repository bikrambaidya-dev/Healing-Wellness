// Demo-only admin data layer: persists admin edits to localStorage, seeded
// from the static /src/data files. No backend — data is per-browser only.
import { ActivityEntry } from "@/lib/types";

const ACTIVITY_KEY = "amara:admin:activity";
const MAX_ACTIVITY = 50;

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCollection<T>(key: string, seed: T[]): T[] {
  const existing = readJSON<T[]>(key);
  if (existing) return existing;
  writeJSON(key, seed);
  return seed;
}

export function saveCollection<T>(key: string, items: T[]) {
  writeJSON(key, items);
}

export function logActivity(message: string) {
  const entries = readJSON<ActivityEntry[]>(ACTIVITY_KEY) ?? [];
  const next = [
    { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, message, timestamp: Date.now() },
    ...entries,
  ].slice(0, MAX_ACTIVITY);
  writeJSON(ACTIVITY_KEY, next);
}

export function getActivity(): ActivityEntry[] {
  return readJSON<ActivityEntry[]>(ACTIVITY_KEY) ?? [];
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
