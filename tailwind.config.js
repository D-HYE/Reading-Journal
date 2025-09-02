module.exports = {
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig;
