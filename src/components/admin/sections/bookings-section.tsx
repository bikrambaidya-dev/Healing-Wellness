"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { getCollection, saveCollection, logActivity } from "@/lib/admin-store";
import { seedAppointments } from "@/data/bookings";
import { experts } from "@/data/experts";
import { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";

const STORAGE_KEY = "serenity:admin:bookings";

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCollection<Appointment>(STORAGE_KEY, seedAppointments).then(setBookings);
  }, []);

  const totalPages = totalPagesFor(bookings?.length ?? 0);
  useClampToTotalPages(page, setPage, totalPages);
  const pagedBookings = bookings ? paginate(bookings, page) : [];

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
    setPage(1);
    logActivity(`New booking created: ${entry.serviceName} with ${entry.expertName}`);
    setForm(emptyForm);
    setShowForm(false);
  }

  if (!bookings) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif-display text-2xl text-plum-900">Bookings</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New Booking
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close panel"
            onClick={() => setShowForm(false)}
            className="absolute inset-0 animate-fade-in bg-plum-900/40"
          />
          <form
            onSubmit={handleSubmit}
            className="relative flex h-full w-full max-w-lg animate-slide-in-right flex-col gap-4 overflow-y-auto bg-ivory p-6 shadow-2xl"
          >
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display text-lg text-plum-900">New Booking</h3>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
              <X className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              Create Booking
            </button>
          </div>
          </form>
        </div>
      )}

      {bookings.length === 0 && (
        <div className="rounded-2xl border border-plum/10 px-4 py-8 text-center text-plum-soft">No bookings yet.</div>
      )}

      {bookings.length > 0 && (
        <div className="flex flex-col gap-3 lg:hidden">
          {pagedBookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-plum/10 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-plum-900">{b.serviceName}</p>
                  <p className="text-sm text-plum-soft">{b.expertName}</p>
                </div>
                <button
                  onClick={() => removeBooking(b.id)}
                  aria-label="Delete booking"
                  className="shrink-0 rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <p className="mt-1.5 text-xs text-plum-soft">
                {b.date} · {b.time}
              </p>
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-plum-900">₹{b.price.toLocaleString("en-IN")}</span>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value as Appointment["status"])}
                  className={cn("rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none", statusTones[b.status])}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookings.length > 0 && (
        <div className="hidden overflow-x-auto rounded-2xl border border-plum/10 lg:block">
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
            {pagedBookings.map((b) => (
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
      )}

      {bookings.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={bookings.length} itemLabel="booking" />
      )}
    </div>
  );
}
