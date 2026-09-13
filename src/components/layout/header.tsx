"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SearchTrigger } from "@/components/search/search-overlay";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const pathname = usePathname();

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-ivory/90 backdrop-blur-md border-b border-plum/10 shadow-[0_1px_0_rgba(58,38,48,0.04)]"
          : "bg-ivory/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="container-wide flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.95rem] font-medium transition-colors relative py-1",
                  active ? "text-plum-900" : "text-plum-soft hover:text-plum-900"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-sage-dark" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <SearchTrigger />
          <Link
            href="/login"
            className="px-4 py-2 text-[0.95rem] font-medium text-plum-soft hover:text-plum-900 transition-colors"
          >
            Login
          </Link>
          <Button href="/experts" size="sm">
            Book a Session
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <SearchTrigger />
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full text-plum hover:bg-plum/5"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-plum/10 bg-ivory animate-fade-up">
          <nav className="container-wide flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-plum-900 hover:bg-sage-light/40"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-plum/10 pt-4">
              <Button href="/login" variant="secondary">
                Login
              </Button>
              <Button href="/experts">Book a Session</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
