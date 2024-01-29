/** @type {import('next').NextConfig} */
const nextConfig = {async rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: `https://bookings-app-lac.vercel.app/api/v1/:path*`,
        },
    ]
},}

module.exports = nextConfig
