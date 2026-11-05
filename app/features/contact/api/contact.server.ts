import type { ContactMailDraft } from "@/features/contact/types";
import { getFormString } from "@/utils/formData";

/** The contact form opens the visitor's mail client; the server only formats the draft */
export function buildContactMailDraft(form: FormData): ContactMailDraft {
  const fullName = getFormString(form, "fullName");
  const email = getFormString(form, "email");
  return {
    subject: getFormString(form, "subject"),
    message: `From: ${fullName} (${email})\n\n${getFormString(form, "message")}`,
  };
}
