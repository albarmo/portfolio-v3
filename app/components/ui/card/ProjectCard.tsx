import type { FC } from "react";
import { Link } from "@remix-run/react";
import { ArrowUpRightIcon } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  backgroundColor: string;
  href: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  category,
  year,
  imageUrl,
  href,
}) => {
  return (
    <Link to={href} className="group block bg-[var(--bg)]">
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-muted)]">
          <img
            src={imageUrl}
            alt={`Showcase of ${title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex items-start justify-between gap-4 border-t border-[var(--line)] p-5">
          <div className="min-w-0">
            <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              {year}
            </samp>
            <h3 className="mt-2 font-display text-xl font-black uppercase text-[var(--text)]">
              {title}
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">
              {category}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
