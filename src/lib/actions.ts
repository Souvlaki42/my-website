import { defineAction, z } from "astro:actions";
import { getCollection, getEntry } from "astro:content";

export const server = {
  getPosts: defineAction({
    accept: "json",
    input: z.object({
      searchQuery: z.string().optional(),
      page: z.number().default(0),
      perPage: z.number().default(12),
    }),
    handler: async (input) => {
      const { searchQuery, page, perPage } = input;
      let posts = await getCollection("blog");
      posts = posts.sort((a, b) => {
        return (
          new Date(b.data.modifiedDate).getTime() -
          new Date(a.data.modifiedDate).getTime()
        );
      });

      if (page === 0) {
        return { posts, hasNext: undefined, hasPrevious: undefined };
      } else if (page > 0) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const entries = posts.slice(start, end);
        return {
          posts: entries,
          hasNext: end < posts.length,
          hasPrevious: start > 0,
        };
      } else {
        throw new Error(
          "Something went wrong. Page should be greater or equal to 0.",
        );
      }
    },
  }),
  getPost: defineAction({
    accept: "json",
    input: z.object({ slug: z.string().min(1, "Slug is required!") }),
    handler: async (input) => {
      const post = await getEntry("blog", input.slug);
      return post;
    },
  }),
};
