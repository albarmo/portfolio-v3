import { createCookieSessionStorage, redirect } from "react-router";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__admin_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "dev-secret-changeme"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function requireAdmin(request: Request) {
  const session = await getSession(request);
  if (!session.get("admin")) {
    const url = new URL(request.url);
    throw redirect(`/admin/login?from=${encodeURIComponent(url.pathname)}`);
  }
}

export async function createAdminSession(redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("admin", true);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function destroyAdminSession(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
