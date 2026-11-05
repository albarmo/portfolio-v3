import { Link, NavLink } from "react-router";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  FolderIcon,
  StarIcon,
  ImageIcon,
  LogOutIcon,
  ExternalLinkIcon,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "DASHBOARD", icon: LayoutDashboardIcon, end: true },
  { to: "/admin/blogs", label: "BLOGS", icon: FileTextIcon, end: false },
  { to: "/admin/projects", label: "PROJECTS", icon: FolderIcon, end: false },
  { to: "/admin/reviews", label: "REVIEWS", icon: StarIcon, end: false },
  { to: "/admin/media", label: "MEDIA", icon: ImageIcon, end: false },
];

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-border bg-surface">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-accent">
          [ CMS ]
        </span>
        <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-foreground">
          albarmox_
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 border-l-2 px-4 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:border-border hover:text-foreground"
              }`
            }
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
          VIEW SITE
        </Link>
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 border-t border-border px-4 py-3 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <LogOutIcon className="h-3.5 w-3.5" aria-hidden="true" />
            LOGOUT
          </button>
        </form>
      </div>
    </aside>
  );
}
