import { useLoaderData } from "@remix-run/react";
import { PageLayout } from "~/components/layout/PageLayout";
import AboutMe from "~/components/section/AboutMe";
import AreaOfExpertise from "~/components/section/AreaOfExpertise";
import Blogs from "~/components/section/Blogs";
import ContactCTA from "~/components/section/ContactCTA";
import ExperienceSection from "~/components/section/ExperienceSection";
import HeroSection from "~/components/section/Hero";
import ProjectShowcase from "~/components/section/ProjectShowcase";
import ReviewsGrid from "~/components/section/ReviewGrid";
import ScrollReveal from "~/components/ui/ScrollReveal";
import { getBlogs } from "~/services/blog.server";
import { getProjects } from "~/services/project.server";

export const loader = async () => {
  const projects = await getProjects({ limit: 10, page: 1 });
  const blogs = await getBlogs({ limit: 10, page: 1 });

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
        <ProjectShowcase data={projects?.data} />
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
        <Blogs data={blogs?.data} />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA />
      </ScrollReveal>
    </PageLayout>
  );
}
