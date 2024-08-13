import { a as createAstro, c as createComponent, r as renderTemplate, d as addAttribute, h as renderHead, i as renderSlot } from './astro/server_CpJa1sJv.mjs';
import 'kleur/colors';
import 'clsx';
import { A as AppConfig } from './utils_D5AwTfrX.mjs';
/* empty css                        */

const $$Astro = createAstro("https://souvlaki.me/");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title: BASE_TITLE, description: BASE_DESCRIPTION, site } = AppConfig;
  const { title, description = BASE_DESCRIPTION } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(BASE_TITLE, "title")}${addAttribute(`${site}rss.xml`, "href")}><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><meta${addAttribute(title ? `${title} - ${BASE_TITLE}` : BASE_TITLE, "title")}><title>${title ? `${title} - ${BASE_TITLE}` : BASE_TITLE}</title>${renderHead()}</head> <body class="flex min-h-screen flex-col items-center justify-center bg-mocha"> ${renderSlot($$result, $$slots["default"], renderTemplate`Nothing is here. Maybe this page doesn't exist yet.`)} </body></html>`;
}, "/home/ilias/projects/my-website/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
