import { redirect } from "react-router";
import { parseFormData } from "@remix-run/form-data-parser";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { ProjectForm } from "@/features/projects/components";
import { getProject, readProjectForm, updateProject } from "@/features/projects/api/projects.server";
import type { Route } from "./+types/AdminProjectEditPage";

export async function loader({ params }: Route.LoaderArgs) {
  return { project: await getProject(params.id) };
}

export async function action({ request, params }: Route.ActionArgs) {
  const result = await readProjectForm(await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES }));
  if (result.error !== undefined) return { error: result.error };
  await updateProject(params.id, result.payload);
  return redirect("/admin/projects");
}

export default function AdminProjectEditPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / PROJECTS / EDIT" title={loaderData.project.title} />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <ProjectForm project={loaderData.project} />
    </AdminPageLayout>
  );
}
