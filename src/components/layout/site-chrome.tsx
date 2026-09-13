"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import MobileBottomNav from "./mobile-bottom-nav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isImmersive = isAdmin || pathname?.startsWith("/reels");

  if (isImmersive) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
