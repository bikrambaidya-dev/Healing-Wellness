import { cn } from "@/lib/utils";

type Tone = "sage" | "lavender" | "blush" | "sand" | "plum" | "gold";

const tones: Record<Tone, string> = {
  sage: "bg-sage-light text-sage-dark",
  lavender: "bg-lavender-light text-plum-soft",
  blush: "bg-blush-light text-plum-soft",
  sand: "bg-cream text-sand-dark",
  plum: "bg-plum text-ivory",
  gold: "bg-gold-light text-plum-900",
};

export function Badge({
  children,
  tone = "sage",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
