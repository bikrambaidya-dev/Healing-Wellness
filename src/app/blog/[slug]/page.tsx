import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { slugify } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { images: [{ url: post.image }], type: "article", publishedTime: post.date },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const fallback = blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 2 - related.length);
  const relatedPosts = [...related, ...fallback];

  return (
    <>
      <article>
        <div className="relative h-[50vh] min-h-[360px] w-full">
          <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/40 to-plum-900/20" />
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-12">
              <Breadcrumbs
                light
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.title },
                ]}
              />
              <Badge tone="sage" className="mt-4 w-fit bg-ivory/90">
                {post.category}
              </Badge>
              <h1 className="mt-4 max-w-3xl font-serif-display text-3xl leading-tight text-ivory text-balance sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-ivory/80">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> {date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {post.readingTime} min read
                </span>
                <span>By {post.author.name}</span>
              </div>
            </Container>
          </div>
        </div>

        <Container className="py-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2.2fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-plum-soft">
                    Table of Contents
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2.5 border-l border-plum/10 pl-4">
                    {post.content.map((section) => (
                      <li key={section.heading}>
                        <a
                          href={`#${slugify(section.heading)}`}
                          className="text-sm text-plum-soft hover:text-plum-900"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 border-t border-plum/10 pt-6">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={post.author.image} alt={post.author.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-plum-900">{post.author.name}</p>
                    <p className="text-xs text-plum-soft">{post.author.role}</p>
                  </div>
                </div>
                <ShareButtons title={post.title} />
              </div>
            </aside>

            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed text-plum-soft">{post.excerpt}</p>
              {post.content.map((section) => (
                <div key={section.heading} className="mt-10">
                  <h2
                    id={slugify(section.heading)}
                    className="font-serif-display text-2xl text-plum-900 scroll-mt-28"
                  >
                    {section.heading}
                  </h2>
                  {section.body.map((para, i) => (
                    <p key={i} className="mt-4 text-base leading-relaxed text-plum-soft">
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              <div className="mt-10 flex flex-wrap gap-2 border-t border-plum/10 pt-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} tone="sand">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 lg:hidden">
                <ShareButtons title={post.title} />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-plum/10 bg-cream/50 py-16 md:py-20">
          <Container>
            <h2 className="font-serif-display text-2xl text-plum-900">Related Articles</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author.name },
            publisher: { "@type": "Organization", name: SITE.fullName },
            mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
          }),
        }}
      />
    </>
  );
}
