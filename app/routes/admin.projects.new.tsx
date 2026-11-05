import { parseFormData } from "@remix-run/form-data-parser";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { redirect, Form, useActionData, useNavigation } from "react-router";
import { getDb } from "@/services/db.server";
import { uploadToImageKit } from "@/services/imagekit.server";
import { ThumbnailUpload } from "@/components/molecules/ThumbnailUpload";
import type { Route } from "./+types/admin.projects.new";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES });

  const title = (form.get("title") as string)?.trim();
  const category = (form.get("category") as string)?.trim();
  const year = (form.get("year") as string)?.trim();
  const description = (form.get("description") as string)?.trim();
  const brief = (form.get("brief") as string)?.trim();
  const result = (form.get("result") as string)?.trim();
  const repoUrl = (form.get("repoUrl") as string)?.trim() || "";
  const url = (form.get("url") as string)?.trim() || "";
  const gifUrl = (form.get("gifUrl") as string)?.trim() || "";

  let thumbnail = (form.get("thumbnail") as string)?.trim() || "";
  const file = form.get("thumbnailFile") as File | null;
  if (file && file.size > 0) {
    thumbnail = await uploadToImageKit(file, "/portfolio/projects");
  }

  const techStackRaw = (form.get("techStack") as string)?.trim();
  const responsibilityRaw = (form.get("responsibility") as string)?.trim();

  if (!title || !category || !year) {
    return { error: "Title, category, and year are required." };
  }

  // Convert comma-separated tech stack to JSON array
  const techStack = JSON.stringify(
    techStackRaw
      ? techStackRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
  );
  // Convert line-separated responsibilities to JSON array
  const responsibility = JSON.stringify(
    responsibilityRaw
      ? responsibilityRaw
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean)
      : [],
  );

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const db = await getDb();
  await db.collection("projects").insertOne({
    id,
    title,
    category,
    year,
    description: description || "",
    brief: brief || "",
    result: result || "",
    thumbnail,
    repoUrl,
    url,
    gifUrl,
    techStack,
    responsibility,
    createdAt: now,
    updatedAt: now,
  });

  return redirect("/admin/projects");
}

export default function NewProject() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / PROJECTS / NEW
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
          NEW PROJECT
        </h1>
      </div>

      {actionData?.error && (
        <div className="mb-6 border border-[var(--accent)] bg-[var(--accent)] px-4 py-3">
          <samp className="font-mono text-xs font-bold text-white">
            ⚠ {actionData.error}
          </samp>
        </div>
      )}

      <Form method="post" encType="multipart/form-data" className="max-w-3xl border border-[var(--line)]">
        <ProjectFormFields />
        <div className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 flex items-center justify-between">
          <a
            href="/admin/projects"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)]"
          >
            ← CANCEL
          </a>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "SAVING..." : "CREATE PROJECT >>>"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export function ProjectFormFields({
  defaults,
}: {
  defaults?: Record<string, string>;
}) {
  const fields = [
    {
      name: "title",
      label: "TITLE",
      type: "text",
      placeholder: "Project title",
      required: true,
    },
    {
      name: "category",
      label: "CATEGORY",
      type: "text",
      placeholder: "e.g. Development Frontend",
      required: true,
    },
    {
      name: "year",
      label: "YEAR",
      type: "text",
      placeholder: "e.g. 2025",
      required: true,
    },
    {
      name: "description",
      label: "SHORT DESCRIPTION",
      type: "text",
      placeholder: "One-line description",
      required: false,
    },
    {
      name: "brief",
      label: "BRIEF",
      type: "textarea",
      placeholder: "Full project brief...",
      required: false,
      rows: 4,
    },
    {
      name: "result",
      label: "RESULT",
      type: "textarea",
      placeholder: "Project outcomes...",
      required: false,
      rows: 3,
    },
    {
      name: "techStack",
      label: "TECH STACK (comma separated)",
      type: "text",
      placeholder: "React, TypeScript, TailwindCSS",
      required: false,
    },
    {
      name: "responsibility",
      label: "RESPONSIBILITIES (one per line)",
      type: "textarea",
      placeholder: "Built the dashboard\nIntegrated APIs",
      required: false,
      rows: 5,
    },
    {
      name: "url",
      label: "LIVE URL",
      type: "text",
      placeholder: "https://...",
      required: false,
    },
    {
      name: "repoUrl",
      label: "REPO URL",
      type: "text",
      placeholder: "https://github.com/...",
      required: false,
    },
    {
      name: "gifUrl",
      label: "GIF URL",
      type: "text",
      placeholder: "https://...",
      required: false,
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="border-b border-[var(--line)]">
          <label
            htmlFor={field.name}
            className="block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
          >
            {field.label}
            {field.required && (
              <span className="ml-1 text-[var(--accent)]">*</span>
            )}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={field.rows}
              placeholder={field.placeholder}
              defaultValue={defaults?.[field.name]}
              className="w-full resize-y bg-[var(--bg)] px-3 py-3 font-mono text-xs leading-6 text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={defaults?.[field.name]}
              className="w-full bg-[var(--bg)] px-3 py-3 font-mono text-xs text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          )}
        </div>
      ))}
      <ThumbnailUpload currentUrl={defaults?.thumbnail} />
    </>
  );
}
