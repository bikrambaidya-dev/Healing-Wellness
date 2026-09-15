import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { CollectionDoc } from "@/lib/models/collection-doc";
import { experts } from "@/data/experts";
import { services } from "@/data/services";
import { crystals } from "@/data/crystals";
import { blogPosts } from "@/data/blog";
import { testimonials } from "@/data/testimonials";
import { seedAppointments } from "@/data/bookings";
import { seedUsers } from "@/data/users";
import { reels } from "@/data/reels";

export const dynamic = "force-dynamic";

const SEEDS: Record<string, unknown[]> = {
  "serenity:admin:experts": experts,
  "serenity:admin:healing": services,
  "serenity:admin:crystals": crystals,
  "serenity:admin:blogs": blogPosts,
  "serenity:testimonials": testimonials,
  "serenity:admin:bookings": seedAppointments,
  "serenity:admin:users": seedUsers,
  "serenity:reels": reels,
  "serenity:admin:activity": [],
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-seed-secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const force = req.nextUrl.searchParams.get("force") === "true";

  await dbConnect();

  const results: Record<string, string> = {};
  for (const [key, items] of Object.entries(SEEDS)) {
    if (!force) {
      const existing = await CollectionDoc.findOne({ key }).lean();
      if (existing) {
        results[key] = `skipped (already has ${existing.items?.length ?? 0} items)`;
        continue;
      }
    }
    await CollectionDoc.findOneAndUpdate(
      { key },
      { $set: { items } },
      { upsert: true }
    );
    results[key] = `seeded ${items.length} items`;
  }

  return NextResponse.json({ ok: true, results });
}
