import { EmptyState } from "@/components/empty-state";
import { LinkButton } from "@/components/link-button";
import { Pill } from "@/components/pill";
import { ProjectCard } from "@/components/project-card";
import { SanityImage } from "@/components/sanity-image";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/site";
import { getProjects, getSiteShellData } from "@/sanity/lib/loaders";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Browse the latest Threaded Olive makes and story-led project pages powered by Sanity.",
  path: "/",
});

export default async function HomePage() {
  const [projects, siteShell] = await Promise.all([
    getProjects(),
    getSiteShellData(),
  ]);
  const spotlightProject = projects[0];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-7">
          <Pill tone="olive">Content foundation</Pill>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.06em] text-olive-900 sm:text-6xl lg:text-7xl">
              {siteShell.siteName}
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-charcoal-700 sm:text-xl">
              {siteShell.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <LinkButton href="/about">Read the About page</LinkButton>
            <LinkButton href="/studio" variant="outline">
              Open Studio
            </LinkButton>
          </div>
        </div>

        <SanityImage
          image={spotlightProject?.mainImage}
          alt={
            spotlightProject
              ? `${spotlightProject.title} spotlight image`
              : "Placeholder image for the Threaded Olive homepage"
          }
          label={spotlightProject?.title || "Homepage photography placeholder"}
          aspect="portrait"
          priority
        />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Project gallery"
          title="Published makes, ordered the way you want them to appear."
          description="Projects are pulled from Sanity and ordered by the display-order field, with completion date as a tiebreaker."
        />

        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No published projects yet"
            description="Once Sanity is connected, create and publish a Project in `/studio` to populate this gallery."
            action={{ href: "/studio", label: "Open Studio" }}
          />
        )}
      </section>
    </div>
  );
}
