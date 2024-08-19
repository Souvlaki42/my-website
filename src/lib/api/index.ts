import { defineAction, z } from "astro:actions";
import { getEntry } from "astro:content";
import { getPosts } from "./getPosts";
import { getProjects } from "./getProjects";
import { removeDuplicates } from "../utils";
import { getNow } from "./getNow";

export default {
  getPost: defineAction({
    input: z.object({ slug: z.string().min(1, "Slug is required!") }),
    handler: async (input) => {
      const post = await getEntry("blog", input.slug);
      if (post?.data.tags) post.data.tags = removeDuplicates(post.data.tags);
      return post;
    }
  }),
  getNow,
  getPosts,
  getProjects
};
