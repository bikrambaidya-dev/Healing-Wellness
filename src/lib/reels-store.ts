// Demo-only reels data layer, same pattern as admin-store.ts: persists to
// localStorage, seeded from /src/data/reels.ts. The public feed and the
// admin Reels section read/write this same collection, so on a given
// browser an admin upload shows up in the feed immediately — but (no
// backend) it never syncs to other visitors' devices.
import { getCollection, saveCollection } from "@/lib/admin-store";
import { reels as seedReels } from "@/data/reels";
import { Reel, ReelComment } from "@/lib/types";

export const REELS_KEY = "serenity:reels";
const LIKED_KEY = "serenity:reels:likedIds";
const NAME_KEY = "serenity:reels:commenterName";

export function getReels(): Reel[] {
  return getCollection<Reel>(REELS_KEY, seedReels);
}

export function saveReels(list: Reel[]) {
  saveCollection(REELS_KEY, list);
}

export function getLikedReelIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LIKED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setLikedReelIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
}

export function getSavedCommenterName(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(NAME_KEY) ?? "";
}

export function setSavedCommenterName(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NAME_KEY, name);
}

export function makeComment(author: string, text: string): ReelComment {
  return {
    id: `cm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: author.trim() || "Guest",
    text: text.trim(),
    createdAt: Date.now(),
  };
}
