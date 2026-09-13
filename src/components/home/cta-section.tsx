import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { images } from "@/lib/images";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <Image
        src={images.cloudsMountainSummit}
        alt="A person standing at a misty mountain summit above the clouds at sunrise"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-plum-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/80 via-plum-900/30 to-transparent" />

      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl font-serif-display text-3xl leading-[1.15] text-ivory text-balance sm:text-4xl md:text-5xl">
          Your Healing Journey Starts With One Step.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg">
          Take a moment for yourself. Connect with a practitioner and discover a practice that
          feels right for you.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/experts" size="lg" showArrow>
            Book Your First Session
          </Button>
          <Button href="/healing" size="lg" variant="ghost" showArrow>
            Explore Healing Practices
          </Button>
        </div>
      </Container>
    </section>
  );
}
