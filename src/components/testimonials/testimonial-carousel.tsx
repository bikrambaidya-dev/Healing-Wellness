"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(clamped);
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const track = e.currentTarget;
          const index = Math.round(track.scrollLeft / (track.children[0]?.clientWidth ?? 1));
          setActive(index);
        }}
      >
        {testimonials.map((t) => (
          <article
            key={t.id}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-[2rem] border border-plum/10 bg-ivory p-8 shadow-sm sm:w-[60%] md:w-[45%] md:p-10 lg:w-[32%]"
          >
            <Quote className="size-8 text-sage-light" fill="currentColor" strokeWidth={0} />
            <p className="flex-1 font-serif-display text-lg italic leading-relaxed text-plum-900 text-balance">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-plum/10 pt-5">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                <Image src={t.image} alt={t.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-plum-900">{t.name}</p>
                <p className="text-xs text-plum-soft">{t.service}</p>
              </div>
              <Rating value={t.rating} size="sm" />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollToIndex(active - 1)}
          aria-label="Previous testimonial"
          className="flex size-10 items-center justify-center rounded-full border border-plum/15 text-plum-900 transition-colors hover:bg-plum/5 disabled:opacity-30"
          disabled={active === 0}
        >
          <ChevronLeft className="size-4.5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active === i ? "w-6 bg-plum-900" : "w-1.5 bg-plum/20"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => scrollToIndex(active + 1)}
          aria-label="Next testimonial"
          className="flex size-10 items-center justify-center rounded-full border border-plum/15 text-plum-900 transition-colors hover:bg-plum/5 disabled:opacity-30"
          disabled={active === testimonials.length - 1}
        >
          <ChevronRight className="size-4.5" />
        </button>
      </div>
    </div>
  );
}
