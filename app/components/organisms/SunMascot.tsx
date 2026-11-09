import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";

const SPIKES = 16;
// zig-zag ring around the sun face: alternates outer and inner radius
const RAYS = Array.from({ length: SPIKES * 2 }, (_, i) => {
  const radius = i % 2 === 0 ? 48 : 40;
  const angle = (Math.PI * i) / SPIKES;
  return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

const SMILE = "M38 58 Q50 66 62 58";
const GRIN = "M35 55 Q50 76 65 55";

/** Little sun that pops in once the hero is gone, says hi on hover and takes you back to the top. */
export function SunMascot() {
  const [visible, setVisible] = useState(false);
  const [happy, setHappy] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.8);
  });

  const cheer = () => setHappy(true);
  const calm = () => setHappy(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#main-content"
          aria-label="Back to top"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          onPointerEnter={cheer}
          onPointerLeave={calm}
          onFocus={cheer}
          onBlur={calm}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full sm:bottom-6 sm:left-6"
        >
          <svg aria-hidden="true" viewBox="0 0 100 100" className="h-14 w-14 sm:h-16 sm:w-16">
            <polygon
              points={RAYS}
              className="origin-center animate-[ray-sway_3s_ease-in-out_infinite_alternate] fill-[#FFC53D] stroke-ink [transform-box:fill-box]"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            <circle cx="50" cy="50" r="34" className="fill-[#FFB000] stroke-ink" strokeWidth={2.5} />
            <circle cx="41" cy="45" r="3.5" className="fill-ink" />
            <circle cx="59" cy="45" r="3.5" className="fill-ink" />
            <motion.path
              animate={{ d: happy ? GRIN : SMILE }}
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="round"
              className="stroke-ink"
            />
          </svg>
          <AnimatePresence>
            {happy && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, x: -8, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -8, scale: 0.8 }}
                className="rounded-full border-[1.5px] border-ink bg-accent px-3 py-1.5 text-xs font-bold text-ink shadow-hard-sm"
              >
                Hi there! Back to top?
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
