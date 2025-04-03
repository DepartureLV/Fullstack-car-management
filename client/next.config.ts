import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
