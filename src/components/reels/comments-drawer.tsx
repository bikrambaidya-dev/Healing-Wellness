"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { ReelComment } from "@/lib/types";
import { getSavedCommenterName, setSavedCommenterName } from "@/lib/reels-store";

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

export function CommentsDrawer({
  comments,
  onClose,
  onSubmit,
}: {
  comments: ReelComment[];
  onClose: () => void;
  onSubmit: (author: string, text: string) => void;
}) {
  const [name, setName] = useState(() => getSavedCommenterName());
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSavedCommenterName(name);
    onSubmit(name, text);
    setText("");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button aria-label="Close comments" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative flex max-h-[75vh] w-full flex-col rounded-t-3xl bg-ivory sm:max-h-[80vh] sm:max-w-md sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-plum/10 px-5 py-4">
          <h3 className="font-serif-display text-lg text-plum-900">Comments ({comments.length})</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {comments.length === 0 ? (
            <p className="py-8 text-center text-sm text-plum-soft">Be the first to comment 💬</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {comments.map((c) => (
                <li key={c.id} className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-plum-900">{c.author}</span>
                    <span className="text-xs text-plum-soft">{timeAgo(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-plum-soft">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-t border-plum/10 p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="rounded-xl border border-plum/15 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-plum/40"
          />
          <div className="flex items-center gap-2">
            <input
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-xl border border-plum/15 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-plum/40"
            />
            <button
              type="submit"
              aria-label="Post comment"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum text-ivory hover:bg-plum-900"
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
