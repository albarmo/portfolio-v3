import { AdminTable } from "@/components/organisms/AdminTable";
import type { BlogPost } from "@/features/blogs/types";

interface BlogTableProps {
  blogs: BlogPost[];
}

export function BlogTable({ blogs }: BlogTableProps) {
  return (
    <AdminTable
      headers={["TITLE", "AUTHOR", "DATE"]}
      emptyLabel="NO BLOG POSTS FOUND"
      deleteConfirmMessage="Delete this blog post?"
      rows={blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        subtitle: blog.slug,
        details: [blog.author, blog.date],
        editHref: `/admin/blogs/${blog.id}/edit`,
      }))}
    />
  );
}
