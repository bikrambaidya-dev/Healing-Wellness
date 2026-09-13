"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { Crystal } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AddToCartPanel({ crystal }: { crystal: Crystal }) {
  const { addToCart, isSaved, toggleSaved } = useAppStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const saved = isSaved("crystal", crystal.slug);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-plum/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-11 items-center justify-center text-plum-soft hover:text-plum-900"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-plum-900">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex size-11 items-center justify-center text-plum-soft hover:text-plum-900"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button
          onClick={() => {
            addToCart(crystal.slug, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          disabled={!crystal.inStock}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all disabled:opacity-40",
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

        <button
          onClick={() => toggleSaved("crystal", crystal.slug)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum-soft hover:text-plum-900"
        >
          <Heart className={cn("size-4.5", saved && "fill-blush text-plum-900")} strokeWidth={1.6} />
        </button>
      </div>
      {!crystal.inStock && <p className="text-sm text-plum-soft">Currently out of stock.</p>}
    </div>
  );
}
