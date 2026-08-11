import assert from "node:assert/strict";
import test from "node:test";
import { parseGoodreadsFeed } from "../lib/integrations/goodreads";
import { parsePinterestFeed } from "../lib/integrations/pinterest";
import { creatorHandle, detectCreatorPlatform, parseYouTubeFeed } from "../lib/integrations/creators";

test("normalizes Pinterest RSS and removes duplicate images", () => {
  const xml = `<rss><channel>
    <item><title>Olive &amp; linen</title><link>https://www.pinterest.com/pin/1/</link><description>&lt;img src=&quot;https://i.pinimg.com/236x/a/b/c.jpg&quot;&gt;</description><pubDate>Tue, 11 Aug 2026 12:00:00 GMT</pubDate></item>
    <item><title>Duplicate</title><link>https://www.pinterest.com/pin/2/</link><description>&lt;img src=&quot;https://i.pinimg.com/236x/a/b/c.jpg&quot;&gt;</description></item>
  </channel></rss>`;

  assert.deepEqual(parsePinterestFeed(xml), [
    {
      image: "https://i.pinimg.com/736x/a/b/c.jpg",
      sourceUrl: "https://www.pinterest.com/pin/1/",
      title: "Olive & linen",
      alt: "Olive & linen",
      publishedAt: "Tue, 11 Aug 2026 12:00:00 GMT",
    },
  ]);
});

test("normalizes Goodreads currently-reading RSS", () => {
  const xml = `<rss><channel><item>
    <title><![CDATA[Outlander (Outlander, #1)]]></title>
    <link><![CDATA[https://www.goodreads.com/review/show/1]]></link>
    <book_large_image_url><![CDATA[https://i.gr-assets.com/cover.jpg]]></book_large_image_url>
    <author_name>Diana Gabaldon</author_name>
    <user_date_added><![CDATA[Sun, 09 Aug 2026 17:26:30 -0700]]></user_date_added>
  </item></channel></rss>`;

  assert.deepEqual(parseGoodreadsFeed(xml), [
    {
      title: "Outlander (Outlander, #1)",
      author: "Diana Gabaldon",
      cover: "https://i.gr-assets.com/cover.jpg",
      goodreadsUrl: "https://www.goodreads.com/review/show/1",
      dateStarted: "Sun, 09 Aug 2026 17:26:30 -0700",
    },
  ]);
});

test("derives creator platforms and handles from profile URLs", () => {
  assert.equal(detectCreatorPlatform("https://www.youtube.com/@HiSydGraham"), "YouTube");
  assert.equal(creatorHandle("https://www.youtube.com/@HiSydGraham", "YouTube"), "@HiSydGraham");
  assert.equal(detectCreatorPlatform("https://www.instagram.com/bethanyciotola/"), "Instagram");
  assert.equal(creatorHandle("https://www.instagram.com/bethanyciotola/", "Instagram"), "@bethanyciotola");
  assert.equal(detectCreatorPlatform("https://vm.tiktok.com/ZMexample/"), "TikTok");
  assert.equal(creatorHandle("https://www.tiktok.com/@threadedolive", "TikTok"), "@threadedolive");
  assert.equal(creatorHandle("https://www.tiktok.com/t/ZMexample/", "TikTok"), undefined);
  assert.equal(detectCreatorPlatform("https://example.com/liv"), "Website");
});

test("normalizes the latest entry from a YouTube channel feed", () => {
  const xml = `<feed><entry><yt:videoId>abc123</yt:videoId><title>Sewing &amp; crochet</title></entry></feed>`;
  assert.deepEqual(parseYouTubeFeed(xml), {
    title: "Sewing & crochet",
    url: "https://www.youtube.com/watch?v=abc123",
    image: "https://i.ytimg.com/vi/abc123/hqdefault.jpg",
  });
});
