import { getCrystals } from "@/lib/server/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { CrystalCard } from "@/components/crystals/crystal-card";
import { Button } from "@/components/ui/button";

export async function CrystalsSection() {
  const crystals = await getCrystals();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Crystal Boutique"
            title="Discover the Energy of Crystals"
            subtitle="Explore thoughtfully selected crystals for intention, balance, and mindful living."
          />
          <Button href="/crystals" variant="tertiary" showArrow className="shrink-0">
            Visit the shop
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crystals.map((crystal) => (
            <CrystalCard key={crystal.slug} crystal={crystal} />
          ))}
        </div>
      </Container>
    </section>
  );
}
