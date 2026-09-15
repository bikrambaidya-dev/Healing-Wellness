"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { getCollection, saveCollection, logActivity, slugify } from "@/lib/admin-store";
import { services } from "@/data/services";
import { images } from "@/lib/images";
import { HealingService } from "@/lib/types";
import { ImagePicker } from "@/components/admin/image-picker";
import { Badge } from "@/components/ui/badge";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";

const STORAGE_KEY = "serenity:admin:healing";
const iconOptions = ["Hand", "Sparkles", "CircleDot", "CircleDashed", "Gem", "Waves"];
const colorOptions: HealingService["color"][] = ["sage", "lavender", "blush", "sand"];

type DurationDraft = { label: string; minutes: number; priceFrom: number };

type FormState = {
  slug: string;
  name: string;
  tagline: string;
  keywords: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  benefits: string;
  color: HealingService["color"];
  priceFrom: number;
  durations: DurationDraft[];
};

function emptyForm(): FormState {
  return {
    slug: "",
    name: "",
    tagline: "",
    keywords: "",
    shortDescription: "",
    description: "",
    image: images.healingHands,
    icon: iconOptions[0],
    benefits: "",
    color: "sage",
    priceFrom: 1499,
    durations: [{ label: "Full Session", minutes: 60, priceFrom: 1499 }],
  };
}

function serviceToForm(s: HealingService): FormState {
  return {
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    keywords: s.keywords.join(", "),
    shortDescription: s.shortDescription,
    description: s.description,
    image: s.image,
    icon: s.icon,
    benefits: s.benefits.join("\n"),
    color: s.color,
    priceFrom: s.priceFrom,
    durations: s.durations,
  };
}

