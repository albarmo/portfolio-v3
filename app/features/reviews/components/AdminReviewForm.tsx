import type { FormFieldConfig } from "@/components/molecules/FormField";
import { AdminForm } from "@/components/organisms/AdminForm";
import type { Review } from "@/features/reviews/types";

const REVIEW_FIELDS: FormFieldConfig[] = [
  { name: "name", label: "NAME", placeholder: "Full name", required: true },
  { name: "jobTitle", label: "JOB TITLE", placeholder: "e.g. Senior Frontend Engineer", required: true },
  { name: "location", label: "LOCATION", placeholder: "e.g. Jakarta, Indonesia" },
  { name: "reviewText", label: "REVIEW TEXT", type: "textarea", placeholder: "Their testimonial...", required: true, rows: 4 },
  { name: "linkedinUrl", label: "LINKEDIN URL", placeholder: "https://linkedin.com/in/..." },
];

interface AdminReviewFormProps {
  /** Omit to create a new review */
  review?: Review | undefined;
}

export function AdminReviewForm({ review }: AdminReviewFormProps) {
  return (
    <AdminForm
      fields={REVIEW_FIELDS}
      defaultValues={
        review
          ? {
              name: review.name,
              jobTitle: review.jobTitle,
              location: review.location,
              reviewText: review.reviewText,
              linkedinUrl: review.linkedinUrl,
            }
          : undefined
      }
      cancelHref="/admin/reviews"
      submitLabel={review ? "SAVE CHANGES >>>" : "ADD REVIEW >>>"}
    />
  );
}
