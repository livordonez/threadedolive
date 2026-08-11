"use client";

import { saveAboutAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/action-form";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { AboutContent } from "@/lib/cms-types";

export function AboutEditor({ about }: { about: AboutContent }) {
  return <AdminActionForm action={saveAboutAction} className="space-y-7"><input type="hidden" name="id" value={about.id} /><section className="admin-panel space-y-5"><label className="admin-label">About me<textarea name="bio" defaultValue={about.bio} rows={8} className="admin-input mt-2" /></label><label className="admin-label">The Threaded Olive story<textarea name="story" defaultValue={about.story} rows={8} className="admin-input mt-2" /></label></section><section className="admin-panel"><h2 className="admin-section-title">Photos</h2><p className="admin-help">Add one or two portraits or studio photographs.</p><div className="mt-5"><ImageUploader initialImages={about.images} max={2} /></div></section><section className="admin-panel grid gap-5 md:grid-cols-2"><label className="admin-label">Instagram URL<input type="url" name="instagram_url" defaultValue={about.instagram_url} className="admin-input mt-2" /></label><label className="admin-label">Pinterest URL<input type="url" name="pinterest_url" defaultValue={about.pinterest_url} className="admin-input mt-2" /></label></section><button className="admin-button">Save About Page</button></AdminActionForm>;
}
