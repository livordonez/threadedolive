import type { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "Threaded Olive",
  tagline: "Handmade slowly. Threaded thoughtfully.",
  description:
    "A handmade archive for thoughtful fiber projects, stories behind the make, and evolving studio pages.",
  url: "https://threadedolive.example",
  defaultNavigation: [
    { href: "/", label: "Home", order: 0 },
    { href: "/about", label: "About", order: 10 },
  ],
  placeholderInstagramUrl: "https://instagram.com/threadedolive",
  placeholderPinterestUrl: "https://pinterest.com/threadedolive",
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
        alt: `${siteConfig.name} portfolio preview`,
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
  category: "portfolio",
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
