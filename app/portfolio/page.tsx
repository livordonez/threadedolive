import { EmptyState } from "@/components/empty-state";
import { PortfolioBrowser } from "@/components/portfolio-browser";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/site";
import { getProjectSummaries } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Browse crochet, sewing, knitting, embroidery, and needlepoint projects from the Threaded Olive studio.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjectSummaries();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Portfolio"
        title="A gallery of finished pieces, process, and technique."
        description="Crochet leads the collection, while sewing, knitting, embroidery, and needlepoint show how the studio is expanding."
      />

      {projects.length > 0 ? (
        <PortfolioBrowser projects={projects} />
      ) : (
        <EmptyState
          title="No portfolio entries yet"
          description="Add an MDX file in content/projects to populate this gallery without changing the page component."
        />
      )}
    </section>
  );
}
