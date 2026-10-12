import type { HTMLAttributes, HTMLTag } from "astro/types";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import Fuse from "fuse.js";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type HTMLAtrributesWithSlot<Tag extends HTMLTag> = Omit<
  HTMLAttributes<Tag>,
  "children"
>;

export const getParsedAcceptLangs = (header?: string | null) => {
  const pairs = header?.split(",") ?? [];
  const result: [string, string][] = [] as const;
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(";");
    if (pair.length == 1) result.push([pair[0], "1"]);
    else result.push([pair[0], pair[1].split("=")[1]]);
  }
  return result;
};

// TASK(20261011-202153): adopt temporal api
export const compareAndFormatDates = (
  locale?: Intl.LocalesArgument | null,
  ...inputs: Date[]
) => {
  const formatted = inputs.map((date) =>
    date.toLocaleDateString(locale ?? undefined),
  );
  const equal = formatted.every((date) => date === formatted[0]);
  return [equal, ...formatted] as const;
};

export const normalizeURLPath = (path?: string) => {
  if (!path) return "";
  return path === "/" ? "/" : path.replace(/\/$/, "");
};

export const isURLExternal = (url?: string) =>
  url?.startsWith("http://") ||
  url?.startsWith("https://") ||
  url?.startsWith("mailto:");

const fuseKeys = ["title", "summary", "tags"] as const;

export type FuseKey = (typeof fuseKeys)[number];

// TASK(20261011-201928): fix search system
export const makeFuseInstances = <T>(data: T[]): Record<FuseKey, Fuse<T>> => {
  const instances: Record<string, Fuse<T>> = {};
  const keys: Record<FuseKey, { name: FuseKey; weight: number }[]> = {
    title: [
      { name: "title", weight: 1 },
      { name: "summary", weight: 0.7 },
      { name: "tags", weight: 0.5 },
    ],
    summary: [
      { name: "summary", weight: 1 },
      { name: "tags", weight: 0.7 },
      { name: "title", weight: 0.3 },
    ],
    tags: [{ name: "tags", weight: 1 }],
  };

  fuseKeys.forEach((key) => {
    instances[key] = new Fuse<T>(data, {
      includeScore: true,
      shouldSort: true,
      threshold: 0.5,
      keys: keys[key],
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
  promise?: Promise<T> | null,
): Promise<[null, T] | [E, null]> => {
  if (!promise) {
    const error = new Error("Got an empty promise!");
    return [error as E, null];
  }
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err as E, null];
  }
};
