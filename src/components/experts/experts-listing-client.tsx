"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Expert } from "@/lib/types";
import { ExpertCard } from "@/components/experts/expert-card";
import { cn } from "@/lib/utils";

export function ExpertsListingClient({ experts }: { experts: Expert[] }) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<string | null>(null);

  const specialties = useMemo(
    () => Array.from(new Set(experts.flatMap((e) => e.specialties))),
    [experts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return experts.filter((e) => {
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.specialties.some((s) => s.toLowerCase().includes(q));
      const matchesSpecialty = !specialty || e.specialties.includes(specialty);
      return matchesQuery && matchesSpecialty;
    });
  }, [experts, query, specialty]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-plum-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialty…"
            className="w-full rounded-full border border-plum/15 bg-ivory py-3 pl-11 pr-4 text-sm outline-none placeholder:text-plum-soft/70 focus:border-plum/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSpecialty(null)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              !specialty
                ? "border-plum bg-plum text-ivory"
                : "border-plum/15 text-plum-soft hover:border-plum/30"
            )}
          >
            All
          </button>
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                specialty === s
                  ? "border-plum bg-plum text-ivory"
                  : "border-plum/15 text-plum-soft hover:border-plum/30"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-plum/20 py-20 text-center">
          <p className="font-serif-display text-xl text-plum-900">No experts match your search</p>
          <p className="mt-2 text-sm text-plum-soft">Try clearing filters or searching a different specialty.</p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-8">
          {filtered.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </div>
      )}
    </div>
  );
}
