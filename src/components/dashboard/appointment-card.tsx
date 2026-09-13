"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { experts } from "@/data/experts";

const statusTone = {
  upcoming: "sage",
  completed: "sand",
  cancelled: "blush",
} as const;

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { cancelBooking } = useAppStore();
  const expert = experts.find((e) => e.slug === appointment.expertSlug);
  const date = appointment.date
    ? new Date(appointment.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-plum/10 bg-ivory p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif-display text-lg text-plum-900">{appointment.serviceName}</h3>
          <Badge tone={statusTone[appointment.status]} className="capitalize">
            {appointment.status}
          </Badge>
        </div>
        <p className="mt-1 text-sm text-plum-soft">with {appointment.expertName}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-plum-soft">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" /> {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> {appointment.time} · {appointment.duration}
          </span>
          <span className="font-semibold text-plum-900">{formatPrice(appointment.price)}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {expert && (
          <Link
            href={`/experts/${expert.slug}`}
            className="rounded-full border border-plum/15 px-4 py-2 text-xs font-semibold text-plum-900 hover:border-plum/30"
          >
            View Details
          </Link>
        )}
        {appointment.status === "upcoming" && expert && (
          <>
            <Link
              href={`/book/${expert.slug}/${expert.servicesOffered[0].serviceSlug}`}
              className="rounded-full border border-plum/15 px-4 py-2 text-xs font-semibold text-plum-900 hover:border-plum/30"
            >
              Reschedule
            </Link>
            <button
              onClick={() => cancelBooking(appointment.id)}
              className={cn(
                "rounded-full border border-plum/15 px-4 py-2 text-xs font-semibold text-plum-soft hover:border-blush hover:text-plum-900"
              )}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
