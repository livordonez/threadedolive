import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftPill } from "@/components/craft-pill";
import { MdxContent } from "@/components/mdx-content";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProjectCard } from "@/components/project-card";
import { buildMetadata } from "@/lib/site";
import { getProjectBySlug, getProjectSummaries } from "@/lib/content";
import { formatMonthYear } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjectSummaries();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      path: "/portfolio",
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/portfolio/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projectSummaries] = await Promise.all([
    getProjectBySlug(slug),
    getProjectSummaries(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectSummaries.filter((candidate) =>
    project.relatedProjects.includes(candidate.slug),
  );

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <Link
        href="/portfolio"
        className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-900 underline decoration-olive-900/20 underline-offset-4"
      >
        Back to portfolio
      </Link>

      <header className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <CraftPill craft={project.craft} />
            <p className="text-xs uppercase tracking-[0.22em] text-charcoal-700">
              Completed {formatMonthYear(project.completedOn)}
            </p>
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-xl leading-9 text-charcoal-700">
            {project.excerpt}
          </p>
          <p className="max-w-2xl text-base leading-8 text-charcoal-700">
            {project.story}
          </p>
        </div>

        <MediaPlaceholder image={project.featuredImage} aspect="portrait" priority />
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] border border-olive-900/10 bg-white/80 p-7 shadow-[0_24px_60px_rgba(37,33,29,0.05)] sm:p-8">
          <MdxContent source={project.body} />
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Materials
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-charcoal-700">
              {project.materials.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Techniques
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-charcoal-700">
              {project.techniques.map((technique) => (
                <li key={technique}>{technique}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Project details
            </p>
            <dl className="mt-4 space-y-4 text-base leading-8 text-charcoal-700">
              {project.patternInfo ? (
                <div>
                  <dt className="font-semibold text-charcoal-900">
                    Pattern information
                  </dt>
                  <dd>{project.patternInfo}</dd>
                </div>
              ) : null}
              {project.dimensions ? (
                <div>
                  <dt className="font-semibold text-charcoal-900">Dimensions</dt>
                  <dd>{project.dimensions}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="rounded-[2rem] border border-olive-900/10 bg-olive-900 p-6 text-linen-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
              Process notes
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8">
              {project.processNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="space-y-6">
        <h2 className="font-serif text-4xl tracking-[-0.05em] text-olive-900">
          Gallery details
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {project.galleryImages.map((image, index) => (
            <MediaPlaceholder
              key={`${project.slug}-gallery-${index}`}
              image={image}
              aspect={index === 0 ? "portrait" : "landscape"}
            />
          ))}
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-serif text-4xl tracking-[-0.05em] text-olive-900">
            Related projects
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.slug} project={relatedProject} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
