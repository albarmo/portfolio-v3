import { Link } from "react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/features/projects/types";
import { ProjectCard } from "./ProjectCard";

const pad = (value: number) => String(value).padStart(2, "0");

const SHOWCASE_SIZE = 4;

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects: allProjects }: ProjectShowcaseProps) {
  const projects = allProjects.slice(0, SHOWCASE_SIZE);
  const reduceMotion = useReducedMotion() ?? false;
  const stackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 0 when the stack's top reaches the viewport top, 1 when the last project's slot is reached
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.round(progress * Math.max(projects.length - 1, 0)));
  });

  // every project owns one viewport-high scroll slot, so project i is shown at stackTop + i * viewport
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
      <div className="section-shell relative grid gap-12 lg:grid-cols-[minmax(17rem,1fr)_minmax(0,2fr)] lg:gap-12 xl:gap-16">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-[9ch] text-balance font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] text-foreground sm:text-7xl lg:text-8xl">
            Selected work.
          </h2>
          <p className="mt-7 max-w-[36ch] text-base leading-7 text-muted">
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
              <p className="font-mono text-xs font-medium tabular-nums tracking-[0.08em] text-muted">
                <span className="text-foreground">{pad(active + 1)}</span> / {pad(projects.length)}
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
                        windowRef.current?.querySelectorAll<HTMLAnchorElement>("[data-tab-panel] > a")[index]?.focus({ preventScroll: true });
                      }}
                      aria-current={active === index ? "true" : undefined}
                      className={`flex w-full items-baseline gap-4 py-2 text-left transition-colors duration-300 ${
                        active === index
                          ? "text-foreground"
                          : "text-muted hover:text-foreground"
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
          // one viewport-high slot per project; the browser window stays pinned while the active tab follows scroll
          <div ref={stackRef} className="relative" style={{ height: `${projects.length * 100}svh` }}>
            <div className="sticky top-0 flex h-svh items-center pt-[4.5rem]">
              <div ref={windowRef} className="w-full border border-border bg-surface-muted">
                <div className="flex">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={active === index ? "true" : undefined}
                      className={`relative flex min-w-0 flex-1 items-center gap-2 border-r border-border px-3 py-2.5 text-left transition-colors duration-300 sm:px-4 ${
                        active === index
                          ? "bg-surface-solid text-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {active === index && (
                        <motion.span
                          layoutId="work-tab-marker"
                          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                          className="absolute inset-x-0 top-0 h-0.5 bg-accent"
                        />
                      )}
                      <span className="font-mono text-[0.62rem] tabular-nums">{pad(index + 1)}</span>
                      <span className="truncate text-xs font-semibold">{project.title}</span>
                    </button>
                  ))}
                </div>

                <div aria-hidden="true" className="flex items-center gap-3 border-y border-border bg-surface-solid px-4 py-2.5">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 bg-accent" />
                    <span className="h-2.5 w-2.5 bg-border" />
                    <span className="h-2.5 w-2.5 bg-border" />
                  </span>
                  <span className="min-w-0 flex-1 truncate bg-surface-muted px-3 py-1 font-mono text-[0.65rem] text-muted">
                    {projects[active]?.url || `/projects/${projects[active]?.title.toLowerCase().replace(/\W+/g, "-")}`}
                  </span>
                </div>

                {/* all panels stay mounted and stacked so focus survives tab switches; visibility hides inactive ones from tab order and screen readers */}
                <div className="grid">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      data-tab-panel
                      className={`[grid-area:1/1] transition-[opacity,visibility,transform] duration-500 ease-out motion-reduce:transition-none ${
                        active === index ? "visible opacity-100" : "invisible opacity-0 motion-safe:scale-[0.985]"
                      }`}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] bg-surface-muted p-8 text-muted">
            Project data is currently unavailable.{" "}
            <Link to="/projects" className="text-foreground underline underline-offset-4">
              Browse the project archive
            </Link>{" "}
            to try again.
          </div>
        )}
      </div>
    </section>
  );
}
