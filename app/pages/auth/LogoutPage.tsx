import { redirect } from "react-router";
import { destroyAdminSession } from "@/services/session.server";
import type { Route } from "./+types/LogoutPage";

export async function action({ request }: Route.ActionArgs) {
  return destroyAdminSession(request);
}

export async function loader() {
  return redirect("/admin/login");
}
