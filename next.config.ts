// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//         port: '',
//         pathname: '/**',
//       },
//       // CMS API uploads
//       {
//         protocol: 'https',
//         hostname: process.env.NEXT_PUBLIC_CMS_HOSTNAME || 'localhost',
//         port: process.env.NEXT_PUBLIC_CMS_HOSTNAME ? '' : '1337',
//         pathname: '/uploads/**',
//       },
//       // CMS Cloud Media CDN
//       {
//         protocol: 'https',
//         hostname: process.env.NEXT_PUBLIC_CMS_MEDIA_HOSTNAME || 'localhost',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//     // Optimasi untuk performance
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     minimumCacheTTL: 60,
//     dangerouslyAllowSVG: true,
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   },
//   // Add rewrites to proxy image requests to cms
//   async rewrites() {
//     return [
//       {
//         source: '/uploads/:path*',
//         destination: `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337'}/uploads/:path*`,
//       },
//     ];
//   },
// };

// export default nextConfig;


// next.config.ts
import type { NextConfig } from "next";

const cmsUrlString = process.env.NEXT_PUBLIC_CMS_URL;

if (!cmsUrlString) {
  throw new Error("Environment variable NEXT_PUBLIC_CMS_URL is not set");
}

const cmsUrl = new URL(cmsUrlString);
const cmsHostName = cmsUrl.hostname;
const cmsMediaHostname = cmsHostName.replace('strapiapp.com', 'media.strapiapp.com');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // CMS API uploads
      {
        protocol: 'https',
        hostname: cmsMediaHostname,
      },
      // CMS Cloud Media CDN
      {
        protocol: 'https',
        hostname: cmsMediaHostname,
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;