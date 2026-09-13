"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, CalendarClock, Users, Sparkles, Settings, LogOut } from "lucide-react";
import { clearAdminSession, hasAdminSession } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarClock },
  { key: "experts", label: "Experts", icon: Sparkles },
  { key: "users", label: "Users", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

export function AdminShell() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("overview");
  const [checked, setChecked] = useState(false);

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

  if (!checked) return null;

  const activeLabel = tabs.find((t) => t.key === tab)?.label;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors lg:w-full",
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
          className="mt-2 flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-plum-soft transition-colors hover:bg-plum/5 lg:w-full"
        >
          <LogOut className="size-4.5" strokeWidth={1.6} />
          Log out
        </button>
      </nav>

      <div>
        <div className="rounded-2xl border border-dashed border-plum/20 p-10 text-center">
          <h2 className="font-serif-display text-2xl text-plum-900">{activeLabel}</h2>
          <p className="mt-2 text-sm text-plum-soft">
            This section is coming soon. Placeholder area for managing {activeLabel?.toLowerCase()}.
          </p>
        </div>
      </div>
    </div>
  );
}
