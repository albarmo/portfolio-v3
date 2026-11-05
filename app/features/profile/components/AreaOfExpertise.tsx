import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    number: "01",
    title: "Frontend engineering",
    description:
      "Scalable, maintainable, and high-performance web applications built for real product teams.",
    span: "md:col-span-7",
    className: "bg-primary text-ink",
  },
  {
    number: "02",
    title: "Product development",
    description:
      "Complex requirements shaped into clear digital products with purposeful user flows.",
    span: "md:col-span-5",
    className: "bg-ink text-white md:translate-y-16",
  },
  {
    number: "03",
    title: "UI engineering",
    description:
      "Design systems and visual concepts translated into precise, resilient interfaces.",
    span: "md:col-span-5",
    className: "bg-paper text-ink",
  },
  {
    number: "04",
    title: "Performance and accessibility",
    description:
      "Fast, inclusive experiences with clear interaction states and measurable performance.",
    span: "md:col-span-7",
    className: "bg-accent text-ink md:translate-y-16",
  },
];

function CapabilityCard({
  capability,
  index,
  reduceMotion,
}: {
  capability: (typeof capabilities)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // entrance: 0 when the card's top meets the viewport bottom, 1 at 65% of the viewport
  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start end", "start 0.65"],
  });
  // parallax: runs for the whole time the card is on screen
  const { scrollYProgress: pass } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fromLeft = index % 2 === 0;
  const x = useTransform(enter, [0, 1], [fromLeft ? -140 : 140, 0]);
  const rotate = useTransform(enter, [0, 1], [fromLeft ? -4 : 4, 0]);
  const scale = useTransform(enter, [0, 1], [0.9, 1]);
  const opacity = useTransform(enter, [0, 0.5], [0, 1]);
  const numberY = useTransform(pass, [0, 1], [90, -90]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? {} : { x, rotate, scale, opacity }}
      className={capability.span}
    >
      <article
        className={`group relative h-full min-h-72 overflow-hidden rounded-[2rem] p-7 sm:p-9 lg:rounded-[2.5rem] ${capability.className}`}
      >
        <span className="font-mono text-xs font-medium tracking-[0.1em] opacity-70">
          {capability.number}
        </span>
        <div className="mt-16 max-w-xl">
          <h3 className="font-display text-5xl font-black uppercase leading-[0.88] tracking-[-0.02em] sm:text-6xl">
            {capability.title}
          </h3>
          <p className="mt-5 max-w-[48ch] text-sm font-medium leading-6 opacity-80">
            {capability.description}
          </p>
        </div>
        <motion.span
          aria-hidden="true"
          style={reduceMotion ? {} : { y: numberY }}
          className="absolute -right-10 -top-12"
        >
          <span className="block font-display text-[13rem] font-black leading-none opacity-[0.08] transition-transform duration-500 group-hover:-translate-x-3 group-hover:translate-y-3">
            {capability.number}
          </span>
        </motion.span>
      </article>
    </motion.div>
  );
}

export function AreaOfExpertise() {
  const reduceMotion = useReducedMotion() ?? false;
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end 0.55"],
  });
  const headingX = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const introY = useTransform(scrollYProgress, [0.3, 1], [40, 0]);
  const introOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section className="section-pad overflow-hidden bg-background">
      <div className="section-shell">
        <div ref={headerRef}>
          <motion.h2
            style={reduceMotion ? {} : { x: headingX }}
            className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] sm:text-7xl lg:text-8xl"
          >
            Turning ideas into digital experiences.
          </motion.h2>
          <motion.p
            style={reduceMotion ? {} : { y: introY, opacity: introOpacity }}
            className="mt-6 max-w-[58ch] text-base leading-7 text-muted"
          >
            From early product thinking to production delivery, I work across the
            parts that make an interface useful and durable.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-12 md:pb-16">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.number}
              capability={capability}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
