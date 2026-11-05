import { redirect, Form, useActionData, useNavigation } from "react-router";
import { getDb } from "@/services/db.server";
import type { Route } from "./+types/admin.reviews.new";

// Server loader so client navigations still pass through the admin middleware
export async function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
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

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const db = await getDb();
  await db.collection("reviews").insertOne({
    id,
    name,
    jobTitle,
    location,
    reviewText,
    linkedinUrl,
    createdAt: now,
    updatedAt: now,
  });

  return redirect("/admin/reviews");
}

export default function NewReview() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-20">
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          CMS / REVIEWS / NEW
        </samp>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
          NEW REVIEW
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
        <ReviewFormFields />
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
            {isSubmitting ? "SAVING..." : "ADD REVIEW >>>"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export function ReviewFormFields({
  defaults,
}: {
  defaults?: Record<string, string>;
}) {
  const fields = [
    {
      name: "name",
      label: "NAME",
      type: "text",
      placeholder: "Full name",
      required: true,
    },
    {
      name: "jobTitle",
      label: "JOB TITLE",
      type: "text",
      placeholder: "e.g. Senior Frontend Engineer",
      required: true,
    },
    {
      name: "location",
      label: "LOCATION",
      type: "text",
      placeholder: "e.g. Jakarta, Indonesia",
      required: false,
    },
    {
      name: "reviewText",
      label: "REVIEW TEXT",
      type: "textarea",
      placeholder: "Their testimonial...",
      required: true,
      rows: 4,
    },
    {
      name: "linkedinUrl",
      label: "LINKEDIN URL",
      type: "text",
      placeholder: "https://linkedin.com/in/...",
      required: false,
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="border-b border-[var(--line)]">
          <label
            htmlFor={field.name}
            className="block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
          >
            {field.label}
            {field.required && (
              <span className="ml-1 text-[var(--accent)]">*</span>
            )}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={field.rows}
              placeholder={field.placeholder}
              defaultValue={defaults?.[field.name]}
              className="w-full resize-y bg-[var(--bg)] px-3 py-3 font-mono text-xs leading-6 text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={defaults?.[field.name]}
              className="w-full bg-[var(--bg)] px-3 py-3 font-mono text-xs text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          )}
        </div>
      ))}
    </>
  );
}
