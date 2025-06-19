const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      '1000logos.net',
      'www.google.com',
      'upload.wikimedia.org',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
  },
  // Add this for development only (remove for production)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src * blob: data:;
              connect-src 'self' https://nominatim.openstreetmap.org;
              font-src 'self';
            `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;