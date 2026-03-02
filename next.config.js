/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica de Next.js / Basic Next.js configuration
  reactStrictMode: true,
  
  // Configuración de imágenes / Image configuration
  images: {
    domains: ['blockchain.info', 'mempool.space', '1ml.com'],
  },
  
  // Rewrites para APIs externas / External API rewrites
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://blockchain.info/:path*',
      },
    ];
  },
  
  // Headers para CORS / CORS headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
