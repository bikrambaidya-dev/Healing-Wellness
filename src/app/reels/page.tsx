import type { Metadata } from "next";
import { ReelsFeed } from "@/components/reels/reels-feed";

export const metadata: Metadata = {
  title: "Reels",
  description: "Short, immersive wellness videos — breathwork, yoga flows, crystal care, and sound healing — from Serenity's experts.",
  alternates: { canonical: "/reels" },
};

export default function ReelsPage() {
  return <ReelsFeed />;
}
