"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { id?: string; question: string; answer: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} id={item.id} className="rounded-2xl border border-plum/10 bg-ivory scroll-mt-24">
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
            >
              <span className="font-serif-display text-lg text-plum-900">{item.question}</span>
              <Plus className={cn("size-5 shrink-0 text-plum-soft transition-transform", open && "rotate-45")} />
            </button>
            {open && <p className="px-6 pb-5 text-sm leading-relaxed text-plum-soft">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
