import { useLoaderData } from "@remix-run/react";
import GradienBackground from "~/components/layout/GradientBackground";
import { PageLayout } from "~/components/layout/PageLayout";
import AboutMe from "~/components/section/AboutMe";
import AreaOfExpertise from "~/components/section/AreaOfExpertise";
import Blogs from "~/components/section/Blogs";
import ExperienceSection from "~/components/section/ExperienceSection";
import HeroSection from "~/components/section/Hero";
import ProjectShowcase from "~/components/section/ProjectShowcase";
import ReviewsGrid from "~/components/section/ReviewGrid";
import ScrollReveal from "~/components/ui/ScrollReveal";
import ParallaxScrollVelocity from "~/components/ui/paralax/ParallaxScrollVelocity";
import { getBlogs } from "~/services/blog.server";
import { getProjects } from "~/services/project.server";
import { getReviews } from "~/services/review.server";

export const loader = async () => {
  const projects = await getProjects({ limit: 10, page: 1 });
  const blogs = await getBlogs({ limit: 10, page: 1 });
  const reviews = await getReviews({ limit: 10, page: 1 });

  return {
    reviews: reviews || [],
    blogs: blogs || [],
    projects: projects || [],
  };
};

export default function Index() {
  const { reviews, blogs, projects } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <GradienBackground>
        <HeroSection />
      </GradienBackground>
      <ScrollReveal><AboutMe /></ScrollReveal>
      <ScrollReveal><ProjectShowcase data={projects?.data} /></ScrollReveal>
      <ScrollReveal><Blogs data={blogs?.data} /></ScrollReveal>
      <ScrollReveal><AreaOfExpertise /></ScrollReveal>
      <ScrollReveal><ParallaxScrollVelocity /></ScrollReveal>
      <ScrollReveal><ExperienceSection /></ScrollReveal>
      <ScrollReveal><ReviewsGrid data={reviews?.data} /></ScrollReveal>
    </PageLayout>
  );
}
