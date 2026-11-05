import { data } from "react-router";
import { PageLayout } from "@/components/templates/PageLayout";
import { ReviewForm } from "@/features/reviews/components";
import { validateReviewSubmission } from "@/features/reviews/api/reviews.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/ReviewPage";

export const meta = () => pageMeta({ title: "Leave a Review" });

export async function action({ request }: Route.ActionArgs) {
  const result = validateReviewSubmission(await request.formData());
  return result.success ? result : data(result, { status: 400 });
}

export default function ReviewPage({ actionData }: Route.ComponentProps) {
  return (
    <PageLayout className="section-pad pt-32 sm:pt-40">
      <ReviewForm result={actionData} />
    </PageLayout>
  );
}
