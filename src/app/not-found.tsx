import { Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center py-20">
      <Container className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-sage-light">
          <Compass className="size-7 text-sage-dark" strokeWidth={1.6} />
        </div>
        <h1 className="mt-6 font-serif-display text-3xl text-plum-900 md:text-4xl">
          This path doesn&apos;t exist — yet
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-plum-soft">
          The page you&apos;re looking for may have moved, or perhaps it&apos;s simply time to explore a new
          healing practice instead.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" showArrow>
            Return Home
          </Button>
          <Button href="/healing" variant="secondary">
            Explore Healing
          </Button>
        </div>
      </Container>
    </section>
  );
}
