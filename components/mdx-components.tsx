import Link from "next/link";
import type { PlaceholderTone } from "@/lib/types";
import { MediaPlaceholder } from "@/components/media-placeholder";

function InlineImage({
  label,
  caption,
  tone = "linen",
  alt,
}: {
  label: string;
  caption?: string;
  tone?: PlaceholderTone;
  alt?: string;
}) {
  return (
    <figure className="my-10">
      <MediaPlaceholder
        image={{
          label,
          alt: alt ?? label,
          tone,
        }}
        aspect="landscape"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm italic text-charcoal-700">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents = {
  InlineImage,
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className="font-semibold text-olive-700 underline decoration-olive-700/35 underline-offset-4">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-olive-700 underline decoration-olive-700/35 underline-offset-4"
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="border-none border-t border-olive-900/10" />,
};
