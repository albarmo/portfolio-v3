import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { BlogPost } from "@/features/blogs/types";

interface BlogDetailProps {
  blog: BlogPost;
}

export function BlogDetail({ blog }: BlogDetailProps) {

  return (
    <div className="bg-background text-foreground">
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
              <samp className="w-fit border border-border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                {blog.date}
              </samp>
            </div>

            <div>
                <h1 className="font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
                  {blog.title}
                </h1>
                <p className="mt-6 max-w-3xl font-mono text-sm leading-7 text-muted">
                  {blog.summary}
                </p>
              </div>
          </div>
        </header>

        <div className="mt-12 aspect-video w-full overflow-hidden border border-border bg-surface-muted">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 border border-border bg-surface p-6 sm:p-8">
          <p className="whitespace-pre-line font-mono text-sm leading-8 text-muted">
            {blog.content}
          </p>
        </div>
      </article>
    </div>
  );
}
