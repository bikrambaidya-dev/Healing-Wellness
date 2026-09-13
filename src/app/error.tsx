"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center py-20">
      <Container className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-blush-light">
          <AlertTriangle className="size-7 text-plum-900" strokeWidth={1.6} />
        </div>
        <h1 className="mt-6 font-serif-display text-3xl text-plum-900 md:text-4xl">Something interrupted us</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-plum-soft">
          We hit an unexpected error while loading this page. Please try again — your session details are safe.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} showArrow>
            Try Again
          </Button>
          <Button href="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
