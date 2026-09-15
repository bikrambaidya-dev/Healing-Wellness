import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ExpertShell } from "@/components/expert/expert-shell";

export const metadata: Metadata = {
  title: "Expert Panel",
  robots: { index: false, follow: false },
};

export default function ExpertPage() {
  return (
    <section className="py-6 md:py-16">
      <Container>
        <h1 className="font-serif-display text-2xl text-plum-900 sm:text-3xl md:text-4xl">Expert Panel</h1>
        <p className="mt-2 text-sm text-plum-soft">Manage your bookings, reels, blog posts, and public profile.</p>

        <div className="mt-6 md:mt-10">
          <ExpertShell />
        </div>
      </Container>
    </section>
  );
}
