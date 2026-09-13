import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum";

const variants: Record<Variant, string> = {
  primary:
    "bg-plum text-ivory rounded-full hover:bg-plum-900 hover:shadow-lg hover:shadow-plum/20 active:scale-[0.98]",
  secondary:
    "bg-transparent text-plum border border-plum/30 rounded-full hover:border-plum hover:bg-plum/5 active:scale-[0.98]",
  tertiary: "text-plum underline-offset-4 hover:underline gap-1.5",
  ghost: "bg-ivory/80 text-plum rounded-full hover:bg-ivory active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  showArrow,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], variant !== "tertiary" && sizes[size], className);

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cn(classes, "group")} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(classes, "group")} {...(props as ButtonAsButton)}>
      {content}
    </button>
  );
}
