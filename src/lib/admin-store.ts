// Admin/expert data layer: persists edits to MongoDB via /api/collections,
// seeded from the static /src/data files. Shared across every browser and
// visible on the public site immediately (see src/lib/server/content.ts).
import { ActivityEntry } from "@/lib/types";

const ACTIVITY_KEY = "serenity:admin:activity";
const MAX_ACTIVITY = 50;

async function fetchItems<T>(key: string): Promise<T[] | null> {
  try {
    const res = await fetch(`/api/collections/${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.items) ? (data.items as T[]) : null;
  } catch {
    return null;
  }
}

function putItems<T>(key: string, items: T[]) {
  fetch(`/api/collections/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).catch(() => {});
}

export async function getCollection<T>(key: string, seed: T[]): Promise<T[]> {
  const items = await fetchItems<T>(key);
  if (items === null) return seed; // request failed — fall back without overwriting anything
  if (items.length > 0) return items;
  putItems(key, seed); // first visit: bootstrap the collection from the seed fixture
  return seed;
}

export function saveCollection<T>(key: string, items: T[]) {
  putItems(key, items);
}

export async function logActivity(message: string) {
  const entries = (await fetchItems<ActivityEntry>(ACTIVITY_KEY)) ?? [];
  const next = [
    { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, message, timestamp: Date.now() },
    ...entries,
  ].slice(0, MAX_ACTIVITY);
  putItems(ACTIVITY_KEY, next);
}

export async function getActivity(): Promise<ActivityEntry[]> {
  return (await fetchItems<ActivityEntry>(ACTIVITY_KEY)) ?? [];
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
