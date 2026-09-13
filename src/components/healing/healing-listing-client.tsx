"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Hand, Sparkles, CircleDot, CircleDashed, Gem, Waves } from "lucide-react";
import { HealingService } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const icons = { Hand, Sparkles, CircleDot, CircleDashed, Gem, Waves };

export function HealingListingClient({ services }: { services: HealingService[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q)) ||
        s.shortDescription.toLowerCase().includes(q)
    );
  }, [services, query]);

  return (
    <div>
      <div className="relative mb-10 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-plum-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search practices…"
          className="w-full rounded-full border border-plum/15 bg-ivory py-3 pl-11 pr-4 text-sm outline-none placeholder:text-plum-soft/70 focus:border-plum/30"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-plum/20 py-20 text-center">
          <p className="font-serif-display text-xl text-plum-900">No practices found</p>
          <p className="mt-2 text-sm text-plum-soft">Try a different search term like &ldquo;meditation&rdquo; or &ldquo;crystal&rdquo;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Link
                key={service.slug}
                href={`/healing/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-plum-900/10"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/5 to-transparent" />
                  <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full bg-ivory/90 text-plum-900 shadow-sm backdrop-blur-sm">
                    {Icon && <Icon className="size-5" strokeWidth={1.6} />}
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold text-plum-900 backdrop-blur-sm">
                    From {formatPrice(service.priceFrom)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-sage-dark">
                    {service.tagline}
                  </span>
                  <h3 className="font-serif-display text-2xl text-plum-900">{service.name}</h3>
                  <p className="text-sm leading-relaxed text-plum-soft">{service.shortDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-900">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
