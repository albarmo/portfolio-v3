import { redirect } from "react-router";
import { parseFormData } from "@remix-run/form-data-parser";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { ProjectForm } from "@/features/projects/components";
import { createProject, readProjectForm } from "@/features/projects/api/projects.server";
import type { Route } from "./+types/AdminProjectCreatePage";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const result = await readProjectForm(await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES }));
  if (result.error !== undefined) return { error: result.error };
  await createProject(result.payload);
  return redirect("/admin/projects");
}

export default function AdminProjectCreatePage({ actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / PROJECTS / NEW" title="NEW PROJECT" />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <ProjectForm />
    </AdminPageLayout>
  );
}
