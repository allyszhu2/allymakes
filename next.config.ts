import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root (sibling repos in ~/Projects also have lockfiles).
  turbopack: { root: import.meta.dirname },
  // Hide the Next.js dev badge so demos look like the real thing.
  devIndicators: false,
  images: {
    // Placeholder image hosts that are handy while prototyping.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
