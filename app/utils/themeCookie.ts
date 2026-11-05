import { createCookie } from "react-router";
import { THEME_COOKIE_MAX_AGE_SECONDS } from "@/constants/cookie";

export const themeCookie = createCookie("theme", {
  maxAge: THEME_COOKIE_MAX_AGE_SECONDS,
});
