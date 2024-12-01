import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    createdDate: z.string(),
    modifiedDate: z.string()
  })
});

export const collections = {
  blog: blogCollection
};
