"use client";

import { Heart } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SaveExpertButton({ slug }: { slug: string }) {
  const { isSaved, toggleSaved } = useAppStore();
  const saved = isSaved("expert", slug);

  return (
    <button
      onClick={() => toggleSaved("expert", slug)}
      aria-pressed={saved}
      className="flex size-11 items-center justify-center rounded-full border border-plum/15 bg-ivory text-plum-soft transition-colors hover:text-plum-900"
      aria-label={saved ? "Remove from saved experts" : "Save expert"}
    >
      <Heart className={cn("size-4.5", saved && "fill-blush text-plum-900")} strokeWidth={1.6} />
    </button>
  );
}
