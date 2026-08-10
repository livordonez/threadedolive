"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CmsImage, NavigationItem, PageSection } from "@/lib/cms-types";

const reservedSlugs = new Set(["admin", "about", "makes", "muses", "moments", "api"]);
const text = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

function safeUrl(value: unknown) {
  const candidate = String(value ?? "").trim().slice(0, 1000);
  if (!candidate) return "";
  if (candidate.startsWith("/")) return candidate;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" || parsed.protocol === "http:" || parsed.protocol === "mailto:" ? candidate : "";
  } catch { return ""; }
}

function slug(data: FormData) {
  const value = text(data, "slug")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!value || reservedSlugs.has(value)) throw new Error("Choose a different page address.");
  return value;
}

function parseJson<T>(value: FormDataEntryValue | null, fallback: T): T {
  try {
    return value ? (JSON.parse(String(value)) as T) : fallback;
  } catch {
    return fallback;
  }
}

function cleanImages(value: unknown): CmsImage[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 30).flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const image = entry as Partial<CmsImage>;
    if (
      typeof image.url !== "string" ||
      typeof image.path !== "string" ||
      !image.url.startsWith("https://") ||
      !image.url.includes("/storage/v1/object/public/threaded-olive/")
    ) return [];
    return [{
      url: image.url,
      path: image.path,
      alt: typeof image.alt === "string" ? image.alt.slice(0, 300) : "",
      width: typeof image.width === "number" ? image.width : undefined,
      height: typeof image.height === "number" ? image.height : undefined,
    }];
  });
}

async function removeUnusedImages(previous: CmsImage[], next: CmsImage[]) {
  const removed = previous
    .filter((image) => !next.some((candidate) => candidate.path === image.path))
    .map((image) => image.path);
  if (removed.length) {
    const supabase = await createSupabaseServerClient();
    await supabase.storage.from("threaded-olive").remove(removed);
  }
}

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(formData, "email"),
    password: text(formData, "password"),
  });
  if (error) return { error: "That email and password did not match." };
  const { data: { user } } = await supabase.auth.getUser();
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user?.id ?? "").maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    return { error: "This account does not have access to the editor." };
  }
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createMakeAction() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const seed = `new-make-${Date.now()}`;
  const { data, error } = await supabase.from("makes").insert({ slug: seed, title: "Untitled Make" }).select("id").single();
  if (error) throw new Error("Could not create the make.");
  redirect(`/admin/makes/${data.id}`);
}

export async function saveMakeAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const supabase = await createSupabaseServerClient();
  const { data: previous } = await supabase.from("makes").select("images").eq("id", id).single();
  const images = cleanImages(parseJson(formData.get("images"), []));
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const update = {
    slug: slug(formData),
    title: text(formData, "title") || "Untitled Make",
    craft_type: text(formData, "craft_type"),
    completion_date: text(formData, "completion_date") || null,
    story: text(formData, "story"),
    materials: text(formData, "materials"),
    pattern: text(formData, "pattern"),
    pattern_designer: text(formData, "pattern_designer"),
    pattern_link: safeUrl(text(formData, "pattern_link")),
    tool_size: text(formData, "tool_size"),
    modifications: text(formData, "modifications"),
    process_notes: text(formData, "process_notes"),
    lessons: text(formData, "lessons"),
    images,
    status,
    display_order: Number(text(formData, "display_order")) || 0,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("makes").update(update).eq("id", id);
  if (error) throw new Error(error.code === "23505" ? "That page address is already in use." : "Could not save this make.");
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/");
  revalidatePath(`/makes/${update.slug}`);
  redirect(`/admin/makes/${id}?saved=1`);
}

export async function deleteMakeAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("makes").select("images").eq("id", id).single();
  await supabase.from("makes").delete().eq("id", id);
  const images = cleanImages(data?.images);
  if (images.length) await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
  revalidatePath("/");
  redirect("/admin/makes");
}

