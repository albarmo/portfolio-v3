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
import { getAllReviews } from "@/features/reviews/api/reviews.server";
import { ReviewStack } from "@/features/reviews/components";
import type { Route } from "./+types/HomePage";

const REVIEW_STACK_SIZE = 6;

export async function loader() {
  const [projects, blogs, reviews] = await Promise.all([
    getProjects(),
    getBlogs(),
    getAllReviews(),
  ]);
  return { projects, blogs, reviews: reviews.slice(0, REVIEW_STACK_SIZE) };
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
        <ReviewStack reviews={loaderData.reviews} />
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
