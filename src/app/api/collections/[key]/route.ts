import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { CollectionDoc } from "@/lib/models/collection-doc";
import { isCollectionKey } from "@/lib/collection-keys";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  if (!isCollectionKey(key)) {
    return NextResponse.json({ error: "Unknown collection key" }, { status: 404 });
  }

  await dbConnect();
  const doc = await CollectionDoc.findOne({ key }).lean();
  return NextResponse.json({ items: doc?.items ?? [] });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  if (!isCollectionKey(key)) {
    return NextResponse.json({ error: "Unknown collection key" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Body must be { items: [] }" }, { status: 400 });
  }

  await dbConnect();
  await CollectionDoc.findOneAndUpdate(
    { key },
    { $set: { items: body.items } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}
