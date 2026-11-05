import { Form } from "react-router";

const LABEL_CLASS =
  "block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]";
const INPUT_CLASS =
  "w-full bg-[var(--bg)] px-3 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]";

interface LoginFormProps {
  /** Path to return to after a successful login */
  redirectTo: string;
  error?: string | undefined;
}

export function LoginForm({ redirectTo, error }: LoginFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 border-b border-[var(--line)] pb-6">
          <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            SYS.AUTH / ADMIN
          </samp>
          <h1 className="mt-2 font-display text-3xl font-black uppercase text-[var(--text)]">CMS LOGIN</h1>
        </div>

        <Form method="post" className="space-y-0 border border-[var(--line)]">
          <input type="hidden" name="from" value={redirectTo} />

          <div className="border-b border-[var(--line)]">
            <label htmlFor="username" className={LABEL_CLASS}>
              USERNAME
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className={INPUT_CLASS}
              placeholder="enter username"
            />
          </div>

          <div className={error ? "border-b border-[var(--accent)]" : "border-b border-[var(--line)]"}>
            <label htmlFor="password" className={LABEL_CLASS}>
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error" : undefined}
              className={INPUT_CLASS}
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div id="login-error" role="alert" className="border-b border-[var(--accent)] bg-[var(--accent)] px-3 py-2">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white">
                <span aria-hidden="true">⚠ </span>
                {error}
              </samp>
            </div>
          ) : null}

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
