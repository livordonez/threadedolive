import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextValue } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-olive-900 sm:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-3xl leading-none tracking-[-0.04em] text-olive-900">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-olive-900/15 pl-4 italic text-charcoal-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={typeof value?.href === "string" ? value.href : "#"}
        className="text-olive-700 underline decoration-olive-900/25 underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  hardBreak: () => <br />,
};

export function PortableTextContent({
  value,
  className = "rich-text",
}: {
  value?: PortableTextValue | null;
  className?: string;
}) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
