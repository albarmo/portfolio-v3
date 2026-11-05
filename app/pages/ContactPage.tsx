import { PageLayout } from "@/components/templates/PageLayout";
import { ContactForm } from "@/features/contact/components";
import { buildContactMailDraft } from "@/features/contact/api/contact.server";
import { pageMeta } from "@/utils/pageMeta";
import type { Route } from "./+types/ContactPage";

export const meta = () => pageMeta({ title: "Contact" });

export async function action({ request }: Route.ActionArgs) {
  return { mailDraft: buildContactMailDraft(await request.formData()) };
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  return (
    <PageLayout className="section-pad pt-32 sm:pt-40">
      <ContactForm mailDraft={actionData?.mailDraft} />
    </PageLayout>
  );
}
