"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reel } from "@/lib/types";
import { useReelSrc } from "./use-reel-src";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function ReelCard({
  reel,
  active,
  muted,
  liked,
  onToggleLike,
  onOpenComments,
  onShare,
}: {
  reel: Reel;
  active: boolean;
  muted: boolean;
  liked: boolean;
  onToggleLike: () => void;
  onOpenComments: () => void;
  onShare: () => void;
}) {
  const src = useReelSrc(reel);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [showPauseHint, setShowPauseHint] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (active) setManuallyPaused(false);
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && !manuallyPaused) {
      video.play().catch(() => {});
    } else {
      video.pause();
      if (!active) video.currentTime = 0;
    }
  }, [active, manuallyPaused, src]);

  function handleTap() {
    setManuallyPaused((prev) => !prev);
    setShowPauseHint(true);
    window.setTimeout(() => setShowPauseHint(false), 500);
  }

  return (
    <section className="relative h-full w-full shrink-0 snap-start snap-always overflow-hidden bg-black">
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={reel.poster}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted={muted}
          onClick={handleTap}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={reel.poster} alt="" className="h-full w-full object-cover" onClick={handleTap} />
      )}

      {showPauseHint && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/40 p-5">
            {manuallyPaused ? <Pause className="size-8 text-white" /> : <Play className="size-8 text-white" />}
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/30" />

      {/* Bottom-left: author + caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 pb-6 sm:p-6">
        <div className="flex max-w-[calc(100%-4.5rem)] flex-col gap-2 text-ivory">
          {reel.expertSlug ? (
            <Link href={`/experts/${reel.expertSlug}`} className="flex items-center gap-2 font-semibold">
              <Image src={reel.authorImage} alt={reel.authorName} width={28} height={28} className="size-7 rounded-full object-cover" unoptimized />
              {reel.authorName}
            </Link>
          ) : (
            <div className="flex items-center gap-2 font-semibold">
              <Image src={reel.authorImage} alt={reel.authorName} width={28} height={28} className="size-7 rounded-full object-cover" unoptimized />
              {reel.authorName}
            </div>
          )}
          <p className="text-sm leading-snug text-ivory/95">{reel.caption}</p>
          {reel.tags.length > 0 && (
            <p className="text-xs text-ivory/70">{reel.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join(" ")}</p>
          )}
        </div>

        {/* Right action rail */}
        <div className="flex shrink-0 flex-col items-center gap-5">
          <button onClick={onToggleLike} aria-label={liked ? "Unlike" : "Like"} className="flex flex-col items-center gap-1 text-ivory">
            <span className={cn("flex size-11 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm transition-transform active:scale-90")}>
              <Heart className={cn("size-6", liked ? "fill-blush text-blush" : "text-ivory")} strokeWidth={1.8} />
            </span>
            <span className="text-xs font-medium">{formatCount(reel.likes)}</span>
          </button>

          <button onClick={onOpenComments} aria-label="Comments" className="flex flex-col items-center gap-1 text-ivory">
            <span className="flex size-11 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm transition-transform active:scale-90">
              <MessageCircle className="size-6" strokeWidth={1.8} />
            </span>
            <span className="text-xs font-medium">{formatCount(reel.comments.length)}</span>
          </button>

          <button onClick={onShare} aria-label="Share" className="flex flex-col items-center gap-1 text-ivory">
            <span className="flex size-11 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm transition-transform active:scale-90">
              <Share2 className="size-6" strokeWidth={1.8} />
            </span>
            <span className="text-xs font-medium">{formatCount(reel.shares)}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
