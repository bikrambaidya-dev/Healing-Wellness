"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarClock,
  Flower2,
  Gem,
  Newspaper,
  Users,
  Sparkles,
  Clapperboard,
  Settings,
  LogOut,
  MoreHorizontal,
  X,
} from "lucide-react";
import { clearAdminSession, hasAdminSession } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";
import { OverviewSection } from "./sections/overview-section";
import { BookingsSection } from "./sections/bookings-section";
import { HealingSection } from "./sections/healing-section";
import { CrystalsSection } from "./sections/crystals-section";
import { BlogsSection } from "./sections/blogs-section";
import { ExpertsSection } from "./sections/experts-section";
import { ReelsSection } from "./sections/reels-section";
import { UsersSection } from "./sections/users-section";

const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarClock },
  { key: "healing", label: "Healing", icon: Flower2 },
  { key: "crystals", label: "Crystals", icon: Gem },
  { key: "reels", label: "Reels", icon: Clapperboard },
  { key: "blogs", label: "Blogs", icon: Newspaper },
  { key: "experts", label: "Experts", icon: Sparkles },
  { key: "users", label: "Users", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const primaryTabKeys: TabKey[] = ["overview", "bookings", "experts", "reels"];
const primaryTabs = primaryTabKeys.map((key) => tabs.find((t) => t.key === key)!);
const moreTabs = tabs.filter((t) => !primaryTabKeys.includes(t.key));

export function AdminShell() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("overview");
  const [checked, setChecked] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (!hasAdminSession()) {
      router.replace("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearAdminSession();
    router.push("/login");
  }

  function selectTab(key: TabKey) {
    setTab(key);
    setMoreOpen(false);
  }

  if (!checked) return null;

  const sectionByTab: Record<TabKey, React.ReactNode> = {
    overview: <OverviewSection />,
    bookings: <BookingsSection />,
    healing: <HealingSection />,
    crystals: <CrystalsSection />,
    reels: <ReelsSection />,
    blogs: <BlogsSection />,
    experts: <ExpertsSection />,
    users: <UsersSection />,
    settings: (
      <div className="rounded-2xl border border-dashed border-plum/20 p-10 text-center">
        <h2 className="font-serif-display text-2xl text-plum-900">Settings</h2>
        <p className="mt-2 text-sm text-plum-soft">This section is coming soon.</p>
      </div>
    ),
  };

  const activeInMore = moreTabs.some((t) => t.key === tab);

  return (
    <div className="grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[240px_1fr] lg:pb-0">
      <nav className="hidden lg:flex lg:flex-col lg:gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
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

      <div>{sectionByTab[tab]}</div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-between border-t border-plum/10 bg-ivory/95 px-1 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden">
        {primaryTabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
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
        <button
          onClick={() => setMoreOpen(true)}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors",
            activeInMore ? "text-plum" : "text-plum-soft"
          )}
        >
          <MoreHorizontal className="size-5" strokeWidth={activeInMore ? 2 : 1.6} />
          <span className="text-[11px] font-medium leading-none">More</span>
        </button>
      </nav>

      {/* Mobile "More" bottom sheet */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            className="absolute inset-0 animate-fade-in bg-plum-900/40"
          />
          <div className="relative max-h-[75vh] animate-slide-in-up overflow-y-auto rounded-t-3xl bg-ivory p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="font-serif-display text-lg text-plum-900">More</h3>
              <button type="button" onClick={() => setMoreOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {moreTabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => selectTab(t.key)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                      active ? "bg-plum text-ivory" : "text-plum-900 hover:bg-plum/5"
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div className="my-2 border-t border-plum/10" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-plum-soft transition-colors hover:bg-plum/5"
            >
              <LogOut className="size-5" strokeWidth={1.6} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
