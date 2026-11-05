import { Link, NavLink, Outlet } from "react-router";
import { requireAdmin } from "~/lib/session.server";
import type { Route } from "./+types/admin";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  FolderIcon,
  StarIcon,
  ImageIcon,
  LogOutIcon,
  ExternalLinkIcon,
} from "lucide-react";

// Guards every route nested under /admin (login/logout live outside as admin_.*)
export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, url }) => requireAdmin(request, url),
];

const navItems = [
  { to: "/admin", label: "DASHBOARD", icon: LayoutDashboardIcon, end: true },
  { to: "/admin/blogs", label: "BLOGS", icon: FileTextIcon, end: false },
  { to: "/admin/projects", label: "PROJECTS", icon: FolderIcon, end: false },
  { to: "/admin/reviews", label: "REVIEWS", icon: StarIcon, end: false },
  { to: "/admin/media", label: "MEDIA", icon: ImageIcon, end: false },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-[var(--line)] bg-[var(--surface)]">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-[var(--line)] px-4">
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--accent)]">
            [ CMS ]
          </span>
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text)]">
            albarmox_
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 border-l-2 px-4 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--text)]"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[var(--line)]">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            VIEW SITE
          </Link>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 border-t border-[var(--line)] px-4 py-3 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <LogOutIcon className="h-3.5 w-3.5" />
              LOGOUT
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
