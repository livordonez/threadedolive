import type { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "Threaded Olive",
  tagline: "Things I make, wear, read & love.",
  description:
    "A personal creative journal about making things, getting dressed, reading, and everything around it.",
  url: "https://threadedolive.example",
  email: "hello@threadedolive.example",
  nav: [
    { href: "/", label: "Home" },
    { href: "/makes", label: "Makes" },
    { href: "/muses", label: "Muses" },
    { href: "/moments", label: "Moments" },
    { href: "/about", label: "About" },
  ],
  socials: [
    {
      href: "https://example.com/threaded-olive-instagram",
      label: "Instagram placeholder",
    },
    {
      href: "https://example.com/threaded-olive-pinterest",
      label: "Pinterest placeholder",
    },
    {
      href: "mailto:hello@threadedolive.example",
      label: "Email placeholder",
    },
  ],
  contactTopics: [
    "Questions about techniques or materials",
    "Collaborations and editorial conversations",
    "General notes from fellow makers",
    "Future commission inquiries",
  ],
  futureFormSteps: [
    "Choose a form service such as Formspree, Basin, or a custom Next.js route.",
    "Replace the placeholder submit button with a real POST target.",
    "Add spam protection and a success/error state before going live.",
  ],
  analyticsPlaceholderEnv: "NEXT_PUBLIC_ANALYTICS_ID",
} as const;

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  category: "personal blog",
};

export const rootViewport: Viewport = {
  themeColor: "#344d38",
  colorScheme: "light",
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const resolvedTitle = title ?? siteConfig.name;
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: resolvedDescription,
      url: resolvedUrl,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: ["/twitter-image"],
    },
  };
}
