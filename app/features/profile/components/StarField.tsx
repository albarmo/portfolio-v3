import { useEffect, useRef } from "react";

type Star = {
  x: number; // 0..1 of width
  y: number; // 0..1 of height
  radius: number; // css px of the bright core
  rgb: string;
  alpha: number;
  // twinkle: two detuned sines give an irregular, non-repeating-looking flicker
  speedA: number;
  speedB: number;
  phase: number;
};

// seeded so the sky looks the same on every visit
const makeRand = (start: number) => {
  let seed = start;
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
};

const makeStars = (count: number, seed: number, bright: boolean): Star[] => {
  const rand = makeRand(seed);
  return Array.from({ length: count }, () => {
    const roll = rand();
    const magnitude = rand() ** (bright ? 2.5 : 1.6); // most stars faint, a few bright
    return {
      x: rand(),
      y: rand() ** 1.35 * 0.74, // denser high up, thinning toward the horizon
      radius: bright ? 0.7 + magnitude * 1.3 : 0.35 + magnitude * 0.55,
      rgb: roll < 0.68 ? "255,255,255" : roll < 0.9 ? "206,222,255" : "255,224,186",
      alpha: bright ? 0.55 + magnitude * 0.45 : 0.18 + magnitude * 0.5,
      speedA: 1.2 + rand() * 2.4,
      speedB: 3.1 + rand() * 4.3,
      phase: rand() * Math.PI * 2,
    };
  });
};

const faintStars = makeStars(380, 7, false);
const brightStars = makeStars(46, 19, true);

// photographic star: tiny hot core with a gaussian-ish falloff, plus a faint bloom on the brightest
const drawStar = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rgb: string,
  alpha: number,
) => {
  const reach = radius * 4;
  const core = ctx.createRadialGradient(x, y, 0, x, y, reach);
  core.addColorStop(0, `rgba(${rgb},${alpha})`);
  core.addColorStop(0.15, `rgba(${rgb},${alpha * 0.75})`);
  core.addColorStop(0.35, `rgba(${rgb},${alpha * 0.22})`);
  core.addColorStop(0.65, `rgba(${rgb},${alpha * 0.05})`);
  core.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, reach, 0, Math.PI * 2);
  ctx.fill();

  if (radius > 1.5) {
    const bloom = ctx.createRadialGradient(x, y, 0, x, y, radius * 12);
    bloom.addColorStop(0, `rgba(${rgb},${alpha * 0.12})`);
    bloom.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(x, y, radius * 12, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** Canvas star field: static faint stars drawn once, brighter stars scintillating at ~30fps while visible at night. */
export function StarField({ reduceMotion }: { reduceMotion: boolean }) {
  const staticRef = useRef<HTMLCanvasElement>(null);
  const twinkleRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const staticCanvas = staticRef.current;
    const twinkleCanvas = twinkleRef.current;
    const staticCtx = staticCanvas?.getContext("2d");
    const twinkleCtx = twinkleCanvas?.getContext("2d");
    if (!staticCanvas || !twinkleCanvas || !staticCtx || !twinkleCtx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = staticCanvas.offsetWidth;
      height = staticCanvas.offsetHeight;
      for (const canvas of [staticCanvas, twinkleCanvas]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      staticCtx.clearRect(0, 0, width, height);
      for (const s of faintStars) drawStar(staticCtx, s.x * width, s.y * height, s.radius, s.rgb, s.alpha);
      drawBright(performance.now());
    };

    const drawBright = (now: number) => {
      const t = now / 1000;
      twinkleCtx.clearRect(0, 0, width, height);
      for (const s of brightStars) {
        const flicker = reduceMotion
          ? 1
          : 0.78 + 0.14 * Math.sin(t * s.speedA + s.phase) + 0.08 * Math.sin(t * s.speedB + s.phase * 1.7);
        drawStar(twinkleCtx, s.x * width, s.y * height, s.radius, s.rgb, s.alpha * flicker);
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const night = document.documentElement.classList.contains("dark");
      if (!visible || !night || now - lastDraw < 33) return;
      lastDraw = now;
      drawBright(now);
    };

    resize();
    window.addEventListener("resize", resize);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(staticCanvas);
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas ref={staticRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <canvas ref={twinkleRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </>
  );
}
