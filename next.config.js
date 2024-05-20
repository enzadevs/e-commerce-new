const withPlugins = require("next-compose-plugins");
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
    domains: ["localhost"],
  },
  reactStrictMode: false,
};

module.exports = withPlugins([[withBundleAnalyzer], withNextIntl], nextConfig);
