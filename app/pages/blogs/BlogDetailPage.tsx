import { PageLayout } from "@/components/templates/PageLayout";
import { BlogDetail } from "@/features/blogs/components";
import { getBlog } from "@/features/blogs/api/blogs.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/BlogDetailPage";

export const meta = ({ loaderData }: Route.MetaArgs) =>
  pageMeta({
    title: loaderData?.blog.title ?? "Blog",
    description: loaderData?.blog.summary,
    image: loaderData?.ogImage,
    type: "article",
  });

export async function loader({ params, url }: Route.LoaderArgs) {
  const blog = await getBlog(params.blogId);
  // og:image must be absolute; ImageKit URLs already are, local /images paths are not
  const ogImage = blog.thumbnail ? new URL(blog.thumbnail, url).href : undefined;
  return { blog, ogImage };
}

export default function BlogDetailPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout>
      <BlogDetail blog={loaderData.blog} />
    </PageLayout>
  );
}
