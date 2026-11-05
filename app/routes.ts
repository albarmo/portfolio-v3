import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("review", "pages/ReviewPage.tsx"),

  ...prefix("projects", [
    index("pages/projects/ProjectListPage.tsx"),
    route(":projectId", "pages/projects/ProjectDetailPage.tsx"),
  ]),
  ...prefix("blogs", [
    index("pages/blogs/BlogListPage.tsx"),
    route(":blogId", "pages/blogs/BlogDetailPage.tsx"),
  ]),

  // Outside the admin layout so its auth middleware never guards them
  route("admin/login", "routes/admin_.login.tsx"),
  route("admin/logout", "routes/admin_.logout.tsx"),

  route("admin", "routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    ...prefix("blogs", [
      index("pages/admin/blogs/AdminBlogListPage.tsx"),
      route("new", "pages/admin/blogs/AdminBlogCreatePage.tsx"),
      route(":id/edit", "pages/admin/blogs/AdminBlogEditPage.tsx"),
    ]),
    ...prefix("projects", [
      index("pages/admin/projects/AdminProjectListPage.tsx"),
      route("new", "pages/admin/projects/AdminProjectCreatePage.tsx"),
      route(":id/edit", "pages/admin/projects/AdminProjectEditPage.tsx"),
    ]),
    ...prefix("reviews", [
      index("pages/admin/reviews/AdminReviewListPage.tsx"),
      route("new", "pages/admin/reviews/AdminReviewCreatePage.tsx"),
      route(":id/edit", "pages/admin/reviews/AdminReviewEditPage.tsx"),
    ]),
    route("media", "routes/admin.media.tsx"),
  ]),
] satisfies RouteConfig;
