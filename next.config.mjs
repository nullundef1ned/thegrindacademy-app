/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "autox-test.ams3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "thegrindacademy.ams3.cdn.digitaloceanspaces.com",
      },
    ],
  },
  async redirects() {
    return [{ source: "/i", destination: "/i/overview", permanent: true }];
  },
};

export default nextConfig;
