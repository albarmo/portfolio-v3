import { PageLayout } from "@/components/templates/PageLayout";
import { ProjectDetail } from "@/features/projects/components";
import { getProject } from "@/features/projects/api/projects.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/ProjectDetailPage";

export const meta = ({ loaderData }: Route.MetaArgs) =>
  pageMeta({
    title: loaderData?.project.title ?? "Project",
    description: loaderData?.project.description,
    image: loaderData?.ogImage,
    type: "article",
  });

export async function loader({ params, url }: Route.LoaderArgs) {
  const project = await getProject(params.projectId);
  // og:image must be absolute; ImageKit URLs already are, local /images paths are not
  const ogImage = project.thumbnail ? new URL(project.thumbnail, url).href : undefined;
  return { project, ogImage };
}

export default function ProjectDetailPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout>
      <ProjectDetail project={loaderData.project} />
    </PageLayout>
  );
}
