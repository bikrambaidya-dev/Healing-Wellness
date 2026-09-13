import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { experts } from "@/data/experts";
import { crystals } from "@/data/crystals";
import { blogPosts } from "@/data/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/healing",
    "/experts",
    "/crystals",
    "/blog",
    "/experiences",
    "/about",
    "/faqs",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const healingRoutes = services.map((s) => ({
    url: `${SITE.url}/healing/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const expertRoutes = experts.map((e) => ({
    url: `${SITE.url}/experts/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const crystalRoutes = crystals.map((c) => ({
    url: `${SITE.url}/crystals/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...healingRoutes, ...expertRoutes, ...crystalRoutes, ...blogRoutes];
}
