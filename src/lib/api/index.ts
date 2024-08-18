import { defineAction, z } from "astro:actions";
import { getEntry } from "astro:content";
import { getPosts } from "./getPosts";
import { getProjects } from "./getProjects";

export default {
  getPost: defineAction({
    input: z.object({ slug: z.string().min(1, "Slug is required!") }),
    handler: async (input) => {
      const post = await getEntry("blog", input.slug);
      return post;
    }
  }),
  getPosts,
  getProjects
};
