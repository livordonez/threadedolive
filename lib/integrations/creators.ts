import type { FavoriteFollow } from "@/data/favorite-follows";
import { decodeXml } from "@/lib/integrations/rss";

export type CreatorPlatform = "Instagram" | "YouTube" | "TikTok" | "Pinterest" | "Website";

export type LatestCreatorPost = {
  title: string;
  url: string;
  image: string;
};

export type CreatorCardData = FavoriteFollow & {
  platform: CreatorPlatform;
  resolvedHandle?: string;
  latestPost?: LatestCreatorPost;
};

export function detectCreatorPlatform(value: string): CreatorPlatform {
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    const belongsTo = (domain: string) => host === domain || host.endsWith(`.${domain}`);
    if (belongsTo("youtube.com") || host === "youtu.be") return "YouTube";
    if (belongsTo("instagram.com")) return "Instagram";
    if (belongsTo("tiktok.com")) return "TikTok";
    if (belongsTo("pinterest.com")) return "Pinterest";
  } catch {
    return "Website";
  }
  return "Website";
}

export function creatorHandle(value: string, platform: CreatorPlatform) {
  try {
    const segments = new URL(value).pathname.split("/").filter(Boolean);
    const segment = segments[0];
    if (!segment) return undefined;
    if (platform === "YouTube" && segment.startsWith("@")) return segment;
    if (platform === "TikTok") {
      const profile = segments.find((part) => part.startsWith("@"));
      return profile || undefined;
    }
    if (["Instagram", "Pinterest"].includes(platform)) return `@${segment.replace(/^@/, "")}`;
  } catch {
    return undefined;
  }
  return undefined;
}

export function parseYouTubeFeed(xml: string): LatestCreatorPost | undefined {
  const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/i)?.[1];
  if (!entry) return undefined;
  const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i)?.[1]?.trim();
  const title = entry.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (!videoId || !title) return undefined;

  return {
    title: decodeXml(title.trim()),
    url: `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
    image: `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`,
  };
}

async function getLatestYouTubePost(channelId: string) {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
      { next: { revalidate: 21_600, tags: [`creator-youtube-${channelId}`] } },
    );
    if (!response.ok) return undefined;
    return parseYouTubeFeed(await response.text());
  } catch {
    return undefined;
  }
}

export async function getCreatorCards(follows: FavoriteFollow[]): Promise<CreatorCardData[]> {
  return Promise.all(
    follows.map(async (follow) => {
      const platform = detectCreatorPlatform(follow.url);
      return {
        ...follow,
        platform,
        resolvedHandle: follow.handle || creatorHandle(follow.url, platform),
        latestPost:
          platform === "YouTube" && follow.youtubeChannelId
            ? await getLatestYouTubePost(follow.youtubeChannelId)
            : undefined,
      };
    }),
  );
}
