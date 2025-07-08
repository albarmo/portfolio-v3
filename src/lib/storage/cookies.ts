"use server";

import type { ENV } from "@/configs/environment";
import { cookies } from "next/headers";

type NameCookies =
  | typeof ENV.SESSION_COOKIE_NAME
  | "x-sso-token"
  | "bg"
  | "text"
  | "style";
interface CookiesProps {
  name: NameCookies;
  data: string;
  option?: { [key: string]: string };
}

export async function createCookies(props: CookiesProps) {
  (await cookies()).set(props?.name, props?.data, {
    secure: process.env.IS_SECURE === "true" ? true : false,
  });
}

export async function getCookies(name: CookiesProps["name"]) {
  return (await cookies()).get(name);
}

export async function removeCookies(name: CookiesProps["name"]) {
  (await cookies()).delete(name);
}
