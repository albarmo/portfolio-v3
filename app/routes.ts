import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("review", "routes/review.tsx"),

  ...prefix("projects", [
    index("pages/projects/ProjectListPage.tsx"),
    route(":projectId", "pages/projects/ProjectDetailPage.tsx"),
  ]),
  ...prefix("blogs", [
    index("routes/blogs._index.tsx"),
    route(":blogId", "routes/blogs.$blogId.tsx"),
  ]),

  // Outside the admin layout so its auth middleware never guards them
  route("admin/login", "routes/admin_.login.tsx"),
  route("admin/logout", "routes/admin_.logout.tsx"),

  route("admin", "routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    ...prefix("blogs", [
      index("routes/admin.blogs._index.tsx"),
      route("new", "routes/admin.blogs.new.tsx"),
      route(":id/edit", "routes/admin.blogs.$id.edit.tsx"),
    ]),
    ...prefix("projects", [
      index("pages/admin/projects/AdminProjectListPage.tsx"),
      route("new", "pages/admin/projects/AdminProjectCreatePage.tsx"),
      route(":id/edit", "pages/admin/projects/AdminProjectEditPage.tsx"),
    ]),
    ...prefix("reviews", [
      index("routes/admin.reviews._index.tsx"),
      route("new", "routes/admin.reviews.new.tsx"),
      route(":id/edit", "routes/admin.reviews.$id.edit.tsx"),
    ]),
    route("media", "routes/admin.media.tsx"),
  ]),
] satisfies RouteConfig;
