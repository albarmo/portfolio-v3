import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeDown = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const slideRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const statusItems = [
  { label: "UNIT", value: "A-01 / ALBARMO" },
  { label: "SPEC", value: "FE.ARCH / FULLSTACK" },
  { label: "STATUS", value: "● OPEN TO WORK", accent: true },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRedRef = useRef<HTMLDivElement>(null);
  const glowWhiteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tx = `calc(${x}px - 50%)`;
      const ty = `calc(${y}px - 50%)`;

      if (glowRedRef.current) {
        glowRedRef.current.style.transform = `translate(${tx}, ${ty})`;
      }
      if (glowWhiteRef.current) {
        glowWhiteRef.current.style.transform = `translate(${tx}, ${ty})`;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Red accent phosphor glow — follows cursor */}
      <div
        ref={glowRedRef}
        className="pointer-events-none absolute left-[20%] top-[40%] h-[55vh] w-[55vh] rounded-full bg-[var(--accent)] opacity-0 blur-[130px] [transition:transform_0.45s_ease-out] dark:opacity-[0.07]"
      />
      {/* White ambient scatter — lags behind cursor */}
      <div
        ref={glowWhiteRef}
        className="pointer-events-none absolute left-[20%] top-[40%] h-[40vh] w-[70vw] rounded-full bg-[var(--text)] opacity-[0.015] blur-[100px] [transition:transform_0.85s_ease-out] dark:opacity-[0.025]"
      />

      <div className="relative z-10 section-shell">
        <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center pt-14">

          {/* System status bar */}
          <motion.div
            {...fadeDown}
            className="flex items-center justify-between border-b border-[var(--line)] py-2"
          >
            <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              SYS.INIT / PORTFOLIO.v2026
            </samp>
            <samp className="cursor-blink font-mono text-[0.65rem] font-bold text-[var(--terminal-green)]">
              ● SYS.ONLINE
            </samp>
          </motion.div>

          {/* Main grid */}
          <div className="grid flex-1 gap-0 lg:grid-cols-[1fr_0.4fr]">

            {/* Left: Macro typography */}
            <div className="flex flex-col justify-center border-b border-[var(--line)] py-12 lg:border-b-0 lg:border-r lg:pr-12">
              <motion.span {...fadeUp(0.1)} className="section-kicker">
                [ SOFTWARE.ENG / FE.ARCH ]
              </motion.span>
              <motion.h1
                {...fadeUp(0.2)}
                className="mt-6 font-display text-[clamp(4rem,11vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[var(--text)]"
              >
                ALBAR
                <br />
                <span className="text-[var(--accent)]">M</span>OER
                <span className="text-[var(--accent)]">.</span>
              </motion.h1>
              <motion.p
                {...fadeUp(0.32)}
                className="mt-6 max-w-lg font-mono text-sm leading-7 text-[var(--muted)]"
              >
                Building fast, accessible frontend experiences with clear
                systems and careful execution. I turn product ideas into
                production-ready interfaces.
              </motion.p>
              <motion.div
                {...fadeUp(0.44)}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Link to="/projects" className="premium-link premium-link-primary glow-hover">
                  {">>> VIEW.WORK"}
                </Link>
                <Link to="/contact" className="premium-link premium-link-secondary glow-hover">
                  {"[ CONTACT ]"}
                </Link>
              </motion.div>
            </div>

            {/* Right: Technical profile panel with corner brackets */}
            <motion.div {...slideRight} className="relative hidden flex-col lg:flex lg:pl-0">
              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-0 top-0 z-20 h-5 w-5 border-l-2 border-t-2 border-[var(--accent)]" />
              <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-5 w-5 border-b-2 border-r-2 border-[var(--accent)]" />

              <div className="flex h-full flex-col">
                <div className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-4 py-2">
                  <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    UNIT.PROFILE / D-01
                  </samp>
                </div>

                {/* Image with scan sweep */}
                <div className="group relative flex-1 overflow-hidden bg-[var(--surface-muted)]">
                  <img
                    src="/images/character.png"
                    alt="Portrait illustration of Albar Moerhamsa"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    width={520}
                    height={680}
                  />
                  {/* Scan line sweep on hover */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] -translate-y-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70 transition-none group-hover:translate-y-[100vh] group-hover:duration-[1200ms] group-hover:[transition:transform_1.2s_linear]" />
                  {/* Subtle overlay tint on hover */}
                  <span className="pointer-events-none absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-[0.04]" />
                </div>

                <div className="border-t border-[var(--line)] bg-[var(--surface)] p-4">
                  <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    FOCUS.DIRECTIVE
                  </samp>
                  <p className="mt-2 font-display text-lg font-black uppercase leading-tight text-[var(--text)]">
                    Crafting High-Performance Frontends
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom telemetry row */}
          <div className="grid grid-cols-3 border-t border-[var(--line)]">
            {statusItems.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(0.55 + i * 0.1)}
                className={`group py-4 transition-colors hover:bg-[var(--surface-muted)]/40 ${
                  i > 0 ? "border-l border-[var(--line)] pl-4" : ""
                }`}
              >
                <samp className="block font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                  {item.label}
                </samp>
                <samp
                  className={`mt-1 block font-mono text-xs font-bold uppercase transition-colors ${
                    item.accent
                      ? "text-[var(--accent)]"
                      : "text-[var(--text)] group-hover:text-[var(--accent)]"
                  }`}
                >
                  {item.value}
                </samp>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
