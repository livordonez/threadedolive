import Image from "next/image";
import Link from "next/link";
import type { Make } from "@/lib/cms-types";

export function MakeCard({ make, priority = false }: { make: Make; priority?: boolean }) {
  const image = make.images[0];
  return <Link href={`/makes/${make.slug}`} className="group block"><div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-olive-100">{image ? <Image src={image.url} alt={image.alt || make.title} fill priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className="bright-textile-placeholder grid h-full place-items-center p-8 text-center text-sm font-semibold text-olive-900">Photo coming soon</div>}</div><div className="flex items-baseline justify-between gap-4 px-1 pt-4"><h2 className="font-serif text-2xl tracking-[-0.03em] text-olive-900">{make.title}</h2>{make.craft_type ? <p className="text-xs uppercase tracking-[0.18em] text-charcoal-700">{make.craft_type}</p> : null}</div></Link>;
}
