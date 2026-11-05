import { Outlet } from "react-router";
import { AdminSidebar } from "@/features/admin/components";
import { requireAdmin } from "@/services/session.server";
import type { Route } from "./+types/AdminLayout";

// Server-side route guard for everything under /admin (login/logout are declared outside this layout)
export const middleware: Route.MiddlewareFunction[] = [async ({ request, url }) => requireAdmin(request, url)];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AdminSidebar />
      <main id="main-content" className="ml-56 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
