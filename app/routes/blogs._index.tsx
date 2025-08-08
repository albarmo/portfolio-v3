import { useLoaderData } from "@remix-run/react";
import { PageLayout } from "~/components/layout/PageLayout";
import BlogCard from "~/components/ui/card/BlogCard";
import TargetCursor from "~/components/ui/TargetCursor";
import ShinyText from "~/components/ui/text/ShinyText";
import { BlogPost, getBlogs } from "~/services/blog.services";

export const loader = async () => {
  const blogs = await getBlogs({ limit: 10, page: 1 });
  return { blogs: blogs };
};

const BlogsPage = () => {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <PageLayout>
      <div>
        <TargetCursor spinDuration={3} hideDefaultCursor={true} />
        <section className="dark:text-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:items-center justify-between w-full">
              <div className="text-left w-max space-y-0.5">
                <span className="flex items-center gap-1.5 text-[#BFF163]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFF163] animate-pluse"></span>
                  Blogs
                </span>
                <ShinyText
                  text="Sharing is Caring"
                  disabled={false}
                  speed={3}
                  className="text-2xl font-bold tracking-tight sm:text-4xl"
                />
              </div>
            </section>

            {/* Grid untuk Kartu Fitur */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {blogs?.data?.map((blog: BlogPost, index: number) => (
                <BlogCard key={index} {...blog} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default BlogsPage;
