import { defineAction, z } from "astro:actions";
import { getCollection, type ContentEntryMap } from "astro:content";
import { isFuseKey, makeFuseInstances, removeDuplicates } from "@/utils";
import type Fuse from "fuse.js";

type RawPost = ContentEntryMap["blog"][keyof ContentEntryMap["blog"]];
type Post = {
  id: RawPost["id"];
  slug: RawPost["slug"];
} & RawPost["data"];

let FUSE_INSTANCES: Record<string, Fuse<Post>> = {};

export const getPosts = defineAction({
  input: z.object({
    searchQuery: z.string().optional(),
    page: z.number().default(0),
    perPage: z.number().default(12)
  }),
  handler: async (input) => {
    const { searchQuery, page, perPage } = input;
    const posts = await getCollection("blog");
    let formattedPosts = posts.map((post) => {
      const {
        data: { title, summary, tags, createdDate, modifiedDate },
        id,
        slug
      } = post;
      return {
        id,
        slug,
        title,
        summary,
        tags: removeDuplicates(tags),
        createdDate,
        modifiedDate
      };
    });

    formattedPosts = formattedPosts.sort((a, b) => {
      return (
        new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
      );
    });

    if (formattedPosts && Object.keys(FUSE_INSTANCES).length === 0) {
      FUSE_INSTANCES = makeFuseInstances<Post>(formattedPosts);
    }

    if (searchQuery) {
      const queryParts = searchQuery.split(":", 2);
      const possibleKey = queryParts[0].trim();
      let instance: Fuse<Post>;

      if (isFuseKey(possibleKey)) {
        instance = FUSE_INSTANCES[possibleKey];
      } else {
        instance = FUSE_INSTANCES["title"];
      }

      const term = queryParts.length === 2 ? queryParts[1] : queryParts[0];
      const results = instance.search(term);
      formattedPosts = results?.map((result) => result.item);
    }

    if (page === 0) {
      return {
        posts: formattedPosts,
        hasNext: undefined,
        hasPrevious: undefined
      };
    } else {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const entries = formattedPosts.slice(start, end);
      return {
        posts: entries,
        hasNext: end < posts.length,
        hasPrevious: start > 0
      };
    }
  }
});
