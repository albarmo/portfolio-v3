import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";

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
      {/* 3D motion path scene */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <Suspense fallback={null}><HeroScene /></Suspense>
      </div> */}

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
          <div className="flex items-center justify-between border-b border-[var(--line)] py-2">
            <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              SYS.INIT / PORTFOLIO.v2026
            </samp>
            <samp className="font-mono text-[0.65rem] font-bold text-[var(--terminal-green)]">
              ● SYS.ONLINE
            </samp>
          </div>

          {/* Main grid */}
          <div className="grid flex-1 gap-0 lg:grid-cols-[1fr_0.4fr]">
            {/* Left: Macro typography */}
            <div className="flex flex-col justify-center border-b border-[var(--line)] py-12 lg:border-b-0 lg:border-r lg:pr-12">
              <span className="section-kicker">[ SOFTWARE.ENG / FE.ARCH ]</span>
              <h1 className="mt-6 font-display text-[clamp(4rem,11vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[var(--text)]">
                ALBAR
                <br />
                <span className="text-[var(--accent)]">M</span>OER
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <p className="mt-6 max-w-lg font-mono text-sm leading-7 text-[var(--muted)]">
                Building fast, accessible frontend experiences with clear
                systems and careful execution. I turn product ideas into
                production-ready interfaces.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="premium-link premium-link-primary"
                >
                  {">>> VIEW.WORK"}
                </Link>
                <Link
                  to="/contact"
                  className="premium-link premium-link-secondary"
                >
                  {"[ CONTACT ]"}
                </Link>
              </div>
            </div>

            {/* Right: Technical profile panel */}
            <div className="hidden flex-col lg:flex lg:pl-0">
              <div className="flex h-full flex-col border-l-0">
                <div className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-4 py-2">
                  <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    UNIT.PROFILE / D-01
                  </samp>
                </div>
                <div className="flex-1 overflow-hidden bg-[var(--surface-muted)]">
                  <img
                    src="/images/character.png"
                    alt="Portrait illustration of Albar Moerhamsa"
                    className="h-full w-full object-cover object-top"
                    width={520}
                    height={680}
                  />
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
            </div>
          </div>

          {/* Bottom telemetry row */}
          <div className="grid grid-cols-3 border-t border-[var(--line)]">
            {statusItems.map((item, i) => (
              <div
                key={item.label}
                className={`py-4 ${
                  i > 0 ? "border-l border-[var(--line)] pl-4" : ""
                }`}
              >
                <samp className="block font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                  {item.label}
                </samp>
                <samp
                  className={`mt-1 block font-mono text-xs font-bold uppercase ${
                    item.accent ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {item.value}
                </samp>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
