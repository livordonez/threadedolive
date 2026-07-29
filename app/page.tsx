import { JournalCard } from "@/components/journal-card";
import { LinkButton } from "@/components/link-button";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Pill } from "@/components/pill";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getJournalSummaries, getProjectSummaries } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { crafts } from "@/lib/types";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getProjectSummaries(),
    getJournalSummaries(),
  ]);
  const featuredProjects = projects.filter((project) => project.featured);
  const heroProjects = (featuredProjects.length >= 3 ? featuredProjects : projects).slice(
    0,
    3,
  );
  const recentPosts = (posts.filter((post) => post.featured).length >= 3
    ? posts.filter((post) => post.featured)
    : posts
  ).slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
      <section className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-8">
          <Pill tone="pimento">Portfolio first</Pill>
          <div className="space-y-6">
            <h1 className="max-w-3xl font-serif text-6xl leading-[0.92] tracking-[-0.06em] text-olive-900 sm:text-7xl lg:text-[5.7rem]">
              {siteConfig.name}
            </h1>
            <p className="max-w-2xl text-2xl leading-tight text-charcoal-900 sm:text-3xl">
              {siteConfig.tagline}
            </p>
            <p className="max-w-2xl text-lg leading-9 text-charcoal-700">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {crafts.map((craft) => (
              <Pill key={craft} tone={craft === "Crochet" ? "olive" : "linen"}>
                {craft}
              </Pill>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <LinkButton href="/portfolio">Explore the Portfolio</LinkButton>
            <LinkButton href="/journal" variant="outline">
              Enter the Studio Journal
            </LinkButton>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-olive-900/10 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Projects
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.05em] text-olive-900">
                {projects.length}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-olive-900/10 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Journal notes
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.05em] text-olive-900">
                {posts.length}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-olive-900/10 bg-white/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Primary practice
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.05em] text-olive-900">
                Crochet
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr]">
          {heroProjects[0] ? (
            <MediaPlaceholder
              image={heroProjects[0].featuredImage}
              aspect="portrait"
              className="sm:row-span-2"
              priority
            />
          ) : null}
          <div className="space-y-5">
            {heroProjects.slice(1).map((project) => (
              <MediaPlaceholder
                key={project.slug}
                image={project.featuredImage}
                aspect="landscape"
              />
            ))}
            <div className="rounded-[2rem] border border-olive-900/10 bg-olive-900 p-7 text-linen-0 shadow-[0_24px_60px_rgba(37,33,29,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
                From the maker
              </p>
              <p className="mt-4 font-serif text-3xl tracking-[-0.04em]">
                A handmade archive with room for process, mistakes, and
                curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured projects"
          title="The portfolio leads with finished work, not a storefront."
          description="Each project page holds the materials, techniques, and story behind the piece, with crochet at the center and neighboring crafts around it."
          action={{ href: "/portfolio", label: "View all projects" }}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-10 rounded-[2.5rem] border border-olive-900/10 bg-white/75 p-8 shadow-[0_24px_60px_rgba(37,33,29,0.06)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <MediaPlaceholder
          image={{
            label: "Portrait or studio portrait placeholder",
            alt: "Placeholder for a future portrait or studio photograph",
            tone: "linen",
          }}
          aspect="portrait"
        />
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pimento-700">
            Meet the maker
          </p>
          <h2 className="font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900">
            Threaded Olive is built for a thoughtful, evolving practice.
          </h2>
          <p className="text-lg leading-9 text-charcoal-700">
            Crochet anchors the work, but the studio leaves room for sewing,
            knitting, embroidery, and the early learning curve of needlepoint.
            The site is designed to hold finished objects and the quieter notes
            around them with equal care.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-olive-900/10 bg-linen-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pimento-700">
                Brand note
              </p>
              <p className="mt-3 text-base leading-8 text-charcoal-700">
                The placeholder mark references three olives threaded onto a
                sewing needle, arranged like a martini garnish.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-olive-900/10 bg-linen-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pimento-700">
                Future-ready
              </p>
              <p className="mt-3 text-base leading-8 text-charcoal-700">
                Local MDX content keeps updates approachable now while leaving a
                clean path toward a CMS later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Studio Journal"
          title="Recent notes from the worktable."
          description="The journal is for progress, lessons, materials, and whatever the hands are learning next."
          action={{ href: "/journal", label: "Browse the journal" }}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
