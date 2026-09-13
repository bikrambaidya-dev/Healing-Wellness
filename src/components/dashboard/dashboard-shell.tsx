"use client";

import { useState } from "react";
import { CalendarClock, Heart, ShoppingBag, Star, Settings } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { seedAppointments, seedOrders } from "@/data/bookings";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { WishlistGrid } from "@/components/dashboard/wishlist-grid";
import { OrdersList } from "@/components/dashboard/orders-list";
import { ReviewsPanel } from "@/components/dashboard/reviews-panel";
import { ProfileSettings } from "@/components/dashboard/profile-settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "appointments", label: "Appointments", icon: CalendarClock },
  { key: "saved", label: "Saved", icon: Heart },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "profile", label: "Profile", icon: Settings },
] as const;

export function DashboardShell() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("appointments");
  const { bookings } = useAppStore();

  const all = [...bookings, ...seedAppointments];
  const upcoming = all.filter((a) => a.status === "upcoming");
  const past = all.filter((a) => a.status === "completed" || a.status === "cancelled");

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
      </nav>

      <div>
        {tab === "appointments" && (
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-serif-display text-2xl text-plum-900">Upcoming Appointments</h2>
              {upcoming.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-plum/20 p-8 text-center">
                  <p className="text-sm text-plum-soft">No upcoming sessions booked yet.</p>
                  <Button href="/experts" size="sm" className="mt-4">
                    Book a Session
                  </Button>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {upcoming.map((a) => (
                    <AppointmentCard key={a.id} appointment={a} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-serif-display text-2xl text-plum-900">Past Appointments</h2>
              {past.length === 0 ? (
                <p className="mt-4 text-sm text-plum-soft">No past sessions yet.</p>
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {past.map((a) => (
                    <AppointmentCard key={a.id} appointment={a} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "saved" && <WishlistGrid />}
        {tab === "orders" && <OrdersList orders={seedOrders} />}
        {tab === "reviews" && <ReviewsPanel completedAppointments={past.filter((a) => a.status === "completed")} />}
        {tab === "profile" && <ProfileSettings />}
      </div>
    </div>
  );
}
