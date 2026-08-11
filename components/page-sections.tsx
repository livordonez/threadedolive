import Image from "next/image";
import type { PageSection } from "@/lib/cms-types";

export function PageSections({ sections }: { sections: PageSection[] }) {
  return <div className="space-y-14">{sections.map((section) => <Section key={section.id} section={section} />)}</div>;
}

function Section({ section }: { section: PageSection }) {
  if (section.type === "divider") return <hr className="border-olive-900/15" />;
  if (section.type === "heading") return section.heading ? <h2 className="font-serif text-4xl tracking-[-0.04em] text-olive-900 sm:text-5xl">{section.heading}</h2> : null;
  if (section.type === "rich_text") return <section>{section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}{section.body ? <div className="public-prose mt-5 whitespace-pre-line">{section.body}</div> : null}</section>;
  if (section.type === "image") return section.image ? <section>{section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}<div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-olive-100"><Image src={section.image.url} alt={section.image.alt} fill className="object-cover" sizes="(max-width: 1000px) 100vw, 1000px" /></div></section> : null;
  if (section.type === "gallery") return section.images?.length ? <section>{section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}<div className="mt-5 grid gap-5 sm:grid-cols-2">{section.images.map((image, index) => <div key={image.path} className={`relative overflow-hidden rounded-[1.5rem] bg-olive-100 ${index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}><Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" /></div>)}</div></section> : null;
  if (section.type === "cards") return section.items?.length ? <section>{section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{section.items.map((item, index) => <article key={`${item.title}-${index}`} className="rounded-[1.5rem] border border-olive-900/10 bg-white/70 p-6"><h3 className="font-serif text-2xl text-olive-900">{item.title}</h3>{item.text ? <p className="mt-3 leading-7 text-charcoal-700">{item.text}</p> : null}{item.url ? <a href={item.url} className="mt-4 inline-block text-sm font-bold text-olive-700 underline underline-offset-4">Have a look</a> : null}</article>)}</div></section> : null;
  return section.links?.length ? <section>{section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}<ul className="mt-5 divide-y divide-olive-900/10 border-y border-olive-900/10">{section.links.map((link, index) => <li key={`${link.url}-${index}`}><a href={link.url} className="flex items-center justify-between gap-5 py-5"><span><span className="block font-serif text-2xl text-olive-900">{link.label}</span>{link.description ? <span className="mt-1 block text-sm text-charcoal-700">{link.description}</span> : null}</span><span aria-hidden>↗</span></a></li>)}</ul></section> : null;
}
function SectionHeading({ children }: { children: React.ReactNode }) { return <h2 className="font-serif text-3xl tracking-[-0.03em] text-olive-900 sm:text-4xl">{children}</h2>; }
