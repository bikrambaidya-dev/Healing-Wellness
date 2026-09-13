import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[1.75rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-plum-900/10",
        featured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div className={cn("relative h-56 w-full overflow-hidden", featured && "sm:h-auto sm:w-1/2")}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={featured ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "justify-center sm:p-9")}>
        <div className="flex items-center gap-3">
          <Badge tone="sage">{post.category}</Badge>
          <span className="text-xs text-plum-soft">{date}</span>
        </div>
        <h3 className={cn("font-serif-display text-plum-900 leading-snug", featured ? "text-2xl md:text-3xl" : "text-xl")}>
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-plum-soft">{post.excerpt}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-plum-soft">
            <Clock className="size-3.5" /> {post.readingTime} min read
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-plum-900">
            Read Article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
