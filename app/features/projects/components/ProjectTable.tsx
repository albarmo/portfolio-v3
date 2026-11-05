import { AdminTable } from "@/components/organisms/AdminTable";
import type { Project } from "@/features/projects/types";

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <AdminTable
      headers={["TITLE", "CATEGORY", "YEAR"]}
      emptyLabel="NO PROJECTS FOUND"
      deleteConfirmMessage="Delete this project?"
      rows={projects.map((project) => ({
        id: project.id,
        title: project.title,
        subtitle: project.id,
        details: [project.category, project.year],
        editHref: `/admin/projects/${project.id}/edit`,
      }))}
    />
  );
}
