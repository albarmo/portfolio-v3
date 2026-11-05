import { createCookieSessionStorage, redirect } from "react-router";
import { ADMIN_SESSION_MAX_AGE_SECONDS } from "@/constants/cookie";
import { env } from "@/services/env.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__admin_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [env.sessionSecret],
    secure: env.isProduction,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function requireAdmin(request: Request, url: URL) {
  const session = await getSession(request);
  if (!session.get("admin")) {
    throw redirect(`/admin/login?from=${encodeURIComponent(url.pathname)}`);
  }
}

export async function createAdminSession(redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("admin", true);
  // Same-site paths only: "//host", "/\host" and "/<tab>/host" all resolve off-site in browsers
  // eslint-disable-next-line no-control-regex
  const safeTo = /^\/(?![/\\])[^\\\x00-\x20]*$/.test(redirectTo) ? redirectTo : "/admin";
  return redirect(safeTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function destroyAdminSession(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
