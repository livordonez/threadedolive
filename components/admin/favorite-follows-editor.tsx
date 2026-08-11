import {
  createFavoriteFollowAction,
  deleteFavoriteFollowAction,
  saveFavoriteFollowAction,
} from "@/app/admin/actions";
import {
  AdminActionForm,
  CreateActionForm,
  DeleteActionButton,
} from "@/components/admin/action-form";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { CmsImage, FavoriteFollowRecord } from "@/lib/cms-types";

function avatarImages(follow: FavoriteFollowRecord): CmsImage[] {
  return follow.avatar?.url ? [follow.avatar] : [];
}

export function FavoriteFollowsEditor({
  follows,
  configured,
  newFollowId,
  savedStatus,
}: {
  follows: FavoriteFollowRecord[];
  configured: boolean;
  newFollowId?: string;
  savedStatus?: string;
}) {
  return (
    <section id="favorite-follows" className="space-y-5 border-t border-olive-900/15 pt-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="admin-eyebrow">Muses section</p>
          <h2 className="admin-section-title mt-1">Favorite Follows</h2>
          <p className="admin-help mt-2 max-w-2xl">
            Add a name and profile link, then upload a recognizable avatar. Platform and handle are inferred from the link; the optional fields let you override or enrich the card.
          </p>
          {newFollowId ? (
            <p className="mt-2 text-sm font-semibold text-olive-700">
              New follow added. Fill in the profile, then save it to publish it.
            </p>
          ) : null}
          {savedStatus === "public" ? (
            <p className="mt-2 text-sm font-semibold text-olive-700">
              Saved and visible on the public Muses page.
            </p>
          ) : null}
          {savedStatus === "hidden" ? (
            <p className="mt-2 text-sm font-semibold text-pimento-700">
              Saved as hidden. Turn on “Show on the public Muses page” and save again to publish it.
            </p>
          ) : null}
        </div>
        {configured ? <CreateActionForm action={createFavoriteFollowAction} label="Add Favorite Follow" /> : null}
      </header>

      {!configured ? (
        <p className="admin-panel border-pimento-700/20 text-sm leading-7 text-pimento-700">
          Favorite Follows need the latest Supabase migration before they can be edited here. Run every file in <code>supabase/migrations</code> in filename order, then reload this page.
        </p>
      ) : null}

      <div className="space-y-5">
        {follows.map((follow) => (
          <AdminActionForm key={follow.id} action={saveFavoriteFollowAction} className="admin-panel space-y-5">
            <input type="hidden" name="id" value={follow.id} />
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-2xl text-olive-900">{follow.name}</h3>
              <span className={follow.visible ? "admin-status-published" : "admin-status-draft"}>
                {follow.visible ? "Public" : "Hidden"}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="admin-label">
                Creator name
                <input name="name" defaultValue={follow.name} required className="admin-input mt-2" />
              </label>
              <label className="admin-label">
                Profile link
                <input name="url" type="url" defaultValue={follow.url} required className="admin-input mt-2" placeholder="https://…" />
              </label>
              <label className="admin-label md:col-span-2">
                Short note
                <textarea name="description" defaultValue={follow.description} rows={3} className="admin-input mt-2" placeholder="Why I like following their work…" />
              </label>
              <label className="admin-label">
                Handle override <span className="font-normal text-charcoal-700">(optional)</span>
                <input name="handle" defaultValue={follow.handle} className="admin-input mt-2" placeholder="Usually inferred from the link" />
              </label>
              <label className="admin-label">
                YouTube channel ID <span className="font-normal text-charcoal-700">(optional)</span>
                <input name="youtube_channel_id" defaultValue={follow.youtube_channel_id} className="admin-input mt-2" />
                <span className="admin-help mt-2 block">Adds the latest-video preview when the profile is a YouTube channel.</span>
              </label>
              <label className="admin-label">
                Display order
                <input name="display_order" type="number" defaultValue={follow.display_order} className="admin-input mt-2" />
              </label>
              <label className={`flex items-center gap-3 self-end rounded-xl border p-3 text-sm font-semibold ${
                follow.visible || follow.id === newFollowId
                  ? "border-olive-700/25 bg-olive-50 text-olive-900"
                  : "border-pimento-700/20 bg-pimento-50 text-pimento-700"
              }`}>
                <input name="visible" type="checkbox" defaultChecked={follow.visible || follow.id === newFollowId} className="h-5 w-5 accent-olive-700" />
                Show on the public Muses page after saving
              </label>
            </div>

            <div>
              <p className="admin-label">Profile image</p>
              <p className="admin-help mt-1">Upload one square or portrait image. It will be cropped to a circle on the public card.</p>
              <div className="mt-4">
                <ImageUploader initialImages={avatarImages(follow)} max={1} name="avatar" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-olive-900/10 pt-4">
              <button className="admin-button">Save Favorite Follow</button>
              <DeleteActionButton action={deleteFavoriteFollowAction} confirmMessage={`Delete ${follow.name || "this favorite follow"}?`} />
            </div>
          </AdminActionForm>
        ))}

        {configured && !follows.length ? (
          <p className="border-y border-olive-900/15 py-8 text-charcoal-700">
            No favorite follows yet. Add the first one above.
          </p>
        ) : null}
      </div>
    </section>
  );
}
