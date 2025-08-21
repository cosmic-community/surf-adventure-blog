/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // Adding typedRoutes: false to prevent type errors with dynamic routes
  typedRoutes: false,
};

module.exports = nextConfig;