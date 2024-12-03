import Fuse from "fuse.js";

export type SocialShareProps = {
  url?: string;
  title?: string;
  description?: string;
  via?: string;
};

export const AppConfig = {
  author: "Souvlaki42",
  title: "Souvlaki42",
  description: "My corner of the internet",
  image: "opengraph.jpg", // this will be used as the default social preview image
  twitter: "@souvlaki42",
  site:
    process.env.NODE_ENV === "production"
      ? "https://souvlaki.me/"
      : "http://localhost:4321" // this is your website URL
};

export type HeadProps = {
  title?: string;
  description?: string;
  image?: string;
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

export const removeDuplicates = (array: string[]) => {
  return [...new Set(array.map((item) => item.toLowerCase()))];
};

export const safeAwait = async <T, E = Error>(
  promise: Promise<T>
): Promise<[null, T] | [E, null]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err as E, null];
  }
};
