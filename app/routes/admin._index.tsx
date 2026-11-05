import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { FileTextIcon, FolderIcon, PlusIcon, StarIcon } from "lucide-react";
import { getDb } from "~/lib/mongodb.server";
import { requireAdmin } from "~/lib/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const db = await getDb();

  const [blogCount, projectCount, reviewCount] = await Promise.all([
    db.collection("blogs").countDocuments(),
    db.collection("projects").countDocuments(),
    db.collection("reviews").countDocuments(),
  ]);

  return { blogCount, projectCount, reviewCount };
}

const quickActions = [
  { to: "/admin/blogs/new", label: "NEW BLOG POST", icon: FileTextIcon },
  { to: "/admin/projects/new", label: "NEW PROJECT", icon: FolderIcon },
  { to: "/admin/reviews/new", label: "NEW REVIEW", icon: StarIcon },
];

export default function AdminDashboard() {
  const { blogCount, projectCount, reviewCount } =
    useLoaderData<typeof loader>();

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
    <div className="p-20">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / DASHBOARD
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
          OVERVIEW
        </h1>
      </div>

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
              <Icon className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
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
        {quickActions.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 bg-[var(--bg)] p-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--accent)]"
          >
            <PlusIcon className="h-3.5 w-3.5 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
