"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { getCollection, saveCollection, logActivity, slugify } from "@/lib/admin-store";
import { blogPosts } from "@/data/blog";
import { images } from "@/lib/images";
import { BlogPost } from "@/lib/types";
import { ImagePicker } from "@/components/admin/image-picker";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";

const STORAGE_KEY = "serenity:admin:blogs";

type SectionDraft = { heading: string; body: string };

type FormState = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readingTime: number;
  tags: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  sections: SectionDraft[];
};

function emptyForm(): FormState {
  return {
    slug: "",
    title: "",
    category: "",
    excerpt: "",
    image: images.healingHands,
    date: new Date().toISOString().slice(0, 10),
    readingTime: 5,
    tags: "",
    authorName: "",
    authorRole: "",
    authorImage: images.expertPriya,
    sections: [{ heading: "", body: "" }],
  };
}

function postToForm(post: BlogPost): FormState {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    image: post.image,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags.join(", "),
    authorName: post.author.name,
    authorRole: post.author.role,
    authorImage: post.author.image,
    sections: post.content.map((c) => ({ heading: c.heading, body: c.body.join("\n") })),
  };
}

export function BlogsSection() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCollection<BlogPost>(STORAGE_KEY, blogPosts).then(setPosts);
  }, []);

  const totalPages = totalPagesFor(posts?.length ?? 0);
  useClampToTotalPages(page, setPage, totalPages);
  const pagedPosts = posts ? paginate(posts, page) : [];

  function persist(next: BlogPost[]) {
    setPosts(next);
    saveCollection(STORAGE_KEY, next);
  }

  function openCreate() {
    setEditingSlug(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(post: BlogPost) {
    setEditingSlug(post.slug);
    setForm(postToForm(post));
    setShowForm(true);
  }

  function removePost(slug: string) {
    if (!posts) return;
    if (!window.confirm("Delete this blog post?")) return;
    persist(posts.filter((p) => p.slug !== slug));
    logActivity(`Blog post deleted: ${slug}`);
  }

  function updateSection(index: number, patch: Partial<SectionDraft>) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function addSection() {
    setForm((f) => ({ ...f, sections: [...f.sections, { heading: "", body: "" }] }));
  }

  function removeSection(index: number) {
    setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!posts) return;

    const slug = editingSlug ?? (slugify(form.title) || `post-${Date.now()}`);
    const post: BlogPost = {
      slug,
      title: form.title,
      category: form.category,
      excerpt: form.excerpt,
      image: form.image,
      date: form.date,
      readingTime: form.readingTime,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: { name: form.authorName, role: form.authorRole, image: form.authorImage },
      content: form.sections
        .filter((s) => s.heading.trim() || s.body.trim())
        .map((s) => ({
          heading: s.heading,
          body: s.body.split("\n").map((line) => line.trim()).filter(Boolean),
        })),
    };

    if (editingSlug) {
      persist(posts.map((p) => (p.slug === editingSlug ? post : p)));
      logActivity(`Blog post updated: ${post.title}`);
    } else {
      persist([post, ...posts]);
      setPage(1);
      logActivity(`New blog post published: ${post.title}`);
    }
    setShowForm(false);
  }

  if (!posts) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif-display text-2xl text-plum-900">Blogs</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Post
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
            <h3 className="font-serif-display text-lg text-plum-900">{editingSlug ? "Edit Post" : "New Post"}</h3>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
              <X className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Title
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Category
              <input
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                placeholder="Reiki"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Excerpt
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Cover Image
              <ImagePicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Reading Time (min)
              <input
                type="number"
                min={1}
                value={form.readingTime}
                onChange={(e) => setForm({ ...form, readingTime: Number(e.target.value) })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Tags (comma separated)
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="reiki, energy healing, beginners"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Author Name
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Author Role
              <input
                required
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Author Image
              <ImagePicker value={form.authorImage} onChange={(url) => setForm({ ...form, authorImage: url })} />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-plum-900">Content Sections</p>
              <button type="button" onClick={addSection} className="text-xs font-semibold text-plum hover:underline">
                + Add section
              </button>
            </div>
            {form.sections.map((s, i) => (
              <div key={i} className="rounded-xl border border-plum/10 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-plum-soft">Section {i + 1}</span>
                  {form.sections.length > 1 && (
                    <button type="button" onClick={() => removeSection(i)} aria-label="Remove section" className="text-plum-soft hover:text-plum-900">
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
                <input
                  value={s.heading}
                  onChange={(e) => updateSection(i, { heading: e.target.value })}
                  placeholder="Section heading"
                  className="mb-2 w-full rounded-xl border border-plum/15 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-plum/40"
                />
                <textarea
                  value={s.body}
                  onChange={(e) => updateSection(i, { body: e.target.value })}
                  placeholder="One paragraph per line"
                  rows={3}
                  className="w-full rounded-xl border border-plum/15 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-plum/40"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              {editingSlug ? "Save Changes" : "Publish Post"}
            </button>
          </div>
          </form>
        </div>
      )}

      {posts.length === 0 && (
        <div className="rounded-2xl border border-plum/10 px-4 py-8 text-center text-plum-soft">No posts yet.</div>
      )}

      {posts.length > 0 && (
        <div className="flex flex-col gap-3 lg:hidden">
          {pagedPosts.map((p) => (
            <div key={p.slug} className="flex items-center gap-3 rounded-2xl border border-plum/10 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-plum-900">{p.title}</p>
                <p className="truncate text-xs text-plum-soft">{p.category} · {p.date}</p>
                <p className="mt-1 truncate text-xs text-plum-soft">{p.tags.join(", ")}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => openEdit(p)} aria-label="Edit post" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => removePost(p.slug)} aria-label="Delete post" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <div className="hidden overflow-x-auto rounded-2xl border border-plum/10 lg:block">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-plum/10 text-plum-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {pagedPosts.map((p) => (
                <tr key={p.slug} className="border-b border-plum/5 last:border-0">
                  <td className="px-4 py-3 text-plum-900">{p.title}</td>
                  <td className="px-4 py-3 text-plum-soft">{p.category}</td>
                  <td className="px-4 py-3 text-plum-soft">{p.date}</td>
                  <td className="px-4 py-3 text-plum-soft">{p.tags.join(", ")}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} aria-label="Edit post" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => removePost(p.slug)} aria-label="Delete post" className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900">
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

      {posts.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={posts.length} itemLabel="post" />
      )}
    </div>
  );
}
