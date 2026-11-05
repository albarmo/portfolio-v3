import {
  animate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";

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

/** Motion state for the hero sky: a sun/moon that follows the pointer, sets on scroll and casts the heading shadow */
export function useHeroLight() {
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
    ([y = 0, p = 0]: number[]) => y + (HORIZON - y) * p + p * 100
  );

  // 2+3. sun and moon share the sky; the one not in season sits SET% lower and rises/sets on theme change
  const sunDrop = useMotionValue(SET);
  const moonDrop = useMotionValue(SET);
  const sunY = useTransform([skyY, sunDrop], ([y = 0, d = 0]: number[]) => y + d);
  const moonY = useTransform([skyY, moonDrop], ([y = 0, d = 0]: number[]) => y + d);
  // shadows follow whichever body is higher in the sky
  const lightY = useTransform(
    [skyY, sunDrop, moonDrop],
    ([y = 0, s = 0, m = 0]: number[]) => y + Math.min(s, m)
  );

  // positions as transforms (px), never left/top, so moving them doesn't trigger layout
  const pxX = useTransform(
    [baseX, layoutTick],
    ([x = 0]: number[]) => (x / 100) * layout.current.w
  );
  const sunPxY = useTransform(
    [sunY, layoutTick],
    ([y = 0]: number[]) => (y / 100) * layout.current.h
  );
  const moonPxY = useTransform(
    [moonY, layoutTick],
    ([y = 0]: number[]) => (y / 100) * layout.current.h
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
    ([x = 0, y = 0]: number[]) => {
      const { ux, uy } = lightRay(x, y);
      return (Math.atan2(ux, -uy) * 180) / Math.PI - RAY_FAN_CENTER;
    }
  );

  // shadow falls away from the light; longer when it is far or low (dusk), near-zero right above the text
  const shadowOffset = ([x = 0, y = 0, p = 0]: number[]) => {
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

  return {
    reduceMotion: reduceMotion ?? false,
    sectionRef,
    headingRef,
    measure,
    followMouse,
    sendLightHome,
    dragHandle,
    pxX,
    sunPxY,
    moonPxY,
    raysRotate,
    duskGlow,
    shadowX,
    shadowY,
    farX,
    farY,
  };
}
