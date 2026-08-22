import { useId } from "react";

export default function Logo({ variant = "full", className = "", showTagline = true }) {
  const raw = useId();
  const gid = `nu-grad-${raw.replace(/[:]/g, "")}`;
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(245 90% 62%)" />
            <stop offset="1" stopColor="hsl(190 85% 42%)" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="37" height="37" rx="11" fill={`url(#${gid})`} />
        <path d="M12 27V11L26 27V11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 11V6.5M22.5 9.5L26 6.5L29.5 9.5" stroke="hsl(158 64% 52%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="font-display font-extrabold tracking-tight text-[1.15rem] text-foreground">
            Nivel<span className="text-primary">Up</span>
          </span>
          {showTagline && (
            <span className="text-[0.58rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase mt-0.5">
              English
            </span>
          )}
        </span>
      )}
    </div>
  );
}