export async function createMuseAction() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("muses").insert({ title: "Untitled Muse" }).select("id").single();
  if (error) throw new Error("Could not create the muse. Has the latest database migration been run?");
  redirect(`/admin/muses/${data.id}`);
}

export async function saveMuseAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const supabase = await createSupabaseServerClient();
  const { data: previous } = await supabase.from("muses").select("images").eq("id", id).single();
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 4);
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const { error } = await supabase.from("muses").update({
    title: text(formData, "title") || "Untitled Muse", category: text(formData, "category"), note: text(formData, "note"),
    source_name: text(formData, "source_name"), source_url: safeUrl(text(formData, "source_url")), images, status,
    display_order: Number(text(formData, "display_order")) || 0, published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error("Could not save this muse.");
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/muses"); revalidatePath("/");
  redirect(`/admin/muses/${id}?saved=1`);
}

export async function deleteMuseAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id"); const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("muses").select("images").eq("id", id).single();
  await supabase.from("muses").delete().eq("id", id);
  const images = cleanImages(data?.images); if (images.length) await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
  revalidatePath("/muses"); redirect("/admin/muses");
}

export async function createMomentAction() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient(); const seed = `new-moment-${Date.now()}`;
  const { data, error } = await supabase.from("moments").insert({ slug: seed, title: "Untitled Moment" }).select("id").single();
  if (error) throw new Error("Could not create the moment. Has the latest database migration been run?");
  redirect(`/admin/moments/${data.id}`);
}

export async function saveMomentAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id"); const supabase = await createSupabaseServerClient();
  const { data: previous } = await supabase.from("moments").select("images").eq("id", id).single();
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 10);
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const momentSlug = slug(formData);
  const { error } = await supabase.from("moments").update({
    slug: momentSlug, title: text(formData, "title") || "Untitled Moment", excerpt: text(formData, "excerpt"),
    body: text(formData, "body"), moment_date: text(formData, "moment_date") || new Date().toISOString().slice(0, 10),
    images, status, published_at: status === "published" ? new Date().toISOString() : null, updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error(error.code === "23505" ? "That page address is already in use." : "Could not save this moment.");
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/moments"); revalidatePath(`/moments/${momentSlug}`); revalidatePath("/");
  redirect(`/admin/moments/${id}?saved=1`);
}

export async function deleteMomentAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id"); const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("moments").select("images").eq("id", id).single();
  await supabase.from("moments").delete().eq("id", id);
  const images = cleanImages(data?.images); if (images.length) await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
  revalidatePath("/moments"); redirect("/admin/moments");
}

export async function createPageAction() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const seed = `new-page-${Date.now()}`;
  const { data, error } = await supabase.from("pages").insert({ slug: seed, title: "Untitled Page" }).select("id").single();
  if (error) throw new Error("Could not create the page.");
  redirect(`/admin/pages/${data.id}`);
}

function cleanSections(value: unknown): PageSection[] {
  const allowed = new Set(["rich_text", "image", "gallery", "cards", "links", "heading", "divider"]);
  if (!Array.isArray(value)) return [];
  return value.slice(0, 50).flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") return [];
    const section = candidate as PageSection;
    if (!allowed.has(String(section.type))) return [];
    return [{
      ...section,
      id: typeof section.id === "string" ? section.id : crypto.randomUUID(),
      heading: typeof section.heading === "string" ? section.heading.slice(0, 200) : undefined,
      body: typeof section.body === "string" ? section.body.slice(0, 50000) : undefined,
      image: cleanImages(section.image ? [section.image] : [])[0],
      images: cleanImages(section.images),
      items: Array.isArray(section.items) ? section.items.slice(0, 50).map((item) => ({
        title: String(item.title ?? "").slice(0, 200), text: String(item.text ?? "").slice(0, 2000), url: safeUrl(item.url),
      })) : undefined,
      links: Array.isArray(section.links) ? section.links.slice(0, 100).map((link) => ({
        label: String(link.label ?? "").slice(0, 200), url: safeUrl(link.url), description: String(link.description ?? "").slice(0, 1000),
      })) : undefined,
    } as PageSection];
  });
}

