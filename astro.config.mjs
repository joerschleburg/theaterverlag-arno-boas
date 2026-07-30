import { defineConfig } from 'astro/config';

// GitHub Pages (Project Site): https://joerschleburg.github.io/theaterverlag-arno-boas/
// Für die spätere Domain theaterverlag-arno-boas.de: base auf '/' setzen und site anpassen.
export default defineConfig({
  site: 'https://joerschleburg.github.io',
  base: '/theaterverlag-arno-boas',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
