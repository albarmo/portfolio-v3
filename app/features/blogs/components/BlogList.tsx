import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { Squiggle } from "@/components/atoms/Squiggle";
import type { BlogPost } from "@/features/blogs/types";

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface BlogListProps {
  blogs: BlogPost[];
}

export function BlogList({ blogs: blogList }: BlogListProps) {

  return (
    <section className="section-pad pt-32 sm:pt-40">
      <div className="section-shell">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-border pb-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                [ WRITING / LOG.SYS ]
              </samp>
              <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
                WRITING ABOUT FRONTEND CRAFT.
              </h1>
              <Squiggle />
              <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-muted">
                Notes on architecture, tooling, and the decisions behind
                building fast and maintainable frontend systems.
              </p>
            </div>

            {/* Article count */}
            <div className="shrink-0 border border-border p-4 text-right">
              <samp className="block font-mono text-3xl font-black text-foreground">
                {blogList.length.toString().padStart(2, "0")}
              </samp>
              <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted">
                ARTICLES
              </samp>
            </div>
          </div>
        </motion.div>

        {/* ── Blog list ───────────────────────────────────────── */}
        <div>
          {blogList.map((blog, index) => (
            <motion.div
              key={blog.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="show"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="group relative flex items-center gap-5 border-b border-border py-6 pl-4 transition-colors hover:bg-surface-muted/30 lg:gap-8 lg:py-8"
              >
                {/* Left accent bar */}
                <span className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

                {/* Index */}
                <samp className="hidden shrink-0 font-mono text-xs font-bold text-muted sm:block">
                  {(index + 1).toString().padStart(2, "0")}
                </samp>

                {/* Thumbnail */}
                <div className="relative hidden aspect-[4/3] w-24 shrink-0 overflow-hidden border border-border sm:block lg:w-32">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>

                {/* Main info */}
                <div className="min-w-0 flex-1">
                  <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted">
                    {blog.date}
                  </samp>
                  <h2 className="mt-1.5 font-display text-2xl font-black uppercase leading-tight text-foreground transition-colors duration-200 group-hover:text-accent lg:text-[1.75rem]">
                    {blog.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-xl font-mono text-xs leading-5 text-muted">
                    {blog.summary}
                  </p>
                  <samp className="mt-3 block font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted transition-colors duration-200 group-hover:text-accent">
                    READ.ARTICLE &gt;&gt;&gt;
                  </samp>
                </div>

                {/* Author */}
                <div className="hidden shrink-0 flex-col items-end gap-1.5 lg:flex">
                  <samp className="font-mono text-[0.58rem] font-bold uppercase tracking-widest text-muted">
                    AUTHOR
                  </samp>
                  <samp className="text-right font-mono text-xs font-black text-foreground">
                    {blog.author}
                  </samp>
                </div>

                {/* Arrow */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted transition-all duration-200 group-hover:border-accent group-hover:text-accent">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
