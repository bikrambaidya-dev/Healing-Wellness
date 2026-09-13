"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, CalendarCheck, Gem, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Healing", href: "/healing", icon: Sparkles },
  { label: "Book", href: "/experts", icon: CalendarCheck },
  { label: "Crystals", href: "/crystals", icon: Gem },
  { label: "Account", href: "/dashboard", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/book/")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-plum/10 bg-ivory/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                active ? "text-plum-900" : "text-plum-soft"
              )}
            >
              <Icon className={cn("size-5", active && "fill-sage-light")} strokeWidth={1.6} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
