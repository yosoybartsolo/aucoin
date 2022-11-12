// next.config.js
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true, // SWC for minifying JavaScript up to 7x faster in next12 beta
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "unsplash.com"],
  },
};
