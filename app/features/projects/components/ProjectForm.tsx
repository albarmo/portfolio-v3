import type { FormFieldConfig } from "@/components/molecules/FormField";
import { ThumbnailUpload } from "@/components/molecules/ThumbnailUpload";
import { AdminForm } from "@/components/organisms/AdminForm";
import type { Project } from "@/features/projects/types";

const PROJECT_FIELDS: FormFieldConfig[] = [
  { name: "title", label: "TITLE", placeholder: "Project title", required: true },
  { name: "category", label: "CATEGORY", placeholder: "e.g. Development Frontend", required: true },
  { name: "year", label: "YEAR", placeholder: "e.g. 2025", required: true },
  { name: "description", label: "SHORT DESCRIPTION", placeholder: "One-line description" },
  { name: "brief", label: "BRIEF", type: "textarea", placeholder: "Full project brief...", rows: 4 },
  { name: "result", label: "RESULT", type: "textarea", placeholder: "Project outcomes...", rows: 3 },
  { name: "techStack", label: "TECH STACK (comma separated)", placeholder: "React, TypeScript, TailwindCSS" },
  {
    name: "responsibility",
    label: "RESPONSIBILITIES (one per line)",
    type: "textarea",
    placeholder: "Built the dashboard\nIntegrated APIs",
    rows: 5,
  },
  { name: "url", label: "LIVE URL", placeholder: "https://..." },
  { name: "repoUrl", label: "REPO URL", placeholder: "https://github.com/..." },
  { name: "gifUrl", label: "GIF URL", placeholder: "https://..." },
];

function toDefaultValues(project: Project): Record<string, string> {
  return {
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    brief: project.brief,
    result: project.result,
    url: project.url,
    repoUrl: project.repoUrl,
    gifUrl: project.gifUrl,
    techStack: project.techStack.join(", "),
    responsibility: project.responsibilities.join("\n"),
  };
}

interface ProjectFormProps {
  /** Omit to create a new project */
  project?: Project | undefined;
}

export function ProjectForm({ project }: ProjectFormProps) {
  return (
    <AdminForm
      fields={PROJECT_FIELDS}
      defaultValues={project ? toDefaultValues(project) : undefined}
      cancelHref="/admin/projects"
      submitLabel={project ? "SAVE CHANGES >>>" : "CREATE PROJECT >>>"}
      hasFileUpload
    >
      <ThumbnailUpload currentUrl={project?.thumbnail} />
    </AdminForm>
  );
}
