/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        defaultLocale: 'default',
        locales: ['ru', 'en', 'default'],
        localeDetection: true,
    },
    experimental: {
        serverActions: true,
        appDir: true,
    },
};

module.exports = nextConfig;
