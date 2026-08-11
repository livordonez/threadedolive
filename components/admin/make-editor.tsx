"use client";

import { deleteMakeAction, saveMakeAction } from "@/app/admin/actions";
import { AdminActionForm, DeleteActionButton } from "@/components/admin/action-form";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { Make } from "@/lib/cms-types";

export function MakeEditor({ make }: { make: Make }) {
  return (
    <AdminActionForm action={saveMakeAction} className="space-y-8">
      <input type="hidden" name="id" value={make.id} /><input type="hidden" name="status" value={make.status} />
      <div className="admin-panel grid gap-5 md:grid-cols-2">
        <label className="admin-label md:col-span-2">Title<input name="title" defaultValue={make.title} required className="admin-input mt-2" /></label>
        <label className="admin-label">Page address<div className="mt-2 flex items-center rounded-xl border border-olive-900/15 bg-white"><span className="pl-3 text-sm text-charcoal-700">/makes/</span><input name="slug" defaultValue={make.slug} required className="min-w-0 flex-1 bg-transparent px-1 py-3 outline-none" /></div></label>
        <label className="admin-label">Craft type<input name="craft_type" defaultValue={make.craft_type} className="admin-input mt-2" placeholder="Crochet, knitting, sewing…" /></label>
        <label className="admin-label">Completion date<input type="date" name="completion_date" defaultValue={make.completion_date ?? ""} className="admin-input mt-2" /></label>
        <label className="admin-label">Display order<input type="number" name="display_order" defaultValue={make.display_order} className="admin-input mt-2" /></label>
      </div>
      <section className="admin-panel"><h2 className="admin-section-title">Photos</h2><p className="admin-help">The first photo is the main photo. The second becomes the fabric swatch on the make page, so use a close-up of the actual fabric when you have one. Use Earlier and Later to change the order.</p><div className="mt-5"><ImageUploader initialImages={make.images} /></div></section>
      <section className="admin-panel space-y-5"><h2 className="admin-section-title">Story Behind the Make</h2><label className="admin-label">Story<textarea name="story" defaultValue={make.story} rows={10} className="admin-input mt-2" /></label><div className="grid gap-5 md:grid-cols-2"><Field name="materials" label="Yarn / materials" value={make.materials} /><Field name="pattern" label="Pattern" value={make.pattern} /><Field name="pattern_designer" label="Pattern designer" value={make.pattern_designer} /><Field name="pattern_link" label="Pattern link" value={make.pattern_link} type="url" /><Field name="tool_size" label="Hook / needle / tool size" value={make.tool_size} /></div><Field name="modifications" label="Modifications" value={make.modifications} area /><Field name="process_notes" label="Process notes" value={make.process_notes} area /><Field name="lessons" label="What I learned" value={make.lessons} area /></section>
      <div className="sticky bottom-4 z-20 flex flex-wrap items-center gap-3 rounded-2xl border border-olive-900/10 bg-white/95 p-4 shadow-xl backdrop-blur"><button name="intent" value="draft" className="admin-button-secondary">Save Draft</button>{make.status === "published" ? <><button name="intent" value="publish" className="admin-button">Save Changes</button><button name="intent" value="unpublish" className="admin-button-secondary">Unpublish</button><a href={`/makes/${make.slug}?preview=1`} target="_blank" rel="noreferrer" className="admin-button-secondary">Preview</a></> : <><button name="intent" value="publish" className="admin-button">Publish</button><a href={`/makes/${make.slug}?preview=1`} target="_blank" rel="noreferrer" className="admin-button-secondary">Preview</a></>}<DeleteActionButton action={deleteMakeAction} confirmMessage="Delete this make permanently?" /></div>
    </AdminActionForm>
  );
}

function Field({ name, label, value, area = false, type = "text" }: { name: string; label: string; value: string; area?: boolean; type?: string }) {
  return <label className="admin-label">{label}{area ? <textarea name={name} defaultValue={value} rows={5} className="admin-input mt-2" /> : <input type={type} name={name} defaultValue={value} className="admin-input mt-2" />}</label>;
}
