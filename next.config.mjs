// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ["img.freepik.com"],
  },
};

export default withPlaiceholder(config);
