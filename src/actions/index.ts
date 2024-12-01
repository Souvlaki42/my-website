import { removeDuplicates } from "@/utils";
import { defineAction } from "astro:actions";
import { getEntry } from "astro:content";
import { z } from "astro:schema";
import { getPosts } from "./getPosts";
import { getProjects } from "./getProjects";

const getPost = defineAction({
  input: z.object({ slug: z.string().min(1, "Slug is required!") }),
  handler: async (input) => {
    const post = await getEntry("blog", input.slug);
    if (post?.data.tags) post.data.tags = removeDuplicates(post.data.tags);
    return post;
  }
});

export const server = {
  getProjects,
  getPost,
  getPosts
};
