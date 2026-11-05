import { PageLayout } from "@/components/templates/PageLayout";
import { ProjectList } from "@/features/projects/components";
import { getProjects } from "@/features/projects/api/projects.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/ProjectListPage";

export const meta = () => pageMeta({ title: "Projects" });

export async function loader() {
  return { projects: await getProjects() };
}

export default function ProjectListPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout>
      <ProjectList projects={loaderData.projects} />
    </PageLayout>
  );
}
