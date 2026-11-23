import { defineConfig } from "vite";

const layers = [
  "app",
  "pages",
  "widgets",
  "features",
  "entities",
  "shared",
] as const;

const src = (path: string): string =>
  new URL(`./src/${path}`, import.meta.url).pathname;

const alias = Object.fromEntries(
  layers.map((layer) => [`@${layer}`, src(layer)]),
);

export default defineConfig({
  resolve: {
    alias,
  },
  server: {
    port: 5173,
    open: true,
  },
});