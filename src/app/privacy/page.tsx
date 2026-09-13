import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you book a session or create an account, we collect basic details like your name, email, and phone number so practitioners can prepare for your session.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to confirm bookings, send reminders, personalize recommendations, and improve the Serenity experience. We never sell your data to third parties.",
  },
  {
    title: "Local Storage",
    body: "This experience stores your wishlist, cart, and booking history locally in your browser to keep the demo experience fast and personal — it is not transmitted to a server.",
  },
  {
    title: "Your Choices",
    body: "You can update your profile information anytime from your Dashboard, or contact us to request account deletion.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
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
