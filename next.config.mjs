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
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "http://ecommerce.alemtilsimat.com:8989/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
