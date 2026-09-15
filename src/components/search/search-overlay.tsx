"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { SearchResult } from "@/lib/search";

export function SearchTrigger({ variant = "icon" }: { variant?: "icon" | "bar" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const t = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setResults(data.results ?? []))
        .catch(() => {});
    }, 200);
    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  return (
    <>
      {variant === "icon" ? (
        <button
          aria-label="Search"
          onClick={() => setOpen(true)}
          className="flex size-10 items-center justify-center rounded-full text-plum transition-colors hover:bg-plum/5"
        >
          <Search className="size-5" strokeWidth={1.6} />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-full border border-plum/15 bg-ivory px-6 py-4 text-left text-plum-soft shadow-sm transition-all hover:border-plum/30 hover:shadow-md"
        >
          <Search className="size-5 shrink-0" strokeWidth={1.6} />
          <span>Search healing, meditation, expert or crystal…</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-100 flex items-start justify-center bg-plum-900/40 backdrop-blur-sm px-4 pt-24 sm:pt-32 animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-ivory shadow-2xl overflow-hidden border border-plum/10">
            <div className="flex items-center gap-3 border-b border-plum/10 px-5 py-4">
              <Search className="size-5 text-plum-soft shrink-0" strokeWidth={1.6} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search healing, meditation, expert or crystal…"
                className="w-full bg-transparent text-plum placeholder:text-plum-soft/70 outline-none text-base"
              />
              <button
                aria-label="Close search"
                onClick={close}
                className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-plum/5"
              >
                <X className="size-4.5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-plum-soft">
                  No results for &ldquo;{query}&rdquo;. Try “reiki”, “Priya”, or “amethyst”.
                </p>
              )}
              {!query && (
                <p className="px-4 py-8 text-center text-sm text-plum-soft">
                  Try searching “meditation”, “crystal healing”, or an expert&apos;s name.
                </p>
              )}
              {results.map((r) => (
                <Link
                  key={r.type + r.href}
                  href={r.href}
                  onClick={close}
                  className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-sage-light/50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide text-sage-dark">
                      {r.type}
                    </span>
                    <span className="font-serif-display text-lg text-plum-900">{r.title}</span>
                    <span className="text-sm text-plum-soft">{r.subtitle}</span>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-plum-soft" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
