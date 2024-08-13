import { AppConfig } from "../lib/utils";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  posts.sort((a, b) => {
    return (
      new Date(b.data.modifiedDate).getTime() -
      new Date(a.data.modifiedDate).getTime()
    );
  });

  return rss({
    title: AppConfig.title,
    description: AppConfig.description,
    site: AppConfig.site,
    stylesheet: "/pretty-feed-v3.xsl",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.modifiedDate),
      description: post.data.summary,
      categories: post.data.tags,
      link: `/blog/${post.slug}/`,
    })),
  });
};
