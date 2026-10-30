import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is plain HTML/CSS/JS and deploys to Vercel's free plan.
  output: "export",
  trailingSlash: true,
  // Screenshots are pre-optimized to WebP at fixed sizes; the default loader needs a server.
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
