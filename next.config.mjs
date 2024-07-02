/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ipfs.io'
      },
      {
        hostname: 'gateway.pinata.cloud'
      },
      {
        hostname: 'imgs.search.brave.com'
      }
    ]
  }
};

export default nextConfig;
