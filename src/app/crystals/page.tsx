import type { Metadata } from "next";
import { crystals } from "@/data/crystals";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { CrystalsShopClient } from "@/components/crystals/crystals-shop-client";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Crystal Shop",
  description:
    "Explore thoughtfully selected healing crystals for intention, balance, and mindful living — Amethyst, Rose Quartz, Citrine, and more.",
  alternates: { canonical: "/crystals" },
};

export default function CrystalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Crystal Boutique"
        title="Discover the Energy of Crystals"
        subtitle="Explore thoughtfully selected crystals for intention, balance, and mindful living."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Crystals" }]}
        image={images.treeReflection}
        imageAlt="A golden tree reflected in still water"
      />
      <section className="py-16 md:py-24">
        <Container>
          <CrystalsShopClient crystals={crystals} />
        </Container>
      </section>
    </>
  );
}
