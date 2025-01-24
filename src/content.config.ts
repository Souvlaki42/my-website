import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/blog" }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()),
      created: z.date(),
      modified: z.date()
    })
  })
};
