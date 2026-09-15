import { Reel } from "@/lib/types";

/** A reel's playable video URL. */
export function useReelSrc(reel: Reel) {
  return reel.videoUrl ?? null;
}
