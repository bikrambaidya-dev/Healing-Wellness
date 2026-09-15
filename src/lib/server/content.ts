// Server-only data access for public pages. Reads the same MongoDB
// collections the admin/expert panels write to (via /api/collections),
// so edits made there show up here — without a network round trip, since
// these run inside Server Components / route handlers already on the server.
// Falls back to the static /src/data fixtures if Mongo is unreachable or a
// collection hasn't been seeded yet, so the site still renders.
import "server-only";
import { dbConnect } from "@/lib/db";
import { CollectionDoc } from "@/lib/models/collection-doc";
import { experts as seedExperts } from "@/data/experts";
import { services as seedServices } from "@/data/services";
import { crystals as seedCrystals } from "@/data/crystals";
import { blogPosts as seedBlogPosts } from "@/data/blog";
import { testimonials as seedTestimonials } from "@/data/testimonials";
import { reels as seedReels } from "@/data/reels";
import { Expert, HealingService, Crystal, BlogPost, Testimonial, Reel } from "@/lib/types";

async function readCollection<T>(key: string, fallback: T[]): Promise<T[]> {
  try {
    await dbConnect();
    const doc = await CollectionDoc.findOne({ key }).lean();
    if (doc && Array.isArray(doc.items) && doc.items.length > 0) {
      return doc.items as T[];
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export async function getExperts(): Promise<Expert[]> {
  return readCollection<Expert>("serenity:admin:experts", seedExperts);
}

export async function getExpertBySlug(slug: string): Promise<Expert | undefined> {
  const list = await getExperts();
  return list.find((e) => e.slug === slug);
}

export async function getServices(): Promise<HealingService[]> {
  return readCollection<HealingService>("serenity:admin:healing", seedServices);
}

export async function getServiceBySlug(slug: string): Promise<HealingService | undefined> {
  const list = await getServices();
  return list.find((s) => s.slug === slug);
}

export async function getCrystals(): Promise<Crystal[]> {
  return readCollection<Crystal>("serenity:admin:crystals", seedCrystals);
}

export async function getCrystalBySlug(slug: string): Promise<Crystal | undefined> {
  const list = await getCrystals();
  return list.find((c) => c.slug === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return readCollection<BlogPost>("serenity:admin:blogs", seedBlogPosts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const list = await getBlogPosts();
  return list.find((p) => p.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return readCollection<Testimonial>("serenity:testimonials", seedTestimonials);
}

export async function getPublicReels(): Promise<Reel[]> {
  return readCollection<Reel>("serenity:reels", seedReels);
}
