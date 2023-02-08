/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
