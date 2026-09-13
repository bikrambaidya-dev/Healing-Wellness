import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { DiscoveryBar } from "@/components/home/discovery-bar";
import { ServicesGrid } from "@/components/home/services-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { ExpertsSection } from "@/components/home/experts-section";
import { CrystalsSection } from "@/components/home/crystals-section";
import { BlogSection } from "@/components/home/blog-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { KnowledgeHub } from "@/components/home/knowledge-hub";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.fullName} | Healing Experts, Meditation & Crystals`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <DiscoveryBar />
      <ServicesGrid />
      <HowItWorks />
      <ExpertsSection />
      <CrystalsSection />
      <BlogSection />
      <TestimonialsSection />
      <KnowledgeHub />
      <CtaSection />
    </>
  );
}
