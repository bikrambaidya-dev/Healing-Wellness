"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";
import { getCollection, saveCollection, logActivity, slugify } from "@/lib/admin-store";
import { crystals as seedCrystals } from "@/data/crystals";
import { Crystal } from "@/lib/types";
import { GemArt, GemVariant } from "@/components/ui/gem-art";

const STORAGE_KEY = "serenity:admin:crystals";
const gemVariants: GemVariant[] = [
  "amethyst",
  "rose-quartz",
  "clear-quartz",
  "citrine",
  "black-tourmaline",
  "moonstone",
];
const categoryOptions: Crystal["category"][] = ["healing-crystal", "bracelet", "raw-stone", "gift-set"];

type FormState = {
  slug: string;
  name: string;
  category: Crystal["category"];
  purpose: string;
  chakra: string;
  shortDescription: string;
  description: string;
  benefits: string;
  careInstructions: string;
  price: number;
  compareAtPrice: number | "";
  gemVariant: GemVariant;
  inStock: boolean;
};

function emptyForm(): FormState {
  return {
    slug: "",
    name: "",
    category: "healing-crystal",
    purpose: "",
    chakra: "",
    shortDescription: "",
    description: "",
    benefits: "",
    careInstructions: "",
    price: 999,
    compareAtPrice: "",
    gemVariant: "amethyst",
    inStock: true,
  };
}

function crystalToForm(c: Crystal): FormState {
  return {
    slug: c.slug,
    name: c.name,
    category: c.category,
    purpose: c.purpose.join(", "),
    chakra: c.chakra,
    shortDescription: c.shortDescription,
    description: c.description,
    benefits: c.benefits.join("\n"),
    careInstructions: c.careInstructions,
    price: c.price,
    compareAtPrice: c.compareAtPrice ?? "",
    gemVariant: (c.images[0] as GemVariant) ?? "amethyst",
    inStock: c.inStock,
  };
}

export function CrystalsSection() {
  const [list, setList] = useState<Crystal[] | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setList(getCollection<Crystal>(STORAGE_KEY, seedCrystals));
  }, []);

  const totalPages = totalPagesFor(list?.length ?? 0);
  useClampToTotalPages(page, setPage, totalPages);
  const pagedList = list ? paginate(list, page) : [];

  function persist(next: Crystal[]) {
    setList(next);
    saveCollection(STORAGE_KEY, next);
  }

  function openCreate() {
    setEditingSlug(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(c: Crystal) {
    setEditingSlug(c.slug);
    setForm(crystalToForm(c));
    setShowForm(true);
  }

  function removeCrystal(slug: string) {
    if (!list) return;
    if (!window.confirm("Remove this crystal?")) return;
    persist(list.filter((c) => c.slug !== slug));
    logActivity(`Crystal removed: ${slug}`);
  }

  function toggleStock(slug: string) {
    if (!list) return;
    const next = list.map((c) => (c.slug === slug ? { ...c, inStock: !c.inStock } : c));
    persist(next);
    const target = next.find((c) => c.slug === slug);
    logActivity(`${target?.name} marked ${target?.inStock ? "in stock" : "out of stock"}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!list) return;

    const base = {
      name: form.name,
      category: form.category,
      purpose: form.purpose.split(",").map((p) => p.trim()).filter(Boolean),
      chakra: form.chakra,
      shortDescription: form.shortDescription,
      description: form.description,
      benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      careInstructions: form.careInstructions,
      price: form.price,
      compareAtPrice: form.compareAtPrice === "" ? undefined : Number(form.compareAtPrice),
      images: [form.gemVariant],
      inStock: form.inStock,
    };

    if (editingSlug) {
      persist(
        list.map((c) => (c.slug === editingSlug ? { ...c, ...base } : c))
      );
      logActivity(`Crystal updated: ${form.name}`);
    } else {
      const slug = slugify(form.name) || `crystal-${Date.now()}`;
      const entry: Crystal = { slug, rating: 5, reviewCount: 0, ...base };
      persist([entry, ...list]);
      setPage(1);
      logActivity(`New crystal added: ${form.name}`);
    }
    setShowForm(false);
  }

  if (!list) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif-display text-2xl text-plum-900">Crystals</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Crystal
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
            <h3 className="font-serif-display text-lg text-plum-900">{editingSlug ? "Edit Crystal" : "New Crystal"}</h3>
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
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Crystal["category"] })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Chakra
              <input
                value={form.chakra}
                onChange={(e) => setForm({ ...form, chakra: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                placeholder="Heart"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Purpose (comma separated)
              <input
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                placeholder="Peace, Clarity, Relaxation"
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

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Benefits (one per line)
            <textarea
              rows={3}
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Care Instructions
            <textarea
              rows={2}
              value={form.careInstructions}
              onChange={(e) => setForm({ ...form, careInstructions: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Price (₹)
              <input
                type="number"
                min={0}
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Compare-At Price (₹)
              <input
                type="number"
                min={0}
                value={form.compareAtPrice}
                onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                placeholder="Optional"
              />
            </label>
            <label className="flex items-center gap-2.5 self-end pb-3 text-sm font-medium text-plum-900">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="size-4 accent-plum"
              />
              In stock
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-plum-900">Gem Art</p>
            <div className="flex flex-wrap gap-3">
              {gemVariants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setForm({ ...form, gemVariant: variant })}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-colors ${
                    form.gemVariant === variant ? "border-plum bg-plum/5" : "border-plum/10 hover:border-plum/30"
                  }`}
                >
                  <GemArt variant={variant} className="size-10" />
                  <span className="text-[11px] text-plum-soft">{variant}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              {editingSlug ? "Save Changes" : "Add Crystal"}
            </button>
          </div>
          </form>
        </div>
      )}

      {list.length === 0 && (
        <div className="rounded-2xl border border-plum/10 px-4 py-8 text-center text-plum-soft">No crystals yet.</div>
      )}

      {list.length > 0 && (
        <div className="flex flex-col gap-3 lg:hidden">
          {pagedList.map((c) => (
            <div key={c.slug} className="flex items-center gap-3 rounded-2xl border border-plum/10 p-4">
              <GemArt variant={(c.images[0] as GemVariant) ?? "amethyst"} className="size-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-plum-900">{c.name}</p>
                <p className="text-xs text-plum-soft">{c.category}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-plum-900">₹{c.price.toLocaleString("en-IN")}</span>
                  <button
                    onClick={() => toggleStock(c.slug)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      c.inStock ? "bg-sage-light text-sage-dark" : "bg-blush-light text-plum-soft"
                    }`}
                  >
                    {c.inStock ? "In Stock" : "Out of Stock"}
                  </button>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => openEdit(c)} aria-label="Edit crystal" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => removeCrystal(c.slug)} aria-label="Remove crystal" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {list.length > 0 && (
        <div className="hidden overflow-x-auto rounded-2xl border border-plum/10 lg:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-plum/10 text-plum-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Crystal</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {pagedList.map((c) => (
                <tr key={c.slug} className="border-b border-plum/5 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <GemArt variant={(c.images[0] as GemVariant) ?? "amethyst"} className="size-8" />
                      <span className="text-plum-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-plum-soft">{c.category}</td>
                  <td className="px-4 py-3 text-plum-900">₹{c.price.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(c.slug)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        c.inStock ? "bg-sage-light text-sage-dark" : "bg-blush-light text-plum-soft"
                      }`}
                    >
                      {c.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(c)} aria-label="Edit crystal" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => removeCrystal(c.slug)} aria-label="Remove crystal" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
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
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={list.length} itemLabel="crystal" />
      )}
    </div>
  );
}
