export interface Review {
  id: string;
  name: string;
  jobTitle: string;
  location: string;
  reviewText: string;
  linkedinUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/** Fields an admin can edit, as submitted by the review form */
export type ReviewPayload = Omit<Review, "id" | "createdAt" | "updatedAt">;

export type ReviewSubmissionResult =
  | { success: true; message: string }
  | { success: false; error: string };
