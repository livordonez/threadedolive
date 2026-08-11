"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import type { AdminActionState } from "@/lib/admin-action-state";
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
  return value && !reservedSlugs.has(value) ? value : null;
}

function validId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function failed(context: string, message: string, error?: unknown): AdminActionState {
  console.error(`[admin:${context}]`, error ?? message);
  return { status: "error", message };
}

function databaseMessage(
  error: { code?: string } | null,
  fallback: string,
  missingTableMessage?: string,
) {
  if (error?.code === "23505") return "That page address is already in use.";
  if (error?.code === "42P01" || error?.code === "PGRST205") {
    return missingTableMessage ?? "The database setup is incomplete. Run every migration in Supabase, then try again.";
  }
  return fallback;
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
    const { error } = await supabase.storage.from("threaded-olive").remove(removed);
    if (error) console.error("[admin:image-cleanup]", error);
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
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Your session could not be started. Please try again." };
  const { data: admin, error: adminError } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (adminError) {
    await supabase.auth.signOut();
    return { error: "Admin access could not be verified. Please try again." };
  }
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

export async function createMakeAction(state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  void state; void formData;
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const seed = `new-make-${Date.now()}`;
  const { data, error } = await supabase.from("makes").insert({ slug: seed, title: "Untitled Make" }).select("id").single();
  if (error || !data) return failed("create-make", databaseMessage(error, "Could not create the make. Please try again."), error);
  redirect(`/admin/makes/${data.id}`);
}

export async function saveMakeAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-make", "This make could not be identified. Reload the editor and try again.");
  const makeSlug = slug(formData);
  if (!makeSlug) return failed("save-make", "Choose a different page address using letters, numbers, and hyphens.");
  const supabase = await createSupabaseServerClient();
  const { data: previous, error: readError } = await supabase.from("makes").select("images").eq("id", id).single();
  if (readError) return failed("read-make", "This make could not be loaded for saving. Reload the editor and try again.", readError);
  const images = cleanImages(parseJson(formData.get("images"), []));
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const update = {
    slug: makeSlug,
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
  const { error } = await supabase.from("makes").update(update).eq("id", id).select("id").single();
  if (error) return failed("save-make", databaseMessage(error, "Could not save this make. Your changes are still in the form."), error);
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/");
  revalidatePath(`/makes/${update.slug}`);
  redirect(`/admin/makes/${id}?saved=1`);
}

export async function deleteMakeAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("delete-make", "This make could not be identified. Reload the editor and try again.");
  const supabase = await createSupabaseServerClient();
  const { data, error: readError } = await supabase.from("makes").select("images").eq("id", id).single();
  if (readError) return failed("read-make-for-delete", "Could not prepare this make for deletion. Please try again.", readError);
  const { error } = await supabase.from("makes").delete().eq("id", id);
  if (error) return failed("delete-make", "Could not delete this make. Nothing was removed.", error);
  const images = cleanImages(data?.images);
  if (images.length) {
    const { error: storageError } = await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
    if (storageError) console.error("[admin:delete-make-images]", storageError);
  }
  revalidatePath("/");
  redirect("/admin/makes");
}

export async function createMuseAction(state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  void state; void formData;
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("muses").insert({ title: "Untitled Muse" }).select("id").single();
  if (error || !data) return failed(
    "create-muse",
    databaseMessage(error, "Could not create the muse. Please try again.", "Muses are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."),
    error,
  );
  redirect(`/admin/muses/${data.id}`);
}

export async function saveMuseAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-muse", "This muse could not be identified. Reload the editor and try again.");
  const supabase = await createSupabaseServerClient();
  const { data: previous, error: readError } = await supabase.from("muses").select("images").eq("id", id).single();
  if (readError) return failed("read-muse", databaseMessage(readError, "This muse could not be loaded for saving.", "Muses are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."), readError);
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 4);
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const { error } = await supabase.from("muses").update({
    title: text(formData, "title") || "Untitled Muse", category: text(formData, "category"), note: text(formData, "note"),
    source_name: text(formData, "source_name"), source_url: safeUrl(text(formData, "source_url")), images, status,
    display_order: Number(text(formData, "display_order")) || 0, published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq("id", id).select("id").single();
  if (error) return failed("save-muse", databaseMessage(error, "Could not save this muse. Your changes are still in the form.", "Muses are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."), error);
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/muses"); revalidatePath("/");
  redirect(`/admin/muses/${id}?saved=1`);
}

export async function deleteMuseAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("delete-muse", "This muse could not be identified. Reload the editor and try again.");
  const supabase = await createSupabaseServerClient();
  const { data, error: readError } = await supabase.from("muses").select("images").eq("id", id).single();
  if (readError) return failed("read-muse-for-delete", "Could not prepare this muse for deletion. Please try again.", readError);
  const { error } = await supabase.from("muses").delete().eq("id", id);
  if (error) return failed("delete-muse", "Could not delete this muse. Nothing was removed.", error);
  const images = cleanImages(data?.images);
  if (images.length) {
    const { error: storageError } = await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
    if (storageError) console.error("[admin:delete-muse-images]", storageError);
  }
  revalidatePath("/muses"); redirect("/admin/muses");
}

