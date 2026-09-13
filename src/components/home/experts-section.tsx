import { experts } from "@/data/experts";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ExpertCard } from "@/components/experts/expert-card";
import { Button } from "@/components/ui/button";

export function ExpertsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Verified Practitioners"
            title="Meet Your Healing Guides"
            subtitle="Connect with experienced practitioners who are here to support your journey."
          />
          <Button href="/experts" variant="tertiary" showArrow className="shrink-0">
            View all experts
          </Button>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </div>
      </Container>
    </section>
  );
}
