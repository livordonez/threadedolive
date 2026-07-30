import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlexibleSections } from "@/components/flexible-sections";
import { SanityImage } from "@/components/sanity-image";
import { buildMetadata } from "@/lib/site";
import { getFlexiblePageBySlug } from "@/sanity/lib/loaders";

type FlexiblePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: FlexiblePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getFlexiblePageBySlug(slug);

  if (!page) {
    return buildMetadata({
      title: "Page not found",
      path: "/",
    });
  }

  return buildMetadata({
    title: page.pageTitle,
    description:
      page.introductoryText ||
      `Flexible page content for ${page.pageTitle} on Threaded Olive.`,
    path: `/${page.slug}`,
  });
}

export default async function FlexiblePageRoute({ params }: FlexiblePageProps) {
  const { slug } = await params;
  const page = await getFlexiblePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
      <div className="space-y-5">
        <h1 className="font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
          {page.pageTitle}
        </h1>
        {page.introductoryText ? (
          <p className="max-w-3xl whitespace-pre-line text-lg leading-9 text-charcoal-700">
            {page.introductoryText}
          </p>
        ) : null}
      </div>

      {page.featuredImage ? (
        <SanityImage
          image={page.featuredImage}
          alt={`${page.pageTitle} featured image`}
          label={page.pageTitle}
          aspect="wide"
          priority
        />
      ) : null}

      <FlexibleSections sections={page.sections} pageTitle={page.pageTitle} />
    </section>
  );
}
