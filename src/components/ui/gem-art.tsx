import { cn } from "@/lib/utils";

type GemVariant =
  | "amethyst"
  | "rose-quartz"
  | "clear-quartz"
  | "citrine"
  | "black-tourmaline"
  | "moonstone";

const palettes: Record<
  GemVariant,
  { light: string; mid: string; dark: string; glow: string; stroke: string }
> = {
  amethyst: { light: "#C9AEE0", mid: "#8E6BAE", dark: "#4E3170", glow: "#B79BD6", stroke: "#3A2352" },
  "rose-quartz": { light: "#FBE4E2", mid: "#F0BFC0", dark: "#D68F92", glow: "#F4CDCB", stroke: "#B97477" },
  "clear-quartz": { light: "#FFFFFF", mid: "#E4EBEE", dark: "#B9C6CC", glow: "#EAF2F4", stroke: "#93A3AA" },
  citrine: { light: "#FCE7B8", mid: "#F0BE63", dark: "#B9781C", glow: "#F5D48A", stroke: "#8A5A15" },
  "black-tourmaline": { light: "#6E6E73", mid: "#3A3A3D", dark: "#141416", glow: "#4A4A4D", stroke: "#000000" },
  moonstone: { light: "#F5F7FA", mid: "#CBD5E3", dark: "#98A9C2", glow: "#DCE4F0", stroke: "#7484A0" },
};

export function GemArt({ variant, className }: { variant: GemVariant; className?: string }) {
  const p = palettes[variant];
  const uid = variant;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className="absolute size-[65%] rounded-full blur-2xl opacity-50"
        style={{ background: p.glow }}
      />
      <svg viewBox="0 0 300 300" className="relative w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-tl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.light} />
            <stop offset="1" stopColor={p.mid} />
          </linearGradient>
          <linearGradient id={`${uid}-tr`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.mid} />
            <stop offset="1" stopColor={p.dark} />
          </linearGradient>
          <linearGradient id={`${uid}-ml`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={p.mid} />
            <stop offset="1" stopColor={p.dark} />
          </linearGradient>
          <linearGradient id={`${uid}-mr`} x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor={p.light} />
            <stop offset="1" stopColor={p.mid} />
          </linearGradient>
          <linearGradient id={`${uid}-bl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.dark} />
            <stop offset="1" stopColor={p.mid} />
          </linearGradient>
          <linearGradient id={`${uid}-br`} x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={p.light} />
            <stop offset="1" stopColor={p.dark} />
          </linearGradient>
        </defs>

        <g stroke={p.stroke} strokeOpacity={0.25} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M150 26 L96 96 L150 96 Z" fill={`url(#${uid}-tl)`} />
          <path d="M150 26 L204 96 L150 96 Z" fill={`url(#${uid}-tr)`} />
          <path d="M96 96 L150 96 L128 190 L82 178 Z" fill={`url(#${uid}-ml)`} />
          <path d="M204 96 L150 96 L172 190 L218 178 Z" fill={`url(#${uid}-mr)`} />
          <path d="M82 178 L128 190 L146 268 L108 258 Z" fill={`url(#${uid}-bl)`} />
          <path d="M218 178 L172 190 L154 268 L192 258 Z" fill={`url(#${uid}-br)`} />
          <path d="M128 190 L172 190 L154 268 L146 268 Z" fill={`url(#${uid}-ml)`} />
        </g>
        <path
          d="M150 26 L204 96 L218 178 L192 258 L108 258 L82 178 L96 96 Z"
          fill="none"
          stroke={p.stroke}
          strokeOpacity={0.35}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export type { GemVariant };
