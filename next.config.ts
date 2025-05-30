import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    // Enables the React compiler
    // reactCompiler: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Ensure CSS is properly processed
  webpack: (config) => {
    // Handle font loading
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
