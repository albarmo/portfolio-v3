import { Link } from "react-router";
import { FileTextIcon, FolderIcon, PlusIcon, StarIcon } from "lucide-react";
import type { DashboardCounts } from "@/features/admin/types";

const QUICK_ACTIONS = [
  { to: "/admin/blogs/new", label: "NEW BLOG POST", icon: FileTextIcon },
  { to: "/admin/projects/new", label: "NEW PROJECT", icon: FolderIcon },
  { to: "/admin/reviews/new", label: "NEW REVIEW", icon: StarIcon },
];

interface DashboardOverviewProps {
  counts: DashboardCounts;
}

export function DashboardOverview({ counts }: DashboardOverviewProps) {
  const { blogCount, projectCount, reviewCount } = counts;

  const stats = [
    {
      label: "BLOG POSTS",
      value: blogCount,
      to: "/admin/blogs",
      icon: FileTextIcon,
    },
    {
      label: "PROJECTS",
      value: projectCount,
      to: "/admin/projects",
      icon: FolderIcon,
    },
    {
      label: "REVIEWS",
      value: reviewCount,
      to: "/admin/reviews",
      icon: StarIcon,
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid gap-px bg-[var(--line)] border border-[var(--line)] grid-cols-3 mb-8">
        {stats.map(({ label, value, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col gap-3 bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)]"
          >
            <div className="flex items-center justify-between">
              <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                {label}
              </samp>
              <Icon className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" aria-hidden="true" />
            </div>
            <span className="font-display text-4xl font-black text-[var(--text)]">
              {value}
            </span>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-2">
        <samp className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          QUICK ACTIONS
        </samp>
      </div>
      <div className="grid gap-px bg-[var(--line)] border border-[var(--line)] grid-cols-3">
        {QUICK_ACTIONS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 bg-[var(--bg)] p-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--accent)]"
          >
            <PlusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
