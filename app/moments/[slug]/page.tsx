import { notFound } from "next/navigation";
import { MomentStory } from "@/components/moment-story";
import { MomentGoogleFontsStylesheet } from "@/components/moments/moment-google-fonts-stylesheet";
import { getAdmin } from "@/lib/admin-auth";
import { getMomentBySlug } from "@/lib/cms-data";
import { collectMomentFonts } from "@/lib/moment-fonts";

export default async function MomentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const mayPreview = query.preview === "1" && Boolean(await getAdmin());
  const moment = await getMomentBySlug(slug, mayPreview);

  if (!moment) notFound();

  return (
    <>
      <MomentGoogleFontsStylesheet fontSlugs={collectMomentFonts([moment])} />
      <MomentStory moment={moment} isPreview={mayPreview} />
    </>
  );
}
