import { rssItems, rssValue } from "@/lib/integrations/rss";

export type ReadingBook = {
  title: string;
  author: string;
  cover?: string;
  goodreadsUrl: string;
  dateStarted?: string;
};

const DEFAULT_USER_ID = "173773167";

export function parseGoodreadsFeed(xml: string): ReadingBook[] {
  const books: ReadingBook[] = [];

  for (const item of rssItems(xml)) {
    const title = rssValue(item, "title");
    const author = rssValue(item, "author_name");
    const reviewUrl = rssValue(item, "link");
    if (!title || !author || !reviewUrl) continue;

    books.push({
      title,
      author,
      cover:
        rssValue(item, "book_large_image_url") ||
        rssValue(item, "book_medium_image_url") ||
        undefined,
      goodreadsUrl: reviewUrl,
      dateStarted: rssValue(item, "user_date_added") || undefined,
    });
  }

  return books;
}

export async function getCurrentlyReading(): Promise<ReadingBook[]> {
  const userId = process.env.MUSES_GOODREADS_USER_ID || DEFAULT_USER_ID;
  const feedUrl = `https://www.goodreads.com/review/list_rss/${encodeURIComponent(userId)}?shelf=currently-reading`;

  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
      next: { revalidate: 3_600, tags: ["muses-goodreads"] },
    });
    if (!response.ok) return [];
    return parseGoodreadsFeed(await response.text());
  } catch {
    return [];
  }
}
