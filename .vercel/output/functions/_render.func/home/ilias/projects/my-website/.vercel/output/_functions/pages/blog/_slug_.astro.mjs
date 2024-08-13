/* empty css                                   */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro, b as renderComponent, d as addAttribute } from '../../chunks/astro/server_CpJa1sJv.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Cobp05Cu.mjs';
import { $ as $$Code } from '../../chunks/Code_D9fbG_4e.mjs';
import 'clsx';
import { s as server } from '../../chunks/actions_DuxZvfq7.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Comments = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<section class="giscus mx-auto mt-10 w-full"></section> <!-- Remove `-no-loader` from `data-theme`, if you want the catppuccin loader icon in the comment section --> <script src="https://giscus.app/client.js" data-repo="souvlaki42/my-website" data-repo-id="R_kgDOHTVW_w" data-category="Blog Post Comments" data-category-id="DIC_kwDOHTVW_84ChlM4" data-mapping="url" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top" data-theme="https://giscus.catppuccin.com/themes/mocha-no-loader.css" data-lang="en" data-loading="lazy" crossorigin="anonymous" async><\/script>'], ["", '<section class="giscus mx-auto mt-10 w-full"></section> <!-- Remove \\`-no-loader\\` from \\`data-theme\\`, if you want the catppuccin loader icon in the comment section --> <script src="https://giscus.app/client.js" data-repo="souvlaki42/my-website" data-repo-id="R_kgDOHTVW_w" data-category="Blog Post Comments" data-category-id="DIC_kwDOHTVW_84ChlM4" data-mapping="url" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top" data-theme="https://giscus.catppuccin.com/themes/mocha-no-loader.css" data-lang="en" data-loading="lazy" crossorigin="anonymous" async><\/script>'])), maybeRenderHead());
}, "/home/ilias/projects/my-website/src/components/Comments.astro", void 0);

const $$Astro = createAstro("https://souvlaki.me/");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug = "" } = Astro2.params;
  const { data: post, error } = await server.getPost({ slug });
  if (error) console.error(error.message);
  if (!post) throw new Error("Post must exist");
  const { title, summary, createdDate, modifiedDate, tags } = post.data;
  const { Content } = await post.render();
  const page = Astro2.url.searchParams.get("page") ?? "1";
  const perPage = Astro2.url.searchParams.get("per_page") ?? "12";
  const search = Astro2.url.searchParams.get("search") ?? void 0;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": summary }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex min-h-screen flex-col p-12 justify-start text-center text-white"> <header class="w-full text-center space-x-2"> <a href="/" class="link">Homepage</a> <a href="/blog" class="link">Blog</a> <a href="/projects" class="link">Projects</a> </header> <section id="frontmatter"> ${renderComponent($$result2, "Code", $$Code, { "as": "h1", "code": `# ${title}`, "lang": "markdown", "alignment": "center" })} ${renderComponent($$result2, "Code", $$Code, { "as": "h2", "code": `## ${summary}`, "lang": "markdown", "alignment": "center" })} <div class="justify-between"> <div> ${renderComponent($$result2, "Code", $$Code, { "as": "h3", "code": `### ${tags.join(", ")}`, "lang": "markdown", "alignment": "center" })} </div> <small>${renderComponent($$result2, "Code", $$Code, { "as": "h3", "code": `#### Created: ${createdDate}${createdDate !== modifiedDate ? `- Modified: ${modifiedDate}` : ""}`, "lang": "markdown", "alignment": "center" })}</small> </div> </section> <hr class="m-4"> <article id="article" role="article" class="prose mx-auto mt-8 max-w-3xl prose-pre:border-[1px] prose-pre:border-skin-line prose-pre:border-solid"> ${renderComponent($$result2, "Content", Content, {})} </article> <a${addAttribute(`/blog?page=${page}&per_page=${perPage}${search ? `&search=${search}` : ""}`, "href")} class="link mt-8">← Go back</a> ${renderComponent($$result2, "Comments", $$Comments, {})} </main> ` })}`;
}, "/home/ilias/projects/my-website/src/pages/blog/[slug].astro", void 0);

const $$file = "/home/ilias/projects/my-website/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
