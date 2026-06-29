import type { FC } from "react";
import { Link } from "@remix-run/react";
import type { BlogPost } from "~/services/blog.server";

const BlogCard: FC<BlogPost> = (blog) => {
  return (
    <Link to={`/blogs/${blog?.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden bg-[var(--bg)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
          <div className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
          <img
            src={blog?.thumbnail}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-[var(--line)] p-5">
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            {blog?.date}
          </samp>
          <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight text-[var(--text)]">
            {blog?.title}
          </h3>
          <p className="mt-3 line-clamp-3 font-mono text-xs leading-5 text-[var(--muted)]">
            {blog?.summary}
          </p>
          <samp className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
            {"READ.ARTICLE >>>"}
          </samp>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
