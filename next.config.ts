import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        protocol : 'https',
        hostname : 'tailus.io'
      },
      {
        protocol : 'https',
        hostname : 'images.unsplash.com'
      },
      {
        protocol : 'https',
        hostname : 'avatars.githubusercontent.com'
      },
      {
        protocol : 'https',
        hostname : 'img.freepik.com'
      },
      {
        protocol : 'https',
        hostname : 'lh3.googleusercontent.com'
      },
    ],
  }
};

export default nextConfig;
