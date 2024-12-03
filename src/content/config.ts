import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      tags: z.array(z.string()),
      createdDate: z.string(),
      modifiedDate: z.string()
    })
  })
};
