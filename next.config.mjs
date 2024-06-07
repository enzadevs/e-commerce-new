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
        protocol: "https",
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
        source: "/tm/admin/:path*",
        destination: "http://localhost:8989/admin/",
        permanent: true,
      },
      {
        source: "/ru/admin/:path*",
        destination: "http://localhost:8989/admin/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
