import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperts, getExpertBySlug } from "@/lib/server/content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const revalidate = 60;

export async function generateStaticParams() {
  const experts = await getExperts();
  return experts.flatMap((e) => e.servicesOffered.map((s) => ({ expert: e.slug, service: s.serviceSlug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ expert: string; service: string }>;
}): Promise<Metadata> {
  const { expert: expertSlug } = await params;
  const expert = await getExpertBySlug(expertSlug);
  if (!expert) return {};
  return {
    title: `Book a Session with ${expert.name}`,
    robots: { index: false, follow: true },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ expert: string; service: string }>;
}) {
  const { expert: expertSlug, service: serviceSlug } = await params;
  const expert = await getExpertBySlug(expertSlug);
  if (!expert) notFound();

  const offeredSlugs = expert.servicesOffered.map((s) => s.serviceSlug);
  const initialServiceSlug = offeredSlugs.includes(serviceSlug) ? serviceSlug : offeredSlugs[0];

  return (
    <section className="py-10 md:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Experts", href: "/experts" },
            { label: expert.name, href: `/experts/${expert.slug}` },
            { label: "Book" },
          ]}
        />
        <h1 className="mt-4 font-serif-display text-3xl text-plum-900 md:text-4xl">
          Book a Session with {expert.name}
        </h1>
        <p className="mt-2 text-sm text-plum-soft">
          A few quick steps and your healing session will be reserved.
        </p>

        <div className="mt-10">
          <BookingWizard expert={expert} initialServiceSlug={initialServiceSlug} />
        </div>
      </Container>
    </section>
  );
}
