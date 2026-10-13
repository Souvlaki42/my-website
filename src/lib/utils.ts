import type { HTMLAttributes, HTMLTag } from "astro/types";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
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
