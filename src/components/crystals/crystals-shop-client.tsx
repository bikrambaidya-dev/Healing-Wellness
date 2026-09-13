"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Crystal } from "@/lib/types";
import { CrystalCard } from "@/components/crystals/crystal-card";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹1,300", min: 1000, max: 1300 },
  { label: "Above ₹1,300", min: 1301, max: Infinity },
] as const;

export function CrystalsShopClient({ crystals }: { crystals: Crystal[] }) {
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<(typeof priceRanges)[number]>(priceRanges[0]);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const purposes = useMemo(() => Array.from(new Set(crystals.flatMap((c) => c.purpose))), [crystals]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = crystals.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.purpose.some((p) => p.toLowerCase().includes(q));
      const matchesPurpose = !purpose || c.purpose.includes(purpose);
      const matchesPrice = c.price >= priceRange.min && c.price <= priceRange.max;
      return matchesQuery && matchesPurpose && matchesPrice;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [crystals, query, purpose, priceRange, sort]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
      <aside className={cn("lg:block", filtersOpen ? "block" : "hidden")}>
        <div className="flex flex-col gap-8 rounded-[1.75rem] border border-plum/10 bg-cream/50 p-6 lg:sticky lg:top-28">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-plum-900">Purpose</h3>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => setPurpose(null)}
                className={cn(
                  "rounded-full px-3 py-2 text-left text-sm transition-colors",
                  !purpose ? "bg-plum text-ivory" : "text-plum-soft hover:bg-plum/5"
                )}
              >
                All Purposes
              </button>
              {purposes.map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={cn(
                    "rounded-full px-3 py-2 text-left text-sm transition-colors",
                    purpose === p ? "bg-plum text-ivory" : "text-plum-soft hover:bg-plum/5"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-plum-900">Price Range</h3>
            <div className="mt-3 flex flex-col gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setPriceRange(range)}
                  className={cn(
                    "rounded-full px-3 py-2 text-left text-sm transition-colors",
                    priceRange.label === range.label ? "bg-plum text-ivory" : "text-plum-soft hover:bg-plum/5"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-plum-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crystals…"
              className="w-full rounded-full border border-plum/15 bg-ivory py-3 pl-11 pr-4 text-sm outline-none placeholder:text-plum-soft/70 focus:border-plum/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 px-4 py-2.5 text-sm font-medium text-plum-900 lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-plum/15 bg-ivory px-4 py-2.5 text-sm text-plum-900 outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-plum-soft">{filtered.length} crystals found</p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-plum/20 py-20 text-center">
            <p className="font-serif-display text-xl text-plum-900">No crystals match your filters</p>
            <p className="mt-2 text-sm text-plum-soft">Try clearing a filter or searching a different term.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <CrystalCard key={c.slug} crystal={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
