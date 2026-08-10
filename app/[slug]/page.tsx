import { notFound } from "next/navigation";
import { PageSections } from "@/components/page-sections";
import { getAdmin } from "@/lib/admin-auth";
import { getPageBySlug, getPublishedPage } from "@/lib/cms-data";

export default async function FlexiblePublicPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const mayPreview = query.preview === "1" && Boolean(await getAdmin());
  const page = mayPreview ? await getPageBySlug(slug) : await getPublishedPage(slug);
  if (!page) notFound();
  return <article className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">{mayPreview ? <div className="mb-6 rounded-xl bg-brass-100 px-4 py-3 text-sm font-semibold text-olive-900">Private draft preview</div> : null}<header className="mb-14 max-w-3xl"><h1 className="font-serif text-5xl leading-none tracking-[-0.055em] text-olive-900 sm:text-7xl">{page.title}</h1>{page.introduction ? <p className="mt-6 text-xl leading-9 text-charcoal-700">{page.introduction}</p> : null}</header><PageSections sections={page.sections ?? []} /></article>;
}
