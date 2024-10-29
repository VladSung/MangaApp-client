/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'images.app.localhost',
                protocol: 'https',
                pathname: '**',
            },
            {
                hostname: '*.images.app.localhost',
                pathname: '**',
            },
            {
                hostname: 'localhost',
                port: '9000',
                protocol: 'http',
                pathname: '/**',
            },
            {
                hostname: '127.0.0.1',
                port: '9000',
                protocol: 'http',
                pathname: 'alopex/**',
            },
            {
                hostname: 'rjqfpsoszpkdygjeykxf.supabase.co',

                protocol: 'https',
                pathname: '/storage/v1/**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@tabler/icons-react'],
    },
};

module.exports = nextConfig;
