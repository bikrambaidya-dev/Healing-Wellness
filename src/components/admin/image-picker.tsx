"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { images, ImageKey } from "@/lib/images";
import { uploadFile } from "@/lib/upload-client";

const imageKeys = Object.keys(images) as ImageKey[];

export function ImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasMatch = imageKeys.some((k) => images[k] === value);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, "images");
      onChange(url);
    } catch {
      window.alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
      >
        {!hasMatch && <option value={value}>Current image</option>}
        {imageKeys.map((k) => (
          <option key={k} value={images[k]}>
            {k}
          </option>
        ))}
      </select>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-plum/15 px-3 py-3 text-xs font-medium text-plum-soft transition-colors hover:bg-plum/5 disabled:opacity-60"
      >
        <Upload className="size-3.5" />
        {uploading ? "Uploading…" : "Upload"}
      </button>
    </div>
  );
}
