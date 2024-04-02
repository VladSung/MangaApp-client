/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
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
