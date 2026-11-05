import type { FormFieldConfig } from "@/components/molecules/FormField";
import { ThumbnailUpload } from "@/components/molecules/ThumbnailUpload";
import { AdminForm } from "@/components/organisms/AdminForm";
import type { BlogPost } from "@/features/blogs/types";

const BLOG_FIELDS: FormFieldConfig[] = [
  { name: "title", label: "TITLE", placeholder: "Post title", required: true },
  { name: "summary", label: "SUMMARY", type: "textarea", placeholder: "Short summary (1-2 sentences)", required: true, rows: 3 },
  { name: "author", label: "AUTHOR", placeholder: "Albar Moerhamsa" },
  { name: "date", label: "DATE", placeholder: "e.g. August 5, 2025", required: true },
  { name: "slug", label: "SLUG (auto-generated if empty)", placeholder: "url-friendly-slug" },
  { name: "content", label: "CONTENT", type: "textarea", placeholder: "Full article content...", required: true, rows: 14 },
];

interface BlogFormProps {
  /** Omit to create a new post */
  blog?: BlogPost | undefined;
}

export function BlogForm({ blog }: BlogFormProps) {
  return (
    <AdminForm
      fields={BLOG_FIELDS}
      defaultValues={blog ? { ...blog } : undefined}
      cancelHref="/admin/blogs"
      submitLabel={blog ? "SAVE CHANGES >>>" : "PUBLISH POST >>>"}
      hasFileUpload
    >
      <ThumbnailUpload currentUrl={blog?.thumbnail} />
    </AdminForm>
  );
}
