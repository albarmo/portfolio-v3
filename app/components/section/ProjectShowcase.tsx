import { Link } from "@remix-run/react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "~/services/project.server";
import ProjectCard from "../ui/card/ProjectCard";

const pad = (value: number) => String(value).padStart(2, "0");

// each card pins in its own viewport-high slot; earlier cards shrink and dim as later ones stack on top
function StackedCard({
  project,
  index,
  total,
  progress,
  reduceMotion,
  onFocusCard,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  onFocusCard: (index: number) => void;
}) {
  // progress hits index/(total-1) when this card pins; it then recedes until the last card lands
  const start = Math.min(index / Math.max(total - 1, 1), 0.999);
  const depth = total - 1 - index; // how many cards will land on top of this one
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.05]);
  const dim = useTransform(progress, [start, 1], [0, depth * 0.12]);

  return (
    // keyboard focus on a card buried under later cards would be invisible, so bring its slot into view
    <div
      className="sticky top-0 flex h-svh items-center"
      onFocus={(event) => event.target.matches(":focus-visible") && onFocusCard(index)}
    >
      <motion.div
        style={reduceMotion ? { top: index * 22 } : { scale, top: index * 22 }}
        className="relative w-full origin-top"
      >
        <ProjectCard
          title={project.title}
          category={project.category}
          year={project.year}
          imageUrl={project.thumbnail}
          href={`/projects/${project.id}`}
          techStack={project.techStack}
          highlight={project.highlight}
        />
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-ink lg:rounded-[2.5rem]"
          />
        )}
      </motion.div>
    </div>
  );
}

export default function ProjectShowcase({ data = [] }: { data?: Project[] }) {
  const projects = data.slice(0, 4);
  const reduceMotion = useReducedMotion() ?? false;
  const stackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 0 when the stack's top reaches the viewport top, 1 when its last card has pinned
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.round(progress * Math.max(projects.length - 1, 0)));
  });

  // every card owns one viewport-high slot, so card i is pinned at stackTop + i * viewport
  const goTo = (index: number) => {
    const stack = stackRef.current;
    if (!stack) return;
    const top = stack.getBoundingClientRect().top + window.scrollY + index * window.innerHeight;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-20 pb-[clamp(4.5rem,9vw,9rem)] pt-10 md:pt-14"
    >
      <div className="section-shell relative grid gap-12 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20 xl:gap-28">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-[9ch] text-balance font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] text-[var(--text)] sm:text-7xl lg:text-8xl">
            Selected work.
          </h2>
          <p className="mt-7 max-w-[36ch] text-base leading-7 text-[var(--muted)]">
            Digital products built for finance, public services, marketplaces,
            and data-heavy workflows.
          </p>
          <Link
            to="/projects"
            className="premium-link premium-link-primary mt-9"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>

          {projects.length > 1 && (
            <nav aria-label="Selected projects" className="mt-12 hidden lg:block">
              <p className="font-mono text-xs font-medium tabular-nums tracking-[0.08em] text-[var(--muted)]">
                <span className="text-[var(--text)]">{pad(active + 1)}</span> / {pad(projects.length)}
              </p>
              <ol className="mt-4 grid gap-1">
                {projects.map((project, index) => (
                  <li key={project.id} className="relative">
                    {active === index && (
                      <motion.span
                        layoutId="work-index-marker"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute -left-4 bottom-2 top-2 w-1 rounded-full bg-accent"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        goTo(index);
                        // move focus with the scroll so keyboard and screen-reader users land on the card
                        stackRef.current?.children[index]?.querySelector("a")?.focus({ preventScroll: true });
                      }}
                      aria-current={active === index ? "true" : undefined}
                      className={`flex w-full items-baseline gap-4 py-2 text-left transition-colors duration-300 ${
                        active === index
                          ? "text-[var(--text)]"
                          : "text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums">{pad(index + 1)}</span>
                      <span className="line-clamp-1 font-display text-2xl font-black uppercase leading-none tracking-[-0.01em]">
                        {project.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </header>

        {projects.length > 0 ? (
          <div ref={stackRef} className="relative">
            {projects.map((project, index) => (
              <StackedCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
                onFocusCard={goTo}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-[var(--surface-muted)] p-8 text-[var(--muted)]">
            Project data is currently unavailable.{" "}
            <Link to="/projects" className="text-[var(--text)] underline underline-offset-4">
              Browse the project archive
            </Link>{" "}
            to try again.
          </div>
        )}
      </div>
    </section>
  );
}
