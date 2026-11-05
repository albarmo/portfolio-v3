import { motion, type MotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { RefObject } from "react";
import { DAY_ONLY as dayOnly, NIGHT_ONLY as nightOnly } from "./heroTheme";

const headingType =
  "max-w-[10ch] font-display text-[clamp(4.25rem,8.2vw,8.25rem)] font-black uppercase leading-[0.8] tracking-[-0.035em] md:max-w-none";

// blurred copies of the heading act as its cast shadow; only their transform moves (GPU, no repaint)
const shadowLayers = [
  {
    reach: 0.15,
    day: "text-[rgba(0,70,140,0.22)]",
    night: "text-[rgba(2,6,23,0.42)]",
    blur: "blur-[1px]",
  },
  {
    reach: 0.5,
    day: "text-[rgba(0,60,120,0.2)]",
    night: "text-[rgba(2,6,23,0.32)]",
    blur: "blur-[8px]",
  },
  {
    reach: 1.1,
    day: "text-[rgba(0,50,110,0.15)]",
    night: "text-[rgba(2,6,23,0.24)]",
    blur: "blur-[22px]",
  },
];

function ShadowCopy({
  reach,
  className,
  x,
  y,
}: {
  reach: number;
  className: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const layerX = useTransform(x, (v) => v * reach);
  const layerY = useTransform(y, (v) => v * reach);
  return (
    <motion.span
      aria-hidden="true"
      style={{ x: layerX, y: layerY }}
      className={`pointer-events-none absolute inset-0 select-none will-change-transform ${headingType} ${className}`}
    >
      <span className="block md:whitespace-nowrap">
        I build digital products,
      </span>
      <span className="block md:whitespace-nowrap">not just interfaces.</span>
    </motion.span>
  );
}

interface HeroHeadlineProps {
  reduceMotion: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
  shadowX: MotionValue<number>;
  shadowY: MotionValue<number>;
  /** Re-measure the heading once its entrance animation settles */
  onSettled: () => void;
}

export function HeroHeadline({ reduceMotion, headingRef, shadowX, shadowY, onSettled }: HeroHeadlineProps) {
  // content lets touches through to the sun/moon; only its own elements take pointer events
  return (
    <div className="section-shell pointer-events-none relative flex min-h-[100dvh] flex-col justify-center pb-5 pt-24 md:pb-6">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onSettled}
          className="pointer-events-auto relative"
        >
          {shadowLayers.map((layer) => (
            <ShadowCopy
              key={`day-${layer.reach}`}
              reach={layer.reach}
              className={`${layer.day} ${layer.blur} ${dayOnly}`}
              x={shadowX}
              y={shadowY}
            />
          ))}
          {shadowLayers.map((layer) => (
            <ShadowCopy
              key={`night-${layer.reach}`}
              reach={layer.reach}
              className={`${layer.night} ${layer.blur} ${nightOnly}`}
              x={shadowX}
              y={shadowY}
            />
          ))}
          <h1 ref={headingRef} className={`relative ${headingType}`}>
            <span className="block md:whitespace-nowrap">
              I build digital products,
            </span>
            <span className="block md:whitespace-nowrap">
              not just interfaces.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-5 max-w-[48ch] text-sm font-semibold leading-6 text-ink/75 transition-colors duration-[900ms] dark:text-cloud/75 sm:text-base"
        >
          I turn complex ideas into thoughtful digital products through
          frontend engineering and product thinking.
        </motion.p>

        <motion.a
          href="#work"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="premium-link pointer-events-auto mt-6 border-accent bg-accent text-ink"
        >
          Explore work <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
}