function sectionImages(sections: PageSection[]) {
  return sections.flatMap((section) => [
    ...(section.image ? [section.image] : []),
    ...(section.images ?? []),
    ...(section.items ?? []).flatMap((item) => item.image ? [item.image] : []),
  ]);
}

export async function savePageAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const pageSlug = slug(formData);
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const supabase = await createSupabaseServerClient();
  const { data: previous } = await supabase.from("pages").select("sections").eq("id", id).single();
  const sections = cleanSections(parseJson(formData.get("sections"), []));
  const update = {
    slug: pageSlug,
    title: text(formData, "title") || "Untitled Page",
    introduction: text(formData, "introduction"),
    sections,
    status,
    show_in_navigation: formData.get("show_in_navigation") === "on",
    navigation_label: text(formData, "navigation_label"),
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("pages").update(update).eq("id", id);
  if (error) throw new Error(error.code === "23505" ? "That page address is already in use." : "Could not save this page.");
  await removeUnusedImages(sectionImages(cleanSections(previous?.sections)), sectionImages(sections));
  const existing = await supabase.from("navigation_items").select("id").eq("page_id", id).maybeSingle();
  if (update.show_in_navigation && status === "published") {
    const item = { label: update.navigation_label || update.title, href: `/${pageSlug}`, visible: true, page_id: id };
    if (existing.data) await supabase.from("navigation_items").update(item).eq("id", existing.data.id);
    else await supabase.from("navigation_items").insert(item);
  } else if (existing.data) {
    await supabase.from("navigation_items").update({ visible: false }).eq("id", existing.data.id);
  }
  revalidatePath(`/${pageSlug}`);
  revalidatePath("/", "layout");
  redirect(`/admin/pages/${id}?saved=1`);
}

export async function deletePageAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  const { data } = await supabase.from("pages").select("sections").eq("id", id).single();
  await supabase.from("pages").delete().eq("id", id);
  const images = sectionImages(cleanSections(data?.sections));
  if (images.length) await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
  revalidatePath("/", "layout");
  redirect("/admin/pages");
}

export async function saveAboutAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  const { data: previous } = await supabase.from("about_content").select("images").eq("id", id).single();
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 2);
  await supabase.from("about_content").update({
    bio: text(formData, "bio"), story: text(formData, "story"), images,
    instagram_url: safeUrl(text(formData, "instagram_url")), pinterest_url: safeUrl(text(formData, "pinterest_url")),
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  await supabase.from("site_settings").update({
    site_name: text(formData, "site_name") || "Threaded Olive",
    short_description: text(formData, "short_description"),
    instagram_url: safeUrl(text(formData, "instagram_url")), pinterest_url: safeUrl(text(formData, "pinterest_url")),
    footer_text: text(formData, "footer_text"), updated_at: new Date().toISOString(),
  }).eq("id", text(formData, "id"));
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function saveNavigationAction(formData: FormData) {
  await requireAdmin();
  const items = parseJson<NavigationItem[]>(formData.get("items"), []);
  const supabase = await createSupabaseServerClient();
  const results = await Promise.all(items.map((item, index) => {
    const values = {
      label: String(item.label).slice(0, 80),
      visible: Boolean(item.visible),
      display_order: index,
    };
    if (item.id.startsWith("fallback-")) {
      return supabase.from("navigation_items").upsert({
        ...values,
        href: item.href,
        page_id: null,
      }, { onConflict: "href" });
    }
    return supabase.from("navigation_items").update(values).eq("id", item.id);
  }));
  if (results.some(({ error }) => error)) {
    throw new Error("Could not save the navigation.");
  }
  const { error: markerError } = await supabase.from("navigation_items").upsert({
    label: "Navigation configured",
    href: "/__navigation-configured",
    visible: true,
    display_order: items.length,
    page_id: null,
  }, { onConflict: "href" });
  if (markerError) throw new Error("Could not finish saving the navigation.");
  revalidatePath("/", "layout");
  redirect("/admin/navigation?saved=1");
}
