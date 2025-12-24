import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Installed babel-plugin-react-compiler for optimizing React code specifically for efficient memoization and rendering.
  reactCompiler: true,
  experimental:{
    turbopackFileSystemCacheForDev:true
  }
};

export default nextConfig;
