import type { Metadata } from "next";
import { getExperts } from "@/lib/server/content";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ExpertsListingClient } from "@/components/experts/experts-listing-client";
import { images } from "@/lib/images";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Healing Experts",
  description:
    "Meet Serenity's verified healing practitioners — browse specialties, experience, ratings, and book a session directly.",
  alternates: { canonical: "/experts" },
};

export default async function ExpertsPage() {
  const experts = await getExperts();
  return (
    <>
      <PageHero
        eyebrow="Verified Practitioners"
        title="Meet Your Healing Guides"
        subtitle="Connect with experienced practitioners who are here to support your journey — every profile is reviewed and verified before joining Serenity."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Experts" }]}
        image={images.saunaInterior}
        imageAlt="A warm, minimal spa interior"
      />
      <section className="py-16 md:py-24">
        <Container>
          <ExpertsListingClient experts={experts} />
        </Container>
      </section>
    </>
  );
}
