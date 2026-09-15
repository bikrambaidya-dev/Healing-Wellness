import type { Metadata } from "next";
import { getServices } from "@/lib/server/content";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { HealingListingClient } from "@/components/healing/healing-listing-client";
import { images } from "@/lib/images";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Healing & Wellness Practices",
  description:
    "Explore Reiki, Angel Healing, Meditation, Chakra Balancing, Crystal Healing, and Sound Healing — guided by verified practitioners.",
  alternates: { canonical: "/healing" },
};

export default async function HealingPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Healing Practices"
        title="Explore Healing & Wellness"
        subtitle="Discover practices designed to support your mind, energy, and inner wellbeing — each guided by a verified practitioner."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Healing" }]}
        image={images.forestSunbeams}
        imageAlt="Sunbeams through an autumn forest"
      />
      <section className="py-16 md:py-24">
        <Container>
          <HealingListingClient services={services} />
        </Container>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/healing/${s.slug}`,
              name: s.name,
            })),
          }),
        }}
      />
    </>
  );
}
