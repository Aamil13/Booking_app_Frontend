/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Uncomment the line below if you want to use a deployed server as the destination
        destination: `https://bookings-app-lac.vercel.app/api/v1/:path*`,
        // destination: `http://localhost:5000/api/v1/:path*`,
      },
    ];
  },
  images: {
    domains: [
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
