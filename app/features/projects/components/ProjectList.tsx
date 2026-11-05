import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/features/projects/types";

const MAX_VISIBLE_TAGS = 4;

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects: projectList }: ProjectListProps) {

  return (
    <section className="section-pad pt-32 sm:pt-40">
      <div className="section-shell">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[var(--line)] pb-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                [ PORTFOLIO / PROJ.SYS ]
              </samp>
              <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
                SELECTED WORK ACROSS PRODUCT TEAMS.
              </h1>
              <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-[var(--muted)]">
                A focused set of frontend and full-stack work across fintech,
                government systems, marketplaces, and data-heavy tools.
              </p>
            </div>

            {/* Project count */}
            <div className="shrink-0 border border-[var(--line)] p-4 text-right">
              <samp className="block font-mono text-3xl font-black text-[var(--text)]">
                {projectList.length.toString().padStart(2, "0")}
              </samp>
              <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                PROJECTS
              </samp>
            </div>
          </div>
        </motion.div>

        {/* ── Project list ────────────────────────────────────── */}
        <div>
          {projectList.map((project, index) => {
            const techTags = project.techStack.slice(0, MAX_VISIBLE_TAGS);
            return (
              <motion.div
                key={project.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="show"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative flex items-center gap-5 border-b border-[var(--line)] py-6 pl-4 transition-colors hover:bg-[var(--surface-muted)]/30 lg:gap-8 lg:py-8"
                >
                  {/* Left accent bar */}
                  <span className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100" />

                  {/* Index */}
                  <samp className="hidden shrink-0 font-mono text-xs font-bold text-[var(--muted)] sm:block">
                    {(index + 1).toString().padStart(2, "0")}
                  </samp>

                  {/* Thumbnail */}
                  <div className="relative hidden aspect-[16/10] w-28 shrink-0 overflow-hidden border border-[var(--line)] sm:block lg:w-36">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </div>

                  {/* Main info */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl font-black uppercase leading-tight text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)] lg:text-[1.75rem]">
                      {project.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 max-w-xl font-mono text-xs leading-5 text-[var(--muted)]">
                      {project.brief}
                    </p>
                    {techTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {techTags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[var(--line)] px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Year + category meta */}
                  <div className="hidden shrink-0 flex-col items-end gap-1.5 lg:flex">
                    <samp className="font-mono text-sm font-black text-[var(--text)]">
                      {project.year}
                    </samp>
                    <samp className="text-right font-mono text-[0.58rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                      {project.category}
                    </samp>
                  </div>

                  {/* Arrow */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-all duration-200 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
