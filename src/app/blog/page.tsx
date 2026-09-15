import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/server/content";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { BlogListingClient } from "@/components/blog/blog-listing-client";
import { images } from "@/lib/images";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Wellness Insights",
  description:
    "Practical, grounded writing on meditation, Reiki, angel healing, crystals, chakras, and mindful living.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Insights for Your Inner Journey"
        subtitle="Practical, grounded writing on meditation, energy healing, and mindful living."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        image={images.bridgeForest}
        imageAlt="A wooden bridge leading into a quiet forest"
      />
      <section className="py-16 md:py-24">
        <Container>
          <BlogListingClient posts={blogPosts} />
        </Container>
      </section>
    </>
  );
}
