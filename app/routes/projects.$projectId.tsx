import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { PageLayout } from "~/components/layout/PageLayout";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getProject } from "~/services/project.server";
import type { Project } from "~/services/project.server";
import TechTag from "~/components/ui/TechTag";
import invariant from "tiny-invariant";
import { pageMeta } from "~/utils/meta";
import type { Route } from "./+types/projects.$projectId";

export const meta = ({ loaderData }: Route.MetaArgs) =>
  pageMeta({
    title: loaderData?.project?.title ?? "Project",
    description: loaderData?.project?.description,
    image: loaderData?.project?.thumbnail,
    type: "article",
  });

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.projectId, "Missing projectId param");
  const project: Project = await getProject(params.projectId);

  return { project: project };
};

export default function ProjectDetail() {
  const { project } = useLoaderData<typeof loader>();

  const techStack = project ? JSON.parse(project?.techStack) : []
  const responsibilities = project ? JSON.parse(project?.responsibility) : []

  return (
    <PageLayout>
      <div className="bg-[var(--bg)] text-[var(--text)]">
        <div className="section-shell py-32 sm:py-40">
          <header>
            <div>
              <div className="mb-12 flex items-center justify-between gap-4">
                <Link
                  to="/projects"
                  className="premium-link premium-link-secondary"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span className="text-sm">Back to Projects</span>
                </Link>
                <samp className="border border-[var(--line)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  {project?.year}
                </samp>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    {project?.category}
                  </samp>
                  <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
                    {project?.title}
                  </h1>
                  <p className="mt-6 max-w-2xl font-mono text-sm leading-7 text-[var(--muted)]">
                    {project?.description}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
                  <Link
                    to={project?.url}
                    target="_blank"
                    className="premium-link premium-link-primary"
                    rel="noreferrer"
                  >
                    View live site
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {techStack?.map((tech:string) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
            </div>
          </header>

          <div className="mt-12 aspect-video w-full overflow-hidden border border-[var(--line)] bg-[var(--surface-muted)]">
            <img
              src={project?.thumbnail}
              alt={project?.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-4">
            <aside className="lg:col-span-1 lg:sticky top-24 h-fit">
              <nav className="soft-panel space-y-2 p-3">
                <a
                  href="#brief"
                  className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  Brief
                </a>
                <a
                  href="#responsibility"
                  className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  Responsibility
                </a>
                <a
                  href="#result"
                  className="block border-l-2 border-transparent py-2 pl-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  Result
                </a>
              </nav>
            </aside>

            <div className="space-y-6 lg:col-span-3">
              <section id="brief" className="soft-panel p-6 sm:p-8">
                <h2 className="font-display text-2xl font-black uppercase text-[var(--text)]">
                  Brief
                </h2>
                <p className="mt-4 font-mono text-xs leading-7 text-[var(--muted)]">
                  {project?.brief}
                </p>
              </section>

              <section id="responsibility" className="soft-panel p-6 sm:p-8">
                <h2 className="font-display text-2xl font-black uppercase text-[var(--text)]">
                  Responsibility
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-[var(--muted)]">
                  {responsibilities?.map((item:string, index:number) => (
                    <li
                      key={index}
                      className="border border-[var(--line)] bg-[var(--surface)] p-4 font-mono text-xs text-[var(--muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="result" className="soft-panel p-6 sm:p-8">
                <h2 className="font-display text-2xl font-black uppercase text-[var(--text)]">
                  Result
                </h2>
                <p className="mt-4 font-mono text-xs leading-7 text-[var(--muted)]">
                  {project?.result}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
