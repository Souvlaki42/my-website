import { ActionError, defineAction } from "astro:actions";
import { GITHUB_TOKEN } from "astro:env/server";
import { z } from "astro:schema";
import type Fuse from "fuse.js";
import {
  isFuseKey,
  makeFuseInstances,
  removeDuplicates,
  safeAwait,
} from "~/lib/utils";

const rawProjectSchema = z.array(
  z.object({
    name: z.string(),
    private: z.boolean(),
    html_url: z.string(),
    homepage: z.string().nullable(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    fork: z.boolean(),
    stargazers_count: z.number().nonnegative(),
    topics: z.array(z.string()),
    pushed_at: z.string().nullable(),
  }),
);

type Project = {
  title: string;
  is_private: boolean;
  repo_url: string;
  homepage?: string;
  summary: string;
  fork: boolean;
  stars: number;
  tags: string[];
  pushed_at?: string;
};

let FUSE_INSTANCES: Record<string, Fuse<Project>> = {};

export const getByQuery = defineAction({
  input: z.object({
    searchQuery: z.string().optional(),
    page: z.number().default(1),
    perPage: z.number().default(12),
  }),
  handler: async (input) => {
    const { searchQuery, page, perPage } = input;

    const response = await fetch(
      `https://api.github.com/users/Souvlaki42/repos?sort=pushed&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    );

    if (!response.ok) throw response;

    const [error, anyData] = await safeAwait(response.json());
    if (error)
      throw new ActionError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });

    const linkHeader = response.headers.get("link");
    const links = linkHeader?.split(",", 4);
    const hasRel = (target: "next" | "prev") =>
      links?.some((link) => {
        const parts = link.split("; ", 2);
        return parts[1].includes(target);
      }) ?? false;

    const rawProjects = rawProjectSchema.parse(anyData);
    let projects: Project[] = rawProjects.map((project) => {
      const {
        name,
        fork,
        html_url,
        private: isPrivate,
        stargazers_count,
        topics,
        description,
        homepage,
        language,
        pushed_at,
      } = project;

      let tags = topics;
      if (language) tags.push(language);
      tags = removeDuplicates(tags);

      return {
        title: name,
        fork,
        is_private: isPrivate,
        repo_url: html_url,
        stars: stargazers_count,
        summary: description ?? "There is no summary",
        tags,
        homepage: homepage ?? undefined,
        pushed_at: pushed_at ?? undefined,
      };
    });

    if (projects && Object.keys(FUSE_INSTANCES).length === 0) {
      FUSE_INSTANCES = makeFuseInstances<Project>(projects);
    }

    if (searchQuery) {
      const queryParts = searchQuery.split(":", 2);
      const possibleKey = queryParts[0].trim();
      let instance: Fuse<Project>;

      if (isFuseKey(possibleKey)) {
        instance = FUSE_INSTANCES[possibleKey];
      } else {
        instance = FUSE_INSTANCES["title"];
      }

      const term = queryParts.length === 2 ? queryParts[1] : queryParts[0];
      const results = instance.search(term);
      projects = results?.map((result) => result.item);
    }

    return {
      projects,
      hasNext: hasRel("next"),
      hasPrevious: hasRel("prev"),
    };
  },
});

export const projects = { getByQuery };
