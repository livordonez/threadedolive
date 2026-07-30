import { LinkButton } from "@/components/link-button";
import { PortableTextContent } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { Pill } from "@/components/pill";
import { buildMetadata } from "@/lib/site";
import { getAboutPage } from "@/sanity/lib/loaders";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Read the editable About page for Threaded Olive and update it through Sanity Studio.",
  path: "/about",
});

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <Pill tone="pimento">About Threaded Olive</Pill>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
            An editable studio introduction, grounded in the work.
          </h1>
          {aboutPage.introductoryText ? (
            <p className="max-w-2xl whitespace-pre-line text-lg leading-9 text-charcoal-700">
              {aboutPage.introductoryText}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <LinkButton href="/">See the makes</LinkButton>
            <LinkButton href="/studio" variant="outline">
              Edit in Studio
            </LinkButton>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SanityImage
            image={aboutPage.photos[0]}
            alt="Primary about page photo"
            label="About photo"
            aspect="portrait"
            className="sm:col-span-2"
          />
          {aboutPage.photos[1] ? (
            <SanityImage
              image={aboutPage.photos[1]}
              alt="Secondary about page photo"
              label="Secondary about photo"
              aspect="landscape"
              className="sm:col-span-2 lg:col-span-1"
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] border border-olive-900/10 bg-white/80 p-7 shadow-[0_24px_60px_rgba(37,33,29,0.05)] sm:p-8">
          <PortableTextContent value={aboutPage.brandStory} />
        </div>

        <aside className="space-y-6">
          {aboutPage.instagramUrl ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Instagram
              </p>
              <a
                href={aboutPage.instagramUrl}
                className="mt-4 block text-base font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
              >
                {aboutPage.instagramUrl}
              </a>
            </div>
          ) : null}

          {aboutPage.pinterestUrl ? (
            <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
                Pinterest
              </p>
              <a
                href={aboutPage.pinterestUrl}
                className="mt-4 block text-base font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
              >
                {aboutPage.pinterestUrl}
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
