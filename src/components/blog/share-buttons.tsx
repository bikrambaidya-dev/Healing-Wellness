"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const shareTargets = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`,
    },
    {
      label: "Facebook",
      href: "https://facebook.com/sharer/sharer.php",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/sharing/share-offsite/",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareTargets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center justify-center rounded-full border border-plum/15 px-4 text-xs font-semibold text-plum-soft transition-colors hover:border-plum/30 hover:text-plum-900"
        >
          {t.label}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="flex h-9 items-center justify-center gap-1.5 rounded-full border border-plum/15 px-4 text-xs font-semibold text-plum-soft transition-colors hover:border-plum/30 hover:text-plum-900"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
