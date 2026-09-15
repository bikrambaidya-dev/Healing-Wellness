// Expert auth: checks email/password against the (admin-editable) experts
// collection in MongoDB.
import { getCollection } from "@/lib/admin-store";
import { experts as seedExperts } from "@/data/experts";
import { Expert } from "@/lib/types";

const EXPERTS_KEY = "serenity:admin:experts";
const EXPERT_SESSION_KEY = "serenity:expertSlug";

const demoExpert = seedExperts.find((x) => x.email);
export const DEMO_EXPERT_CREDENTIALS = demoExpert
  ? { name: demoExpert.name, email: demoExpert.email!, password: demoExpert.password! }
  : null;

export async function findExpertByCredentials(email: string, password: string): Promise<Expert | null> {
  const list = await getCollection<Expert>(EXPERTS_KEY, seedExperts);
  const normalizedEmail = email.trim().toLowerCase();
  return (
    list.find((x) => x.email && x.email.trim().toLowerCase() === normalizedEmail && x.password === password) ?? null
  );
}

export function setExpertSession(slug: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(EXPERT_SESSION_KEY, slug);
}

export function clearExpertSession() {
  if (typeof window !== "undefined") window.localStorage.removeItem(EXPERT_SESSION_KEY);
}

export function getExpertSession(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EXPERT_SESSION_KEY);
}

export async function getSessionExpert(): Promise<Expert | null> {
  const slug = getExpertSession();
  if (!slug) return null;
  const list = await getCollection<Expert>(EXPERTS_KEY, seedExperts);
  return list.find((x) => x.slug === slug) ?? null;
}
