import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* config options here */
  output: 'standalone',
  transpilePackages: ['react-notion-x', 'notion-client', 'notion-utils', 'notion-types', '@repo/ui', '@repo/domain'],
  // Enable Docker hot reload
  // webpack: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add image domains
  images: {
    // Disable optimization in dev to avoid private IP resolution issues
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'file.notion.so',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.faiusr.com',
        pathname: '/**',
      },
    ],
    // Optional: Add image size presets for better optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              img-src 'self' data: https://*.unsplash.com https://picsum.photos https://fastly.picsum.photos https://prod-files-secure.s3.us-west-2.amazonaws.com https://www.notion.so https://file.notion.so https://*.amazonaws.com https://*.googleusercontent.com https://avatar.iran.liara.run https://*.faiusr.com https://res.cloudinary.com;
              script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ""};
              style-src 'self' 'unsafe-inline';
              font-src 'self'; 
            `.replace(/\s+/g, ' '),
          }
        ],
      },
    ];
  },
};

export default nextConfig;
