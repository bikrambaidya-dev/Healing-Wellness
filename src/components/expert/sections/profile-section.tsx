"use client";

import { useState } from "react";
import { Expert } from "@/lib/types";
import { ImagePicker } from "@/components/admin/image-picker";
import { logActivity } from "@/lib/admin-store";

type FormState = {
  title: string;
  specialties: string;
  bio: string;
  experienceYears: number;
  location: string;
  priceFrom: number;
  available: boolean;
  image: string;
};

function expertToForm(x: Expert): FormState {
  return {
    title: x.title,
    specialties: x.specialties.join(", "),
    bio: x.bio,
    experienceYears: x.experienceYears,
    location: x.location,
    priceFrom: x.priceFrom,
    available: x.available,
    image: x.image,
  };
}

export function ExpertProfileSection({ expert, onSave }: { expert: Expert; onSave: (next: Expert) => void }) {
  const [form, setForm] = useState<FormState>(expertToForm(expert));
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Expert = {
      ...expert,
      title: form.title,
      specialties: form.specialties.split(",").map((s) => s.trim()).filter(Boolean),
      bio: form.bio,
      experienceYears: form.experienceYears,
      location: form.location,
      priceFrom: form.priceFrom,
      available: form.available,
      image: form.image,
    };
    onSave(next);
    logActivity(`${expert.name} updated their profile`);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif-display text-2xl text-plum-900">My Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-plum/10 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="Verified Reiki Practitioner"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Location
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="Mumbai, India"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Specialties (comma separated)
          <input
            value={form.specialties}
            onChange={(e) => setForm({ ...form, specialties: e.target.value })}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            placeholder="Reiki Healing, Chakra Balancing"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Bio
          <textarea
            required
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Experience (years)
            <input
              type="number"
              min={0}
              value={form.experienceYears}
              onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Price From (₹)
            <input
              type="number"
              min={0}
              value={form.priceFrom}
              onChange={(e) => setForm({ ...form, priceFrom: Number(e.target.value) })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Photo
            <ImagePicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          </label>
          <label className="flex items-center gap-2.5 self-end pb-3 text-sm font-medium text-plum-900">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
              className="size-4 accent-plum"
            />
            Available for bookings
          </label>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-sage-dark">Saved</span>}
          <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
