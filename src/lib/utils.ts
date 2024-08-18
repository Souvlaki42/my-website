import Fuse from "fuse.js";

export const AppConfig = {
  author: "Souvlaki42",
  title: "Souvlaki42",
  description: "My corner of the internet",
  image: "/social.png", // this will be used as the default social preview image
  twitter: "@souvlaki42",
  site:
    import.meta.env.MODE === "production"
      ? "https://souvlaki.me/"
      : "http://localhost:4321" // this is your website URL
};

const fuseKeys = ["title", "summary", "tags"] as const;

export type FuseKey = (typeof fuseKeys)[number];

export const makeFuseInstances = <T>(data: T[]): Record<FuseKey, Fuse<T>> => {
  const instances: Record<string, Fuse<T>> = {};
  const keys: Record<FuseKey, { name: FuseKey; weight: number }[]> = {
    title: [
      { name: "title", weight: 1 },
      { name: "summary", weight: 0.7 },
      { name: "tags", weight: 0.5 }
    ],
    summary: [
      { name: "summary", weight: 1 },
      { name: "tags", weight: 0.7 },
      { name: "title", weight: 0.3 }
    ],
    tags: [{ name: "tags", weight: 1 }]
  };

  fuseKeys.forEach((key) => {
    instances[key] = new Fuse<T>(data, {
      includeScore: true,
      shouldSort: true,
      threshold: 0.5,
      keys: keys[key]
    });
  });

  return instances;
};

export const isFuseKey = (key: string): key is FuseKey => {
  return fuseKeys.some((fuseKey) => fuseKey === key);
};
