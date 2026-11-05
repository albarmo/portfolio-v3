import { parseFormData } from "@remix-run/form-data-parser";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import {
  redirect,
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { getDb } from "@/services/db.server";
import { uploadToImageKit } from "@/services/imagekit.server";
import type { BlogPost } from "@/services/blog.server";
import { BlogFormFields } from "./admin.blogs.new";
import type { Route } from "./+types/admin.blogs.$id.edit";

export async function loader({ params }: Route.LoaderArgs) {
  const db = await getDb();
  const blog = await db
    .collection<BlogPost>("blogs")
    .findOne({ id: params.id }, { projection: { _id: 0 } });
  if (!blog) throw new Response("Not Found", { status: 404 });
  return { blog };
}

export async function action({ request, params }: Route.ActionArgs) {
  const form = await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES });

  const title = (form.get("title") as string)?.trim();
  const summary = (form.get("summary") as string)?.trim();
  const author = (form.get("author") as string)?.trim() || "Albar Moerhamsa";
  const date = (form.get("date") as string)?.trim();
  const slug = (form.get("slug") as string)?.trim();
  const content = (form.get("content") as string)?.trim();

  let thumbnail = (form.get("thumbnail") as string)?.trim() ?? "";
  const file = form.get("thumbnailFile") as File | null;
  if (file && file.size > 0) {
    thumbnail = await uploadToImageKit(file, "/portfolio/blogs");
  }

  if (!title || !summary || !date || !content) {
    return { error: "Title, summary, date, and content are required." };
  }

  const db = await getDb();
  await db
    .collection("blogs")
    .updateOne(
      { id: params.id },
      { $set: { title, summary, author, date, slug, thumbnail, content } },
    );

  return redirect("/admin/blogs");
}

export default function EditBlog() {
  const { blog } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const defaults: Record<string, string> = {
    title: blog.title,
    summary: blog.summary,
    author: blog.author,
    date: blog.date,
    slug: blog.slug,
    thumbnail: blog.thumbnail,
    content: blog.content,
  };

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / BLOGS / EDIT
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)] line-clamp-1">
          {blog.title}
        </h1>
      </div>

      {actionData?.error && (
        <div className="mb-6 border border-[var(--accent)] bg-[var(--accent)] px-4 py-3">
          <samp className="font-mono text-xs font-bold text-white">
            ⚠ {actionData.error}
          </samp>
        </div>
      )}

      <Form
        method="post"
        encType="multipart/form-data"
        className="max-w-3xl space-y-0 border border-[var(--line)]"
      >
        <BlogFormFields defaults={defaults} />
        <div className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 flex items-center justify-between">
          <a
            href="/admin/blogs"
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
