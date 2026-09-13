"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  Sparkles,
  CalendarPlus,
} from "lucide-react";
import { Expert } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { getMonthMatrix, getWeekdayName, isSameDay, formatDateLong, formatDateISO, WEEKDAYS } from "@/lib/calendar";
import { buildIcsFile, downloadIcs } from "@/lib/ics";
import { useAppStore } from "@/lib/store";

const steps = ["Session", "Date", "Time", "Details", "Confirm"] as const;

export function BookingWizard({ expert, initialServiceSlug }: { expert: Expert; initialServiceSlug: string }) {
  const { addBooking } = useAppStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [serviceSlug, setServiceSlug] = useState(initialServiceSlug);
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", message: "" });
  const [bookingId, setBookingId] = useState<string | null>(null);

  const service = expert.servicesOffered.find((s) => s.serviceSlug === serviceSlug) ?? expert.servicesOffered[0];

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weeks = useMemo(
    () => getMonthMatrix(monthCursor.getFullYear(), monthCursor.getMonth()),
    [monthCursor]
  );

  const availableSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const dayName = getWeekdayName(selectedDate);
    return expert.availability.find((a) => a.day === dayName)?.slots ?? [];
  }, [selectedDate, expert.availability]);

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function canProceed() {
    if (stepIndex === 0) return Boolean(service);
    if (stepIndex === 1) return Boolean(selectedDate);
    if (stepIndex === 2) return Boolean(selectedTime);
    if (stepIndex === 3) return details.name.trim() && details.email.trim() && details.phone.trim();
    return true;
  }

  function handleConfirm() {
    const id = `AMR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    addBooking({
      id,
      expertSlug: expert.slug,
      expertName: expert.name,
      serviceName: service.name,
      date: selectedDate ? formatDateISO(selectedDate) : "",
      time: selectedTime ?? "",
      duration: service.duration,
      price: service.price,
      status: "upcoming",
    });
    goNext();
  }

  function handleAddToCalendar() {
    if (!selectedDate || !selectedTime) return;
    const [time, meridiem] = selectedTime.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;
    const start = new Date(selectedDate);
    start.setHours(hour, parseInt(minuteStr, 10), 0, 0);

    const ics = buildIcsFile({
      title: `${service.name} with ${expert.name}`,
      description: `Your ${service.name} session with ${expert.name} via Serenity Healing & Wellness.`,
      start,
      durationMinutes: parseInt(service.duration, 10) || 60,
    });
    downloadIcs(`serenity-session-${bookingId}.ics`, ics);
  }

  if (bookingId && selectedDate && selectedTime) {
    return (
      <div className="mx-auto max-w-xl rounded-[2rem] border border-plum/10 bg-ivory p-8 text-center shadow-lg md:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage-light">
          <Sparkles className="size-7 text-sage-dark" />
        </div>
        <h2 className="mt-6 font-serif-display text-2xl text-plum-900 md:text-3xl">
          Your healing session is confirmed
        </h2>
        <p className="mt-2 text-sm text-plum-soft">Booking reference {bookingId}</p>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-plum/10 bg-cream/50 p-6 text-left">
          <SummaryRow label="Expert" value={expert.name} />
          <SummaryRow label="Service" value={service.name} />
          <SummaryRow label="Date" value={formatDateLong(selectedDate)} />
          <SummaryRow label="Time" value={selectedTime} />
          <SummaryRow label="Duration" value={service.duration} />
          <SummaryRow label="Price" value={formatPrice(service.price)} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-plum/20 px-6 py-3.5 text-sm font-semibold text-plum-900 hover:border-plum/40"
          >
            <CalendarPlus className="size-4" /> Add to Calendar
          </button>
          <Link
            href="/dashboard"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-plum-900"
          >
            View in Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-28 md:pb-0">
      <ol className="mb-10 flex items-center justify-between gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                i < stepIndex
                  ? "bg-sage-dark text-ivory"
                  : i === stepIndex
                  ? "bg-plum text-ivory"
                  : "bg-plum/10 text-plum-soft"
              )}
            >
              {i < stepIndex ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={cn("hidden text-xs sm:block", i === stepIndex ? "font-semibold text-plum-900" : "text-plum-soft")}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-[2rem] border border-plum/10 bg-ivory p-6 shadow-sm md:p-9">
        {stepIndex === 0 && (
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900">Choose Your Session</h2>
            <p className="mt-1 text-sm text-plum-soft">Select the practice you&apos;d like to book with {expert.name}.</p>
            <div className="mt-6 flex flex-col gap-3">
              {expert.servicesOffered.map((s) => (
                <button
                  key={s.serviceSlug}
                  onClick={() => setServiceSlug(s.serviceSlug)}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all",
                    serviceSlug === s.serviceSlug
                      ? "border-plum bg-cream/70 shadow-sm"
                      : "border-plum/10 hover:border-plum/25"
                  )}
                >
                  <div>
                    <p className="font-serif-display text-lg text-plum-900">{s.name}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-plum-soft">
                      <Clock className="size-3.5" /> {s.duration}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-plum-soft">{s.description}</p>
                  </div>
                  <span className="shrink-0 font-serif-display text-lg text-plum-900">{formatPrice(s.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900">Choose Date</h2>
            <p className="mt-1 text-sm text-plum-soft">Pick a day that works for you.</p>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                className="flex size-9 items-center justify-center rounded-full border border-plum/15 hover:bg-plum/5"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-4" />
              </button>
              <p className="inline-flex items-center gap-2 font-serif-display text-lg text-plum-900">
                <CalendarDays className="size-4.5 text-sage-dark" />
                {monthCursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
              <button
                onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                className="flex size-9 items-center justify-center rounded-full border border-plum/15 hover:bg-plum/5"
                aria-label="Next month"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-plum-soft">
              {WEEKDAYS.map((d) => (
                <span key={d}>{d.slice(0, 3)}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {weeks.flat().map((date, i) => {
                if (!date) return <div key={i} />;
                const dayName = getWeekdayName(date);
                const hasSlots = (expert.availability.find((a) => a.day === dayName)?.slots.length ?? 0) > 0;
                const isPast = date < today;
                const disabled = isPast || !hasSlots;
                const selected = selectedDate && isSameDay(date, selectedDate);
                return (
                  <button
                    key={i}
                    disabled={disabled}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    className={cn(
                      "aspect-square rounded-xl text-sm font-medium transition-colors",
                      disabled && "text-plum-soft/30",
                      !disabled && !selected && "text-plum-900 hover:bg-sage-light/50",
                      selected && "bg-plum text-ivory"
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900">Choose Time</h2>
            <p className="mt-1 text-sm text-plum-soft">
              {selectedDate ? formatDateLong(selectedDate) : "Select a date first"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableSlotsForDate.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={cn(
                    "rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all",
                    !slot.available && "border-plum/10 text-plum-soft/40 line-through",
                    slot.available && selectedTime !== slot.time && "border-plum/15 text-plum-900 hover:border-sage-dark/40",
                    selectedTime === slot.time && "border-plum bg-plum text-ivory"
                  )}
                >
                  {slot.time}
                </button>
              ))}
              {availableSlotsForDate.length === 0 && (
                <p className="col-span-full text-sm text-plum-soft">No slots available on this date.</p>
              )}
            </div>
          </div>
        )}

        {stepIndex === 3 && (
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900">Your Details</h2>
            <p className="mt-1 text-sm text-plum-soft">We&apos;ll use this to confirm your session.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
                Name
                <input
                  value={details.name}
                  onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                  className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="Your full name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
                Email
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                  className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="you@email.com"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
                Phone
                <input
                  value={details.phone}
                  onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                  className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900 sm:col-span-2">
                Message (optional)
                <textarea
                  value={details.message}
                  onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
                  rows={3}
                  className="resize-none rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
                  placeholder="Anything you'd like your practitioner to know beforehand?"
                />
              </label>
            </div>
          </div>
        )}

        {stepIndex === 4 && selectedDate && selectedTime && (
          <div>
            <h2 className="font-serif-display text-2xl text-plum-900">Confirm Booking</h2>
            <p className="mt-1 text-sm text-plum-soft">Please review your session details.</p>
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-plum/10 bg-cream/50 p-5">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image src={expert.image} alt={expert.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-serif-display text-lg text-plum-900">{expert.name}</p>
                <p className="text-sm text-plum-soft">{expert.title}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-plum/10 p-5">
              <SummaryRow label="Service" value={service.name} />
              <SummaryRow label="Date" value={formatDateLong(selectedDate)} />
              <SummaryRow label="Time" value={selectedTime} />
              <SummaryRow label="Duration" value={service.duration} />
              <SummaryRow label="Name" value={details.name} />
              <SummaryRow label="Email" value={details.email} />
              <div className="mt-2 flex items-center justify-between border-t border-plum/10 pt-3">
                <span className="font-serif-display text-lg text-plum-900">Total</span>
                <span className="font-serif-display text-xl text-plum-900">{formatPrice(service.price)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-9 flex items-center justify-between border-t border-plum/10 pt-6">
          <button
            onClick={goBack}
            disabled={stepIndex === 0}
            className="rounded-full border border-plum/15 px-5 py-2.5 text-sm font-semibold text-plum-900 disabled:opacity-0"
          >
            Back
          </button>
          {stepIndex < steps.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="rounded-full bg-plum px-7 py-2.5 text-sm font-semibold text-ivory transition-opacity hover:bg-plum-900 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="rounded-full bg-plum px-7 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900"
            >
              Confirm Appointment
            </button>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-plum/10 bg-ivory/95 p-4 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-plum-soft">{steps[stepIndex]}</p>
            <p className="font-serif-display text-base text-plum-900">{formatPrice(service.price)}</p>
          </div>
          {stepIndex < steps.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-ivory disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button onClick={handleConfirm} className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-ivory">
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-plum-soft">{label}</span>
      <span className="font-medium text-plum-900">{value}</span>
    </div>
  );
}
