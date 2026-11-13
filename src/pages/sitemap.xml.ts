import { actions } from "astro:actions";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ callAction, site }) => {
  const posts = (await callAction(actions.posts.getAll, {})).data;
  if (!posts) return new Response(null, { status: 404 });
  if (!site) return new Response(null, { status: 500 });

  const urls: Array<{ loc: string; lastMod?: string }> = [];

  // Static pages
  urls.push(
    { loc: `${site}` },
    { loc: `${site}posts` },
    { loc: `${site}projects` },
    { loc: `${site}resume.pdf` },
  );

  // Blog posts
  posts.forEach((post) => {
    urls.push({
      loc: `${site}posts/${post.id}`,
      lastMod: post.modified,
    });
  });

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(({ loc, lastMod }) =>
    [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastMod && `    <lastmod>${lastMod}</lastmod>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
};
