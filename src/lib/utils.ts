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

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = new Intl.DateTimeFormat(undefined, { month: "long" }).format(
    date,
  );
  const day = date.getDate();
  return `${month} ${getOrdinal(day)}`;
};

export const normalizeURLPath = (path?: string) => {
  if (!path) return "";
  return path === "/" ? "/" : path.replace(/\/$/, "");
};

export const isURLExternal = (url?: string) =>
  url?.startsWith("http://") || url?.startsWith("https://");
