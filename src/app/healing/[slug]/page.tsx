import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, ArrowUpRight } from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import { experts } from "@/data/experts";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/healing/${service.slug}` },
    openGraph: { images: [{ url: service.image }] },
  };
}

export default async function HealingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const providers = experts.filter((e) => e.servicesOffered.some((s) => s.serviceSlug === service.slug));

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Healing", href: "/healing" },
          { label: service.name },
        ]}
        image={service.image}
        imageAlt={service.name}
      />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900 md:text-3xl">
              About {service.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-plum-soft">{service.description}</p>

            <h3 className="mt-10 font-serif-display text-xl text-plum-900">What to expect</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-plum-soft">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-light">
                    <Check className="size-3 text-sage-dark" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {providers.length > 0 && (
              <div className="mt-12">
                <h3 className="font-serif-display text-xl text-plum-900">Available with</h3>
                <div className="mt-5 flex flex-col gap-4">
                  {providers.map((expert) => (
                    <Link
                      key={expert.slug}
                      href={`/experts/${expert.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-plum/10 bg-ivory p-4 transition-all hover:border-sage-dark/30 hover:shadow-md"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                        <Image src={expert.image} alt={expert.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif-display text-lg text-plum-900">{expert.name}</p>
                        <p className="text-sm text-plum-soft">{expert.title}</p>
                        <Rating value={expert.rating} reviewCount={expert.reviewCount} className="mt-1" />
                      </div>
                      <ArrowUpRight className="size-5 text-plum-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-plum/10 bg-cream/60 p-7 lg:sticky lg:top-28">
            <h3 className="font-serif-display text-xl text-plum-900">Session Options</h3>
            <div className="mt-5 flex flex-col gap-3">
              {service.durations.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between rounded-2xl border border-plum/10 bg-ivory px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-plum-900">{d.label}</p>
                    <p className="inline-flex items-center gap-1 text-xs text-plum-soft">
                      <Clock className="size-3" /> {d.minutes} min
                    </p>
                  </div>
                  <p className="font-serif-display text-lg text-plum-900">{formatPrice(d.priceFrom)}</p>
                </div>
              ))}
            </div>
            <Button href="/experts" className="mt-6 w-full" showArrow>
              Book This Session
            </Button>
            <p className="mt-3 text-center text-xs text-plum-soft">
              Choose your practitioner on the next step.
            </p>
          </aside>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            areaServed: "IN",
            provider: { "@type": "Organization", name: SITE.fullName },
            offers: service.durations.map((d) => ({
              "@type": "Offer",
              price: d.priceFrom,
              priceCurrency: "INR",
              name: d.label,
            })),
          }),
        }}
      />
    </>
  );
}
