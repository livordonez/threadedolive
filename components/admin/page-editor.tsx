"use client";

import { useState } from "react";
import { deletePageAction, savePageAction } from "@/app/admin/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { FlexiblePage, PageSection } from "@/lib/cms-types";

const sectionChoices: [PageSection["type"], string][] = [
  ["rich_text", "Rich text"], ["image", "Image"], ["gallery", "Image gallery"],
  ["cards", "Item / card grid"], ["links", "Link list"], ["heading", "Heading"], ["divider", "Divider"],
];

export function PageEditor({ page }: { page: FlexiblePage }) {
  const [sections, setSections] = useState(page.sections ?? []);
  function add(type: PageSection["type"]) { setSections([...sections, { id: crypto.randomUUID(), type }]); }
  function update(index: number, section: PageSection) { setSections(sections.map((item, itemIndex) => itemIndex === index ? section : item)); }
  function move(index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= sections.length) return; const next = [...sections]; [next[index], next[target]] = [next[target], next[index]]; setSections(next); }

  return (
    <form action={savePageAction} className="space-y-8">
      <input type="hidden" name="id" value={page.id} /><input type="hidden" name="status" value={page.status} /><input type="hidden" name="sections" value={JSON.stringify(sections)} />
      <div className="admin-panel grid gap-5 md:grid-cols-2">
        <label className="admin-label md:col-span-2">Page title<input name="title" defaultValue={page.title} required className="admin-input mt-2" /></label>
        <label className="admin-label">Page address<div className="mt-2 flex rounded-xl border border-olive-900/15 bg-white"><span className="pl-3 py-3 text-sm text-charcoal-700">/</span><input name="slug" defaultValue={page.slug} required className="min-w-0 flex-1 bg-transparent px-1 py-3 outline-none" /></div></label>
        <label className="admin-label">Navigation label<input name="navigation_label" defaultValue={page.navigation_label} className="admin-input mt-2" placeholder="Defaults to page title" /></label>
        <label className="admin-label md:col-span-2">Short introduction<textarea name="introduction" defaultValue={page.introduction} rows={3} className="admin-input mt-2" /></label>
        <label className="flex items-center gap-3 text-sm font-semibold md:col-span-2"><input type="checkbox" name="show_in_navigation" defaultChecked={page.show_in_navigation} className="h-5 w-5 accent-olive-700" />Show this page in the public navigation when published</label>
      </div>
      <section className="space-y-4"><div><h2 className="admin-section-title">Page sections</h2><p className="admin-help">Add only what the page needs, then arrange it in the order visitors should see it.</p></div>
        {sections.map((section, index) => <div key={section.id} className="admin-panel"><div className="mb-5 flex flex-wrap items-center gap-2"><p className="mr-auto text-sm font-bold text-olive-900">{sectionChoices.find(([type]) => type === section.type)?.[1]}</p><button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="admin-mini">Move up</button><button type="button" onClick={() => move(index, 1)} disabled={index === sections.length - 1} className="admin-mini">Move down</button><button type="button" onClick={() => setSections(sections.filter((_, itemIndex) => itemIndex !== index))} className="admin-mini text-pimento-700">Remove</button></div><SectionFields section={section} onChange={(next) => update(index, next)} /></div>)}
        {!sections.length ? <div className="rounded-2xl border border-dashed border-olive-900/20 p-8 text-center text-sm text-charcoal-700">This page has no sections yet.</div> : null}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-olive-50 p-4"><span className="mr-2 self-center text-sm font-bold">Add Section</span>{sectionChoices.map(([type, label]) => <button key={type} type="button" onClick={() => add(type)} className="admin-mini bg-white">+ {label}</button>)}</div>
      </section>
      <div className="sticky bottom-4 z-20 flex flex-wrap gap-3 rounded-2xl border border-olive-900/10 bg-white/95 p-4 shadow-xl"><button name="intent" value="draft" className="admin-button-secondary">Save Draft</button>{page.status === "published" ? <><button name="intent" value="publish" className="admin-button">Save Changes</button><button name="intent" value="unpublish" className="admin-button-secondary">Unpublish</button></> : <button name="intent" value="publish" className="admin-button">Publish</button>}<a href={`/${page.slug}?preview=1`} target="_blank" className="admin-button-secondary">Preview</a><button formAction={deletePageAction} onClick={(event) => { if (!confirm("Delete this page permanently?")) event.preventDefault(); }} className="ml-auto text-sm font-semibold text-pimento-700">Delete</button></div>
    </form>
  );
}

function SectionFields({ section, onChange }: { section: PageSection; onChange: (section: PageSection) => void }) {
  const field = (key: keyof PageSection, value: unknown) => onChange({ ...section, [key]: value });
  if (section.type === "divider") return <p className="admin-help">A quiet horizontal divider will appear here.</p>;
  if (section.type === "heading") return <label className="admin-label">Heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label>;
  if (section.type === "rich_text") return <div className="space-y-4"><label className="admin-label">Optional heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label><label className="admin-label">Text<textarea value={section.body ?? ""} onChange={(event) => field("body", event.target.value)} rows={8} className="admin-input mt-2" /></label></div>;
  if (section.type === "image") return <div className="space-y-4"><label className="admin-label">Optional heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label><ImageUploader name="" max={1} initialImages={section.image ? [section.image] : []} onChange={(images) => field("image", images[0])} /></div>;
  if (section.type === "gallery") return <div className="space-y-4"><label className="admin-label">Optional heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label><ImageUploader name="" initialImages={section.images ?? []} onChange={(images) => field("images", images)} /></div>;
  if (section.type === "cards") {
    const value = (section.items ?? []).map((item) => [item.title, item.text ?? "", item.url ?? ""].join(" | ")).join("\n");
    return <div className="space-y-4"><label className="admin-label">Optional heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label><label className="admin-label">Cards<textarea value={value} onChange={(event) => field("items", event.target.value.split("\n").filter(Boolean).map((line) => { const [title, text, url] = line.split("|").map((part) => part.trim()); return { title, text, url }; }))} rows={6} className="admin-input mt-2" /><span className="admin-help mt-2 block">One card per line: Title | Description | Optional link</span></label></div>;
  }
  const value = (section.links ?? []).map((link) => [link.label, link.url, link.description ?? ""].join(" | ")).join("\n");
  return <div className="space-y-4"><label className="admin-label">Optional heading<input value={section.heading ?? ""} onChange={(event) => field("heading", event.target.value)} className="admin-input mt-2" /></label><label className="admin-label">Links<textarea value={value} onChange={(event) => field("links", event.target.value.split("\n").filter(Boolean).map((line) => { const [label, url, description] = line.split("|").map((part) => part.trim()); return { label, url, description }; }))} rows={6} className="admin-input mt-2" /><span className="admin-help mt-2 block">One link per line: Label | URL | Optional note</span></label></div>;
}
