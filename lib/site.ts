import type { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "The Threaded Olive",
  tagline: "Things I make, wear, read & love.",
  description:
    "A personal creative journal about making things, getting dressed, reading, and everything around it.",
  url: "https://threadedolive.vercel.app",
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
