import { rssItems, rssValue } from "@/lib/integrations/rss";

export type Pin = {
  image: string;
  sourceUrl: string;
  title: string;
  alt: string;
  publishedAt?: string;
};

const DEFAULT_FEED = "https://www.pinterest.com/liv_ordonez/feed.rss";
const FALLBACK_ALT = "A recent inspiration saved by Liv";

function largerPinterestImage(url: string) {
  return url.replace("/236x/", "/736x/");
}

export function parsePinterestFeed(xml: string, limit = 9): Pin[] {
  const seen = new Set<string>();
  const pins: Pin[] = [];

  for (const item of rssItems(xml)) {
    const description = rssValue(item, "description");
    const image = description.match(/<img\s[^>]*src=["']([^"']+)["']/i)?.[1];
    const title = rssValue(item, "title").replace(/\s+/g, " ").trim();
    const sourceUrl = rssValue(item, "link");

    if (!image || !sourceUrl) continue;
    const normalizedImage = largerPinterestImage(image);
    if (seen.has(normalizedImage)) continue;
    seen.add(normalizedImage);

    pins.push({
      image: normalizedImage,
      sourceUrl,
      title,
      alt: title || FALLBACK_ALT,
      publishedAt: rssValue(item, "pubDate") || undefined,
    });
    if (pins.length === limit) break;
  }

  return pins;
}

export async function getRecentPins(): Promise<Pin[]> {
  const feedUrl = process.env.MUSES_PINTEREST_RSS_URL || DEFAULT_FEED;

  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
      next: { revalidate: 21_600, tags: ["muses-pinterest"] },
    });
    if (!response.ok) return [];
    return parsePinterestFeed(await response.text());
  } catch {
    return [];
  }
}
