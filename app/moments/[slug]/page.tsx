import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/admin-auth";
import { getMomentBySlug } from "@/lib/cms-data";
import { FrayedEdge } from "@/components/textile-details";

export default async function MomentPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]); const mayPreview = query.preview === "1" && Boolean(await getAdmin());
  const moment = await getMomentBySlug(slug, mayPreview); if (!moment) notFound(); const [main, ...gallery] = moment.images;
  return <article className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 lg:px-12 lg:py-20">{mayPreview ? <div className="mb-6 rounded-xl bg-brass-100 px-4 py-3 text-sm font-semibold text-olive-900">Private draft preview</div> : null}<Link href="/moments" className="text-xs font-bold uppercase tracking-[0.2em] text-olive-700">← Back to Moments</Link><header className="mt-8 max-w-3xl"><time className="text-xs font-bold uppercase tracking-[0.22em] text-pimento-700">{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${moment.moment_date}T00:00:00Z`))}</time><h1 className="mt-4 font-serif text-5xl leading-none tracking-[-0.055em] text-olive-900 sm:text-7xl">{moment.title}</h1>{moment.excerpt ? <FrayedEdge className="mt-7 bg-linen-0 px-5 py-4 text-xl leading-9 text-charcoal-700">{moment.excerpt}</FrayedEdge> : null}</header>{main ? <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[2rem]"><Image src={main.url} alt={main.alt || moment.title} fill preload className="object-cover" sizes="(max-width: 1000px) 100vw, 1000px" /></div> : null}<div className="public-prose mt-12 whitespace-pre-line text-lg">{moment.body}</div>{gallery.length ? <div className="mt-12 grid gap-5 sm:grid-cols-2">{gallery.map((image) => <div key={image.path} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]"><Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" /></div>)}</div> : null}</article>;
}
