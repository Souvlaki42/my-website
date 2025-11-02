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
