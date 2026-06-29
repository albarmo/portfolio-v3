import { Link } from "@remix-run/react";
import ProjectCard from "../ui/card/ProjectCard";
import type { Project } from "~/services/project.server";

export default function ProjectShowcase({ data }: { data: Project[] }) {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="border-b border-[var(--line)] pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                [ PROJ.SYS / SELECTED ]
              </samp>
              <h2 className="mt-4 font-display text-4xl font-black uppercase leading-tight text-[var(--text)] sm:text-5xl">
                PRODUCT INTERFACES WITH REAL CONSTRAINTS.
              </h2>
              <p className="mt-4 max-w-2xl font-mono text-xs leading-6 text-[var(--muted)]">
                A focused set of frontend and full-stack work across fintech,
                government systems, marketplaces, and data-heavy tools.
              </p>
            </div>
            <Link
              to="/projects"
              className="premium-link premium-link-secondary w-fit"
            >
              {">>> SEE ALL"}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--line)] border border-[var(--line)] lg:grid-cols-2">
          {data?.map((project, index) => (
            <ProjectCard
              key={index}
              imageUrl={project?.thumbnail}
              href={`/projects/${project.id}`}
              backgroundColor={""}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
