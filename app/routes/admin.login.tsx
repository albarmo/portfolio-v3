import { Form, useActionData, useSearchParams } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createAdminSession, getSession } from "~/lib/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  if (session.get("admin")) throw redirect("/admin");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const from = (form.get("from") as string) || "/admin";

  const validUsername = process.env.ADMIN_USERNAME ?? "admin";
  const validPassword = process.env.ADMIN_PASSWORD ?? "portfolio2026";

  if (username !== validUsername || password !== validPassword) {
    return { error: "INVALID CREDENTIALS / ACCESS DENIED" };
  }

  return createAdminSession(from);
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const [params] = useSearchParams();
  const from = params.get("from") || "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 border-b border-[var(--line)] pb-6">
          <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            SYS.AUTH / ADMIN
          </samp>
          <h1 className="mt-2 font-display text-3xl font-black uppercase text-[var(--text)]">
            CMS LOGIN
          </h1>
        </div>

        <Form method="post" className="space-y-0 border border-[var(--line)]">
          <input type="hidden" name="from" value={from} />

          <div className="border-b border-[var(--line)]">
            <label className="block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              USERNAME
            </label>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full bg-[var(--bg)] px-3 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              placeholder="enter username"
            />
          </div>

          <div className={actionData?.error ? "border-b border-[var(--accent)]" : "border-b border-[var(--line)]"}>
            <label className="block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              PASSWORD
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-[var(--bg)] px-3 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              placeholder="••••••••"
            />
          </div>

          {actionData?.error && (
            <div className="border-b border-[var(--accent)] bg-[var(--accent)] px-3 py-2">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white">
                ⚠ {actionData.error}
              </samp>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--accent)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            {"AUTHENTICATE >>>"}
          </button>
        </Form>

        <samp className="mt-4 block text-center font-mono text-[0.6rem] text-[var(--muted)]">
          PORTFOLIO CMS v2026 / RESTRICTED ACCESS
        </samp>
      </div>
    </div>
  );
}
