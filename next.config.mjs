/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/targetologist" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/targetologist/" : undefined,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei", "@react-three/fiber"],
  },
};

export default nextConfig;
