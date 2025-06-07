import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
            },
            {
                protocol: 'https',
                hostname: 'Fplacehold.co',
            },
        ],
    },
};

export default nextConfig;
