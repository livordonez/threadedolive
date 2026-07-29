import { LinkButton } from "@/components/link-button";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Pill } from "@/components/pill";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about the maker behind Threaded Olive, the story behind the name, and why crochet sits at the center of the practice.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <Pill tone="pimento">About Threaded Olive</Pill>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
            A personal fiber arts practice with crochet at its center.
          </h1>
          <p className="max-w-2xl text-lg leading-9 text-charcoal-700">
            Threaded Olive is a place to hold finished work, studio lessons, and
            the creative logic behind each piece. Crochet remains the anchor,
            but the practice keeps stretching toward sewing, knitting,
            embroidery, and the slow study of needlepoint.
          </p>
          <div className="flex flex-wrap gap-4">
            <LinkButton href="/portfolio">See the work</LinkButton>
            <LinkButton href="/contact" variant="outline">
              Get in touch
            </LinkButton>
          </div>
        </div>

        <MediaPlaceholder
          image={{
            label: "Future portrait or studio scene placeholder",
            alt: "Placeholder for a future portrait or studio photograph",
            tone: "linen",
          }}
          aspect="portrait"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
            Creative background
          </p>
          <p className="mt-4 text-base leading-8 text-charcoal-700">
            The work draws from a love of texture, repetition, useful objects,
            and the kind of making that asks for patience. The studio language
            is practical, tactile, and quietly expressive rather than flashy.
          </p>
        </div>

        <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
            Why crochet leads
          </p>
          <p className="mt-4 text-base leading-8 text-charcoal-700">
            Crochet offers structure and freedom at once. It can be sculptural,
            geometric, soft, or architectural, and it gives the practice a
            strong visual identity to build the rest of the brand around.
          </p>
        </div>

        <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
            The name
          </p>
          <p className="mt-4 text-base leading-8 text-charcoal-700">
            Threaded Olive suggests something both tailored and playful: olives
            skewered onto a needle like a martini garnish. It balances craft,
            elegance, and a little wit without tipping into novelty.
          </p>
        </div>
      </div>

      <div className="grid gap-8 rounded-[2.5rem] border border-olive-900/10 bg-olive-900 p-8 text-linen-0 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
            Exploring multiple crafts
          </p>
          <p className="text-lg leading-9">
            Sewing, knitting, embroidery, and needlepoint are not side notes.
            They broaden the studio’s point of view and create space for
            comparison, experimentation, and future crossover projects.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
            What the site is for
          </p>
          <p className="text-lg leading-9">
            This first version is a portfolio and journal, not a storefront. It
            is designed to showcase projects beautifully while preserving the
            stories, materials, mistakes, and lessons that make them personal.
          </p>
        </div>
      </div>
    </section>
  );
}
