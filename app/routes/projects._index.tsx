import { useLoaderData } from "@remix-run/react";
import { PageLayout } from "~/components/layout/PageLayout";
import { getProjects } from "~/services/project.server";
import type { Project } from "~/services/project.server";
import ProjectCard from "~/components/ui/card/ProjectCard";

export const loader = async () => {
  const projects = await getProjects({ page: 1, limit: 10 });
  return { projects: projects };
};

const ProjectsPage = () => {
  const { projects } = useLoaderData<typeof loader>();
  const projectList = projects.data ?? []

  return (
    <PageLayout>
      <section className="section-pad pt-32 sm:pt-40">
        <div className="section-shell">
          <div className="max-w-3xl">
            <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              [ PORTFOLIO / PROJ.SYS ]
            </samp>
            <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
              SELECTED WORK ACROSS PRODUCT TEAMS.
            </h1>
            <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-[var(--muted)]">
              Here&apos;s a curated selection showcasing my expertise and the
              achieved results.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--line)] border border-[var(--line)] lg:grid-cols-2">
            {projectList?.map((project: Project, index: number) => (
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
    </PageLayout>
  );
};

export default ProjectsPage;
