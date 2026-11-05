import { redirect } from "react-router";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { AdminReviewForm } from "@/features/reviews/components";
import { createReview, readReviewForm } from "@/features/reviews/api/reviews.server";
import type { Route } from "./+types/AdminReviewCreatePage";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const result = readReviewForm(await request.formData());
  if (result.error !== undefined) return { error: result.error };
  await createReview(result.payload);
  return redirect("/admin/reviews");
}

export default function AdminReviewCreatePage({ actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / REVIEWS / NEW" title="NEW REVIEW" />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <AdminReviewForm />
    </AdminPageLayout>
  );
}
