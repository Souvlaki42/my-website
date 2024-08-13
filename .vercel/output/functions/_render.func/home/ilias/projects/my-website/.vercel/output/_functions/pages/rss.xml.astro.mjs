import { A as AppConfig } from '../chunks/utils_D5AwTfrX.mjs';
import rss from '@astrojs/rss';
import { g as getCollection } from '../chunks/_astro_content_tDVG2pza.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const posts = await getCollection("blog");
  posts.sort((a, b) => {
    return new Date(b.data.modifiedDate).getTime() - new Date(a.data.modifiedDate).getTime();
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
      link: `/blog/${post.slug}/`
    }))
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
