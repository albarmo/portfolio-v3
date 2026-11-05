import {
  redirect,
  Form,
  Link,
  useLoaderData,
  useNavigation,
} from "react-router";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { getDb } from "@/services/db.server";
import type { Project } from "@/services/project.server";
import type { Route } from "./+types/admin.projects._index";

export async function loader() {
  const db = await getDb();
  const projects = await db
    .collection<Project>("projects")
    .find({}, { projection: { _id: 0 } })
    .sort({ year: -1 })
    .toArray();
  return { projects };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");
  const id = form.get("id") as string;

  if (intent === "delete") {
    const db = await getDb();
    await db.collection("projects").deleteOne({ id });
  }

  return redirect("/admin/projects");
}

export default function AdminProjectsIndex() {
  const { projects } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isDeleting = navigation.state !== "idle";

  return (
    <div className="p-20">
      <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-6">
        <div>
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            CMS / PROJECTS
          </samp>
          <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
            PROJECTS
          </h1>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          NEW PROJECT
        </Link>
      </div>

      <div className="border border-[var(--line)]">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)]">
          {["TITLE", "CATEGORY", "YEAR", "ACTIONS"].map((h) => (
            <div
              key={h}
              className="bg-[var(--surface)] px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
            >
              {h}
            </div>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="px-4 py-12 text-center font-mono text-xs text-[var(--muted)]">
            NO PROJECTS FOUND
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)] last:border-b-0"
            >
              <div className="bg-[var(--bg)] px-4 py-3">
                <p className="font-mono text-xs font-bold text-[var(--text)] line-clamp-1">
                  {project.title}
                </p>
                <samp className="font-mono text-[0.6rem] text-[var(--muted)]">
                  {project.id}
                </samp>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)]">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center gap-0 bg-[var(--bg)] px-2 py-3">
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </Link>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    disabled={isDeleting}
                    onClick={(e) => {
                      if (!confirm("Delete this project?")) e.preventDefault();
                    }}
                    className="flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
