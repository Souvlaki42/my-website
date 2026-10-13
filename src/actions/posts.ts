import { ActionError, defineAction } from "astro:actions";
import { type DataEntryMap, getCollection, getEntry } from "astro:content";
import { z } from "astro/zod";
import type Fuse from "fuse.js";
import { isFuseKey, makeFuseInstances } from "~/lib/search";
import { removeDuplicates, safeAwait } from "~/lib/utils";

type RawPost = DataEntryMap["posts"][keyof DataEntryMap["posts"]];
type Post = RawPost["data"] & {
  id: RawPost["id"];
};

let FUSE_INSTANCES: Record<string, Fuse<Post>> = {};

const getById = defineAction({
  input: z.object({ id: z.string().min(1, "Id is required!") }),
  handler: async (input) => {
    const [error, post] = await safeAwait(getEntry("posts", input.id));
    if (error)
      throw new ActionError({ message: error.message, code: "NOT_FOUND" });
    if (post.data.tags) post.data.tags = removeDuplicates(post.data.tags);
    return post;
  },
});

const getByQuery = defineAction({
  input: z.object({
    searchQuery: z.string().optional(),
    page: z.number().default(1),
    perPage: z.number().default(12),
  }),
  handler: async (input) => {
    const { searchQuery, page, perPage } = input;
    const [error, posts] = await safeAwait(getCollection("posts"));
    if (error)
      throw new ActionError({ message: error.message, code: "NOT_FOUND" });
    let formattedPosts = posts
      .filter((post) => !post.data.draft)
      .map((post) => {
        const {
          data: { tags, ...postData },
          id,
        } = post;
        return {
          id,
          ...postData,
          tags: removeDuplicates(tags),
        };
      });

    formattedPosts = formattedPosts.sort((a, b) => {
      return new Date(b.modified).getTime() - new Date(a.modified).getTime();
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

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const entries = formattedPosts?.slice(start, end);
    return {
      posts: entries,
      hasNext: end < formattedPosts.length,
      hasPrevious: start > 0,
    };
  },
});

const getAll = defineAction({
  handler: async () => {
    const [error, posts] = await safeAwait(getCollection("posts"));
    if (error)
      throw new ActionError({ message: error.message, code: "NOT_FOUND" });
    let formattedPosts = posts
      .filter((post) => !post.data.draft)
      .map((post) => {
        const {
          data: { tags, ...postData },
          id,
        } = post;
        return {
          id,
          tags: removeDuplicates(tags),
          ...postData,
        };
      });

    formattedPosts = formattedPosts.sort((a, b) => {
      return new Date(b.modified).getTime() - new Date(a.modified).getTime();
    });

    return formattedPosts;
  },
});

export const posts = { getById, getByQuery, getAll };