export async function createMomentAction(state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  void state; void formData;
  await requireAdmin();
  const supabase = await createSupabaseServerClient(); const seed = `new-moment-${Date.now()}`;
  const { data, error } = await supabase.from("moments").insert({ slug: seed, title: "Untitled Moment" }).select("id").single();
  if (error || !data) return failed(
    "create-moment",
    databaseMessage(error, "Could not create the moment. Please try again.", "Moments are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."),
    error,
  );
  redirect(`/admin/moments/${data.id}`);
}

export async function saveMomentAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-moment", "This moment could not be identified. Reload the editor and try again.");
  const momentSlug = slug(formData);
  if (!momentSlug) return failed("save-moment", "Choose a different page address using letters, numbers, and hyphens.");
  const supabase = await createSupabaseServerClient();
  const { data: previous, error: readError } = await supabase.from("moments").select("images").eq("id", id).single();
  if (readError) return failed("read-moment", databaseMessage(readError, "This moment could not be loaded for saving.", "Moments are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."), readError);
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 10);
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const { error } = await supabase.from("moments").update({
    slug: momentSlug, title: text(formData, "title") || "Untitled Moment", excerpt: text(formData, "excerpt"),
    body: text(formData, "body"), moment_date: text(formData, "moment_date") || new Date().toISOString().slice(0, 10),
    images, status, published_at: status === "published" ? new Date().toISOString() : null, updated_at: new Date().toISOString(),
  }).eq("id", id).select("id").single();
  if (error) return failed("save-moment", databaseMessage(error, "Could not save this moment. Your changes are still in the form.", "Moments are not set up in the database yet. Run the muses and moments migration in Supabase, then try again."), error);
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/moments"); revalidatePath(`/moments/${momentSlug}`); revalidatePath("/");
  redirect(`/admin/moments/${id}?saved=1`);
}

export async function deleteMomentAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("delete-moment", "This moment could not be identified. Reload the editor and try again.");
  const supabase = await createSupabaseServerClient();
  const { data, error: readError } = await supabase.from("moments").select("images").eq("id", id).single();
  if (readError) return failed("read-moment-for-delete", "Could not prepare this moment for deletion. Please try again.", readError);
  const { error } = await supabase.from("moments").delete().eq("id", id);
  if (error) return failed("delete-moment", "Could not delete this moment. Nothing was removed.", error);
  const images = cleanImages(data?.images);
  if (images.length) {
    const { error: storageError } = await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
    if (storageError) console.error("[admin:delete-moment-images]", storageError);
  }
  revalidatePath("/moments"); redirect("/admin/moments");
}

export async function createPageAction(state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  void state; void formData;
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const seed = `new-page-${Date.now()}`;
  const { data, error } = await supabase.from("pages").insert({ slug: seed, title: "Untitled Page" }).select("id").single();
  if (error || !data) return failed("create-page", databaseMessage(error, "Could not create the page. Please try again."), error);
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

export async function savePageAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-page", "This page could not be identified. Reload the editor and try again.");
  const pageSlug = slug(formData);
  if (!pageSlug) return failed("save-page", "Choose a different page address using letters, numbers, and hyphens.");
  const intent = text(formData, "intent");
  const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : text(formData, "status") || "draft";
  const supabase = await createSupabaseServerClient();
  const { data: previous, error: readError } = await supabase.from("pages").select("sections").eq("id", id).single();
  if (readError) return failed("read-page", "This page could not be loaded for saving. Reload the editor and try again.", readError);
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
  const { error } = await supabase.from("pages").update(update).eq("id", id).select("id").single();
  if (error) return failed("save-page", databaseMessage(error, "Could not save this page. Your changes are still in the form."), error);
  await removeUnusedImages(sectionImages(cleanSections(previous?.sections)), sectionImages(sections));
  const existing = await supabase.from("navigation_items").select("id").eq("page_id", id).maybeSingle();
  if (existing.error) return failed("read-page-navigation", "The page was saved, but its navigation setting could not be checked. Try saving once more.", existing.error);
  if (update.show_in_navigation && status === "published") {
    const item = { label: update.navigation_label || update.title, href: `/${pageSlug}`, visible: true, page_id: id };
    const navigationResult = existing.data
      ? await supabase.from("navigation_items").update(item).eq("id", existing.data.id)
      : await supabase.from("navigation_items").insert(item);
    if (navigationResult.error) return failed("save-page-navigation", "The page was saved, but its navigation setting was not. Try saving once more.", navigationResult.error);
  } else if (existing.data) {
    const { error: navigationError } = await supabase.from("navigation_items").update({ visible: false }).eq("id", existing.data.id);
    if (navigationError) return failed("hide-page-navigation", "The page was saved, but its navigation setting was not. Try saving once more.", navigationError);
  }
  revalidatePath(`/${pageSlug}`);
  revalidatePath("/", "layout");
  redirect(`/admin/pages/${id}?saved=1`);
}

