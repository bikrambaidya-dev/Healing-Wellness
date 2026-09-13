import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1.5 text-xs", light ? "text-ivory/70" : "text-plum-soft")}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className={light ? "hover:text-ivory" : "hover:text-plum-900"}>
              {item.label}
            </Link>
          ) : (
            <span className={light ? "text-ivory" : "text-plum-900"}>{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="size-3" />}
        </span>
      ))}
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}
