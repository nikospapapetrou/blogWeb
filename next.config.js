/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8000/:path*' // Proxy to Backend
//       }
//     ]
//   }
// }

// images: {
//   remotePatterns: [
//     {
//       protocol: "http",
//       hostname: "localhost",
//       port: "1337",
//       pathname: "/uploads/**",
//     },
//   ],
// },
