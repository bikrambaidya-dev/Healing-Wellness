"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";
import { Crystal } from "@/lib/types";
import { GemArt, type GemVariant } from "@/components/ui/gem-art";
import { Rating } from "@/components/ui/rating";
import { formatPrice, cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { QuickViewModal } from "./quick-view-modal";

export function CrystalCard({ crystal }: { crystal: Crystal }) {
  const { isSaved, toggleSaved, addToCart } = useAppStore();
  const [added, setAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const saved = isSaved("crystal", crystal.slug);

  function handleAddToCart() {
    addToCart(crystal.slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-plum-900/10">
        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-b from-cream to-sand/40">
          <Link href={`/crystals/${crystal.slug}`} className="absolute inset-0">
            <GemArt
              variant={crystal.images[0] as GemVariant}
              className="h-full w-full p-8 transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <button
            onClick={() => toggleSaved("crystal", crystal.slug)}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={saved}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-ivory/90 text-plum-soft shadow-sm backdrop-blur-sm transition-colors hover:text-plum-900"
          >
            <Heart className={cn("size-4", saved && "fill-blush text-plum-900")} strokeWidth={1.6} />
          </button>

          <button
            onClick={() => setQuickViewOpen(true)}
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-xs font-medium text-plum-soft opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-plum-900"
          >
            <Eye className="size-3.5" strokeWidth={1.6} /> Quick view
          </button>

          {!crystal.inStock && (
            <span className="absolute bottom-3 left-3 rounded-full bg-plum-900/80 px-3 py-1 text-xs font-medium text-ivory">
              Out of stock
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <Link href={`/crystals/${crystal.slug}`}>
            <h3 className="font-serif-display text-xl text-plum-900">{crystal.name}</h3>
          </Link>
          <p className="text-sm text-plum-soft">{crystal.shortDescription}</p>
          <Rating value={crystal.rating} reviewCount={crystal.reviewCount} />

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-lg text-plum-900">{formatPrice(crystal.price)}</span>
              {crystal.compareAtPrice && (
                <span className="text-xs text-plum-soft line-through">
                  {formatPrice(crystal.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!crystal.inStock}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all disabled:opacity-40",
                added ? "bg-sage-dark text-ivory" : "bg-plum text-ivory hover:bg-plum-900"
              )}
            >
              {added ? (
                <>
                  <Check className="size-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3.5" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {quickViewOpen && (
        <QuickViewModal crystal={crystal} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
