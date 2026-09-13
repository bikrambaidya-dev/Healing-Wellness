"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Reel } from "@/lib/types";
import { getReels, saveReels, getLikedReelIds, setLikedReelIds, makeComment } from "@/lib/reels-store";
import { ReelCard } from "./reel-card";
import { CommentsDrawer } from "./comments-drawer";

export function ReelsFeed() {
  const [reels, setReels] = useState<Reel[] | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [commentsForId, setCommentsForId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReels(getReels());
    setLikedIds(getLikedReelIds());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || !reels) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.getAttribute("data-reel-id"));
      },
      { root, threshold: [0.6] }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reels]);

  function persist(next: Reel[]) {
    setReels(next);
    saveReels(next);
  }

  function toggleLike(id: string) {
    const isLiked = likedIds.includes(id);
    const nextLiked = isLiked ? likedIds.filter((i) => i !== id) : [...likedIds, id];
    setLikedIds(nextLiked);
    setLikedReelIds(nextLiked);

    if (!reels) return;
    persist(reels.map((r) => (r.id === id ? { ...r, likes: r.likes + (isLiked ? -1 : 1) } : r)));
  }

  function addComment(id: string, author: string, text: string) {
    if (!reels) return;
    const comment = makeComment(author, text);
    persist(reels.map((r) => (r.id === id ? { ...r, comments: [...r.comments, comment] } : r)));
  }

  async function share(reel: Reel) {
    const url = typeof window !== "undefined" ? `${window.location.origin}/reels#${reel.id}` : "";
    const shareData = { title: reel.title, text: reel.caption, url };

    let shared = false;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        shared = true;
      } catch {
        shared = false;
      }
    }
    if (!shared) {
      try {
        await navigator.clipboard.writeText(url);
        setToast("Link copied to clipboard");
      } catch {
        setToast(url);
      }
    }

    if (!reels) return;
    persist(reels.map((r) => (r.id === reel.id ? { ...r, shares: r.shares + 1 } : r)));
  }

  if (!reels) return null;

  const commentsReel = reels.find((r) => r.id === commentsForId) ?? null;

  return (
    <div className="fixed inset-0 z-30 bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          aria-label="Back"
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/30 text-ivory backdrop-blur-sm"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-sm font-semibold tracking-wide text-ivory">Reels</h1>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/30 text-ivory backdrop-blur-sm"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </div>

      <div ref={containerRef} className="h-full w-full snap-y snap-mandatory overflow-y-scroll overscroll-y-contain">
        {reels.map((reel) => (
          <div
            key={reel.id}
            data-reel-id={reel.id}
            ref={(el) => {
              if (el) sectionRefs.current.set(reel.id, el);
              else sectionRefs.current.delete(reel.id);
            }}
            className="h-full w-full snap-start snap-always"
          >
            <ReelCard
              reel={reel}
              active={activeId === reel.id}
              muted={muted}
              liked={likedIds.includes(reel.id)}
              onToggleLike={() => toggleLike(reel.id)}
              onOpenComments={() => setCommentsForId(reel.id)}
              onShare={() => share(reel)}
            />
          </div>
        ))}
      </div>

      {commentsReel && (
        <CommentsDrawer
          comments={commentsReel.comments}
          onClose={() => setCommentsForId(null)}
          onSubmit={(author, text) => addComment(commentsReel.id, author, text)}
        />
      )}

      {toast && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center">
          <div className="rounded-full bg-black/80 px-4 py-2 text-sm text-ivory">{toast}</div>
        </div>
      )}
    </div>
  );
}
