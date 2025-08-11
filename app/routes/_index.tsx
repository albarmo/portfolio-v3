import { PageLayout } from "~/components/layout/PageLayout";
import GradienBackground from "~/components/layout/GradientBackground";
import ExperienceSection from "~/components/section/ExperienceSection";
import HeroSection from "~/components/section/Hero";
import ReviewsGrid from "~/components/section/ReviewGrid";
import AreaOfExpertise from "~/components/section/AreaOfExpertise";
import AboutMe from "~/components/section/AboutMe";
import Blogs from "~/components/section/Blogs";
import ProjectShowcase from "~/components/section/ProjectShowcase";
import ParallaxScrollVelocity from "~/components/ui/paralax/ParallaxScrollVelocity";
import { getProjects } from "~/services/project.services";
import { getReviews } from "~/services/review.services";
import { getBlogs } from "~/services/blog.services";
import { useLoaderData } from "@remix-run/react";

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
    <div id="test">
      <PageLayout>
        <GradienBackground>
          <HeroSection />
        </GradienBackground>
        <AboutMe />
        <ProjectShowcase data={projects?.data} />
        <Blogs data={blogs?.data} />
        <AreaOfExpertise />
        <ParallaxScrollVelocity />
        <ExperienceSection />
        <ReviewsGrid data={reviews?.data} />
      </PageLayout>
    </div>
  );
}
