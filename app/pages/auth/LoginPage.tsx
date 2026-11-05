import { redirect, useSearchParams } from "react-router";
import { LoginForm } from "@/features/auth/components";
import { hasValidCredentials } from "@/features/auth/api/auth.server";
import { createAdminSession, getSession } from "@/services/session.server";
import { getFormString } from "@/utils/formData";
import type { Route } from "./+types/LoginPage";

const DEFAULT_REDIRECT = "/admin";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  if (session.get("admin")) throw redirect(DEFAULT_REDIRECT);
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  if (!hasValidCredentials(form)) {
    return { error: "INVALID CREDENTIALS / ACCESS DENIED" };
  }
  return createAdminSession(getFormString(form, "from") || DEFAULT_REDIRECT);
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  return <LoginForm redirectTo={searchParams.get("from") || DEFAULT_REDIRECT} error={actionData?.error} />;
}
