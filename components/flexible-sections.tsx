import { PortableTextContent } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import type { FlexibleSection } from "@/sanity/lib/types";

function hasTextValue(value?: string | null) {
  return Boolean(value?.trim());
}

export function FlexibleSections({
  sections,
  pageTitle,
}: {
  sections: FlexibleSection[];
  pageTitle: string;
}) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        switch (section._type) {
          case "richTextSection":
            return (
              <section key={section._key} className="space-y-5">
                {hasTextValue(section.title) ? (
                  <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                <PortableTextContent value={section.body} />
              </section>
            );
          case "imageSection":
            return (
              <section key={section._key} className="space-y-5">
                {hasTextValue(section.title) ? (
                  <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                <SanityImage
                  image={section.image}
                  alt={`${pageTitle} image section ${index + 1}`}
                  label={section.title || `${pageTitle} image`}
                  aspect="landscape"
                />
                {hasTextValue(section.caption) ? (
                  <p className="text-sm leading-7 text-charcoal-700">
                    {section.caption}
                  </p>
                ) : null}
              </section>
            );
          case "imageGallerySection":
            return (
              <section key={section._key} className="space-y-5">
                {hasTextValue(section.title) ? (
                  <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {section.images.map((image, imageIndex) => (
                    <SanityImage
                      key={`${section._key}-${imageIndex}`}
                      image={image}
                      alt={`${pageTitle} gallery image ${imageIndex + 1}`}
                      label={`${section.title || pageTitle} gallery`}
                      aspect={imageIndex === 0 ? "portrait" : "landscape"}
                    />
                  ))}
                </div>
                {hasTextValue(section.caption) ? (
                  <p className="text-sm leading-7 text-charcoal-700">
                    {section.caption}
                  </p>
                ) : null}
              </section>
            );
          case "linkListSection":
            return (
              <section key={section._key} className="space-y-5">
                {hasTextValue(section.title) ? (
                  <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                <ul className="grid gap-4 md:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item._key}>
                      <a
                        href={item.url}
                        className="flex h-full items-center justify-between rounded-[1.5rem] border border-olive-900/10 bg-white/78 px-5 py-4 text-base font-semibold text-olive-900 transition-colors hover:bg-white"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal-700">
                          Visit
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "simpleItemGridSection":
            return (
              <section key={section._key} className="space-y-5">
                {hasTextValue(section.title) ? (
                  <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                <div className="grid gap-6 md:grid-cols-2">
                  {section.items.map((item) => {
                    const content = (
                      <div className="space-y-3">
                        <h3 className="font-serif text-3xl leading-none tracking-[-0.04em] text-olive-900">
                          {item.title}
                        </h3>
                        {hasTextValue(item.subtitle) ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pimento-700">
                            {item.subtitle}
                          </p>
                        ) : null}
                        {hasTextValue(item.description) ? (
                          <p className="text-base leading-8 text-charcoal-700">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    );

                    return item.url ? (
                      <a
                        key={item._key}
                        href={item.url}
                        className="rounded-[2rem] border border-olive-900/10 bg-white/82 p-6 shadow-[0_24px_60px_rgba(37,33,29,0.05)] transition-colors hover:bg-white"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={item._key}
                        className="rounded-[2rem] border border-olive-900/10 bg-white/82 p-6 shadow-[0_24px_60px_rgba(37,33,29,0.05)]"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
