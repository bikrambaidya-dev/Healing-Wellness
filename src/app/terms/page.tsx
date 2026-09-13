import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Booking & Sessions",
    body: "Sessions booked through Serenity are provided by independent, verified practitioners. Serenity facilitates discovery and booking but is not a substitute for medical or mental health care.",
  },
  {
    title: "2. Cancellations",
    body: "Sessions may be rescheduled or cancelled up to 12 hours in advance through your Dashboard. Late cancellations may be subject to the practitioner's individual policy.",
  },
  {
    title: "3. Crystal Purchases",
    body: "All crystal listings are described to the best of our knowledge. Natural stones vary in size, color, and clarity — this is part of their character, not a defect.",
  },
  {
    title: "4. Account Responsibility",
    body: "You are responsible for maintaining accurate account information and for any activity under your account.",
  },
  {
    title: "5. Changes to These Terms",
    body: `${SITE.fullName} may update these terms periodically. Continued use of the platform constitutes acceptance of the current terms.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <section className="py-16 md:py-24">
        <Container className="max-w-2xl">
          <p className="text-sm text-plum-soft">Last updated January 2026</p>
          <div className="mt-8 flex flex-col gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif-display text-xl text-plum-900">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-plum-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
