import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { destroyAdminSession } from "~/lib/session.server";

export async function action({ request }: ActionFunctionArgs) {
  return destroyAdminSession(request);
}

export async function loader() {
  return redirect("/admin/login");
}
