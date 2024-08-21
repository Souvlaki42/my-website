import { defineAction, z } from "astro:actions";
import { getEntry } from "astro:content";
import { getPosts } from "@/api/getPosts";
import { getProjects } from "@/api/getProjects";
import { getNow } from "@/api/getNow";
import { removeDuplicates } from "@/utils";

const getPost = defineAction({
  input: z.object({ slug: z.string().min(1, "Slug is required!") }),
  handler: async (input) => {
    const post = await getEntry("blog", input.slug);
    if (post?.data.tags) post.data.tags = removeDuplicates(post.data.tags);
    return post;
  }
});

const api = {
  getPost,
  getNow,
  getPosts,
  getProjects
};

export { getPosts, getProjects, getNow, getPost, api };
