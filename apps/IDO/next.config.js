const withTM = require('next-transpile-modules')([
  '@gokiprotocol/walletkit',
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-base',
  'helix-client',
]);

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports =  withPWA(
  withTM({
    reactStrictMode: true,
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { 
        fs: false,
        os: false,
        path: false,
        crypto: false,
      };

      return config;
    },
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      runtimeCaching,
    },
    images: {
      domains: ['raw.githubusercontent.com'],
    }
  })
);