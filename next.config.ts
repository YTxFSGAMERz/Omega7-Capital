import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-43e22425-7fbb-4029-bc3f-db616633e802.space.z.ai",
    "*.space.z.ai",
  ],
  experimental: {
    // @ts-ignore - Valid in Next.js 16 runtime
    turbopack: {
      root: ".",
    },
  },
  webpack: (config) => {
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'src/components');
    return config;
  },
};

export default nextConfig;
