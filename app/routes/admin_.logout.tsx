import { redirect } from "react-router";
import { destroyAdminSession } from "~/lib/session.server";
import type { Route } from "./+types/admin_.logout";

export async function action({ request }: Route.ActionArgs) {
  return destroyAdminSession(request);
}

export async function loader() {
  return redirect("/admin/login");
}
