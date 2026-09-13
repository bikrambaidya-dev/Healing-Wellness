"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getCollection, saveCollection, logActivity } from "@/lib/admin-store";
import { seedAppointments } from "@/data/bookings";
import { experts } from "@/data/experts";
import { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "amara:admin:bookings";

const statusTones: Record<Appointment["status"], string> = {
  upcoming: "bg-lavender-light text-plum-soft",
  completed: "bg-sage-light text-sage-dark",
  cancelled: "bg-blush-light text-plum-soft",
};

const emptyForm = {
  expertSlug: experts[0]?.slug ?? "",
  serviceName: "",
  date: "",
  time: "",
  duration: "60 min",
  price: 0,
};

export function BookingsSection() {
  const [bookings, setBookings] = useState<Appointment[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookings(getCollection<Appointment>(STORAGE_KEY, seedAppointments));
  }, []);

  function persist(next: Appointment[]) {
    setBookings(next);
    saveCollection(STORAGE_KEY, next);
  }

  function updateStatus(id: string, status: Appointment["status"]) {
    if (!bookings) return;
    const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    persist(next);
    logActivity(`Booking ${id} marked as ${status}`);
  }

  function removeBooking(id: string) {
    if (!bookings) return;
    if (!window.confirm("Delete this booking?")) return;
    persist(bookings.filter((b) => b.id !== id));
    logActivity(`Booking ${id} deleted`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bookings) return;
    const expert = experts.find((x) => x.slug === form.expertSlug);
    const entry: Appointment = {
      id: `bkg-${Date.now()}`,
      expertSlug: form.expertSlug,
      expertName: expert?.name ?? "Unknown Expert",
      serviceName: form.serviceName,
      date: form.date,
      time: form.time,
      duration: form.duration,
      price: form.price,
      status: "upcoming",
    };
    persist([entry, ...bookings]);
    logActivity(`New booking created: ${entry.serviceName} with ${entry.expertName}`);
    setForm(emptyForm);
    setShowForm(false);
  }

  if (!bookings) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-2xl text-plum-900">Bookings</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Booking
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-plum/10 p-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Expert
            <select
              value={form.expertSlug}
              onChange={(e) => setForm({ ...form, expertSlug: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            >
              {experts.map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Service
            <input
              required
              value={form.serviceName}
              onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="Reiki Healing"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Date
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Time
            <input
              required
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="10:30 AM"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Duration
            <input
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Price (₹)
            <input
              type="number"
              min={0}
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              Create Booking
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-plum/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-plum/10 text-plum-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Expert</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Date &amp; Time</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-plum-soft">
                  No bookings yet.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-plum/5 last:border-0">
                <td className="px-4 py-3 text-plum-900">{b.expertName}</td>
                <td className="px-4 py-3 text-plum-900">{b.serviceName}</td>
                <td className="px-4 py-3 text-plum-soft">
                  {b.date} · {b.time}
                </td>
                <td className="px-4 py-3 text-plum-900">₹{b.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value as Appointment["status"])}
                    className={cn("rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none", statusTones[b.status])}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeBooking(b.id)}
                    aria-label="Delete booking"
                    className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
