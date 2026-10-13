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

export const formatDate = (
  input: string,
  locale?: Intl.LocalesArgument | null,
) => {
  if (typeof Temporal == "undefined") {
    return new Date(input).toLocaleDateString(locale ?? undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
  } else {
    return Temporal.ZonedDateTime.from(input).toLocaleString(locale ?? undefined, { day: "2-digit", month: "2-digit", year: "numeric", timeStyle: "short" });
  }
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

export const injectLinksTransformer = (html: string) => {
  let hasLinks = false;
  const output = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text?: string, href?: string) => {
      hasLinks = true;
      const isExternal = isURLExternal(href);
      const accessibility = isExternal
        ? `target="_blank" rel="noopener noreferrer"><span class="sr-only">Opens in a new tab</span>`
        : ">";
      return `<a href="${href ?? "#"}" class="hover:underline text-sky-blue hover:text-light-blue" ${accessibility}${text ?? "No content"}</a>`;
    },
  );

  if (hasLinks) {
    return output.replace(/tabindex="0"/g, 'tabindex="-1"');
  }

  return output;
};