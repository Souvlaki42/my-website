# My Portfolio

This repository contains my personal portfolio built with [Astro](https://astro.build/), TypeScript, and Tailwind CSS. The project features a combination of static and server-side rendered pages, with dynamic content powered by Vercel. Syntax-highlighted code blocks are rendered using a customized Code component from {astro:components}, utilizing [Shiki](https://shiki.matsu.io/) for a clean and accurate display. The site maintains a strong focus on performance and design, achieving high Lighthouse scores on both mobile and desktop.

## Features

- **Hybrid Static & Dynamic Rendering**: While the homepage is statically generated, other sections are server-side rendered, fetching live data from APIs.
- **Syntax Highlighting**: Powered by Shiki, ensuring accurate and aesthetically pleasing code blocks.
- **Fuzzy Search & Comment Section**: Enhanced functionality with JavaScript, providing a better user experience.
- **Responsive Design**: Optimized for both mobile and desktop, maintaining high performance metrics.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Bun](https://bun.sh) (v1.1.20 or later)
  OR
- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [npm](https://www.npmjs.com/) (v10.x or later)

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
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the project in your browser**

   Navigate to `http://localhost:4321` to view the portfolio.

## Deployment

To build the project for production, run:

```bash
npm run build
```

The built files will be in the `dist` directory. You can deploy these static files to any hosting service that supports static sites.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- **Name**: Souvlaki42
- **Email**: [souvlaki420@gmail.com](mailto:souvlaki420@gmail.com)
- **GitHub**: [Souvlaki42](https://github.com/souvlaki42)
- **Twitter/X**: [Souvlaki42](https://x.com/souvlaki42)
