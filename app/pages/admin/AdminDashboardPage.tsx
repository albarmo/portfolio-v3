import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { DashboardOverview } from "@/features/admin/components";
import { getDashboardCounts } from "@/features/admin/api/dashboard.server";
import type { Route } from "./+types/AdminDashboardPage";

export async function loader() {
  return { counts: await getDashboardCounts() };
}

export default function AdminDashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / DASHBOARD" title="OVERVIEW" />
      <DashboardOverview counts={loaderData.counts} />
    </AdminPageLayout>
  );
}
