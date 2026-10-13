import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components and Partial Prefetching are the defaults for new apps in
  // Next.js 16.4. Catalogue reads use 'use cache' (lib/data.ts), so course,
  // lesson and instructor pages are prerendered as static HTML.
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // Pin the project root: there is an unrelated package-lock.json higher up
    // in the home folder that Turbopack would otherwise consider.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
