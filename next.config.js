/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
                protocol: 'https',
                pathname: '/dd5xzevrq/image/upload/**',
            },
            {
                hostname: 'localhost',
                port: '9000',
                protocol: 'http',
                pathname: '/alopex/**',
            },
        ],
    },
};

module.exports = nextConfig;
