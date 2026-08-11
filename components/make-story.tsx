import Image from "next/image";
import Link from "next/link";
import { FabricSwatch } from "@/components/textile-details";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/ui-icons";
import type { Make } from "@/lib/cms-types";

type ProjectDetail = {
  label: string;
  value: string;
};

function formatCompletionDate(value: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function getProjectDetails(make: Make): ProjectDetail[] {
  return [
    { label: "The pattern", value: make.pattern },
    { label: "By", value: make.pattern_designer },
    { label: "What I used", value: make.materials },
    { label: "Size / tools", value: make.tool_size },
    { label: "Changes I made", value: make.modifications },
    { label: "Finished", value: formatCompletionDate(make.completion_date) },
  ].filter((detail) => detail.value);
}

function ProjectDetails({
  details,
  patternLink,
  swatchImage,
}: {
  details: ProjectDetail[];
  patternLink: string;
  swatchImage: Make["images"][number] | undefined;
}) {
  return (
    <section className="mt-16 border-y border-olive-900/15 py-10 sm:py-12 lg:mt-20">
      <div className="grid gap-9 md:grid-cols-[10rem_minmax(0,1fr)] md:items-start lg:gap-14">
        <FabricSwatch image={swatchImage} label="A closer look" />
        <div>
          <p className="stitch-label text-pimento-700">The details</p>
          <h2 className="mt-2 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] text-olive-900 sm:text-5xl">
            What I used &amp; changed
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="border-t border-olive-900/10 pt-4">
                <dt className="stitch-label text-pimento-700">{detail.label}</dt>
                <dd className="mt-2 whitespace-pre-line text-lg leading-7 text-charcoal-700">
                  {detail.value}
                </dd>
              </div>
            ))}
            {patternLink ? (
              <div className="border-t border-olive-900/10 pt-4">
                <dt className="stitch-label text-pimento-700">Online</dt>
                <dd className="mt-2">
                  <a
                    href={patternLink}
                    className="font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
                  >
                    <span className="inline-flex items-center gap-1.5">Go to pattern <ExternalLinkIcon /></span>
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function MakeStory({ make, isPreview = false }: { make: Make; isPreview?: boolean }) {
  const [mainImage, ...secondaryImages] = make.images;
  const details = getProjectDetails(make);
  const hasProjectDetails = Boolean(details.length || make.pattern_link);
  const swatchImage = hasProjectDetails ? secondaryImages[0] : undefined;
  const gallery = hasProjectDetails ? secondaryImages.slice(1) : secondaryImages;

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
      {isPreview ? (
        <p className="mb-6 rounded-xl bg-brass-100 px-4 py-3 font-semibold text-olive-900">
          Private draft preview
        </p>
      ) : null}

      <Link
        href="/makes"
        className="stitch-label text-olive-700 underline decoration-olive-700/25 underline-offset-4"
      >
        <span className="inline-flex items-center gap-1.5"><ArrowLeftIcon /> Back to Makes</span>
      </Link>

      <header className="mt-8 grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-14">
        <div className="max-w-2xl lg:pb-6">
          {make.craft_type ? (
            <p className="stitch-label text-pimento-700">{make.craft_type}</p>
          ) : null}
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-olive-900 sm:text-7xl lg:text-[4.75rem] xl:text-[5.5rem]">
            {make.title}
          </h1>
        </div>

        <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-olive-100">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || make.title}
              fill
              preload
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          ) : (
            <div className="bright-textile-placeholder grid h-full place-items-center p-8 text-center font-semibold text-olive-900">
              <span className="rounded-full bg-linen-0/85 px-5 py-3">Photo coming soon</span>
            </div>
          )}
        </div>
      </header>

      {make.story ? (
        <section className="mt-16 grid gap-6 border-t border-olive-900/15 pt-10 lg:mt-20 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12 lg:pt-12">
          <div>
            <p className="stitch-label text-pimento-700">A little background</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.025em] text-olive-900">
              About this make
            </h2>
          </div>
          <p className="max-w-[var(--content-reading)] whitespace-pre-line text-xl leading-9 text-charcoal-700">
            {make.story}
          </p>
        </section>
      ) : null}

      {hasProjectDetails ? (
        <ProjectDetails
          details={details}
          patternLink={make.pattern_link}
          swatchImage={swatchImage}
        />
      ) : null}

      {gallery.length ? (
        <section aria-label="More photos" className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {gallery.map((image, index) => (
            <div
              key={image.path}
              className={`relative overflow-hidden rounded-[1.5rem] bg-olive-100 ${
                index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </section>
      ) : null}

      {make.process_notes || make.lessons ? (
        <section className="mt-16 grid gap-10 border-t border-olive-900/15 pt-12 md:grid-cols-2 lg:mt-20 lg:gap-16">
          {make.process_notes ? (
            <div>
              <p className="stitch-label text-pimento-700">A few notes</p>
              <h2 className="mt-2 font-serif text-3xl text-olive-900">While I was making it</h2>
              <p className="mt-4 max-w-[var(--content-reading)] whitespace-pre-line text-lg leading-8 text-charcoal-700">
                {make.process_notes}
              </p>
            </div>
          ) : null}
          {make.lessons ? (
            <div>
              <p className="stitch-label text-pimento-700">For next time</p>
              <h2 className="mt-2 font-serif text-3xl text-olive-900">What I learned</h2>
              <p className="mt-4 max-w-[var(--content-reading)] whitespace-pre-line text-lg leading-8 text-charcoal-700">
                {make.lessons}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}
