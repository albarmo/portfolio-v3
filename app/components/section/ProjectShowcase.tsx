import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "~/services/project.server";
import ProjectCard from "../ui/card/ProjectCard";

export default function ProjectShowcase({ data = [] }: { data?: Project[] }) {
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
        </header>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-16 sm:gap-20">
            {data.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                imageUrl={project.thumbnail}
                href={`/projects/${project.id}`}
                index={index}
                {...project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-[var(--surface-muted)] p-8 text-[var(--muted)]">
            Project data is currently unavailable. Browse the project archive
            to try again.
          </div>
        )}
      </div>
    </section>
  );
}
