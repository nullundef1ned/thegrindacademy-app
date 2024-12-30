/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
