"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReviewsPanel({ completedAppointments }: { completedAppointments: Appointment[] }) {
  const [reviewed, setReviewed] = useState<string[]>([]);

  const pending = completedAppointments.filter((a) => !reviewed.includes(a.id));

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 && (
        <div>
          <h3 className="font-serif-display text-xl text-plum-900">Share Your Experience</h3>
          <div className="mt-4 flex flex-col gap-3">
            {pending.map((a) => (
              <ReviewPrompt key={a.id} appointment={a} onSubmit={() => setReviewed((r) => [...r, a.id])} />
            ))}
          </div>
        </div>
      )}

      {reviewed.length === 0 && pending.length === 0 && (
        <div className="rounded-2xl border border-dashed border-plum/20 p-8 text-center">
          <p className="text-sm text-plum-soft">
            You haven&apos;t left any reviews yet. Complete a session to share your experience.
          </p>
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h3 className="font-serif-display text-xl text-plum-900">Your Reviews</h3>
          <p className="mt-2 text-sm text-plum-soft">
            Thank you — your {reviewed.length === 1 ? "review has" : "reviews have"} been submitted and will
            appear on the practitioner&apos;s profile shortly.
          </p>
        </div>
      )}
    </div>
  );
}

function ReviewPrompt({ appointment, onSubmit }: { appointment: Appointment; onSubmit: () => void }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sage-dark/20 bg-sage-light/30 p-5 text-sm text-sage-dark">
        Thanks for your feedback on {appointment.serviceName} with {appointment.expertName}!
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-plum/10 bg-ivory p-5">
      <p className="text-sm font-medium text-plum-900">
        {appointment.serviceName} with {appointment.expertName}
      </p>
      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => setRating(n)} aria-label={`Rate ${n} stars`}>
            <Star className={cn("size-6", n <= rating ? "fill-gold text-gold" : "text-plum/20")} strokeWidth={1.5} />
          </button>
        ))}
      </div>
      <Button
        size="sm"
        variant="secondary"
        className="mt-4"
        disabled={rating === 0}
        onClick={() => {
          setSubmitted(true);
          setTimeout(onSubmit, 900);
        }}
      >
        Submit Review
      </Button>
    </div>
  );
}
