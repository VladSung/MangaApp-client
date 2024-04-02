/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
},
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
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    modularizeImports: {
        '@tabler/icons-react': {
            transform: '@tabler/icons/{{member}}',
        },
    },
};

module.exports = nextConfig;
