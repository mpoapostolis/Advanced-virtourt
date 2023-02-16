/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["el", "en"],
    defaultLocale: "el",
  },

  rewrites() {
    return [
      {
        source: "/statics/:path*",
        destination: `${process.env.PB_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
