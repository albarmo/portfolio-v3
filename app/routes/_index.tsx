import { useLoaderData } from "react-router";
import { PageLayout } from "@/components/templates/PageLayout";
import AboutMe from "@/components/section/AboutMe";
import AreaOfExpertise from "@/components/section/AreaOfExpertise";
import ContactCTA from "@/components/section/ContactCTA";
import ExperienceSection from "@/components/section/ExperienceSection";
import HeroSection from "@/components/section/Hero";
import ReviewsGrid from "@/components/section/ReviewGrid";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { BlogsSection } from "@/features/blogs/components";
import { getBlogs } from "@/features/blogs/api/blogs.server";
import { ProjectShowcase } from "@/features/projects/components";
import { getProjects } from "@/features/projects/api/projects.server";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";

export const loader = async () => {
  const [projects, blogs] = await Promise.all([
    getProjects(),
    getBlogs(),
  ]);

  return {
    blogs: blogs || [],
    projects: projects || [],
  };
};

export default function Index() {
  const { blogs, projects } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <HeroSection />
      <ScrollReveal>
        <ProjectShowcase projects={projects} />
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
        <ReviewsGrid />
      </ScrollReveal>
      <ScrollReveal>
        <BlogsSection blogs={blogs} />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA />
      </ScrollReveal>
    </PageLayout>
  );
}
