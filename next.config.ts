import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.creativecommons.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.are.na',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.are.na',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2w9rnfcy7mm78.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add redirects configuration
  async redirects() {
    return [
      {
        source: '/colaborar',
        destination: '/collaborate',
        permanent: true, // This is a 301 (permanent) redirect, good for SEO
      },
      {
        source: '/colaborar/',
        destination: '/collaborate',
        permanent: true,
      },
      {
        source: '/eventos',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/biblioteca',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/biblioteca/:slug',
        destination: '/library/:slug',
        permanent: true
      },
      {
        source: '/libro/:slug',
        destination: '/library/:slug',
        permanent: true
      },
      {
        source: '/conceptos',
        destination: '/concepts',
        permanent: true,
      },
      {
        source: '/conceptos/:slug',
        destination: '/concepts/:slug',
        permanent: true,
      }
    ]
  },
};


const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})


export default withNextIntl(withMDX(nextConfig));