"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Clapperboard, Newspaper, UserRound, LogOut } from "lucide-react";
import { clearExpertSession, getSessionExpert } from "@/lib/expert-auth";
import { getCollection, saveCollection } from "@/lib/admin-store";
import { experts as seedExperts } from "@/data/experts";
import { Expert } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ExpertBookingsSection } from "./sections/bookings-section";
import { ExpertProfileSection } from "./sections/profile-section";
import { ExpertReelsSection } from "./sections/reels-section";
import { ExpertBlogSection } from "./sections/blog-section";

const EXPERTS_KEY = "serenity:admin:experts";

const tabs = [
  { key: "bookings", label: "Bookings", icon: CalendarClock },
  { key: "reels", label: "Reels", icon: Clapperboard },
  { key: "blog", label: "Blog", icon: Newspaper },
  { key: "profile", label: "Profile", icon: UserRound },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ExpertShell() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("bookings");
  const [expert, setExpert] = useState<Expert | null | undefined>(undefined);

  useEffect(() => {
    getSessionExpert().then((found) => {
      if (!found) {
        router.replace("/login");
        return;
      }
      setExpert(found);
    });
  }, [router]);

  function handleLogout() {
    clearExpertSession();
    router.push("/login");
  }

  async function handleProfileSave(next: Expert) {
    const list = await getCollection<Expert>(EXPERTS_KEY, seedExperts);
    saveCollection(
      EXPERTS_KEY,
      list.map((x) => (x.slug === next.slug ? next : x))
    );
    setExpert(next);
  }

  if (expert === undefined) return null;
  if (expert === null) return null;

  return (
    <div className="grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[240px_1fr] lg:pb-0">
      <nav className="hidden lg:flex lg:flex-col lg:gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex w-full shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                tab === t.key ? "bg-plum text-ivory" : "text-plum-soft hover:bg-plum/5"
              )}
            >
              <Icon className="size-4.5" strokeWidth={1.6} />
              {t.label}
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="mt-2 flex w-full shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-plum-soft transition-colors hover:bg-plum/5"
        >
          <LogOut className="size-4.5" strokeWidth={1.6} />
          Log out
        </button>
      </nav>

      <div>
        {tab === "bookings" && <ExpertBookingsSection expertSlug={expert.slug} />}
        {tab === "reels" && <ExpertReelsSection expert={expert} />}
        {tab === "blog" && <ExpertBlogSection expert={expert} />}
        {tab === "profile" && <ExpertProfileSection expert={expert} onSave={handleProfileSave} />}
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-between border-t border-plum/10 bg-ivory/95 px-1 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors",
                active ? "text-plum" : "text-plum-soft"
              )}
            >
              <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
              <span className="text-[11px] font-medium leading-none">{t.label}</span>
            </button>
          );
        })}
        <button onClick={handleLogout} className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-plum-soft transition-colors">
          <LogOut className="size-5" strokeWidth={1.6} />
          <span className="text-[11px] font-medium leading-none">Log out</span>
        </button>
      </nav>
    </div>
  );
}
