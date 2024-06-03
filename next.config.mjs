/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
      },
      {
        protocol: "http",
        hostname: "ecommerce.alemtilsimat.com",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
  transpilePackages: ["next-international"],
};

export default nextConfig;
