import { createHash, timingSafeEqual } from "node:crypto";
import { env } from "@/services/env.server";
import { getFormString } from "@/utils/formData";

// Hash first so both buffers have equal length, as timingSafeEqual requires
function safeEqual(a: string, b: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

export function hasValidCredentials(form: FormData): boolean {
  const isUsernameValid = safeEqual(getFormString(form, "username"), env.adminUsername);
  const isPasswordValid = safeEqual(getFormString(form, "password"), env.adminPassword);
  return isUsernameValid && isPasswordValid;
}
