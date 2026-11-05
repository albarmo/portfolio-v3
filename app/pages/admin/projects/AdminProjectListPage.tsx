import { redirect } from "react-router";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { ProjectTable } from "@/features/projects/components";
import { deleteProject, getAllProjects } from "@/features/projects/api/projects.server";
import { getFormString } from "@/utils/formData";
import type { Route } from "./+types/AdminProjectListPage";

export async function loader() {
  return { projects: await getAllProjects() };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const id = getFormString(form, "id");
  if (getFormString(form, "intent") === "delete" && id) {
    await deleteProject(id);
  }
  return redirect("/admin/projects");
}

export default function AdminProjectListPage({ loaderData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader
        breadcrumb="CMS / PROJECTS"
        title="PROJECTS"
        createLink={{ href: "/admin/projects/new", label: "NEW PROJECT" }}
      />
      <ProjectTable projects={loaderData.projects} />
    </AdminPageLayout>
  );
}
