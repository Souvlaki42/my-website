/* empty css                                */
import { a as createAstro, c as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_CpJa1sJv.mjs';
import 'kleur/colors';
import { $ as $$Code } from '../chunks/Code_D9fbG_4e.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Cobp05Cu.mjs';
import { s as server } from '../chunks/actions_DuxZvfq7.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://souvlaki.me/");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const page = Astro2.url.searchParams.get("page") ?? "1";
  const perPage = Astro2.url.searchParams.get("per_page") ?? "12";
  const search = Astro2.url.searchParams.get("search") ?? void 0;
  const { data, error } = await server.getPosts({
    page: Number(page),
    perPage: Number(perPage),
    searchQuery: search
  });
  if (error) console.error(error.message);
  const posts = data?.posts;
  const hasNext = data?.hasNext;
  const hasPrevious = data?.hasPrevious;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex min-h-screen flex-col p-12"> <header class="w-full text-center space-x-2"> <a href="/" class="link">Homepage</a> <a${addAttribute("/blog", "href")} class="link">Blog</a> <a href="/projects" class="link">Projects</a> <a href="/rss.xml" class="link">RSS</a> </header> <section id="description" class="m-4"> ${renderComponent($$result2, "Code", $$Code, { "as": "h1", "code": "# Welcome to my blog!", "lang": "markdown", "alignment": "center" })} ${renderComponent($$result2, "Code", $$Code, { "as": "h2", "code": "## This is where I throw my random pieces of knowledge or experience I get for being a developer.", "lang": "markdown", "alignment": "center" })} ${renderComponent($$result2, "Code", $$Code, { "as": "h3", "code": "### I encourage you to take a look. One wise man once said that what we have to say, will be useful to somebody.", "lang": "markdown", "alignment": "center" })} </section> <form class="w-full text-center mx-8 mt-2 mb-8" data-form> <input type="search" name="search" id="search" required minlength="2" maxlength="24" placeholder="Enter a search term..." class="w-1/2 rounded-lg p-2 bg-mocha border-2 border-sky-blue focus-within:border-light-blue text-white font-medium outline-none"> </form> <section id="posts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> ${posts?.length === 0 && renderTemplate`<span class="w-full text-white m-2 justify-center text-center">
There are no posts at this page. I don't know how you ended up here.
</span>`} ${posts && posts.map((post) => {
    const {
      data: { title, summary, tags, createdDate, modifiedDate },
      slug
    } = post;
    return renderTemplate`<a${addAttribute(`/blog/${slug}?page=${page}&per_page=${perPage}${search ? `&search=${encodeURI(search)}` : ""}`, "href")} class="block w-full max-w-md p-6 bg-[#313244] rounded-lg shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105"> <h2 class="text-2xl font-bold text-[#CDD6F4] mb-2">${title}</h2> <p class="text-[#A6ADC8] mb-4">${summary}</p> <div class="flex flex-wrap items-center mb-4"> ${tags.map((tag) => renderTemplate`<span class="bg-[#45475A] text-[#F5E0DC] text-xs font-medium mr-2 px-2.5 py-0.5 rounded"> ${tag} </span>`)} </div> <div class="text-sm text-[#BAC2DE]"> <p>Created: ${createdDate}</p> ${createdDate !== modifiedDate && renderTemplate`<p>Modified: ${modifiedDate}</p>`} </div> </a>`;
  })} </section> <section id="pagination" class="w-full flex justify-center items-center m-4 space-x-4"> ${hasPrevious && renderTemplate`<a${addAttribute(`/blog?page=${Number(page) - 1}&per_page=${Number(perPage)}`, "href")} class="text-[#6CB4FF] hover:text-[#94D0FF] font-semibold">
Previous
</a>`} <span class="text-white font-semibold">${Number(page)}</span> ${hasNext && renderTemplate`<a${addAttribute(`/blog?page=${Number(page) + 1}&per_page=${Number(perPage)}`, "href")} class="text-[#6CB4FF] hover:text-[#94D0FF] font-semibold">
Next
</a>`} </section> </main>  ` })}`;
}, "/home/ilias/projects/my-website/src/pages/blog.astro", void 0);

const $$file = "/home/ilias/projects/my-website/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
