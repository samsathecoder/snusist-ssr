/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",        // http veya https
        hostname: "utfs.io",      // eski domains array’indeki domain
        pathname: "/**",          // tüm path’leri kapsar
      },
    ],
  },
};

export default nextConfig;
