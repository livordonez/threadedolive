"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { CmsImage } from "@/lib/cms-types";

export function ImageUploader({
  initialImages = [], max = 30, name = "images", onChange,
}: {
  initialImages?: CmsImage[]; max?: number; name?: string; onChange?: (images: CmsImage[]) => void;
}) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  function commit(next: CmsImage[]) {
    setImages(next);
    onChange?.(next);
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true); setError("");
    const uploadedPaths: string[] = [];
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error("Your session could not be verified. Please sign in again.");
      if (!user) throw new Error("Your session has expired. Please sign in again.");
      const additions: CmsImage[] = [];
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
      for (const file of Array.from(files).slice(0, Math.max(0, max - images.length))) {
        if (!allowedTypes.has(file.type) || file.size > 15 * 1024 * 1024) throw new Error("Choose JPG, PNG, WebP, or AVIF images under 15 MB.");
        const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("threaded-olive").upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedPaths.push(path);
        const { data } = supabase.storage.from("threaded-olive").getPublicUrl(path);
        additions.push({ url: data.publicUrl, path, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") });
      }
      commit([...images, ...additions]);
      if (input.current) input.current.value = "";
    } catch (caught) {
      if (uploadedPaths.length) {
        const supabase = createSupabaseBrowserClient();
        const { error: cleanupError } = await supabase.storage.from("threaded-olive").remove(uploadedPaths);
        if (cleanupError) console.error("Could not clean up an incomplete upload", cleanupError);
      }
      const message = caught instanceof Error ? caught.message : "The upload did not finish.";
      setError(message.includes("row-level security") ? "The upload was blocked. Sign in again and retry." : message);
    } finally { setUploading(false); }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images]; [next[index], next[target]] = [next[target], next[index]]; commit(next);
  }

  return (
    <div className="space-y-4">
      {name ? <input type="hidden" name={name} value={JSON.stringify(images)} /> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <div key={image.path} className="rounded-2xl border border-olive-900/10 bg-white p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-linen-100"><Image src={image.url} alt="" fill className="object-cover" sizes="300px" /></div>
            {index === 0 && max > 1 ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-pimento-700">Main photo</p> : null}
            <label className="mt-3 block text-xs font-semibold">Alt text<input value={image.alt} onChange={(event) => commit(images.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} className="admin-input mt-1 text-sm" placeholder="Describe the photo" /></label>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="admin-mini">Earlier</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === images.length - 1} className="admin-mini">Later</button>
              <button type="button" onClick={() => commit(images.filter((_, itemIndex) => itemIndex !== index))} className="admin-mini text-pimento-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {images.length < max ? <label className="inline-flex cursor-pointer items-center rounded-full border border-olive-900/20 bg-white px-5 py-3 text-sm font-bold text-olive-900"><input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={max > 1} onChange={(event) => upload(event.target.files)} className="sr-only" />{uploading ? "Uploading…" : images.length ? "Add More Photos" : "Add Photos"}</label> : null}
      {error ? <p role="alert" className="text-sm text-pimento-700">{error}</p> : null}
    </div>
  );
}
