import type { NextConfig } from "next";

// GitHub Pages deployment: base path injected via NEXT_PUBLIC_BASE_PATH env var
// For repo sites (username.github.io/repo-name), set NEXT_PUBLIC_BASE_PATH=/repo-name
// For user sites (username.github.io) or custom domains, leave empty
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with static hosting
};

export default nextConfig;
