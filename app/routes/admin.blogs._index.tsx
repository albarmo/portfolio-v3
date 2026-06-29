import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { getDb } from "~/lib/mongodb.server";
import { requireAdmin } from "~/lib/session.server";
import type { BlogPost } from "~/services/blog.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const db = await getDb();
  const blogs = await db
    .collection<BlogPost>("blogs")
    .find({}, { projection: { _id: 0 } })
    .sort({ date: -1 })
    .toArray();
  return { blogs };
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdmin(request);
  const form = await request.formData();
  const intent = form.get("intent");
  const id = form.get("id") as string;

  if (intent === "delete") {
    const db = await getDb();
    await db.collection("blogs").deleteOne({ id });
  }

  return redirect("/admin/blogs");
}

export default function AdminBlogsIndex() {
  const { blogs } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isDeleting = navigation.state !== "idle";

  return (
    <div className="p-20">
      <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-6">
        <div>
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            CMS / BLOGS
          </samp>
          <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
            BLOG POSTS
          </h1>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          NEW POST
        </Link>
      </div>

      <div className="border border-[var(--line)]">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)]">
          {["TITLE", "AUTHOR", "DATE", "ACTIONS"].map((h) => (
            <div
              key={h}
              className="bg-[var(--surface)] px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
            >
              {h}
            </div>
          ))}
        </div>

        {blogs.length === 0 ? (
          <div className="px-4 py-12 text-center font-mono text-xs text-[var(--muted)]">
            NO BLOG POSTS FOUND
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)] border-b border-[var(--line)] last:border-b-0"
            >
              <div className="bg-[var(--bg)] px-4 py-3">
                <p className="font-mono text-xs font-bold text-[var(--text)] line-clamp-1">
                  {blog.title}
                </p>
                <samp className="font-mono text-[0.6rem] text-[var(--muted)]">
                  {blog.slug}
                </samp>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {blog.author}
                </span>
              </div>
              <div className="flex items-center bg-[var(--bg)] px-4 py-3">
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {blog.date}
                </span>
              </div>
              <div className="flex items-center gap-0 bg-[var(--bg)] px-2 py-3">
                <Link
                  to={`/admin/blogs/${blog.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </Link>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="id" value={blog.id} />
                  <button
                    type="submit"
                    disabled={isDeleting}
                    onClick={(e) => {
                      if (!confirm("Delete this blog post?"))
                        e.preventDefault();
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
