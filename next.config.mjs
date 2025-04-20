// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'https://fyp-job-automation-backend.vercel.app',
                pathname: '/public/**',
            },
        ],
    },
};

export default nextConfig;
