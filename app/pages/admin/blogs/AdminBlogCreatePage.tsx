import { redirect } from "react-router";
import { parseFormData } from "@remix-run/form-data-parser";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { BlogForm } from "@/features/blogs/components";
import { createBlog, readBlogForm } from "@/features/blogs/api/blogs.server";
import type { Route } from "./+types/AdminBlogCreatePage";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const result = await readBlogForm(await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES }));
  if (result.error !== undefined) return { error: result.error };
  await createBlog(result.payload);
  return redirect("/admin/blogs");
}

export default function AdminBlogCreatePage({ actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / BLOGS / NEW" title="NEW BLOG POST" />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <BlogForm />
    </AdminPageLayout>
  );
}
