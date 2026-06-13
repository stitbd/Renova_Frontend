/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for best practices
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self), geolocation=(self)",
          }
        ],
      },
    ];
  },

  // Compression
  compress: true,

  // Trailing slashes
  trailingSlash: false,

  // Environment variable exposure (public only)
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.renovalifecare.com",
    NEXT_PUBLIC_SITE_NAME: "Renova Life Care Ltd.",
  },
};

module.exports = nextConfig;
