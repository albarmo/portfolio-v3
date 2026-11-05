import { PageLayout } from "@/components/templates/PageLayout";
import { BlogList } from "@/features/blogs/components";
import { getBlogs } from "@/features/blogs/api/blogs.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/BlogListPage";

export const meta = () => pageMeta({ title: "Blogs" });

export async function loader() {
  return { blogs: await getBlogs() };
}

export default function BlogListPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout>
      <BlogList blogs={loaderData.blogs} />
    </PageLayout>
  );
}
