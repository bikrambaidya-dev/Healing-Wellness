"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Pencil, X, Upload, Link2, Heart, MessageCircle, Share2, Clapperboard } from "lucide-react";
import { getReels, saveReels } from "@/lib/reels-store";
import { logActivity } from "@/lib/admin-store";
import { captureVideoPoster } from "@/lib/video-poster";
import { uploadFile } from "@/lib/upload-client";
import { images } from "@/lib/images";
import { Expert, Reel } from "@/lib/types";
import { ImagePicker } from "@/components/admin/image-picker";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";

type SourceMode = "upload" | "url";

type FormState = {
  title: string;
  caption: string;
  tags: string;
  poster: string;
  videoUrl: string;
  sourceMode: SourceMode;
};

function emptyForm(): FormState {
  return {
    title: "",
    caption: "",
    tags: "",
    poster: images.heroMeditation,
    videoUrl: "",
    sourceMode: "url",
  };
}

function reelToForm(r: Reel): FormState {
  return {
    title: r.title,
    caption: r.caption,
    tags: r.tags.join(", "),
    poster: r.poster,
    videoUrl: r.videoUrl ?? "",
    sourceMode: "url",
  };
}

export function ExpertReelsSection({ expert }: { expert: Expert }) {
  const [allReels, setAllReels] = useState<Reel[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getReels().then(setAllReels);
  }, []);

  const myReels = (allReels ?? []).filter((r) => r.expertSlug === expert.slug);
  const totalPages = totalPagesFor(myReels.length);
  useClampToTotalPages(page, setPage, totalPages);
  const paginatedList = paginate(myReels, page);

  function persist(next: Reel[]) {
    setAllReels(next);
    saveReels(next);
  }

  function openCreate() {
    setEditingId(null);
    setPendingFile(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(r: Reel) {
    setEditingId(r.id);
    setPendingFile(null);
    setForm(reelToForm(r));
    setShowForm(true);
  }

  async function removeReel(reel: Reel) {
    if (!allReels) return;
    if (!window.confirm("Remove this reel?")) return;
    persist(allReels.filter((r) => r.id !== reel.id));
    logActivity(`${expert.name} removed a reel: ${reel.title}`);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    try {
      const poster = await captureVideoPoster(file);
      setForm((f) => ({ ...f, poster }));
    } catch {
      // Keep the previously chosen poster if a frame couldn't be captured.
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allReels) return;

    if (form.sourceMode === "url" && !form.videoUrl.trim()) {
      window.alert("Add a video URL, or switch to Upload from device.");
      return;
    }
    if (form.sourceMode === "upload" && !pendingFile && !form.videoUrl) {
      window.alert("Choose a video file to upload.");
      return;
    }

    setSaving(true);
    try {
      const videoUrl =
        form.sourceMode === "upload" && pendingFile
          ? await uploadFile(pendingFile, "reels")
          : form.videoUrl.trim();

      const base = {
        title: form.title,
        caption: form.caption,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        authorName: expert.name,
        authorImage: expert.image,
        expertSlug: expert.slug,
        poster: form.poster,
        videoUrl,
      };

      if (editingId) {
        persist(allReels.map((r) => (r.id === editingId ? { ...r, ...base } : r)));
        logActivity(`${expert.name} updated a reel: ${form.title}`);
      } else {
        const entry: Reel = {
          id: `reel-${Date.now()}`,
          createdAt: Date.now(),
          likes: 0,
          shares: 0,
          views: 0,
          comments: [],
          ...base,
        };
        persist([entry, ...allReels]);
        setPage(1);
        logActivity(`${expert.name} posted a new reel: ${entry.title}`);
      }

      setShowForm(false);
      setPendingFile(null);
    } finally {
      setSaving(false);
    }
  }

  if (!allReels) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif-display text-2xl text-plum-900">My Reels</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Reel
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
              <h3 className="font-serif-display text-lg text-plum-900">{editingId ? "Edit Reel" : "Post a Reel"}</h3>
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
                  placeholder="5-minute morning breathwork"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
                Tags (comma separated)
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="breathwork, calm, morning"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
              Caption
              <textarea
                required
                rows={2}
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              />
            </label>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-plum-900">Video source</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, sourceMode: "upload" })}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
                    form.sourceMode === "upload" ? "bg-plum text-ivory" : "bg-cream text-plum-soft"
                  }`}
                >
                  <Upload className="size-3.5" /> Upload from device
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, sourceMode: "url" })}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
                    form.sourceMode === "url" ? "bg-plum text-ivory" : "bg-cream text-plum-soft"
                  }`}
                >
                  <Link2 className="size-3.5" /> Video URL
                </button>
              </div>

              {form.sourceMode === "upload" ? (
                <div className="flex flex-col gap-1.5">
                  <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="text-sm text-plum-soft" />
                  <p className="text-xs text-plum-soft">
                    {pendingFile
                      ? `Selected: ${pendingFile.name}`
                      : form.videoUrl
                        ? "Using the previously uploaded file. Choose a new one to replace it."
                        : "Uploads are stored in Vercel Blob and visible to everyone."}
                  </p>
                </div>
              ) : (
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="https://.../video.mp4"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-plum-900">Thumbnail</p>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.poster} alt="" className="h-20 w-14 rounded-lg object-cover" />
                <ImagePicker value={form.poster} onChange={(url) => setForm({ ...form, poster: url })} />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900 disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Post Reel"}
              </button>
            </div>
          </form>
        </div>
      )}

      {myReels.length === 0 && (
        <div className="rounded-2xl border border-dashed border-plum/20 p-10 text-center text-plum-soft">
          <Clapperboard className="mx-auto mb-3 size-6 text-plum-soft" strokeWidth={1.6} />
          No reels yet. Share a short video with your clients to get started.
        </div>
      )}

      {myReels.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {paginatedList.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-2xl border border-plum/10">
              <div className="relative aspect-[9/16] w-full bg-plum/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.poster} alt={r.title} className="h-full w-full object-cover" />
                <div className="absolute right-2 top-2 flex gap-1">
                  <button onClick={() => openEdit(r)} aria-label="Edit reel" className="rounded-lg bg-black/50 p-1.5 text-ivory hover:bg-black/70">
                    <Pencil className="size-3.5" />
                  </button>
                  <button onClick={() => removeReel(r)} aria-label="Remove reel" className="rounded-lg bg-black/50 p-1.5 text-ivory hover:bg-black/70">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-plum-900">{r.title}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-plum-soft">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5" /> {r.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" /> {r.comments.length}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Share2 className="size-3.5" /> {r.shares}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {myReels.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={myReels.length} itemLabel="reel" />
      )}
    </div>
  );
}
