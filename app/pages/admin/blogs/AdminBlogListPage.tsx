import { redirect } from "react-router";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { BlogTable } from "@/features/blogs/components";
import { deleteBlog, getAllBlogs } from "@/features/blogs/api/blogs.server";
import { getFormString } from "@/utils/formData";
import type { Route } from "./+types/AdminBlogListPage";

export async function loader() {
  return { blogs: await getAllBlogs() };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const id = getFormString(form, "id");
  if (getFormString(form, "intent") === "delete" && id) {
    await deleteBlog(id);
  }
  return redirect("/admin/blogs");
}

export default function AdminBlogListPage({ loaderData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader
        breadcrumb="CMS / BLOGS"
        title="BLOG POSTS"
        createLink={{ href: "/admin/blogs/new", label: "NEW POST" }}
      />
      <BlogTable blogs={loaderData.blogs} />
    </AdminPageLayout>
  );
}
