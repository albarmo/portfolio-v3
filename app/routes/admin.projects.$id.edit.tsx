import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { getDb } from "~/lib/mongodb.server";
import { uploadToImageKit } from "~/lib/imagekit.server";
import { requireAdmin } from "~/lib/session.server";
import type { Project } from "~/services/project.server";
import { ProjectFormFields } from "./admin.projects.new";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdmin(request);
  invariant(params.id, "Missing project id");
  const db = await getDb();
  const project = await db
    .collection<Project>("projects")
    .findOne({ id: params.id }, { projection: { _id: 0 } });
  if (!project) throw new Response("Not Found", { status: 404 });
  return { project };
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireAdmin(request);
  invariant(params.id, "Missing project id");

  const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: 5_000_000 });
  const form = await unstable_parseMultipartFormData(request, uploadHandler);

  const title = (form.get("title") as string)?.trim();
  const category = (form.get("category") as string)?.trim();
  const year = (form.get("year") as string)?.trim();

  if (!title || !category || !year) {
    return { error: "Title, category, and year are required." };
  }

  let thumbnail = (form.get("thumbnail") as string)?.trim() || "";
  const file = form.get("thumbnailFile") as File | null;
  if (file && file.size > 0) {
    thumbnail = await uploadToImageKit(file, "/portfolio/projects");
  }

  const techStackRaw = (form.get("techStack") as string)?.trim();
  const responsibilityRaw = (form.get("responsibility") as string)?.trim();

  const techStack = JSON.stringify(
    techStackRaw
      ? techStackRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
  );
  const responsibility = JSON.stringify(
    responsibilityRaw
      ? responsibilityRaw
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean)
      : [],
  );

  const db = await getDb();
  await db.collection("projects").updateOne(
    { id: params.id },
    {
      $set: {
        title,
        category,
        year,
        description: (form.get("description") as string)?.trim() || "",
        brief: (form.get("brief") as string)?.trim() || "",
        result: (form.get("result") as string)?.trim() || "",
        thumbnail,
        url: (form.get("url") as string)?.trim() || "",
        repoUrl: (form.get("repoUrl") as string)?.trim() || "",
        gifUrl: (form.get("gifUrl") as string)?.trim() || "",
        techStack,
        responsibility,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  return redirect("/admin/projects");
}

// Deserialize stored JSON arrays back to editable string format
function parseArray(jsonStr: string): string {
  try {
    const arr = JSON.parse(jsonStr);
    return Array.isArray(arr) ? arr.join("\n") : jsonStr;
  } catch {
    return jsonStr;
  }
}

function parseTechStack(jsonStr: string): string {
  try {
    const arr = JSON.parse(jsonStr);
    return Array.isArray(arr) ? arr.join(", ") : jsonStr;
  } catch {
    return jsonStr;
  }
}

export default function EditProject() {
  const { project } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const defaults: Record<string, string> = {
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    brief: project.brief,
    result: project.result,
    thumbnail: project.thumbnail,
    url: project.url,
    repoUrl: project.repoUrl,
    gifUrl: project.gifUrl,
    techStack: parseTechStack(project.techStack),
    responsibility: parseArray(project.responsibility),
  };

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / PROJECTS / EDIT
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)] line-clamp-1">
          {project.title}
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
        <ProjectFormFields defaults={defaults} />
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
            {isSubmitting ? "SAVING..." : "SAVE CHANGES >>>"}
          </button>
        </div>
      </Form>
    </div>
  );
}
