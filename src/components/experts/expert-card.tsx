import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Languages, MapPin } from "lucide-react";
import { Expert } from "@/lib/types";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article className="group grid grid-cols-1 overflow-hidden rounded-[2rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-plum-900/10 md:grid-cols-[0.85fr_1.15fr]">
      <div className="relative h-72 md:h-full">
        <Image
          src={expert.image}
          alt={`Portrait of ${expert.name}, ${expert.title}`}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 via-transparent to-transparent md:bg-gradient-to-r" />
        <div className="absolute left-4 top-4">
          {expert.available ? (
            <Badge tone="sage" className="bg-ivory/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-sage-dark" /> Available
            </Badge>
          ) : (
            <Badge tone="sand" className="bg-ivory/90 backdrop-blur-sm">
              Fully Booked
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-7 md:p-9">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif-display text-2xl text-plum-900 md:text-[1.75rem]">
              {expert.name}
            </h3>
            <span title="Verified practitioner">
              <BadgeCheck className="size-5 fill-sage-dark text-ivory" />
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-sage-dark">{expert.title}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-plum-soft">
            <Rating value={expert.rating} reviewCount={expert.reviewCount} />
            <span>{expert.sessionsCount}+ Sessions</span>
            <span>{expert.experienceYears} Years Experience</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-plum-soft">{expert.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {expert.specialties.map((s) => (
              <Badge key={s} tone="lavender">
                {s}
              </Badge>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-plum-soft">
            <span className="inline-flex items-center gap-1.5">
              <Languages className="size-3.5" /> {expert.languages.join(", ")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {expert.location}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-plum/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs text-plum-soft">Session from</span>
            <p className="font-serif-display text-xl text-plum-900">{formatPrice(expert.priceFrom)}</p>
          </div>
          <div className="flex gap-3">
            <Button href={`/experts/${expert.slug}`} variant="secondary" size="sm">
              View Profile
            </Button>
            <Button href={`/experts/${expert.slug}#book`} size="sm" showArrow>
              Book a Session
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
