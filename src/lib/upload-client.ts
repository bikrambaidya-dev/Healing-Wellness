"use client";

import { upload } from "@vercel/blob/client";

/** Uploads a file straight from the browser to Vercel Blob storage and returns its public URL. */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const blob = await upload(`${folder}/${Date.now()}-${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
  });
  return blob.url;
}
