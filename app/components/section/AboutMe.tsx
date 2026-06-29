import { useRef } from "react";
import VariableProximity from "../ui/text/VariableProximityText";

const CAREER_START = 2021;

const AboutMe = () => {
  const containerRef = useRef(null);
  const years = new Date().getFullYear() - CAREER_START;

  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-4">
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            [ ABOUT.SYS / IDENTITY ]
          </samp>
          <samp className="font-mono text-[0.65rem] text-[var(--muted)]">
            UNIT / A-01
          </samp>
        </div>

        <div
          ref={containerRef}
          className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:items-start"
        >
          <div className="hidden lg:sticky lg:top-20 lg:block">
            <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              ABOUT ALBAR
            </samp>
            <p className="mt-4 font-mono text-xs leading-6 text-[var(--muted)]">
              Software Engineer and Frontend Engineer focused on interfaces that
              feel calm, fast, and reliable in daily use.
            </p>
          </div>
          <VariableProximity
            label={`I'm Albar Moerhamsa, a Software Engineer with over ${years}+ years of experience in crafting high-quality and impactful digital experiences. I have a strong focus on turning complex problems into elegant, user-friendly interfaces.`}
            className="max-w-6xl text-3xl font-extrabold leading-tight tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl"
            fromFontVariationSettings="'wght' 420, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={containerRef}
            radius={120}
            falloff="linear"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
