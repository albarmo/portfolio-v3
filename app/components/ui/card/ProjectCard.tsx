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
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  category,
  year,
  imageUrl,
  href,
  techStack,
  index,
}) => {
  const technologies = techStack
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll('"', "")
    .split(",")
    .slice(0, 3);

  return (
    <Link
      to={href}
      className="group block rounded-[2rem] transition-transform duration-300 active:scale-[0.99]"
    >
      <article>
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-muted)] lg:rounded-[2.5rem]">
          <img
            src={imageUrl}
            alt={`Product interface for ${title}`}
            className={`w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] ${
              index % 2 === 1 ? "aspect-[4/3]" : "aspect-[16/11]"
            }`}
            loading="lazy"
          />
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              <span>{category}</span>
              <span className="shrink-0 tabular-nums">{year}</span>
            </div>
            <h3 className="mt-3 text-balance font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-[var(--text)] sm:text-5xl">
              {title}
            </h3>
            <p className="mt-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
              {technologies.map((technology) => technology.trim()).join(" / ")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors group-hover:border-[#0099FF] group-hover:bg-[#0099FF] group-hover:text-[#111827]"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
