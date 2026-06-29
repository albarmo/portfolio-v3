import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroyAdminSession } from "~/lib/session.server";

export async function action({ request }: ActionFunctionArgs) {
  return destroyAdminSession(request);
}

export async function loader() {
  return redirect("/admin/login");
}
