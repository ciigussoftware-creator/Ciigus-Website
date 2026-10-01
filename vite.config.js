import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { site } from "./src/data/content.js";
import { headHtml, indexedRoutes } from "./src/lib/seo.js";

const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
const seoBlock = (route) => `<!-- seo:start -->\n    ${headHtml(route)}\n    <!-- seo:end -->`;

// Link-preview crawlers (WhatsApp, Facebook, LinkedIn) don't run JavaScript,
// so every route gets its own HTML file with its meta tags baked in.
// vercel.json's cleanUrls serves /services from services.html.
function seo() {
  let outDir;
  let isBuild = false;
  return {
    name: "ciigus-seo",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    transformIndexHtml(html) {
      return html.replace(SEO_BLOCK, seoBlock("/"));
    },
    closeBundle() {
      if (!isBuild) return;
      const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      for (const route of indexedRoutes.filter((r) => r !== "/")) {
        fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), indexHtml.replace(SEO_BLOCK, seoBlock(route)));
      }

      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = indexedRoutes
        .map((route) => `  <url>\n    <loc>${site.url}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
});
