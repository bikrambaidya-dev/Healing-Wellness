"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { getCollection } from "@/lib/admin-store";
import { seedAppointments } from "@/data/bookings";
import { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Pagination, paginate, totalPagesFor, useClampToTotalPages } from "@/components/admin/pagination";

const STORAGE_KEY = "serenity:admin:bookings";

const statusTone: Record<Appointment["status"], "lavender" | "sage" | "blush"> = {
  upcoming: "lavender",
  completed: "sage",
  cancelled: "blush",
};

export function ExpertBookingsSection({ expertSlug }: { expertSlug: string }) {
  const [bookings, setBookings] = useState<Appointment[] | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const all = getCollection<Appointment>(STORAGE_KEY, seedAppointments);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookings(all.filter((b) => b.expertSlug === expertSlug));
  }, [expertSlug]);

  const totalPages = totalPagesFor(bookings?.length ?? 0);
  useClampToTotalPages(page, setPage, totalPages);

  if (!bookings) return null;

  const pagedBookings = paginate(bookings, page);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif-display text-2xl text-plum-900">My Bookings</h2>

      {bookings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-plum/20 p-10 text-center text-plum-soft">
          <CalendarClock className="mx-auto mb-3 size-6 text-plum-soft" strokeWidth={1.6} />
          No bookings yet. Appointments clients make with you will show up here.
        </div>
      )}

      {bookings.length > 0 && (
        <div className="flex flex-col gap-3">
          {pagedBookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-plum/10 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-plum-900">{b.serviceName}</p>
                <Badge tone={statusTone[b.status]}>{b.status}</Badge>
              </div>
              <p className="mt-1.5 text-sm text-plum-soft">
                {b.date} · {b.time} · {b.duration}
              </p>
              <p className="mt-2 text-sm font-semibold text-plum-900">₹{b.price.toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}

      {bookings.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={bookings.length} itemLabel="booking" />
      )}
    </div>
  );
}
