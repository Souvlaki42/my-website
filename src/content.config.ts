import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content" }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()),
      created: z.string(),
      modified: z.string(),
    }),
  }),
};
