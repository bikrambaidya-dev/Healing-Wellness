"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Check } from "lucide-react";
import { Crystal } from "@/lib/types";
import { GemArt, type GemVariant } from "@/components/ui/gem-art";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export function QuickViewModal({ crystal, onClose }: { crystal: Crystal; onClose: () => void }) {
  const { addToCart } = useAppStore();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-plum-900/50 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-2xl grid-cols-1 overflow-hidden rounded-[2rem] bg-ivory shadow-2xl sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-ivory/90 shadow-sm hover:bg-ivory"
        >
          <X className="size-4.5" />
        </button>
        <div className="h-64 bg-gradient-to-b from-cream to-sand/40 sm:h-full">
          <GemArt variant={crystal.images[0] as GemVariant} className="h-full w-full p-10" />
        </div>
        <div className="flex flex-col gap-3 p-7">
          <span className="text-xs font-semibold uppercase tracking-wide text-sage-dark">
            {crystal.chakra} Chakra
          </span>
          <h3 className="font-serif-display text-2xl text-plum-900">{crystal.name}</h3>
          <Rating value={crystal.rating} reviewCount={crystal.reviewCount} />
          <p className="text-sm leading-relaxed text-plum-soft">{crystal.description}</p>
          <div className="flex flex-wrap gap-2">
            {crystal.purpose.map((p) => (
              <Badge key={p} tone="blush">
                {p}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif-display text-2xl text-plum-900">{formatPrice(crystal.price)}</span>
            {crystal.compareAtPrice && (
              <span className="text-sm text-plum-soft line-through">{formatPrice(crystal.compareAtPrice)}</span>
            )}
          </div>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => {
                addToCart(crystal.slug, 1);
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                added ? "bg-sage-dark text-ivory" : "bg-plum text-ivory hover:bg-plum-900"
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" /> Add to Cart
                </>
              )}
            </button>
            <Link
              href={`/crystals/${crystal.slug}`}
              className="flex items-center justify-center rounded-full border border-plum/20 px-5 py-3 text-sm font-semibold text-plum-900 hover:border-plum/40"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
