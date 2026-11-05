import { data } from "react-router";
import { REVIEW_SEED } from "@/features/reviews/api/reviewSeed";
import type { Review, ReviewPayload, ReviewSubmissionResult } from "@/features/reviews/types";
import { getDb } from "@/services/db.server";
import { getFormString } from "@/utils/formData";

const COLLECTION = "reviews";
const DEFAULT_LOCATION = "Jakarta, Indonesia";
const NO_LINKEDIN_URL = "#";
const MIN_NAME_LENGTH = 3;
const MIN_MESSAGE_LENGTH = 10;

async function getCollection() {
  const db = await getDb();
  const collection = db.collection<Review>(COLLECTION);
  if ((await collection.countDocuments()) === 0) {
    await collection.insertMany(REVIEW_SEED.map((review) => ({ ...review })));
    await collection.createIndex({ id: 1 }, { unique: true });
  }
  return collection;
}

export async function getAllReviews(): Promise<Review[]> {
  const collection = await getCollection();
  return collection.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
}

export async function getReview(id: string): Promise<Review> {
  const collection = await getCollection();
  const review = await collection.findOne({ id }, { projection: { _id: 0 } });
  if (!review) throw data(null, { status: 404, statusText: "Review not found" });
  return review;
}

export async function createReview(payload: ReviewPayload): Promise<void> {
  const collection = await getCollection();
  const now = new Date().toISOString();
  await collection.insertOne({ ...payload, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
}

export async function updateReview(id: string, payload: ReviewPayload): Promise<void> {
  const collection = await getCollection();
  await collection.updateOne({ id }, { $set: { ...payload, updatedAt: new Date().toISOString() } });
}

export async function deleteReview(id: string): Promise<void> {
  const collection = await getCollection();
  await collection.deleteOne({ id });
}

export function readReviewForm(
  form: FormData,
): { payload: ReviewPayload; error?: never } | { error: string; payload?: never } {
  const name = getFormString(form, "name");
  const jobTitle = getFormString(form, "jobTitle");
  const reviewText = getFormString(form, "reviewText");
  if (!name || !jobTitle || !reviewText) {
    return { error: "Name, job title, and review text are required." };
  }
  return {
    payload: {
      name,
      jobTitle,
      reviewText,
      location: getFormString(form, "location") || DEFAULT_LOCATION,
      linkedinUrl: getFormString(form, "linkedinUrl") || NO_LINKEDIN_URL,
    },
  };
}

/** Public "leave a review" form; submissions are validated but not stored yet */
export function validateReviewSubmission(form: FormData): ReviewSubmissionResult {
  if (getFormString(form, "fullName").length < MIN_NAME_LENGTH) {
    return { success: false, error: "Nama lengkap harus diisi (minimal 3 karakter)." };
  }
  if (getFormString(form, "message").length < MIN_MESSAGE_LENGTH) {
    return { success: false, error: "Pesan ulasan harus diisi (minimal 10 karakter)." };
  }
  return { success: true, message: "Terima kasih! Ulasan Anda telah berhasil dikirimkan." };
}
