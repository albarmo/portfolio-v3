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
      <article className="relative isolate flex h-[min(70svh,46rem)] flex-col justify-between overflow-hidden bg-ink text-cloud">
        <img
          src={imageUrl}
          alt="" // title and category are already in the link text
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* scrim keeps the overlaid text readable on any screenshot */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 via-50% to-ink/0 transition-opacity duration-500 group-hover:opacity-95"
        />

        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <span className="rounded-full bg-ink/60 px-3.5 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] backdrop-blur-md">
            {category} <span aria-hidden="true">·</span> <span className="tabular-nums">{year}</span>
          </span>
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cloud text-ink transition-[transform,background-color,color] duration-300 group-hover:bg-accent group-hover:text-cloud motion-safe:group-hover:rotate-45"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <h3 className="text-balance font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {title}
            </h3>
            {technologies.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-cloud/25 px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.06em] text-cloud/85"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {highlight && (
            <div className="max-w-[20ch] border-l-2 border-accent pl-4">
              <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.08em] text-accent">
                Outcome
              </p>
              <p className="mt-1.5 text-balance font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-2xl">
                {highlight}
              </p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
