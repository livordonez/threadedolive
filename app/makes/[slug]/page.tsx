import { notFound } from "next/navigation";
import { MakeStory } from "@/components/make-story";
import { getAdmin } from "@/lib/admin-auth";
import { getMakeBySlug } from "@/lib/cms-data";

export default async function MakePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const mayPreview = query.preview === "1" && Boolean(await getAdmin());
  const make = await getMakeBySlug(slug, mayPreview);

  if (!make) notFound();

  return <MakeStory make={make} isPreview={mayPreview} />;
}
