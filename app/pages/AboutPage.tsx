import { PageLayout } from "@/components/templates/PageLayout";
import { AboutContent } from "@/features/profile/components";
import { pageMeta } from "@/utils/pageMeta";

export const meta = () => pageMeta({ title: "About" });

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutContent />
    </PageLayout>
  );
}
