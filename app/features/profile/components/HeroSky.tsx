import { motion, type MotionValue } from "framer-motion";
import type { PointerEvent } from "react";
import { DAY_ONLY as dayOnly, NIGHT_ONLY as nightOnly } from "./heroTheme";
import { StarField } from "./StarField";

const shootingStars = [
  { top: "8%", left: "78%", duration: "9s", delay: "2s" },
  { top: "22%", left: "95%", duration: "13s", delay: "7s" },
];

// irregular, soft-edged ray fans; their middle sits at RAY_FAN_CENTER and gets rotated toward the heading
const raysNear =
  "conic-gradient(from 150deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.22) 6deg, transparent 11deg, transparent 19deg, rgba(255,255,255,0.14) 23deg, transparent 30deg, rgba(255,255,255,0.2) 41deg, transparent 47deg, transparent 58deg, rgba(255,255,255,0.12) 64deg, transparent 75deg, rgba(255,252,240,0.18) 88deg, transparent 94deg, transparent 105deg, rgba(255,255,255,0.1) 112deg, transparent 124deg, transparent 360deg)";
const raysFar =
  "conic-gradient(from 160deg at 50% 50%, transparent 0deg, rgba(255,246,222,0.16) 9deg, transparent 17deg, rgba(255,255,255,0.1) 29deg, transparent 36deg, transparent 50deg, rgba(255,246,222,0.18) 57deg, transparent 66deg, rgba(255,255,255,0.08) 80deg, transparent 92deg, rgba(255,246,222,0.14) 101deg, transparent 113deg, transparent 360deg)";

// soft horizon at the hero's bottom edge so lights and dusk never end in a hard line
const horizonMask =
  "[mask-image:linear-gradient(180deg,#000_0%,#000_72%,transparent_97%)]";

interface HeroSkyProps {
  reduceMotion: boolean;
  pxX: MotionValue<number>;
  sunPxY: MotionValue<number>;
  moonPxY: MotionValue<number>;
  raysRotate: MotionValue<number>;
  duskGlow: MotionValue<number>;
  farX: MotionValue<number>;
  farY: MotionValue<number>;
  /** Pointer handlers that let touch users drag the sun/moon disc */
  dragHandle: Record<"onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel", (event: PointerEvent<HTMLElement>) => void>;
}

