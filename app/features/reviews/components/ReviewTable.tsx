import { AdminTable } from "@/components/organisms/AdminTable";
import type { Review } from "@/features/reviews/types";

interface ReviewTableProps {
  reviews: Review[];
}

export function ReviewTable({ reviews }: ReviewTableProps) {
  return (
    <AdminTable
      headers={["NAME / REVIEW", "JOB TITLE", "LOCATION"]}
      emptyLabel="NO REVIEWS FOUND"
      deleteConfirmMessage="Delete this review?"
      rows={reviews.map((review) => ({
        id: review.id,
        title: review.name,
        subtitle: review.reviewText,
        details: [review.jobTitle, review.location],
        editHref: `/admin/reviews/${review.id}/edit`,
      }))}
    />
  );
}
