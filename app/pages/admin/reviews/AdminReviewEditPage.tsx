import { redirect } from "react-router";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { AdminReviewForm } from "@/features/reviews/components";
import { getReview, readReviewForm, updateReview } from "@/features/reviews/api/reviews.server";
import type { Route } from "./+types/AdminReviewEditPage";

export async function loader({ params }: Route.LoaderArgs) {
  return { review: await getReview(params.id) };
}

export async function action({ request, params }: Route.ActionArgs) {
  const result = readReviewForm(await request.formData());
  if (result.error !== undefined) return { error: result.error };
  await updateReview(params.id, result.payload);
  return redirect("/admin/reviews");
}

export default function AdminReviewEditPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader breadcrumb="CMS / REVIEWS / EDIT" title={loaderData.review.name} />
      {actionData?.error ? <ErrorBanner message={actionData.error} /> : null}
      <AdminReviewForm review={loaderData.review} />
    </AdminPageLayout>
  );
}
