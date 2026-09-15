import { NextRequest, NextResponse } from "next/server";
import { getServices, getExperts, getCrystals } from "@/lib/server/content";
import type { SearchResult } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  if (!q) return NextResponse.json({ results: [] });

  const [services, experts, crystals] = await Promise.all([getServices(), getExperts(), getCrystals()]);

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
    .filter((c) => c.name.toLowerCase().includes(q) || c.purpose.some((p) => p.toLowerCase().includes(q)))
    .map((c) => ({ type: "Crystal", title: c.name, subtitle: c.shortDescription, href: `/crystals/${c.slug}` }));

  const results: SearchResult[] = [...serviceResults, ...expertResults, ...crystalResults];
  return NextResponse.json({ results });
}
