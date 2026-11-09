import { DrawPath } from "./DrawPath";

const SQUIGGLE =
  "M4 14 C24 2 44 2 64 12 S104 22 124 12 S164 2 184 12 S224 22 244 12 S284 2 296 10";

/** Hand-drawn underline that draws itself once it scrolls into view. */
export function Squiggle({ className = "mt-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      className={`h-5 w-56 overflow-visible sm:h-6 sm:w-72 ${className}`}
    >
      <DrawPath d={SQUIGGLE} strokeWidth={6} className="stroke-accent" />
    </svg>
  );
}
