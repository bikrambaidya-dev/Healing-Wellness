import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark",
        className
      )}
    >
      <span className="h-px w-6 bg-sage-dark/60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-serif-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-balance text-plum-900",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-xl text-plum-soft text-base md:text-lg leading-relaxed", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
