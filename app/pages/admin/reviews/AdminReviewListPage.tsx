import { redirect } from "react-router";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { ReviewTable } from "@/features/reviews/components";
import { deleteReview, getAllReviews } from "@/features/reviews/api/reviews.server";
import { getFormString } from "@/utils/formData";
import type { Route } from "./+types/AdminReviewListPage";

export async function loader() {
  return { reviews: await getAllReviews() };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const id = getFormString(form, "id");
  if (getFormString(form, "intent") === "delete" && id) {
    await deleteReview(id);
  }
  return redirect("/admin/reviews");
}

export default function AdminReviewListPage({ loaderData }: Route.ComponentProps) {
  return (
    <AdminPageLayout>
      <AdminPageHeader
        breadcrumb="CMS / REVIEWS"
        title="REVIEWS"
        createLink={{ href: "/admin/reviews/new", label: "NEW REVIEW" }}
      />
      <ReviewTable reviews={loaderData.reviews} />
    </AdminPageLayout>
  );
}
