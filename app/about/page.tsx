import Image from "next/image";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getAbout } from "@/lib/cms-data";

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <EditorialPageHeader eyebrow="About" title="A Bit About Myself" />

      <div className={`mt-12 grid gap-10 ${about.images.length ? "lg:grid-cols-[0.9fr_1.1fr]" : "max-w-3xl"}`}>
        {about.images.length ? (
          <div>
            <div className={`grid gap-4 ${about.images.length > 1 ? "grid-cols-2" : ""}`}>
              {about.images.map((image, index) => (
                <div
                  key={image.path}
                  className={`relative overflow-hidden rounded-[1.75rem] bg-olive-100 ${
                    index === 0 ? "aspect-[4/5]" : "mt-10 aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    preload={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={`space-y-10 ${about.images.length ? "lg:pt-8" : ""}`}>
          <section>
            <h2 className="font-serif text-3xl text-olive-900">Hi, I’m Liv</h2>
            {about.bio ? (
              <p className="mt-4 whitespace-pre-line text-xl leading-9 text-charcoal-700">
                {about.bio}
              </p>
            ) : (
              <p className="mt-4 max-w-xl text-xl leading-9 text-charcoal-700">
                This is where I keep notes on what I’m making, wearing, reading, and loving lately.
              </p>
            )}
          </section>

          {about.story ? (
            <section>
              <h2 className="font-serif text-3xl text-olive-900">How The Threaded Olive Started</h2>
              <p className="mt-4 whitespace-pre-line text-xl leading-9 text-charcoal-700">
                {about.story}
              </p>
            </section>
          ) : null}

          {about.instagram_url || about.pinterest_url ? (
            <section>
              <p className="stitch-label text-pimento-700">Elsewhere</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {about.instagram_url ? (
                  <a href={about.instagram_url} target="_blank" rel="noreferrer" className="font-semibold text-olive-700 underline underline-offset-4">
                    Instagram
                  </a>
                ) : null}
                {about.pinterest_url ? (
                  <a href={about.pinterest_url} target="_blank" rel="noreferrer" className="font-semibold text-olive-700 underline underline-offset-4">
                    Pinterest
                  </a>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
