import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, Languages, MapPin, GraduationCap } from "lucide-react";
import { getExperts, getExpertBySlug, getTestimonials } from "@/lib/server/content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { ExpertProfileTabs } from "@/components/experts/expert-profile-tabs";
import { SaveExpertButton } from "@/components/experts/save-expert-button";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const experts = await getExperts();
  return experts.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) return {};
  return {
    title: expert.name,
    description: expert.bio,
    alternates: { canonical: `/experts/${expert.slug}` },
    openGraph: { images: [{ url: expert.image }] },
  };
}

export default async function ExpertDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) notFound();

  const testimonials = await getTestimonials();
  const reviews = testimonials.filter((t) => t.service.includes(expert.name));

  return (
    <>
      <section className="border-b border-plum/10 bg-cream/50 py-10 md:py-14">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Experts", href: "/experts" }, { label: expert.name }]}
          />

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="relative mx-auto size-40 shrink-0 overflow-hidden rounded-[2rem] border-4 border-ivory shadow-lg md:mx-0 md:size-48">
              <Image src={expert.image} alt={expert.name} fill sizes="192px" className="object-cover" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif-display text-3xl text-plum-900 md:text-4xl">{expert.name}</h1>
                <BadgeCheck className="size-6 fill-sage-dark text-ivory" />
              </div>
              <p className="mt-1 text-base font-medium text-sage-dark">{expert.title}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-plum-soft">
                <Rating value={expert.rating} reviewCount={expert.reviewCount} size="md" />
                <span>{expert.sessionsCount}+ Sessions</span>
                <span>{expert.experienceYears} Years Experience</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {expert.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Languages className="size-3.5" /> {expert.languages.join(", ")}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {expert.specialties.map((s) => (
                  <Badge key={s} tone="lavender">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-xs text-plum-soft">Session from</span>
                  <p className="font-serif-display text-2xl text-plum-900">{formatPrice(expert.priceFrom)}</p>
                </div>
                <Button href={`/book/${expert.slug}/${expert.servicesOffered[0].serviceSlug}`} showArrow id="book">
                  Book a Session
                </Button>
                <SaveExpertButton slug={expert.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ExpertProfileTabs expert={expert} reviews={reviews} />

          <aside className="flex flex-col gap-6">
            <div className="rounded-[1.75rem] border border-plum/10 bg-cream/60 p-6">
              <h3 className="inline-flex items-center gap-2 font-serif-display text-lg text-plum-900">
                <GraduationCap className="size-4.5 text-sage-dark" /> Credentials
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {expert.certifications.map((c) => (
                  <li key={c} className="text-sm text-plum-soft">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {expert.gallery.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] bg-plum p-6 text-ivory">
              <p className="font-serif-display text-lg italic">&ldquo;{expert.approach}&rdquo;</p>
              <p className="mt-3 text-sm text-ivory/70">— {expert.name}</p>
            </div>
          </aside>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: expert.name,
            jobTitle: expert.title,
            description: expert.bio,
            image: expert.image,
            url: `${SITE.url}/experts/${expert.slug}`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: expert.rating,
              reviewCount: expert.reviewCount,
            },
          }),
        }}
      />
    </>
  );
}
