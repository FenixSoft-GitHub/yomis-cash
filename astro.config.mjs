// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: "server",

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "pt"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // Configura el alias '@'
      },
    },
  },

  adapter: vercel(),
});