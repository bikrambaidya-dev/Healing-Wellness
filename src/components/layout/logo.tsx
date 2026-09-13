import Link from "next/link";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M20 4C20 4 27 12 27 20C27 25.5228 23.9706 30 20 30C16.0294 30 13 25.5228 13 20C13 12 20 4 20 4Z"
          fill="var(--color-sage)"
          opacity="0.85"
        />
        <path
          d="M20 12C20 12 30 17 32 24C33.5 29.2 30 33 25 32.5C20.5 32 20 26 20 26"
          stroke="var(--color-gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M20 12C20 12 10 17 8 24C6.5 29.2 10 33 15 32.5C19.5 32 20 26 20 26"
          stroke="var(--color-gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
      <span className="font-serif-display text-2xl tracking-wide text-plum-900">{SITE.name}</span>
    </Link>
  );
}
