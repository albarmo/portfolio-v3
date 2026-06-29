import { useLoaderData } from "@remix-run/react";
import { PageLayout } from "~/components/layout/PageLayout";
import BlogCard from "~/components/ui/card/BlogCard";
import { getBlogs } from "~/services/blog.server";
import type { BlogPost } from "~/services/blog.server";

export const loader = async () => {
  const blogs = await getBlogs({ limit: 10, page: 1 });
  return { blogs: blogs };
};

const BlogsPage = () => {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <PageLayout>
      <section className="section-pad pt-32 sm:pt-40">
        <div className="section-shell">
          <div className="max-w-3xl">
            <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              [ WRITING / LOG.SYS ]
            </samp>
            <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
              WRITING ABOUT FRONTEND CRAFT.
            </h1>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--line)] border border-[var(--line)] md:grid-cols-3">
            {blogs?.data?.map((blog: BlogPost) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogsPage;
