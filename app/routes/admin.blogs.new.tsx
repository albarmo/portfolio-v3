import { parseFormData } from "@remix-run/form-data-parser";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { redirect, Form, useActionData, useNavigation } from "react-router";
import { ThumbnailUpload } from "@/components/molecules/ThumbnailUpload";
import { uploadToImageKit } from "@/services/imagekit.server";
import { getDb } from "@/services/db.server";
import type { Route } from "./+types/admin.blogs.new";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function action({ request }: Route.ActionArgs) {
  const form = await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES });

  const title = (form.get("title") as string)?.trim();
  const summary = (form.get("summary") as string)?.trim();
  const author = (form.get("author") as string)?.trim() || "Albar Moerhamsa";
  const date = (form.get("date") as string)?.trim();
  const slug = slugify((form.get("slug") as string) || title);
  const content = (form.get("content") as string)?.trim();

  // Resolve thumbnail: file upload takes priority over manual URL
  let thumbnail = (form.get("thumbnail") as string)?.trim() ?? "";
  const file = form.get("thumbnailFile") as File | null;
  if (file && file.size > 0) {
    thumbnail = await uploadToImageKit(file, "/portfolio/blogs");
  }

  if (!title || !summary || !date || !content) {
    return { error: "Title, summary, date, and content are required." };
  }

  const db = await getDb();

  // Check slug uniqueness
  const existing = await db.collection("blogs").findOne({ slug });
  if (existing) {
    return {
      error: `Slug "${slug}" already exists. Change the title or slug.`,
    };
  }

  const id = String(Date.now());
  await db.collection("blogs").insertOne({
    id,
    title,
    summary,
    author,
    date,
    slug,
    thumbnail: thumbnail || "",
    content,
  });

  return redirect("/admin/blogs");
}

export default function NewBlog() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / BLOGS / NEW
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
          NEW BLOG POST
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
        <BlogFormFields />
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
            {isSubmitting ? "SAVING..." : "PUBLISH POST >>>"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export function BlogFormFields({
  defaults,
}: {
  defaults?: Record<string, string>;
}) {
  const textFields = [
    {
      name: "title",
      label: "TITLE",
      type: "text",
      placeholder: "Post title",
      required: true,
    },
    {
      name: "summary",
      label: "SUMMARY",
      type: "textarea",
      placeholder: "Short summary (1-2 sentences)",
      required: true,
      rows: 3,
    },
    {
      name: "author",
      label: "AUTHOR",
      type: "text",
      placeholder: "Albar Moerhamsa",
      required: false,
    },
    {
      name: "date",
      label: "DATE",
      type: "text",
      placeholder: "e.g. August 5, 2025",
      required: true,
    },
    {
      name: "slug",
      label: "SLUG (auto-generated if empty)",
      type: "text",
      placeholder: "url-friendly-slug",
      required: false,
    },
    {
      name: "content",
      label: "CONTENT",
      type: "textarea",
      placeholder: "Full article content...",
      required: true,
      rows: 14,
    },
  ];

  return (
    <>
      {textFields.map((field) => (
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
      {/* Thumbnail upload — placed between slug and content */}
      <ThumbnailUpload currentUrl={defaults?.thumbnail} />
    </>
  );
}
