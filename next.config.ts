import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.creativecommons.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
