import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // A stray package-lock.json at ~/package-lock.json otherwise makes
  // Turbopack misdetect the workspace root as the home directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
