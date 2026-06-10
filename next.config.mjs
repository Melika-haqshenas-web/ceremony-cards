import createNextIntlPlugin from 'next-intl/plugin';

// Point the plugin at our request-config module (see src/i18n/request.ts).
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote demo imagery (Unsplash) used by the card templates.
    // Swap these for your own CDN/domains in production.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
