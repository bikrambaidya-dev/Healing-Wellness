// Every key the app persists to MongoDB, one document per key holding a
// JSON array — the same shape the old localStorage demo used, so the admin
// panel, expert panel, and public site can all read/write through one
// generic collection API instead of a bespoke schema per entity.
export const COLLECTION_KEYS = [
  "serenity:admin:activity",
  "serenity:admin:experts",
  "serenity:admin:users",
  "serenity:admin:crystals",
  "serenity:admin:bookings",
  "serenity:admin:blogs",
  "serenity:admin:healing",
  "serenity:testimonials",
  "serenity:reels",
] as const;

export type CollectionKey = (typeof COLLECTION_KEYS)[number];

export function isCollectionKey(value: string): value is CollectionKey {
  return (COLLECTION_KEYS as readonly string[]).includes(value);
}
