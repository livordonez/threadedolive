import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalCard } from "@/components/journal-card";
import { LinkButton } from "@/components/link-button";
import { MdxContent } from "@/components/mdx-content";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Pill } from "@/components/pill";
import { ProjectCard } from "@/components/project-card";
import { getJournalPostBySlug, getJournalSummaries, getProjectSummaries } from "@/lib/content";
import { buildMetadata } from "@/lib/site";
import { formatLongDate } from "@/lib/utils";

type JournalPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getJournalSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Journal entry not found",
      path: "/journal",
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    type: "article",
  });
}

export default async function JournalEntryPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const [post, postSummaries, projectSummaries] = await Promise.all([
    getJournalPostBySlug(slug),
    getJournalSummaries(),
    getProjectSummaries(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedProjects = projectSummaries.filter((project) =>
    post.relatedProjects?.includes(project.slug),
  );
  const morePosts = postSummaries.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <Link
        href="/journal"
        className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-900 underline decoration-olive-900/20 underline-offset-4"
      >
        Back to the Studio Journal
      </Link>

      <header className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="linen">{post.category}</Pill>
            <p className="text-xs uppercase tracking-[0.22em] text-charcoal-700">
              {formatLongDate(post.publishedOn)}
            </p>
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-xl leading-9 text-charcoal-700">
            {post.excerpt}
          </p>
          {relatedProjects.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {relatedProjects.map((project) => (
                <LinkButton
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  variant="outline"
                  className="px-4 py-2 text-xs"
                >
                  Related: {project.title}
                </LinkButton>
              ))}
            </div>
          ) : null}
        </div>

        <MediaPlaceholder image={post.featuredImage} aspect="wide" priority />
      </header>

      <div className="rounded-[2.25rem] border border-olive-900/10 bg-white/82 p-7 shadow-[0_24px_60px_rgba(37,33,29,0.05)] sm:p-8">
        <MdxContent source={post.body} />
      </div>

      {relatedProjects.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-serif text-4xl tracking-[-0.05em] text-olive-900">
            Related portfolio pieces
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {morePosts.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-serif text-4xl tracking-[-0.05em] text-olive-900">
            More from the journal
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {morePosts.map((entry) => (
              <JournalCard key={entry.slug} post={entry} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
