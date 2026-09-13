import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-ivory">
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-plum/5 px-3 py-1 text-xs font-semibold text-plum-soft sm:inline">
              Admin Dashboard
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-soft hover:text-plum-900"
          >
            View Site <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
