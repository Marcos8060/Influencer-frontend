const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'scontent-sof1-2.cdninstagram.com', 'p16-sign-sg.tiktokcdn.com','images.unsplash.com'],
  },
  // Add this for development only (remove for production)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "connect-src 'self' ws://147.78.141.96:8075 wss://147.78.141.96:8075;"
          }
        ]
      }
    ]
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