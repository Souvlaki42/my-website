import { a as createAstro, c as createComponent, r as renderTemplate, b as renderComponent, u as unescapeHTML, F as Fragment, m as maybeRenderHead, d as addAttribute } from './astro/server_CpJa1sJv.mjs';
import 'kleur/colors';
import { bundledLanguages } from 'shiki/langs';
import { createShikiHighlighter } from '@astrojs/markdown-remark';

const cachedHighlighters = /* @__PURE__ */ new Map();
function getCachedHighlighter(opts) {
  const key = JSON.stringify(opts, Object.keys(opts).sort());
  if (cachedHighlighters.has(key)) {
    return cachedHighlighters.get(key);
  }
  const highlighter = createShikiHighlighter(opts);
  cachedHighlighters.set(key, highlighter);
  return highlighter;
}

const $$Astro$2 = createAstro("https://souvlaki.me/");
const $$Code$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Code$1;
  const {
    code,
    lang = "plaintext",
    theme = "github-dark",
    themes = {},
    defaultColor = "light",
    wrap = false,
    inline = false,
    transformers = [],
    ...rest
  } = Astro2.props;
  if (typeof lang === "object") {
    if (lang.id) {
      lang.name = lang.id;
    }
    if (lang.grammar) {
      Object.assign(lang, lang.grammar);
    }
  }
  const highlighter = await getCachedHighlighter({
    langs: [
      typeof lang === "string" ? Object.keys(bundledLanguages).includes(lang) ? lang : "plaintext" : lang
    ],
    theme,
    themes,
    defaultColor,
    wrap,
    transformers
  });
  const html = await highlighter.highlight(code, typeof lang === "string" ? lang : lang.name, {
    inline,
    attributes: rest
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/home/ilias/projects/my-website/node_modules/astro/components/Code.astro", void 0);

const $$Astro$1 = createAstro("https://souvlaki.me/");
const $$Debug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Debug;
  const key = Object.keys(Astro2.props)[0];
  const value = Astro2.props[key];
  return renderTemplate`${maybeRenderHead()}<div class="astro-debug"> <div class="astro-debug-header"> <h2 class="astro-debug-title"> <span class="astro-debug-label">Debug</span> <span class="astro-debug-name">"${key}"</span> </h2> </div> ${renderComponent($$result, "Code", $$Code$1, { "code": JSON.stringify(value, null, 2) })} </div> <style>
	.astro-debug {
		font-size: 14px;
		padding: 1rem 1.5rem;
		background: white;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.astro-debug-header,
	pre.astro-code {
		margin: -1rem -1.5rem 1rem;
		padding: 0.25rem 0.75rem;
	}

	.astro-debug-header {
		background: #ff1639;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.astro-debug-title {
		font-size: 1em;
		color: white;
		margin: 0.5em 0;
	}

	.astro-debug-label {
		font-weight: bold;
		text-transform: uppercase;
		margin-right: 0.75em;
	}

	pre.astro-code {
		border: 1px solid #eee;
		padding: 1rem 0.75rem;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		font-size: 14px;
	}
</style>`;
}, "/home/ilias/projects/my-website/node_modules/astro/components/Debug.astro", void 0);

const $$Astro = createAstro("https://souvlaki.me/");
const $$Code = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Code;
  const {
    theme = "catppuccin-mocha",
    href,
    as,
    alignment = "left",
    ...rest
  } = Astro2.props;
  const className = `m-2 w-full text-${alignment}`;
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</a>` : as === "h1" ? renderTemplate`<h1${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h1>` : as === "h2" ? renderTemplate`<h2${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h2>` : as === "h3" ? renderTemplate`<h3${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h3>` : as === "h4" ? renderTemplate`<h4${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h4>` : as === "h5" ? renderTemplate`<h5${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h5>` : as === "h6" ? renderTemplate`<h6${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</h6>` : renderTemplate`<span${addAttribute(className, "class")}>${renderComponent($$result, "AstroCode", $$Code$1, { "tabindex": -1, "wrap": true, "theme": theme, ...rest })}</span>`}`;
}, "/home/ilias/projects/my-website/src/components/Code.astro", void 0);

export { $$Code as $ };
