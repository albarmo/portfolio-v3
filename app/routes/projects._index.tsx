import { useLoaderData } from "@remix-run/react";
import { PageLayout } from "~/components/layout/PageLayout";
import { BACKUP_PROJECTS, getProjects, Project } from "~/services/project.services";
import ProjectCard from "~/components/ui/card/ProjectCard";
import ShinyText from "~/components/ui/text/ShinyText";

export const loader = async () => {
  const projects = await getProjects({ page: 1, limit: 10 });
  return { projects: projects };
};

const ProjectsPage = () => {
  const { projects } = useLoaderData<typeof loader>();
  const projectList = projects.data?.length ? projects?.data : BACKUP_PROJECTS

  return (
    <PageLayout>
      <section className="dark:text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-left mx-auto space-y-0.5">
            <span className="flex items-center gap-1.5 text-[#BFF163]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFF163] animate-pluse"></span>
              Workspaces
            </span>
            <ShinyText
              text="Portfolio"
              disabled={false}
              speed={3}
              className="text-2xl font-bold tracking-tight sm:text-4xl"
            />
            <p className="text-sm leading-8 text-neutral-400 dark:text-neutral-200">
              Here&apos;s a curated selection showcasing my expertise and the
              achieved results.
            </p>
          </div>

          {/* Grid untuk Kartu Proyek */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
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
