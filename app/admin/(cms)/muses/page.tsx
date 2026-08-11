import Link from "next/link";
import { createMuseAction } from "@/app/admin/actions";
import { CreateActionForm } from "@/components/admin/action-form";
import { FavoriteFollowsEditor } from "@/components/admin/favorite-follows-editor";
import { getAllFavoriteFollows, getAllMuses } from "@/lib/cms-data";

export default async function MusesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ followsSaved?: string; followCreated?: string }>;
}) {
  const [muses, favoriteFollowData, query] = await Promise.all([
    getAllMuses(),
    getAllFavoriteFollows(),
    searchParams,
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="admin-eyebrow">Inspiration</p>
          <h1 className="admin-title">Muses</h1>
          <p className="admin-help mt-3">Manage inspiration posts and the people featured on the public Muses page.</p>
        </div>
        <CreateActionForm action={createMuseAction} label="New Muse" />
      </header>

      <section className="space-y-4" aria-labelledby="muse-posts-title">
        <h2 id="muse-posts-title" className="admin-section-title">Pinned inspiration</h2>
        <div className="space-y-3">
          {muses.map((muse) => (
            <Link key={muse.id} href={`/admin/muses/${muse.id}`} className="admin-panel flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-olive-900">{muse.title}</h3>
                <p className="mt-1 text-sm text-charcoal-700">{muse.category || "No category"}</p>
              </div>
              <span className={muse.status === "published" ? "admin-status-published" : "admin-status-draft"}>{muse.status}</span>
            </Link>
          ))}
          {!muses.length ? <p className="border-y border-olive-900/15 py-8 text-charcoal-700">No inspiration posts yet.</p> : null}
        </div>
      </section>

      <FavoriteFollowsEditor
        follows={favoriteFollowData.follows}
        configured={favoriteFollowData.configured}
        saved={Boolean(query.followsSaved || query.followCreated)}
      />
    </div>
  );
}
