import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";
import type { FC } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  href: string;
  techStack: string;
  highlight?: string;
}

// techStack is stored as a JSON array string; fall back to stripping brackets for malformed values
const parseTechStack = (raw: string) => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // not JSON, handled below
  }
  return raw.replace(/[[\]"]/g, "").split(",");
};

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  category,
  year,
  imageUrl,
  href,
  techStack,
  highlight,
}) => {
  const technologies = parseTechStack(techStack)
    .map((technology) => technology.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link to={href} className="group block">
      <article className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-solid)] shadow-[0_30px_80px_-40px_rgba(17,24,39,0.45)] lg:rounded-[2.5rem]">
        <div className="overflow-hidden bg-[var(--surface-muted)]">
          <img
            src={imageUrl}
            alt="" // title and category are already in the link text
            className="h-[30svh] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-[40svh]"
            loading="lazy"
          />
        </div>

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] md:items-end">
          <div className="min-w-0">
            <div className="flex items-center gap-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              <span>{category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{year}</span>
            </div>
            <h3 className="mt-3 text-balance font-display text-3xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-[var(--text)] sm:text-4xl lg:text-5xl">
              {title}
            </h3>
            <p className="mt-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
              {technologies.join(" / ")}
            </p>
          </div>

          <div className="flex items-end justify-between gap-5 md:border-l md:border-[var(--line)] md:pl-6">
            {highlight && (
              <div>
                <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                  Outcome
                </p>
                <p className="mt-2 text-balance font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-[var(--text)] sm:text-2xl">
                  {highlight}
                </p>
              </div>
            )}
            <span
              aria-hidden="true"
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-ink"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
