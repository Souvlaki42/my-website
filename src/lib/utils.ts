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

export const TOP_BANNER_OPTIONS = {
  DISABLED: undefined,
  MAINTENANCE:
    "This site is currently under maintenance. Please wait for a while.",
  CONSTRUCTION:
    "This site is currently under construction. Big things may come.",
};

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const formatOrdinalDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = new Intl.DateTimeFormat(undefined, { month: "long" }).format(
    date,
  );
  const day = date.getDate();
  return `${month} ${getOrdinal(day)}`;
};

export const formatDate = (input: Date | string | number): string => {
  return new Date(input).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const normalizeURLPath = (path?: string) => {
  if (!path) return "";
  return path === "/" ? "/" : path.replace(/\/$/, "");
};

export const isURLExternal = (url?: string) =>
  url?.startsWith("http://") || url?.startsWith("https://");

export const objectKeys = <Obj extends Record<any, any>>(
  obj: Obj,
): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

const fuseKeys = ["title", "summary", "tags"] as const;

export type FuseKey = (typeof fuseKeys)[number];

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

export const compareAndFormatDates = (
  ...inputs: (Date | string | number)[]
) => {
  const formatted = inputs.map((date) => formatDate(date));
  const equal = formatted.every((date) => date === formatted[0]);
  return [equal, formatted] as const;
};
