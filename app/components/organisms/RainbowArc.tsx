import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { DrawPath } from "@/components/atoms/DrawPath";

const STRIPE_WIDTH = 34;
const STRIPES = ["stroke-primary", "stroke-primary-light", "stroke-cloud"];
// every stripe turns around the same center at the svg's right edge, so the U-bends stay concentric
const CENTER_X = 240;
const CENTER_Y = 420;

const stripePath = (index: number) => {
  const x = 30 + index * STRIPE_WIDTH;
  const radius = CENTER_X - x;
  return `M${x} 0 V${CENTER_Y} A${radius} ${radius} 0 0 0 ${CENTER_X} ${CENTER_Y + radius}`;
};

interface StripeProps {
  index: number;
  color: string;
  progress: MotionValue<number>;
}

function Stripe({ index, color, progress }: StripeProps) {
  // each inner stripe starts a little later, so the band draws in sequence
  const length = useTransform(progress, [index * 0.08, 0.75 + index * 0.08], [0, 1]);
  return (
    <DrawPath
      d={stripePath(index)}
      progress={length}
      strokeWidth={STRIPE_WIDTH - 4}
      outline
      className={color}
    />
  );
}

/** Thick outlined rainbow that draws down the section edge as you scroll. */
export function RainbowArc({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 0.4"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 -z-10 hidden h-[34rem] xl:block ${
        side === "right" ? "right-0" : "left-0 -scale-x-100"
      }`}
    >
      <svg viewBox="0 0 240 640" className="h-full w-auto">
        {STRIPES.map((stripe, index) => (
          <Stripe key={stripe} index={index} color={stripe} progress={scrollYProgress} />
        ))}
      </svg>
    </div>
  );
}
