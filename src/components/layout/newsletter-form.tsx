"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="flex items-center gap-2 rounded-full border border-sage-dark/30 bg-sage-light/40 px-5 py-3 text-sm font-medium text-sage-dark">
        <Check className="size-4" /> You&apos;re subscribed. Welcome to the community.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="w-full rounded-full border border-plum/20 bg-ivory px-5 py-3 text-sm outline-none placeholder:text-plum-soft/70 focus:border-plum/40"
      />
      <Button type="submit" size="sm" className="shrink-0">
        Subscribe
      </Button>
    </form>
  );
}
