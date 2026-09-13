import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/faqs/faq-accordion";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about booking, sessions, crystals, and your Serenity account.",
  alternates: { canonical: "/faqs" },
};

const faqs = [
  {
    id: "booking",
    question: "How do I book a healing session?",
    answer:
      "Browse experts or healing practices, choose a practitioner, and select 'Book a Session.' You'll pick a service, date, and time, then confirm your details — no account required, though creating one lets you track appointments.",
  },
  {
    question: "Can I reschedule or cancel a session?",
    answer:
      "Yes. From your Dashboard, open the appointment and choose Reschedule or Cancel. We recommend at least 12 hours' notice out of respect for your practitioner's time.",
  },
  {
    question: "Are sessions held online or in person?",
    answer:
      "Both. Each expert profile lists whether they offer online, in-person, or both — you'll choose during booking.",
  },
  {
    question: "How are practitioners verified?",
    answer:
      "Every practitioner on Serenity submits certifications and experience history, which our team reviews before they're approved to list sessions.",
  },
  {
    question: "What's your crystal return policy?",
    answer:
      "Crystals can be returned within 7 days of delivery if unused and in original packaging. Reach out to our support team to start a return.",
  },
  {
    question: "Do you ship crystals internationally?",
    answer: "Currently we ship within India only, with international shipping planned for the future.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about booking, sessions, and your account."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <FaqAccordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
