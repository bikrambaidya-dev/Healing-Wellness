import { getBlogPosts } from "@/lib/server/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";

export async function BlogSection() {
  const blogPosts = await getBlogPosts();
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1, 3);

  return (
    <section className="bg-cream/60 py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Knowledge Hub"
            title="Insights for Your Inner Journey"
            subtitle="Practical, grounded writing on meditation, energy healing, and mindful living."
          />
          <Button href="/blog" variant="tertiary" showArrow className="shrink-0">
            Visit the blog
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <BlogCard post={featured} featured />
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
