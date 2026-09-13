import { services } from "@/data/services";
import { experts } from "@/data/experts";
import { crystals } from "@/data/crystals";

export type SearchResult = {
  type: "Healing" | "Expert" | "Crystal";
  title: string;
  subtitle: string;
  href: string;
};

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const serviceResults: SearchResult[] = services
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q)) ||
        s.tagline.toLowerCase().includes(q)
    )
    .map((s) => ({ type: "Healing", title: s.name, subtitle: s.tagline, href: `/healing/${s.slug}` }));

  const expertResults: SearchResult[] = experts
    .filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.specialties.some((s) => s.toLowerCase().includes(q)) ||
        e.title.toLowerCase().includes(q)
    )
    .map((e) => ({ type: "Expert", title: e.name, subtitle: e.title, href: `/experts/${e.slug}` }));

  const crystalResults: SearchResult[] = crystals
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.purpose.some((p) => p.toLowerCase().includes(q))
    )
    .map((c) => ({ type: "Crystal", title: c.name, subtitle: c.shortDescription, href: `/crystals/${c.slug}` }));

  return [...serviceResults, ...expertResults, ...crystalResults];
}
