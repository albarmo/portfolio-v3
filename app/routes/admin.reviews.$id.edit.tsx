import {
  redirect,
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { getDb } from "~/lib/mongodb.server";
import type { Review } from "~/services/review.server";
import { ReviewFormFields } from "./admin.reviews.new";
import type { Route } from "./+types/admin.reviews.$id.edit";

export async function loader({ params }: Route.LoaderArgs) {
  const db = await getDb();
  const review = await db
    .collection<Review>("reviews")
    .findOne({ id: params.id }, { projection: { _id: 0 } });
  if (!review) throw new Response("Not Found", { status: 404 });
  return { review };
}

export async function action({ request, params }: Route.ActionArgs) {
  const form = await request.formData();

  const name = (form.get("name") as string)?.trim();
  const jobTitle = (form.get("jobTitle") as string)?.trim();
  const location =
    (form.get("location") as string)?.trim() || "Jakarta, Indonesia";
  const reviewText = (form.get("reviewText") as string)?.trim();
  const linkedinUrl = (form.get("linkedinUrl") as string)?.trim() || "#";

  if (!name || !jobTitle || !reviewText) {
    return { error: "Name, job title, and review text are required." };
  }

  const db = await getDb();
  await db.collection("reviews").updateOne(
    { id: params.id },
    {
      $set: {
        name,
        jobTitle,
        location,
        reviewText,
        linkedinUrl,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  return redirect("/admin/reviews");
}

export default function EditReview() {
  const { review } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const defaults: Record<string, string> = {
    name: review.name,
    jobTitle: review.jobTitle,
    location: review.location,
    reviewText: review.reviewText,
    linkedinUrl: review.linkedinUrl,
  };

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / REVIEWS / EDIT
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
          {review.name}
        </h1>
      </div>

      {actionData?.error && (
        <div className="mb-6 border border-[var(--accent)] bg-[var(--accent)] px-4 py-3">
          <samp className="font-mono text-xs font-bold text-white">
            ⚠ {actionData.error}
          </samp>
        </div>
      )}

      <Form method="post" className="max-w-2xl border border-[var(--line)]">
        <ReviewFormFields defaults={defaults} />
        <div className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 flex items-center justify-between">
          <a
            href="/admin/reviews"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)]"
          >
            ← CANCEL
          </a>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "SAVING..." : "SAVE CHANGES >>>"}
          </button>
        </div>
      </Form>
    </div>
  );
}
