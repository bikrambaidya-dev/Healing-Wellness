import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPostBySlug } from "@/data/blog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const picks = [
  { slug: "understanding-reiki", label: "Understanding Reiki", note: "Learn how Reiki sessions work." },
  { slug: "finding-the-right-crystal", label: "Finding the Right Crystal", note: "A beginner's guide to crystal intentions." },
  { slug: "5-minutes-of-daily-meditation", label: "5 Minutes of Daily Meditation", note: "Simple mindfulness techniques for everyday life." },
];

export function KnowledgeHub() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Learn. Reflect. Grow." title="Learn. Reflect. Grow." align="center" className="mx-auto" />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {picks.map((pick) => {
            const post = getPostBySlug(pick.slug);
            if (!post) return null;
            return (
              <Link
                key={pick.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-plum-900/10"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={pick.label}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-serif-display text-lg text-plum-900">{pick.label}</h3>
                  <p className="text-sm text-plum-soft">{pick.note}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/blog" variant="tertiary" showArrow>
            Explore the Knowledge Hub
          </Button>
        </div>
      </Container>
    </section>
  );
}
