import { Link } from "react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { TechTag } from "@/components/atoms/TechTag";
import type { Project } from "@/features/projects/types";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { techStack, responsibilities } = project;

  return (
    <div className="bg-background text-foreground">
      <div className="section-shell py-32 sm:py-40">
        <header>
          <div>
            <div className="mb-12 flex items-center justify-between gap-4">
              <Link
                to="/projects"
                className="premium-link premium-link-secondary"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="text-sm">Back to Projects</span>
              </Link>
              <samp className="border border-border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                {project.year}
              </samp>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                  {project.category}
                </samp>
                <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-2xl font-mono text-sm leading-7 text-muted">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
                <Link
                  to={project.url}
                  target="_blank"
                  className="premium-link premium-link-primary"
                  rel="noreferrer"
                >
                  View live site
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </div>
        </header>

        <div className="mt-12 aspect-video w-full overflow-hidden border border-border bg-surface-muted">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1 lg:sticky top-24 h-fit">
            <nav className="soft-panel space-y-2 p-3">
              <a
                href="#brief"
                className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                Brief
              </a>
              <a
                href="#responsibility"
                className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                Responsibility
              </a>
              <a
                href="#result"
                className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                Result
              </a>
            </nav>
          </aside>

          <div className="space-y-6 lg:col-span-3">
            <section id="brief" className="soft-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl font-black uppercase text-foreground">
                Brief
              </h2>
              <p className="mt-4 font-mono text-xs leading-7 text-muted">
                {project.brief}
              </p>
            </section>

            <section id="responsibility" className="soft-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl font-black uppercase text-foreground">
                Responsibility
              </h2>
              <ul className="mt-5 grid gap-3 text-base leading-7 text-muted">
                {responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="border border-border bg-surface p-4 font-mono text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="result" className="soft-panel p-6 sm:p-8">
              <h2 className="font-display text-2xl font-black uppercase text-foreground">
                Result
              </h2>
              <p className="mt-4 font-mono text-xs leading-7 text-muted">
                {project.result}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
