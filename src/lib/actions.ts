import { defineAction, z } from "astro:actions";
import { getCollection, getEntry, type ContentEntryMap } from "astro:content";
import Fuse from "fuse.js";

type FuseKey = "title" | "summary" | "tags" | "slug";

type FuseInstance = Fuse<{
  id: ContentEntryMap["blog"][keyof ContentEntryMap["blog"]]["id"];
  slug: ContentEntryMap["blog"][keyof ContentEntryMap["blog"]]["slug"];
  summary: string;
  title: string;
  tags: string[];
  createdDate: string;
  modifiedDate: string;
}>;

let FUSE_INSTANCES: Record<FuseKey, FuseInstance>;

const FUSE_OPTIONS = (key: FuseKey) => {
  const keys = {
    title: [
      { name: "title", weight: 1 },
      { name: "summary", weight: 0.7 },
      { name: "tags", weight: 0.5 },
      { name: "slug", weight: 0.3 },
    ],
    summary: [
      { name: "summary", weight: 1 },
      { name: "tags", weight: 0.7 },
      { name: "slug", weight: 0.5 },
      { name: "title", weight: 0.3 },
    ],
    tags: [{ name: "tags", weight: 1 }],
    slug: [{ name: "slug", weight: 1 }],
  };
  return {
    includeScore: true,
    shouldSort: true,
    threshold: 0.5,
    keys: keys[key],
  };
};

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
      const posts = await getCollection("blog");
      let formattedPosts = posts.map((post) => {
        const {
          data: { title, summary, tags, createdDate, modifiedDate },
          id,
          slug,
        } = post;
        return { id, slug, title, summary, tags, createdDate, modifiedDate };
      });

      formattedPosts = formattedPosts.sort((a, b) => {
        return (
          new Date(b.modifiedDate).getTime() -
          new Date(a.modifiedDate).getTime()
        );
      });

      if (formattedPosts) {
        FUSE_INSTANCES = {
          title: new Fuse(formattedPosts, FUSE_OPTIONS("title")),
          summary: new Fuse(formattedPosts, FUSE_OPTIONS("summary")),
          tags: new Fuse(formattedPosts, FUSE_OPTIONS("tags")),
          slug: new Fuse(formattedPosts, FUSE_OPTIONS("slug")),
        };
      }

      if (searchQuery) {
        const queryParts = searchQuery.split(":", 2);
        let instance: FuseInstance;
        switch (queryParts[0].trim()) {
          case "summary":
            instance = FUSE_INSTANCES["summary"];
            break;
          case "tags":
            instance = FUSE_INSTANCES["tags"];
            break;
          case "slug":
            instance = FUSE_INSTANCES["slug"];
            break;
          case "title":
          default:
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
          hasPrevious: undefined,
        };
      } else if (page > 0) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const entries = formattedPosts.slice(start, end);
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
