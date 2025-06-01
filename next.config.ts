import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['abcdev1-production.up.railway.app', 'localhost'],
    unoptimized: true,
  },
};

export default nextConfig;
