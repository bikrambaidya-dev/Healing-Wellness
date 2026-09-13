"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Star } from "lucide-react";
import { getCollection, saveCollection, logActivity, slugify } from "@/lib/admin-store";
import { experts as seedExperts } from "@/data/experts";
import { images, ImageKey } from "@/lib/images";
import { Expert } from "@/lib/types";

const STORAGE_KEY = "amara:admin:experts";
const imageKeys = Object.keys(images) as ImageKey[];

type FormState = {
  slug: string;
  name: string;
  title: string;
  specialties: string;
  bio: string;
  experienceYears: number;
  location: string;
  priceFrom: number;
  available: boolean;
  image: string;
};

function emptyForm(): FormState {
  return {
    slug: "",
    name: "",
    title: "",
    specialties: "",
    bio: "",
    experienceYears: 1,
    location: "",
    priceFrom: 999,
    available: true,
    image: images[imageKeys[0]],
  };
}

function expertToForm(x: Expert): FormState {
  return {
    slug: x.slug,
    name: x.name,
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

function ImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
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

export function ExpertsSection() {
  const [list, setList] = useState<Expert[] | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setList(getCollection<Expert>(STORAGE_KEY, seedExperts));
  }, []);

  function persist(next: Expert[]) {
    setList(next);
    saveCollection(STORAGE_KEY, next);
  }

  function openCreate() {
    setEditingSlug(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(x: Expert) {
    setEditingSlug(x.slug);
    setForm(expertToForm(x));
    setShowForm(true);
  }

  function removeExpert(slug: string) {
    if (!list) return;
    if (!window.confirm("Remove this expert?")) return;
    persist(list.filter((x) => x.slug !== slug));
    logActivity(`Expert removed: ${slug}`);
  }

  function toggleAvailable(slug: string) {
    if (!list) return;
    const next = list.map((x) => (x.slug === slug ? { ...x, available: !x.available } : x));
    persist(next);
    const target = next.find((x) => x.slug === slug);
    logActivity(`Expert ${target?.name} marked ${target?.available ? "available" : "unavailable"}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!list) return;

    const specialties = form.specialties.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingSlug) {
      const next = list.map((x) =>
        x.slug === editingSlug
          ? {
              ...x,
              name: form.name,
              title: form.title,
              specialties,
              bio: form.bio,
              experienceYears: form.experienceYears,
              location: form.location,
              priceFrom: form.priceFrom,
              available: form.available,
              image: form.image,
            }
          : x
      );
      persist(next);
      logActivity(`Expert updated: ${form.name}`);
    } else {
      const slug = slugify(form.name) || `expert-${Date.now()}`;
      const entry: Expert = {
        slug,
        name: form.name,
        title: form.title,
        specialties,
        bio: form.bio,
        longBio: [form.bio],
        approach: form.bio,
        experienceYears: form.experienceYears,
        rating: 5,
        reviewCount: 0,
        sessionsCount: 0,
        languages: ["English"],
        location: form.location,
        certifications: [],
        image: form.image,
        gallery: [form.image],
        priceFrom: form.priceFrom,
        available: form.available,
        nextAvailable: "Contact for availability",
        servicesOffered: [],
        availability: [],
      };
      persist([entry, ...list]);
      logActivity(`New expert added: ${entry.name}`);
    }
    setShowForm(false);
  }

  if (!list) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-2xl text-plum-900">Experts</h2>
        {!showForm && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
          >
            <Plus className="size-4" /> New Expert
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-plum/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display text-lg text-plum-900">{editingSlug ? "Edit Expert" : "New Expert"}</h3>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
              <X className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
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
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              {editingSlug ? "Save Changes" : "Add Expert"}
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <div className="overflow-x-auto rounded-2xl border border-plum/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-plum/10 text-plum-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Specialties</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Price From</th>
                <th className="px-4 py-3 font-medium">Available</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-plum-soft">
                    No experts yet.
                  </td>
                </tr>
              )}
              {list.map((x) => (
                <tr key={x.slug} className="border-b border-plum/5 last:border-0">
                  <td className="px-4 py-3 text-plum-900">{x.name}</td>
                  <td className="px-4 py-3 text-plum-soft">{x.specialties.join(", ")}</td>
                  <td className="px-4 py-3 text-plum-soft">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-gold text-gold" /> {x.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-plum-900">₹{x.priceFrom.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAvailable(x.slug)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        x.available ? "bg-sage-light text-sage-dark" : "bg-blush-light text-plum-soft"
                      }`}
                    >
                      {x.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(x)} aria-label="Edit expert" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => removeExpert(x.slug)} aria-label="Remove expert" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
