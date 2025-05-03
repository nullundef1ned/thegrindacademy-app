/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thegrindacademy.fra1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "thegrindacademy.fra1.digitaloceanspaces.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/i", destination: "/i/overview", permanent: true },
      {
        source: "/affiliate",
        destination: "/affiliate/overview",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
