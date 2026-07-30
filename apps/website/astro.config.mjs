import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import remarkToc from "remark-toc";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import { enabledLanguages } from "./src/lib/utils/i18nUtils";
import remarkParseContent from "./src/lib/utils/remarkParseContent";
import config from "./.astro/config.generated.json";
import fontsJson from "./src/config/fonts.json";
import { generateAstroFontsConfig } from "./src/lib/utils/AstroFont";

const fonts = generateAstroFontsConfig(fontsJson);

let {
  seo: { sitemap: sitemapConfig },
  settings: {
    multilingual: { showDefaultLangInUrl, defaultLanguage },
  },
} = config;

export default defineConfig({
  site: config.site.baseUrl ? config.site.baseUrl : "http://examplesite.com",
  trailingSlash: config.site.trailingSlash ? "always" : "never",
  devToolbar: {
    enabled: false,
  },
  image: {
    layout: "constrained",
  },
  fonts,
  i18n: {
    locales: enabledLanguages,
    defaultLocale: defaultLanguage,
    routing: {
      prefixDefaultLocale: showDefaultLangInUrl,
    },
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemapConfig.enable ? sitemap() : null,
    mdx(),
    react(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkParseContent,
        remarkToc,
      ],
      rehypePlugins: [
        [rehypeExternalLinks, { rel: "noopener noreferrer nofollow", target: "_blank" }],
      ],
    }),
    shikiConfig: {
      theme: "light-plus",
      wrap: false,
    },
  },
  vite: {
    logLevel: "error",
    build: {
      minify: true,
    },
    plugins: [tailwindcss()],
  },
});
