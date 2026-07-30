import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftPill } from "@/components/craft-pill";
import { PortableTextContent } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { buildMetadata } from "@/lib/site";
import { formatLongDate } from "@/lib/utils";
import { getProjectBySlug } from "@/sanity/lib/loaders";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function hasTextValue(value?: string | null) {
  return Boolean(value?.trim());
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      path: "/",
    });
  }

  return buildMetadata({
    title: project.title,
    description:
      project.materialsOrYarn ||
      "Story Behind the Make project page from Threaded Olive.",
    path: `/makes/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const detailRows = [
    project.patternName
      ? {
          label: "Pattern name",
          value: project.patternUrl ? (
            <a
              href={project.patternUrl}
              className="font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {project.patternName}
            </a>
          ) : (
            project.patternName
          ),
        }
      : null,
    hasTextValue(project.patternDesigner)
      ? {
          label: "Pattern designer",
          value: project.patternDesigner,
        }
      : null,
    hasTextValue(project.toolSize)
      ? {
          label: "Hook, needle, or tool size",
          value: project.toolSize,
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: React.ReactNode }>;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <Link
        href="/"
        className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-900 underline decoration-olive-900/20 underline-offset-4"
      >
        Back to home
      </Link>

      <header className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.craftType ? <CraftPill craft={project.craftType} /> : null}
            {project.completionDate ? (
              <p className="text-xs uppercase tracking-[0.22em] text-charcoal-700">
                Completed {formatLongDate(project.completionDate)}
              </p>
            ) : null}
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-charcoal-700">
            Story Behind the Make
          </p>
        </div>

        <SanityImage
          image={project.mainImage}
          alt={`${project.title} main image`}
          label={project.title}
          aspect="portrait"
          priority
        />
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] border border-olive-900/10 bg-white/80 p-7 shadow-[0_24px_60px_rgba(37,33,29,0.05)] sm:p-8">
          <PortableTextContent value={project.storyBehindTheMake} />
        </div>

        <aside className="space-y-6">
          {hasTextValue(project.materialsOrYarn) ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Materials or yarn
              </p>
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-charcoal-700">
                {project.materialsOrYarn}
              </p>
            </div>
          ) : null}

          {detailRows.length > 0 ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Pattern details
              </p>
              <dl className="mt-4 space-y-4 text-base leading-8 text-charcoal-700">
                {detailRows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-semibold text-charcoal-900">
                      {row.label}
                    </dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {hasTextValue(project.modifications) ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Modifications
              </p>
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-charcoal-700">
                {project.modifications}
              </p>
            </div>
          ) : null}

          {hasTextValue(project.processNotes) ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-olive-900 p-6 text-linen-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
                Process notes
              </p>
              <p className="mt-4 whitespace-pre-line text-base leading-8">
                {project.processNotes}
              </p>
            </div>
          ) : null}
        </aside>
      </div>

      {project.additionalImages.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-serif text-4xl tracking-[-0.05em] text-olive-900">
            Additional images
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {project.additionalImages.map((image, index) => (
              <SanityImage
                key={`${project._id}-gallery-${index}`}
                image={image}
                alt={`${project.title} additional image ${index + 1}`}
                label={project.title}
                aspect={index === 0 ? "portrait" : "landscape"}
              />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
