"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { BlogCard } from "@/components/blog/blog-card";
import { cn } from "@/lib/utils";

export function BlogListingClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !category || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-plum-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-plum/15 bg-ivory py-3 pl-11 pr-4 text-sm outline-none placeholder:text-plum-soft/70 focus:border-plum/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              !category ? "border-plum bg-plum text-ivory" : "border-plum/15 text-plum-soft hover:border-plum/30"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                category === c ? "border-plum bg-plum text-ivory" : "border-plum/15 text-plum-soft hover:border-plum/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-plum/20 py-20 text-center">
          <p className="font-serif-display text-xl text-plum-900">No articles found</p>
          <p className="mt-2 text-sm text-plum-soft">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
