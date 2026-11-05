import type { ActionFunctionArgs } from "react-router";
import {
  redirect,
  Form,
  Link,
  useLoaderData,
  useNavigation,
} from "react-router";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { getDb } from "~/lib/mongodb.server";
import type { Review } from "~/services/review.server";

export async function loader() {
  const db = await getDb();
  const reviews = await db
    .collection<Review>("reviews")
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  return { reviews };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");
  const id = form.get("id") as string;

  if (intent === "delete") {
    const db = await getDb();
    await db.collection("reviews").deleteOne({ id });
  }

  return redirect("/admin/reviews");
}

export default function AdminReviewsIndex() {
  const { reviews } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isDeleting = navigation.state !== "idle";

  return (
    <div className="p-20">
      <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-6">
        <div>
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            CMS / REVIEWS
          </samp>
          <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
            REVIEWS
          </h1>
        </div>
        <Link
          to="/admin/reviews/new"
          className="flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          NEW REVIEW
        </Link>
      </div>

      <div className="border border-[var(--line)]">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)]">
          {["NAME / REVIEW", "JOB TITLE", "LOCATION", "ACTIONS"].map((h) => (
            <div
              key={h}
              className="bg-[var(--surface)] px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
            >
              {h}
            </div>
          ))}
        </div>

        {reviews.length === 0 ? (
          <div className="px-4 py-12 text-center font-mono text-xs text-[var(--muted)]">
            NO REVIEWS FOUND
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)] last:border-b-0"
            >
              <div className="bg-[var(--bg)] px-4 py-3">
                <p className="font-mono text-xs font-bold text-[var(--text)]">
                  {review.name}
                </p>
                <p className="mt-0.5 line-clamp-1 font-mono text-[0.6rem] text-[var(--muted)]">
                  {review.reviewText}
                </p>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {review.jobTitle}
                </span>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {review.location}
                </span>
              </div>
              <div className="flex items-center gap-0 bg-[var(--bg)] px-2 py-3">
                <Link
                  to={`/admin/reviews/${review.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </Link>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="id" value={review.id} />
                  <button
                    type="submit"
                    disabled={isDeleting}
                    onClick={(e) => {
                      if (!confirm("Delete this review?")) e.preventDefault();
                    }}
                    className="flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
