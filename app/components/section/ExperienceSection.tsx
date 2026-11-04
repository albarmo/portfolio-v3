import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";

// cursor position feeds the spotlight gradient on each card
const trackPointer = (e: MouseEvent<HTMLLIElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const experiences = [
  {
    company: "Bit Group Asia",
    location: "Jakarta, Indonesia",
    logo: "/images/company/bitgroup.png",
    className:
      "bg-cloud text-ink md:col-span-7 md:row-span-2 md:min-h-[46rem]",
    roles: [
      {
        title: "Head of Group Frontend Developer",
        period: "Aug 2026 - Present",
        description:
          "Strategic Head of Frontend Engineering. Scaling web architectures and empowering high-performing developer teams.",
      },
      {
        title: "Frontend Developer",
        period: "Aug 2025 - Present",
        description: undefined,
      },
    ],
  },
  {
    company: "PT. Entrepreneur Trust Digital",
    location: "Jakarta, Indonesia",
    className: "bg-soft text-ink md:col-span-5",
    roles: [
      {
        title: "Frontend Developer",
        period: "Apr 2023 - Aug 2025",
        description: "Bank Rakyat Indonesia (BRI) App Engineering Team.",
      },
    ],
  },
  {
    company: "Feedloop",
    logo: "/images/company/feedloop.jpg",
    className: "bg-ink text-cloud md:col-span-5",
    roles: [
      {
        title: "Software Engineer",
        period: "Apr 2021 - Mar 2023",
        description: undefined,
      },
    ],
  },
  {
    company: "Everidea Interactive",
    logo: "/images/company/everidea.webp",
    className: "bg-cloud text-ink md:col-span-6",
    roles: [
      {
        title: "Frontend Web Developer",
        period: "Mar 2021 - Apr 2021",
        description: undefined,
      },
    ],
  },
  {
    company: "Gerakan Nasional 1000 Startup Digital",
    location: "Jakarta, Indonesia",
    logo: "/images/company/1000-startup.png",
    className: "bg-accent text-ink md:col-span-6",
    glow: "rgba(255,255,255,0.4)",
    roles: [
      {
        title: "Frontend Developer",
        period: "Feb 2021 - Mar 2021",
        description: undefined,
      },
    ],
  },
];

type Experience = (typeof experiences)[number] & { glow?: string };

function ExperienceCard({
  experience,
  experienceIndex,
  reduceMotion,
}: {
  experience: Experience;
  experienceIndex: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // 0 when the card's top meets the viewport bottom, 1 when it reaches 60% of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.6"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [experienceIndex % 2 ? 5 : -5, 0],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const style = {
    ...(reduceMotion ? {} : { y, scale, rotate, opacity }),
    "--glow": experience.glow ?? "rgba(0,153,255,0.2)",
  } as MotionStyle;

  return (
    <motion.li
      ref={ref}
      onMouseMove={trackPointer}
      style={style}
      className={`group relative isolate flex min-h-[22rem] origin-bottom flex-col overflow-hidden rounded-[2rem] p-7 sm:p-8 ${experience.className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(26rem_circle_at_var(--mx,50%)_var(--my,50%),var(--glow),transparent_70%)]"
      />
      <div className="flex items-start justify-between gap-5">
        {experience.logo && (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2.5 shadow-sm transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        )}
        {experience.location && (
          <p className="ml-auto max-w-[13rem] text-right font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] opacity-60">
            {experience.location}
          </p>
        )}
      </div>

      <div className="mt-auto pt-14">
        <h3 className="mb-7 max-w-sm text-lg font-bold leading-6">
          {experience.company}
        </h3>
        {experience.roles.map((role, index) => (
          <article
            key={`${role.title}-${role.period}`}
            className={index > 0 ? "mt-7 border-t border-current/20 pt-7" : ""}
          >
            <p className="flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em]">
              {role.period.endsWith("Present") && (
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                </span>
              )}
              <span className="opacity-60">{role.period}</span>
            </p>
            <h4
              className={`mt-2 font-display font-black uppercase leading-[0.92] tracking-[-0.02em] ${
                experienceIndex === 0
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-3xl sm:text-4xl"
              }`}
            >
              {role.title}
            </h4>
            {role.description && (
              <p className="mt-4 max-w-[58ch] text-sm font-medium leading-6 opacity-70">
                {role.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </motion.li>
  );
}

export default function ExperienceSection() {
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
            style={reduceMotion ? undefined : { x: headingX }}
            className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] sm:text-7xl lg:text-8xl"
          >
            The journey behind the work.
          </motion.h2>
          <motion.p
            style={reduceMotion ? undefined : { x: introX, opacity: introOpacity }}
            className="max-w-[44ch] text-base font-medium leading-7 text-ink/75 lg:justify-self-end"
          >
            More than five years building digital products, growing frontend
            teams, and shipping software across finance, SaaS, and public-sector
            systems.
          </motion.p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-12">
          {experiences.map((experience, experienceIndex) => (
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
