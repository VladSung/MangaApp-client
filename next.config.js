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
                hostname: 'rjqfpsoszpkdygjeykxf.supabase.co',

                protocol: 'https',
                pathname: '/storage/v1/**',
            },
        ],
    },
};

module.exports = nextConfig;
