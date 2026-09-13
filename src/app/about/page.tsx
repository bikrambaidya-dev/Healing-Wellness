import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, Leaf, Users } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { images } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story behind ${SITE.fullName} — a premium marketplace connecting you with verified healing experts.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified, Always",
    description: "Every practitioner on Amara is personally reviewed and verified before joining our platform.",
  },
  {
    icon: HeartHandshake,
    title: "Held With Care",
    description: "We design every touchpoint — from booking to your session — to feel calm, safe, and personal.",
  },
  {
    icon: Leaf,
    title: "Rooted in Practice",
    description: "Our offerings are grounded in traditional healing practices, not passing wellness trends.",
  },
  {
    icon: Users,
    title: "Built Around You",
    description: "Whether you're new to healing or deepening an existing practice, we meet you where you are.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A calmer way to heal"
        subtitle="Amara was built on a simple belief: finding the right healing practice shouldn't feel overwhelming, uncertain, or transactional."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={images.mountainRange}
        imageAlt="A wide alpine mountain vista"
      />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={images.saunaInterior} alt="A warm, minimal spa interior" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Amara"
              title="Wellness that feels personal, not transactional"
              subtitle="We started Amara after watching too many people bounce between generic booking apps and mystical, overwhelming crystal shops — never quite finding a space that felt both trustworthy and warm."
            />
            <p className="mt-5 text-base leading-relaxed text-plum-soft">
              Today, Amara brings together verified healing practitioners, thoughtfully curated crystals, and
              genuinely useful wellness writing — all in one calm, considered space. We're intentionally starting
              small, with a curated group of practitioners, so every session on our platform meets the same bar
              of care.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream/60 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What guides everything we build" align="center" className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[1.75rem] border border-plum/10 bg-ivory p-6">
                <div className="flex size-11 items-center justify-center rounded-full bg-sage-light">
                  <v.icon className="size-5 text-sage-dark" strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 font-serif-display text-lg text-plum-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-soft">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 md:py-24 scroll-mt-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get in Touch"
              title="We'd love to hear from you"
              subtitle="Questions about a session, a product, or partnering with Amara as a practitioner — reach out anytime."
            />
            <div className="mt-8 flex flex-col gap-3 text-sm text-plum-soft">
              <p>{SITE.contact.email}</p>
              <p>{SITE.contact.phone}</p>
              <p>{SITE.contact.address}</p>
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
