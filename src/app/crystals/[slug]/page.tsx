import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkle, Shield, RotateCcw } from "lucide-react";
import { getCrystals, getCrystalBySlug } from "@/lib/server/content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { GemArt, type GemVariant } from "@/components/ui/gem-art";
import { CrystalCard } from "@/components/crystals/crystal-card";
import { AddToCartPanel } from "@/components/crystals/add-to-cart-panel";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const crystals = await getCrystals();
  return crystals.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crystal = await getCrystalBySlug(slug);
  if (!crystal) return {};
  return {
    title: crystal.name,
    description: crystal.shortDescription,
    alternates: { canonical: `/crystals/${crystal.slug}` },
  };
}

export default async function CrystalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const crystal = await getCrystalBySlug(slug);
  if (!crystal) notFound();

  const crystals = await getCrystals();
  const related = crystals.filter((c) => c.slug !== crystal.slug).slice(0, 3);

  return (
    <>
      <section className="py-10 md:py-14">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Crystals", href: "/crystals" },
              { label: crystal.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-b from-cream to-sand/40">
              <GemArt variant={crystal.images[0] as GemVariant} className="h-full w-full p-14" />
            </div>

            <div className="flex flex-col gap-4">
              <Badge tone="lavender" className="w-fit">
                {crystal.chakra} Chakra
              </Badge>
              <h1 className="font-serif-display text-3xl text-plum-900 md:text-4xl">{crystal.name}</h1>
              <Rating value={crystal.rating} reviewCount={crystal.reviewCount} size="md" />
              <p className="text-base leading-relaxed text-plum-soft">{crystal.description}</p>

              <div className="flex flex-wrap gap-2">
                {crystal.purpose.map((p) => (
                  <Badge key={p} tone="blush">
                    {p}
                  </Badge>
                ))}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-serif-display text-3xl text-plum-900">{formatPrice(crystal.price)}</span>
                {crystal.compareAtPrice && (
                  <span className="text-base text-plum-soft line-through">
                    {formatPrice(crystal.compareAtPrice)}
                  </span>
                )}
              </div>

              <AddToCartPanel crystal={crystal} />

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-plum/10 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-xs text-plum-soft">
                  <Shield className="size-4 text-sage-dark" /> Ethically sourced
                </div>
                <div className="flex items-center gap-2 text-xs text-plum-soft">
                  <RotateCcw className="size-4 text-sage-dark" /> 7-day easy returns
                </div>
                <div className="flex items-center gap-2 text-xs text-plum-soft">
                  <Sparkle className="size-4 text-sage-dark" /> Cleansed before shipping
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-serif-display text-xl text-plum-900">Benefits</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {crystal.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-plum-soft">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage-dark" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif-display text-xl text-plum-900">Care Instructions</h2>
              <p className="mt-4 text-sm leading-relaxed text-plum-soft">{crystal.careInstructions}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-plum/10 bg-cream/50 py-16 md:py-20">
        <Container>
          <h2 className="font-serif-display text-2xl text-plum-900">You may also like</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CrystalCard key={c.slug} crystal={c} />
            ))}
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: crystal.name,
            description: crystal.description,
            image: `${SITE.url}/opengraph-image`,
            offers: {
              "@type": "Offer",
              price: crystal.price,
              priceCurrency: "INR",
              availability: crystal.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: crystal.rating,
              reviewCount: crystal.reviewCount,
            },
          }),
        }}
      />
    </>
  );
}
