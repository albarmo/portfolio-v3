import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import StarField from "../ui/StarField";

const shootingStars = [
  { top: "8%", left: "78%", duration: "9s", delay: "2s" },
  { top: "22%", left: "95%", duration: "13s", delay: "7s" },
];

// irregular, soft-edged ray fans; their middle sits at RAY_FAN_CENTER and gets rotated toward the heading
const raysNear =
  "conic-gradient(from 150deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.22) 6deg, transparent 11deg, transparent 19deg, rgba(255,255,255,0.14) 23deg, transparent 30deg, rgba(255,255,255,0.2) 41deg, transparent 47deg, transparent 58deg, rgba(255,255,255,0.12) 64deg, transparent 75deg, rgba(255,252,240,0.18) 88deg, transparent 94deg, transparent 105deg, rgba(255,255,255,0.1) 112deg, transparent 124deg, transparent 360deg)";
const raysFar =
  "conic-gradient(from 160deg at 50% 50%, transparent 0deg, rgba(255,246,222,0.16) 9deg, transparent 17deg, rgba(255,255,255,0.1) 29deg, transparent 36deg, transparent 50deg, rgba(255,246,222,0.18) 57deg, transparent 66deg, rgba(255,255,255,0.08) 80deg, transparent 92deg, rgba(255,246,222,0.14) 101deg, transparent 113deg, transparent 360deg)";

const RAY_FAN_CENTER = 212; // deg, middle of the fans above (0° = up, clockwise)
const DEFAULT_HOME = { x: 86, y: 10 }; // % of the hero; replaced by the visitor's clock on mount
const HORIZON = 50; // % of the viewport-high hero the light sinks toward as it scrolls away
const SET = 90; // % below its place when a body has set (sun at night, moon by day)

/**
 * Resting place of the sun (day) or moon (night) for a local time: an arc that rises
 * on the left at 6:00/18:00, peaks at 12:00/0:00 and sets on the right.
 */
