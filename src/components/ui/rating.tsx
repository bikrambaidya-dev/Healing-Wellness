import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviewCount,
  size = "sm",
  className,
}: {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Star
        className={cn("fill-gold text-gold", size === "sm" ? "size-3.5" : "size-4")}
        strokeWidth={1.5}
      />
      <span className={cn("font-semibold text-plum-900", size === "sm" ? "text-sm" : "text-base")}>
        {value.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-plum-soft text-sm">({reviewCount})</span>
      )}
    </span>
  );
}
