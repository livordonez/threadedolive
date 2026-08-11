export type FavoriteFollow = {
  name: string;
  platform: "Instagram" | "YouTube" | "Website";
  url: string;
  image?: string;
  description?: string;
};

export const favoriteFollows: FavoriteFollow[] = [
  {
    name: "Syd Graham",
    platform: "YouTube",
    url: "https://www.youtube.com/@HiSydGraham",
    description: "Patterns, photography, and a quietly personal approach to making.",
  },
  {
    name: "Bethany Ciotola",
    platform: "Instagram",
    url: "https://www.instagram.com/bethanyciotola/?hl=en",
    description: "A favorite source of everyday visual inspiration.",
  },
];
