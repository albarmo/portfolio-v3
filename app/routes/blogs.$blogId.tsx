import { useLoaderData, Link } from "react-router";
import { PageLayout } from "~/components/layout/PageLayout";
import { ArrowLeftIcon } from "lucide-react";
import { getBlog } from "~/services/blog.server";
import { pageMeta } from "~/utils/meta";
import type { Route } from "./+types/blogs.$blogId";

export const meta = ({ loaderData }: Route.MetaArgs) =>
  pageMeta({
    title: loaderData?.blog?.title ?? "Blog",
    description: loaderData?.blog?.summary,
    image: loaderData?.ogImage,
    type: "article",
  });

export const loader = async ({ params, url }: Route.LoaderArgs) => {
  const blog = await getBlog(params.blogId);

  const thumbnail = blog?.data?.thumbnail;
  const ogImage = thumbnail ? new URL(thumbnail, url).href : undefined;

  return { blog: blog?.data, ogImage };
};

export default function BlogDetail() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <div className="bg-[var(--bg)] text-[var(--text)]">
        <article className="mx-auto w-[min(100%-2rem,56rem)] py-32 sm:py-40">
          <header>
            <div>
              <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/blogs"
                  className="premium-link premium-link-secondary w-fit"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span className="text-sm">Back to Blogs</span>
                </Link>
                <samp className="w-fit border border-[var(--line)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  {blog?.date}
                </samp>
              </div>

              <div>
                  <h1 className="font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
                    {blog?.title}
                  </h1>
                  <p className="mt-6 max-w-3xl font-mono text-sm leading-7 text-[var(--muted)]">
                    {blog?.summary}
                  </p>
                </div>
            </div>
          </header>

          <div className="mt-12 aspect-video w-full overflow-hidden border border-[var(--line)] bg-[var(--surface-muted)]">
            <img
              src={blog?.thumbnail}
              alt={blog?.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-10 border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
            <p className="whitespace-pre-line font-mono text-sm leading-8 text-[var(--muted)]">
              {blog?.content}
            </p>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
