const withTM = require('next-transpile-modules')([
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-base',
]);

module.exports = withTM({
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
  }
});
