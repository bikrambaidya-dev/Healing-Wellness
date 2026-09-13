import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Client Experiences",
  description: "Real stories from clients who've booked healing sessions through Amara.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Experiences"
        title="Real Experiences. Real Transformations."
        subtitle="Every session is different — here's what clients have felt after theirs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Experiences" }]}
        image={images.cloudsMountainSummit}
        imageAlt="A person at a misty mountain summit"
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-plum/10 bg-ivory p-7 shadow-sm"
              >
                <Quote className="size-7 text-sage-light" fill="currentColor" strokeWidth={0} />
                <p className="font-serif-display text-lg italic leading-relaxed text-plum-900 text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-plum/10 pt-4">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-plum-900">{t.name}</p>
                    <p className="text-xs text-plum-soft">{t.service}</p>
                  </div>
                  <Rating value={t.rating} size="sm" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-[2rem] bg-cream/70 p-10 text-center">
            <h2 className="font-serif-display text-2xl text-plum-900 md:text-3xl">
              Ready to write your own story?
            </h2>
            <p className="max-w-md text-sm text-plum-soft">
              Every journey starts with a single session. Find the practice that feels right for you.
            </p>
            <Button href="/experts" showArrow>
              Book a Healing Session
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
