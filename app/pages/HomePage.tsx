import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { PageLayout } from "@/components/templates/PageLayout";
import { getBlogs } from "@/features/blogs/api/blogs.server";
import { BlogsSection } from "@/features/blogs/components";
import {
  AboutMe,
  AreaOfExpertise,
  CollaborationGallery,
  ContactCTA,
  ExperienceSection,
  HeroSection,
} from "@/features/profile/components";
import { getProjects } from "@/features/projects/api/projects.server";
import { ProjectShowcase } from "@/features/projects/components";
import type { Route } from "./+types/HomePage";

export async function loader() {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);
  return { projects, blogs };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout>
      <HeroSection />
      <ScrollReveal>
        <ProjectShowcase projects={loaderData.projects} />
      </ScrollReveal>
      <ScrollReveal>
        <AboutMe />
      </ScrollReveal>
      <ScrollReveal>
        <AreaOfExpertise />
      </ScrollReveal>
      <ScrollReveal>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal>
        <CollaborationGallery />
      </ScrollReveal>
      <ScrollReveal>
        <BlogsSection blogs={loaderData.blogs} />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA />
      </ScrollReveal>
    </PageLayout>
  );
}
