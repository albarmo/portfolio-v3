import { Form } from "react-router";

const LABEL_CLASS =
  "block border-b border-border bg-surface px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted";
const INPUT_CLASS =
  "w-full bg-background px-3 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted";

interface LoginFormProps {
  /** Path to return to after a successful login */
  redirectTo: string;
  error?: string | undefined;
}

export function LoginForm({ redirectTo, error }: LoginFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm">
        <div className="mb-8 border-b border-border pb-6">
          <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            SYS.AUTH / ADMIN
          </samp>
          <h1 className="mt-2 font-display text-3xl font-black uppercase text-foreground">CMS LOGIN</h1>
        </div>

        <Form method="post" className="space-y-0 border border-border">
          <input type="hidden" name="from" value={redirectTo} />

          <div className="border-b border-border">
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

          <div className={error ? "border-b border-accent" : "border-b border-border"}>
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
            <div id="login-error" role="alert" className="border-b border-accent bg-accent px-3 py-2">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white">
                <span aria-hidden="true">⚠ </span>
                {error}
              </samp>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full bg-accent px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            {"AUTHENTICATE >>>"}
          </button>
        </Form>

        <samp className="mt-4 block text-center font-mono text-[0.6rem] text-muted">
          PORTFOLIO CMS v2026 / RESTRICTED ACCESS
        </samp>
      </div>
    </div>
  );
}
