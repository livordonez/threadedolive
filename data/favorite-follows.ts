export type FavoriteFollow = {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
  handle?: string;
  youtubeChannelId?: string;
};

export const favoriteFollows: FavoriteFollow[] = [
  {
    name: "Syd Graham",
    url: "https://www.youtube.com/@HiSydGraham",
    avatar: "/images/creators/syd-graham.jpg",
    description: "Patterns, photography, and a quietly personal approach to making.",
    youtubeChannelId: "UCeD1USYxuRnh3yfiydz6cTQ",
  },
  {
    name: "Bethany Ciotola",
    url: "https://www.instagram.com/bethanyciotola/?hl=en",
    avatar: "/images/creators/bethany-ciotola.jpg",
    description: "A favorite source of everyday visual inspiration.",
  },
];
