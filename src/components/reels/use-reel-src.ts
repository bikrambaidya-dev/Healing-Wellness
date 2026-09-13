"use client";

import { useEffect, useState } from "react";
import { getReelMediaUrl } from "@/lib/reel-media-db";
import { Reel } from "@/lib/types";

/** Resolves a reel's playable video URL — from IndexedDB for admin uploads, or straight from `videoUrl`. */
export function useReelSrc(reel: Reel) {
  const [src, setSrc] = useState<string | null>(reel.mediaId ? null : reel.videoUrl ?? null);

  useEffect(() => {
    if (!reel.mediaId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSrc(reel.videoUrl ?? null);
      return;
    }
    let cancelled = false;
    getReelMediaUrl(reel.mediaId).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [reel.mediaId, reel.videoUrl]);

  return src;
}
