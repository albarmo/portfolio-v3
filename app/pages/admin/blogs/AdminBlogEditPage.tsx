import { redirect } from "react-router";
import { parseFormData } from "@remix-run/form-data-parser";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { MAX_UPLOAD_BYTES } from "@/constants/upload";
import { BlogForm } from "@/features/blogs/components";
import { getBlog, readBlogForm, updateBlog } from "@/features/blogs/api/blogs.server";
import type { Route } from "./+types/AdminBlogEditPage";

export async function loader({ params }: Route.LoaderArgs) {
  return { blog: await getBlog(params.id) };
}

export async function action({ request, params }: Route.ActionArgs) {
  const form = await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES });
  const result = await readBlogForm(form, params.id);
  if (result.error !== undefined) return { error: result.error };
  await updateBlog(params.id, result.payload);
  return redirect("/admin/blogs");
}

export default function AdminBlogEditPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / BLOGS / EDIT" title={loaderData.blog.title} />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <BlogForm blog={loaderData.blog} />
    </AdminPageLayout>
  );
}
