import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { EXPERIENCES } from "./experiences";

export function ExperienceSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const headerRef = useRef<HTMLDivElement>(null);
  // heading and intro slide in from opposite sides as the header scrolls up
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end 0.55"],
  });
  const headingX = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const introX = useTransform(scrollYProgress, [0, 1], ["16%", "0%"]);
  const introOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="section-pad scroll-mt-20 overflow-hidden bg-primary text-ink"
    >
      <div className="section-shell">
        <div
          ref={headerRef}
          className="grid gap-7 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
        >
          <motion.h2
            style={reduceMotion ? {} : { x: headingX }}
            className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] sm:text-7xl lg:text-8xl"
          >
            The journey behind the work.
          </motion.h2>
          <motion.p
            style={reduceMotion ? {} : { x: introX, opacity: introOpacity }}
            className="max-w-[44ch] text-base font-medium leading-7 text-ink/75 lg:justify-self-end"
          >
            More than five years building digital products, growing frontend
            teams, and shipping software across finance, SaaS, and public-sector
            systems.
          </motion.p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-12">
          {EXPERIENCES.map((experience, experienceIndex) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              experienceIndex={experienceIndex}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
