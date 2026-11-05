import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/services/blog.server";

export default function Blogs({ data = [] }: { data?: BlogPost[] }) {
  const articles = data.slice(0, 3);
  const [featured, ...more] = articles;

  return (
    <section id="notes" className="section-pad paper-section scroll-mt-20">
      <div className="section-shell">
        <h2 className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
          Thoughts, ideas, and things I&apos;ve learned.
        </h2>

        {featured ? (
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Link
              to={`/blogs/${featured.id}`}
              className="group lg:col-span-7"
            >
              <article>
                <div className="overflow-hidden rounded-[2rem] bg-white lg:rounded-[2.5rem]">
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                  {featured.date}
                </p>
                <h3 className="mt-3 max-w-[18ch] font-display text-4xl font-black uppercase leading-[0.92] sm:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-[58ch] text-sm leading-6 text-[var(--muted)]">
                  {featured.summary.replace(/[—–]/g, "-")}
                </p>
              </article>
            </Link>

            <div className="lg:col-span-5 lg:border-l lg:border-[var(--line)] lg:pl-8">
              {more.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/blogs/${article.id}`}
                  className={`group grid grid-cols-[7rem_1fr] gap-5 py-6 ${
                    index > 0 ? "border-t border-[var(--line)]" : "pt-0"
                  }`}
                >
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="aspect-square w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                      {article.date}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-black uppercase leading-[0.94] transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <ArrowUpRight className="mt-4 h-5 w-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-10 text-[var(--muted)]">
            Articles are currently unavailable. Please try again later.
          </p>
        )}

        <Link to="/blogs" className="premium-link premium-link-secondary mt-12">
          Explore all notes <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
