"use client";

import { images, ImageKey } from "@/lib/images";

const imageKeys = Object.keys(images) as ImageKey[];

export function ImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const hasMatch = imageKeys.some((k) => images[k] === value);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
    >
      {!hasMatch && <option value={value}>Current image</option>}
      {imageKeys.map((k) => (
        <option key={k} value={images[k]}>
          {k}
        </option>
      ))}
    </select>
  );
}
