const withTM = require('next-transpile-modules')([
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-base',
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
      dest: 'public',
      runtimeCaching,
    },
    images: {
      domains: ['raw.githubusercontent.com'],
    }
  })
);