export async function deletePageAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  if (!validId(id)) return failed("delete-page", "This page could not be identified. Reload the editor and try again.");
  const { data, error: readError } = await supabase.from("pages").select("sections").eq("id", id).single();
  if (readError) return failed("read-page-for-delete", "Could not prepare this page for deletion. Please try again.", readError);
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) return failed("delete-page", "Could not delete this page. Nothing was removed.", error);
  const images = sectionImages(cleanSections(data?.sections));
  if (images.length) {
    const { error: storageError } = await supabase.storage.from("threaded-olive").remove(images.map((image) => image.path));
    if (storageError) console.error("[admin:delete-page-images]", storageError);
  }
  revalidatePath("/", "layout");
  redirect("/admin/pages");
}

export async function saveAboutAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-about", "The About page is not connected to the database. Check the database setup, then reload.");
  const { data: previous, error: readError } = await supabase.from("about_content").select("images").eq("id", id).single();
  if (readError) return failed("read-about", "The About page could not be loaded for saving. Reload and try again.", readError);
  const images = cleanImages(parseJson(formData.get("images"), [])).slice(0, 2);
  const { error } = await supabase.from("about_content").update({
    bio: text(formData, "bio"), story: text(formData, "story"), images,
    instagram_url: safeUrl(text(formData, "instagram_url")), pinterest_url: safeUrl(text(formData, "pinterest_url")),
    updated_at: new Date().toISOString(),
  }).eq("id", id).select("id").single();
  if (error) return failed("save-about", "Could not save the About page. Your changes are still in the form.", error);
  await removeUnusedImages(cleanImages(previous?.images), images);
  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}

export async function saveSettingsAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  if (!validId(id)) return failed("save-settings", "Site settings are not connected to the database. Check the database setup, then reload.");
  const { error } = await supabase.from("site_settings").update({
    site_name: text(formData, "site_name") || "Threaded Olive",
    short_description: text(formData, "short_description"),
    instagram_url: safeUrl(text(formData, "instagram_url")), pinterest_url: safeUrl(text(formData, "pinterest_url")),
    footer_text: text(formData, "footer_text"), updated_at: new Date().toISOString(),
  }).eq("id", id).select("id").single();
  if (error) return failed("save-settings", "Could not save site settings. Your changes are still in the form.", error);
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function saveNavigationAction(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const items = parseJson<NavigationItem[]>(formData.get("items"), []);
  const fallbackHrefs = new Set(["/", "/makes", "/muses", "/moments", "/about"]);
  const validItems = items.length <= 100 && items.every((item) =>
    item &&
    typeof item.id === "string" &&
    typeof item.label === "string" &&
    typeof item.href === "string" &&
    (validId(item.id) || (item.id.startsWith("fallback-") && fallbackHrefs.has(item.href)))
  );
  if (!validItems) return failed("save-navigation", "The navigation data was invalid. Reload the page and try again.");
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
    return failed("save-navigation", "Could not save the navigation. Reload the page before trying again.", results.find(({ error }) => error)?.error);
  }
  const { error: markerError } = await supabase.from("navigation_items").upsert({
    label: "Navigation configured",
    href: "/__navigation-configured",
    visible: true,
    display_order: items.length,
    page_id: null,
  }, { onConflict: "href" });
  if (markerError) return failed("save-navigation-marker", "The navigation was partly saved but could not be finalized. Try saving once more.", markerError);
  revalidatePath("/", "layout");
  redirect("/admin/navigation?saved=1");
}
