// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mahdiehganjimanesh.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
