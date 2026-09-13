"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Flower2, Gem, Newspaper, Sparkles, Users, Activity } from "lucide-react";
import { getCollection, getActivity } from "@/lib/admin-store";
import { seedAppointments } from "@/data/bookings";
import { services } from "@/data/services";
import { crystals } from "@/data/crystals";
import { blogPosts } from "@/data/blog";
import { experts } from "@/data/experts";
import { seedUsers } from "@/data/users";
import { Appointment, BlogPost, Expert, HealingService, Crystal, AdminUser, ActivityEntry } from "@/lib/types";

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

type Stats = { bookings: number; healing: number; crystals: number; blogs: number; experts: number; users: number };

export function OverviewSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    const bookings = getCollection<Appointment>("serenity:admin:bookings", seedAppointments);
    const healing = getCollection<HealingService>("serenity:admin:healing", services);
    const crystalsList = getCollection<Crystal>("serenity:admin:crystals", crystals);
    const blogs = getCollection<BlogPost>("serenity:admin:blogs", blogPosts);
    const expertsList = getCollection<Expert>("serenity:admin:experts", experts);
    const users = getCollection<AdminUser>("serenity:admin:users", seedUsers);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      bookings: bookings.length,
      healing: healing.length,
      crystals: crystalsList.length,
      blogs: blogs.length,
      experts: expertsList.length,
      users: users.length,
    });
    setActivity(getActivity());
  }, []);

  if (!stats) return null;

  const cards = [
    { label: "Bookings", value: stats.bookings, icon: CalendarClock, tone: "bg-sage-light text-sage-dark" },
    { label: "Healing Services", value: stats.healing, icon: Flower2, tone: "bg-sage-light text-sage-dark" },
    { label: "Crystals", value: stats.crystals, icon: Gem, tone: "bg-lavender-light text-plum-soft" },
    { label: "Blog Posts", value: stats.blogs, icon: Newspaper, tone: "bg-lavender-light text-plum-soft" },
    { label: "Experts", value: stats.experts, icon: Sparkles, tone: "bg-blush-light text-plum-soft" },
    { label: "Users", value: stats.users, icon: Users, tone: "bg-cream text-sand-dark" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-plum/10 p-5">
              <div className={`inline-flex size-10 items-center justify-center rounded-xl ${c.tone}`}>
                <Icon className="size-5" strokeWidth={1.6} />
              </div>
              <p className="mt-4 text-2xl font-semibold text-plum-900">{c.value}</p>
              <p className="text-sm text-plum-soft">{c.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-plum/10 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="size-4.5 text-plum-soft" strokeWidth={1.6} />
          <h3 className="font-serif-display text-lg text-plum-900">Recent Activity</h3>
        </div>
        {activity.length === 0 ? (
          <p className="text-sm text-plum-soft">
            No activity yet. Actions you take across Bookings, Healing, Crystals, Blogs, Experts, and Users will show
            up here.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {activity.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-4 border-b border-plum/5 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-plum-900">{entry.message}</span>
                <span className="shrink-0 text-xs text-plum-soft">{timeAgo(entry.timestamp)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
