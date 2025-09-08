import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Config options here */
  images: {
    remotePatterns: [new URL('https://robohash.org/**')],
  },
};

export default nextConfig;
