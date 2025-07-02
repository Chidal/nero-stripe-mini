const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          zlib: require.resolve('browserify-zlib'),
          url: require.resolve('url'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer'),
          process: require.resolve('process/browser'), // Add process polyfill
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser', // Provide process globally
        }),
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
            exclude: [/node_modules/], // Suppress source map warnings
          },
        ],
      },
    },
  },
};