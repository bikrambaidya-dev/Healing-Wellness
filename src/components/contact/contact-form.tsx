"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-sage-dark/20 bg-sage-light/30 p-10 text-center">
        <Check className="size-8 text-sage-dark" />
        <p className="font-serif-display text-xl text-plum-900">Message sent</p>
        <p className="text-sm text-plum-soft">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-[1.75rem] border border-plum/10 bg-cream/50 p-7"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
        Name
        <input required className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
        Email
        <input type="email" required className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
        Message
        <textarea rows={4} required className="resize-none rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40" />
      </label>
      <Button type="submit" className="mt-2">
        Send Message
      </Button>
    </form>
  );
}
