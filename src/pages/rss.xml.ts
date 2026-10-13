import { actions } from "astro:actions";
import { SITE_DESCRIPTION, SITE_NAME } from "astro:env/server";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ callAction, site }) => {
  const posts = (await callAction(actions.posts.getAll, {})).data;
  if (!posts) return new Response(null, { status: 404 });
  if (!site) return new Response(null, { status: 500 });

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.created),
      description: post.summary,
      categories: post.tags,
      link: `/posts/${post.id}/`,
    })),
  });
};
