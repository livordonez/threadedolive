import { EmptyState } from "@/components/empty-state";
import { JournalCard } from "@/components/journal-card";
import { SectionHeading } from "@/components/section-heading";
import { getJournalSummaries } from "@/lib/content";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Studio Journal",
  description:
    "Read process notes, finished-object reflections, material experiments, and learning logs from the Threaded Olive studio.",
  path: "/journal",
});

export default async function JournalPage() {
  const posts = await getJournalSummaries();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Studio Journal"
        title="Notes from the worktable, not just the finished reveal."
        description="This is where works in progress, finished objects, materials, techniques, and new-craft lessons can live without crowding the portfolio."
      />

      {posts.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No journal posts yet"
          description="Add an MDX file in content/journal to populate the Studio Journal without editing the page component."
        />
      )}
    </section>
  );
}
