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
            {
                hostname: '127.0.0.1',
                port: '9000',
                protocol: 'http',
                pathname: '/alopex/**',
            },
            {
                hostname: 'rjqfpsoszpkdygjeykxf.supabase.co',

                protocol: 'https',
                pathname: '/storage/v1/**',
            },
        ],
    },
    experimental: {
        // optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
    },
};

module.exports = nextConfig;