export function HeroSky({ reduceMotion, pxX, sunPxY, moonPxY, raysRotate, duskGlow, farX, farY, dragHandle }: HeroSkyProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <img
        src="/images/hero-sky-texture.webp"
        alt=""
        className={`absolute inset-0 h-full w-full animate-[sky-drift_60s_ease-in-out_infinite_alternate] object-cover object-center motion-reduce:animate-none ${dayOnly}`}
        width="1672"
        height="941"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <img
        src="/images/hero-night-sky-texture.webp"
        alt=""
        className={`absolute inset-0 h-full w-full animate-[sky-drift_60s_ease-in-out_infinite_alternate] object-cover object-center motion-reduce:animate-none ${nightOnly}`}
        width="1672"
        height="941"
        loading="eager"
        decoding="async"
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,119,199,0.38)_0%,rgba(0,153,255,0.12)_52%,rgba(253,253,254,0.02)_100%)] ${dayOnly}`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,25,0.18)_0%,rgba(17,24,39,0.08)_58%,rgba(17,24,39,0.22)_100%)] ${nightOnly}`}
      />

      {/* fade the sky into the page background so the next section continues it */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--bg)_55%,transparent)] to-background" />

      {/* 1. dusk: sits above the fade so the sinking sun shows against a warm sky, then melts into the page */}
      <div className={`absolute inset-0 ${horizonMask} ${dayOnly}`}>
        <motion.div
          style={{ opacity: duskGlow }}
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,111,97,0.18)_0%,rgba(255,138,84,0.42)_45%,rgba(255,170,110,0.55)_75%,rgba(255,200,140,0.5)_100%)]"
        />
      </div>

      {/* day: sun bloom + soft god rays; follows the mouse, rays aim at the heading */}
      <motion.div
        style={{
          x: pxX,
          y: sunPxY,
          marginLeft: "-40vmax",
          marginTop: "-40vmax",
        }}
        className={`pointer-events-none absolute left-0 top-0 h-[80vmax] w-[80vmax] mix-blend-screen will-change-transform ${dayOnly}`}
      >
        <motion.div
          style={{ rotate: raysRotate }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            style={{ backgroundImage: raysFar }}
            className="absolute inset-0 animate-[ray-sway_31s_ease-in-out_infinite_alternate-reverse] blur-[22px] [mask-image:radial-gradient(circle,#000_6%,transparent_62%)] motion-reduce:animate-none"
          />
          <div
            style={{ backgroundImage: raysNear }}
            className="absolute inset-0 animate-[ray-sway_23s_ease-in-out_infinite_alternate] blur-[9px] [mask-image:radial-gradient(circle,#000_4%,transparent_55%)] motion-reduce:animate-none"
          />
        </motion.div>
        <div className="absolute inset-[34%] animate-[sun-breathe_9s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(255,252,240,0.95)_0%,rgba(255,244,214,0.55)_16%,rgba(255,255,255,0.14)_42%,transparent_70%)] motion-reduce:animate-none" />
        <motion.div
          style={{ opacity: duskGlow }}
          className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,190,120,0.85)_0%,rgba(255,140,80,0.4)_20%,transparent_65%)]"
        />
        <div
          {...dragHandle}
          className="pointer-events-auto absolute left-1/2 top-1/2 h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 touch-none rounded-full"
        />
      </motion.div>

      <div className={`pointer-events-none absolute inset-0 ${horizonMask}`}>
        {/* 2. night: the moon, same behaviour as the sun */}
        <motion.div
          style={{
            x: pxX,
            y: moonPxY,
            marginLeft: "-15vmax",
            marginTop: "-15vmax",
          }}
          className={`pointer-events-none absolute left-0 top-0 h-[30vmax] w-[30vmax] will-change-transform ${nightOnly}`}
        >
          {/* faint cold halo + a tighter glow hugging the disc */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,215,240,0.22)_0%,rgba(160,185,230,0.08)_22%,transparent_58%)]" />
          {/* glow lives on its own disc so the feathered mask below doesn't clip it */}
          <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_18px_3px_rgba(220,230,250,0.35),0_0_60px_14px_rgba(170,190,235,0.16),0_0_140px_30px_rgba(140,165,225,0.08)]" />
          <div
            {...dragHandle}
            className="pointer-events-auto absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 touch-none rounded-full bg-[#1b2a42] [mask-image:radial-gradient(circle,#000_64%,transparent_71%)]"
          >
            {/* screen over the night-sky navy: dark maria take the sky's colour, bright highlands stay lit */}
            <img
              src="/images/moon.jpg"
              alt=""
              width="384"
              height="384"
              draggable={false}
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-[1.03] select-none rounded-full object-cover mix-blend-screen brightness-[1.15] contrast-[1.05]"
            />
            {/* cool moonlight cast */}
            <span className="absolute inset-0 rounded-full bg-[#cfdaf3] mix-blend-multiply" />
          </div>
        </motion.div>

        {/* night: twinkling stars + the occasional shooting star */}
        <motion.div
          style={{ x: farX, y: farY }}
          className={`absolute inset-0 ${nightOnly}`}
        >
          <StarField reduceMotion={reduceMotion ?? false} />
          {shootingStars.map((star) => (
            <span
              key={star.left}
              style={{
                top: star.top,
                left: star.left,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
              className="absolute h-px w-36 origin-left animate-[shooting-star_10s_ease-out_infinite] bg-gradient-to-r from-white to-transparent opacity-0 motion-reduce:hidden"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
