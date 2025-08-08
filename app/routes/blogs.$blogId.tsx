import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { PageLayout } from "~/components/layout/PageLayout";
import { ArrowLeftIcon } from "lucide-react";
import invariant from "tiny-invariant";
import { getBlog } from "~/services/blog.services";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.blogId, "Missing blogId param");
  const blog = await getBlog(params.blogId);

  return { blog: blog?.data };
};

export default function BlogDetail() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <div className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Header Section */}
          <header className="dark:text-white py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Navigasi Kembali dan Tahun */}
              <div className="flex justify-between items-center mb-12">
                <Link
                  to="/blogs"
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon />
                  <span className="text-sm font-medium">Back to Blogs</span>
                </Link>
                <div className="border border-neutral-700 rounded-md px-3 py-1 text-sm text-neutral-400">
                  {blog?.date}
                </div>
              </div>

              {/* Konten Utama */}
                {/* Kolom Kiri: Judul dan Deskripsi */}
                <div className="md:col-span-2">
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {blog?.title}
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-neutral-400 max-w-2xl">
                    {blog?.summary}
                  </p>
                </div>
            </div>
          </header>

          {/* Main Image */}
          <div className="w-full aspect-video rounded-2xl bg-gray-100 dark:bg-neutral-800 shadow-lg">
            <img
              src={blog?.thumbnail}
              alt={blog?.title}
              className="w-full h-full object-cover border rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="mt-16">
            <p className="text-lg w-full leading-8 text-gray-600 dark:text-neutral-300">
              {blog?.content}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
