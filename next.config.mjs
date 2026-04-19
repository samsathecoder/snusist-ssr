/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "2iqklps06o.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