const homeFromClock = (date: Date) => {
  const hour = date.getHours() + date.getMinutes() / 60;
  const t = ((((hour - 6) % 12) + 12) % 12) / 12;
  return { x: 10 + t * 80, y: 17 + 19 * (2 * t - 1) ** 2 }; // y ≥ 17% keeps it clear of the navbar
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const headingType =
  "max-w-[10ch] font-display text-[clamp(4.25rem,8.2vw,8.25rem)] font-black uppercase leading-[0.8] tracking-[-0.035em] md:max-w-none";

// soft horizon at the hero's bottom edge so lights and dusk never end in a hard line
const horizonMask =
  "[mask-image:linear-gradient(180deg,#000_0%,#000_72%,transparent_97%)]";

const fade = "transition-opacity duration-[900ms] ease-in-out";
const dayOnly = `${fade} opacity-100 dark:opacity-0`;
const nightOnly = `${fade} opacity-0 dark:opacity-100`;

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

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // hero size in px and heading centre in %; defaults keep SSR and first paint consistent
  const layout = useRef({ w: 1440, h: 800, tx: 50, ty: 42 });
  const layoutTick = useMotionValue(0);
  const home = useRef(DEFAULT_HOME);
  const dragging = useRef(false);

  // where the light wants to be (mouse, finger or home), followed by a lazy spring
  const targetX = useMotionValue(DEFAULT_HOME.x);
  const targetY = useMotionValue(DEFAULT_HOME.y);
  const baseX = useSpring(targetX, { stiffness: 45, damping: 18 });
  const baseY = useSpring(targetY, { stiffness: 45, damping: 18 });

  // 1. sunset: scrolling the hero away sinks the light toward the horizon
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const dusk = useTransform(scrollYProgress, (p) => (reduceMotion ? 0 : p));
  const duskGlow = useTransform(dusk, (p) => Math.min(1, p * 1.6));
  // + p * 100 cancels the hero scrolling up, so the light sinks on screen and finally sets behind the next section
  const skyY = useTransform(
    [baseY, dusk],
    ([y, p]: number[]) => y + (HORIZON - y) * p + p * 100
  );

  // 2+3. sun and moon share the sky; the one not in season sits SET% lower and rises/sets on theme change
  const sunDrop = useMotionValue(SET);
  const moonDrop = useMotionValue(SET);
  const sunY = useTransform([skyY, sunDrop], ([y, d]: number[]) => y + d);
  const moonY = useTransform([skyY, moonDrop], ([y, d]: number[]) => y + d);
  // shadows follow whichever body is higher in the sky
  const lightY = useTransform(
    [skyY, sunDrop, moonDrop],
    ([y, s, m]: number[]) => y + Math.min(s, m)
  );

  // positions as transforms (px), never left/top, so moving them doesn't trigger layout
  const pxX = useTransform(
    [baseX, layoutTick],
    ([x]: number[]) => (x / 100) * layout.current.w
  );
  const sunPxY = useTransform(
    [sunY, layoutTick],
    ([y]: number[]) => (y / 100) * layout.current.h
  );
  const moonPxY = useTransform(
    [moonY, layoutTick],
    ([y]: number[]) => (y / 100) * layout.current.h
  );

  // unit vector from a light at (x, y)% to the heading, in px
  const lightRay = (x: number, y: number) => {
    const { w, h, tx, ty } = layout.current;
    const vx = ((tx - x) / 100) * w;
    const vy = ((ty - y) / 100) * h;
    const length = Math.hypot(vx, vy) || 1;
    return {
      ux: vx / length,
      uy: vy / length,
      length,
      diagonal: Math.hypot(w, h),
    };
  };

  const raysRotate = useTransform(
    [baseX, sunY, layoutTick],
    ([x, y]: number[]) => {
      const { ux, uy } = lightRay(x, y);
      return (Math.atan2(ux, -uy) * 180) / Math.PI - RAY_FAN_CENTER;
    }
  );

  // shadow falls away from the light; longer when it is far or low (dusk), near-zero right above the text
  const shadowOffset = ([x, y, p]: number[]) => {
    // a light at or below the heading (sunset) casts long sideways shadows, never upward ones
    const { ux, uy, length, diagonal } = lightRay(
      x,
      Math.min(y, layout.current.ty - 4)
    );
    const reach =
      (8 + 26 * Math.min(1, length / (diagonal * 0.5))) *
      Math.min(1, length / 120) *
      (1 + 1.4 * p);
    return { x: ux * reach, y: uy * reach };
  };
  const shadowX = useTransform(
    [baseX, lightY, dusk, layoutTick],
    (v: number[]) => shadowOffset(v).x
  );
  const shadowY = useTransform(
    [baseX, lightY, dusk, layoutTick],
    (v: number[]) => shadowOffset(v).y
  );

  // night stars drift slightly opposite the light
  const farX = useTransform(baseX, (v) => (v - 50) * -0.28);
  const farY = useTransform(baseY, (v) => (v - 50) * -0.16);

  const measure = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect();
    const heading = headingRef.current?.getBoundingClientRect();
    if (!section || !heading) return;
    layout.current = {
      w: section.width,
      h: section.height,
      tx:
        ((heading.left + heading.width / 2 - section.left) / section.width) *
        100,
      ty:
        ((heading.top + heading.height / 2 - section.top) / section.height) *
        100,
    };
    layoutTick.set(layoutTick.get() + 1);
  }, [layoutTick]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // 4. rest the light where it would be in the visitor's sky right now
  useEffect(() => {
    home.current = homeFromClock(new Date());
    targetX.set(home.current.x);
    targetY.set(home.current.y);
  }, [targetX, targetY]);

  // 3. theme switch: the outgoing body sets, the incoming one rises (also plays once on load)
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const dark = root.classList.contains("dark");
      const options = reduceMotion
        ? { duration: 0 }
        : { duration: 1.4, ease: "easeInOut" as const };
      animate(sunDrop, dark ? SET : 0, options);
      animate(moonDrop, dark ? 0 : SET, options);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [reduceMotion, sunDrop, moonDrop]);

  const moveLightTo = (clientX: number, clientY: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetX.set(clamp(((clientX - rect.left) / rect.width) * 100));
    targetY.set(clamp(((clientY - rect.top) / rect.height) * 100));
  };

  const followMouse = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse" && !reduceMotion)
      moveLightTo(e.clientX, e.clientY);
  };

  const sendLightHome = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    targetX.set(home.current.x);
    targetY.set(home.current.y);
  };

  // 5. touch: drag the sun/moon itself; only its disc captures the finger so page scrolling still works
  const dragHandle = {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragging.current = true;
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (dragging.current) moveLightTo(e.clientX, e.clientY);
    },
    onPointerUp: () => {
      dragging.current = false;
    },
    onPointerCancel: () => {
      dragging.current = false;
    },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={followMouse}
      onPointerLeave={sendLightHome}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0088E4_0%,#0099FF_38%,#D7F0FF_74%,#FDFDFE_100%)] text-[#FDFDFE]"
    >
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--bg)_55%,transparent)] to-[var(--bg)]" />

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

      {/* content lets touches through to the sun/moon; only its own elements take pointer events */}
      <div className="section-shell pointer-events-none relative flex min-h-[100dvh] flex-col justify-center pb-5 pt-24 md:pb-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={measure}
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
            className="pointer-events-auto mt-5 max-w-[48ch] text-sm font-semibold leading-6 text-[#111827]/75 transition-colors duration-[900ms] dark:text-[#FDFDFE]/75 sm:text-base"
          >
            I turn complex ideas into thoughtful digital products through
            frontend engineering and product thinking.
          </motion.p>

          <motion.a
            href="#work"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="premium-link pointer-events-auto mt-6 border-[#F04A2D] bg-[#F04A2D] text-[#111827]"
          >
            Explore work <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
