# My Portfolio

This repository contains my personal portfolio built with Astro, TypeScript, and Tailwind CSS. The project features a combination of static and server-side rendered pages, with dynamic content powered by Vercel. Syntax-highlighted code blocks are rendered using a customized Code component from {astro:components}, utilizing [Shiki](https://shiki.matsu.io/) for a clean and accurate display. The site maintains a strong focus on performance and design, achieving high Lighthouse scores on both mobile and desktop.

## Credits

- [RSS Stylesheet](public/rss.xsl) | [Get it here](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl)
- [Sitemap Stylesheet](public/sitemap.xsl) | [Get it here](https://github.com/pedroborges/xml-sitemap-stylesheet/blob/master/sitemap.xsl)

## Features

- **Hybrid Static & Dynamic Rendering**: While the homepage is statically generated, other sections are server-side rendered, fetching live data from APIs.
- **Syntax Highlighting**: Powered by Shiki, ensuring accurate and aesthetically pleasing code blocks.
- **Fuzzy Search & Comment Section**: Enhanced functionality with JavaScript, providing a better user experience.
- **Responsive Design**: Optimized for both mobile and desktop, maintaining high performance metrics.

## Todo

- [ ] Upgrade to Tailwind 4 when it's released
- [x] Upgrade to Astro 5 when it's released
- [x] Fix the page layout and content shifts
- [ ] Add light/dark mode and toggle
- [ ] Deal with the shiki bug (it's not on my end) or change approach
- [ ] Integrate Obsidian
- [ ] Publish more blog posts
- [ ] Maybe make project page more like a file tree
- [ ] Maybe translate the site to other languages

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (v22.12.0 or later)
- [Pnpm](https://pnpm.io/) (v9.15.3 or later)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Souvlaki42/my-website.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd my-website
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open the project in your browser**

   Navigate to `http://localhost:4321` to view the portfolio.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- **Email**: [souvlaki420@gmail.com](mailto:souvlaki420@gmail.com)
- **GitHub**: [Souvlaki42](https://github.com/souvlaki42)
- **Twitter/X**: [Souvlaki42](https://x.com/souvlaki42)
- **Bluesky**: [Souvlaki42](https://bsky.app/profile/souvlaki.me)