export function HealingSection() {
  const [list, setList] = useState<HealingService[] | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCollection<HealingService>(STORAGE_KEY, services).then(setList);
  }, []);

  const totalPages = totalPagesFor(list?.length ?? 0);
  useClampToTotalPages(page, setPage, totalPages);
  const pagedList = list ? paginate(list, page) : [];

  function persist(next: HealingService[]) {
    setList(next);
    saveCollection(STORAGE_KEY, next);
  }

  function openCreate() {
    setEditingSlug(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(s: HealingService) {
    setEditingSlug(s.slug);
    setForm(serviceToForm(s));
    setShowForm(true);
  }

  function removeService(slug: string) {
    if (!list) return;
    if (!window.confirm("Remove this healing service?")) return;
    persist(list.filter((s) => s.slug !== slug));
    logActivity(`Healing service removed: ${slug}`);
  }

  function updateDuration(index: number, patch: Partial<DurationDraft>) {
    setForm((f) => ({ ...f, durations: f.durations.map((d, i) => (i === index ? { ...d, ...patch } : d)) }));
  }

  function addDuration() {
    setForm((f) => ({ ...f, durations: [...f.durations, { label: "", minutes: 30, priceFrom: f.priceFrom }] }));
  }

  function removeDuration(index: number) {
    setForm((f) => ({ ...f, durations: f.durations.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!list) return;

    const base = {
      name: form.name,
      tagline: form.tagline,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      shortDescription: form.shortDescription,
      description: form.description,
      image: form.image,
      icon: form.icon,
      benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      color: form.color,
      priceFrom: form.priceFrom,
      durations: form.durations.filter((d) => d.label.trim()),
    };

    if (editingSlug) {
      persist(list.map((s) => (s.slug === editingSlug ? { ...s, ...base } : s)));
      logActivity(`Healing service updated: ${form.name}`);
    } else {
      const slug = slugify(form.name) || `service-${Date.now()}`;
      persist([{ slug, ...base }, ...list]);
      setPage(1);
      logActivity(`New healing service added: ${form.name}`);
    }
    setShowForm(false);
  }

  if (!list) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif-display text-2xl text-plum-900">Healing Services</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close panel"
            onClick={() => setShowForm(false)}
            className="absolute inset-0 animate-fade-in bg-plum-900/40"
          />
          <form
            onSubmit={handleSubmit}
            className="relative flex h-full w-full max-w-lg animate-slide-in-right flex-col gap-4 overflow-y-auto bg-ivory p-6 shadow-2xl"
          >
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display text-lg text-plum-900">{editingSlug ? "Edit Service" : "New Service"}</h3>
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
              Tagline
              <input
                required
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                placeholder="Energy • Balance • Relaxation"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Short Description
            <textarea
              required
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Full Description
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Image
              <ImagePicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Icon
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              >
                {iconOptions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Color Theme
              <select
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value as HealingService["color"] })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              >
                {colorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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
              Keywords (comma separated)
              <input
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Benefits (one per line)
            <textarea
              rows={3}
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-plum-900">Session Durations</p>
              <button type="button" onClick={addDuration} className="text-xs font-semibold text-plum hover:underline">
                + Add duration
              </button>
            </div>
            {form.durations.map((d, i) => (
              <div key={i} className="grid grid-cols-1 gap-2 rounded-xl border border-plum/10 p-4 sm:grid-cols-[1fr_120px_120px_auto]">
                <input
                  value={d.label}
                  onChange={(e) => updateDuration(i, { label: e.target.value })}
                  placeholder="Label"
                  className="rounded-xl border border-plum/15 bg-ivory px-3 py-2 text-sm outline-none focus:border-plum/40"
                />
                <input
                  type="number"
                  min={0}
                  value={d.minutes}
                  onChange={(e) => updateDuration(i, { minutes: Number(e.target.value) })}
                  placeholder="Minutes"
                  className="rounded-xl border border-plum/15 bg-ivory px-3 py-2 text-sm outline-none focus:border-plum/40"
                />
                <input
                  type="number"
                  min={0}
                  value={d.priceFrom}
                  onChange={(e) => updateDuration(i, { priceFrom: Number(e.target.value) })}
                  placeholder="Price"
                  className="rounded-xl border border-plum/15 bg-ivory px-3 py-2 text-sm outline-none focus:border-plum/40"
                />
                {form.durations.length > 1 && (
                  <button type="button" onClick={() => removeDuration(i)} aria-label="Remove duration" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              {editingSlug ? "Save Changes" : "Add Service"}
            </button>
          </div>
          </form>
        </div>
      )}

      {list.length === 0 && (
        <div className="rounded-2xl border border-plum/10 px-4 py-8 text-center text-plum-soft">No healing services yet.</div>
      )}

      {list.length > 0 && (
        <div className="flex flex-col gap-3 lg:hidden">
          {pagedList.map((s) => (
            <div key={s.slug} className="flex items-center gap-3 rounded-2xl border border-plum/10 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-plum-900">{s.name}</p>
                <p className="truncate text-xs text-plum-soft">{s.tagline}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-plum-900">₹{s.priceFrom.toLocaleString("en-IN")}</span>
                  <Badge tone={s.color}>{s.color}</Badge>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => openEdit(s)} aria-label="Edit service" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => removeService(s.slug)} aria-label="Remove service" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {list.length > 0 && (
        <div className="hidden overflow-x-auto rounded-2xl border border-plum/10 lg:block">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-plum/10 text-plum-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Tagline</th>
                <th className="px-4 py-3 font-medium">Price From</th>
                <th className="px-4 py-3 font-medium">Theme</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {pagedList.map((s) => (
                <tr key={s.slug} className="border-b border-plum/5 last:border-0">
                  <td className="px-4 py-3 text-plum-900">{s.name}</td>
                  <td className="px-4 py-3 text-plum-soft">{s.tagline}</td>
                  <td className="px-4 py-3 text-plum-900">₹{s.priceFrom.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <Badge tone={s.color}>{s.color}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(s)} aria-label="Edit service" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => removeService(s.slug)} aria-label="Remove service" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
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

      {list.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={list.length} itemLabel="service" />
      )}
    </div>
  );
}
