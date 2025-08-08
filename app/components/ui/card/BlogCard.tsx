import type { FC } from "react";
import SpotlightCard from "./SpotlightCard";
import ShinyText from "../text/ShinyText";
import { Link } from "@remix-run/react";
import { BlogPost } from "~/services/blog.services";

const BlogCard: FC<BlogPost> = (blog) => {
  return (
    <Link to={`/blogs/${blog?.id}`}>
      <SpotlightCard
        className="cursor-target custom-spotlight-card flex flex-col gap-6"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <ShinyText text={blog?.title} disabled={false} speed={3} />
        <img
          src={blog?.thumbnail}
          alt={blog.slug}
          className="w-full h-full object-cover rounded-md"
        />
      </SpotlightCard>
    </Link>
  );
};

export default BlogCard;
