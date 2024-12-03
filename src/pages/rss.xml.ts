import { AppConfig } from "@/utils";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { actions } from "astro:actions";

export const GET: APIRoute = async ({ callAction }) => {
  const resp = await callAction(actions.posts.getAll, {});
  const posts = resp.data;
  if (!posts) return new Response(null, { status: 404 });

  return rss({
    title: AppConfig.title,
    description: AppConfig.description,
    site: AppConfig.site,
    stylesheet: "/pretty-feed-v3.xsl",
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.modifiedDate),
      description: post.summary,
      categories: post.tags,
      link: `/blog/${post.id}/`
    }))
  });
};
