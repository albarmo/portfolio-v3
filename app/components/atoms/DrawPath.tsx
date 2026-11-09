import { motion, useReducedMotion, type MotionValue } from "framer-motion";

interface DrawPathProps {
  d: string;
  /** scrub mode: 0..1 drives how much of the line is drawn; omit to draw once when it enters the viewport */
  progress?: MotionValue<number>;
  strokeWidth?: number;
  /** ink outline under the stroke, the hand-drawn sticker look */
  outline?: boolean;
  className?: string;
}

/** A self-drawing SVG line. Render inside an aria-hidden <svg>. */
export function DrawPath({
  d,
  progress,
  strokeWidth = 4,
  outline = false,
  className,
}: DrawPathProps) {
  // scrubbed style values ignore MotionConfig reducedMotion, so opt out here: the line shows fully drawn
  const reduceMotion = useReducedMotion();
  const draw = reduceMotion
    ? {}
    : progress
      ? { style: { pathLength: progress } }
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-64px" },
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
        };
  const cap = outline ? "butt" : "round";

  return (
    <>
      {outline && (
        <motion.path
          d={d}
          fill="none"
          strokeLinecap={cap}
          strokeWidth={strokeWidth + 4}
          className="stroke-ink"
          {...draw}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        strokeLinecap={cap}
        strokeWidth={strokeWidth}
        className={className}
        {...draw}
      />
    </>
  );
}
