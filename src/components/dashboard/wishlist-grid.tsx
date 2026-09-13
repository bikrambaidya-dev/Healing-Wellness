"use client";

import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useAppStore, getSavedExperts, getSavedCrystals } from "@/lib/store";
import { CrystalCard } from "@/components/crystals/crystal-card";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";

export function WishlistGrid() {
  const { saved } = useAppStore();
  const savedExperts = getSavedExperts(saved);
  const savedCrystals = getSavedCrystals(saved);

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h3 className="font-serif-display text-xl text-plum-900">Saved Experts</h3>
        {savedExperts.length === 0 ? (
          <EmptyState
            message="You haven't saved any experts yet."
            action={{ label: "Browse Experts", href: "/experts" }}
          />
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {savedExperts.map(
              (expert) =>
                expert && (
                  <Link
                    key={expert.slug}
                    href={`/experts/${expert.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-plum/10 bg-ivory p-4 hover:border-sage-dark/30"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                      <Image src={expert.image} alt={expert.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="inline-flex items-center gap-1.5 font-serif-display text-lg text-plum-900">
                        {expert.name}
                        <BadgeCheck className="size-4 fill-sage-dark text-ivory" />
                      </p>
                      <p className="text-sm text-plum-soft">{expert.title}</p>
                      <Rating value={expert.rating} reviewCount={expert.reviewCount} className="mt-1" />
                    </div>
                  </Link>
                )
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-serif-display text-xl text-plum-900">Wishlist</h3>
        {savedCrystals.length === 0 ? (
          <EmptyState
            message="You haven't saved any crystals yet."
            action={{ label: "Browse Crystals", href: "/crystals" }}
          />
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedCrystals.map((crystal) => crystal && <CrystalCard key={crystal.slug} crystal={crystal} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message, action }: { message: string; action: { label: string; href: string } }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-plum/20 p-8 text-center">
      <p className="text-sm text-plum-soft">{message}</p>
      <Button href={action.href} variant="secondary" size="sm" className="mt-4">
        {action.label}
      </Button>
    </div>
  );
}
