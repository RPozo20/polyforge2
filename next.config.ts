import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/model-proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_R2_DEV_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
