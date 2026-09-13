"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CalendarCheck } from "lucide-react";
import { Expert } from "@/lib/types";
import { Testimonial } from "@/lib/types";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

const tabs = ["About", "Services", "Reviews", "Availability"] as const;

export function ExpertProfileTabs({
  expert,
  reviews,
}: {
  expert: Expert;
  reviews: Testimonial[];
}) {
  const [active, setActive] = useState<(typeof tabs)[number]>("About");

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto rounded-full border border-plum/10 bg-cream/60 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              active === tab ? "bg-plum text-ivory shadow-sm" : "text-plum-soft hover:text-plum-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {active === "About" && (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-serif-display text-xl text-plum-900">About {expert.name.split(" ")[0]}</h3>
              <div className="mt-4 flex flex-col gap-4">
                {expert.longBio.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-plum-soft">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-plum/10 bg-cream/50 p-6">
              <h4 className="font-serif-display text-lg text-plum-900">Healing Approach</h4>
              <p className="mt-2 text-sm italic leading-relaxed text-plum-soft">&ldquo;{expert.approach}&rdquo;</p>
            </div>
            <div>
              <h4 className="font-serif-display text-lg text-plum-900">Certifications</h4>
              <ul className="mt-3 flex flex-col gap-2">
                {expert.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-plum-soft">
                    <span className="size-1.5 shrink-0 rounded-full bg-sage-dark" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === "Services" && (
          <div className="flex flex-col gap-4">
            {expert.servicesOffered.map((service) => (
              <div
                key={service.serviceSlug}
                className="flex flex-col gap-4 rounded-2xl border border-plum/10 bg-ivory p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="font-serif-display text-lg text-plum-900">{service.name}</h4>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-plum-soft">
                    <Clock className="size-3.5" /> {service.duration}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-plum-soft">{service.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <p className="font-serif-display text-xl text-plum-900">{formatPrice(service.price)}</p>
                  <Link
                    href={`/book/${expert.slug}/${service.serviceSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-plum-900"
                  >
                    Book <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "Reviews" && (
          <div className="flex flex-col gap-5">
            {reviews.length === 0 && (
              <p className="text-sm text-plum-soft">No reviews yet for this practitioner.</p>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl border border-plum/10 bg-ivory p-6">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={r.image} alt={r.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-plum-900">{r.name}</p>
                    <p className="text-xs text-plum-soft">{r.date}</p>
                  </div>
                  <Rating value={r.rating} size="sm" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-plum-soft">&ldquo;{r.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {active === "Availability" && (
          <div>
            <div className="mb-6 flex items-center gap-2 rounded-2xl border border-sage-dark/20 bg-sage-light/30 px-5 py-3 text-sm text-sage-dark">
              <CalendarCheck className="size-4" /> Next available: {expert.nextAvailable}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expert.availability.map((day) => (
                <div key={day.day} className="rounded-2xl border border-plum/10 bg-ivory p-5">
                  <p className="font-serif-display text-base text-plum-900">{day.day}</p>
                  {day.slots.length === 0 ? (
                    <p className="mt-3 text-xs text-plum-soft">Unavailable</p>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {day.slots.map((slot) => (
                        <span
                          key={slot.time}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-xs font-medium",
                            slot.available
                              ? "bg-sage-light text-sage-dark"
                              : "bg-plum/5 text-plum-soft/50 line-through"
                          )}
                        >
                          {slot.time}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
