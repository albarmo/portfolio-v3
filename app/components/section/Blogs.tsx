import { Link } from "@remix-run/react";
import BlogCard from "../ui/card/BlogCard";
import type { BlogPost } from "~/services/blog.server";

export default function Blogs({ data }: { data: BlogPost[] }) {
  return (
    <section className="section-pad bg-[var(--surface-muted)]/20">
      <div className="section-shell">
        <div className="border-b border-[var(--line)] pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                [ WRITING / LOG.SYS ]
              </samp>
              <h2 className="mt-4 font-display text-4xl font-black uppercase leading-tight text-[var(--text)] sm:text-5xl">
                NOTES FROM BUILDING FRONTEND SYSTEMS.
              </h2>
            </div>
            <Link
              to="/blogs"
              className="premium-link premium-link-secondary w-fit"
            >
              {">>> SEE ALL"}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--line)] border border-[var(--line)] md:grid-cols-3">
          {data?.slice(0, 3).map((blog: BlogPost, index: number) => (
            <div
              key={blog.id}
              className={`bg-[var(--bg)] ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <BlogCard {...blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
